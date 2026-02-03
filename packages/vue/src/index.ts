/**
 * @caeli-wind/login-vue
 * Vue 3 components for Caeli login pages
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { LoginLayout } from '@caeli-wind/login-vue';
 * import '@caeli-wind/login-styles';
 * </script>
 *
 * <template>
 *   <LoginLayout
 *     app-title="CAELI"
 *     app-subtitle="CRAWLER"
 *     app-description="Web Crawler Management"
 *   >
 *     <LoginForm />
 *   </LoginLayout>
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Caeli Wind
 * @license MIT
 */

// Components
export { default as LoginLayout } from './LoginLayout.vue';
export { default as CaeliSpinner } from './CaeliSpinner.vue';
export { default as FloatingParticles } from './FloatingParticles.vue';

// Auth / SSO
export { default as AuthContainer } from './AuthContainer.vue';
export { default as SsoDivider } from './SsoDivider.vue';
export { default as MicrosoftSsoButton } from './auth/MicrosoftSsoButton.vue';
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
