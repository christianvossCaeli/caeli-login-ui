import { ref, readonly } from 'vue';
import type {
  MsalConfig,
  MicrosoftAccount,
  UseMicrosoftAuthReturn,
} from './types';

// Module-level MSAL singleton
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let msalInstance: any = null;
let msalInitPromise: Promise<boolean> | null = null;
let msalClientId: string | null = null;

/**
 * Dynamically imports @azure/msal-browser and creates a PublicClientApplication.
 * Returns false if the package is not installed.
 */
async function ensureMsal(config: MsalConfig): Promise<boolean> {
  if (msalInstance) {
    if (msalClientId && msalClientId !== config.clientId) {
      console.warn(
        `[caeli-login] useMicrosoftAuth was already initialized with clientId "${msalClientId}". ` +
          `The new clientId "${config.clientId}" will be ignored. ` +
          'Only one MSAL instance per application is supported.',
      );
    }
    return true;
  }
  if (msalInitPromise) return msalInitPromise;

  msalClientId = config.clientId;

  msalInitPromise = (async () => {
    try {
      const msal = await import('@azure/msal-browser');
      msalInstance = new msal.PublicClientApplication({
        auth: {
          clientId: config.clientId,
          authority: `https://login.microsoftonline.com/${config.tenantId ?? 'common'}`,
          redirectUri: config.redirectUri ?? window.location.origin,
        },
        cache: {
          cacheLocation: 'sessionStorage',
          storeAuthStateInCookie: false,
        },
      });
      await msalInstance.initialize();
      return true;
    } catch {
      console.error(
        '[caeli-login] @azure/msal-browser is required for useMicrosoftAuth. ' +
          'Install it with: npm install @azure/msal-browser',
      );
      msalInitPromise = null;
      msalClientId = null;
      return false;
    }
  })();

  return msalInitPromise;
}

function toAccount(
  account: { name?: string; username?: string; tenantId?: string; homeAccountId?: string } | null,
): MicrosoftAccount | null {
  if (!account) return null;
  return {
    name: account.name ?? '',
    username: account.username ?? '',
    tenantId: account.tenantId ?? '',
    homeAccountId: account.homeAccountId ?? '',
  };
}

/**
 * useMicrosoftAuth — Vue composable for Microsoft SSO via MSAL redirect flow.
 *
 * Requires `@azure/msal-browser` to be installed as a peer dependency.
 * The MSAL library is loaded via dynamic import so the button component
 * can be used without it.
 */
export function useMicrosoftAuth(config: MsalConfig): UseMicrosoftAuthReturn {
  const isAuthenticated = ref(false);
  const isLoading = ref(true);
  const account = ref<MicrosoftAccount | null>(null);
  const error = ref<string | null>(null);
  const scopes = config.scopes ?? ['User.Read'];

  // Initialize MSAL and handle redirect
  (async () => {
    try {
      const ok = await ensureMsal(config);
      if (!ok) {
        error.value = '@azure/msal-browser is not installed';
        isLoading.value = false;
        return;
      }

      const response = await msalInstance.handleRedirectPromise();
      if (response?.account) {
        msalInstance.setActiveAccount(response.account);
        account.value = toAccount(response.account);
        isAuthenticated.value = true;
      } else {
        const activeAccount =
          msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0] ?? null;
        if (activeAccount) {
          msalInstance.setActiveAccount(activeAccount);
          account.value = toAccount(activeAccount);
          isAuthenticated.value = true;
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Authentication failed';
    } finally {
      isLoading.value = false;
    }
  })();

  async function login(): Promise<void> {
    if (!msalInstance) {
      error.value = '@azure/msal-browser is not initialized';
      return;
    }
    error.value = null;
    isLoading.value = true;
    try {
      await msalInstance.loginRedirect({ scopes });
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed';
      isLoading.value = false;
    }
  }

  async function logout(): Promise<void> {
    if (!msalInstance) return;
    error.value = null;
    try {
      await msalInstance.logoutRedirect();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Logout failed';
    }
  }

  async function getAccessToken(): Promise<string | null> {
    if (!msalInstance) return null;
    const activeAccount = msalInstance.getActiveAccount();
    if (!activeAccount) return null;
    try {
      const response = await msalInstance.acquireTokenSilent({
        scopes,
        account: activeAccount,
      });
      return response.accessToken;
    } catch {
      try {
        await msalInstance.acquireTokenRedirect({ scopes });
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Token acquisition failed';
      }
      return null;
    }
  }

  return {
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    account: readonly(account),
    error: readonly(error),
    login,
    logout,
    getAccessToken,
  };
}
