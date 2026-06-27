import React from 'react';

/**
 * Button — Consistency Check's primary action primitive.
 * Fully-rounded (pill) per the brand. Orange `primary` is the scarce
 * stamp; reach for `dark` or `outline` when orange would be too loud.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    md: { height: 44, padding: '0 24px', font: 'var(--button-md)', gap: 8 },
    sm: { height: 36, padding: '0 16px', font: 'var(--button-sm)', gap: 6 },
  };
  const variants = {
    primary: { background: 'var(--primary)', color: 'var(--on-primary)', border: '1px solid var(--primary)' },
    dark: { background: 'var(--surface-dark)', color: 'var(--on-dark)', border: '1px solid var(--surface-dark)' },
    outline: { background: 'var(--surface-card)', color: 'var(--ink)', border: '1px solid var(--hairline-strong)' },
    ghost: { background: 'transparent', color: 'var(--ink)', border: '1px solid transparent' },
    danger: { background: 'var(--fabricated)', color: 'var(--on-primary)', border: '1px solid var(--fabricated)' },
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        width: fullWidth ? '100%' : 'auto',
        font: s.font,
        letterSpacing: 0,
        borderRadius: 'var(--radius-full)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        whiteSpace: 'nowrap',
        transition: 'background 120ms ease, transform 80ms ease, opacity 120ms ease',
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(0.5px)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
