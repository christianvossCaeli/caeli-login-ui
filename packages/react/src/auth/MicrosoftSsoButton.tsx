'use client';

import { memo } from 'react';
import type { MicrosoftSsoButtonProps } from './types';

/**
 * MicrosoftSsoButton - Styled "Sign in with Microsoft" button
 *
 * Presentational component — works without @azure/msal-browser.
 * Wire up the `onClick` handler to your auth logic.
 */
export const MicrosoftSsoButton = memo(function MicrosoftSsoButton({
  onClick,
  loading = false,
  disabled = false,
  label = 'Sign in with Microsoft',
  className,
}: MicrosoftSsoButtonProps) {
  const classes = ['sso-button', 'sso-button--microsoft', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && (
        <span className="sso-button__spinner" role="status" aria-label="Loading" />
      )}
      <svg
        className="sso-button__icon"
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
      <span className="sso-button__label">{label}</span>
    </button>
  );
});
