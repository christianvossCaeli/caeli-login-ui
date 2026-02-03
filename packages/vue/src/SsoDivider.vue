<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string;
    className?: string;
  }>(),
  { text: 'or' },
);
</script>

<template>
  <div :class="['sso-divider', className].filter(Boolean).join(' ')" role="separator">
    <span class="sso-divider__text">{{ text }}</span>
  </div>
</template>
