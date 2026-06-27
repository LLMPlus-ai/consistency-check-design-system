import React from 'react';

const RISK = {
  Low: { fg: 'var(--risk-low)', bg: 'var(--risk-low-bg)' },
  Medium: { fg: 'var(--risk-medium)', bg: 'var(--risk-medium-bg)' },
  High: { fg: 'var(--risk-high)', bg: 'var(--risk-high-bg)' },
  Critical: { fg: 'var(--risk-critical)', bg: 'var(--risk-critical-bg)' },
};

/**
 * RiskBadge — graded risk indicator (Low · Medium · High · Critical).
 * Defaults to a tinted pill; `bar` renders a compact 4-segment meter
 * for at-a-glance scanning in dense tables.
 */
export function RiskBadge({ level = 'Low', variant = 'pill', style = {} }) {
  const r = RISK[level] || RISK.Low;
  if (variant === 'bar') {
    const order = ['Low', 'Medium', 'High', 'Critical'];
    const filled = order.indexOf(level) + 1;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...style }}>
        <span style={{ display: 'inline-flex', gap: 3 }}>
          {order.map((_, i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 14,
                borderRadius: 2,
                background: i < filled ? r.fg : 'var(--hairline)',
              }}
            />
          ))}
        </span>
        <span style={{ font: 'var(--caption-strong)', color: r.fg }}>{level}</span>
      </span>
    );
  }
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 24,
        padding: '0 10px',
        borderRadius: 'var(--radius-full)',
        font: 'var(--caption-strong)',
        background: r.bg,
        color: r.fg,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {level}
    </span>
  );
}
