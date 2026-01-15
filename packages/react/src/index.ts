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

// Types
export type {
  LoginLayoutProps,
  CaeliSpinnerProps,
  FloatingParticlesProps,
  Particle,
} from './types';
