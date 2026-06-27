import React from 'react';

/**
 * Tabs — underline tab strip for the app's primary nav and in-panel
 * switching. Active tab carries an orange 2px underline.
 */
export function Tabs({ tabs = [], value, onChange = () => {}, style = {} }) {
  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        gap: 4,
        borderBottom: '1px solid var(--hairline)',
        ...style,
      }}
    >
      {tabs.map((t) => {
        const key = typeof t === 'string' ? t : t.value;
        const label = typeof t === 'string' ? t : t.label;
        const active = key === value;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(key)}
            style={{
              position: 'relative',
              padding: '12px 14px',
              font: 'var(--button-sm)',
              color: active ? 'var(--ink)' : 'var(--mute)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 120ms ease',
            }}
          >
            {label}
            <span
              style={{
                position: 'absolute',
                left: 8,
                right: 8,
                bottom: -1,
                height: 2,
                borderRadius: 2,
                background: active ? 'var(--primary)' : 'transparent',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
