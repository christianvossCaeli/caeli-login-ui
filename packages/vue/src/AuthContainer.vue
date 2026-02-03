<script setup lang="ts">
import { computed } from 'vue';
import type { AuthContainerMode } from './types';

const props = withDefaults(
  defineProps<{
    mode?: AuthContainerMode;
    title?: string;
    description?: string;
    className?: string;
  }>(),
  { mode: 'credentials' },
);

const classes = computed(() =>
  [
    'auth-container',
    props.mode !== 'credentials' && `auth-container--${props.mode}`,
    props.className,
  ]
    .filter(Boolean)
    .join(' '),
);
</script>

<template>
  <div :class="classes" role="group" :aria-label="title ?? 'Authentication'">
    <h2 v-if="title" class="auth-container__title">{{ title }}</h2>
    <p v-if="description" class="auth-container__description">{{ description }}</p>
    <slot />
  </div>
</template>
