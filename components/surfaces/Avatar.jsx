import React from 'react';

/**
 * Avatar — circular initials chip for reviewers in the supervision
 * queue and audit trail. Ink-on-bone by default; pass `tone` for the
 * partner (dark) vs associate (bone) distinction.
 */
export function Avatar({ name = '', size = 32, tone = 'bone', style = {} }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  const tones = {
    bone: { background: 'var(--surface-bone)', color: 'var(--charcoal)' },
    dark: { background: 'var(--surface-dark)', color: 'var(--on-dark)' },
    primary: { background: 'var(--primary-soft)', color: 'var(--primary-deep)' },
  };
  const t = tones[tone] || tones.bone;
  return (
    <span
      title={name}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 'var(--radius-full)',
        font: `600 ${Math.round(size * 0.36)}px/1 var(--font-sans)`,
        letterSpacing: '0.02em',
        flex: '0 0 auto',
        ...t,
        ...style,
      }}
    >
      {initials}
    </span>
  );
}
