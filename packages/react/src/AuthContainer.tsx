'use client';

import type { AuthContainerProps } from './types';

/**
 * AuthContainer — Layout wrapper for authentication flows.
 *
 * Use `mode` to switch between credential-based, SSO-only, or combined layouts.
 */
export function AuthContainer({
  mode = 'credentials',
  title,
  description,
  children,
  className,
}: AuthContainerProps) {
  const classes = [
    'auth-container',
    mode !== 'credentials' && `auth-container--${mode}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="group" aria-label={title ?? 'Authentication'}>
      {title && <h2 className="auth-container__title">{title}</h2>}
      {description && (
        <p className="auth-container__description">{description}</p>
      )}
      {children}
    </div>
  );
}
