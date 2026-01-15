<script setup lang="ts">
/**
 * CaeliSpinner - Animated Caeli logo with breathing effect
 *
 * Displays the Caeli wind logo with a pulsing glow effect
 * and glass-morphism background circle.
 */

import type { CaeliSpinnerProps } from './types';

withDefaults(defineProps<CaeliSpinnerProps>(), {
  size: 70,
});
</script>

<template>
  <div class="spinner-container">
    <!-- Glow effect -->
    <div class="spinner-glow" aria-hidden="true" />
    <!-- Glass background circle -->
    <div class="glass-circle" aria-hidden="true" />
    <!-- Animated SVG Spinner -->
    <svg
      class="caeli-spinner"
      :width="size"
      :height="size"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Caeli Logo"
      role="img"
    >
      <!-- Top vertical bar -->
      <path
        class="spinner-ray"
        d="M17.3103 0.134766H14.7295V12.8374H17.3103V0.134766Z"
        fill="rgb(222, 238, 198)"
        style="animation-delay: 0s"
      />
      <!-- Bottom vertical bar -->
      <path
        class="spinner-ray"
        d="M17.3103 26.3135H14.7295V31.5564H17.3103V26.3135Z"
        fill="rgb(216, 232, 203)"
        style="animation-delay: 0.1s"
      />
      <!-- Left horizontal bar -->
      <path
        class="spinner-ray"
        d="M5.43872 14.5615H0.134766V17.1126H5.43872V14.5615Z"
        fill="rgb(209, 225, 208)"
        style="animation-delay: 0.2s"
      />
      <!-- Right horizontal bar -->
      <path
        class="spinner-ray"
        d="M31.9221 14.5615H26.6182V17.1126H31.9221V14.5615Z"
        fill="rgb(203, 219, 212)"
        style="animation-delay: 0.3s"
      />
      <!-- Diagonal rays -->
      <path
        class="spinner-ray"
        d="M29.1461 6.86976L24.5527 9.49121L25.8431 11.7005L30.4365 9.07906L29.1461 6.86976Z"
        fill="rgb(197, 212, 217)"
        style="animation-delay: 0.4s"
      />
      <path
        class="spinner-ray"
        d="M22.4313 24.2625L20.1963 25.5381L22.8483 30.0786L25.0833 28.803L22.4313 24.2625Z"
        fill="rgb(190, 206, 222)"
        style="animation-delay: 0.5s"
      />
      <path
        class="spinner-ray"
        d="M9.20085 1.61118L6.96582 2.88672L9.6178 7.42721L11.8528 6.15167L9.20085 1.61118Z"
        fill="rgb(184, 199, 227)"
        style="animation-delay: 0.6s"
      />
      <path
        class="spinner-ray"
        d="M22.8512 1.58744L20.1992 6.12793L22.4342 7.40347L25.0862 2.86298L22.8512 1.58744Z"
        fill="rgb(178, 193, 231)"
        style="animation-delay: 0.7s"
      />
      <path
        class="spinner-ray"
        d="M9.61389 24.2632L6.96191 28.8037L9.19694 30.0793L11.8489 25.5388L9.61389 24.2632Z"
        fill="rgb(171, 186, 236)"
        style="animation-delay: 0.8s"
      />
      <path
        class="spinner-ray"
        d="M2.9027 6.87566L1.6123 9.08496L6.20567 11.7064L7.49606 9.49712L2.9027 6.87566Z"
        fill="rgb(165, 180, 241)"
        style="animation-delay: 0.9s"
      />
      <!-- Large diagonal rays -->
      <path
        class="spinner-ray"
        d="M19.2854 16.2334L18.0039 18.4502L24.5538 22.1801L29.128 24.8015L30.4273 22.5847L19.2854 16.2334Z"
        fill="rgb(159, 173, 246)"
        style="animation-delay: 1s"
      />
      <path
        class="spinner-ray"
        d="M6.20432 19.9808L1.6123 22.5847L2.9116 24.8015L14.0357 18.4502L12.7364 16.2334L6.20432 19.9808Z"
        fill="rgb(152, 167, 250)"
        style="animation-delay: 1.1s"
      />
    </svg>
  </div>
</template>
