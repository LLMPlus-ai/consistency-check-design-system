import React from 'react';

const STATUS = {
  Verified: { fg: 'var(--verified)', bg: 'var(--verified-bg)' },
  Mischaracterised: { fg: 'var(--mischar)', bg: 'var(--mischar-bg)' },
  Fabricated: { fg: 'var(--fabricated)', bg: 'var(--fabricated-bg)' },
};

/**
 * StatusBadge — the verification verdict badge. Three sanctioned values:
 * Verified · Mischaracterised · Fabricated. Tinted background + status
 * dot, fully rounded. `solid` fills the verdict hue for emphasis.
 */
export function StatusBadge({ status = 'Verified', label = null, solid = false, style = {} }) {
  const s = STATUS[status] || STATUS.Verified;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 24,
        padding: '0 10px 0 8px',
        borderRadius: 'var(--radius-full)',
        font: 'var(--caption-strong)',
        whiteSpace: 'nowrap',
        background: solid ? s.fg : s.bg,
        color: solid ? 'var(--on-primary)' : s.fg,
        ...style,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: solid ? 'var(--on-primary)' : s.fg,
          flex: '0 0 auto',
        }}
      />
      {label || status}
    </span>
  );
}
