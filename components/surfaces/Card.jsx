import React from 'react';

/**
 * Card — the content container. White-on-cream with a hairline seat by
 * default. `tone` switches the surface: `bone` (inset), `dark`
 * (inversion for code/audit wells). `pad` controls inner padding.
 */
export function Card({
  tone = 'card',
  pad = 20,
  radius = 'var(--radius-md)',
  interactive = false,
  children,
  style = {},
  ...rest
}) {
  const tones = {
    card: { background: 'var(--surface-card)', color: 'var(--ink)', border: '1px solid var(--hairline)' },
    bone: { background: 'var(--surface-bone)', color: 'var(--ink)', border: '1px solid var(--hairline-soft)' },
    dark: { background: 'var(--surface-dark)', color: 'var(--on-dark)', border: '1px solid rgba(255,255,255,0.08)' },
  };
  const t = tones[tone] || tones.card;
  return (
    <div
      style={{
        borderRadius: radius,
        padding: pad,
        boxShadow: tone === 'card' ? 'var(--elev-card)' : 'none',
        transition: interactive ? 'box-shadow 140ms ease, transform 140ms ease' : 'none',
        cursor: interactive ? 'pointer' : 'default',
        ...t,
        ...style,
      }}
      onMouseEnter={(e) => { if (interactive) e.currentTarget.style.boxShadow = 'var(--elev-2)'; }}
      onMouseLeave={(e) => { if (interactive) e.currentTarget.style.boxShadow = tone === 'card' ? 'var(--elev-card)' : 'none'; }}
      {...rest}
    >
      {children}
    </div>
  );
}
