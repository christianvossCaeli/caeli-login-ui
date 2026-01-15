<script setup lang="ts">
/**
 * LoginLayout - Complete login page layout with Caeli branding
 *
 * Provides a full-page layout with:
 * - Animated gradient background
 * - Floating particles
 * - Animated logo with glow rings
 * - Glassmorphism login card
 * - Footer
 *
 * @example
 * ```vue
 * <LoginLayout
 *   app-title="CAELI"
 *   app-subtitle="CRAWLER"
 *   app-description="Web Crawler Management"
 * >
 *   <LoginForm />
 * </LoginLayout>
 * ```
 */

import { ref, onMounted, computed } from 'vue';
import type { LoginLayoutProps } from './types';
import FloatingParticles from './FloatingParticles.vue';
import CaeliSpinner from './CaeliSpinner.vue';

const props = withDefaults(defineProps<LoginLayoutProps>(), {
  appTitle: 'CAELI',
  appSubtitle: '',
  appDescription: '',
  footerText: '',
  particleCount: 20,
});

const isLoaded = ref(false);

onMounted(() => {
  // Trigger animations after mount
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});

const currentYear = new Date().getFullYear();
const footer = computed(
  () => props.footerText || `© ${currentYear} Caeli Wind`
);
</script>

<template>
  <div class="login-container">
    <!-- Animated Background -->
    <div class="background-layer" aria-hidden="true">
      <div class="gradient-bg" />
      <div class="gradient-overlay" />
      <FloatingParticles :count="particleCount" />
    </div>

    <!-- Main Content -->
    <div class="content-layer">
      <div class="login-wrapper">
        <!-- Logo Section -->
        <div
          class="logo-section"
          :class="{ 'animate-in': isLoaded }"
          role="banner"
        >
          <!-- Glow rings -->
          <div class="glow-rings" aria-hidden="true">
            <div class="glow-ring ring-1" />
            <div class="glow-ring ring-2" />
            <div class="glow-ring ring-3" />
          </div>
          <!-- Animated Spinner -->
          <CaeliSpinner />
        </div>

        <!-- Title Section -->
        <div class="title-section" :class="{ 'animate-in': isLoaded }">
          <h1 class="app-title">{{ appTitle }}</h1>
          <span v-if="appSubtitle" class="app-subtitle">{{ appSubtitle }}</span>
          <p v-if="appDescription" class="app-description">
            {{ appDescription }}
          </p>
        </div>

        <!-- Login Card -->
        <main
          class="login-card"
          :class="{ 'animate-in': isLoaded }"
          role="main"
        >
          <slot />
        </main>

        <!-- Footer -->
        <footer class="footer" :class="{ 'animate-in': isLoaded }">
          <span>{{ footer }}</span>
        </footer>
      </div>
    </div>
  </div>
</template>
