'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type {
  MsalConfig,
  MicrosoftAccount,
  UseMicrosoftAuthReturn,
} from './types';

/**
 * Dynamically imports @azure/msal-browser and creates a PublicClientApplication.
 * Returns null if the package is not installed.
 */
async function createMsalInstance(config: MsalConfig) {
  try {
    const msal = await import('@azure/msal-browser');
    const instance = new msal.PublicClientApplication({
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
    await instance.initialize();
    return instance;
  } catch {
    console.error(
      '[caeli-login] @azure/msal-browser is required for useMicrosoftAuth. ' +
        'Install it with: npm install @azure/msal-browser',
    );
    return null;
  }
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

const DEFAULT_SCOPES = ['User.Read'] as const;

/**
 * useMicrosoftAuth — React hook for Microsoft SSO via MSAL redirect flow.
 *
 * Requires `@azure/msal-browser` to be installed as a peer dependency.
 * The MSAL library is loaded via dynamic import so the button component
 * can be used without it.
 */
export function useMicrosoftAuth(config: MsalConfig): UseMicrosoftAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState<MicrosoftAccount | null>(null);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const msalRef = useRef<any>(null);
  const initStarted = useRef(false);

  // Stabilize scopes reference to avoid useCallback re-creation
  const scopes = useMemo(
    () => config.scopes ?? [...DEFAULT_SCOPES],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config.scopes?.join(',')],
  );

  useEffect(() => {
    if (initStarted.current) return;
    initStarted.current = true;

    (async () => {
      try {
        const instance = await createMsalInstance(config);
        if (!instance) {
          setError('@azure/msal-browser is not installed');
          setIsLoading(false);
          return;
        }
        msalRef.current = instance;

        // Handle redirect response
        const response = await instance.handleRedirectPromise();
        if (response?.account) {
          instance.setActiveAccount(response.account);
          setAccount(toAccount(response.account));
          setIsAuthenticated(true);
        } else {
          const activeAccount =
            instance.getActiveAccount() ?? instance.getAllAccounts()[0] ?? null;
          if (activeAccount) {
            instance.setActiveAccount(activeAccount);
            setAccount(toAccount(activeAccount));
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async () => {
    const instance = msalRef.current;
    if (!instance) {
      setError('@azure/msal-browser is not initialized');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await instance.loginRedirect({ scopes });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setIsLoading(false);
    }
  }, [scopes]);

  const logout = useCallback(async () => {
    const instance = msalRef.current;
    if (!instance) return;
    setError(null);
    try {
      await instance.logoutRedirect();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  }, []);

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    const instance = msalRef.current;
    if (!instance) return null;
    const activeAccount = instance.getActiveAccount();
    if (!activeAccount) return null;
    try {
      const response = await instance.acquireTokenSilent({
        scopes,
        account: activeAccount,
      });
      return response.accessToken;
    } catch {
      // Silent token acquisition failed — trigger redirect
      try {
        await instance.acquireTokenRedirect({ scopes });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Token acquisition failed');
      }
      return null;
    }
  }, [scopes]);

  return { isAuthenticated, isLoading, account, error, login, logout, getAccessToken };
}
