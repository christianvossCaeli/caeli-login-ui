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

// Types
export type {
  LoginLayoutProps,
  CaeliSpinnerProps,
  FloatingParticlesProps,
  Particle,
} from './types';
