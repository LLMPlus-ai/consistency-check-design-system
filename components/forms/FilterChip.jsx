import React from 'react';

/**
 * FilterChip — pill toggle for the findings filter row
 * (All · Verified · Mischaracterised · Fabricated). Optional count
 * and a leading status dot. Active state fills ink/dark.
 */
export function FilterChip({
  active = false,
  count = null,
  dotColor = null,
  children,
  style = {},
  ...rest
}) {
  return (
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 36,
        padding: '0 14px',
        font: 'var(--button-sm)',
        borderRadius: 'var(--radius-full)',
        cursor: 'pointer',
        background: active ? 'var(--ink)' : 'var(--surface-card)',
        color: active ? 'var(--on-dark)' : 'var(--charcoal)',
        border: `1px solid ${active ? 'var(--ink)' : 'var(--hairline)'}`,
        transition: 'background 120ms ease, color 120ms ease, border-color 120ms ease',
        ...style,
      }}
      {...rest}
    >
      {dotColor && (
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flex: '0 0 auto' }} />
      )}
      {children}
      {count != null && (
        <span
          style={{
            font: 'var(--code-sm)',
            color: active ? 'var(--on-dark-mute)' : 'var(--ash)',
            marginLeft: 2,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
