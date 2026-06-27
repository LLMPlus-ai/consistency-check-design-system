import React from 'react';

/**
 * IconButton — 36px circular icon-only control. Outline hairline by
 * default; `bare` drops the border for toolbar density.
 */
export function IconButton({
  variant = 'outline',
  size = 36,
  ariaLabel,
  children,
  style = {},
  ...rest
}) {
  const variants = {
    outline: { background: 'var(--surface-card)', color: 'var(--ink)', border: '1px solid var(--hairline)' },
    bare: { background: 'transparent', color: 'var(--charcoal)', border: '1px solid transparent' },
    dark: { background: 'var(--surface-dark)', color: 'var(--on-dark)', border: '1px solid var(--surface-dark)' },
  };
  const v = variants[variant] || variants.outline;
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 'var(--radius-full)',
        cursor: 'pointer',
        transition: 'background 120ms ease, color 120ms ease',
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => { if (variant === 'bare') e.currentTarget.style.background = 'var(--surface-bone)'; }}
      onMouseLeave={(e) => { if (variant === 'bare') e.currentTarget.style.background = 'transparent'; }}
      {...rest}
    >
      {children}
    </button>
  );
}
