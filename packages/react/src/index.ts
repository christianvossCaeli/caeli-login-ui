/**
 * @caeli-wind/login-react
 * React components for Caeli login pages
 *
 * @example
 * ```tsx
 * import { LoginLayout } from '@caeli-wind/login-react';
 * import '@caeli-wind/login-styles';
 *
 * export default function AuthLayout({ children }) {
 *   return (
 *     <LoginLayout
 *       appTitle="CAELI"
 *       appSubtitle="QR"
 *       appDescription="QR-Code Management System"
 *     >
 *       {children}
 *     </LoginLayout>
 *   );
 * }
 * ```
 *
 * @version 1.0.0
 * @author Caeli Wind
 * @license MIT
 */

// Components
export { LoginLayout } from './LoginLayout';
export { CaeliSpinner } from './CaeliSpinner';
export { FloatingParticles } from './FloatingParticles';

// Auth / SSO
export { AuthContainer } from './AuthContainer';
export { SsoDivider } from './SsoDivider';
export { MicrosoftSsoButton } from './auth/MicrosoftSsoButton';
export { useMicrosoftAuth } from './auth/useMicrosoftAuth';

// Types
export type {
  LoginLayoutProps,
  CaeliSpinnerProps,
  FloatingParticlesProps,
  Particle,
  AuthContainerProps,
  AuthContainerMode,
  SsoDividerProps,
} from './types';

export type {
  MsalConfig,
  MicrosoftSsoButtonProps,
  MicrosoftAccount,
  MicrosoftAuthState,
  UseMicrosoftAuthReturn,
} from './auth/types';
