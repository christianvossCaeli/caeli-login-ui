<script setup lang="ts">
/**
 * MicrosoftSsoButton - Styled "Sign in with Microsoft" button
 *
 * Presentational component — works without @azure/msal-browser.
 * Listen to the `click` event to wire up your auth logic.
 */

import type { MicrosoftSsoButtonProps } from './types';

const props = withDefaults(defineProps<MicrosoftSsoButtonProps>(), {
  loading: false,
  disabled: false,
  label: 'Sign in with Microsoft',
  className: undefined,
});

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <button
    type="button"
    :class="['sso-button', 'sso-button--microsoft', props.className]"
    :disabled="props.disabled || props.loading"
    :aria-busy="props.loading"
    @click="$emit('click', $event)"
  >
    <span
      v-if="props.loading"
      class="sso-button__spinner"
      role="status"
      aria-label="Loading"
    />
    <svg
      class="sso-button__icon"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
    <span class="sso-button__label">{{ props.label }}</span>
  </button>
</template>
