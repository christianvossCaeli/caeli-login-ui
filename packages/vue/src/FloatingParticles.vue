<script setup lang="ts">
/**
 * FloatingParticles - Animated particles that float upward
 *
 * Creates a decorative particle effect in the background.
 * Particles are generated deterministically based on index to avoid
 * hydration mismatches in SSR environments.
 */

import { ref, onMounted, watch } from 'vue';
import type { Particle, FloatingParticlesProps } from './types';

const props = withDefaults(defineProps<FloatingParticlesProps>(), {
  count: 20,
});

const particles = ref<Particle[]>([]);

/**
 * Generates particles with deterministic pseudo-random distribution
 */
function generateParticles(count: number): Particle[] {
  const result: Particle[] = [];
  for (let i = 0; i < count; i++) {
    result.push({
      id: i,
      size: 2 + ((i * 7) % 5),
      left: (i * 17) % 100,
      delay: (i * 3) % 5,
      duration: 5 + ((i * 11) % 5),
    });
  }
  return result;
}

onMounted(() => {
  particles.value = generateParticles(props.count);
});

watch(
  () => props.count,
  (newCount) => {
    particles.value = generateParticles(newCount);
  }
);
</script>

<template>
  <div class="particles" aria-hidden="true">
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="particle"
      :style="{
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        left: `${particle.left}%`,
        animationDelay: `${particle.delay}s`,
        animationDuration: `${particle.duration}s`,
      }"
    />
  </div>
</template>
