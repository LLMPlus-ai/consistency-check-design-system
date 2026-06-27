import React from 'react';

/**
 * HealthMeter — radial citation-health score (0–100). The arc colour
 * grades with the score (red → ochre → green). Mono-set readout in the
 * centre. Use `size` to scale; stroke stays proportional.
 */
export function HealthMeter({ score = 58, max = 100, size = 132, label = 'Citation health', valueColor = 'var(--ink)', subColor = 'var(--ash)', labelColor = 'var(--charcoal)', trackColor = 'var(--hairline)', style = {} }) {
  const pct = Math.max(0, Math.min(1, score / max));
  const stroke = Math.round(size * 0.085);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color =
    pct >= 0.75 ? 'var(--verified)' : pct >= 0.5 ? 'var(--mischar)' : 'var(--fabricated)';
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10, ...style }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          <span style={{ font: 'var(--display-md)', letterSpacing: '-0.5px', color: valueColor, lineHeight: 1 }}>
            {score}
          </span>
          <span style={{ font: 'var(--code-sm)', color: subColor }}>/ {max}</span>
        </div>
      </div>
      {label && <span style={{ font: 'var(--caption-strong)', color: labelColor }}>{label}</span>}
    </div>
  );
}
