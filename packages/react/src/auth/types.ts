/**
 * @caeli-wind/login-react - Microsoft SSO Type Definitions
 */

/**
 * MSAL configuration passed by the consumer
 */
export interface MsalConfig {
  /** Azure App Registration Client ID */
  clientId: string;
  /** Azure AD Tenant ID (default: 'common') */
  tenantId?: string;
  /** Redirect URI after auth (default: window.location.origin) */
  redirectUri?: string;
  /** OAuth scopes to request (default: ['User.Read']) */
  scopes?: string[];
}

/**
 * Props for the MicrosoftSsoButton component
 */
export interface MicrosoftSsoButtonProps {
  /** Click handler */
  onClick?: () => void;
  /** Show loading spinner */
  loading?: boolean;
  /** Disable the button */
  disabled?: boolean;
  /** Button label (default: 'Sign in with Microsoft') */
  label?: string;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Account information from Microsoft
 */
export interface MicrosoftAccount {
  /** User's display name */
  name: string;
  /** User's email / username */
  username: string;
  /** Azure AD tenant ID */
  tenantId: string;
  /** Unique account identifier */
  homeAccountId: string;
}

/**
 * State returned by the useMicrosoftAuth hook
 */
export interface MicrosoftAuthState {
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Whether an auth operation is in progress */
  isLoading: boolean;
  /** Current account info (null if not authenticated) */
  account: MicrosoftAccount | null;
  /** Error message from the last failed operation */
  error: string | null;
}

/**
 * Return type of the useMicrosoftAuth hook
 */
export interface UseMicrosoftAuthReturn extends MicrosoftAuthState {
  /** Initiate login via redirect */
  login: () => Promise<void>;
  /** Logout the current user */
  logout: () => Promise<void>;
  /** Get an access token for API calls */
  getAccessToken: () => Promise<string | null>;
}
