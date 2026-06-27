import React from 'react';

/**
 * StatCard — a single dashboard metric: big mono/ display value, label,
 * and an optional caption. Optional `accent` colours the value and a
 * left rule for status counts (verified/fabricated tallies).
 */
export function StatCard({ value, label, caption = null, accent = null, style = {} }) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        border: '1px solid var(--hairline)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--elev-card)',
        padding: '18px 20px',
        overflow: 'hidden',
        ...style,
      }}
    >
      {accent && (
        <span style={{ position: 'absolute', left: 0, top: 14, bottom: 14, width: 3, borderRadius: 3, background: accent }} />
      )}
      <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>
        {label}
      </div>
      <div
        style={{
          font: 'var(--display-lg)',
          fontSize: 44,
          letterSpacing: '-1px',
          lineHeight: 1.05,
          marginTop: 6,
          color: accent || 'var(--ink)',
        }}
      >
        {value}
      </div>
      {caption && (
        <div style={{ font: 'var(--body-sm)', color: 'var(--charcoal)', marginTop: 4 }}>{caption}</div>
      )}
    </div>
  );
}
