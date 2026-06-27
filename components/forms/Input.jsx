import React from 'react';

/**
 * Input — pill text field on white, hairline border, orange focus ring.
 * Optional leading icon (e.g. a search glyph).
 */
export function Input({
  size = 'md',
  iconLeft = null,
  type = 'text',
  style = {},
  wrapStyle = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const heights = { md: 44, sm: 36 };
  const h = heights[size] || 44;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: h,
        padding: iconLeft ? '0 18px 0 14px' : '0 18px',
        background: 'var(--surface-card)',
        border: `1px solid ${focused ? 'var(--hairline-strong)' : 'var(--hairline)'}`,
        borderRadius: 'var(--radius-full)',
        boxShadow: focused ? '0 0 0 3px var(--ring-focus)' : 'none',
        transition: 'box-shadow 120ms ease, border-color 120ms ease',
        ...wrapStyle,
      }}
    >
      {iconLeft && <span style={{ display: 'flex', color: 'var(--ash)', flex: '0 0 auto' }}>{iconLeft}</span>}
      <input
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          minWidth: 0,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          font: size === 'sm' ? 'var(--body-sm)' : 'var(--body-md)',
          color: 'var(--ink)',
          ...style,
        }}
        {...rest}
      />
    </div>
  );
}
