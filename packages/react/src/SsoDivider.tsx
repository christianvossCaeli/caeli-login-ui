import type { SsoDividerProps } from './types';

/**
 * SsoDivider — Visual separator between credential form and SSO buttons.
 *
 * Renders the existing `.sso-divider` styles as a reusable component.
 */
export function SsoDivider({ text = 'or', className }: SsoDividerProps) {
  const classes = ['sso-divider', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="separator">
      <span className="sso-divider__text">{text}</span>
    </div>
  );
}
