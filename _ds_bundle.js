/* @ds-bundle: {"format":3,"namespace":"ConsistencyCheckDesignSystem_77c3a7","components":[{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"FilterChip","sourcePath":"components/forms/FilterChip.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Tabs","sourcePath":"components/forms/Tabs.jsx"},{"name":"HealthMeter","sourcePath":"components/status/HealthMeter.jsx"},{"name":"RiskBadge","sourcePath":"components/status/RiskBadge.jsx"},{"name":"StatusBadge","sourcePath":"components/status/StatusBadge.jsx"},{"name":"Avatar","sourcePath":"components/surfaces/Avatar.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"StatCard","sourcePath":"components/surfaces/StatCard.jsx"}],"sourceHashes":{"components/forms/Button.jsx":"8dd23c68a07f","components/forms/FilterChip.jsx":"92ae01b45d23","components/forms/IconButton.jsx":"25e22febaa0a","components/forms/Input.jsx":"573c65118784","components/forms/Tabs.jsx":"54ecf00dbf91","components/status/HealthMeter.jsx":"00ab305b0dd0","components/status/RiskBadge.jsx":"f3dfa1a374c9","components/status/StatusBadge.jsx":"86cea9c248f6","components/surfaces/Avatar.jsx":"1d7551fb4519","components/surfaces/Card.jsx":"ce97acdc0ece","components/surfaces/StatCard.jsx":"2e5cbf4b876d","ui_kits/consistency-check/App.jsx":"14af2ff86252","ui_kits/consistency-check/AuditTrail.jsx":"300e859c4bcc","ui_kits/consistency-check/CaseHeader.jsx":"e0e25fe7467c","ui_kits/consistency-check/CitationChecker.jsx":"318ff2c84c4c","ui_kits/consistency-check/Dashboard.jsx":"ca6681aa9f69","ui_kits/consistency-check/DataSources.jsx":"284ac97f7310","ui_kits/consistency-check/DocumentWorkspace.jsx":"759c8ea8ed6b","ui_kits/consistency-check/Insights.jsx":"e8c6d1b38bc8","ui_kits/consistency-check/Report.jsx":"13170d2db200","ui_kits/consistency-check/SourceLibrary.jsx":"464611d0f616","ui_kits/consistency-check/Verification.jsx":"c4f755aa5c5c","ui_kits/consistency-check/data.js":"0a1f5cac200f","ui_kits/consistency-check/flow.js":"84b9e924ddc8","ui_kits/consistency-check/metrics.js":"ff8fdde0e703","ui_kits/consistency-check/shared.jsx":"9b564ed7308b","ui_kits/consistency-check/treatment.js":"6b5a673a7827"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ConsistencyCheckDesignSystem_77c3a7 = window.ConsistencyCheckDesignSystem_77c3a7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — Consistency Check's primary action primitive.
 * Fully-rounded (pill) per the brand. Orange `primary` is the scarce
 * stamp; reach for `dark` or `outline` when orange would be too loud.
 */
function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    md: {
      height: 44,
      padding: '0 24px',
      font: 'var(--button-md)',
      gap: 8
    },
    sm: {
      height: 36,
      padding: '0 16px',
      font: 'var(--button-sm)',
      gap: 6
    }
  };
  const variants = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      border: '1px solid var(--primary)'
    },
    dark: {
      background: 'var(--surface-dark)',
      color: 'var(--on-dark)',
      border: '1px solid var(--surface-dark)'
    },
    outline: {
      background: 'var(--surface-card)',
      color: 'var(--ink)',
      border: '1px solid var(--hairline-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink)',
      border: '1px solid transparent'
    },
    danger: {
      background: 'var(--fabricated)',
      color: 'var(--on-primary)',
      border: '1px solid var(--fabricated)'
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      width: fullWidth ? '100%' : 'auto',
      font: s.font,
      letterSpacing: 0,
      borderRadius: 'var(--radius-full)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      whiteSpace: 'nowrap',
      transition: 'background 120ms ease, transform 80ms ease, opacity 120ms ease',
      ...v,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(0.5px)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/FilterChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FilterChip — pill toggle for the findings filter row
 * (All · Verified · Mischaracterised · Fabricated). Optional count
 * and a leading status dot. Active state fills ink/dark.
 */
function FilterChip({
  active = false,
  count = null,
  dotColor = null,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    style: {
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
      ...style
    }
  }, rest), dotColor && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: dotColor,
      flex: '0 0 auto'
    }
  }), children, count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: active ? 'var(--on-dark-mute)' : 'var(--ash)',
      marginLeft: 2
    }
  }, count));
}
Object.assign(__ds_scope, { FilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FilterChip.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — 36px circular icon-only control. Outline hairline by
 * default; `bare` drops the border for toolbar density.
 */
function IconButton({
  variant = 'outline',
  size = 36,
  ariaLabel,
  children,
  style = {},
  ...rest
}) {
  const variants = {
    outline: {
      background: 'var(--surface-card)',
      color: 'var(--ink)',
      border: '1px solid var(--hairline)'
    },
    bare: {
      background: 'transparent',
      color: 'var(--charcoal)',
      border: '1px solid transparent'
    },
    dark: {
      background: 'var(--surface-dark)',
      color: 'var(--on-dark)',
      border: '1px solid var(--surface-dark)'
    }
  };
  const v = variants[variant] || variants.outline;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      transition: 'background 120ms ease, color 120ms ease',
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (variant === 'bare') e.currentTarget.style.background = 'var(--surface-bone)';
    },
    onMouseLeave: e => {
      if (variant === 'bare') e.currentTarget.style.background = 'transparent';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — pill text field on white, hairline border, orange focus ring.
 * Optional leading icon (e.g. a search glyph).
 */
function Input({
  size = 'md',
  iconLeft = null,
  type = 'text',
  style = {},
  wrapStyle = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const heights = {
    md: 44,
    sm: 36
  };
  const h = heights[size] || 44;
  return /*#__PURE__*/React.createElement("div", {
    style: {
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
      ...wrapStyle
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: 'var(--ash)',
      flex: '0 0 auto'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: size === 'sm' ? 'var(--body-sm)' : 'var(--body-md)',
      color: 'var(--ink)',
      ...style
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Tabs.jsx
try { (() => {
/**
 * Tabs — underline tab strip for the app's primary nav and in-panel
 * switching. Active tab carries an orange 2px underline.
 */
function Tabs({
  tabs = [],
  value,
  onChange = () => {},
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--hairline)',
      ...style
    }
  }, tabs.map(t => {
    const key = typeof t === 'string' ? t : t.value;
    const label = typeof t === 'string' ? t : t.label;
    const active = key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange(key),
      style: {
        position: 'relative',
        padding: '12px 14px',
        font: 'var(--button-sm)',
        color: active ? 'var(--ink)' : 'var(--mute)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        transition: 'color 120ms ease'
      }
    }, label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: -1,
        height: 2,
        borderRadius: 2,
        background: active ? 'var(--primary)' : 'transparent'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/status/HealthMeter.jsx
try { (() => {
/**
 * HealthMeter — radial citation-health score (0–100). The arc colour
 * grades with the score (red → ochre → green). Mono-set readout in the
 * centre. Use `size` to scale; stroke stays proportional.
 */
function HealthMeter({
  score = 58,
  max = 100,
  size = 132,
  label = 'Citation health',
  valueColor = 'var(--ink)',
  subColor = 'var(--ash)',
  labelColor = 'var(--charcoal)',
  trackColor = 'var(--hairline)',
  style = {}
}) {
  const pct = Math.max(0, Math.min(1, score / max));
  const stroke = Math.round(size * 0.085);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = pct >= 0.75 ? 'var(--verified)' : pct >= 0.5 ? 'var(--mischar)' : 'var(--fabricated)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: trackColor,
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: c * (1 - pct)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--display-md)',
      letterSpacing: '-0.5px',
      color: valueColor,
      lineHeight: 1
    }
  }, score), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: subColor
    }
  }, "/ ", max))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      color: labelColor
    }
  }, label));
}
Object.assign(__ds_scope, { HealthMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/HealthMeter.jsx", error: String((e && e.message) || e) }); }

// components/status/RiskBadge.jsx
try { (() => {
const RISK = {
  Low: {
    fg: 'var(--risk-low)',
    bg: 'var(--risk-low-bg)'
  },
  Medium: {
    fg: 'var(--risk-medium)',
    bg: 'var(--risk-medium-bg)'
  },
  High: {
    fg: 'var(--risk-high)',
    bg: 'var(--risk-high-bg)'
  },
  Critical: {
    fg: 'var(--risk-critical)',
    bg: 'var(--risk-critical-bg)'
  }
};

/**
 * RiskBadge — graded risk indicator (Low · Medium · High · Critical).
 * Defaults to a tinted pill; `bar` renders a compact 4-segment meter
 * for at-a-glance scanning in dense tables.
 */
function RiskBadge({
  level = 'Low',
  variant = 'pill',
  style = {}
}) {
  const r = RISK[level] || RISK.Low;
  if (variant === 'bar') {
    const order = ['Low', 'Medium', 'High', 'Critical'];
    const filled = order.indexOf(level) + 1;
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        gap: 3
      }
    }, order.map((_, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        width: 6,
        height: 14,
        borderRadius: 2,
        background: i < filled ? r.fg : 'var(--hairline)'
      }
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--caption-strong)',
        color: r.fg
      }
    }, level));
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 24,
      padding: '0 10px',
      borderRadius: 'var(--radius-full)',
      font: 'var(--caption-strong)',
      background: r.bg,
      color: r.fg,
      whiteSpace: 'nowrap',
      ...style
    }
  }, level);
}
Object.assign(__ds_scope, { RiskBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/RiskBadge.jsx", error: String((e && e.message) || e) }); }

// components/status/StatusBadge.jsx
try { (() => {
const STATUS = {
  Verified: {
    fg: 'var(--verified)',
    bg: 'var(--verified-bg)'
  },
  Mischaracterised: {
    fg: 'var(--mischar)',
    bg: 'var(--mischar-bg)'
  },
  Fabricated: {
    fg: 'var(--fabricated)',
    bg: 'var(--fabricated-bg)'
  }
};

/**
 * StatusBadge — the verification verdict badge. Three sanctioned values:
 * Verified · Mischaracterised · Fabricated. Tinted background + status
 * dot, fully rounded. `solid` fills the verdict hue for emphasis.
 */
function StatusBadge({
  status = 'Verified',
  label = null,
  solid = false,
  style = {}
}) {
  const s = STATUS[status] || STATUS.Verified;
  return /*#__PURE__*/React.createElement("span", {
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: solid ? 'var(--on-primary)' : s.fg,
      flex: '0 0 auto'
    }
  }), label || status);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Avatar.jsx
try { (() => {
/**
 * Avatar — circular initials chip for reviewers in the supervision
 * queue and audit trail. Ink-on-bone by default; pass `tone` for the
 * partner (dark) vs associate (bone) distinction.
 */
function Avatar({
  name = '',
  size = 32,
  tone = 'bone',
  style = {}
}) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const tones = {
    bone: {
      background: 'var(--surface-bone)',
      color: 'var(--charcoal)'
    },
    dark: {
      background: 'var(--surface-dark)',
      color: 'var(--on-dark)'
    },
    primary: {
      background: 'var(--primary-soft)',
      color: 'var(--primary-deep)'
    }
  };
  const t = tones[tone] || tones.bone;
  return /*#__PURE__*/React.createElement("span", {
    title: name,
    style: {
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
      ...style
    }
  }, initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the content container. White-on-cream with a hairline seat by
 * default. `tone` switches the surface: `bone` (inset), `dark`
 * (inversion for code/audit wells). `pad` controls inner padding.
 */
function Card({
  tone = 'card',
  pad = 20,
  radius = 'var(--radius-md)',
  interactive = false,
  children,
  style = {},
  ...rest
}) {
  const tones = {
    card: {
      background: 'var(--surface-card)',
      color: 'var(--ink)',
      border: '1px solid var(--hairline)'
    },
    bone: {
      background: 'var(--surface-bone)',
      color: 'var(--ink)',
      border: '1px solid var(--hairline-soft)'
    },
    dark: {
      background: 'var(--surface-dark)',
      color: 'var(--on-dark)',
      border: '1px solid rgba(255,255,255,0.08)'
    }
  };
  const t = tones[tone] || tones.card;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: radius,
      padding: pad,
      boxShadow: tone === 'card' ? 'var(--elev-card)' : 'none',
      transition: interactive ? 'box-shadow 140ms ease, transform 140ms ease' : 'none',
      cursor: interactive ? 'pointer' : 'default',
      ...t,
      ...style
    },
    onMouseEnter: e => {
      if (interactive) e.currentTarget.style.boxShadow = 'var(--elev-2)';
    },
    onMouseLeave: e => {
      if (interactive) e.currentTarget.style.boxShadow = tone === 'card' ? 'var(--elev-card)' : 'none';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/StatCard.jsx
try { (() => {
/**
 * StatCard — a single dashboard metric: big mono/ display value, label,
 * and an optional caption. Optional `accent` colours the value and a
 * left rule for status counts (verified/fabricated tallies).
 */
function StatCard({
  value,
  label,
  caption = null,
  accent = null,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--elev-card)',
      padding: '18px 20px',
      overflow: 'hidden',
      ...style
    }
  }, accent && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 14,
      bottom: 14,
      width: 3,
      borderRadius: 3,
      background: accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--display-lg)',
      fontSize: 44,
      letterSpacing: '-1px',
      lineHeight: 1.05,
      marginTop: 6,
      color: accent || 'var(--ink)'
    }
  }, value), caption && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--charcoal)',
      marginTop: 4
    }
  }, caption));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/StatCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/App.jsx
try { (() => {
/* App shell — top nav + tab routing + shared interaction layer. */
const {
  CCIcon: Icon
} = window;
const {
  useState,
  useEffect
} = React;
const TABS = ['Document', 'Source Library', 'Dashboard', 'Insights', 'Citation Checker', 'Verification', 'Audit Trail', 'Data Sources'];
const TAB_LABELS = {
  'Source Library': 'Library',
  'Citation Checker': 'Citations',
  'Audit Trail': 'Audit',
  'Data Sources': 'Sources'
};
// Visible nav — trimmed to the core workflow. All tabs remain routable via app.goTo().
const NAV_TABS = ['Document', 'Citation Checker', 'Verification'];
// The rest of the original full view — reachable from the "More" menu.
const MORE_TABS = ['Source Library', 'Dashboard', 'Audit Trail', 'Data Sources'];
const MORE_ICONS = {
  'Source Library': 'library',
  'Dashboard': 'layout-dashboard',
  'Insights': 'bar-chart-3',
  'Audit Trail': 'history',
  'Data Sources': 'database'
};
function fsElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
}
function FullscreenButton({
  app
}) {
  const [fs, setFs] = useState(false);
  useEffect(() => {
    const on = () => setFs(!!fsElement() || app.immersive);
    document.addEventListener('fullscreenchange', on);
    document.addEventListener('webkitfullscreenchange', on);
    return () => {
      document.removeEventListener('fullscreenchange', on);
      document.removeEventListener('webkitfullscreenchange', on);
    };
  }, [app.immersive]);
  const active = !!fsElement() || app.immersive;
  const enterNative = () => {
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (!req) return Promise.reject();
    try {
      const r = req.call(el);
      return r && r.then ? r : Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const exitNative = () => {
    const ex = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    if (ex) try {
      ex.call(document);
    } catch (e) {}
  };
  const toggle = () => {
    if (fsElement()) {
      exitNative();
      app.setImmersive(false);
      return;
    }
    if (app.immersive) {
      app.setImmersive(false);
      return;
    }
    // try real browser full-screen; if blocked (e.g. sandboxed iframe), fall back to immersive layout
    enterNative().then(() => setFs(true)).catch(() => {
      app.setImmersive(true);
      setFs(true);
    });
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: toggle,
    title: active ? 'Exit full screen' : 'Enter full screen',
    "aria-label": active ? 'Exit full screen' : 'Enter full screen',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-full)',
      background: active ? 'var(--surface-dark)' : 'var(--surface-card)',
      color: active ? 'var(--on-dark)' : 'var(--ink)',
      border: '1px solid ' + (active ? 'transparent' : 'var(--hairline-strong)'),
      cursor: 'pointer',
      transition: 'background 120ms ease'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: active ? 'minimize' : 'maximize',
    size: 15
  }));
}
function TopNav({
  app,
  tab
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 64,
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      padding: '10px 24px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => app.goTo('Document'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-consistency-check.png",
    alt: "Consistency Check",
    style: {
      height: 32,
      width: 'auto',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      justifyContent: 'center'
    }
  }, window.CCStageStepper ? /*#__PURE__*/React.createElement(window.CCStageStepper, {
    app: app,
    bare: true
  }) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(FullscreenButton, {
    app: app
  }))));
}
function TabBar({
  tab,
  app
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 60,
      zIndex: 9,
      background: 'var(--canvas)',
      borderBottom: '1px solid var(--hairline)',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flexWrap: 'wrap'
    }
  }, NAV_TABS.map(t => {
    const active = t === tab;
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: () => app.goTo(t),
      style: {
        position: 'relative',
        height: 46,
        padding: '0 13px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        font: 'var(--button-sm)',
        color: active ? 'var(--ink)' : 'var(--mute)',
        transition: 'color 120ms ease',
        whiteSpace: 'nowrap'
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.color = 'var(--ink)';
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.color = 'var(--mute)';
      }
    }, TAB_LABELS[t] || t, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: -1,
        height: 2,
        borderRadius: 2,
        background: active ? 'var(--primary)' : 'transparent'
      }
    }));
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => app.goTo('Insights'),
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 32,
      padding: '0 14px',
      borderRadius: 'var(--radius-full)',
      background: tab === 'Insights' ? 'var(--surface-dark)' : 'transparent',
      color: tab === 'Insights' ? 'var(--on-dark)' : 'var(--ink)',
      border: `1px solid ${tab === 'Insights' ? 'var(--surface-dark)' : 'var(--hairline-strong)'}`,
      cursor: 'pointer',
      font: 'var(--button-sm)',
      whiteSpace: 'nowrap'
    },
    onMouseEnter: e => {
      if (tab !== 'Insights') e.currentTarget.style.background = 'rgba(32,32,32,0.04)';
    },
    onMouseLeave: e => {
      if (tab !== 'Insights') e.currentTarget.style.background = 'transparent';
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bar-chart-3",
    size: 14
  }), " View deep analysis", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14
  }))));
}
function MoreMenu({
  tab,
  app
}) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  const activeHere = MORE_TABS.includes(tab);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      marginLeft: 2
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 46,
      padding: '0 13px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      font: 'var(--button-sm)',
      color: activeHere || open ? 'var(--ink)' : 'var(--mute)',
      transition: 'color 120ms ease',
      whiteSpace: 'nowrap'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--ink)';
    },
    onMouseLeave: e => {
      if (!activeHere && !open) e.currentTarget.style.color = 'var(--mute)';
    }
  }, "More ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 14,
    style: {
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 140ms ease'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 10,
      right: 22,
      bottom: -1,
      height: 2,
      borderRadius: 2,
      background: activeHere ? 'var(--primary)' : 'transparent'
    }
  })), open ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 44,
      left: 0,
      minWidth: 188,
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline-strong)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-pop, 0 12px 32px rgba(32,32,32,0.16))',
      padding: 6,
      zIndex: 40,
      animation: 'ccPop 140ms ease both'
    }
  }, MORE_TABS.map(t => {
    const active = t === tab;
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: () => {
        app.goTo(t);
        setOpen(false);
      },
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 10px',
        borderRadius: 'var(--radius-sm)',
        background: active ? 'rgba(32,32,32,0.05)' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        font: 'var(--button-sm)',
        color: 'var(--ink)',
        textAlign: 'left'
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = 'rgba(32,32,32,0.04)';
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: MORE_ICONS[t],
      size: 15,
      style: {
        color: 'var(--mute)'
      }
    }), TAB_LABELS[t] || t);
  })) : null);
}
function ProjectsRail({
  activeProject,
  setActiveProject,
  app,
  width
}) {
  const projects = window.CCData.projects;
  const flagged = window.CCReviewQueue ? window.CCReviewQueue() : window.CCData.findings;
  const total = flagged.length;
  const resolved = flagged.filter(f => app.docEdits[f.id] || app.reviews[f.id]).length;
  const partApproved = flagged.filter(f => app.partnerApproved[f.id]).length;
  const ids = flagged.map(f => f.id);
  const stage = app.wfStage;
  const assocReady = total > 0 && resolved === total;
  const partReady = total > 0 && partApproved === total;
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: width || 248,
      flex: '0 0 ' + (width || 248) + 'px',
      borderRight: '1px solid var(--hairline)',
      background: 'var(--surface-bone)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 64,
      height: 'calc(100vh - 64px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      borderBottom: '1px solid var(--hairline)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--mute)'
    }
  }, "Matters"), /*#__PURE__*/React.createElement("button", {
    onClick: () => app.openUpload(),
    title: "New review",
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      border: '1px solid var(--hairline)',
      background: 'var(--surface-card)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      overflowY: 'auto',
      flex: 1
    }
  }, projects.map((p, pi) => {
    const active = p.id === activeProject;
    const isPrimary = pi === 0; // the live-workflow matter
    const hue = p.health >= 75 ? 'var(--verified)' : p.health >= 50 ? 'var(--mischar)' : 'var(--fabricated)';
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      role: "button",
      tabIndex: 0,
      onClick: () => {
        setActiveProject(p.id);
      },
      onKeyDown: e => {
        if (e.key === 'Enter') setActiveProject(p.id);
      },
      style: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: '11px 12px',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        background: active ? 'var(--surface-card)' : 'transparent',
        border: `1px solid ${active ? 'var(--hairline)' : 'transparent'}`,
        boxShadow: active ? 'var(--elev-card)' : 'none'
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = 'rgba(32,32,32,0.03)';
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--caption)',
        color: 'var(--mute)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, p.client), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: hue,
        flex: '0 0 auto'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--caption-strong)',
        fontSize: 13,
        color: 'var(--ink)',
        lineHeight: 1.3
      }
    }, p.matter), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        font: 'var(--code-sm)',
        color: 'var(--ash)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: hue
      }
    }, p.health), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, p.flags ? p.flags + ' flags' : 'cleared'), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto'
      }
    }, p.updated)), active && isPrimary && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        marginTop: 5,
        paddingTop: 9,
        borderTop: '1px solid var(--hairline)',
        font: 'var(--code-sm)',
        color: 'var(--fabricated)',
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'var(--fabricated)',
        animation: 'ccPulse 1.6s infinite'
      }
    }), " 02:38:47 to filing"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 6,
        font: 'var(--body-sm)',
        color: 'var(--mute)'
      }
    }, /*#__PURE__*/React.createElement("span", null, stage === 'partner' ? 'Stage 2 — citations approved' : 'Stage 1 — citations reviewed'), /*#__PURE__*/React.createElement("b", {
      style: {
        font: 'var(--code-sm)',
        fontWeight: 600,
        color: 'var(--ink)'
      }
    }, stage === 'partner' ? partApproved : resolved, "/", total)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        height: 6,
        background: 'var(--hairline)',
        borderRadius: 3,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        height: '100%',
        width: (total ? (stage === 'partner' ? partApproved : resolved) / total * 100 : 0) + '%',
        background: stage === 'partner' ? 'var(--primary-deep)' : 'var(--ink)',
        borderRadius: 3,
        transition: 'width 300ms ease'
      }
    }))), stage === 'partner' && !partReady && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        border: '1px solid var(--primary)',
        background: 'var(--primary-soft)',
        borderRadius: 'var(--radius-md)',
        padding: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--overline)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: 600,
        color: 'var(--primary-deep)',
        marginBottom: 5
      }
    }, "Optional at this stage"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--body-sm)',
        color: 'var(--body)',
        lineHeight: 1.45,
        marginBottom: 10
      }
    }, "Stage 1 is complete \u2014 the associate reviewed all ", total, ". Spot-check each citation, or accept their review as it stands."), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        app.trustAll(ids);
        setTimeout(() => app.completeClean(), 480);
      },
      style: {
        width: '100%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        padding: '10px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--primary-deep)',
        color: 'var(--on-dark)',
        border: 'none',
        cursor: 'pointer',
        font: 'var(--button-sm)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "shield-check",
      size: 14
    }), " Trust associate \u2014 approve all & complete"), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        font: 'var(--body-sm)',
        color: 'var(--primary-deep)',
        opacity: 0.8,
        marginTop: 8
      }
    }, "or approve each citation individually"))), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        setActiveProject(p.id);
        app.goTo('Insights');
      },
      style: {
        marginTop: 6,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        width: '100%',
        padding: '9px 12px',
        borderRadius: 'var(--radius-md)',
        background: active ? 'var(--surface-dark)' : 'transparent',
        color: active ? 'var(--on-dark)' : 'var(--charcoal)',
        border: `1px solid ${active ? 'var(--surface-dark)' : 'var(--hairline-strong)'}`,
        cursor: 'pointer',
        font: 'var(--button-sm)',
        fontSize: 12.5
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = 'rgba(32,32,32,0.05)';
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bar-chart-3",
      size: 14
    }), " See Deepdive & Analytics"), " ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 13
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      borderTop: '1px solid var(--hairline)',
      flex: '0 0 auto',
      background: 'var(--surface-bone)'
    }
  }, stage === 'associate' ? /*#__PURE__*/React.createElement("button", {
    onClick: () => assocReady && app.sendToPartner(),
    disabled: !assocReady,
    style: {
      width: '100%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '12px',
      borderRadius: 'var(--radius-md)',
      border: 'none',
      font: 'var(--button-md)',
      cursor: assocReady ? 'pointer' : 'not-allowed',
      background: assocReady ? 'var(--surface-dark)' : 'var(--hairline)',
      color: assocReady ? 'var(--on-dark)' : 'var(--ash)'
    }
  }, "Send to partner ", assocReady ? /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 15
  }) : null) : /*#__PURE__*/React.createElement("button", {
    onClick: () => partReady && app.completeClean(),
    disabled: !partReady,
    style: {
      width: '100%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: '12px',
      borderRadius: 'var(--radius-md)',
      border: 'none',
      font: 'var(--button-md)',
      cursor: partReady ? 'pointer' : 'not-allowed',
      background: partReady ? 'var(--primary-deep)' : 'var(--hairline)',
      color: partReady ? 'var(--on-dark)' : 'var(--ash)'
    }
  }, "Complete \u2014 generate clean copy"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: 'var(--body-sm)',
      color: 'var(--faint, var(--ash))',
      marginTop: 8,
      lineHeight: 1.4
    }
  }, stage === 'associate' ? assocReady ? 'All ' + total + ' reviewed — ready for sign-off' : total - resolved + ' citation' + (total - resolved === 1 ? '' : 's') + ' left to review' : partReady ? 'All approved — produce the filing copy' : total - partApproved + ' citation' + (total - partApproved === 1 ? '' : 's') + ' left to approve'), /*#__PURE__*/React.createElement("div", {
    onClick: () => app.goTo('Audit Trail'),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      marginTop: 12,
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "history",
    size: 13
  }), " View audit trail")));
}
function ProjectSummary({
  project,
  app
}) {
  const p = project;
  const {
    HealthMeter
  } = window.ConsistencyCheckDesignSystem_77c3a7;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--mute)'
    }
  }, "Archived matter \xB7 read-only"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '6px 0 0',
      font: 'var(--display-md)',
      letterSpacing: '-0.5px',
      color: 'var(--ink)'
    }
  }, p.matter)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      padding: 24,
      boxShadow: 'var(--elev-card)',
      alignSelf: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(HealthMeter, {
    score: p.health,
    label: "Citation health"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [['Client', p.client], ['Document', p.type], ['Citations', String(p.citations)], ['Open flags', p.flags ? String(p.flags) : 'None'], ['Status', p.status], ['Updated', p.updated]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--ash)',
      width: 88
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: k === 'Open flags' && p.flags ? 'var(--fabricated)' : 'var(--ink)'
    }
  }, v))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => app.openReport(),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 40,
      padding: '0 18px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-dark)',
      color: 'var(--on-dark)',
      border: 'none',
      cursor: 'pointer',
      font: 'var(--button-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 15
  }), " View report"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, "Read-only \u2014 the live verification dataset is loaded for the Crestholm matter.")));
}
const ROLES = [{
  key: 'Partner Review Mode',
  short: 'Partner',
  detail: 'Full review authority — can overrule any verdict',
  initials: 'P'
}, {
  key: 'Senior Associate Mode',
  short: 'Senior Associate',
  detail: 'Can amend and escalate; cannot sign off for filing',
  initials: 'SA'
}, {
  key: 'Reviewer (read-only)',
  short: 'Reviewer',
  detail: 'Read-only access to findings and the audit trail',
  initials: 'R'
}];
function RoleBadge({
  app
}) {
  const [open, setOpen] = useState(false);
  const current = ROLES.find(r => r.key === app.role) || ROLES[0];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(v => !v),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 36,
      padding: '0 8px 0 14px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-card)',
      border: `1px solid ${open ? 'var(--hairline-strong)' : 'var(--hairline)'}`,
      font: 'var(--caption-strong)',
      color: 'var(--ink)',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    }
  }, current.short, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 14,
    style: {
      color: 'var(--mute)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: 'var(--surface-dark)',
      color: 'var(--on-dark)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 13
  }))), open && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpen(false),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 44,
      right: 0,
      width: 280,
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--elev-pop)',
      zIndex: 41,
      overflow: 'hidden',
      animation: 'ccPop 140ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderBottom: '1px solid var(--hairline)',
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, "Switch review mode"), ROLES.map(r => {
    const active = r.key === current.key;
    return /*#__PURE__*/React.createElement("button", {
      key: r.key,
      onClick: () => {
        app.setRole(r.key);
        setOpen(false);
        app.toast('Switched to ' + r.short + ' · ' + r.detail, {
          icon: 'user-check',
          hue: 'var(--verified)'
        });
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        textAlign: 'left',
        padding: '11px 14px',
        background: active ? 'var(--surface-bone)' : 'transparent',
        border: 'none',
        borderTop: '1px solid var(--hairline)',
        cursor: 'pointer'
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = 'var(--canvas)';
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: active ? 'var(--surface-dark)' : 'var(--surface-bone)',
        color: active ? 'var(--on-dark)' : 'var(--charcoal)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        font: '600 11px/1 var(--font-sans)',
        flex: '0 0 auto'
      }
    }, r.initials), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--caption-strong)',
        fontSize: 14,
        color: 'var(--ink)'
      }
    }, r.short), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--body-sm)',
        color: 'var(--mute)',
        marginTop: 1
      }
    }, r.detail)), active && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15,
      style: {
        color: 'var(--verified)',
        flex: '0 0 auto'
      }
    }));
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setOpen(false);
      app.toast('Signed out (prototype)', {
        icon: 'log-out',
        hue: 'var(--mute)'
      });
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      textAlign: 'left',
      padding: '11px 14px',
      background: 'transparent',
      border: 'none',
      borderTop: '1px solid var(--hairline)',
      cursor: 'pointer',
      font: 'var(--caption-strong)',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    size: 15
  }), " Sign out"))));
}
function Toast({
  toast
}) {
  if (!toast) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--surface-dark)',
      color: 'var(--on-dark)',
      padding: '12px 18px',
      borderRadius: 'var(--radius-full)',
      boxShadow: 'var(--elev-pop)',
      font: 'var(--body-sm)',
      maxWidth: 560,
      animation: 'ccToast 180ms ease'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: toast.icon || 'check-circle',
    size: 16,
    style: {
      color: toast.hue || 'var(--hero-glow)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", null, toast.msg));
}
function verifySources(finding) {
  const a = window.CCData.analysis && window.CCData.analysis[finding.id] || {};
  const jur = (a.jurisdiction || '').toLowerCase();
  const cit = finding.citation || '';
  const q = encodeURIComponent(cit);
  const isUS = /united states|\bus\b|u\.s\.|tex|american|delaware|new york/.test(jur) || /\bS\.?W\.?2d\b|Tex App|F\.?\d?d|U\.?S\.?\s/.test(cit);
  const isEU = /\beu\b|european union|cjeu|euro/.test(jur);
  if (isUS) return [{
    label: 'CourtListener',
    url: 'https://www.courtlistener.com/?q=' + q,
    host: 'courtlistener.com'
  }, {
    label: 'Caselaw Access Project',
    url: 'https://case.law/search/#/cases?search=' + q,
    host: 'case.law'
  }];
  if (isEU) return [{
    label: 'EUR-Lex',
    url: 'https://eur-lex.europa.eu/search.html?type=quick&text=' + q,
    host: 'eur-lex.europa.eu'
  }];
  return [{
    label: 'Google Scholar',
    url: 'https://scholar.google.com/scholar?q=' + q,
    host: 'scholar.google.com'
  }, {
    label: 'CourtListener',
    url: 'https://www.courtlistener.com/?q=' + q,
    host: 'courtlistener.com'
  }];
}
function searchUrlFor(name, q) {
  const n = (name || '').toLowerCase();
  if (n.includes('courtlistener')) return 'https://www.courtlistener.com/?q=' + q;
  if (n.includes('legislation')) return 'https://www.legislation.gov.uk/all?title=' + q;
  if (n.includes('find case') || n.includes('national archives') || n.includes('scholar') || n.includes('supreme court')) return 'https://scholar.google.com/scholar?q=' + q;
  if (n.includes('eur-lex') || n.includes('cellar')) return 'https://eur-lex.europa.eu/search.html?type=quick&text=' + q;
  if (n.includes('open web') || n.includes('perplexity') || n.includes('web')) return 'https://duckduckgo.com/?q=' + q;
  return null; // internal corpus — not publicly addressable
}
function VLink({
  href,
  children,
  title,
  tone
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    title: title || 'Opens in a new tab',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 34,
      padding: '0 14px',
      borderRadius: 'var(--radius-full)',
      background: tone === 'dark' ? 'var(--surface-dark)' : 'var(--surface-card)',
      border: '1px solid ' + (tone === 'dark' ? 'var(--surface-dark)' : 'var(--hairline-strong)'),
      font: 'var(--button-sm)',
      color: tone === 'dark' ? 'var(--on-dark)' : 'var(--ink)',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'background 120ms ease'
    },
    onMouseEnter: e => {
      if (tone !== 'dark') e.currentTarget.style.background = 'var(--surface-bone)';
    },
    onMouseLeave: e => {
      if (tone !== 'dark') e.currentTarget.style.background = 'var(--surface-card)';
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external-link",
    size: 14
  }), " ", children);
}
function SourceModal({
  finding,
  onClose
}) {
  if (!finding) return null;
  const c = window.CCData.corpus[finding.id] || {};
  const none = c.match === 'none';
  const links = verifySources(finding);
  const q = encodeURIComponent(finding.citation || '');
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(32,32,32,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      animation: 'ccFade 140ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(620px, 100%)',
      maxHeight: '82vh',
      overflowY: 'auto',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--elev-pop)',
      animation: 'ccPop 160ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      padding: '20px 24px',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--mute)'
    }
  }, none ? 'No authority found' : c.match === 'external' ? 'Matched · open sources' : 'Matched · provided corpus'), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-md)',
      color: 'var(--ink)',
      marginTop: 8
    }
  }, finding.citation)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--surface-bone)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--charcoal)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, !none ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Court"
  }, c.court), /*#__PURE__*/React.createElement(Field, {
    label: "Neutral citation",
    mono: true
  }, c.neutral), /*#__PURE__*/React.createElement(Field, {
    label: "Bench",
    span: true
  }, c.bench)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)',
      marginBottom: 8
    }
  }, "Holding relied on"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-md)',
      color: 'var(--body)',
      background: 'var(--surface-bone)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      borderLeft: '3px solid var(--verified)'
    }
  }, c.holding)), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--hairline)',
      paddingTop: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 15,
    style: {
      color: 'var(--verified)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, "Verify independently")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--charcoal)'
    }
  }, "Open the authoritative public record to confirm this authority exists and says what is quoted. Links open the source database in a new tab \u2014 anyone reviewing this document can re-check it."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, links.map(l => /*#__PURE__*/React.createElement(VLink, {
    key: l.url,
    href: l.url,
    title: 'Search ' + l.host + ' for this citation'
  }, l.label))), /*#__PURE__*/React.createElement("a", {
    href: links[0].url,
    target: "_blank",
    rel: "noopener noreferrer",
    title: "Open the public record for independent verification",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      font: 'var(--code-sm)',
      color: 'var(--charcoal)',
      textDecoration: 'none',
      marginTop: 2
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--link)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--charcoal)';
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: 'underline',
      textUnderlineOffset: 2
    }
  }, c.match === 'external' ? 'Matched via ' + c.source : 'corpus/' + c.source), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 12
  })))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-md)',
      color: 'var(--body)',
      background: 'var(--fabricated-bg)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      borderLeft: '3px solid var(--fabricated)'
    }
  }, c.holding), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)',
      marginBottom: 8
    }
  }, "Sources searched \xB7 confirm the absence yourself"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, (c.searched || []).map(s => {
    const url = searchUrlFor(s, q);
    return /*#__PURE__*/React.createElement("a", {
      key: s,
      href: url || undefined,
      target: url ? '_blank' : undefined,
      rel: "noopener noreferrer",
      title: url ? 'Re-run this search and see the empty result' : 'Internal corpus — not publicly addressable',
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'nowrap',
        padding: '7px 10px',
        borderRadius: 'var(--radius-sm)',
        font: 'var(--body-sm)',
        color: 'var(--charcoal)',
        textDecoration: 'none',
        cursor: url ? 'pointer' : 'default',
        background: 'transparent'
      },
      onMouseEnter: e => {
        if (url) e.currentTarget.style.background = 'var(--surface-bone)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x-circle",
      size: 14,
      style: {
        color: 'var(--fabricated)',
        flex: '0 0 auto'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, s, " \u2014 no match")), url ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        flex: '0 0 auto',
        font: 'var(--caption-strong)',
        color: 'var(--link)'
      }
    }, "search yourself ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 12
    })) : /*#__PURE__*/React.createElement("span", {
      style: {
        flex: '0 0 auto',
        font: 'var(--caption)',
        color: 'var(--ash)'
      }
    }, "internal"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginTop: 14
    }
  }, links.map(l => /*#__PURE__*/React.createElement(VLink, {
    key: l.url,
    href: l.url,
    title: 'Search ' + l.host + ' for this citation'
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption)',
      color: 'var(--ash)',
      marginTop: 10
    }
  }, "Absence is bounded to the sources checked \u2014 non-existence cannot be asserted beyond them. Click any source to re-run the search and see the result for yourself."))))));
}
function Field({
  label,
  children,
  mono,
  span
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: span ? '1 / -1' : 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)',
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: mono ? 'var(--code-sm)' : 'var(--body-sm)',
      color: 'var(--ink)'
    }
  }, children));
}

/* Minimal in-browser .docx reader: unzip (store/deflate) word/document.xml and pull paragraph text. */
async function ccUnzipDocx(buf) {
  const bytes = new Uint8Array(buf);
  const dv = new DataView(buf);
  let eocd = -1;
  for (let i = bytes.length - 22; i >= 0; i--) {
    if (dv.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error('not a zip');
  const cdCount = dv.getUint16(eocd + 10, true);
  let p = dv.getUint32(eocd + 16, true);
  let localOff = -1,
    method = 0,
    compSize = 0;
  for (let i = 0; i < cdCount; i++) {
    if (dv.getUint32(p, true) !== 0x02014b50) break;
    const m = dv.getUint16(p + 10, true);
    const cs = dv.getUint32(p + 20, true);
    const nameLen = dv.getUint16(p + 28, true);
    const extraLen = dv.getUint16(p + 30, true);
    const commentLen = dv.getUint16(p + 32, true);
    const lo = dv.getUint32(p + 42, true);
    const name = new TextDecoder().decode(bytes.subarray(p + 46, p + 46 + nameLen));
    if (name === 'word/document.xml') {
      localOff = lo;
      method = m;
      compSize = cs;
    }
    p += 46 + nameLen + extraLen + commentLen;
  }
  if (localOff < 0) throw new Error('no document.xml');
  const lNameLen = dv.getUint16(localOff + 26, true);
  const lExtraLen = dv.getUint16(localOff + 28, true);
  const start = localOff + 30 + lNameLen + lExtraLen;
  const comp = bytes.subarray(start, start + compSize);
  let xmlBytes;
  if (method === 0) {
    xmlBytes = comp;
  } else {
    if (typeof DecompressionStream === 'undefined') throw new Error('no inflate');
    const stream = new Response(comp).body.pipeThrough(new DecompressionStream('deflate-raw'));
    xmlBytes = new Uint8Array(await new Response(stream).arrayBuffer());
  }
  const xml = new TextDecoder().decode(xmlBytes);
  const paras = [];
  xml.split(/<\/w:p>/).forEach(seg => {
    const t = [...seg.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map(m => m[1]).join('').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").trim();
    if (t) paras.push(t);
  });
  return paras;
}
function UploadModal({
  open,
  onClose,
  app
}) {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [phase, setPhase] = useState('idle');
  const [posture, setPosture] = useState(() => app.guardrails && app.guardrails.posture || 'conservative');
  const [scope, setScope] = useState('matter'); // matter | default
  const inputRef = React.useRef(null);
  const rawRef = React.useRef(null);
  if (!open) return null;
  const applyPosture = () => {
    const base = scope === 'default' ? window.CCDefaultGuardrails : app.guardrails;
    const next = window.CCGuardrailsForPosture(posture, base);
    app.setGuardrails(next);
    if (scope === 'default') window.CCDefaultGuardrails = window.CCGuardrailsForPosture(posture, window.CCDefaultGuardrails);
  };
  const pick = f => {
    if (f) {
      rawRef.current = f;
      setFile({
        name: f.name,
        size: (f.size / 1024).toFixed(0) + ' KB'
      });
      setPhase('idle');
    }
  };
  const splitPages = txt => {
    const paras = txt.replace(/\r/g, '').split(/\n{2,}/).map(s => s.trim()).filter(Boolean);
    const pages = [];
    for (let i = 0; i < paras.length; i += 6) pages.push(paras.slice(i, i + 6).join('\n\n'));
    return pages.length ? pages : [txt];
  };
  const analyse = async () => {
    const raw = rawRef.current;
    applyPosture();
    if (!raw) {
      onClose();
      app.toast('Review posture set: ' + (window.CCPostures[posture] || {}).label + (scope === 'default' ? ' — practice default' : ' — this matter'), {
        icon: 'sliders-horizontal',
        hue: 'var(--primary-deep)'
      });
      return;
    }
    setPhase('parsing');
    try {
      const name = raw.name.toLowerCase();
      let pages = [];
      if (name.endsWith('.pdf') && window.pdfjsLib) {
        const buf = await raw.arrayBuffer();
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const pdf = await window.pdfjsLib.getDocument({
          data: buf
        }).promise;
        const n = Math.min(pdf.numPages, 12);
        for (let p = 1; p <= n; p++) {
          const page = await pdf.getPage(p);
          const tc = await page.getTextContent();
          pages.push(tc.items.map(it => it.str).join(' ').replace(/\s+/g, ' ').trim());
        }
      } else if (name.endsWith('.docx')) {
        const buf = await raw.arrayBuffer();
        const paras = await ccUnzipDocx(buf);
        if (!paras.length) throw new Error('empty docx');
        for (let i = 0; i < paras.length; i += 6) pages.push(paras.slice(i, i + 6).join('\n\n'));
      } else if (name.endsWith('.txt') || name.endsWith('.md')) {
        pages = splitPages(await raw.text());
      } else {
        pages = splitPages(await raw.text().catch(() => ''));
        if (!pages.join('').trim()) throw new Error('unsupported');
      }
      const cites = window.CCDetectCitations(pages.join('\n'));
      app.loadUploaded({
        name: raw.name,
        pages,
        citations: cites
      });
      app.toast(raw.name + ' parsed — ' + cites.length + ' citation' + (cites.length === 1 ? '' : 's') + ' detected', {
        icon: 'file-check-2',
        hue: 'var(--verified)'
      });
      setPhase('idle');
      setFile(null);
      rawRef.current = null;
      onClose();
    } catch (e) {
      setPhase('idle');
      app.toast('Could not parse this file in-browser — try a PDF or text file', {
        icon: 'alert-triangle',
        hue: 'var(--fabricated)'
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(32,32,32,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      animation: 'ccFade 140ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(560px, 100%)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--elev-pop)',
      animation: 'ccPop 160ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      padding: '20px 24px',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--mute)'
    }
  }, "New review"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--heading-md)',
      color: 'var(--ink)',
      marginTop: 4
    }
  }, "Upload document")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--surface-bone)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "file",
    accept: ".pdf,.docx,.txt,.md",
    style: {
      display: 'none'
    },
    onChange: e => pick(e.target.files[0])
  }), !file ? /*#__PURE__*/React.createElement("div", {
    onClick: () => inputRef.current && inputRef.current.click(),
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      pick(e.dataTransfer.files[0]);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      padding: '36px 24px',
      borderRadius: 'var(--radius-md)',
      border: `1.5px dashed ${drag ? 'var(--primary)' : 'var(--hairline-strong)'}`,
      background: drag ? 'var(--primary-soft)' : 'var(--surface-bone)',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'background 120ms ease, border-color 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload-cloud",
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 15,
      color: 'var(--ink)'
    }
  }, "Drop a skeleton argument here, or click to browse"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, "PDF, DOCX, TXT or Markdown \xB7 parsed by Nemotron Parse")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--hairline)',
      background: 'var(--surface-bone)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--primary-deep)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--ink)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, file.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--code-sm)',
      color: 'var(--mute)',
      marginTop: 2
    }
  }, file.size, " \xB7 ready to analyse")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFile(null),
    "aria-label": "Remove",
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--mute)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      font: 'var(--body-sm)',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder-check",
    size: 15,
    style: {
      marginTop: 1,
      flex: '0 0 auto',
      color: 'var(--mute)'
    }
  }), /*#__PURE__*/React.createElement("span", null, "Currently under review: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "Crestholm Dynamics plc v Veltros Industries Inc"), " \u2014 Skeleton Argument, 12 citations.")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--hairline)',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sliders-horizontal",
    size: 15,
    style: {
      color: 'var(--charcoal)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, "Review posture \xB7 guardrails")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px',
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, "How strict should the verifier be when deciding what to put in front of a human?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, ['conservative', 'flexible'].map(k => {
    const p = window.CCPostures[k];
    const on = posture === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setPosture(k),
      style: {
        textAlign: 'left',
        cursor: 'pointer',
        padding: '13px 14px',
        borderRadius: 'var(--radius-md)',
        border: '1.5px solid ' + (on ? 'var(--primary)' : 'var(--hairline-strong)'),
        background: on ? 'var(--primary-soft)' : 'var(--surface-card)',
        transition: 'border-color 120ms, background 120ms'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: '50%',
        flex: '0 0 auto',
        border: '2px solid ' + (on ? 'var(--primary)' : 'var(--hairline-strong)'),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--primary)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--caption-strong)',
        fontSize: 14,
        color: 'var(--ink)'
      }
    }, p.label), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        font: 'var(--caption)',
        fontSize: 10.5,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: on ? 'var(--primary-deep)' : 'var(--ash)',
        background: on ? 'var(--surface-card)' : 'var(--surface-bone)',
        padding: '2px 7px',
        borderRadius: 'var(--radius-full)'
      }
    }, p.tag)), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--body-sm)',
        lineHeight: 1.45,
        color: 'var(--charcoal)'
      }
    }, p.blurb));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, "Apply to"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      background: 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-full)',
      padding: 3,
      gap: 2
    }
  }, [['matter', 'This matter only'], ['default', 'Set as practice default']].map(([k, lbl]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setScope(k),
    style: {
      cursor: 'pointer',
      border: 'none',
      height: 28,
      padding: '0 12px',
      borderRadius: 'var(--radius-full)',
      font: 'var(--caption-strong)',
      fontSize: 12.5,
      background: scope === k ? 'var(--surface-card)' : 'transparent',
      color: scope === k ? 'var(--ink)' : 'var(--mute)',
      boxShadow: scope === k ? 'var(--elev-card)' : 'none'
    }
  }, lbl)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
      padding: '14px 24px',
      borderTop: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      height: 40,
      padding: '0 18px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline-strong)',
      font: 'var(--button-sm)',
      color: 'var(--ink)',
      cursor: 'pointer'
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: analyse,
    disabled: phase === 'parsing',
    style: {
      height: 40,
      padding: '0 20px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary)',
      border: 'none',
      font: 'var(--button-sm)',
      color: 'var(--on-primary)',
      cursor: phase === 'parsing' ? 'default' : 'pointer',
      opacity: phase === 'parsing' ? 0.8 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7
    }
  }, phase === 'parsing' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      border: '2px solid rgba(255,255,255,0.5)',
      borderTopColor: '#fff',
      borderRadius: '50%',
      animation: 'ccSpin 700ms linear infinite'
    }
  }), " Parsing\u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
    name: "scan-line",
    size: 15
  }), " Parse & open")))));
}

/* ── Demo intake gate: clean landing → upload → scanning → live app ─────── */
function IntakeTopBar() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 28px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-consistency-check.png",
    alt: "Consistency Check",
    style: {
      height: 32,
      width: 'auto',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      lineHeight: 1.25
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--button-sm)',
      color: 'var(--ink)'
    }
  }, "Emma Stride"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--label)',
      color: 'var(--mute)'
    }
  }, "Associate \xB7 Alderton & Marsh LLP")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-dark)',
      color: 'var(--on-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'var(--button-sm)',
      letterSpacing: '0.02em'
    }
  }, "ES"))));
}
function LandingPage({
  onStart
}) {
  const m = window.CCData.matter;
  const fileRef = React.useRef(null);
  const [drag, setDrag] = useState(false);
  const pick = f => {
    if (f) onStart(f.name);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--canvas)'
    }
  }, /*#__PURE__*/React.createElement(IntakeTopBar, null), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 620,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '5px 13px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-soft)',
      color: 'var(--primary-deep)',
      font: 'var(--label)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder-open",
    size: 13
  }), " New review"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--display-md)',
      color: 'var(--ink)',
      margin: '0 0 12px',
      lineHeight: 1.18,
      textWrap: 'balance'
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      font: 'var(--body)',
      color: 'var(--mute)',
      marginBottom: 36,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, m.firm), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, m.docType), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.4
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, m.claimValue, " claim")), /*#__PURE__*/React.createElement("div", {
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      pick(e.dataTransfer.files && e.dataTransfer.files[0]);
    },
    style: {
      border: '1.5px dashed ' + (drag ? 'var(--primary)' : 'var(--hairline-strong)'),
      background: drag ? 'var(--primary-soft)' : 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      padding: '44px 32px',
      transition: 'border-color 140ms ease, background 140ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary-soft)',
      color: 'var(--primary-deep)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 18px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload-cloud",
    size: 26
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => fileRef.current && fileRef.current.click(),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      height: 48,
      padding: '0 26px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary)',
      color: 'var(--on-primary, #fff)',
      border: 'none',
      cursor: 'pointer',
      font: 'var(--button)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.08)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'var(--primary-deep)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'var(--primary)';
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    size: 17
  }), " Upload document"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 16
    }
  }, "Drag & drop or browse \xB7 PDF or Word \xB7 we scan every citation"), /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: ".pdf,.doc,.docx",
    style: {
      display: 'none'
    },
    onChange: e => pick(e.target.files && e.target.files[0])
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--label)',
      color: 'var(--stone)',
      marginTop: 20
    }
  }, "Documents are checked against the firm's verified case-law corpus and open legal sources."))));
}
function LoadingScreen({
  fileName,
  onDone
}) {
  const m = window.CCData.matter;
  const steps = [{
    icon: 'file-search',
    label: 'Extracting citations from the document'
  }, {
    icon: 'library',
    label: 'Matching against the verified case-law corpus'
  }, {
    icon: 'globe',
    label: 'Cross-referencing CourtListener & legislation.gov.uk'
  }, {
    icon: 'scale',
    label: 'Checking ratio vs obiter, fidelity and jurisdiction'
  }, {
    icon: 'list-checks',
    label: 'Compiling guidance and disposition'
  }];
  const TOTAL = 9000;
  const [pct, setPct] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  useEffect(() => {
    const t0 = Date.now();
    const iv = setInterval(() => {
      const p = Math.min(100, (Date.now() - t0) / TOTAL * 100);
      setPct(p);
      setStepIdx(Math.min(steps.length - 1, Math.floor(p / 100 * steps.length)));
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(onDone, 450);
      }
    }, 60);
    return () => clearInterval(iv);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--canvas)'
    }
  }, /*#__PURE__*/React.createElement(IntakeTopBar, null), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '5px 13px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      font: 'var(--label)',
      color: 'var(--mute)',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 13
  }), " ", fileName || m.docType + '.pdf'), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--display-sm, var(--display-md))',
      color: 'var(--ink)',
      margin: '0 0 8px',
      lineHeight: 1.2,
      fontSize: 24
    }
  }, "Scanning citations\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body)',
      color: 'var(--mute)'
    }
  }, m.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-lg)',
      padding: '26px 26px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--button-sm)',
      color: 'var(--ink)'
    }
  }, "Analysing document"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--mono-sm, var(--label))',
      color: 'var(--mute)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      borderRadius: 'var(--radius-full)',
      background: 'var(--hairline)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: pct + '%',
      background: 'linear-gradient(90deg, var(--primary), var(--primary-deep))',
      borderRadius: 'var(--radius-full)',
      transition: 'width 120ms linear'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      marginTop: 22
    }
  }, steps.map((s, i) => {
    const done = i < stepIdx;
    const active = i === stepIdx;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '9px 4px',
        opacity: done || active ? 1 : 0.4,
        transition: 'opacity 200ms ease'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 26,
        height: 26,
        borderRadius: 'var(--radius-full)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 auto',
        background: done ? 'var(--verified)' : active ? 'var(--primary-soft)' : 'var(--hairline)',
        color: done ? '#fff' : active ? 'var(--primary-deep)' : 'var(--stone)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: done ? 'check' : s.icon,
      size: 14
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--body-sm)',
        color: done || active ? 'var(--ink)' : 'var(--mute)',
        flex: 1
      }
    }, s.label), active && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 14,
        borderRadius: '50%',
        border: '2px solid var(--primary-soft)',
        borderTopColor: 'var(--primary)',
        animation: 'ccSpin 0.7s linear infinite',
        flex: '0 0 auto'
      }
    }));
  }))))));
}
function App() {
  const [phase, setPhase] = useState('landing'); // landing | loading | app
  const [uploadName, setUploadName] = useState(null);
  const [tab, setTab] = useState('Document');
  const [openId, setOpenId] = useState('cit-008');
  const [filter, setFilter] = useState('All');
  const [reviews, setReviews] = useState({});
  const [toast, setToast] = useState(null);
  const [sourceId, setSourceId] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [role, setRole] = useState('Partner Review Mode');
  const [guardrails, setGuardrails] = useState(() => JSON.parse(JSON.stringify(window.CCDefaultGuardrails)));
  const [docEdits, setDocEdits] = useState({});
  const [docMode, setDocMode] = useState('tracked');
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const showToast = (msg, opts = {}) => setToast({
    msg,
    ...opts
  });
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);
  const [activeProject, setActiveProject] = useState('crestholm');
  const [amendments, setAmendments] = useState({});
  const [immersive, setImmersive] = useState(false);
  const [wfStage, setWfStage] = useState('associate'); // associate | partner
  const [partnerApproved, setPartnerApproved] = useState({});
  const [reportMode, setReportMode] = useState('report'); // report | clean
  const findingById = id => window.CCData.findings.find(f => f.id === id);
  const app = {
    reviews,
    role,
    immersive,
    setImmersive,
    wfStage,
    partnerApproved,
    reportMode,
    activeProject,
    amendments,
    amend: (id, text) => setAmendments(a => ({
      ...a,
      [id]: text
    })),
    docEdits,
    docMode,
    setDocMode,
    applyFix: id => {
      const r = window.CCData.revisions[id];
      if (!r) return;
      setDocEdits(d => ({
        ...d,
        [id]: {
          revised: r,
          mode: 'applied'
        }
      }));
      const f = findingById(id);
      showToast('Fix applied to document — ' + (f ? f.citation : id), {
        icon: 'file-pen-line',
        hue: 'var(--verified)'
      });
    },
    editBlock: (id, text) => {
      setDocEdits(d => ({
        ...d,
        [id]: {
          revised: text,
          mode: 'manual'
        }
      }));
      showToast('Paragraph updated', {
        icon: 'pencil',
        hue: 'var(--mischar)'
      });
    },
    revertBlock: id => {
      setDocEdits(d => {
        const n = {
          ...d
        };
        delete n[id];
        return n;
      });
    },
    downloadClean: () => {
      const blocks = window.CCData.docBlocks;
      const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      let body = '';
      blocks.forEach(b => {
        if (b.kind === 'court') body += '<p class="court">' + esc(b.text) + '</p>';else if (b.kind === 'title') body += '<h1>' + esc(b.text) + '</h1>';else if (b.kind === 'h') body += '<h2>' + esc(b.text) + '</h2>';else {
          const t = b.cite && docEdits[b.cite] ? docEdits[b.cite].revised : b.text;
          body += '<p>' + esc(t) + '</p>';
        }
      });
      const n = Object.keys(docEdits).length;
      const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + esc(window.CCData.matter.name) + ' \u2014 Skeleton Argument</title><style>body{font-family:Georgia,"Times New Roman",serif;max-width:760px;margin:48px auto;padding:0 24px;color:#202020;line-height:1.75}.court{text-align:center;font-family:ui-monospace,monospace;color:#646464;font-size:13px;margin-bottom:18px}h1{text-align:center;font-size:21px;border-bottom:1px solid #ddd;padding-bottom:16px}h2{font-size:15px;margin-top:24px}p{margin:0 0 12px}.meta{color:#8a8a8a;font-size:12px;text-align:center;border-top:1px solid #ddd;margin-top:44px;padding-top:14px}</style></head><body>' + body + '<div class="meta">Clean copy \u00b7 ' + n + ' tracked change' + (n === 1 ? '' : 's') + ' applied \u00b7 generated by Consistency Check</div></body></html>';
      const blob = new Blob([html], {
        type: 'text/html'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Skeleton-argument-clean.html';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast('Clean copy downloaded \u2014 ' + n + ' change' + (n === 1 ? '' : 's') + ' applied', {
        icon: 'file-down',
        hue: 'var(--verified)'
      });
    },
    uploadedDoc,
    loadUploaded: doc => {
      setUploadedDoc(doc);
      setTab('Document');
      window.scrollTo({
        top: 0
      });
    },
    clearUploaded: () => setUploadedDoc(null),
    setRole,
    openUpload: () => setUploadOpen(true),
    openReport: () => {
      setReportMode('report');
      setReportOpen(true);
    },
    completeClean: () => {
      setReportMode('clean');
      setReportOpen(true);
      window.scrollTo({
        top: 0
      });
      showToast('Clean filing copy generated — corrections applied', {
        icon: 'file-check-2',
        hue: 'var(--verified)'
      });
    },
    sendToPartner: () => {
      setWfStage('partner');
      window.scrollTo({
        top: 0
      });
      showToast('Handed to partner — approve each citation, or trust the associate review', {
        icon: 'arrow-up-right',
        hue: 'var(--hero-glow)'
      });
    },
    backToAssociate: () => {
      setWfStage('associate');
    },
    approveCitation: id => {
      setPartnerApproved(p => ({
        ...p,
        [id]: true
      }));
    },
    sendBackCitation: id => {
      setPartnerApproved(p => {
        const n = {
          ...p
        };
        delete n[id];
        return n;
      });
      showToast('Sent back to the associate', {
        icon: 'corner-up-left',
        hue: 'var(--mischar)'
      });
    },
    trustAll: ids => {
      setPartnerApproved(p => {
        const n = {
          ...p
        };
        ids.forEach(i => {
          n[i] = true;
        });
        return n;
      });
      showToast('Associate review accepted in full — all citations approved', {
        icon: 'shield-check',
        hue: 'var(--primary-deep)'
      });
    },
    closeReport: () => setReportOpen(false),
    guardrails,
    setGuardrail: (k, v) => setGuardrails(g => ({
      ...g,
      [k]: v
    })),
    setGuardrails: g => setGuardrails(JSON.parse(JSON.stringify(g))),
    toggleTrusted: name => setGuardrails(g => ({
      ...g,
      trusted: {
        ...g.trusted,
        [name]: !g.trusted[name]
      }
    })),
    goTo: t => {
      setTab(t);
      window.scrollTo({
        top: 0
      });
    },
    goToFilter: fl => {
      setFilter(fl);
      setTab('Citation Checker');
      window.scrollTo({
        top: 0
      });
    },
    toast: showToast,
    openInChecker: id => {
      setOpenId(id);
      setFilter('All');
      setTab('Citation Checker');
      window.scrollTo({
        top: 0
      });
    },
    openSource: id => setSourceId(id),
    review: (id, action) => {
      setReviews(r => ({
        ...r,
        [id]: action
      }));
      const f = findingById(id);
      const map = {
        Approved: {
          msg: 'Approved — ' + f.citation,
          icon: 'check-circle',
          hue: 'var(--verified)'
        },
        Amended: {
          msg: 'Marked for amendment — ' + f.citation,
          icon: 'pencil',
          hue: 'var(--mischar)'
        },
        Rejected: {
          msg: 'Citation rejected — ' + f.citation,
          icon: 'x-circle',
          hue: 'var(--fabricated)'
        },
        Escalated: {
          msg: 'Escalated to Partner — ' + f.citation,
          icon: 'arrow-up-right',
          hue: 'var(--hero-glow)'
        }
      };
      showToast(map[action].msg, {
        icon: map[action].icon,
        hue: map[action].hue
      });
    }
  };
  const sourceFinding = sourceId ? findingById(sourceId) : null;
  const project = window.CCData.projects.find(p => p.id === activeProject) || window.CCData.projects[0];
  const [railW, setRailW] = useState(248);
  const [railDrag, setRailDrag] = useState(false);
  const railDragging = React.useRef(false);
  const onRailDragStart = e => {
    e.preventDefault();
    railDragging.current = true;
    setRailDrag(true);
    const move = ev => {
      if (!railDragging.current) return;
      const x = ev.touches ? ev.touches[0].clientX : ev.clientX;
      setRailW(Math.max(200, Math.min(440, x)));
    };
    const up = () => {
      railDragging.current = false;
      setRailDrag(false);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', up);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
    document.addEventListener('touchmove', move, {
      passive: false
    });
    document.addEventListener('touchend', up);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };
  if (phase === 'landing') return /*#__PURE__*/React.createElement(LandingPage, {
    onStart: name => {
      setUploadName(name);
      setPhase('loading');
    }
  });
  if (phase === 'loading') return /*#__PURE__*/React.createElement(LoadingScreen, {
    fileName: uploadName,
    onDone: () => setPhase('app')
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'var(--canvas)'
    }
  }, /*#__PURE__*/React.createElement(TopNav, {
    app: app,
    tab: tab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flex: 1,
      minWidth: 0
    }
  }, !immersive && /*#__PURE__*/React.createElement(ProjectsRail, {
    activeProject: activeProject,
    setActiveProject: setActiveProject,
    app: app,
    width: railW
  }), !immersive && /*#__PURE__*/React.createElement("div", {
    onMouseDown: onRailDragStart,
    onTouchStart: onRailDragStart,
    onDoubleClick: () => setRailW(248),
    role: "separator",
    "aria-orientation": "vertical",
    title: "Drag to resize \xB7 double-click to reset",
    style: {
      position: 'sticky',
      top: 64,
      height: 'calc(100vh - 64px)',
      flex: '0 0 7px',
      marginLeft: -7,
      zIndex: 12,
      cursor: 'col-resize',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: railDrag ? 'var(--primary-soft)' : 'transparent',
      transition: 'background 120ms ease'
    },
    onMouseEnter: e => {
      if (!railDrag) e.currentTarget.style.background = 'var(--hairline)';
    },
    onMouseLeave: e => {
      if (!railDrag) e.currentTarget.style.background = 'transparent';
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 40,
      borderRadius: 3,
      background: railDrag ? 'var(--primary)' : 'var(--stone)',
      transition: 'background 120ms ease'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      padding: '24px 28px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(React.Fragment, null, tab === 'Source Library' && /*#__PURE__*/React.createElement(window.CCSourceLibrary, {
    app: app
  }), tab === 'Dashboard' && /*#__PURE__*/React.createElement(window.CCDashboard, {
    app: app
  }), tab === 'Insights' && /*#__PURE__*/React.createElement(window.CCInsights, {
    app: app
  }), tab === 'Document' && /*#__PURE__*/React.createElement(window.CCDocumentWorkspace, {
    app: app
  }), tab === 'Citation Checker' && /*#__PURE__*/React.createElement(window.CCCitationChecker, {
    openId: openId,
    onOpenFinding: setOpenId,
    filter: filter,
    setFilter: setFilter,
    app: app
  }), tab === 'Verification' && /*#__PURE__*/React.createElement(window.CCVerification, {
    app: app
  }), tab === 'Audit Trail' && /*#__PURE__*/React.createElement(window.CCAuditTrail, {
    app: app
  }), tab === 'Data Sources' && /*#__PURE__*/React.createElement(window.CCDataSources, {
    app: app
  })))))), /*#__PURE__*/React.createElement(Toast, {
    toast: toast
  }), /*#__PURE__*/React.createElement(SourceModal, {
    finding: sourceFinding,
    onClose: () => setSourceId(null)
  }), /*#__PURE__*/React.createElement(UploadModal, {
    open: uploadOpen,
    onClose: () => setUploadOpen(false),
    app: app
  }), reportOpen && /*#__PURE__*/React.createElement(window.CCReport, {
    app: app
  }));
}
window.CCApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/AuditTrail.jsx
try { (() => {
/* Audit Trail tab — immutable-looking event log on a dark well. */
const {
  Card,
  Button
} = window.ConsistencyCheckDesignSystem_77c3a7;
const {
  CCIcon: Icon,
  CCOverline: Overline
} = window;
const ACTOR_ICON = {
  'Consistency Check Engine': 'cpu',
  'Citation Verifier': 'search-check',
  'Partner Reviewer': 'user-check'
};
function AuditTrail({
  app
}) {
  const events = window.CCData.audit;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, null, "Audit \xB7 defensible record"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '6px 0 0',
      font: 'var(--display-md)',
      letterSpacing: '-0.5px',
      color: 'var(--ink)'
    }
  }, "Audit trail")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: 'var(--caption)',
      color: 'var(--mute)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 14
  }), " Immutable log \xB7 hash-chained"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 15
    }),
    onClick: () => app.openReport()
  }, "Export record"))), /*#__PURE__*/React.createElement(Card, {
    tone: "dark",
    pad: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 22px',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement(Overline, {
    dark: true
  }, "Review session \xB7 14 June 2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--on-dark-mute)'
    }
  }, "session #CC-4471-A \xB7 ", events.length, " events")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 22px 22px'
    }
  }, events.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cc-reveal",
    style: {
      animationDelay: i * 110 + 'ms',
      display: 'grid',
      gridTemplateColumns: '64px 28px 1fr',
      gap: 14,
      padding: '16px 0',
      borderBottom: i === events.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.07)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-md)',
      color: 'var(--hero-glow)'
    }
  }, e.time), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.14)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--on-dark)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ACTOR_ICON[e.actor] || 'circle',
    size: 14
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--on-dark)'
    }
  }, e.event), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--on-dark-mute)'
    }
  }, e.actor)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--body-sm)',
      color: 'var(--on-dark-mute)',
      marginTop: 5
    }
  }, e.detail)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      font: 'var(--body-sm)',
      color: 'var(--charcoal)',
      padding: '0 4px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 15,
    style: {
      marginTop: 1,
      flex: '0 0 auto',
      color: 'var(--mute)'
    }
  }), /*#__PURE__*/React.createElement("span", null, "The audit trail records who saw what, what the AI claimed, the evidence used, and the human action taken \u2014 the basis for whether the document is defensible for filing.")));
}
window.CCAuditTrail = AuditTrail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/AuditTrail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/CaseHeader.jsx
try { (() => {
/* Case header band — the document under review. Persistent context. */
const {
  Card
} = window.ConsistencyCheckDesignSystem_77c3a7;
const {
  CCMeta: Meta,
  CCIcon: Icon
} = window;
function DeadlinePill() {
  const f = window.CCData.filing;
  const s = window.CCUseCountdown(f.baselineRemaining);
  const hh = Math.floor(s / 3600),
    mm = Math.floor(s % 3600 / 60),
    ss = s % 60;
  const urgent = s < 3600;
  const hue = urgent ? 'var(--fabricated)' : 'var(--primary-deep)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--ash)'
    }
  }, "Filing deadline ", f.deadline), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      font: '600 17px/1 var(--font-mono)',
      color: hue
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: hue,
      animation: 'ccPulse 1.4s ease-in-out infinite'
    }
  }), String(hh).padStart(2, '0'), ":", String(mm).padStart(2, '0'), ":", String(ss).padStart(2, '0'), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption)',
      color: 'var(--mute)'
    }
  }, "left")));
}
function CaseHeader({
  app
}) {
  const m = window.CCData.matter;
  return /*#__PURE__*/React.createElement(Card, {
    pad: 0,
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      gap: 24,
      padding: '20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "scale",
    size: 15,
    style: {
      color: 'var(--mute)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--mute)'
    }
  }, "Document under review")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--display-md)',
      letterSpacing: '-0.5px',
      color: 'var(--ink)'
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      marginTop: 18,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Meta, {
    label: "Firm"
  }, m.firm), /*#__PURE__*/React.createElement(Meta, {
    label: "Document"
  }, m.docType), /*#__PURE__*/React.createElement(Meta, {
    label: "Claim value"
  }, m.claimValue), /*#__PURE__*/React.createElement(Meta, {
    label: "Review status",
    accent: "var(--primary-deep)"
  }, m.reviewStatus))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(DeadlinePill, null), /*#__PURE__*/React.createElement("button", {
    onClick: () => app && app.goTo('Citation Checker'),
    title: "View flagged citations",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--risk-high-bg)',
      color: 'var(--risk-high)',
      font: 'var(--caption-strong)',
      border: 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert-triangle",
    size: 15
  }), "Overall risk \xB7 ", m.overallRisk))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--hairline)',
      background: 'var(--surface-bone)',
      padding: '12px 24px',
      font: 'var(--body-sm)',
      color: 'var(--body)',
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 15,
    style: {
      color: 'var(--charcoal)',
      marginTop: 1,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", null, m.summary)));
}
window.CCCaseHeader = CaseHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/CaseHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/CitationChecker.jsx
try { (() => {
/* Citation Checker tab — findings table + filter row + detail drawer. */
const {
  Card,
  StatusBadge,
  RiskBadge,
  FilterChip,
  Input,
  Button,
  IconButton
} = window.ConsistencyCheckDesignSystem_77c3a7;
const {
  CCIcon: Icon,
  CCOverline: Overline
} = window;
const {
  useState
} = React;
const REVIEW_CHIP = {
  Approved: {
    fg: 'var(--verified)',
    bg: 'var(--verified-bg)',
    icon: 'check'
  },
  Amended: {
    fg: 'var(--mischar)',
    bg: 'var(--mischar-bg)',
    icon: 'pencil'
  },
  Rejected: {
    fg: 'var(--fabricated)',
    bg: 'var(--fabricated-bg)',
    icon: 'x'
  },
  Escalated: {
    fg: 'var(--primary-deep)',
    bg: 'var(--primary-soft)',
    icon: 'arrow-up-right'
  }
};
function ReviewChip({
  action
}) {
  const c = REVIEW_CHIP[action];
  if (!c) return null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 22,
      padding: '0 9px',
      borderRadius: 'var(--radius-full)',
      font: 'var(--caption-strong)',
      background: c.bg,
      color: c.fg
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 12
  }), " ", action);
}
function DecisionPath({
  finding,
  app
}) {
  const flow = window.CCFlow.verdictOf(finding);
  const disp = window.CCFlow.disposition(finding, app.guardrails);
  const pass = disp.d === 'Pass';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "git-branch",
    size: 15,
    style: {
      color: 'var(--charcoal)'
    }
  }), /*#__PURE__*/React.createElement(Overline, null, "Decision path")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingLeft: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 5,
      top: 6,
      bottom: 18,
      width: 2,
      background: 'var(--hairline)'
    }
  }), flow.steps.map((st, i) => {
    const hue = st.result === 'yes' ? 'var(--verified)' : st.result === 'no' ? 'var(--fabricated)' : 'var(--charcoal)';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'relative',
        paddingBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: -16,
        top: 3,
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: hue,
        border: '2px solid var(--surface-card)'
      }
    }), st.stage && /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--code-sm)',
        color: 'var(--ash)',
        marginBottom: 2
      }
    }, st.stage), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--caption-strong)',
        fontSize: 13,
        color: 'var(--ink)'
      }
    }, st.q), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--body-sm)',
        color: 'var(--mute)'
      }
    }, st.a));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -16,
      top: 3,
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: flow.meta.tone,
      border: '2px solid var(--surface-card)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 13,
      color: flow.meta.tone
    }
  }, flow.leaf))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      marginTop: 12,
      padding: '11px 13px',
      borderRadius: 'var(--radius-md)',
      background: pass ? 'var(--verified-bg)' : 'var(--risk-high-bg)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: pass ? 'check-circle' : 'flag',
    size: 16,
    style: {
      color: pass ? 'var(--verified)' : 'var(--risk-high)',
      marginTop: 1,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: pass ? 'var(--verified)' : 'var(--risk-high)'
    }
  }, "Disposition \xB7 ", disp.d, pass ? ' — no action before filing' : ' needed'), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 2
    }
  }, disp.reason, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ash)'
    }
  }, "\xB7 per firm guardrails")))));
}
function Section({
  icon,
  title,
  children,
  tone
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 15,
    style: {
      color: 'var(--charcoal)'
    }
  }), /*#__PURE__*/React.createElement(Overline, null, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      background: tone === 'bone' ? 'var(--surface-bone)' : 'transparent',
      borderRadius: tone === 'bone' ? 'var(--radius-sm)' : 0,
      padding: tone === 'bone' ? '10px 12px' : '0 0 0 12px',
      borderLeft: tone === 'bone' ? 0 : '2px solid var(--hairline)'
    }
  }, children));
}
function SignalSection({
  finding
}) {
  const a = (window.CCData.analysis || {})[finding.id] || {};
  const [open, setOpen] = useState(true);
  if (!a.signal && !a.defensibility && !a.note) return null;
  const hasSignal = !!a.signal;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '12px 14px',
      background: 'var(--surface-bone)',
      border: 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: hasSignal ? 'eye-off' : 'info',
    size: 15,
    style: {
      color: 'var(--primary-deep)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--ink)'
    }
  }, hasSignal ? 'Signal · why this would pass human review' : 'Reviewer note')), /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'chevron-up' : 'chevron-down',
    size: 16,
    style: {
      color: 'var(--mute)'
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, (a.signal || []).map((sg, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cc-reveal",
    style: {
      animationDelay: i * 90 + 'ms',
      borderLeft: '2px solid var(--mischar)',
      paddingLeft: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 13,
      color: 'var(--ink)'
    }
  }, i + 1, ". ", sg.type), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 3
    }
  }, sg.text))), a.defensibility && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '10px 12px',
      background: 'var(--surface-bone)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "scale",
    size: 15,
    style: {
      color: 'var(--charcoal)',
      marginTop: 1,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)'
    }
  }, a.defensibility)), a.note && !hasSignal && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)'
    }
  }, a.note)));
}
function RatioBadge({
  binding
}) {
  const m = binding === true ? {
    label: 'Binding ratio',
    hue: 'var(--verified)',
    bg: 'var(--verified-bg)',
    icon: 'gavel'
  } : binding === false ? {
    label: 'No judgment',
    hue: 'var(--fabricated)',
    bg: 'var(--fabricated-bg)',
    icon: 'file-x'
  } : {
    label: 'Unsettled',
    hue: 'var(--mischar)',
    bg: 'var(--mischar-bg)',
    icon: 'help-circle'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 19,
      padding: '0 8px',
      borderRadius: 'var(--radius-full)',
      font: 'var(--caption-strong)',
      fontSize: 11,
      background: m.bg,
      color: m.hue
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.icon,
    size: 11
  }), " ", m.label);
}
function TreatmentTag({
  kind
}) {
  const m = (window.CCTreatmentMeta.treatment || {})[kind] || {
    label: kind,
    hue: 'var(--charcoal)',
    bg: 'var(--surface-bone)',
    icon: 'dot'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 20,
      padding: '0 8px',
      borderRadius: 'var(--radius-full)',
      font: 'var(--caption-strong)',
      fontSize: 11,
      letterSpacing: '0.02em',
      background: m.bg,
      color: m.hue,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.icon,
    size: 11
  }), " ", m.label);
}

/* Treatment / triangulation — how the authority is treated across the corpus.
   The secondary signal a lawyer uses to judge whether something is good law. */
function TreatmentSection({
  finding
}) {
  const t = (window.CCData.treatment || {})[finding.id];
  const [open, setOpen] = useState(true);
  if (!t) return null;
  const m = window.CCTreatmentMeta.signal[t.signal] || {};
  const isConf = t.signal === 'confabulation';
  const isCorr = t.signal === 'corroborated';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '12px 14px',
      background: 'var(--surface-bone)',
      border: 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "network",
    size: 15,
    style: {
      color: 'var(--primary-deep)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--ink)'
    }
  }, "Treatment across the corpus"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 19,
      padding: '0 7px',
      borderRadius: 'var(--radius-full)',
      font: 'var(--caption-strong)',
      fontSize: 11,
      background: m.bg,
      color: m.hue,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.icon,
    size: 11
  }), " ", m.label)), /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'chevron-up' : 'chevron-down',
    size: 16,
    style: {
      color: 'var(--mute)',
      flex: '0 0 auto'
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      background: m.bg
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.icon,
    size: 18,
    style: {
      color: m.hue,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: m.hue
    }
  }, m.label, " \xB7 ", t.citingCount === 0 ? 'no corpus cross-cites' : t.citingCount + ' corpus authorit' + (t.citingCount === 1 ? 'y' : 'ies')), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 1
    }
  }, m.blurb))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)'
    }
  }, t.summary), t.citedBy.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, {
    style: {
      marginBottom: 6
    }
  }, isConf ? 'Where the proposition really lives' : 'How later courts have treated it'), t.citedBy.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cc-reveal",
    style: {
      animationDelay: i * 70 + 'ms',
      display: 'flex',
      gap: 10,
      padding: '10px 0',
      borderTop: i === 0 ? 'none' : '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      width: 6,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: (window.CCTreatmentMeta.treatment[c.treatment] || {}).hue || 'var(--charcoal)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ink)'
    }
  }, c.case), /*#__PURE__*/React.createElement(TreatmentTag, {
    kind: c.treatment
  }), c.external && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)'
    }
  }, "\xB7 open web")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--mute)',
      marginTop: 2
    }
  }, c.citation, " \xB7 ", c.court, c.para ? ' · ' + c.para : ''), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 4
    }
  }, c.point))))), isCorr && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '10px 12px',
      background: 'var(--mischar-bg)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "target",
    size: 15,
    style: {
      color: 'var(--mischar)',
      marginTop: 1,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)'
    }
  }, "Independent corroboration \u2014 the citator is computed from how the corpus treats this case, not from the brief. It agrees with the fidelity flag: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "real case, wrong proposition."))), t.ratio && /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px dashed var(--hairline-strong)',
      borderRadius: 'var(--radius-sm)',
      padding: '11px 13px',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "scale",
    size: 14,
    style: {
      color: 'var(--charcoal)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, "Ratio vs dicta")), t.ratio.roadmap ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 19,
      padding: '0 8px',
      borderRadius: 'var(--radius-full)',
      font: 'var(--caption-strong)',
      fontSize: 11,
      background: 'var(--primary-soft)',
      color: 'var(--primary-deep)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "milestone",
    size: 11
  }), " Roadmap") : /*#__PURE__*/React.createElement(RatioBadge, {
    binding: t.ratio.binding
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 7
    }
  }, t.ratio.note), t.ratio.roadmap && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)',
      marginTop: 6
    }
  }, "Distinguishing binding ratio from passing dicta is judgment-premium work \u2014 flagged here, resolved by a lawyer, not yet automated."))));
}
function ParallelCites({
  id
}) {
  const p = (window.CCData.parallelCites || {})[id];
  if (!p) return null;
  if (p.unresolved) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        border: '1px dashed var(--fabricated)',
        borderRadius: 'var(--radius-sm)',
        padding: '11px 13px',
        background: 'var(--fabricated-bg)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "layers",
      size: 14,
      style: {
        color: 'var(--fabricated)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--overline)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--fabricated)'
      }
    }, "Parallel citations")), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--body-sm)',
        color: 'var(--body)',
        marginTop: 7
      }
    }, "The reference ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--ink)'
      }
    }, p.primary), " resolves in ", /*#__PURE__*/React.createElement("strong", null, "no"), " report series. A genuine authority appears across several \u2014 its absence from every series is itself the signal of suspected fabrication."));
  }
  if (!p.refs || p.refs.length < 2) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-sm)',
      padding: '11px 13px',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    size: 14,
    style: {
      color: 'var(--primary-deep)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, "Also reported as")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)'
    }
  }, p.refs.length, " references \xB7 one case")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 9
    }
  }, p.refs.map((r, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 22,
      padding: '0 9px',
      borderRadius: 'var(--radius-full)',
      background: r === p.primary ? 'var(--surface-dark)' : 'var(--surface-bone)',
      color: r === p.primary ? 'var(--on-dark)' : 'var(--charcoal)',
      border: '1px solid var(--hairline)',
      font: 'var(--code-sm)'
    }
  }, r))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 8
    }
  }, "The verifier normalises across every series \u2014 paste any one and it resolves to the same authority."));
}
function verifyUrl(citation, jurisdiction) {
  const q = encodeURIComponent(citation);
  if (jurisdiction && /United States|US/.test(jurisdiction)) return 'https://www.courtlistener.com/?q=' + q;
  return 'https://scholar.google.com/scholar?q=' + q;
}
function SuggestedAuthority({
  finding,
  onUse
}) {
  const c = window.CCData.corpus[finding.id] || {};
  const s = c.suggestion;
  if (c.match !== 'none' || !s) return null;
  const url = verifyUrl(s.citation);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px dashed var(--hairline-strong)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lightbulb",
    size: 15,
    style: {
      color: 'var(--mischar)'
    }
  }), /*#__PURE__*/React.createElement(Overline, null, "Suggested related authority")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption)',
      color: 'var(--ash)'
    }
  }, "Suggestion \xB7 not a verdict")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--charcoal)',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fabricated)'
    }
  }, "Not found"), " stands. A real, in-corpus authority that may be the intended case for ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink)'
    }
  }, finding.legalIssue.toLowerCase()), ":"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      padding: '12px 14px',
      background: 'var(--surface-bone)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-md)',
      color: 'var(--ink)'
    }
  }, s.citation), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 4
    }
  }, s.court, " \xB7 ", s.neutral), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, "Topical match"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 6,
      background: 'var(--hairline)',
      borderRadius: 3,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      height: '100%',
      width: s.match + '%',
      background: 'var(--mischar)',
      borderRadius: 3
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--charcoal)'
    }
  }, s.match, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 10
    }
  }, s.why)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: url,
    target: "_blank",
    rel: "noopener",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 32,
      padding: '0 12px',
      borderRadius: 'var(--radius-full)',
      border: '1px solid var(--hairline-strong)',
      font: 'var(--button-sm)',
      color: 'var(--ink)',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external-link",
    size: 14
  }), " Verify on Find Case Law"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onUse('Replace the unverifiable citation with ' + s.citation + ' (' + s.court + '), which is genuine authority for ' + finding.legalIssue.toLowerCase() + '. ' + s.why + ' — confirm the proposition against the judgment before filing.'),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 32,
      padding: '0 12px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--surface-dark)',
      color: 'var(--on-dark)',
      font: 'var(--button-sm)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "replace",
    size: 14
  }), " Use as replacement")));
}
function FindingDrawer({
  finding,
  onClose,
  app
}) {
  const [amending, setAmending] = useState(false);
  const [draft, setDraft] = useState('');
  if (!finding) return null;
  const f = finding;
  const c = window.CCData.corpus[f.id] || {};
  const reviewed = app.reviews[f.id];
  const ana = window.CCData.analysis[f.id] || {};
  const suggested = f.status === 'Fabricated' ? 'Remove this citation — no reliable authority was found in any available source.' : /United States|European/.test(ana.jurisdiction || '') ? 'Cite ' + f.citation + ' as persuasive authority only — not binding in England & Wales.' : f.actualAuthority ? 'Revise the proposition to rely on this authority only for what it supports: ' + f.actualAuthority : f.recommendedAction || 'Revise the proposition.';
  const saved = (app.amendments || {})[f.id];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(32,32,32,0.28)',
      zIndex: 20,
      animation: 'ccFade 140ms ease'
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 460,
      background: 'var(--surface-card)',
      borderLeft: '1px solid var(--hairline)',
      boxShadow: 'var(--elev-panel)',
      zIndex: 21,
      display: 'flex',
      flexDirection: 'column',
      animation: 'ccSlide 160ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      padding: '18px 20px',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: f.status,
    label: window.CCVerdictLabel(f.status)
  }), reviewed && /*#__PURE__*/React.createElement(ReviewChip, {
    action: reviewed
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-md)',
      color: 'var(--ink)',
      marginTop: 10
    }
  }, f.citation)), /*#__PURE__*/React.createElement(IconButton, {
    variant: "bare",
    ariaLabel: "Close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, null, "Risk"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(RiskBadge, {
    level: f.risk,
    variant: "bar"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, null, "Jurisdiction"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: /unresolved/.test((window.CCData.analysis[f.id] || {}).jurisdiction || '') ? 'map-pin-off' : 'map-pin',
    size: 13,
    style: {
      color: 'var(--charcoal)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 13,
      color: 'var(--ink)'
    }
  }, (window.CCData.analysis[f.id] || {}).jurisdiction || '—'))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 120
    }
  }, /*#__PURE__*/React.createElement(Overline, null, "Issue"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 4
    }
  }, f.legalIssue))), /*#__PURE__*/React.createElement(ParallelCites, {
    id: f.id
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Overline, null, "Confidence \u2014 decomposed"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)'
    }
  }, "existence \u2260 fidelity")), /*#__PURE__*/React.createElement(window.CCTwoAxis, {
    id: f.id
  })), /*#__PURE__*/React.createElement(Section, {
    icon: "quote",
    title: "Extracted proposition",
    tone: "bone"
  }, f.extractedProposition || 'The skeleton relies on this authority as drafted; the cited proposition matches the holding.'), /*#__PURE__*/React.createElement(Section, {
    icon: "book-open",
    title: "What the authority actually supports"
  }, f.actualAuthority || c.holding || 'The authority exists and is applied consistently with its holding.'), /*#__PURE__*/React.createElement(Section, {
    icon: "search-check",
    title: "Explanation"
  }, f.explanation), /*#__PURE__*/React.createElement(SignalSection, {
    finding: f
  }), /*#__PURE__*/React.createElement(TreatmentSection, {
    finding: f
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => app.openSource(f.id),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      width: '100%',
      textAlign: 'left',
      background: 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 14px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.match === 'none' ? 'file-x' : 'file-search',
    size: 16,
    style: {
      color: c.match === 'none' ? 'var(--fabricated)' : 'var(--charcoal)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--caption-strong)',
      color: 'var(--ink)'
    }
  }, c.match === 'none' ? 'No source found' : c.match === 'external' ? 'Open-source match' : 'Corpus match'), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--code-sm)',
      color: 'var(--mute)',
      marginTop: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, c.match === 'none' ? 'Searched ' + (c.searched || []).length + ' sources' : c.court + ' · ' + c.neutral))), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    style: {
      color: 'var(--stone)',
      flex: '0 0 auto'
    }
  })), /*#__PURE__*/React.createElement(DecisionPath, {
    finding: f,
    app: app
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flag",
    size: 15,
    style: {
      color: 'var(--primary-deep)'
    }
  }), /*#__PURE__*/React.createElement(Overline, null, "Recommended action")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--ink)',
      marginTop: 8
    }
  }, f.recommendedAction)), /*#__PURE__*/React.createElement(SuggestedAuthority, {
    finding: f,
    onUse: text => {
      setDraft(text);
      setAmending(true);
    }
  })), saved && !amending && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px',
      background: 'var(--verified-bg)',
      borderTop: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      font: 'var(--caption-strong)',
      color: 'var(--verified)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 14
  }), " Amended by reviewer"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDraft(saved);
      setAmending(true);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      font: 'var(--button-sm)',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pencil",
    size: 13
  }), " Edit")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--ink)',
      marginTop: 6
    }
  }, saved)), amending && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderTop: '1px solid var(--hairline)',
      background: 'var(--surface-bone)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "wand-2",
    size: 15,
    style: {
      color: 'var(--primary-deep)'
    }
  }), " Amend \u2014 apply the auto-fix or edit by hand"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDraft(suggested),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      font: 'var(--button-sm)',
      color: 'var(--primary-deep)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 13
  }), " Auto-fix")), /*#__PURE__*/React.createElement("textarea", {
    value: draft,
    onChange: e => setDraft(e.target.value),
    rows: 4,
    placeholder: "Type the corrected wording\u2026",
    style: {
      width: '100%',
      boxSizing: 'border-box',
      font: 'var(--body-sm)',
      lineHeight: 1.5,
      color: 'var(--ink)',
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--hairline-strong)',
      background: 'var(--surface-card)',
      resize: 'vertical',
      outline: 'none'
    },
    onFocus: e => {
      e.currentTarget.style.boxShadow = '0 0 0 3px var(--ring-focus)';
    },
    onBlur: e => {
      e.currentTarget.style.boxShadow = 'none';
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15
    }),
    onClick: () => {
      if (draft.trim()) {
        app.amend(f.id, draft.trim());
        app.review(f.id, 'Amended');
      }
      setAmending(false);
    }
  }, "Save amendment"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setAmending(false)
  }, "Cancel"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '14px 20px',
      borderTop: '1px solid var(--hairline)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15
    }),
    onClick: () => app.review(f.id, 'Approved')
  }, "Approve"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "pencil",
      size: 15
    }),
    onClick: () => {
      setDraft(saved || suggested);
      setAmending(true);
    }
  }, "Amend"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 15
    }),
    onClick: () => app.review(f.id, 'Rejected')
  }, "Reject"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 15
    }),
    onClick: () => app.review(f.id, 'Escalated')
  }, "Escalate to Partner"))));
}
function CitationChecker({
  openId,
  onOpenFinding,
  filter,
  setFilter,
  app
}) {
  const all = window.CCData.findings;
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({
    key: 'default',
    dir: 1
  });
  const selected = all.find(f => f.id === openId) || null;
  const RISK_ORDER = {
    Low: 1,
    Medium: 2,
    High: 3,
    Critical: 4
  };
  const STATUS_ORDER = {
    Verified: 1,
    Mischaracterised: 2,
    Fabricated: 3
  };
  const counts = {
    All: all.length,
    Verified: all.filter(f => f.status === 'Verified').length,
    Mischaracterised: all.filter(f => f.status === 'Mischaracterised').length,
    Fabricated: all.filter(f => f.status === 'Fabricated').length
  };
  const SOURCE_LABEL = {
    corpus: {
      t: 'Corpus',
      sub: 'internal',
      hue: 'var(--verified)',
      icon: 'database'
    },
    external: {
      t: 'Open web',
      sub: 'external',
      hue: 'var(--mischar)',
      icon: 'globe'
    },
    none: {
      t: 'Not found',
      sub: 'no source',
      hue: 'var(--fabricated)',
      icon: 'search-x'
    }
  };
  const triageRank = f => {
    const rev = window.CCFlow.disposition(f, app.guardrails).d === 'Review' ? 1 : 0;
    const fid = (window.CCData.analysis[f.id] || {}).fidelity;
    return rev * 1000 + RISK_ORDER[f.risk] * 100 + (100 - (fid == null ? 0 : fid));
  };
  let rows = all.filter(f => (filter === 'All' || f.status === filter) && (f.citation.toLowerCase().includes(query.toLowerCase()) || f.legalIssue.toLowerCase().includes(query.toLowerCase())));
  if (sort.key === 'triage') {
    rows = [...rows].sort((a, b) => triageRank(b) - triageRank(a));
  } else if (sort.key !== 'default') {
    rows = [...rows].sort((a, b) => {
      let av, bv;
      if (sort.key === 'confidence') {
        av = a.confidence;
        bv = b.confidence;
      } else if (sort.key === 'risk') {
        av = RISK_ORDER[a.risk];
        bv = RISK_ORDER[b.risk];
      } else {
        av = STATUS_ORDER[a.status];
        bv = STATUS_ORDER[b.status];
      }
      return (av - bv) * sort.dir;
    });
  }
  const toggleSort = key => setSort(s => s.key === key ? {
    key,
    dir: -s.dir
  } : {
    key,
    dir: 1
  });
  // Analytics over the currently-filtered rows
  const avgConf = rows.length ? Math.round(rows.reduce((s, f) => s + f.confidence, 0) / rows.length) : 0;
  const matched = rows.filter(f => (window.CCData.corpus[f.id] || {}).match !== 'none').length;
  const matchRate = rows.length ? Math.round(matched / rows.length * 100) : 0;
  const highRisk = rows.filter(f => f.risk === 'High' || f.risk === 'Critical').length;
  const tri = window.CCFlow.triage(all, app.guardrails);
  const SortHead = ({
    label,
    k
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleSort(k),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: sort.key === k ? 'var(--ink)' : 'var(--mute)'
    }
  }, label, /*#__PURE__*/React.createElement(Icon, {
    name: sort.key === k ? sort.dir === 1 ? 'arrow-up' : 'arrow-down' : 'chevrons-up-down',
    size: 12
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      minHeight: 600
    }
  }, /*#__PURE__*/React.createElement(window.CCCaseHeader, {
    app: app
  }), /*#__PURE__*/React.createElement(Card, {
    pad: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '16px 20px',
      borderBottom: '1px solid var(--hairline)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(FilterChip, {
    active: filter === 'All',
    count: counts.All,
    onClick: () => setFilter('All')
  }, "All"), /*#__PURE__*/React.createElement(FilterChip, {
    active: filter === 'Verified',
    dotColor: "var(--verified)",
    count: counts.Verified,
    onClick: () => setFilter('Verified')
  }, "Verified"), /*#__PURE__*/React.createElement(FilterChip, {
    active: filter === 'Mischaracterised',
    dotColor: "var(--mischar)",
    count: counts.Mischaracterised,
    onClick: () => setFilter('Mischaracterised')
  }, "Mischaracterised"), /*#__PURE__*/React.createElement(FilterChip, {
    active: filter === 'Fabricated',
    dotColor: "var(--fabricated)",
    count: counts.Fabricated,
    onClick: () => setFilter('Fabricated')
  }, "Not found")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleSort('triage'),
    title: "Order by what to fix first against the deadline",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 36,
      padding: '0 12px',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      font: 'var(--button-sm)',
      background: sort.key === 'triage' ? 'var(--ink)' : 'var(--surface-card)',
      color: sort.key === 'triage' ? 'var(--on-dark)' : 'var(--charcoal)',
      border: `1px solid ${sort.key === 'triage' ? 'var(--ink)' : 'var(--hairline)'}`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "list-ordered",
    size: 15
  }), " Triage"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 210
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "sm",
    placeholder: "Search citations\u2026",
    value: query,
    onChange: e => setQuery(e.target.value),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      padding: '0 20px',
      borderBottom: '1px solid var(--hairline)',
      background: 'var(--surface-bone)'
    }
  }, [['Showing', rows.length + ' of ' + all.length], ['Avg confidence', avgConf + '%'], ['Flagged for review', String(tri.count)], ['Est. time to clear', tri.totalMin + ' min']].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1,
      padding: '11px 0',
      borderLeft: i === 0 ? 'none' : '1px solid var(--hairline)',
      paddingLeft: i === 0 ? 0 : 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 19px/1.1 var(--font-display)',
      color: 'var(--ink)',
      marginTop: 3
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '150px 1fr 116px 110px 150px',
      gap: 0,
      padding: '10px 20px',
      borderBottom: '1px solid var(--hairline)',
      background: 'var(--surface-bone)'
    }
  }, /*#__PURE__*/React.createElement(SortHead, {
    label: "Status",
    k: "status"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, "Citation & legal issue"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, "Verified via"), /*#__PURE__*/React.createElement(SortHead, {
    label: "Confidence",
    k: "confidence"
  }), /*#__PURE__*/React.createElement(SortHead, {
    label: "Risk",
    k: "risk"
  })), /*#__PURE__*/React.createElement("div", null, rows.map((f, i) => {
    const reviewed = app.reviews[f.id];
    return /*#__PURE__*/React.createElement("button", {
      key: f.id,
      onClick: () => onOpenFinding(f.id),
      className: "cc-reveal",
      style: {
        display: 'grid',
        gridTemplateColumns: '150px 1fr 116px 110px 150px',
        alignItems: 'center',
        gap: 0,
        width: '100%',
        textAlign: 'left',
        padding: '14px 20px',
        animationDelay: i * 35 + 'ms',
        background: selected && selected.id === f.id ? 'var(--surface-bone)' : 'transparent',
        border: 'none',
        borderTop: i === 0 ? 'none' : '1px solid var(--hairline)',
        cursor: 'pointer'
      },
      onMouseEnter: e => {
        if (!(selected && selected.id === f.id)) e.currentTarget.style.background = 'var(--canvas)';
      },
      onMouseLeave: e => {
        if (!(selected && selected.id === f.id)) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(StatusBadge, {
      status: f.status,
      label: window.CCVerdictLabel(f.status)
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0,
        paddingRight: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--code-sm)',
        color: 'var(--ink)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, f.citation), reviewed && /*#__PURE__*/React.createElement(ReviewChip, {
      action: reviewed
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--body-sm)',
        color: 'var(--charcoal)',
        marginTop: 3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, f.legalIssue), (() => {
      const tv = window.CCTreatmentVerdict(f.id);
      return tv ? /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          marginTop: 5
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: tv.icon,
        size: 11,
        style: {
          color: tv.hue,
          flex: '0 0 auto'
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          font: 'var(--caption-strong)',
          fontSize: 11,
          color: tv.hue
        }
      }, tv.label), /*#__PURE__*/React.createElement("span", {
        style: {
          font: 'var(--code-sm)',
          color: 'var(--ash)'
        }
      }, "\xB7 ", tv.citedText)) : null;
    })()), (() => {
      const sl = SOURCE_LABEL[(window.CCData.corpus[f.id] || {}).match] || SOURCE_LABEL.none;
      return /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          paddingRight: 12
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: sl.icon,
        size: 13,
        style: {
          color: sl.hue,
          flex: '0 0 auto'
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'block',
          font: 'var(--caption-strong)',
          fontSize: 13,
          color: 'var(--ink)'
        }
      }, sl.t), /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'block',
          font: 'var(--code-sm)',
          color: 'var(--ash)'
        }
      }, sl.sub)));
    })(), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--caption-strong)',
        fontSize: 14,
        color: 'var(--ink)'
      }
    }, f.confidence, "%"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement(RiskBadge, {
      level: f.risk
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 16,
      style: {
        color: 'var(--stone)'
      }
    })));
  }), rows.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px 20px',
      textAlign: 'center',
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, "No citations match this filter."))), /*#__PURE__*/React.createElement(FindingDrawer, {
    key: selected && selected.id,
    finding: selected,
    onClose: () => onOpenFinding(null),
    app: app
  }));
}
window.CCCitationChecker = CitationChecker;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/CitationChecker.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/Dashboard.jsx
try { (() => {
/* Dashboard tab — overview: health, tallies, queue snapshot. */
const {
  StatCard,
  HealthMeter,
  Card,
  Button
} = window.ConsistencyCheckDesignSystem_77c3a7;
const {
  CCIcon: Icon,
  CCOverline: Overline
} = window;
function ScorePanel({
  app
}) {
  const s = window.CCData.scores;
  const sum = window.CCFlow.summary(window.CCData.findings, app.guardrails);
  return /*#__PURE__*/React.createElement(Card, {
    tone: "dark",
    pad: 24,
    interactive: true,
    style: {
      display: 'flex',
      gap: 28,
      alignItems: 'center',
      cursor: 'pointer'
    },
    onClick: () => app.goTo('Verification')
  }, /*#__PURE__*/React.createElement(HealthMeter, {
    score: s.health,
    label: "",
    size: 128,
    valueColor: "var(--on-dark)",
    subColor: "var(--on-dark-mute)",
    trackColor: "rgba(255,255,255,0.14)",
    style: {
      filter: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Overline, {
    dark: true
  }, "Citation health score"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--heading-md)',
      color: 'var(--on-dark)',
      marginTop: 4
    }
  }, "Partner review before filing"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--on-dark-mute)'
    }
  }, "CONFIDENCE"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 22px/1 var(--font-display)',
      color: 'var(--on-dark)',
      marginTop: 4
    }
  }, s.confidence, "%")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--on-dark-mute)'
    }
  }, "RISK LEVEL"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 22px/1 var(--font-display)',
      color: 'var(--hero-glow)',
      marginTop: 4
    }
  }, s.risk)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--on-dark-mute)'
    }
  }, "READY TO FILE"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 22px/1 var(--font-display)',
      color: sum.readyToFile === 'Yes' ? '#6ee7a8' : 'var(--hero-glow)',
      marginTop: 4
    }
  }, sum.readyToFile)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--on-dark-mute)'
    }
  }, "PASS / REVIEW"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 22px/1 var(--font-display)',
      color: 'var(--on-dark)',
      marginTop: 4
    }
  }, sum.pass, " / ", sum.review)))));
}
function Dashboard({
  app
}) {
  const s = window.CCData.scores;
  const fabricated = window.CCData.findings.filter(f => f.status === 'Fabricated');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(window.CCCaseHeader, {
    app: app
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, [{
    v: s.total,
    l: 'Total citations',
    c: 'Extracted from skeleton argument',
    a: null,
    f: 'All'
  }, {
    v: s.verified,
    l: 'Verified',
    c: 'Exists and applied correctly',
    a: 'var(--verified)',
    f: 'Verified'
  }, {
    v: s.mischaracterised,
    l: 'Mischaracterised',
    c: 'Legal proposition questionable',
    a: 'var(--mischar)',
    f: 'Mischaracterised'
  }, {
    v: s.fabricated,
    l: 'Not found',
    c: 'Absent from every source checked',
    a: 'var(--fabricated)',
    f: 'Fabricated'
  }].map(card => /*#__PURE__*/React.createElement("button", {
    key: card.l,
    onClick: () => app.goToFilter(card.f),
    title: 'View ' + card.f + ' citations',
    style: {
      display: 'block',
      textAlign: 'left',
      padding: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      borderRadius: 'var(--radius-md)'
    },
    onMouseEnter: e => {
      e.currentTarget.firstChild.style.boxShadow = 'var(--elev-2)';
    },
    onMouseLeave: e => {
      e.currentTarget.firstChild.style.boxShadow = 'var(--elev-card)';
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: /*#__PURE__*/React.createElement(window.CCCountUp, {
      value: card.v
    }),
    label: card.l,
    caption: card.c,
    accent: card.a
  })))), /*#__PURE__*/React.createElement(ScorePanel, {
    app: app
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    pad: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--heading-sm)',
      color: 'var(--ink)'
    }
  }, "Highest-risk citations"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => app.goTo('Citation Checker'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 15
    })
  }, "View all 12")), /*#__PURE__*/React.createElement("div", null, fabricated.map((f, i) => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    onClick: () => app.openInChecker(f.id),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      textAlign: 'left',
      padding: '14px 20px',
      background: 'transparent',
      border: 'none',
      borderTop: i === 0 ? 'none' : '1px solid var(--hairline)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--fabricated)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      font: 'var(--code-sm)',
      color: 'var(--ink)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, f.citation), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      color: 'var(--risk-critical)'
    }
  }, "Critical"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    style: {
      color: 'var(--stone)'
    }
  }))))), /*#__PURE__*/React.createElement(Card, {
    pad: 20,
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--heading-sm)',
      color: 'var(--ink)'
    }
  }, "Filing readiness"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption)',
      color: 'var(--mute)'
    }
  }, window.CCData.matter.docType)), (() => {
    const s = window.CCFlow.summary(window.CCData.findings, app.guardrails);
    return [['Authorities', s.total], ['Verified', s.internalVerified + s.extVerified, 'var(--verified)'], ['Flagged for review', s.review, 'var(--risk-high)'], ['Not found in any source', s.fabricated, 'var(--fabricated)'], ['Ready to file', s.readyToFile, s.readyToFile === 'Yes' ? 'var(--verified)' : 'var(--fabricated)']].map(([k, v, c], i) => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '9px 0',
        borderTop: i === 0 ? 'none' : '1px solid var(--hairline)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--body-sm)',
        color: 'var(--charcoal)'
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--caption-strong)',
        fontSize: 15,
        color: c || 'var(--ink)'
      }
    }, v)));
  })(), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    fullWidth: true,
    style: {
      marginTop: 14
    },
    onClick: () => app.goTo('Document')
  }, "Open working document"))));
}
window.CCDashboard = Dashboard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/DataSources.jsx
try { (() => {
/* Data Sources tab — external databases + model engines + architecture. */
const {
  Card,
  Input
} = window.ConsistencyCheckDesignSystem_77c3a7;
const {
  CCIcon: Icon,
  CCOverline: Overline
} = window;
const SRC_ICON = {
  'Local Corpus': 'database',
  'Open Legal API': 'plug',
  'Open Statutory Source': 'landmark',
  'EU Knowledge Graph': 'share-2',
  'US Bulk Corpus': 'library',
  'Primary Court Source': 'gavel',
  'Fallback Web Search': 'globe',
  'Restricted Source': 'lock'
};
const ENGINE_ICON = {
  NVIDIA: 'cpu',
  Perplexity: 'globe'
};
function StatusDot({
  off
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 10px',
      borderRadius: 'var(--radius-full)',
      font: 'var(--caption-strong)',
      background: off ? 'var(--surface-bone)' : 'var(--verified-bg)',
      color: off ? 'var(--mute)' : 'var(--verified)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: off ? 'var(--stone)' : 'var(--verified)'
    }
  }), off ? 'Off-limits' : 'Connected');
}
const SRC_META = {
  'Provided UK / Commonwealth Case Corpus': {
    jur: 'UK / Commonwealth',
    checked: 12,
    matched: 7,
    sample: 'match("Anglia Television Ltd v Reed [1972] 1 QB 60")'
  },
  'CourtListener': {
    jur: 'United States',
    checked: 5,
    matched: 0,
    sample: 'GET /api/rest/v4/search/?q=&type=o&order_by=citeCount'
  },
  'legislation.gov.uk': {
    jur: 'UK statute',
    checked: 5,
    matched: 0,
    sample: 'GET /ukpga/2013/26/section/1/data.xml'
  },
  'EUR-Lex / CELLAR SPARQL': {
    jur: 'European Union',
    checked: 5,
    matched: 0,
    sample: 'SPARQL SELECT ?act WHERE { ?act cdm:amends ?other }'
  },
  'Caselaw Access Project': {
    jur: 'United States',
    checked: 5,
    matched: 0,
    sample: 'GET https://static.case.law/us/347/cases/.json'
  },
  'UK Supreme Court': {
    jur: 'UK apex court',
    checked: 5,
    matched: 0,
    sample: 'GET /cases/uksc-2020-0166'
  },
  'Perplexity Live Search': {
    jur: 'Open web',
    checked: 5,
    matched: 2,
    sample: 'POST /chat/completions { model: "sonar" }'
  },
  'BAILII / Find Case Law': {
    jur: 'Restricted',
    checked: 0,
    matched: 0,
    sample: 'licence prohibits scraping / computational access'
  }
};
function SourceDetailModal({
  source,
  onClose
}) {
  if (!source) return null;
  const s = source;
  const off = s.status === 'Off-limits';
  const m = SRC_META[s.name] || {
    jur: '-',
    checked: 0,
    matched: 0,
    sample: '-'
  };
  const pct = m.checked ? Math.round(m.matched / m.checked * 100) : 0;
  const usJur = /United States|European/.test(m.jur);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(32,32,32,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      animation: 'ccFade 140ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(560px, 100%)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--elev-pop)',
      animation: 'ccPop 160ms ease',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      padding: '20px 22px',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-bone)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--charcoal)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: SRC_ICON[s.type] || 'database',
    size: 19
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--heading-sm)',
      color: 'var(--ink)'
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, s.role))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--surface-bone)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--charcoal)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 26,
      padding: '0 11px',
      borderRadius: 'var(--radius-full)',
      background: usJur ? 'var(--mischar-bg)' : 'var(--surface-bone)',
      color: usJur ? 'var(--mischar)' : 'var(--charcoal)',
      font: 'var(--caption-strong)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 13
  }), m.jur), /*#__PURE__*/React.createElement(StatusDot, {
    off: off
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Overline, null, "Citations grounded in this matter"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--charcoal)'
    }
  }, m.matched, " matched / ", m.checked, " checked")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-bone)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: pct + '%',
      minWidth: m.matched ? 8 : 0,
      background: m.matched ? 'var(--verified)' : 'var(--stone)',
      borderRadius: 'var(--radius-full)',
      transformOrigin: 'left',
      animation: 'ccGrowX 600ms ease'
    }
  })), m.checked > 0 && m.matched === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 8
    }
  }, "Checked ", m.checked, " escalated citations, ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "0 in-jurisdiction matches"), " for an England & Wales matter. ", usJur ? 'A hit here would be flagged persuasive-only, not binding.' : 'Used for grounding only.')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, null, "Endpoint"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ink)',
      marginTop: 4,
      wordBreak: 'break-all'
    }
  }, s.endpoint), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)',
      marginTop: 2
    }
  }, "auth: ", s.auth, " / coverage: ", s.coverage)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, null, "Sample query"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--on-dark)',
      background: 'var(--surface-dark)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 12px',
      marginTop: 6,
      wordBreak: 'break-all'
    }
  }, m.sample)))));
}
function DataSources({
  app
}) {
  const sources = window.CCData.dataSources;
  const engines = window.CCData.engines;
  const arch = window.CCData.architecture;
  const live = sources.filter(s => s.status === 'Connected').length;
  const [openSrc, setOpenSrc] = React.useState(null);
  const [q, setQ] = React.useState('');
  const ql = q.trim().toLowerCase();
  const fsources = sources.filter(s => (s.name + ' ' + s.type + ' ' + s.role + ' ' + s.endpoint + ' ' + ((SRC_META[s.name] || {}).jur || '')).toLowerCase().includes(ql));
  const fengines = engines.filter(e => (e.name + ' ' + e.vendor + ' ' + e.role + ' ' + e.endpoint).toLowerCase().includes(ql));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, null, "Verification sources"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '6px 0 0',
      font: 'var(--display-md)',
      letterSpacing: '-0.5px',
      color: 'var(--ink)'
    }
  }, "Data sources & engines")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 248
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "sm",
    placeholder: "Search databases, jurisdiction, endpoint",
    value: q,
    onChange: e => setQ(e.target.value),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--verified-bg)',
      color: 'var(--verified)',
      font: 'var(--caption-strong)',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 15
  }), " ", live, " of ", sources.length, " connected"))), /*#__PURE__*/React.createElement(Card, {
    pad: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '34px 1fr 230px 120px',
      gap: 14,
      padding: '10px 20px',
      borderBottom: '1px solid var(--hairline)',
      background: 'var(--surface-bone)'
    }
  }, ['', 'Source & role', 'Endpoint', 'Status'].map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, h))), fsources.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "24px 20px",
      textAlign: "center",
      font: "var(--body-sm)",
      color: "var(--mute)"
    }
  }, "No source matches \"", q, "\"."), fsources.map((s, i) => {
    const off = s.status === 'Off-limits';
    return /*#__PURE__*/React.createElement("div", {
      key: s.name,
      onClick: () => setOpenSrc(s),
      style: {
        display: 'grid',
        gridTemplateColumns: '34px 1fr 230px 120px',
        alignItems: 'center',
        gap: 14,
        padding: '14px 20px',
        borderTop: i === 0 ? 'none' : '1px solid var(--hairline)',
        opacity: off ? 0.72 : 1,
        cursor: 'pointer',
        transition: 'background 120ms ease'
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = 'var(--surface-bone)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 'var(--radius-sm)',
        background: 'var(--surface-bone)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: off ? 'var(--ash)' : 'var(--charcoal)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: SRC_ICON[s.type] || 'database',
      size: 16
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--caption-strong)',
        fontSize: 14,
        color: 'var(--ink)'
      }
    }, s.name), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--body-sm)',
        color: 'var(--mute)',
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--charcoal)'
      }
    }, s.type), " \xB7 ", s.role)), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--code-sm)',
        color: off ? 'var(--ash)' : 'var(--charcoal)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, s.endpoint), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        font: 'var(--code-sm)',
        color: 'var(--ash)',
        marginTop: 2
      }
    }, "auth: ", s.auth)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        justifyContent: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(StatusDot, {
      off: off
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Overline, null, "Model engines"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '6px 0 0',
      font: 'var(--display-md)',
      letterSpacing: '-0.5px',
      color: 'var(--ink)'
    }
  }, "Inference & reasoning")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 12
    }
  }, fengines.map(e => /*#__PURE__*/React.createElement(Card, {
    key: e.name,
    interactive: true,
    pad: 16,
    onClick: () => app.toast(e.vendor + ' ' + e.name + ' \u00b7 ' + e.endpoint, {
      icon: 'cpu',
      hue: 'var(--hero-glow)'
    }),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-bone)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ENGINE_ICON[e.vendor] || 'cpu',
    size: 17
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--ink)'
    }
  }, e.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--caption)',
      color: 'var(--ash)'
    }
  }, e.vendor))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      font: 'var(--caption-strong)',
      color: 'var(--verified)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--verified)'
    }
  }), e.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 10
    }
  }, e.role), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)',
      marginTop: 8
    }
  }, e.endpoint)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Overline, null, "Pipeline"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '6px 0 0',
      font: 'var(--display-md)',
      letterSpacing: '-0.5px',
      color: 'var(--ink)'
    }
  }, "Architecture snapshot")), /*#__PURE__*/React.createElement(Card, {
    tone: "dark",
    pad: 24
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: 0,
      overflowX: 'auto'
    }
  }, arch.map((layer, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: layer.n
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 0',
      minWidth: 150,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      font: '600 12px/1 var(--font-mono)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, layer.n), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--on-dark)'
    }
  }, layer.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, layer.items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it,
    onClick: () => app.toast(layer.name + ' \u00b7 ' + it, {
      icon: 'workflow',
      hue: 'var(--hero-glow)'
    }),
    style: {
      font: 'var(--code-sm)',
      color: 'var(--on-dark-mute)',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 'var(--radius-xs)',
      padding: '7px 9px',
      cursor: 'pointer',
      transition: 'background 120ms ease'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
    }
  }, it)))), i < arch.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--on-dark-mute)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      paddingTop: 16,
      borderTop: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "gem",
    size: 16,
    style: {
      color: 'var(--hero-glow)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--on-dark-mute)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--on-dark)'
    }
  }, "Core value \u2014 "), "Detects inconsistent reasoning, terminology errors, and fabricated legal citations before legal documents are relied upon."))), /*#__PURE__*/React.createElement(SourceDetailModal, {
    source: openSrc,
    onClose: () => setOpenSrc(null)
  }));
}
window.CCDataSources = DataSources;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/DataSources.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/DocumentWorkspace.jsx
try { (() => {
/* Document workspace — DocuSign-style working editor.
   LEFT  = the working document (editable, tracked changes).
   RIGHT = the verification report as supporting guidance + per-case checklist.
   The document is the working copy; the report guides which edits to make. */
const {
  Card: WCard,
  StatusBadge: WStatus,
  RiskBadge: WRisk,
  Button: WBtn,
  IconButton: WIconBtn
} = window.ConsistencyCheckDesignSystem_77c3a7;
const {
  CCIcon: WIcon,
  CCOverline: WOverline
} = window;
const {
  useState: wState,
  useRef: wRef
} = React;
const W_HUE = {
  Verified: 'var(--verified)',
  Mischaracterised: 'var(--mischar)',
  Fabricated: 'var(--fabricated)'
};
const W_BG = {
  Verified: 'var(--verified-bg)',
  Mischaracterised: 'var(--mischar-bg)',
  Fabricated: 'var(--fabricated-bg)'
};
const CHECK_STYLE = {
  pass: {
    icon: 'check',
    hue: 'var(--verified)'
  },
  warn: {
    icon: 'alert-triangle',
    hue: 'var(--mischar)'
  },
  fail: {
    icon: 'x',
    hue: 'var(--fabricated)'
  },
  na: {
    icon: 'minus',
    hue: 'var(--stone)'
  }
};

/* the seven per-case verification checks, derived from the analysis */
function caseChecks(f) {
  const a = window.CCData.analysis[f.id] || {};
  const c = window.CCData.corpus[f.id] || {};
  const absent = a.existence === 'absent' || c.match === 'none';
  const ext = c.match === 'external';
  const foreign = /US|United States|Texas|EU|European/i.test(a.jurisdiction || '');
  const mis = f.status === 'Mischaracterised';
  const ver = f.status === 'Verified';
  return [{
    k: 'Case exists & is real',
    s: absent ? 'fail' : 'pass',
    note: absent ? 'Not found in any source checked' : ext ? 'Confirmed on open-web search' : 'Matched in the provided corpus'
  }, {
    k: 'Correct jurisdiction',
    s: absent ? 'na' : foreign ? 'warn' : 'pass',
    note: absent ? '—' : foreign ? a.jurisdiction + ' — persuasive only, not binding in E&W' : a.jurisdiction || 'England & Wales'
  }, {
    k: 'Contextual grounding',
    s: absent ? 'fail' : ext ? 'warn' : 'pass',
    note: absent ? 'No court or holding to ground the cite' : c.court ? c.court + (c.neutral ? ' · ' + c.neutral : '') : 'Limited context'
  }, {
    k: 'Timeline · still good law',
    s: absent ? 'na' : 'pass',
    note: absent ? '—' : 'No overruling or negative treatment found'
  }, {
    k: 'Still a valid authority',
    s: absent ? 'fail' : 'pass',
    note: absent ? 'Cannot be relied upon — unverifiable' : mis ? 'Valid authority — but for a different proposition' : 'Good law as cited'
  }, {
    k: 'Applied in the correct context',
    s: absent ? 'na' : ver ? 'pass' : 'fail',
    note: ver ? 'Proposition matches the holding' : mis ? 'Overreaches — ' + (f.actualAuthority || 'used beyond what it supports') : 'Authority unverifiable'
  }, {
    k: 'Not miscontextualised',
    s: absent ? 'na' : ver ? 'pass' : 'fail',
    note: ver ? 'Used as the court used it' : mis ? 'Distinguish: the judgment supports a narrower / different point' : 'N/A'
  }];
}
function CheckRow({
  c
}) {
  const st = CHECK_STYLE[c.s] || CHECK_STYLE.na;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 9,
      padding: '7px 0',
      borderTop: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: c.s === 'na' ? 'var(--surface-bone)' : st.hue + '22',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: st.icon,
    size: 12,
    style: {
      color: st.hue
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--caption-strong)',
      fontSize: 13,
      color: 'var(--ink)'
    }
  }, c.k), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 1
    }
  }, c.note)));
}
function CiteMark({
  finding,
  active,
  onClick
}) {
  const hue = W_HUE[finding.status];
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    title: "Review this authority",
    style: {
      cursor: 'pointer',
      background: active ? hue : W_BG[finding.status],
      color: active ? 'var(--on-primary)' : hue,
      borderRadius: 3,
      padding: '1px 4px',
      fontWeight: 600,
      boxShadow: active ? '0 0 0 2px var(--ring-focus)' : `inset 0 -2px 0 ${hue}`,
      transition: 'background 120ms ease, color 120ms ease'
    }
  }, finding.citation);
}

/* ---- LEFT: the working document ---- */
function WorkingDoc({
  app,
  sel,
  setSel,
  editingId,
  setEditingId,
  leftRef,
  blockRefs
}) {
  const blocks = window.CCData.docBlocks;
  const byId = id => window.CCData.findings.find(f => f.id === id);
  const mode = app.docMode;
  const [draft, setDraft] = wState('');
  return /*#__PURE__*/React.createElement("div", {
    ref: leftRef,
    style: {
      overflowY: 'auto',
      flex: 1,
      background: 'var(--stone-wash, #efece6)',
      padding: '22px 22px 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 860,
      margin: '0 auto',
      background: 'var(--surface-card)',
      boxShadow: 'var(--elev-panel)',
      borderRadius: 2,
      padding: '48px 52px 64px',
      minHeight: 600
    }
  }, blocks.map((b, i) => {
    if (b.kind === 'court') return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        font: 'var(--code-sm)',
        color: 'var(--mute)',
        letterSpacing: '0.02em',
        textAlign: 'center',
        marginBottom: 18
      }
    }, b.text);
    if (b.kind === 'title') return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        font: 'var(--heading-sm)',
        color: 'var(--ink)',
        textAlign: 'center',
        paddingBottom: 18,
        marginBottom: 22,
        borderBottom: '1px solid var(--hairline)'
      }
    }, b.text);
    if (b.kind === 'h') return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        font: 'var(--caption-strong)',
        fontSize: 21,
        color: 'var(--ink)',
        margin: '30px 0 12px'
      }
    }, b.text);
    const f = b.cite ? byId(b.cite) : null;
    if (!f) return /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        margin: '0 0 13px',
        fontSize: 19,
        lineHeight: 1.9,
        fontFamily: 'Georgia, "Times New Roman", serif',
        color: 'var(--body)'
      }
    }, b.text);
    const edit = app.docEdits[f.id];
    const selected = sel === f.id;
    const reviewed = app.reviews[f.id];
    const hasFix = !!window.CCData.revisions[f.id];
    const editing = editingId === f.id;

    // inline manual editor
    if (editing) {
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        ref: el => blockRefs.current[f.id] = el,
        style: {
          margin: '0 0 14px',
          padding: 12,
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--primary)',
          background: 'var(--surface-bone)'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          marginBottom: 8,
          font: 'var(--caption-strong)',
          fontSize: 12,
          color: 'var(--primary-deep)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em'
        }
      }, /*#__PURE__*/React.createElement(WIcon, {
        name: "pencil",
        size: 13
      }), " Editing paragraph"), /*#__PURE__*/React.createElement("textarea", {
        value: draft,
        onChange: e => setDraft(e.target.value),
        rows: 5,
        style: {
          width: '100%',
          boxSizing: 'border-box',
          font: 'var(--body-md)',
          lineHeight: 1.6,
          color: 'var(--ink)',
          padding: '10px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--hairline-strong)',
          background: 'var(--surface-card)',
          resize: 'vertical',
          outline: 'none'
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 8,
          marginTop: 10
        }
      }, /*#__PURE__*/React.createElement(WBtn, {
        variant: "primary",
        size: "sm",
        iconLeft: /*#__PURE__*/React.createElement(WIcon, {
          name: "check",
          size: 15
        }),
        onClick: () => {
          if (draft.trim()) app.editBlock(f.id, draft.trim());
          setEditingId(null);
        }
      }, "Save change"), /*#__PURE__*/React.createElement(WBtn, {
        variant: "ghost",
        size: "sm",
        onClick: () => setEditingId(null)
      }, "Cancel"), hasFix && /*#__PURE__*/React.createElement(WBtn, {
        variant: "outline",
        size: "sm",
        iconLeft: /*#__PURE__*/React.createElement(WIcon, {
          name: "sparkles",
          size: 14
        }),
        onClick: () => setDraft(window.CCData.revisions[f.id])
      }, "Use suggested")));
    }

    // edited → redline (tracked) or clean
    if (edit) {
      if (mode === 'clean') {
        return /*#__PURE__*/React.createElement("p", {
          key: i,
          ref: el => blockRefs.current[f.id] = el,
          onClick: () => setSel(f.id),
          style: {
            margin: '0 0 13px',
            fontSize: 19,
            lineHeight: 1.9,
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: 'var(--body)',
            cursor: 'pointer',
            background: sel === f.id ? 'var(--surface-bone)' : 'transparent',
            borderRadius: 4,
            padding: sel === f.id ? '2px 6px' : 0
          }
        }, edit.revised);
      }
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        ref: el => blockRefs.current[f.id] = el,
        onClick: () => setSel(f.id),
        style: {
          margin: '0 0 14px',
          cursor: 'pointer'
        }
      }, mode === 'tracked' && /*#__PURE__*/React.createElement("p", {
        style: {
          margin: '0 0 4px',
          fontSize: 19,
          lineHeight: 1.9,
          fontFamily: 'Georgia, "Times New Roman", serif',
          color: 'var(--ash)',
          textDecoration: 'line-through',
          textDecorationColor: 'var(--fabricated)',
          background: 'var(--fabricated-bg)',
          borderRadius: 3,
          padding: '2px 4px'
        }
      }, b.text), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: 0,
          fontSize: 19,
          lineHeight: 1.9,
          fontFamily: 'Georgia, "Times New Roman", serif',
          color: 'var(--ink)',
          background: 'var(--verified-bg)',
          borderLeft: '2px solid var(--verified)',
          borderRadius: '0 3px 3px 0',
          padding: '6px 10px'
        }
      }, edit.revised), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          font: 'var(--caption-strong)',
          fontSize: 12,
          color: 'var(--verified)'
        }
      }, /*#__PURE__*/React.createElement(WIcon, {
        name: edit.mode === 'applied' ? 'wand-2' : 'pencil',
        size: 12
      }), " ", edit.mode === 'applied' ? 'Suggested fix applied' : 'Edited by reviewer'), /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          setDraft(edit.revised);
          setEditingId(f.id);
        },
        style: {
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          font: 'var(--button-sm)',
          color: 'var(--charcoal)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4
        }
      }, /*#__PURE__*/React.createElement(WIcon, {
        name: "pencil",
        size: 12
      }), " Edit"), /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          app.revertBlock(f.id);
        },
        style: {
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          font: 'var(--button-sm)',
          color: 'var(--mute)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4
        }
      }, /*#__PURE__*/React.createElement(WIcon, {
        name: "undo-2",
        size: 12
      }), " Revert")));
    }

    // normal cited paragraph
    if (mode === 'clean') {
      return /*#__PURE__*/React.createElement("p", {
        key: i,
        ref: el => blockRefs.current[f.id] = el,
        onClick: () => setSel(f.id),
        style: {
          margin: '0 0 13px',
          fontSize: 19,
          lineHeight: 1.9,
          fontFamily: 'Georgia, "Times New Roman", serif',
          color: 'var(--body)',
          cursor: 'pointer',
          background: sel === f.id ? 'var(--surface-bone)' : 'transparent',
          borderRadius: 4,
          padding: sel === f.id ? '2px 6px' : 0
        }
      }, b.text);
    }
    const idx = b.text.indexOf(f.citation);
    const before = idx >= 0 ? b.text.slice(0, idx) : b.text + ' ';
    const after = idx >= 0 ? b.text.slice(idx + f.citation.length) : '';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      ref: el => blockRefs.current[f.id] = el,
      style: {
        margin: '0 0 13px'
      }
    }, /*#__PURE__*/React.createElement("p", {
      onClick: () => setSel(f.id),
      style: {
        margin: 0,
        fontSize: 19,
        lineHeight: 1.9,
        fontFamily: 'Georgia, "Times New Roman", serif',
        color: 'var(--body)',
        cursor: 'pointer',
        background: selected ? 'var(--surface-bone)' : 'transparent',
        borderRadius: 4,
        padding: selected ? '4px 6px' : 0,
        transition: 'background 120ms ease'
      }
    }, before, idx >= 0 ? /*#__PURE__*/React.createElement(CiteMark, {
      finding: f,
      active: selected,
      onClick: () => setSel(f.id)
    }) : /*#__PURE__*/React.createElement(CiteMark, {
      finding: f,
      active: selected,
      onClick: () => setSel(f.id)
    }), after), selected && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 7,
        flexWrap: 'wrap'
      }
    }, reviewed === 'Approved' ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        font: 'var(--caption-strong)',
        fontSize: 12,
        color: 'var(--verified)'
      }
    }, /*#__PURE__*/React.createElement(WIcon, {
      name: "check-circle",
      size: 13
    }), " Accepted as drafted") : /*#__PURE__*/React.createElement(React.Fragment, null, hasFix && /*#__PURE__*/React.createElement("button", {
      onClick: () => app.applyFix(f.id),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 30,
        padding: '0 12px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--surface-dark)',
        color: 'var(--on-dark)',
        border: 'none',
        cursor: 'pointer',
        font: 'var(--button-sm)'
      }
    }, /*#__PURE__*/React.createElement(WIcon, {
      name: "wand-2",
      size: 13
    }), " Apply suggested fix"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setDraft(b.text);
        setEditingId(f.id);
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 30,
        padding: '0 12px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--surface-card)',
        border: '1px solid var(--hairline-strong)',
        cursor: 'pointer',
        font: 'var(--button-sm)',
        color: 'var(--ink)'
      }
    }, /*#__PURE__*/React.createElement(WIcon, {
      name: "pencil",
      size: 13
    }), " Edit text"), f.status === 'Verified' && /*#__PURE__*/React.createElement("button", {
      onClick: () => app.review(f.id, 'Approved'),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 30,
        padding: '0 12px',
        borderRadius: 'var(--radius-full)',
        background: 'transparent',
        border: '1px solid var(--hairline)',
        cursor: 'pointer',
        font: 'var(--button-sm)',
        color: 'var(--charcoal)'
      }
    }, /*#__PURE__*/React.createElement(WIcon, {
      name: "check",
      size: 13
    }), " Accept"))));
  })));
}

/* ---- RIGHT: the report as guidance ---- */
// the system's own risk taxonomy — one bucket per flagged authority.
// Kept top-level so the category chips and the per-item labels stay in lockstep.
window.CCCategoryOf = function (f) {
  if (f.status === 'Fabricated') return 'fabrication';
  if (f.status === 'Mischaracterised') return 'fidelity';
  if (/\bUS\b|United States|Texas|\bTex\b|SW2d/.test((f.legalIssue || '') + ' ' + f.citation)) return 'jurisdiction';
  return 'wording';
};
window.CCCategoryMeta = {
  fabrication: {
    label: 'Fabrication',
    sub: 'Unverified citation · suggest removal',
    hue: 'var(--fabricated)'
  },
  fidelity: {
    label: 'Mischaracterisation',
    sub: 'Mischaracterisation · revise proposition',
    hue: 'var(--mischar)'
  },
  jurisdiction: {
    label: 'Jurisdiction',
    sub: 'Out-of-jurisdiction · confirm it applies here',
    hue: '#2a6fdb'
  },
  wording: {
    label: 'Wording & context',
    sub: 'Wording & context · review before filing',
    hue: 'var(--charcoal)'
  }
};

// every citation in document order (deduped) — the single source of truth for
// the review queue, the stepper counts, and the partner sign-off.
window.CCReviewQueue = function () {
  const seen = {};
  return (window.CCData.docBlocks || []).filter(b => b.cite && !seen[b.cite] && (seen[b.cite] = 1)).map(b => window.CCData.findings.find(f => f.id === b.cite)).filter(Boolean);
};
function associateDecisionOf(f, app) {
  const edit = app.docEdits[f.id];
  const rev = app.reviews[f.id];
  if (edit && edit.mode === 'applied') return {
    label: 'Applied the suggested fix — tracked change inserted',
    tone: 'change'
  };
  if (edit && edit.mode === 'manual') return {
    label: 'Edited the wording by hand — tracked change inserted',
    tone: 'change'
  };
  if (rev === 'Approved') return {
    label: 'Confirmed the authority is correctly applied',
    tone: 'keep'
  };
  if (rev === 'Rejected') return {
    label: 'Reviewed and kept as written',
    tone: 'keep'
  };
  if (rev) return {
    label: 'Reviewed — ' + rev.toLowerCase(),
    tone: 'keep'
  };
  return null;
}
function confidenceSub(f, a) {
  if (f.status === 'Fabricated') return 'no reliable source';
  if (a.existence === 'confirmed-external') return 'confirmed externally';
  if (f.status === 'Mischaracterised') return 'case real · holding differs';
  return 'confirmed in corpus';
}

// short headline verdict, one line, for the high-level summary
function verdictHeadline(f) {
  if (f.status === 'Verified') return f.explanation;
  if (f.status === 'Mischaracterised') return 'Real authority — but applied to the wrong proposition. Revise before filing.';
  return 'No reliable source found across the corpus or approved open sources. Treat as fabricated until a partner verifies.';
}

/* ---- collapsible Signal block (mischaracterised) ---- */
function SignalBlock({
  a
}) {
  const [open, setOpen] = React.useState(false);
  if (!a.signal || !a.signal.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(v => !v),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: '100%',
      textAlign: 'left',
      padding: '10px 12px',
      background: 'var(--surface-bone)',
      border: 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "eye-off",
    size: 15,
    style: {
      color: 'var(--primary-deep)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 13,
      color: 'var(--ink)',
      flex: 1
    }
  }, "Signal \xB7 why this could slip past a busy reviewer"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)',
      flex: '0 0 auto'
    }
  }, a.signal.length), /*#__PURE__*/React.createElement(WIcon, {
    name: open ? 'chevron-up' : 'chevron-down',
    size: 15,
    style: {
      color: 'var(--mute)',
      flex: '0 0 auto'
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      borderTop: '1px solid var(--hairline)'
    }
  }, a.signal.map((sg, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderLeft: '2px solid var(--mischar)',
      paddingLeft: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 12.5,
      color: 'var(--ink)'
    }
  }, i + 1, ". ", sg.type), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 3
    }
  }, sg.text))), a.defensibility && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '9px 11px',
      background: 'var(--surface-bone)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "scale",
    size: 14,
    style: {
      color: 'var(--charcoal)',
      marginTop: 1,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)'
    }
  }, a.defensibility))));
}

/* ---- mini per-citation Verification flow (deepdive) ---- */
function MiniFlow({
  f
}) {
  const c = (window.CCData.corpus || {})[f.id] || {};
  const a = window.CCData.analysis[f.id] || {};
  const ok = 'var(--verified)',
    bad = 'var(--fabricated)',
    warn = 'var(--mischar)';
  const steps = [];
  steps.push({
    label: 'Extracted from skeleton',
    sub: 'claim · citation · source pointer',
    dot: ok
  });
  if (c.match === 'corpus') steps.push({
    label: 'Stage 1 · Internal corpus',
    sub: 'deterministic match — found',
    dot: ok
  });else {
    steps.push({
      label: 'Stage 1 · Internal corpus',
      sub: 'not found in 57-authority corpus',
      dot: warn
    });
    steps.push({
      label: 'Stage 2 · External sources',
      sub: c.match === 'external' ? 'confirmed on approved open sources' : 'not found on any approved source',
      dot: c.match === 'external' ? ok : bad
    });
  }
  if (f.status !== 'Fabricated') steps.push({
    label: 'Holding comparison',
    sub: (a.fidelity != null ? a.fidelity + '% — ' : '') + (a.fidelityLabel || '—'),
    dot: a.fidelity >= 80 ? ok : warn
  });
  steps.push({
    label: 'Disposition',
    sub: window.CCVerdictLabel(f.status),
    dot: f.status === 'Verified' ? ok : f.status === 'Mischaracterised' ? warn : bad
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: s.dot,
      marginTop: 4
    }
  }), i < steps.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      flex: 1,
      background: 'var(--hairline)',
      minHeight: 16
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: i < steps.length - 1 ? 12 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 12.5,
      color: 'var(--ink)'
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 1
    }
  }, s.sub)))));
}

/* ---- mini per-citation Audit trail (deepdive) ---- */
function MiniAudit({
  f,
  app
}) {
  const c = (window.CCData.corpus || {})[f.id] || {};
  const ev = [{
    t: '09:42',
    who: 'Consistency Check Engine',
    label: 'Citation extracted',
    sub: 'parsed from the skeleton argument'
  }, {
    t: '09:43',
    who: 'Citation Verifier',
    label: f.status === 'Verified' ? 'Authority confirmed' : f.status === 'Mischaracterised' ? 'Mischaracterisation flagged' : 'No source found — flagged',
    sub: c.source ? 'matched · ' + c.source : c.searched ? 'searched ' + c.searched.length + ' sources' : 'corpus + open-web checked'
  }];
  const ed = app.docEdits[f.id],
    rv = app.reviews[f.id];
  if (ed) ev.push({
    t: '—',
    who: 'Emma Stride · Associate',
    label: ed.mode === 'applied' ? 'Applied suggested fix' : 'Edited wording by hand',
    sub: 'tracked change inserted',
    human: true
  });else if (rv) ev.push({
    t: '—',
    who: 'Emma Stride · Associate',
    label: rv === 'Approved' ? 'Confirmed correctly applied' : 'Reviewed — kept as written',
    sub: 'associate decision recorded',
    human: true
  });
  if (app.partnerApproved[f.id]) ev.push({
    t: '—',
    who: 'R. Penhallow KC · Partner',
    label: 'Approved for filing',
    sub: 'partner sign-off',
    human: true
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, ev.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: e.human ? 'var(--primary-deep)' : 'var(--ash)',
      flex: '0 0 auto',
      width: 34
    }
  }, e.t), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 12.5,
      color: 'var(--ink)'
    }
  }, e.label, " ", e.human && /*#__PURE__*/React.createElement(WIcon, {
    name: "user",
    size: 11,
    style: {
      color: 'var(--primary-deep)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 1
    }
  }, e.who, " \xB7 ", e.sub)))));
}

/* ---- mini per-citation Data sources (deepdive) ---- */
function MiniSources({
  f
}) {
  const c = (window.CCData.corpus || {})[f.id] || {};
  const matched = c.source;
  const checked = c.searched || ['Provided UK / Commonwealth corpus', 'CourtListener', 'legislation.gov.uk', 'Open-web (Perplexity)'];
  const rows = [];
  if (matched) rows.push({
    name: c.match === 'external' ? matched : 'Corpus · ' + matched,
    tag: c.match === 'external' ? 'External match' : 'Corpus match',
    hit: true
  });
  checked.forEach(s => {
    if (!matched || !s.includes('corpus')) rows.push({
      name: s,
      tag: matched ? 'also checked' : 'searched',
      hit: false
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: r.hit ? 'check-circle' : 'search',
    size: 14,
    style: {
      color: r.hit ? 'var(--verified)' : 'var(--stone)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ink)',
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption)',
      color: r.hit ? 'var(--verified)' : 'var(--ash)',
      flex: '0 0 auto'
    }
  }, r.tag))));
}
function EvidenceSection({
  icon,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: icon,
    size: 14,
    style: {
      color: 'var(--charcoal)'
    }
  }), /*#__PURE__*/React.createElement(WOverline, null, title)), children);
}
function RatioSignal({
  f
}) {
  const [open, setOpen] = wState(false);
  const r = (window.CCData.ratioAnalysis || {})[f.id];
  if (!r || r.type === 'aligned' || r.type === 'na') return null;
  const meta = (window.CCRatioMeta || {})[r.type] || {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-md)',
      background: meta.bg,
      border: '1px solid ' + meta.hue + '33',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(v => !v),
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '10px 12px',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: meta.icon || 'scale',
    size: 15,
    style: {
      color: meta.hue,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 12.5,
      color: meta.hue,
      flex: 1,
      minWidth: 0
    }
  }, r.label, r.strength && r.strength !== 'n/a' ? ' · ' + r.strength : ''), /*#__PURE__*/React.createElement(WIcon, {
    name: open ? 'chevron-up' : 'chevron-down',
    size: 15,
    style: {
      color: meta.hue,
      flex: '0 0 auto'
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 12px 11px 36px'
    }
  }, r.citedAs && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '78px 1fr',
      gap: '3px 10px',
      font: 'var(--body-sm)',
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ash)'
    }
  }, "Cited as"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--body)'
    }
  }, r.citedAs), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ash)'
    }
  }, "Actual ratio"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--body)'
    }
  }, r.actualRatio)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--charcoal)'
    }
  }, r.note)));
}
function GuidanceItem({
  f,
  app,
  goNext
}) {
  const [showEvidence, setShowEvidence] = React.useState(false);
  // every citation collapses back to high-level when you move to a different one
  React.useEffect(() => {
    setShowEvidence(false);
  }, [f.id]);
  const reviewed = app.reviews[f.id];
  const edit = app.docEdits[f.id];
  const hasFix = !!window.CCData.revisions[f.id];
  const a = window.CCData.analysis[f.id] || {};
  const partnerStage = app.wfStage === 'partner';
  const approved = !!app.partnerApproved[f.id];
  const decision = associateDecisionOf(f, app);
  const resolved = !!(edit || reviewed);
  const hue = f.status === 'Verified' ? 'var(--verified)' : f.status === 'Mischaracterised' ? 'var(--mischar)' : 'var(--fabricated)';
  const confirmNext = fn => {
    fn();
    if (goNext) setTimeout(goNext, 90);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(WStatus, {
    status: f.status,
    label: window.CCVerdictLabel(f.status)
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-md)',
      fontSize: 17,
      color: 'var(--ink)',
      lineHeight: 1.3
    }
  }, f.citation), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 4
    }
  }, f.legalIssue)), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '3px solid ' + hue,
      paddingLeft: 13
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: 16,
      lineHeight: 1.55,
      color: 'var(--ink)'
    }
  }, verdictHeadline(f))), /*#__PURE__*/React.createElement(RatioSignal, {
    f: f
  }), hasFix && f.status !== 'Verified' && /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 14px',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "wand-2",
    size: 14,
    style: {
      color: 'var(--primary-deep)'
    }
  }), /*#__PURE__*/React.createElement(WOverline, null, "Suggested revision")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 6px',
      font: 'var(--body-sm)',
      lineHeight: 1.6,
      color: 'var(--ash)',
      textDecoration: 'line-through',
      textDecorationColor: 'var(--fabricated)'
    }
  }, (window.CCData.docBlocks.find(b => b.cite === f.id) || {}).text), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--body-sm)',
      lineHeight: 1.6,
      color: 'var(--ink)',
      fontWeight: 600
    }
  }, window.CCData.revisions[f.id])), f.status !== 'Verified' && /*#__PURE__*/React.createElement(SignalBlock, {
    a: a
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WOverline, null, "Confidence"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 24,
      color: 'var(--ink)',
      marginTop: 3,
      lineHeight: 1.1
    }
  }, f.confidence, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, confidenceSub(f, a))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WOverline, null, "Risk"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(WRisk, {
    level: f.risk
  })))), partnerStage ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, decision && /*#__PURE__*/React.createElement("div", {
    style: {
      background: decision.tone === 'change' ? 'var(--verified-bg)' : 'var(--mischar-bg)',
      borderRadius: 'var(--radius-sm)',
      padding: '9px 12px',
      font: 'var(--body-sm)',
      color: 'var(--body)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "Emma Stride"), " ", decision.label.charAt(0).toLowerCase() + decision.label.slice(1)), approved ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      height: 42,
      borderRadius: 'var(--radius-full)',
      background: 'var(--verified-bg)',
      color: 'var(--verified)',
      font: 'var(--button-md)'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "shield-check",
    size: 16
  }), " Approved for filing") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => confirmNext(() => app.approveCitation(f.id)),
    style: {
      height: 46,
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--ink)',
      color: '#fff',
      font: 'var(--button-md)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "check",
    size: 17
  }), " Approve for filing"), /*#__PURE__*/React.createElement(WBtn, {
    variant: "outline",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(WIcon, {
      name: "corner-up-left",
      size: 14
    }),
    onClick: () => app.sendBackCitation(f.id)
  }, "Send back to associate"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, edit ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      height: 42,
      borderRadius: 'var(--radius-full)',
      background: 'var(--verified-bg)',
      color: 'var(--verified)',
      font: 'var(--button-md)'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "check-circle",
    size: 16
  }), " Applied to document"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "outline",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(WIcon, {
      name: "undo-2",
      size: 14
    }),
    onClick: () => app.revertBlock(f.id)
  }, "Revert"), goNext && /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(WIcon, {
      name: "arrow-right",
      size: 14
    }),
    onClick: goNext
  }, "Next citation"))) : reviewed ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      height: 42,
      borderRadius: 'var(--radius-full)',
      background: 'var(--verified-bg)',
      color: 'var(--verified)',
      font: 'var(--button-md)'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "check-circle",
    size: 16
  }), " ", reviewed === 'Approved' ? 'Confirmed — correctly applied' : 'Reviewed — kept as written'), goNext && /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(WIcon, {
      name: "arrow-right",
      size: 14
    }),
    onClick: goNext
  }, "Next citation")) : f.status === 'Verified' ? /*#__PURE__*/React.createElement("button", {
    onClick: () => confirmNext(() => app.review(f.id, 'Approved')),
    style: {
      height: 46,
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--ink)',
      color: '#fff',
      font: 'var(--button-md)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "check",
    size: 17
  }), " Confirm \u2014 correctly applied") : /*#__PURE__*/React.createElement(React.Fragment, null, hasFix && /*#__PURE__*/React.createElement("button", {
    onClick: () => confirmNext(() => app.applyFix(f.id)),
    style: {
      height: 46,
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: 'var(--ink)',
      color: '#fff',
      font: 'var(--button-md)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "check",
    size: 17
  }), " Use this version"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "outline",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(WIcon, {
      name: "pencil",
      size: 14
    }),
    onClick: () => app.requestEdit(f.id)
  }, "Edit by hand"), !hasFix && /*#__PURE__*/React.createElement(WBtn, {
    variant: "ghost",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(WIcon, {
      name: "check",
      size: 14
    }),
    onClick: () => confirmNext(() => app.review(f.id, 'Approved'))
  }, "Confirm as-is")))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowEvidence(v => !v),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      alignSelf: 'center',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      font: 'var(--button-sm)',
      color: 'var(--charcoal)',
      padding: '4px 8px'
    }
  }, showEvidence ? 'Hide full evidence' : 'See full evidence', " ", /*#__PURE__*/React.createElement(WIcon, {
    name: showEvidence ? 'chevron-up' : 'chevron-down',
    size: 15
  })), showEvidence && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      paddingTop: 4,
      borderTop: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement(EvidenceSection, {
    icon: "shield-check",
    title: "Authority verification"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: /US|EU|unresolved/i.test(a.jurisdiction || '') ? 'map-pin-off' : 'map-pin',
    size: 13,
    style: {
      color: 'var(--charcoal)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 12,
      color: 'var(--ink)'
    }
  }, a.jurisdiction || '—')), /*#__PURE__*/React.createElement("div", null, caseChecks(f).map((c, i) => /*#__PURE__*/React.createElement(CheckRow, {
    key: i,
    c: c
  })))), (() => {
    const r = (window.CCData.ratioAnalysis || {})[f.id];
    if (!r) return null;
    const meta = (window.CCRatioMeta || {})[r.type] || {};
    return /*#__PURE__*/React.createElement(EvidenceSection, {
      icon: "scale",
      title: "Ratio vs obiter"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        height: 20,
        padding: '0 9px',
        borderRadius: 'var(--radius-full)',
        font: 'var(--caption-strong)',
        fontSize: 11.5,
        background: meta.bg,
        color: meta.hue,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement(WIcon, {
      name: meta.icon || 'scale',
      size: 12
    }), " ", r.label, r.strength && r.strength !== 'n/a' ? ' · ' + r.strength : ''), r.citedAs && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '88px 1fr',
        gap: '4px 10px',
        font: 'var(--body-sm)',
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ash)'
      }
    }, "Cited as"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--body)'
      }
    }, r.citedAs), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ash)'
      }
    }, "Actual ratio"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--body)'
      }
    }, r.actualRatio)), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--body-sm)',
        color: 'var(--charcoal)'
      }
    }, r.note));
  })(), f.actualAuthority && /*#__PURE__*/React.createElement(EvidenceSection, {
    icon: "alert-triangle",
    title: "Why it should not be applied as drafted"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)'
    }
  }, f.explanation)), (() => {
    const t = (window.CCData.treatment || {})[f.id];
    if (!t || !t.summary) return null;
    const v = window.CCTreatmentVerdict ? window.CCTreatmentVerdict(f.id) : null;
    return /*#__PURE__*/React.createElement(EvidenceSection, {
      icon: "git-branch",
      title: "How Consistency Check judged this"
    }, v && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        height: 18,
        padding: '0 8px',
        borderRadius: 'var(--radius-full)',
        font: 'var(--caption-strong)',
        fontSize: 11,
        background: v.bg,
        color: v.hue,
        marginBottom: 6
      }
    }, v.label, " \xB7 ", v.citedText), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--body-sm)',
        color: 'var(--body)'
      }
    }, t.summary));
  })(), /*#__PURE__*/React.createElement(EvidenceSection, {
    icon: "flag",
    title: "Disposition"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)'
    }
  }, f.recommendedAction), decision && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      font: 'var(--body-sm)',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "Emma Stride"), " ", decision.label.charAt(0).toLowerCase() + decision.label.slice(1))), /*#__PURE__*/React.createElement(EvidenceSection, {
    icon: "workflow",
    title: "Verification flow"
  }, /*#__PURE__*/React.createElement(MiniFlow, {
    f: f
  })), /*#__PURE__*/React.createElement(EvidenceSection, {
    icon: "history",
    title: "Audit trail"
  }, /*#__PURE__*/React.createElement(MiniAudit, {
    f: f,
    app: app
  })), /*#__PURE__*/React.createElement(EvidenceSection, {
    icon: "database",
    title: "Data sources checked"
  }, /*#__PURE__*/React.createElement(MiniSources, {
    f: f
  }))));
}
function ReportGuidance({
  app,
  sel,
  setSel,
  guideRef,
  guideItemRefs
}) {
  const findings = window.CCData.findings;
  const order = [...findings].sort((a, b) => (a.status === 'Verified' ? 1 : 0) - (b.status === 'Verified' ? 1 : 0));
  const changes = Object.keys(app.docEdits).length;
  // Every suggestion is bucketed by THIS system's own risk taxonomy
  // (shared with the per-item labels via window.CCCategoryOf so they stay in lockstep).
  const categoryOf = window.CCCategoryOf;
  const needsAttention = f => !/^no action/i.test(f.recommendedAction || '');
  const isResolved = f => !!(app.docEdits[f.id] || app.reviews[f.id]);
  const flagged = findings.filter(needsAttention);
  const resolved = flagged.filter(isResolved).length;
  const ready = resolved === flagged.length;
  const CATS = [['fabrication', 'Fabrication', 'var(--fabricated)'], ['fidelity', 'Mischaracterisation', 'var(--mischar)'], ['jurisdiction', 'Jurisdiction', '#2a6fdb'], ['wording', 'Wording & context', 'var(--charcoal)']];
  const openByCat = key => flagged.filter(f => categoryOf(f) === key && !isResolved(f)).length;
  const jumpToCat = key => {
    const target = flagged.find(f => categoryOf(f) === key && !isResolved(f)) || flagged.find(f => categoryOf(f) === key);
    if (target) setSel(target.id);
  };
  const stage = app.wfStage;
  const partApproved = flagged.filter(f => app.partnerApproved[f.id]).length;
  const assocReady = ready;
  const partReady = partApproved === flagged.length && flagged.length > 0;
  const ids = flagged.map(f => f.id);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      flex: '1 1 0',
      minWidth: 0,
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      borderBottom: '1px solid var(--hairline)',
      background: 'var(--surface-bone)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: stage === 'partner' ? 'gavel' : 'sparkles',
    size: 16,
    style: {
      color: stage === 'partner' ? 'var(--primary-deep)' : 'var(--primary-deep)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--heading-sm)',
      fontSize: 15,
      color: 'var(--ink)'
    }
  }, stage === 'partner' ? 'Partner sign-off' : 'Associate review'), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 20,
      padding: '0 8px',
      borderRadius: 'var(--radius-full)',
      background: (stage === 'partner' ? flagged.length - partApproved : flagged.length - resolved) ? 'var(--mischar-bg)' : 'var(--verified-bg)',
      color: (stage === 'partner' ? flagged.length - partApproved : flagged.length - resolved) ? 'var(--mischar)' : 'var(--verified)',
      font: 'var(--caption-strong)',
      fontSize: 12
    }
  }, stage === 'partner' ? flagged.length - partApproved + ' to approve' : flagged.length - resolved + ' open'), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      font: 'var(--caption)',
      color: 'var(--ash)'
    }
  }, stage === 'partner' ? 'reviewing the associate’s decisions' : 'from the verification report')), stage === 'associate' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 12
    }
  }, CATS.map(([key, lbl, hue]) => {
    const n = openByCat(key);
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      onClick: () => jumpToCat(key),
      title: n ? 'Jump to ' + lbl : lbl + ' — all resolved',
      style: {
        flex: 1,
        textAlign: 'left',
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: n ? 'pointer' : 'default'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 3,
        borderRadius: 2,
        background: hue,
        opacity: n ? 1 : 0.25
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 5,
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--caption-strong)',
        fontSize: 11.5,
        color: 'var(--charcoal)',
        lineHeight: 1.2
      }
    }, lbl), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--code-sm)',
        fontWeight: 600,
        color: n ? hue : 'var(--ash)'
      }
    }, n)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 6,
      background: 'var(--hairline)',
      borderRadius: 3,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      height: '100%',
      width: (flagged.length ? (stage === 'partner' ? partApproved : resolved) / flagged.length * 100 : 100) + '%',
      background: stage === 'partner' ? 'var(--primary-deep)' : ready ? 'var(--verified)' : 'var(--mischar)',
      borderRadius: 3,
      transition: 'width 300ms ease'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--charcoal)'
    }
  }, stage === 'partner' ? partApproved : resolved, "/", flagged.length, " ", stage === 'partner' ? 'approved' : 'reviewed')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 8,
      font: 'var(--body-sm)',
      color: (stage === 'partner' ? partReady : ready) ? 'var(--verified)' : 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: (stage === 'partner' ? partReady : ready) ? 'shield-check' : 'shield-alert',
    size: 14,
    style: {
      color: (stage === 'partner' ? partReady : ready) ? 'var(--verified)' : 'var(--mischar)'
    }
  }), stage === 'partner' ? partReady ? 'All citations approved — ready to generate the clean copy' : 'Approve each citation, or trust the associate review below' : ready ? 'All flags reviewed — ready to hand to the partner' : 'Resolve each flagged authority in the document on the left')), /*#__PURE__*/React.createElement("div", {
    ref: guideRef,
    style: {
      overflowY: 'auto',
      flex: 1,
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, stage === 'partner' ? 'Each card shows the associate’s decision and the evidence the AI surfaced. Approve for filing, or send back.' : 'Each suggestion points to a paragraph on the left. Apply to insert a tracked change, or dismiss to keep the original.'), order.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    ref: el => {
      if (guideItemRefs) guideItemRefs.current[f.id] = el;
    }
  }, /*#__PURE__*/React.createElement(GuidanceItem, {
    f: f,
    app: app,
    expanded: sel === f.id,
    onToggle: () => setSel(sel === f.id ? null : f.id)
  })))));
}

/* ---- uploaded real document view ---- */
function UploadedDoc({
  app
}) {
  const doc = app.uploadedDoc;
  const cites = doc.citations || [];
  const highlight = text => {
    if (!cites.length) return text;
    const parts = [];
    let rest = text;
    let key = 0;
    const re = new RegExp('(' + cites.map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'g');
    let last = 0,
      m;
    while (m = re.exec(text)) {
      if (m.index > last) parts.push(text.slice(last, m.index));
      parts.push(/*#__PURE__*/React.createElement("span", {
        key: key++,
        style: {
          background: 'var(--primary-soft)',
          color: 'var(--primary-deep)',
          borderRadius: 3,
          padding: '0 3px',
          fontWeight: 600
        }
      }, m[0]));
      last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 0,
      alignItems: 'stretch',
      height: 'calc(100vh - 232px)',
      minHeight: 540,
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--elev-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      background: '#efece6',
      padding: '22px 22px 60px'
    }
  }, (doc.pages || []).map((pg, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      maxWidth: 720,
      margin: '0 auto 20px',
      background: 'var(--surface-card)',
      boxShadow: 'var(--elev-panel)',
      borderRadius: 2,
      padding: '44px 52px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      right: 16,
      font: 'var(--code-sm)',
      color: 'var(--stone)'
    }
  }, "p. ", i + 1), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 19,
      lineHeight: 1.9,
      fontFamily: 'Georgia, "Times New Roman", serif',
      color: 'var(--body)',
      whiteSpace: 'pre-wrap'
    }
  }, highlight(pg))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderLeft: '1px solid var(--hairline)',
      overflowY: 'auto',
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "file-check-2",
    size: 16,
    style: {
      color: 'var(--verified)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--heading-sm)',
      fontSize: 15,
      color: 'var(--ink)'
    }
  }, "Parsed document")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 6
    }
  }, doc.name, " \xB7 ", (doc.pages || []).length, " page", (doc.pages || []).length === 1 ? '' : 's', " \xB7 text extracted in-browser."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(WOverline, null, "Citations detected \xB7 ", cites.length), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      marginTop: 8
    }
  }, cites.length ? cites.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      font: 'var(--code-sm)',
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "quote",
    size: 12,
    style: {
      color: 'var(--primary-deep)',
      flex: '0 0 auto'
    }
  }), c)) : /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, "No case-name citations detected in the extracted text."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      marginTop: 16,
      padding: '11px 13px',
      background: 'var(--surface-bone)',
      borderRadius: 'var(--radius-md)',
      font: 'var(--body-sm)',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "info",
    size: 14,
    style: {
      marginTop: 1,
      flex: '0 0 auto',
      color: 'var(--stone)'
    }
  }), /*#__PURE__*/React.createElement("span", null, "Extraction is live. Full citation verification & the tracked-change workflow are demonstrated on the worked Crestholm matter.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "outline",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(WIcon, {
      name: "arrow-left",
      size: 14
    }),
    onClick: () => app.clearUploaded()
  }, "Back to worked example"))));
}
function StageStepper({
  app,
  bare
}) {
  const queue = window.CCReviewQueue();
  const flagged = queue; // every citation is confirmed/actioned, not just the flagged ones
  const assocDone = flagged.filter(f => app.docEdits[f.id] || app.reviews[f.id]).length;
  const partDone = flagged.filter(f => app.partnerApproved[f.id]).length;
  const stage = app.wfStage;
  const actor = stage === 'partner' ? {
    who: 'R. Penhallow KC',
    role: 'Partner',
    av: 'RP',
    hue: 'var(--primary-deep)'
  } : {
    who: 'Emma Stride',
    role: 'Associate',
    av: 'ES',
    hue: 'var(--ink)'
  };
  const steps = [{
    key: 'associate',
    label: 'Associate review',
    sub: assocDone + '/' + flagged.length + ' reviewed'
  }, {
    key: 'partner',
    label: 'Partner sign-off',
    sub: partDone + '/' + flagged.length + ' approved'
  }, {
    key: 'clean',
    label: 'Clean copy',
    sub: 'final filing copy'
  }];
  const order = ['associate', 'partner', 'clean'];
  const cur = order.indexOf(stage);
  const assocReady = flagged.length > 0 && assocDone === flagged.length;
  const partReady = flagged.length > 0 && partDone === flagged.length;
  // forward advance is gated on the current stage being complete; earlier steps go back.
  const stepAction = (key, i) => {
    if (i < cur) {
      if (key === 'associate') return app.backToAssociate;
      return null;
    }
    if (key === 'partner' && stage === 'associate' && assocReady) return app.sendToPartner;
    if (key === 'clean' && stage === 'partner' && partReady) return app.completeClean;
    return null;
  };
  const nextUnlocked = stage === 'associate' && assocReady ? 'partner' : stage === 'partner' && partReady ? 'clean' : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: bare ? 'nowrap' : 'wrap',
      width: bare ? '100%' : 'auto',
      maxWidth: 'none',
      padding: bare ? 0 : '12px 16px',
      background: bare ? 'transparent' : 'var(--surface-card)',
      border: bare ? 'none' : '1px solid var(--hairline)',
      borderRadius: bare ? 0 : 'var(--radius-lg)',
      boxShadow: bare ? 'none' : 'var(--elev-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, steps.map((s, i) => {
    const done = i < cur;
    const on = i === cur;
    const action = stepAction(s.key, i);
    const isNext = s.key === nextUnlocked;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: s.key
    }, i > 0 && /*#__PURE__*/React.createElement(WIcon, {
      name: "chevron-right",
      size: 15,
      style: {
        color: 'var(--stone)'
      }
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      disabled: !action,
      onClick: () => action && action(),
      title: action ? i < cur ? 'Go back to ' + s.label : 'Advance to ' + s.label : isNext ? 'Resolve all items to unlock' : '',
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 10px',
        borderRadius: 'var(--radius-full)',
        background: isNext ? 'var(--primary-soft)' : on ? 'var(--surface-bone)' : 'transparent',
        border: isNext ? '1px solid var(--primary)' : '1px solid transparent',
        cursor: action ? 'pointer' : 'default',
        font: 'inherit',
        textAlign: 'left',
        animation: isNext ? 'ccStepPulse 1.8s ease-in-out infinite' : 'none'
      },
      onMouseEnter: e => {
        if (action && !isNext) e.currentTarget.style.background = 'var(--surface-bone)';
      },
      onMouseLeave: e => {
        if (action && !isNext && !on) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 22,
        borderRadius: '50%',
        flex: '0 0 auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        font: 'var(--caption-strong)',
        fontSize: 11,
        background: done ? 'var(--verified)' : on ? 'var(--surface-dark)' : isNext ? 'var(--primary-deep)' : 'var(--surface-bone)',
        color: done || on || isNext ? 'var(--on-dark)' : 'var(--mute)'
      }
    }, done ? /*#__PURE__*/React.createElement(WIcon, {
      name: "check",
      size: 12
    }) : i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        whiteSpace: 'nowrap',
        font: 'var(--caption-strong)',
        fontSize: 13,
        color: on ? 'var(--ink)' : done ? 'var(--charcoal)' : isNext ? 'var(--primary-deep)' : 'var(--mute)',
        lineHeight: 1.1
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        whiteSpace: 'nowrap',
        font: 'var(--code-sm)',
        fontSize: 11,
        color: isNext ? 'var(--primary-deep)' : 'var(--ash)',
        marginTop: 1
      }
    }, isNext ? 'Ready — click to continue' : s.sub)), isNext && /*#__PURE__*/React.createElement(WIcon, {
      name: "arrow-right",
      size: 14,
      style: {
        color: 'var(--primary-deep)'
      }
    })));
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '5px 11px 5px 6px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-bone)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: actor.hue,
      color: 'var(--on-dark)',
      font: 'var(--caption-strong)',
      fontSize: 11,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, actor.av), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--caption-strong)',
      fontSize: 12.5,
      color: 'var(--ink)',
      lineHeight: 1.1
    }
  }, actor.who), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--code-sm)',
      fontSize: 11,
      color: 'var(--mute)'
    }
  }, "acting as ", actor.role))));
}
function DocumentWorkspace({
  app
}) {
  if (app.uploadedDoc) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WOverline, null, "Working document \xB7 uploaded"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: '6px 0 0',
        font: 'var(--display-md)',
        letterSpacing: '-0.5px',
        color: 'var(--ink)'
      }
    }, app.uploadedDoc.name)), /*#__PURE__*/React.createElement(WBtn, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(WIcon, {
        name: "upload",
        size: 15
      }),
      onClick: () => app.openUpload()
    }, "Upload another")), /*#__PURE__*/React.createElement(UploadedDoc, {
      app: app
    }));
  }
  const [sel, setSel] = wState(null);
  const [editingId, setEditingId] = wState(null);
  const [changesOpen, setChangesOpen] = wState(false);
  const leftRef = wRef(null);
  const blockRefs = wRef({});
  const changes = Object.keys(app.docEdits).length;
  const splitRef = wRef(null);
  const [leftPct, setLeftPct] = wState(60);
  const [dragActive, setDragActive] = wState(false);
  const dragging = wRef(false);
  const onDragStart = e => {
    e.preventDefault();
    dragging.current = true;
    setDragActive(true);
    const move = ev => {
      if (!dragging.current || !splitRef.current) return;
      const r = splitRef.current.getBoundingClientRect();
      const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
      let pct = (cx - r.left) / r.width * 100;
      pct = Math.max(32, Math.min(78, pct));
      setLeftPct(pct);
    };
    const up = () => {
      dragging.current = false;
      setDragActive(false);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('touchend', up);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
    document.addEventListener('touchmove', move, {
      passive: false
    });
    document.addEventListener('touchend', up);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  // selecting from the report scrolls the working copy to the paragraph
  const selectAndScroll = id => {
    setSel(id);
    if (id) requestAnimationFrame(() => {
      const el = blockRefs.current[id];
      const c = leftRef.current;
      if (el && c) c.scrollTop = Math.max(0, el.offsetTop - 28);
    });
  };
  // clicking a citation in the document reveals its suggestion on the RIGHT
  // (expand + scroll the guidance pane) without moving the document itself.
  const guideRef = wRef(null);
  const guideItemRefs = wRef({});
  const selectFromDoc = id => {
    setSel(id);
    if (id) setTimeout(() => {
      const el = guideItemRefs.current[id];
      const c = guideRef.current;
      if (el && c) {
        const target = c.scrollTop + el.getBoundingClientRect().top - c.getBoundingClientRect().top - 12;
        c.scrollTop = Math.max(0, target);
      }
    }, 110);
  };
  app.requestEdit = id => {
    selectAndScroll(id);
    const b = window.CCData.docBlocks.find(x => x.cite === id);
    setEditingId(id);
  };

  // review queue — every citation in document order; the panel walks them one at a time (Lumley first)
  const reviewQueue = window.CCReviewQueue();
  const isResolved = f => !!(app.docEdits[f.id] || app.reviews[f.id] || app.partnerApproved[f.id]);
  const reviewedCount = reviewQueue.filter(isResolved).length;
  const selIdx = reviewQueue.findIndex(f => f.id === sel);
  const selFinding = window.CCData.findings.find(f => f.id === sel);
  const navTo = dir => {
    if (!reviewQueue.length) return;
    let i = selIdx < 0 ? 0 : selIdx;
    i = (i + dir + reviewQueue.length) % reviewQueue.length;
    selectFromDoc(reviewQueue[i].id);
  };
  // advance to the next still-pending citation (used by Confirm / Use this version)
  const goNextPending = () => {
    if (!reviewQueue.length) return;
    const start = selIdx < 0 ? 0 : selIdx;
    for (let k = 1; k <= reviewQueue.length; k++) {
      const f = reviewQueue[(start + k) % reviewQueue.length];
      if (!isResolved(f)) {
        selectFromDoc(f.id);
        return;
      }
    }
    setSel(null); // everything resolved
  };
  const panelOpen = !!selFinding;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: leftRef,
    style: {
      height: 'calc(100vh - 96px)',
      minHeight: 560,
      overflowY: 'auto',
      background: 'var(--canvas)'
    }
  }, /*#__PURE__*/React.createElement(WorkingDoc, {
    app: app,
    sel: sel,
    setSel: selectFromDoc,
    editingId: editingId,
    setEditingId: setEditingId,
    leftRef: null,
    blockRefs: blockRefs
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 64,
      right: 0,
      width: 434,
      height: 'calc(100vh - 64px)',
      background: 'var(--surface-card)',
      borderLeft: '1px solid var(--hairline)',
      boxShadow: '-8px 0 24px rgba(28,27,25,.06)',
      transform: panelOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform .26s cubic-bezier(.4,0,.2,1)',
      overflowY: 'auto',
      zIndex: 30,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--hairline)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '11px 16px',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)'
    }
  }, selIdx >= 0 ? 'Citation ' + (selIdx + 1) + ' of ' + reviewQueue.length : 'Citation', " \xB7 ", reviewedCount, "/", reviewQueue.length, " reviewed"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navTo(-1),
    title: "Previous flag",
    style: {
      width: 28,
      height: 28,
      borderRadius: 7,
      border: '1px solid var(--hairline)',
      background: 'var(--surface-card)',
      color: 'var(--mute)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "chevron-up",
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => navTo(1),
    title: "Next flag",
    style: {
      width: 28,
      height: 28,
      borderRadius: 7,
      border: '1px solid var(--hairline)',
      background: 'var(--surface-card)',
      color: 'var(--mute)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "chevron-down",
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSel(null),
    title: "Close",
    style: {
      width: 28,
      height: 28,
      borderRadius: 7,
      border: 'none',
      background: 'transparent',
      color: 'var(--mute)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "x",
    size: 17
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      flex: 1
    }
  }, selFinding ? /*#__PURE__*/React.createElement(GuidanceItem, {
    f: selFinding,
    app: app,
    goNext: goNextPending
  }) : null)));
}
window.CCDocumentWorkspace = DocumentWorkspace;
window.CCStageStepper = StageStepper;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/DocumentWorkspace.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/Insights.jsx
try { (() => {
/* Insights tab — analytical decomposition of a matter's citation risk.
   Every figure is computed from the matter's own data (window.CCMetrics),
   so each matter in the rail shows its own distinct, correct figures. */
const {
  Card
} = window.ConsistencyCheckDesignSystem_77c3a7;
const {
  CCIcon: Icon,
  CCOverline: Overline,
  CCCountUp: CountUp
} = window;
function Figure({
  title,
  hint,
  badge,
  children,
  caption,
  span
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: span ? '1 / -1' : 'auto',
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--elev-card)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      padding: '16px 18px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--heading-sm)',
      fontSize: 15,
      color: 'var(--ink)'
    }
  }, title), hint && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 3
    }
  }, hint)), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 22,
      padding: '0 9px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--charcoal)'
    }
  }, badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 18px',
      flex: 1
    }
  }, children), caption && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      margin: '14px 18px 16px',
      paddingTop: 12,
      borderTop: '1px solid var(--hairline)',
      font: 'var(--body-sm)',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 14,
    style: {
      color: 'var(--stone)',
      marginTop: 1,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", null, caption)));
}

/* ---- KPI tiles ---- */
function Kpi({
  icon,
  label,
  value,
  sub,
  hue,
  fmt
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--elev-card)',
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      background: 'var(--surface-bone)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: hue || 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 30px/1 var(--font-display)',
      color: hue || 'var(--ink)',
      marginTop: 12,
      letterSpacing: '-0.5px'
    }
  }, /*#__PURE__*/React.createElement(CountUp, {
    value: value,
    format: fmt || (v => v)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 5
    }
  }, sub));
}

/* ---- segmented bar + legend ---- */
function InsightsBar({
  segments,
  height = 16
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height,
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
      background: 'var(--hairline)'
    }
  }, segments.filter(s => s.value > 0).map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    title: s.label + ': ' + s.value,
    style: {
      width: s.value / total * 100 + '%',
      background: s.hue,
      transition: 'width 500ms ease'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px 18px',
      marginTop: 14
    }
  }, segments.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 3,
      background: s.hue,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 13,
      color: 'var(--ink)'
    }
  }, s.value), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, s.label)))));
}

/* ---- Risk map: existence (x) × fidelity (y) ---- */
function RiskMap({
  m
}) {
  const W = 640,
    H = 340,
    L = 56,
    R = 24,
    T = 22,
    B = 50;
  const pw = W - L - R,
    ph = H - T - B;
  const px = x => L + Math.max(0, Math.min(1, x)) * pw;
  const py = y => T + (1 - Math.max(0, Math.min(100, y)) / 100) * ph;
  const xMid = px(0.5),
    yMid = py(60);
  const STYLE = {
    Verified: {
      fill: 'var(--verified)'
    },
    Mischaracterised: {
      fill: 'var(--mischar)'
    },
    Fabricated: {
      fill: 'var(--fabricated)'
    }
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: "100%",
    style: {
      display: 'block'
    },
    preserveAspectRatio: "xMidYMid meet"
  }, /*#__PURE__*/React.createElement("rect", {
    x: L,
    y: T,
    width: xMid - L,
    height: ph,
    fill: "var(--fabricated)",
    opacity: "0.06"
  }), /*#__PURE__*/React.createElement("rect", {
    x: xMid,
    y: T,
    width: px(1) - xMid,
    height: yMid - T,
    fill: "var(--verified)",
    opacity: "0.07"
  }), /*#__PURE__*/React.createElement("rect", {
    x: xMid,
    y: yMid,
    width: px(1) - xMid,
    height: py(0) - yMid,
    fill: "var(--mischar)",
    opacity: "0.07"
  }), /*#__PURE__*/React.createElement("text", {
    x: (L + xMid) / 2,
    y: T + 18,
    textAnchor: "middle",
    style: {
      font: '600 11px var(--font-mono)',
      fill: 'var(--fabricated)',
      opacity: 0.7
    }
  }, "NOT FOUND"), /*#__PURE__*/React.createElement("text", {
    x: (xMid + px(1)) / 2,
    y: T + 18,
    textAnchor: "middle",
    style: {
      font: '600 11px var(--font-mono)',
      fill: 'var(--verified)',
      opacity: 0.8
    }
  }, "EXISTS \xB7 FAITHFUL"), /*#__PURE__*/React.createElement("text", {
    x: (xMid + px(1)) / 2,
    y: py(0) - 10,
    textAnchor: "middle",
    style: {
      font: '600 11px var(--font-mono)',
      fill: 'var(--mischar)',
      opacity: 0.85
    }
  }, "EXISTS \xB7 DRIFTED"), /*#__PURE__*/React.createElement("line", {
    x1: L,
    y1: py(0),
    x2: px(1),
    y2: py(0),
    stroke: "var(--hairline-strong)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: L,
    y1: T,
    x2: L,
    y2: py(0),
    stroke: "var(--hairline-strong)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: xMid,
    y1: T,
    x2: xMid,
    y2: py(0),
    stroke: "var(--hairline)",
    strokeDasharray: "3 4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: L,
    y1: yMid,
    x2: px(1),
    y2: yMid,
    stroke: "var(--hairline)",
    strokeDasharray: "3 4"
  }), [0, 50, 100].map(t => /*#__PURE__*/React.createElement("g", {
    key: t
  }, /*#__PURE__*/React.createElement("text", {
    x: L - 10,
    y: py(t) + 4,
    textAnchor: "end",
    style: {
      font: '11px var(--font-mono)',
      fill: 'var(--ash)'
    }
  }, t))), /*#__PURE__*/React.createElement("text", {
    x: 16,
    y: T + ph / 2,
    textAnchor: "middle",
    transform: `rotate(-90 16 ${T + ph / 2})`,
    style: {
      font: '600 11px var(--font-mono)',
      fill: 'var(--mute)',
      letterSpacing: '0.08em'
    }
  }, "FIDELITY %"), /*#__PURE__*/React.createElement("text", {
    x: px(0.05),
    y: py(0) + 22,
    textAnchor: "start",
    style: {
      font: '11px var(--font-mono)',
      fill: 'var(--ash)'
    }
  }, "not found"), /*#__PURE__*/React.createElement("text", {
    x: px(0.58),
    y: py(0) + 22,
    textAnchor: "middle",
    style: {
      font: '11px var(--font-mono)',
      fill: 'var(--ash)'
    }
  }, "external"), /*#__PURE__*/React.createElement("text", {
    x: px(1),
    y: py(0) + 22,
    textAnchor: "end",
    style: {
      font: '11px var(--font-mono)',
      fill: 'var(--ash)'
    }
  }, "in corpus"), /*#__PURE__*/React.createElement("text", {
    x: L + pw / 2,
    y: H - 6,
    textAnchor: "middle",
    style: {
      font: '600 11px var(--font-mono)',
      fill: 'var(--mute)',
      letterSpacing: '0.08em'
    }
  }, "EXISTENCE \u2192"), m.points.map((p, i) => {
    const cx = px(p.x),
      cy = py(p.y);
    const fill = (STYLE[p.status] || {}).fill || 'var(--stone)';
    if (p.fidNull) {
      return /*#__PURE__*/React.createElement("g", {
        key: p.id
      }, /*#__PURE__*/React.createElement("title", null, p.label, " \xB7 not found (fidelity N/A)"), /*#__PURE__*/React.createElement("circle", {
        cx: cx,
        cy: cy,
        r: "7",
        fill: "none",
        stroke: fill,
        strokeWidth: "2",
        strokeDasharray: "3 3"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: cx,
        cy: cy,
        r: "1.5",
        fill: fill
      }));
    }
    return /*#__PURE__*/React.createElement("g", {
      key: p.id
    }, /*#__PURE__*/React.createElement("title", null, p.label, " \xB7 fidelity ", Math.round(p.y), "%"), p.flagged && /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cy,
      r: "11",
      fill: "none",
      stroke: fill,
      strokeWidth: "1.5",
      opacity: "0.4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cy,
      r: "7",
      fill: fill,
      stroke: "var(--surface-card)",
      strokeWidth: "2"
    }));
  })));
}

/* ---- calibration gauge ---- */
function Gauge({
  label,
  value,
  max = 100,
  suffix = '%',
  hue,
  note
}) {
  const pctv = Math.round(value / max * 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 22px/1 var(--font-display)',
      color: hue
    }
  }, /*#__PURE__*/React.createElement(CountUp, {
    value: value
  }), suffix)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 4,
      background: 'var(--hairline)',
      marginTop: 8,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: pctv + '%',
      background: hue,
      borderRadius: 4,
      transformOrigin: 'left',
      animation: 'ccGrowX 650ms ease'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 7
    }
  }, note));
}

/* ---- time / effort bars ---- */
function EffortBar({
  label,
  minutes,
  peak,
  hue,
  tag
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 13,
      color: 'var(--ink)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--charcoal)'
    }
  }, Math.round(minutes), " min \xB7 ", tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 22,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--hairline)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: minutes / peak * 100 + '%',
      background: hue,
      borderRadius: 'var(--radius-sm)',
      transition: 'width 600ms ease'
    }
  })));
}
function Insights({
  app
}) {
  const id = app.activeProject;
  const m = window.CCMetrics(id, app.guardrails);
  const project = window.CCData.projects.find(p => p.id === id) || window.CCData.projects[0];
  if (!m) return null;
  const hrs = mins => mins >= 60 ? (mins / 60).toFixed(1) + ' h' : Math.round(mins) + ' min';
  const peak = Math.max(m.manualMin, m.assistedMin);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, null, "Insights \xB7 ", m.live ? 'live analysis' : 'archived matter'), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '6px 0 0',
      font: 'var(--display-md)',
      letterSpacing: '-0.5px',
      color: 'var(--ink)'
    }
  }, project.matter), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 4
    }
  }, project.type, " \xB7 ", m.total, " authorities \xB7 figures derived from this matter's findings")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 30,
      padding: '0 13px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      font: 'var(--caption-strong)',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "git-commit",
    size: 14
  }), " ", m.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    icon: "activity",
    label: "Citation health",
    value: m.health,
    sub: m.verifiedPct + '% of authorities verified',
    hue: m.health >= 75 ? 'var(--verified)' : m.health >= 50 ? 'var(--mischar)' : 'var(--fabricated)'
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "shield-check",
    label: "Verified",
    value: m.verified,
    fmt: v => v + ' / ' + m.total,
    sub: "exist & applied correctly",
    hue: "var(--verified)"
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "flag",
    label: "Flagged for review",
    value: m.flagged,
    sub: m.flaggedMin + ' min to clear at triage',
    hue: m.flagged ? 'var(--fabricated)' : 'var(--verified)'
  }), /*#__PURE__*/React.createElement(Kpi, {
    icon: "timer",
    label: "Reviewer time saved",
    value: m.savedMin,
    fmt: v => hrs(v),
    sub: m.pctFaster + '% faster than unaided',
    hue: "var(--primary-deep)"
  })), !m.live && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '11px 14px',
      background: 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      font: 'var(--body-sm)',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "archive",
    size: 15,
    style: {
      color: 'var(--stone)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", null, "Archived matter \u2014 these figures are from this matter's completed review. The live citation-level workspace (Document, Citations, Audit) is loaded for the Crestholm matter.")), /*#__PURE__*/React.createElement(Figure, {
    title: "Risk map \u2014 existence \xD7 fidelity",
    badge: "2-axis",
    hint: "Each authority placed by whether it exists (x) and how faithfully the brief uses it (y). The two questions are answered separately \u2014 a real case can still sit low.",
    caption: "Decoupling the axes is the core method: existence is a near-deterministic lookup; fidelity is a model judgment. Points in the amber band exist but are misapplied \u2014 the failure a fast human reader is most likely to wave through.",
    span: true
  }, /*#__PURE__*/React.createElement(RiskMap, {
    m: m
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    title: "Where each authority was verified",
    badge: "provenance",
    hint: "Internal corpus vs open-web vs not found anywhere.",
    caption: "The system never claims more reach than it has. Anything confirmed only externally \u2014 or not found at all \u2014 is surfaced for a human, not silently passed."
  }, /*#__PURE__*/React.createElement(InsightsBar, {
    segments: [{
      value: m.prov.internal,
      label: 'Internal corpus',
      hue: 'var(--verified)'
    }, {
      value: m.prov.external,
      label: 'Open-web / external',
      hue: 'var(--mischar)'
    }, {
      value: m.prov.none,
      label: 'Not found in any source',
      hue: 'var(--fabricated)'
    }]
  })), /*#__PURE__*/React.createElement(Figure, {
    title: "Jurisdiction mix",
    badge: "binding \u2260 persuasive",
    hint: "Binding (E&W) vs foreign persuasive vs unresolved.",
    caption: "A case can exist and be quoted correctly yet still be the wrong jurisdiction. Foreign authority is flagged as persuasive-only by default, separately from whether it is real."
  }, /*#__PURE__*/React.createElement(InsightsBar, {
    segments: [{
      value: m.jur.uk,
      label: 'England & Wales — binding',
      hue: 'var(--verified)'
    }, {
      value: m.jur.foreign,
      label: 'Foreign — persuasive only',
      hue: 'var(--mischar)'
    }, {
      value: m.jur.unresolved,
      label: 'Unresolved',
      hue: 'var(--fabricated)'
    }]
  })), /*#__PURE__*/React.createElement(Figure, {
    title: "Confidence, decomposed",
    badge: "rigour",
    hint: "Why a single % would mislead.",
    caption: "Existence is checked deterministically against sources; fidelity is a model judgment about whether the proposition matches the holding. Reporting one blended number would overstate the soft part and undersell the hard part."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Gauge, {
    label: "Existence",
    value: Math.round(m.existConfirmed / m.total * 100),
    hue: "var(--verified)",
    note: m.existConfirmed + ' / ' + m.total + ' confirmed against a source — near-deterministic'
  }), /*#__PURE__*/React.createElement(Gauge, {
    label: "Fidelity",
    value: m.avgFid,
    hue: m.avgFid >= 80 ? 'var(--verified)' : m.avgFid >= 60 ? 'var(--mischar)' : 'var(--fabricated)',
    note: "mean proposition-match across authorities \u2014 model judgment"
  }))), /*#__PURE__*/React.createElement(Figure, {
    title: "Reviewer effort vs the clock",
    badge: "throughput",
    hint: "Unaided read-and-verify vs triage-first review.",
    caption: 'At ~18 min to locate and verify each authority unaided, this matter is ~' + Math.round(m.manualMin) + ' min of partner time. Triaging only the flagged authorities clears it in ~' + Math.round(m.assistedMin) + ' min — the difference is the product.'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 30px/1 var(--font-display)',
      color: 'var(--primary-deep)',
      letterSpacing: '-0.5px'
    }
  }, /*#__PURE__*/React.createElement(CountUp, {
    value: m.pctFaster
  }), "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, "faster \u2014 ", hrs(m.savedMin), " of reviewer time returned", m.deadline && m.deadline !== '—' ? ' against a ' + m.deadline + ' filing' : '')), /*#__PURE__*/React.createElement(EffortBar, {
    label: "Unaided manual review",
    minutes: m.manualMin,
    peak: peak,
    hue: "var(--stone)",
    tag: "baseline"
  }), /*#__PURE__*/React.createElement(EffortBar, {
    label: "Consistency Check triage",
    minutes: m.assistedMin,
    peak: peak,
    hue: "var(--primary)",
    tag: "assisted"
  }))), /*#__PURE__*/React.createElement(Figure, {
    title: "Disposition \u2014 what reaches a human",
    badge: "supervision",
    span: true,
    hint: "Every authority routed to Pass or Review under the firm's current guardrails.",
    caption: "Conservative by default: only clearly-verified, in-jurisdiction authorities pass automatically. The funnel narrows to exactly the authorities a partner must look at before filing."
  }, /*#__PURE__*/React.createElement(Funnel, {
    m: m
  })), /*#__PURE__*/React.createElement(Figure, {
    title: "Verification flow",
    badge: "two-stage decision",
    span: true,
    hint: "How every extracted citation moves through the internal corpus check, the external check, and the firm guardrails.",
    caption: "Conservative by construction: a citation only passes automatically when it is found and its claim matches the holding. Anything not found internally is escalated to an external check, and anything still unverified is treated as suspected fabrication for partner review."
  }, window.CCFlowDiagram ? React.createElement(window.CCFlowDiagram, {
    app,
    bare: true
  }) : null), /*#__PURE__*/React.createElement(Figure, {
    title: "Audit trail",
    badge: "defensible record",
    span: true,
    hint: "Immutable, hash-chained log of who saw what, what the AI claimed, and the human action taken.",
    caption: "The audit trail is the basis for whether the document is defensible for filing \u2014 every verdict, its evidence, and the human decision are recorded with a timestamp."
  }, /*#__PURE__*/React.createElement(AuditLog, null)), /*#__PURE__*/React.createElement(Figure, {
    title: "Data sources & engines",
    badge: "verification sources",
    span: true,
    hint: "Every database and model the verifier relied on for this matter, with connection status.",
    caption: "Citation verification is deterministic against the connected sources; absence is bounded to the sources checked. BAILII / Find Case Law is held off-limits under its licence."
  }, /*#__PURE__*/React.createElement(SourcesPanel, null)), /*#__PURE__*/React.createElement(Figure, {
    title: "Build the internal corpus",
    badge: "compounding intelligence",
    span: true,
    hint: "The internal database started as the firm's verified corpus. Every authority a lawyer approves from an external source is promoted into it \u2014 so the system gets smarter with every review.",
    caption: "Internal checks are deterministic and licence-clean. External sources fill the gaps; promoting a confirmed authority means the next matter verifies it internally, with no external round-trip."
  }, /*#__PURE__*/React.createElement(CorpusIntelligence, {
    app: app
  })));
}

/* ---- Corpus intelligence: promote external authorities into the internal database ---- */
function CorpusIntelligence({
  app
}) {
  window.CCCorpus = window.CCCorpus || {
    added: {}
  };
  const store = window.CCCorpus;
  const [, force] = React.useState(0);
  const base = window.CCData.corpusStats && window.CCData.corpusStats.base || 58;
  const seedLabel = window.CCData.corpusStats && window.CCData.corpusStats.seedLabel || 'verified case corpus';
  const candidates = window.CCData.discovered || [];
  const addedCount = candidates.filter(c => store.added[c.id]).length;
  const total = base + addedCount;
  const JUR = {
    ew: 'England & Wales',
    sc: 'Scotland',
    ni: 'Northern Ireland',
    pc: 'Privy Council',
    us: 'United States',
    eu: 'EU'
  };
  const add = c => {
    if (store.added[c.id]) return;
    store.added[c.id] = true;
    force(x => x + 1);
    const now = base + candidates.filter(x => store.added[x.id]).length;
    if (app && app.toast) app.toast('Added to internal corpus — ' + c.case + ' · ' + now + ' authorities', {
      icon: 'database',
      hue: 'var(--verified)'
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(220px, 280px) 1fr',
      gap: 18,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-dark)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 22px 20px',
      color: 'var(--on-dark, #fff)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'rgba(255,255,255,0.6)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "database",
    size: 13
  }), " Internal corpus"), /*#__PURE__*/React.createElement("div", {
    key: total,
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 56,
      lineHeight: 1,
      marginTop: 12,
      animation: 'ccPop 360ms cubic-bezier(0.22,0.61,0.36,1)'
    }
  }, total), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'rgba(255,255,255,0.7)',
      marginTop: 6
    }
  }, "authorities verifiable internally"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'rgba(255,255,255,0.12)',
      margin: '16px 0 14px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: 'var(--body-sm)',
      color: 'rgba(255,255,255,0.65)'
    }
  }, /*#__PURE__*/React.createElement("span", null, seedLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, base)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      font: 'var(--body-sm)',
      color: addedCount ? 'var(--verified)' : 'rgba(255,255,255,0.5)',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "Promoted by your firm"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, "+", addedCount))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 12.5,
      color: 'var(--mute)',
      marginBottom: 10
    }
  }, "Externally verified \u2014 confirmed on the open web, not yet in the internal corpus"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, candidates.map(c => {
    const added = !!store.added[c.id];
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '13px 15px',
        border: '1px solid ' + (added ? 'var(--verified)' : 'var(--hairline)'),
        borderRadius: 'var(--radius-md)',
        background: added ? 'var(--verified-bg)' : 'var(--surface-card)',
        transition: 'background 160ms ease, border-color 160ms ease'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 'var(--radius-full)',
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: added ? 'var(--verified)' : 'var(--surface-bone)',
        color: added ? '#fff' : 'var(--charcoal)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: added ? 'check' : 'globe',
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--caption-strong)',
        fontSize: 13.5,
        color: 'var(--ink)'
      }
    }, c.case, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--code-sm)',
        color: 'var(--mute)',
        fontWeight: 400
      }
    }, c.citation)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        font: 'var(--body-sm)',
        color: 'var(--mute)',
        marginTop: 2,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", null, JUR[c.jur] || c.jur), /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.4
      }
    }, "\xB7"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 12
    }), " ", c.foundVia))), added ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 34,
        padding: '0 14px',
        borderRadius: 'var(--radius-full)',
        font: 'var(--button-sm)',
        color: 'var(--verified)',
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle",
      size: 15
    }), " In corpus") : /*#__PURE__*/React.createElement("button", {
      onClick: () => add(c),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 34,
        padding: '0 15px',
        borderRadius: 'var(--radius-full)',
        border: 'none',
        background: 'var(--ink)',
        color: '#fff',
        font: 'var(--button-sm)',
        cursor: 'pointer',
        flex: '0 0 auto'
      },
      onMouseEnter: e => {
        e.currentTarget.style.background = 'var(--primary-deep)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = 'var(--ink)';
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    }), " Add to database"));
  }))));
}

/* ---- Audit trail (workspace session log) ---- */
function AuditLog() {
  const events = window.CCData.audit || [];
  const ICON = {
    'Document analysed': 'scan-line',
    'Fabricated citation flagged': 'search-x',
    'Mischaracterisation flagged': 'search',
    'Finding escalated': 'user-round'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: 'var(--surface-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 18px',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--on-dark-mute, rgba(255,255,255,0.6))'
    }
  }, "Review session \xB7 14 June 2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--on-dark-mute, rgba(255,255,255,0.55))'
    }
  }, "session #CC-4471-A \xB7 ", events.length, " events")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 18px 14px'
    }
  }, events.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      padding: '14px 0',
      borderTop: i ? '1px solid rgba(255,255,255,0.07)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--primary)',
      flex: '0 0 auto',
      width: 42,
      paddingTop: 1
    }
  }, e.time), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      flex: '0 0 auto',
      background: 'rgba(255,255,255,0.06)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.85)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ICON[e.event] || 'dot',
    size: 15
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 13.5,
      color: 'var(--on-dark, #fff)'
    }
  }, e.event), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--on-dark-mute, rgba(255,255,255,0.5))'
    }
  }, e.actor)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--on-dark-mute, rgba(255,255,255,0.7))',
      marginTop: 3
    }
  }, e.detail))))));
}

/* ---- Data sources & engines ---- */
function SourcesPanel() {
  const sources = window.CCData.dataSources || [];
  const engines = window.CCData.engines || [];
  const connected = sources.filter(s => s.status === 'Connected').length;
  const SICON = {
    'Local Corpus': 'database',
    'Open Legal API': 'plug',
    'Open Statutory Source': 'landmark',
    'EU Knowledge Graph': 'share-2',
    'US Bulk Corpus': 'library',
    'Primary Court Source': 'gavel',
    'Fallback Web Search': 'globe',
    'Restricted Source': 'lock'
  };
  const statusHue = s => s === 'Connected' ? 'var(--verified)' : 'var(--ash)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 11px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--verified-bg)',
      color: 'var(--verified)',
      font: 'var(--caption-strong)',
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 13
  }), " ", connected, " of ", sources.length, " connected")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, sources.map((s, i) => {
    const off = s.status === 'Off-limits';
    return /*#__PURE__*/React.createElement("div", {
      key: s.name,
      style: {
        display: 'grid',
        gridTemplateColumns: '1.7fr 1.4fr auto',
        gap: 12,
        alignItems: 'center',
        padding: '12px 16px',
        borderTop: i ? '1px solid var(--hairline)' : 'none',
        background: off ? 'var(--surface-bone)' : 'var(--surface-card)',
        opacity: off ? 0.72 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 30,
        height: 30,
        borderRadius: 8,
        flex: '0 0 auto',
        background: 'var(--surface-bone)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--charcoal)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: SICON[s.type] || 'database',
      size: 15
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--caption-strong)',
        fontSize: 13.5,
        color: 'var(--ink)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--body-sm)',
        color: 'var(--mute)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, s.type, " \xB7 ", s.role))), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--code-sm)',
        color: 'var(--charcoal)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, s.endpoint), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--code-sm)',
        color: 'var(--ash)',
        marginTop: 1
      }
    }, "auth: ", s.auth)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        font: 'var(--caption-strong)',
        fontSize: 12.5,
        color: statusHue(s.status),
        justifySelf: 'end',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: statusHue(s.status)
      }
    }), " ", s.status));
  })), engines.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, null, "Model engines \xB7 inference & reasoning"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 10,
      marginTop: 10
    }
  }, engines.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.name,
    style: {
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 14px',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "cpu",
    size: 14,
    style: {
      color: 'var(--charcoal)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 13,
      color: 'var(--ink)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, e.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, e.vendor)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      font: 'var(--caption-strong)',
      fontSize: 12,
      color: 'var(--verified)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--verified)'
    }
  }), " ", e.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 6
    }
  }, e.role), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)',
      marginTop: 6
    }
  }, e.endpoint))))));
}
function Funnel({
  m
}) {
  const stages = [{
    label: 'Authorities extracted',
    value: m.total,
    hue: 'var(--ink)',
    sub: 'parsed from the document'
  }, {
    label: 'Auto-passed',
    value: m.pass,
    hue: 'var(--verified)',
    sub: 'verified & in-jurisdiction'
  }, {
    label: 'Routed to review',
    value: m.review,
    hue: m.review ? 'var(--mischar)' : 'var(--verified)',
    sub: 'needs human judgment'
  }, {
    label: 'Ready to file',
    value: m.review === 0 ? 'Yes' : 'No',
    hue: m.review === 0 ? 'var(--verified)' : 'var(--fabricated)',
    sub: m.review === 0 ? 'no open flags' : m.flagged + ' open flag' + (m.flagged === 1 ? '' : 's')
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
      alignItems: 'stretch'
    }
  }, stages.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      position: 'relative',
      background: 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 26px/1 var(--font-display)',
      color: s.hue,
      letterSpacing: '-0.5px'
    }
  }, typeof s.value === 'number' ? /*#__PURE__*/React.createElement(CountUp, {
    value: s.value
  }) : s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 13,
      color: 'var(--ink)',
      marginTop: 8
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 2
    }
  }, s.sub), i < stages.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -12,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      color: 'var(--stone)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18
  })))));
}
window.CCInsights = Insights;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/Insights.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/Report.jsx
try { (() => {
/* Print-ready Citation Verification Report — partner-facing, A4, save-as-PDF. */
const {
  CCIcon: RIcon
} = window;
const {
  useState: useRState
} = React;

// verdict bucket for the interactive clean copy (colour + underline + label)
function verdictOf(f) {
  const cc = (window.CCData.corpus || {})[f.id] || {};
  if (f.status === 'Fabricated') return {
    k: 'n',
    hue: 'var(--fabricated)',
    soft: 'var(--fabricated-bg)',
    label: 'Not found in any source'
  };
  if (f.status === 'Mischaracterised') return {
    k: 'm',
    hue: 'var(--mischar)',
    soft: 'var(--mischar-bg)',
    label: 'Real · used for the wrong proposition'
  };
  if (cc.match === 'external' || /US|United States|Texas/.test((window.CCData.analysis[f.id] || {}).jurisdiction || '')) return {
    k: 'x',
    hue: 'var(--primary-deep)',
    soft: 'var(--primary-soft)',
    label: 'Real · found outside the corpus'
  };
  return {
    k: 'v',
    hue: 'var(--verified)',
    soft: 'var(--verified-bg)',
    label: 'Verified · safe to rely on'
  };
}
function CleanCite({
  f,
  active,
  onClick
}) {
  const v = verdictOf(f);
  const removed = f.status === 'Fabricated';
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    title: "Click to see how this authority was verified",
    style: {
      cursor: 'pointer',
      borderRadius: 3,
      padding: '0 2px',
      whiteSpace: 'normal',
      background: active ? v.soft : 'transparent',
      boxShadow: active ? '0 0 0 2px ' + v.hue : 'none',
      color: removed ? 'var(--ash)' : 'inherit',
      textDecoration: 'underline',
      textDecorationStyle: v.k === 'v' ? 'solid' : 'wavy',
      textDecorationColor: v.hue,
      textUnderlineOffset: 3,
      textDecorationThickness: 2
    }
  }, f.citation);
}
function CleanDetail({
  f,
  onClose
}) {
  const D = window.CCData;
  const v = verdictOf(f);
  const cc = D.corpus[f.id] || {};
  const ana = D.analysis[f.id] || {};
  const rev = D.revisions[f.id];
  const orig = (D.docBlocks.find(b => b.cite === f.id) || {}).text;
  const vl = window.CCVerify ? window.CCVerify(f) : null;
  const par = (D.parallelCites || {})[f.id];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 0,
      alignSelf: 'flex-start',
      width: 380,
      flex: '0 0 380px',
      maxHeight: 'calc(100vh - 120px)',
      overflowY: 'auto',
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--elev-panel)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 24,
      padding: '0 11px',
      borderRadius: 'var(--radius-full)',
      background: v.soft,
      color: v.hue,
      font: 'var(--caption-strong)',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: v.hue
    }
  }), v.label), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 28,
      height: 28,
      borderRadius: 7,
      border: 'none',
      background: 'var(--surface-bone)',
      cursor: 'pointer',
      color: 'var(--charcoal)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "x",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-md)',
      color: 'var(--ink)',
      marginTop: 12
    }
  }, f.citation), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 3
    }
  }, f.legalIssue), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--ash)'
    }
  }, "Confidence"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--ink)',
      marginTop: 2
    }
  }, f.confidence ? f.confidence + '%' : '—')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--ash)'
    }
  }, "Risk"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--ink)',
      marginTop: 2
    }
  }, f.risk)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--ash)'
    }
  }, "Jurisdiction"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--ink)',
      marginTop: 2
    }
  }, ana.jurisdiction || '—'))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      lineHeight: 1.55,
      color: 'var(--body)',
      marginTop: 14,
      paddingLeft: 12,
      borderLeft: '2px solid ' + v.hue
    }
  }, f.explanation), rev && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)',
      marginBottom: 6
    }
  }, "Correction applied in the clean copy"), orig && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 6px',
      font: 'var(--body-sm)',
      lineHeight: 1.55,
      color: 'var(--ash)',
      textDecoration: 'line-through',
      textDecorationColor: 'var(--fabricated)'
    }
  }, orig), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--body-sm)',
      lineHeight: 1.55,
      color: 'var(--ink)',
      fontWeight: 600,
      background: 'var(--verified-bg)',
      borderRadius: 6,
      padding: '8px 10px'
    }
  }, rev)), par && par.refs && par.refs.length > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)',
      marginBottom: 6
    }
  }, "Also reported as \xB7 one case"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 5
    }
  }, par.refs.map((r, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: 'var(--code-sm)',
      color: 'var(--charcoal)',
      background: 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-full)',
      padding: '2px 8px'
    }
  }, r)))), vl && vl[0] && /*#__PURE__*/React.createElement("a", {
    href: vl[0].url,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 16,
      font: 'var(--button-sm)',
      color: 'var(--ink)',
      textDecoration: 'none',
      height: 34,
      padding: '0 13px',
      borderRadius: 'var(--radius-full)',
      border: '1px solid var(--hairline-strong)'
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "external-link",
    size: 14
  }), " Verify on ", vl[0].label));
}
function CleanCopy({
  app
}) {
  const D = window.CCData;
  const [selId, setSelId] = useRState(null);
  const byId = id => D.findings.find(f => f.id === id);
  const sel = selId ? byId(selId) : null;
  const counts = {
    v: 0,
    m: 0,
    n: 0,
    x: 0
  };
  D.findings.forEach(f => {
    counts[verdictOf(f).k]++;
  });
  const stamp = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: sel ? 1180 : 820,
      margin: '24px auto',
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start',
      transition: 'max-width 200ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cc-report-page",
    style: {
      flex: 1,
      minWidth: 0,
      background: 'var(--surface-card)',
      boxShadow: 'var(--elev-2)',
      padding: '46px 54px 56px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      paddingBottom: 14,
      borderBottom: '1px solid var(--hairline)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      font: 'var(--caption-strong)',
      color: 'var(--verified)'
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "file-check-2",
    size: 16
  }), " Clean copy \xB7 corrections applied"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 12,
      font: 'var(--code-sm)',
      color: 'var(--charcoal)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--verified)'
    }
  }, "\u25CF ", counts.v, " verified"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--mischar)'
    }
  }, "\u25CF ", counts.m, " corrected"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fabricated)'
    }
  }, "\u25CF ", counts.n, " removed"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary-deep)'
    }
  }, "\u25CF ", counts.x, " external"))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      margin: '12px 0 22px',
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "mouse-pointer-click",
    size: 14,
    style: {
      color: 'var(--primary-deep)'
    }
  }), " Every authority is underlined by verdict \u2014 click any one to see how it was verified and what changed."), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: 'var(--code-sm)',
      color: 'var(--mute)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      lineHeight: 1.9
    }
  }, D.docBlocks[0] && D.docBlocks[0].text), /*#__PURE__*/React.createElement("h1", {
    style: {
      textAlign: 'center',
      font: 'var(--heading-md)',
      color: 'var(--ink)',
      margin: '18px 0 4px'
    }
  }, (D.docBlocks.find(b => b.kind === 'title') || {}).text), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginBottom: 26
    }
  }, D.matter.firm, " \xB7 Generated ", stamp), D.docBlocks.map((b, i) => {
    if (b.kind === 'court' || b.kind === 'title') return null;
    if (b.kind === 'h') return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        font: 'var(--overline)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--faint, var(--ash))',
        fontSize: 12,
        fontWeight: 600,
        margin: '26px 0 12px',
        fontFamily: 'var(--font-sans)'
      }
    }, b.text);
    const f = b.cite ? byId(b.cite) : null;
    if (!f) return /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        margin: '0 0 16px',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 16.5,
        lineHeight: 1.85,
        color: '#26241f'
      }
    }, b.text);
    const text = D.revisions[f.id] || b.text;
    const idx = text.indexOf(f.citation);
    const before = idx >= 0 ? text.slice(0, idx) : text + ' ';
    const after = idx >= 0 ? text.slice(idx + f.citation.length) : '';
    return /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        margin: '0 0 16px',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 16.5,
        lineHeight: 1.85,
        color: '#26241f'
      }
    }, before, idx >= 0 && /*#__PURE__*/React.createElement(CleanCite, {
      f: f,
      active: selId === f.id,
      onClick: () => setSelId(selId === f.id ? null : f.id)
    }), after);
  })), sel && /*#__PURE__*/React.createElement(CleanDetail, {
    f: sel,
    onClose: () => setSelId(null)
  }));
}
const RSTATUS = {
  Verified: {
    fg: 'var(--verified)',
    bg: 'var(--verified-bg)'
  },
  Mischaracterised: {
    fg: 'var(--mischar)',
    bg: 'var(--mischar-bg)'
  },
  Fabricated: {
    fg: 'var(--fabricated)',
    bg: 'var(--fabricated-bg)'
  }
};
const RRISK = {
  Low: 'var(--risk-low)',
  Medium: 'var(--risk-medium)',
  High: 'var(--risk-high)',
  Critical: 'var(--risk-critical)'
};
function RBadge({
  status
}) {
  const s = RSTATUS[status] || RSTATUS.Verified;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 20,
      padding: '0 9px',
      borderRadius: 'var(--radius-full)',
      font: 'var(--caption-strong)',
      fontSize: 12,
      background: s.bg,
      color: s.fg,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: s.fg
    }
  }), status);
}
function RSection({
  n,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 26,
      breakInside: 'avoid'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      paddingBottom: 8,
      borderBottom: '2px solid var(--ink)',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13px/1 var(--font-mono)',
      color: 'var(--primary)'
    }
  }, n), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--heading-sm)',
      color: 'var(--ink)'
    }
  }, title)), children);
}
function ReportView({
  app
}) {
  const D = window.CCData;
  const s = D.scores;
  const now = new Date();
  const stamp = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const flagged = D.findings.filter(f => f.status !== 'Verified');
  const g = app.guardrails;
  const sum = window.CCFlow.summary(D.findings, g);
  const trustedCount = Object.values(g.trusted).filter(Boolean).length;
  const [mode, setMode] = useRState(app.reportMode || 'report');
  return /*#__PURE__*/React.createElement("div", {
    id: "cc-report",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 70,
      background: 'var(--surface-bone)',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cc-report-toolbar",
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      padding: '12px 20px',
      background: 'var(--surface-dark)',
      color: 'var(--on-dark)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      font: 'var(--caption-strong)'
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "file-text",
    size: 16
  }), " Citation Verification Report"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: 'var(--radius-full)',
      padding: 3
    }
  }, [['report', 'Structured report'], ['clean', 'Clean copy']].map(([k, lbl]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setMode(k),
    style: {
      height: 28,
      padding: '0 14px',
      borderRadius: 'var(--radius-full)',
      border: 'none',
      cursor: 'pointer',
      font: 'var(--button-sm)',
      background: mode === k ? 'var(--surface-card)' : 'transparent',
      color: mode === k ? 'var(--ink)' : 'var(--on-dark)'
    }
  }, lbl))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => window.print(),
    style: {
      height: 36,
      padding: '0 16px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary)',
      color: 'var(--on-primary)',
      border: 'none',
      cursor: 'pointer',
      font: 'var(--button-sm)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "download",
    size: 15
  }), " Save as PDF"), /*#__PURE__*/React.createElement("button", {
    onClick: () => app.closeReport(),
    style: {
      height: 36,
      padding: '0 14px',
      borderRadius: 'var(--radius-full)',
      background: 'transparent',
      color: 'var(--on-dark)',
      border: '1px solid var(--divider-dark)',
      cursor: 'pointer',
      font: 'var(--button-sm)'
    }
  }, "Close"))), mode === 'clean' ? /*#__PURE__*/React.createElement(CleanCopy, {
    app: app
  }) : /*#__PURE__*/React.createElement("div", {
    className: "cc-report-page",
    style: {
      maxWidth: 820,
      margin: '24px auto',
      background: 'var(--surface-card)',
      boxShadow: 'var(--elev-2)',
      padding: '48px 56px 56px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingBottom: 18,
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: 'var(--verified)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: 'var(--mischar)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: 'var(--fabricated)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 18px/1 var(--font-display)',
      letterSpacing: '-0.4px',
      color: 'var(--ink)'
    }
  }, "Consistency Check")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption)',
      color: 'var(--mute)',
      marginTop: 10
    }
  }, "Legal document verification & AI supervision")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--fabricated)',
      whiteSpace: 'nowrap'
    }
  }, "Confidential \xB7 Privileged"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--charcoal)',
      marginTop: 6
    }
  }, "Generated ", stamp), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)'
    }
  }, "Ref CC-4471-A"))), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--display-md)',
      fontSize: 34,
      letterSpacing: '-0.6px',
      color: 'var(--ink)',
      margin: '24px 0 4px'
    }
  }, "Citation Verification Report"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-md)',
      color: 'var(--body)'
    }
  }, D.matter.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '14px 24px',
      marginTop: 22,
      padding: '18px 0',
      borderTop: '1px solid var(--hairline)',
      borderBottom: '1px solid var(--hairline)'
    }
  }, [['Firm', D.matter.firm], ['Document type', D.matter.docType], ['Claim value', D.matter.claimValue], ['Review status', D.matter.reviewStatus], ['Overall risk', D.matter.overallRisk], ['Recommended action', s.action]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--ash)'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: k === 'Overall risk' ? 'var(--risk-high)' : 'var(--ink)',
      marginTop: 3
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: '14px 16px',
      background: 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)',
      marginBottom: 8
    }
  }, "Firm guardrails applied (pre-run)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px 20px',
      font: 'var(--body-sm)',
      color: 'var(--body)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "Verdict routing:"), " externally-verified \u2192 ", g.routeExtVerified === 'review' ? 'review' : 'pass'), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "Severity:"), " absent citation \u2192 ", g.absent === 'flag' ? 'flag' : 'ignore'), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "Trusted sources:"), " ", trustedCount, " approved \xB7 BAILII excluded"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "Outcome:"), " ", sum.pass, " pass / ", sum.review, " review"))), /*#__PURE__*/React.createElement(RSection, {
    n: "01",
    title: "Executive summary"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--body-md)',
      color: 'var(--body)'
    }
  }, D.matter.summary), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 16
    }
  }, [['Citation health', s.health + ' / 100', s.health < 50 ? 'var(--fabricated)' : s.health < 75 ? 'var(--mischar)' : 'var(--verified)'], ['Confidence', s.confidence + '%', 'var(--ink)'], ['Risk level', s.risk, 'var(--risk-high)'], ['Ready to file', sum.readyToFile, sum.readyToFile === 'Yes' ? 'var(--verified)' : 'var(--fabricated)']].map(([k, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1,
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 24px/1.1 var(--font-display)',
      letterSpacing: '-0.5px',
      color: c,
      marginTop: 4
    }
  }, v))))), /*#__PURE__*/React.createElement(RSection, {
    n: "02",
    title: "Citation health"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, [['Total', s.total, 'var(--ink)'], ['Verified', s.verified, 'var(--verified)'], ['Mischaracterised', s.mischaracterised, 'var(--mischar)'], ['Fabricated', s.fabricated, 'var(--fabricated)']].map(([k, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      borderLeft: `3px solid ${c}`,
      paddingLeft: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 30px/1 var(--font-display)',
      letterSpacing: '-0.5px',
      color: c
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--charcoal)',
      marginTop: 4
    }
  }, k)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 10,
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: s.verified,
      background: 'var(--verified)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: s.mischaracterised,
      background: 'var(--mischar)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: s.fabricated,
      background: 'var(--fabricated)'
    }
  }))), /*#__PURE__*/React.createElement(RSection, {
    n: "03",
    title: "Citation findings"
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      font: 'var(--body-sm)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid var(--hairline-strong)'
    }
  }, ['#', 'Status', 'Authority & issue', 'Conf.', 'Risk', 'Recommended action'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: 'left',
      padding: '8px 8px 8px 0',
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--mute)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, D.findings.map((f, i) => /*#__PURE__*/React.createElement("tr", {
    key: f.id,
    style: {
      borderBottom: '1px solid var(--hairline)',
      breakInside: 'avoid'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 8px 10px 0',
      font: 'var(--code-sm)',
      color: 'var(--ash)',
      verticalAlign: 'top'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 8px 10px 0',
      verticalAlign: 'top'
    }
  }, /*#__PURE__*/React.createElement(RBadge, {
    status: f.status
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 8px 10px 0',
      verticalAlign: 'top'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ink)'
    }
  }, f.citation), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 2
    }
  }, f.legalIssue), (() => {
    const cc = D.corpus[f.id] || {};
    const vl = window.CCVerify(f);
    if (cc.match === 'none') return /*#__PURE__*/React.createElement("a", {
      href: vl[0].url,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        font: 'var(--caption)',
        color: 'var(--fabricated)',
        marginTop: 4,
        textDecoration: 'underline',
        textUnderlineOffset: 2
      }
    }, "Not found \u2014 confirm on ", vl[0].label, " ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 11
    }));
    return /*#__PURE__*/React.createElement("a", {
      href: vl[0].url,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        font: 'var(--caption)',
        color: 'var(--charcoal)',
        marginTop: 4,
        textDecoration: 'underline',
        textUnderlineOffset: 2
      }
    }, "Verify on ", vl[0].label, " ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 11
    }));
  })()), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 8px 10px 0',
      font: 'var(--caption-strong)',
      color: 'var(--ink)',
      verticalAlign: 'top'
    }
  }, f.confidence, "%"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 8px 10px 0',
      font: 'var(--caption-strong)',
      color: RRISK[f.risk],
      verticalAlign: 'top'
    }
  }, f.risk), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 0',
      font: 'var(--body-sm)',
      color: 'var(--body)',
      verticalAlign: 'top'
    }
  }, f.recommendedAction)))))), /*#__PURE__*/React.createElement(RSection, {
    n: "04",
    title: "Flagged authorities \u2014 detail"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, flagged.map(f => {
    const c = D.corpus[f.id] || {};
    return /*#__PURE__*/React.createElement("div", {
      key: f.id,
      style: {
        border: '1px solid var(--hairline)',
        borderLeft: `3px solid ${RSTATUS[f.status].fg}`,
        borderRadius: 'var(--radius-md)',
        padding: '14px 16px',
        breakInside: 'avoid'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--code-sm)',
        color: 'var(--ink)'
      }
    }, f.citation), /*#__PURE__*/React.createElement(RBadge, {
      status: f.status
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--overline)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--mute)'
      }
    }, "As cited"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--body-sm)',
        color: 'var(--body)',
        marginTop: 3
      }
    }, f.extractedProposition)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--overline)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--mute)'
      }
    }, "Authority actually supports"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--body-sm)',
        color: 'var(--body)',
        marginTop: 3
      }
    }, f.actualAuthority || c.holding))), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--body-sm)',
        color: 'var(--charcoal)',
        marginTop: 10,
        paddingTop: 10,
        borderTop: '1px solid var(--hairline)'
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--ink)'
      }
    }, "Action \u2014 "), f.recommendedAction, ".", /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--code-sm)',
        color: 'var(--ash)',
        marginLeft: 6
      }
    }, c.match === 'none' ? 'No source found · ' + (c.searched || []).length + ' searched' : (c.match === 'external' ? 'Open-source match · ' : 'Corpus · ') + (c.source || ''))));
  }))), /*#__PURE__*/React.createElement(RSection, {
    n: "05",
    title: "Audit trail"
  }, D.audit.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      padding: '7px 0',
      borderTop: i === 0 ? 'none' : '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--primary-deep)',
      width: 44,
      flex: '0 0 auto'
    }
  }, e.time), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: 'var(--caption-strong)',
      color: 'var(--ink)'
    }
  }, e.event), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)'
    }
  }, e.actor), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--body-sm)',
      color: 'var(--charcoal)'
    }
  }, e.detail))))), /*#__PURE__*/React.createElement(RSection, {
    n: "06",
    title: "Verification sources & engines"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "Sources \u2014 "), D.dataSources.filter(x => x.status === 'Connected').map(x => x.name).join('; '), ". BAILII / Find Case Law excluded (licence restrictions)."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, "Engines \u2014 "), D.engines.map(e => e.vendor + ' ' + e.name).join('; '), ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      paddingTop: 18,
      borderTop: '2px solid var(--ink)',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 24,
      breakInside: 'avoid'
    }
  }, ['Reviewed by (Partner)', 'Date'].map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 36,
      borderBottom: '1px solid var(--hairline-strong)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption)',
      color: 'var(--mute)',
      marginTop: 6
    }
  }, k)))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption)',
      color: 'var(--ash)',
      marginTop: 22,
      textAlign: 'center'
    }
  }, "Generated by Consistency Check \xB7 AI-assisted verification supervised by a qualified reviewer \xB7 This report is privileged and prepared for the named matter only.")));
}
window.CCReport = ReportView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/Report.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/SourceLibrary.jsx
try { (() => {
/* Source Library — workspace-level visibility over the verification corpus.
   Shows every source document the system checks against, plus real cases
   discovered from internet sources during verification that a lawyer can
   promote into the trusted corpus. Independent of the active matter. */
const {
  Card,
  Button,
  Input,
  FilterChip,
  IconButton
} = window.ConsistencyCheckDesignSystem_77c3a7;
const {
  CCIcon: Icon,
  CCOverline: Overline,
  CCCountUp: CountUp
} = window;
const {
  useState: useS,
  useMemo
} = React;
const JM = window.CCJurMeta || {};
const JUR_DOT = Object.fromEntries(Object.entries(JM).map(([k, v]) => [k, v.dot]));
const JUR_FULL = Object.fromEntries(Object.entries(JM).map(([k, v]) => [k, v.label]));
const JUR_SHORT = Object.fromEntries(Object.entries(JM).map(([k, v]) => [k, v.short]));
const JUR_ORDER = ['ew', 'sc', 'ni', 'pc', 'us'];

/* parallel-citation chip — one case, many report references */
function ParallelRefs({
  refs,
  compact
}) {
  if (!refs || refs.length < 2) return null;
  const extra = refs.length - 1;
  return /*#__PURE__*/React.createElement("span", {
    title: 'Also reported as:\n' + refs.join('\n'),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 18,
      padding: '0 7px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      font: 'var(--caption-strong)',
      fontSize: 11,
      color: 'var(--charcoal)',
      whiteSpace: 'nowrap',
      cursor: 'help',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    size: 10
  }), " +", extra, " ", compact ? 'refs' : 'parallel ref' + (extra === 1 ? '' : 's'));
}
function Pill({
  children,
  dot,
  tone
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 22,
      padding: '0 9px',
      borderRadius: 'var(--radius-full)',
      background: tone === 'plain' ? 'transparent' : 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      font: 'var(--caption-strong)',
      fontSize: 12,
      color: 'var(--charcoal)',
      whiteSpace: 'nowrap'
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: dot,
      flex: '0 0 auto'
    }
  }), children);
}
function verifyHref(item) {
  const cl = encodeURIComponent(item.case + ' ' + item.citation);
  if (item.jur === 'us') return 'https://www.courtlistener.com/?q=' + cl;
  return 'https://scholar.google.com/scholar?q=' + encodeURIComponent('"' + item.case + '" ' + item.citation);
}

/* ---- KPI ---- */
function Stat({
  icon,
  label,
  value,
  sub,
  hue,
  fmt
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--elev-card)',
      padding: '15px 17px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 7,
      background: 'var(--surface-bone)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: hue || 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 14
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 27px/1 var(--font-display)',
      color: hue || 'var(--ink)',
      marginTop: 11,
      letterSpacing: '-0.5px'
    }
  }, /*#__PURE__*/React.createElement(CountUp, {
    value: value,
    format: fmt || (v => v)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 4
    }
  }, sub));
}

/* ---- discovered card ---- */
function DiscoveredCard({
  d,
  state,
  onAdd,
  onDismiss
}) {
  const added = state === 'added';
  const dismissed = state === 'dismissed';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid ' + (added ? 'var(--verified)' : 'var(--hairline-strong)'),
      borderRadius: 'var(--radius-md)',
      background: added ? 'var(--verified-bg)' : 'var(--surface-card)',
      padding: '16px 18px',
      opacity: dismissed ? 0.55 : 1,
      transition: 'background 200ms ease, border-color 200ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--heading-sm)',
      fontSize: 15,
      color: 'var(--ink)'
    }
  }, d.case), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 3,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--charcoal)'
    }
  }, d.citation), /*#__PURE__*/React.createElement(ParallelRefs, {
    refs: (window.CCData.parallelLib || {})[d.id],
    compact: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    dot: JUR_DOT[d.jur]
  }, JUR_FULL[d.jur] || d.jur), /*#__PURE__*/React.createElement(Pill, null, d.area), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, d.court)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 10,
      font: 'var(--body-sm)',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "radar",
    size: 14,
    style: {
      color: 'var(--primary-deep)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", null, "Found via ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--ink)'
    }
  }, d.foundVia), " during ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink)'
    }
  }, d.matter), " \xB7 ", d.confidence, "% confidence")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 8,
      maxWidth: 620
    }
  }, d.note)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'stretch',
      flex: '0 0 auto',
      width: 188
    }
  }, added ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      height: 36,
      padding: '0 12px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-card)',
      border: '1px solid var(--verified)',
      font: 'var(--button-sm)',
      color: 'var(--verified)',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 15
  }), " Added to corpus") : /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      height: 36,
      padding: '0 12px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-dark)',
      color: 'var(--on-dark)',
      border: 'none',
      cursor: 'pointer',
      font: 'var(--button-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "database-zap",
    size: 15
  }), " Add to source database"), /*#__PURE__*/React.createElement("a", {
    href: verifyHref(d),
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      height: 34,
      padding: '0 12px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-card)',
      border: '1px solid var(--hairline-strong)',
      font: 'var(--button-sm)',
      color: 'var(--ink)',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external-link",
    size: 14
  }), " Verify source"), !added && !dismissed && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    style: {
      height: 30,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      font: 'var(--button-sm)',
      color: 'var(--mute)'
    }
  }, "Dismiss"))));
}

/* ---- add-from-internet modal ---- */
const ADDABLE = [{
  case: 'Cavendish Square Holding BV v Makdessi',
  citation: '[2015] UKSC 67',
  court: 'UK Supreme Court',
  jur: 'ew',
  area: 'Contract',
  key: 'cavendish|makdessi'
}, {
  case: 'AIB Group (UK) plc v Mark Redler & Co',
  citation: '[2014] UKSC 58',
  court: 'UK Supreme Court',
  jur: 'ew',
  area: 'Negligence & duty',
  key: 'aib|redler'
}, {
  case: 'Sempra Metals Ltd v IRC',
  citation: '[2007] UKHL 34',
  court: 'House of Lords',
  jur: 'ew',
  area: 'Restitution',
  key: 'sempra'
}];
function AddSourceModal({
  open,
  onClose,
  onAdd
}) {
  const [q, setQ] = useS('');
  const [phase, setPhase] = useS('idle'); // idle | searching | found | notfound
  const [hit, setHit] = useS(null);
  if (!open) return null;
  const run = text => {
    const query = (text != null ? text : q).trim();
    if (!query) return;
    setPhase('searching');
    setHit(null);
    setTimeout(() => {
      const m = ADDABLE.find(a => new RegExp(a.key, 'i').test(query) || query.toLowerCase().includes(a.case.toLowerCase().split(' v ')[0].toLowerCase()));
      if (m) {
        setHit(m);
        setPhase('found');
      } else {
        setPhase('notfound');
      }
    }, 850);
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(32,32,32,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      animation: 'ccFade 140ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(600px, 100%)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--elev-pop)',
      animation: 'ccPop 160ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      padding: '20px 24px',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--mute)'
    }
  }, "Add from internet source"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--heading-md)',
      color: 'var(--ink)',
      marginTop: 4
    }
  }, "Find & add an authority")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--surface-bone)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "md",
    placeholder: "Paste a citation or case name\u2026",
    value: q,
    onChange: e => {
      setQ(e.target.value);
      setPhase('idle');
    },
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => run(),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "globe",
      size: 15
    })
  }, "Search sources")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, "Try:"), ADDABLE.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.case,
    onClick: () => {
      setQ(a.case);
      run(a.case);
    },
    style: {
      height: 28,
      padding: '0 11px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-bone)',
      border: '1px solid var(--hairline)',
      font: 'var(--button-sm)',
      color: 'var(--charcoal)',
      cursor: 'pointer'
    }
  }, a.case.split(' v ')[0]))), phase === 'searching' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '16px 18px',
      background: 'var(--surface-bone)',
      borderRadius: 'var(--radius-md)',
      font: 'var(--body-sm)',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      border: '2px solid var(--hairline-strong)',
      borderTopColor: 'var(--primary)',
      borderRadius: '50%',
      animation: 'ccSpin 700ms linear infinite',
      flex: '0 0 auto'
    }
  }), "Searching CourtListener, legislation.gov.uk & open web\u2026"), phase === 'found' && hit && /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--verified)',
      background: 'var(--verified-bg)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 15,
    style: {
      color: 'var(--verified)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--verified)'
    }
  }, "Verified \xB7 found in connected sources")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--heading-sm)',
      fontSize: 15,
      color: 'var(--ink)'
    }
  }, hit.case), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--charcoal)'
    }
  }, hit.citation)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    dot: JUR_DOT[hit.jur]
  }, JUR_FULL[hit.jur]), /*#__PURE__*/React.createElement(Pill, null, hit.area), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, hit.court)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "database-zap",
      size: 15
    }),
    onClick: () => {
      onAdd(hit);
      onClose();
    }
  }, "Add to source database"))), phase === 'notfound' && /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      background: 'var(--fabricated-bg)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search-x",
    size: 15,
    style: {
      color: 'var(--fabricated)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--ink)'
    }
  }, "Not found in any connected source")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)',
      marginTop: 6
    }
  }, "Consistency Check will not add an authority it cannot verify. Refine the citation, or check it against the public record before relying on it.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    size: 14,
    style: {
      marginTop: 1,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", null, "Only authorities confirmed against a connected source can be promoted \u2014 the corpus never holds an unverified case.")))));
}
function SourceLibrary({
  app
}) {
  const base = window.CCData.sourceLibrary;
  const discovered = window.CCData.discovered;
  const connected = window.CCData.dataSources.filter(s => s.status === 'Connected').length;
  const [discState, setDiscState] = useS({}); // id -> 'added' | 'dismissed'
  const [custom, setCustom] = useS([]); // promoted authorities (from discovered or modal)
  const [addOpen, setAddOpen] = useS(false);
  const [query, setQuery] = useS('');
  const [area, setArea] = useS('All');
  const [jurF, setJurF] = useS('All');
  const promote = (item, label) => {
    setCustom(c => c.find(x => x.citation === item.citation) ? c : [{
      ...item,
      id: item.id || 'add-' + Date.now(),
      addedByUser: true
    }, ...c]);
    app.toast(item.case + ' added to the source database', {
      icon: 'database-zap',
      hue: 'var(--verified)'
    });
  };
  const addDiscovered = d => {
    setDiscState(s => ({
      ...s,
      [d.id]: 'added'
    }));
    promote(d);
  };
  const dismiss = d => setDiscState(s => ({
    ...s,
    [d.id]: 'dismissed'
  }));
  const corpus = useMemo(() => [...custom, ...base], [custom, base]);
  const areas = useMemo(() => ['All', ...Array.from(new Set(base.map(x => x.area)))], [base]);
  const jurs = useMemo(() => JUR_ORDER.filter(j => corpus.some(x => x.jur === j)), [corpus]);
  const pendingCount = discovered.filter(d => !discState[d.id]).length;
  const rows = corpus.filter(x => (area === 'All' || x.area === area) && (jurF === 'All' || x.jur === jurF) && (x.case.toLowerCase().includes(query.toLowerCase()) || x.citation.toLowerCase().includes(query.toLowerCase()) || x.area.toLowerCase().includes(query.toLowerCase())));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Overline, null, "Workspace \xB7 source documents"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '6px 0 0',
      font: 'var(--display-md)',
      letterSpacing: '-0.5px',
      color: 'var(--ink)'
    }
  }, "Source library"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 4
    }
  }, "Every authority the verifier checks against \u2014 and new cases found on the open web, ready to promote into the trusted corpus.")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 16
    }),
    onClick: () => setAddOpen(true)
  }, "Add from internet source")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    icon: "library",
    label: "Indexed authorities",
    value: corpus.length,
    sub: "in the trusted corpus",
    hue: "var(--ink)"
  }), /*#__PURE__*/React.createElement(Stat, {
    icon: "radar",
    label: "Discovered \xB7 pending",
    value: pendingCount,
    sub: "found on the open web",
    hue: pendingCount ? 'var(--mischar)' : 'var(--verified)'
  }), /*#__PURE__*/React.createElement(Stat, {
    icon: "scale",
    label: "Jurisdictions",
    value: jurs.length,
    sub: jurs.map(j => (JM[j] || {}).code || j).join(' · ') + ' (separate)',
    hue: "var(--charcoal)"
  }), /*#__PURE__*/React.createElement(Stat, {
    icon: "plug",
    label: "Connected sources",
    value: connected,
    sub: "live verification sources",
    hue: "var(--verified)"
  })), /*#__PURE__*/React.createElement(Card, {
    pad: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      padding: '16px 20px',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "radar",
    size: 17,
    style: {
      color: 'var(--primary-deep)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--heading-sm)',
      fontSize: 15,
      color: 'var(--ink)'
    }
  }, "Discovered from internet sources"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 22,
      padding: '0 9px',
      borderRadius: 'var(--radius-full)',
      background: pendingCount ? 'var(--mischar-bg)' : 'var(--verified-bg)',
      font: 'var(--caption-strong)',
      fontSize: 12,
      color: pendingCount ? 'var(--mischar)' : 'var(--verified)'
    }
  }, pendingCount, " pending")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, "Real cases surfaced during verification \u2014 outside the corpus")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, discovered.map(d => /*#__PURE__*/React.createElement(DiscoveredCard, {
    key: d.id,
    d: d,
    state: discState[d.id],
    onAdd: () => addDiscovered(d),
    onDismiss: () => dismiss(d)
  })))), /*#__PURE__*/React.createElement(Card, {
    pad: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: '14px 20px',
      borderBottom: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, areas.map(a => /*#__PURE__*/React.createElement(FilterChip, {
    key: a,
    active: area === a,
    onClick: () => setArea(a)
  }, a))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 230
    }
  }, /*#__PURE__*/React.createElement(Input, {
    size: "sm",
    placeholder: "Search the corpus\u2026",
    value: query,
    onChange: e => setQuery(e.target.value),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)',
      marginRight: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "scale",
    size: 13
  }), " Jurisdiction"), /*#__PURE__*/React.createElement(FilterChip, {
    active: jurF === 'All',
    onClick: () => setJurF('All')
  }, "All"), jurs.map(j => /*#__PURE__*/React.createElement(FilterChip, {
    key: j,
    active: jurF === j,
    onClick: () => setJurF(j)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: JUR_DOT[j]
    }
  }), JUR_FULL[j]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 150px 150px 44px',
      gap: 0,
      padding: '10px 20px',
      borderBottom: '1px solid var(--hairline)',
      background: 'var(--surface-bone)'
    }
  }, ['Authority', 'Court', 'Jurisdiction · area', ''].map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, h))), /*#__PURE__*/React.createElement("div", null, rows.map((x, i) => /*#__PURE__*/React.createElement("a", {
    key: x.id,
    href: verifyHref(x),
    target: "_blank",
    rel: "noopener noreferrer",
    title: "Open the public record in a new tab",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 150px 150px 44px',
      alignItems: 'center',
      gap: 0,
      padding: '13px 20px',
      textDecoration: 'none',
      borderTop: i === 0 ? 'none' : '1px solid var(--hairline)',
      background: x.addedByUser ? 'var(--verified-bg)' : 'transparent'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = x.addedByUser ? 'var(--verified-bg)' : 'var(--canvas)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = x.addedByUser ? 'var(--verified-bg)' : 'transparent';
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      paddingRight: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--ink)'
    }
  }, x.case), x.addedByUser && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      font: 'var(--caption)',
      color: 'var(--verified)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  }), " added by you")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      minWidth: 0,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--mute)'
    }
  }, x.citation), /*#__PURE__*/React.createElement(ParallelRefs, {
    refs: (window.CCData.parallelLib || {})[x.id],
    compact: true
  })), x.origin && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      font: 'var(--caption)',
      color: 'var(--ash)',
      marginTop: 2
    }
  }, x.origin))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--body)'
    }
  }, x.court), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    dot: JUR_DOT[x.jur]
  }, (JM[x.jur] || {}).code || x.jur), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, x.area)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external-link",
    size: 15,
    style: {
      color: 'var(--stone)'
    }
  })))), rows.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px 20px',
      textAlign: 'center',
      font: 'var(--body-sm)',
      color: 'var(--mute)'
    }
  }, "No authorities match.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '11px 20px',
      borderTop: '1px solid var(--hairline)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      font: 'var(--code-sm)',
      color: 'var(--ash)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, "Each authority resolves across all its report series \u2014 paste any one citation and the verifier matches the same case. Showing ", rows.length, " of ", corpus.length, " indexed authorities."))), /*#__PURE__*/React.createElement(AddSourceModal, {
    open: addOpen,
    onClose: () => setAddOpen(false),
    onAdd: hit => promote(hit)
  }));
}
window.CCSourceLibrary = SourceLibrary;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/SourceLibrary.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/Verification.jsx
try { (() => {
/* Verification tab — pre-run firm guardrails + the live two-stage decision flow. */
const {
  Card
} = window.ConsistencyCheckDesignSystem_77c3a7;
const {
  CCIcon: VIcon,
  CCOverline: VOverline
} = window;
function Segmented({
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 3,
      background: 'rgba(255,255,255,0.06)',
      borderRadius: 'var(--radius-full)',
      border: '1px solid rgba(255,255,255,0.1)'
    }
  }, options.map(o => {
    const active = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      onClick: () => onChange(o.value),
      style: {
        height: 28,
        padding: '0 12px',
        borderRadius: 'var(--radius-full)',
        border: 'none',
        cursor: 'pointer',
        font: 'var(--button-sm)',
        fontSize: 13,
        whiteSpace: 'nowrap',
        background: active ? 'var(--primary)' : 'transparent',
        color: active ? 'var(--on-primary)' : 'var(--on-dark-mute)',
        transition: 'background 120ms ease, color 120ms ease'
      }
    }, o.label);
  }));
}
function Guardrails({
  app
}) {
  const g = app.guardrails;
  const sources = window.CCData.dataSources.filter(s => s.status === 'Connected' && s.type !== 'Local Corpus');
  return /*#__PURE__*/React.createElement(Card, {
    tone: "dark",
    pad: 0,
    style: {
      border: '1px dashed rgba(255,255,255,0.22)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 22px',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement(VIcon, {
    name: "sliders-horizontal",
    size: 16,
    style: {
      color: 'var(--hero-glow)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--on-dark)',
      whiteSpace: 'nowrap'
    }
  }, "Pre-run \xB7 firm guardrails"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--on-dark-mute)'
    }
  }, "\u2014 set once, applied to every citation in this matter"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 11px',
      borderRadius: 'var(--radius-full)',
      background: 'rgba(234,40,4,0.16)',
      color: 'var(--hero-glow)',
      font: 'var(--caption-strong)',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(VIcon, {
    name: "shield",
    size: 13
  }), " Base posture \xB7 conservative")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 22px',
      borderRight: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--on-dark)'
    }
  }, "Verdict routing"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--on-dark-mute)',
      margin: '4px 0 12px'
    }
  }, "Externally-verified citations"), /*#__PURE__*/React.createElement(Segmented, {
    value: g.routeExtVerified,
    onChange: v => app.setGuardrail('routeExtVerified', v),
    options: [{
      value: 'pass',
      label: 'Pass'
    }, {
      value: 'review',
      label: 'Route to review'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 22px',
      borderRight: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--on-dark)'
    }
  }, "Severity threshold"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--on-dark-mute)',
      margin: '4px 0 12px'
    }
  }, "Citation absent from all sources"), /*#__PURE__*/React.createElement(Segmented, {
    value: g.absent,
    onChange: v => app.setGuardrail('absent', v),
    options: [{
      value: 'flag',
      label: 'Flag'
    }, {
      value: 'ignore',
      label: 'Ignore'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--on-dark)'
    }
  }, "Jurisdiction policy"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--on-dark-mute)',
      margin: '4px 0 12px'
    }
  }, "Out-of-jurisdiction authorities \xB7 matter is E&W"), /*#__PURE__*/React.createElement(Segmented, {
    value: g.jurisdiction,
    onChange: v => app.setGuardrail('jurisdiction', v),
    options: [{
      value: 'flag',
      label: 'Flag'
    }, {
      value: 'persuasive',
      label: 'Persuasive'
    }, {
      value: 'allow',
      label: 'Allow'
    }]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 22px',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: 'var(--on-dark)'
    }
  }, "Source trust list"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--on-dark-mute)',
      margin: '4px 0 12px'
    }
  }, "Approved external sources \u2014 toggle which jurisdictions the engine may rely on"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, sources.map(s => {
    const on = g.trusted[s.name];
    const short = s.name.replace(' / CELLAR SPARQL', '').replace(' Live Search', '');
    return /*#__PURE__*/React.createElement("button", {
      key: s.name,
      onClick: () => app.toggleTrusted(s.name),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        height: 26,
        padding: '0 10px',
        borderRadius: 'var(--radius-full)',
        cursor: 'pointer',
        font: 'var(--caption-strong)',
        border: `1px solid ${on ? 'var(--verified)' : 'rgba(255,255,255,0.16)'}`,
        background: on ? 'rgba(43,154,102,0.18)' : 'transparent',
        color: on ? '#6ee7a8' : 'var(--on-dark-mute)'
      }
    }, /*#__PURE__*/React.createElement(VIcon, {
      name: on ? 'check' : 'plus',
      size: 12
    }), short);
  }))));
}

/* ---- Flow nodes ---- */
function Node({
  title,
  sub,
  count,
  tone,
  onClick,
  dark
}) {
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: !clickable,
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      cursor: clickable ? 'pointer' : 'default',
      background: dark ? 'var(--surface-dark)' : 'var(--surface-card)',
      border: `1px solid ${tone || 'var(--hairline)'}`,
      borderLeft: tone ? `3px solid ${tone}` : '1px solid var(--hairline)',
      boxShadow: 'var(--elev-card)',
      transition: 'box-shadow 120ms ease, transform 120ms ease'
    },
    onMouseEnter: e => {
      if (clickable) {
        e.currentTarget.style.boxShadow = 'var(--elev-2)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }
    },
    onMouseLeave: e => {
      if (clickable) {
        e.currentTarget.style.boxShadow = 'var(--elev-card)';
        e.currentTarget.style.transform = 'translateY(0)';
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      lineHeight: 1.3,
      color: dark ? 'var(--on-dark)' : 'var(--ink)'
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      lineHeight: 1.35,
      color: dark ? 'var(--on-dark-mute)' : 'var(--mute)',
      marginTop: 3
    }
  }, sub)), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 18px/1 var(--font-display)',
      color: tone || (dark ? 'var(--on-dark)' : 'var(--ink)'),
      flex: '0 0 auto'
    }
  }, count)));
}
function Connector({
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '6px 0'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)',
      marginBottom: 2
    }
  }, label), /*#__PURE__*/React.createElement(VIcon, {
    name: "arrow-down",
    size: 16,
    style: {
      color: 'var(--stone)'
    }
  }));
}
function TwoAxisMatrix({
  app
}) {
  const F = window.CCData.findings;
  const cols = [{
    key: 'absent',
    label: 'Not found',
    x: 17
  }, {
    key: 'confirmed-external',
    label: 'Confirmed · open web',
    x: 50
  }, {
    key: 'confirmed-internal',
    label: 'Confirmed · corpus',
    x: 83
  }];
  const H = 240,
    padB = 34,
    plotH = H - 14 - padB;
  const colX = ex => (cols.find(c => c.key === ex) || cols[0]).x;
  const hueOf = s => s === 'Verified' ? 'var(--verified)' : s === 'Mischaracterised' ? 'var(--mischar)' : 'var(--fabricated)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: H,
      marginTop: 8,
      borderLeft: '1px solid var(--hairline-strong)',
      borderBottom: '1px solid var(--hairline-strong)'
    }
  }, [0, 25, 50, 75, 100].map(v => /*#__PURE__*/React.createElement("div", {
    key: v,
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: padB + plotH * (v / 100),
      height: 1,
      background: 'var(--hairline-soft)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -26,
      top: -7,
      font: 'var(--code-sm)',
      color: 'var(--ash)'
    }
  }, v))), F.map(f => {
    const a = window.CCData.analysis[f.id] || {};
    const fid = a.fidelity;
    const bottom = padB + plotH * ((fid == null ? 4 : fid) / 100);
    const jx = (parseInt(f.id.slice(-2), 10) % 5 - 2) * 10;
    return /*#__PURE__*/React.createElement("button", {
      key: f.id,
      onClick: () => app.goToFilter(f.status),
      title: f.citation + ' — ' + (fid == null ? 'absent (no fidelity axis)' : fid + '% fidelity'),
      className: "cc-reveal",
      style: {
        position: 'absolute',
        left: 'calc(' + colX(a.existence) + '% + ' + jx + 'px)',
        bottom,
        transform: 'translate(-50%, 50%)',
        width: 14,
        height: 14,
        borderRadius: '50%',
        border: '2px solid var(--surface-card)',
        background: hueOf(f.status),
        cursor: 'pointer',
        boxShadow: 'var(--elev-card)',
        padding: 0
      }
    });
  }), cols.map(c => /*#__PURE__*/React.createElement("span", {
    key: c.key,
    style: {
      position: 'absolute',
      left: c.x + '%',
      bottom: -26,
      transform: 'translateX(-50%)',
      font: 'var(--code-sm)',
      color: 'var(--charcoal)',
      whiteSpace: 'nowrap'
    }
  }, c.label)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -34,
      top: '50%',
      transform: 'translateY(-50%) rotate(-90deg)',
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)',
      whiteSpace: 'nowrap'
    }
  }, "Fidelity %")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginTop: 30
    }
  }, ['Verified', 'Mischaracterised', 'Fabricated'].map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: 'var(--body-sm)',
      color: 'var(--charcoal)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: hueOf(s)
    }
  }), window.CCVerdictLabel(s)))));
}
function Verification({
  app
}) {
  const F = window.CCData.findings;
  const sum = window.CCFlow.summary(F, app.guardrails);
  const go = status => app.goToFilter(status);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(VOverline, null, "Two-stage verification"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '6px 0 0',
      font: 'var(--display-md)',
      letterSpacing: '-0.5px',
      color: 'var(--ink)',
      whiteSpace: 'nowrap'
    }
  }, "Verification flow")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 32,
      padding: '0 13px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--verified-bg)',
      color: 'var(--verified)',
      font: 'var(--caption-strong)'
    }
  }, /*#__PURE__*/React.createElement(VIcon, {
    name: "check",
    size: 14
  }), sum.pass, " pass"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 32,
      padding: '0 13px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--risk-high-bg)',
      color: 'var(--risk-high)',
      font: 'var(--caption-strong)'
    }
  }, /*#__PURE__*/React.createElement(VIcon, {
    name: "flag",
    size: 14
  }), sum.review, " review"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 32,
      padding: '0 13px',
      borderRadius: 'var(--radius-full)',
      background: sum.readyToFile === 'Yes' ? 'var(--verified-bg)' : 'var(--fabricated-bg)',
      color: sum.readyToFile === 'Yes' ? 'var(--verified)' : 'var(--fabricated)',
      font: 'var(--caption-strong)'
    }
  }, /*#__PURE__*/React.createElement(VIcon, {
    name: sum.readyToFile === 'Yes' ? 'unlock' : 'lock',
    size: 14
  }), "Ready to file \xB7 ", sum.readyToFile))), /*#__PURE__*/React.createElement(Guardrails, {
    app: app
  }), /*#__PURE__*/React.createElement(FlowDiagram, {
    app: app,
    sum: sum
  }), /*#__PURE__*/React.createElement(Card, {
    pad: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(VOverline, null, "Decomposition"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '4px 0 0',
      font: 'var(--heading-sm)',
      color: 'var(--ink)'
    }
  }, "Existence \xD7 Fidelity")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      maxWidth: 380,
      textAlign: 'right'
    }
  }, "Existence is near-deterministic; fidelity is a model judgment. Plotting both stops a single \u201C%\u201D from overstating the easy axis and understating the hard one.")), /*#__PURE__*/React.createElement(TwoAxisMatrix, {
    app: app
  })));
}
window.CCVerification = Verification;

/* ---- Reusable two-stage flow diagram (used in Verification tab + Insights deepdive) ---- */
function FlowDiagram({
  app,
  sum,
  bare
}) {
  const F = window.CCData.findings;
  const s = sum || window.CCFlow.summary(F, app.guardrails);
  const go = status => app.goToFilter(status);
  const inner = /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Node, {
    title: "Lawyer submits skeleton argument",
    sub: "Crestholm Dynamics plc v Veltros Industries Inc",
    dark: true
  }), /*#__PURE__*/React.createElement(Connector, null), /*#__PURE__*/React.createElement(Node, {
    title: "Extract citations from prose",
    sub: "claim \xB7 citation \xB7 source pointer",
    count: s.total,
    dark: true
  }), /*#__PURE__*/React.createElement(Connector, {
    label: "each citation"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-lg)',
      padding: 16,
      background: 'var(--surface-bone)'
    }
  }, /*#__PURE__*/React.createElement(VOverline, {
    style: {
      marginBottom: 10
    }
  }, "Stage 1 \xB7 internal check"), /*#__PURE__*/React.createElement(Node, {
    title: "Found in trusted corpus?",
    sub: "deterministic match against the 57-authority internal corpus"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--verified)',
      textAlign: 'center',
      marginBottom: 6
    }
  }, "yes \xB7 ", s.stage1Found, " found internally"), /*#__PURE__*/React.createElement(Node, {
    title: "Claim matches the holding?",
    sub: "compare cited proposition with the real holding"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Node, {
    title: "Verified",
    sub: "exists + correct",
    count: s.internalVerified,
    tone: "var(--verified)",
    onClick: () => go('Verified')
  }), /*#__PURE__*/React.createElement(Node, {
    title: "Real, misused",
    sub: "exists, described wrong",
    count: s.internalMisused,
    tone: "var(--mischar)",
    onClick: () => go('Mischaracterised')
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--charcoal)',
      textAlign: 'center',
      marginBottom: 6
    }
  }, "no \xB7 ", s.stage1Escalate, " escalate"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px dashed var(--hairline-strong)',
      borderRadius: 'var(--radius-md)',
      padding: 12
    }
  }, /*#__PURE__*/React.createElement(VOverline, {
    style: {
      marginBottom: 8
    }
  }, "Stage 2 \xB7 external check"), /*#__PURE__*/React.createElement(Node, {
    title: "Found externally?",
    sub: "authoritative / approved open sources"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--verified)',
      textAlign: 'center',
      marginBottom: 6
    }
  }, "yes \xB7 ", s.stage2Found), /*#__PURE__*/React.createElement(Node, {
    title: "Externally verified",
    sub: "exists + correct",
    count: s.extVerified,
    tone: "var(--verified)",
    onClick: () => go('Verified')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  }), /*#__PURE__*/React.createElement(Node, {
    title: "Externally real, misused",
    sub: "exists, described wrong",
    count: s.extMisused,
    tone: "var(--mischar)",
    onClick: () => go('Mischaracterised')
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--fabricated)',
      textAlign: 'center',
      marginBottom: 6
    }
  }, "no \xB7 ", s.stage2Absent), /*#__PURE__*/React.createElement(Node, {
    title: "Not found",
    sub: "suspected fabrication \xB7 partner review",
    count: s.fabricated,
    tone: "var(--fabricated)",
    onClick: () => go('Fabricated')
  }))))))), /*#__PURE__*/React.createElement(Connector, {
    label: "apply firm guardrails"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Node, {
    title: "Passes",
    sub: "no action required before filing",
    count: s.pass,
    tone: "var(--verified)",
    onClick: () => app.goTo('Citation Checker')
  }), /*#__PURE__*/React.createElement(Node, {
    title: "Review needed",
    sub: "flagged for partner attention",
    count: s.review,
    tone: "var(--risk-high)",
    onClick: () => app.goTo('Citation Checker')
  })), /*#__PURE__*/React.createElement(Connector, null), /*#__PURE__*/React.createElement(Node, {
    title: "Structured report",
    sub: "verdict \xB7 evidence \xB7 source pointer \xB7 reason for flag",
    dark: true,
    onClick: () => app.openReport()
  }), /*#__PURE__*/React.createElement(Connector, null), /*#__PURE__*/React.createElement(Node, {
    title: "Lawyer reviews & signs off",
    sub: "final authority \xB7 can overrule any verdict",
    tone: "var(--primary)",
    onClick: () => app.goTo('Document')
  }));
  return bare ? inner : /*#__PURE__*/React.createElement(Card, {
    pad: 24
  }, inner);
}
window.CCFlowDiagram = FlowDiagram;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/Verification.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/data.js
try { (() => {
/* Consistency Check — review of the Crestholm v Veltros skeleton argument.
   Citation evidence is grounded in the provided UK/Commonwealth case corpus
   (hard_coding/main_data) — court, neutral citation, bench and holding are
   drawn from the actual source files. */
window.CCData = {
  matter: {
    name: 'Crestholm Dynamics plc v Veltros Industries Inc',
    firm: 'Alderton & Marsh LLP',
    docType: 'Skeleton Argument',
    claimValue: '£47m',
    reviewStatus: 'Partner Review Required',
    overallRisk: 'High',
    summary: 'The document contains 12 legal authorities. 3 appear fabricated, 2 appear mischaracterised, and 7 are verified. High-risk citations should be reviewed before filing or circulation.'
  },
  scores: {
    total: 12,
    verified: 7,
    mischaracterised: 2,
    fabricated: 3,
    health: 58,
    confidence: 87,
    risk: 'High',
    action: 'Partner review before filing'
  },
  findings: [{
    id: 'cit-001',
    status: 'Verified',
    citation: 'Lumley v Gye (1853) 2 E & B 216',
    legalIssue: 'Tortious interference with contractual relations',
    confidence: 96,
    risk: 'Low',
    recommendedAction: 'No action required',
    explanation: 'The authority exists and is appropriately used for the proposition that intentional interference with contractual relations can give rise to liability.'
  }, {
    id: 'cit-002',
    status: 'Verified',
    citation: 'OBG Ltd v Allan [2007] UKHL 21',
    legalIssue: 'Economic torts and unlawful means',
    confidence: 94,
    risk: 'Low',
    recommendedAction: 'No action required',
    explanation: 'The citation exists and is relevant to the modern structure of economic tort liability.'
  }, {
    id: 'cit-003',
    status: 'Verified',
    citation: 'DC Thomson & Co Ltd v Deakin [1952] Ch 646',
    legalIssue: 'Inducing breach of contract',
    confidence: 91,
    risk: 'Low',
    recommendedAction: 'No action required',
    explanation: 'The authority exists and supports the discussion of inducement and knowledge in contractual interference.'
  }, {
    id: 'cit-004',
    status: 'Verified',
    citation: 'Hadley v Baxendale (1854) 9 Ex 341',
    legalIssue: 'Remoteness of contractual damages',
    confidence: 97,
    risk: 'Low',
    recommendedAction: 'No action required',
    explanation: 'The authority exists and is correctly used in relation to foreseeability and remoteness of loss.'
  }, {
    id: 'cit-005',
    status: 'Verified',
    citation: 'The Achilleas [2008] UKHL 48',
    legalIssue: 'Assumption of responsibility and remoteness',
    confidence: 92,
    risk: 'Low',
    recommendedAction: 'Review wording only',
    explanation: 'The authority exists. The application is broadly correct, although the drafting should avoid overstating the assumption-of-responsibility principle.'
  }, {
    id: 'cit-006',
    status: 'Verified',
    citation: 'American Cyanamid Co v Ethicon Ltd [1975] AC 396',
    legalIssue: 'Interim injunction test',
    confidence: 95,
    risk: 'Low',
    recommendedAction: 'No action required',
    explanation: 'The authority exists and is correctly used for the standard approach to interim injunctive relief.'
  }, {
    id: 'cit-007',
    status: 'Verified',
    citation: 'Series 5 Software Ltd v Clarke [1996] 1 All ER 853',
    legalIssue: 'Without-notice injunctions and urgency',
    confidence: 84,
    risk: 'Medium',
    recommendedAction: 'Check quotation and procedural context',
    explanation: 'The authority appears real and relevant, but it is outside the local case corpus and should be manually checked before filing.'
  }, {
    id: 'cit-008',
    status: 'Mischaracterised',
    citation: 'Anglia Television Ltd v Reed [1972] 1 QB 60',
    legalIssue: 'Reliance damages versus expectation damages',
    confidence: 88,
    risk: 'High',
    recommendedAction: 'Revise legal proposition',
    explanation: 'The case supports reliance loss, not a broad claim for expectation damages or lost profits. The skeleton appears to use the authority for a stronger proposition than it supports.',
    extractedProposition: 'The skeleton cites Anglia Television as authority for recovering expectation damages for lost profits.',
    actualAuthority: 'The case is primarily authority for reliance loss where expectation loss is difficult to prove.'
  }, {
    id: 'cit-009',
    status: 'Mischaracterised',
    citation: 'Wrotham Park Estate Co Ltd v Parkside Homes Ltd [1974] 1 WLR 798',
    legalIssue: 'Negotiating damages',
    confidence: 86,
    risk: 'High',
    recommendedAction: 'Clarify damages theory',
    explanation: 'The authority concerns negotiating damages, not ordinary lost-profit expectation damages. The current drafting risks misleading the court.',
    extractedProposition: 'Cited as supporting ordinary lost-profit expectation damages.',
    actualAuthority: 'Concerns negotiating (Wrotham Park) damages — a distinct measure.'
  }, {
    id: 'cit-010',
    status: 'Fabricated',
    citation: 'Fairfax International Logistics v Brennan Holdings [2019] EWHC 1847 (Comm)',
    legalIssue: 'Commercial logistics interference',
    confidence: 93,
    risk: 'Critical',
    recommendedAction: 'Remove or replace citation',
    explanation: 'No reliable match was found in the available corpus or open legal sources. The case name appears tailored to the factual scenario and should not be relied upon.',
    extractedProposition: 'Cited as direct authority for interference in commercial logistics arrangements.',
    actualAuthority: 'Not found in any source checked. Cannot assert it exists nowhere — only that it is absent from every source available here.'
  }, {
    id: 'cit-011',
    status: 'Fabricated',
    citation: 'Stonegate Capital Partners v Redwood Procurement [2021] EWHC 3312 (Ch)',
    legalIssue: 'Procurement and investment loss',
    confidence: 91,
    risk: 'Critical',
    recommendedAction: 'Remove or replace citation',
    explanation: 'The citation could not be verified. The party names and subject matter appear synthetic and closely mirror the dispute.',
    extractedProposition: 'Cited for recovery of procurement and investment losses.',
    actualAuthority: 'Not found in any source checked; the party names appear synthetic.'
  }, {
    id: 'cit-012',
    status: 'Fabricated',
    citation: 'Pemberton Aerospace Systems v Delta Global Ventures [2023] EWHC 892 (TCC)',
    legalIssue: 'Aerospace supply chain dispute',
    confidence: 94,
    risk: 'Critical',
    recommendedAction: 'Remove or replace citation',
    explanation: 'No reliable authority was found. Absence is bounded to the four sources this system can reach (corpus, CourtListener, legislation.gov.uk, EUR-Lex, Perplexity); non-existence cannot be asserted beyond them. Treat as suspected fabrication — partner verification required.',
    extractedProposition: 'Cited as authority on aerospace supply-chain interference.',
    actualAuthority: 'Not found in any source checked — suspected fabrication.'
  }],
  queue: [{
    id: 'rev-001',
    priority: 'Critical',
    item: 'Fabricated authority detected',
    citation: 'Fairfax International Logistics v Brennan Holdings [2019] EWHC 1847 (Comm)',
    assignedTo: 'Partner',
    status: 'Pending Review',
    reason: 'No reliable legal source confirms existence of the case.'
  }, {
    id: 'rev-002',
    priority: 'Critical',
    item: 'Fabricated authority detected',
    citation: 'Pemberton Aerospace Systems v Delta Global Ventures [2023] EWHC 892 (TCC)',
    assignedTo: 'Partner',
    status: 'Pending Review',
    reason: 'Not found in any available source — suspected fabrication, partner review required.'
  }, {
    id: 'rev-003',
    priority: 'High',
    item: 'Mischaracterised damages authority',
    citation: 'Anglia Television Ltd v Reed [1972] 1 QB 60',
    assignedTo: 'Senior Associate',
    status: 'Needs Amendment',
    reason: 'Used for expectation damages despite supporting reliance loss.'
  }, {
    id: 'rev-004',
    priority: 'High',
    item: 'Mischaracterised negotiating damages authority',
    citation: 'Wrotham Park Estate Co Ltd v Parkside Homes Ltd [1974] 1 WLR 798',
    assignedTo: 'Senior Associate',
    status: 'Needs Amendment',
    reason: 'Used as if it supports ordinary lost-profit damages.'
  }],
  queueMetrics: {
    open: 4,
    critical: 2,
    high: 2,
    approved: 0,
    readyForFiling: 'No'
  },
  audit: [{
    time: '09:42',
    actor: 'Consistency Check Engine',
    event: 'Document analysed',
    detail: '12 citations extracted from skeleton argument.'
  }, {
    time: '09:43',
    actor: 'Citation Verifier',
    event: 'Fabricated citation flagged',
    detail: 'Fairfax International Logistics v Brennan Holdings could not be verified.'
  }, {
    time: '09:44',
    actor: 'Citation Verifier',
    event: 'Mischaracterisation flagged',
    detail: 'Anglia Television v Reed appears to be used for the wrong damages proposition.'
  }, {
    time: '09:46',
    actor: 'Partner Reviewer',
    event: 'Finding escalated',
    detail: 'Fabricated citation sent for partner review before filing.'
  }],
  dataSources: [{
    name: 'Provided UK / Commonwealth Case Corpus',
    type: 'Local Corpus',
    status: 'Connected',
    coverage: '57 authorities',
    role: 'Primary verification source',
    endpoint: 'local · main_data/*.md',
    auth: 'none'
  }, {
    name: 'CourtListener',
    type: 'Open Legal API',
    status: 'Connected',
    coverage: 'US citation network',
    role: 'Out-of-corpus citation support',
    endpoint: 'https://www.courtlistener.com/api/rest/v4',
    auth: 'Token (optional)'
  }, {
    name: 'legislation.gov.uk',
    type: 'Open Statutory Source',
    status: 'Connected',
    coverage: 'UK legislation',
    role: 'Statutory verification',
    endpoint: 'https://www.legislation.gov.uk · /data.xml',
    auth: 'OGL · none'
  }, {
    name: 'EUR-Lex / CELLAR SPARQL',
    type: 'EU Knowledge Graph',
    status: 'Connected',
    coverage: 'EU amends / repeals graph',
    role: 'EU law grounding',
    endpoint: 'http://publications.europa.eu/webapi/rdf/sparql',
    auth: 'none'
  }, {
    name: 'Caselaw Access Project',
    type: 'US Bulk Corpus',
    status: 'Connected',
    coverage: '6.9m US decisions',
    role: 'US reporter verification',
    endpoint: 'https://static.case.law',
    auth: 'none'
  }, {
    name: 'UK Supreme Court',
    type: 'Primary Court Source',
    status: 'Connected',
    coverage: 'UKSC judgments + summaries',
    role: 'Apex-court verification',
    endpoint: 'https://www.supremecourt.uk/cases',
    auth: 'none'
  }, {
    name: 'Perplexity Live Search',
    type: 'Fallback Web Search',
    status: 'Connected',
    coverage: 'Open web verification',
    role: 'Secondary verification',
    endpoint: 'https://api.perplexity.ai',
    auth: 'API key · pplx-•••• (configured)'
  }, {
    name: 'BAILII / Find Case Law',
    type: 'Restricted Source',
    status: 'Off-limits',
    coverage: 'Not used',
    role: 'Licence restrictions prohibit scraping or computational analysis',
    endpoint: '—',
    auth: 'blocked'
  }],
  engines: [{
    name: 'Nemotron Parse',
    vendor: 'NVIDIA',
    role: 'Document parsing — PDF / DOCX → text, tables, citations',
    endpoint: 'integrate.api.nvidia.com · nvidia/nemotron-parse',
    status: 'Configured'
  }, {
    name: 'Nemotron Retrieval',
    vendor: 'NVIDIA',
    role: 'Embeddings — deterministic corpus matching & semantic search',
    endpoint: 'integrate.api.nvidia.com · llama-3.2-nv-embedqa',
    status: 'Configured'
  }, {
    name: 'Nemotron Super / Ultra',
    vendor: 'NVIDIA',
    role: 'Reasoning — mischaracterisation & proposition analysis',
    endpoint: 'integrate.api.nvidia.com · nemotron-3',
    status: 'Configured'
  }, {
    name: 'Perplexity Sonar',
    vendor: 'Perplexity',
    role: 'Live web verification for out-of-corpus citations',
    endpoint: 'api.perplexity.ai · sonar',
    status: 'Configured'
  }],
  architecture: [{
    n: 1,
    name: 'Input Layer',
    items: ['Upload skeleton argument', 'Paste legal text', 'Parse PDF / DOCX']
  }, {
    n: 2,
    name: 'Extraction Layer',
    items: ['Citation extraction', 'Legal proposition extraction', 'Risk phrase detection']
  }, {
    n: 3,
    name: 'Verification Layer',
    items: ['Deterministic corpus matching', 'Open legal source lookup', 'Mischaracterisation analysis']
  }, {
    n: 4,
    name: 'Review Layer',
    items: ['Human approve / amend / reject', 'Tracked-change working copy', 'Audit trail']
  }, {
    n: 5,
    name: 'Output Layer',
    items: ['Citation health report', 'Partner-ready summary', 'Exportable review record']
  }],
  // Real corpus grounding per citation — court / neutral citation / bench / holding
  // taken from the provided case files. `match` = how the authority was located.
  corpus: {
    'cit-001': {
      match: 'corpus',
      source: 'Lumley v Gye (1853) 2 E&B 216.md',
      court: "Queen's Bench",
      neutral: '(1853) 2 E & B 216',
      bench: 'Wightman, Erle & Crompton JJ',
      holding: 'An action lies for maliciously procuring a breach of a contract for exclusive personal services, provided the procurement is during the subsistence of the contract and produces damage. The parties need not stand in the strict relation of master and servant.'
    },
    'cit-002': {
      match: 'corpus',
      source: 'obg-ltd-and-another-v-allan-and-others-uk-nondevolved-case-l.md',
      court: 'House of Lords',
      neutral: '[2007] UKHL 21',
      bench: 'Lord Hoffmann, Lord Nicholls, Lord Walker, Baroness Hale, Lord Brown',
      holding: 'Restated the economic torts: accessory liability for inducing breach of contract (the Lumley v Gye tort) is distinct from the tort of causing loss by unlawful means; the two must not be conflated.'
    },
    'cit-003': {
      match: 'corpus',
      source: 'd-c-thomson--company-ltd-v-arthur-deakin-and-others-england-.md',
      court: 'Court of Appeal',
      neutral: '[1952] Ch 646',
      bench: 'Lord Evershed MR, Jenkins & Morris LJJ',
      holding: 'Indirect procurement of a breach of contract is actionable only where the defendant had knowledge of the contract and employed unlawful means to bring the breach about.'
    },
    'cit-004': {
      match: 'corpus',
      source: 'Hadley v Baxendale (1854) 9 Ex 341.md',
      court: 'Court of Exchequer',
      neutral: '(1854) 9 Ex 341; 156 ER 145',
      bench: 'Alderson B',
      holding: 'Damages for breach of contract are recoverable where they arise naturally from the breach, or were within the reasonable contemplation of both parties at the time of contracting. The two-limb test of remoteness.'
    },
    'cit-005': {
      match: 'corpus',
      source: 'transfield-shipping-inc-v-mercator-shipping-inc-the-achillea.md',
      court: 'House of Lords',
      neutral: '[2008] UKHL 48',
      bench: 'Lord Hoffmann, Lord Hope, Lord Rodger, Lord Walker, Baroness Hale',
      holding: 'Remoteness depends on whether the defendant assumed responsibility for the type of loss; a loss of the kind in question may be too remote even if foreseeable, where market understanding would not place that risk on the defendant.'
    },
    'cit-006': {
      match: 'corpus',
      source: 'American Cyanamid Co (No 1) v Ethicon Ltd [1975] UKHL 1 (05 February 1975).md',
      court: 'House of Lords',
      neutral: '[1975] AC 396 · [1975] UKHL 1',
      bench: 'Lord Diplock',
      holding: 'On an application for an interim injunction the court asks whether there is a serious question to be tried and where the balance of convenience lies; it does not require a prima facie case to be shown.'
    },
    'cit-007': {
      match: 'external',
      source: 'Perplexity / open-web (E&W)',
      court: 'Chancery Division',
      neutral: '[1996] 1 All ER 853',
      bench: 'Laddie J',
      holding: 'On without-notice and interim relief, the court may weigh the relative strength of each party\u2019s case where that can be assessed on credible evidence. Outside the provided corpus — confirmed against open sources only.'
    },
    'cit-008': {
      match: 'corpus',
      source: 'anglia-television-ltd-v-reed-england--wales-case-law.md',
      court: 'Court of Appeal',
      neutral: '[1972] 1 QB 60',
      bench: 'Lord Denning MR, Phillimore & Megaw LJJ',
      holding: 'A claimant may recover wasted expenditure incurred in reliance on the contract, both before and after it was made, where expectation loss (lost profit) is too speculative to prove. The case is authority for RELIANCE loss, not a broad expectation-damages claim.'
    },
    'cit-009': {
      match: 'external',
      source: 'Perplexity / open-web (E&W)',
      court: 'Chancery Division',
      neutral: '[1974] 1 WLR 798',
      bench: 'Brightman J',
      holding: 'Where a covenant is breached but no financial loss is shown, damages may be assessed as the sum that might reasonably have been demanded to release the covenant \u2014 \u201cnegotiating\u201d or release-fee damages. A distinct measure from ordinary lost-profit expectation damages.'
    },
    'cit-010': {
      match: 'none',
      source: null,
      searched: ['UK / Commonwealth corpus (57 authorities)', 'CourtListener', 'legislation.gov.uk', 'Open web verification'],
      holding: 'No reliable match found in the provided corpus or open legal sources. The neutral citation [2019] EWHC 1847 (Comm) does not resolve to this matter. Party names appear tailored to the dispute.',
      suggestion: {
        citation: 'OBG Ltd v Allan [2007] UKHL 21',
        court: 'House of Lords',
        neutral: '[2007] UKHL 21',
        source: 'obg-ltd-and-another-v-allan-and-others-uk-nondevolved-case-l.md',
        match: 68,
        why: 'Real authority that governs the proposition the passage needs — intentional interference with commercial and contractual relations — under the modern restatement of the economic torts.'
      }
    },
    'cit-011': {
      match: 'none',
      source: null,
      searched: ['UK / Commonwealth corpus (57 authorities)', 'CourtListener', 'legislation.gov.uk', 'Open web verification'],
      holding: 'No reliable match found. The citation [2021] EWHC 3312 (Ch) does not resolve and the party names appear synthetic and closely mirror the present dispute.',
      suggestion: {
        citation: 'Hedley Byrne & Co Ltd v Heller & Partners Ltd [1964] AC 465',
        court: 'House of Lords',
        neutral: '[1964] AC 465',
        source: 'hedley-byrne--company-ltd-v-heller--partners-ltd-uk-nondevol.md',
        match: 61,
        why: 'The established route to recovering pure financial and investment loss — liability for negligent misstatement made on an assumption of responsibility.'
      }
    },
    'cit-012': {
      match: 'none',
      source: null,
      searched: ['UK / Commonwealth corpus (57 authorities)', 'CourtListener', 'legislation.gov.uk', 'Open web verification'],
      holding: 'Not found in any source available to this system. The citation [2023] EWHC 892 (TCC) does not resolve in the curated corpus or on open-web search, and the party names mirror the dispute. Absence is bounded to the sources checked — non-existence cannot be asserted beyond them; partner verification required.',
      suggestion: {
        citation: 'Czarnikow Ltd v Koufos (The Heron II) [1969] 1 AC 350',
        court: 'House of Lords',
        neutral: '[1969] 1 AC 350',
        source: 'czarnikow-ltd-v-koufos-heron-ii-uk-nondevolved-case-law.md',
        match: 64,
        why: 'Controls recoverability of consequential loss on a commercial supply contract — remoteness measured by what was “not unlikely” to result from the breach.'
      }
    }
  },
  analysis: {
    "cit-001": {
      "existence": "confirmed-internal",
      "fidelity": 96,
      "fidelityLabel": "Faithful",
      "jurisdiction": "England & Wales",
      "triageMin": 0
    },
    "cit-002": {
      "existence": "confirmed-internal",
      "fidelity": 94,
      "fidelityLabel": "Faithful",
      "jurisdiction": "England & Wales (HL)",
      "triageMin": 0
    },
    "cit-003": {
      "existence": "confirmed-internal",
      "fidelity": 92,
      "fidelityLabel": "Faithful",
      "jurisdiction": "England & Wales",
      "triageMin": 0
    },
    "cit-004": {
      "existence": "confirmed-internal",
      "fidelity": 97,
      "fidelityLabel": "Faithful",
      "jurisdiction": "England & Wales",
      "triageMin": 0
    },
    "cit-005": {
      "existence": "confirmed-internal",
      "fidelity": 84,
      "fidelityLabel": "Minor drift",
      "jurisdiction": "England & Wales (HL)",
      "triageMin": 5,
      "note": "Holding confirmed; drafting slightly overstates the assumption-of-responsibility principle — tighten wording."
    },
    "cit-006": {
      "existence": "confirmed-internal",
      "fidelity": 95,
      "fidelityLabel": "Faithful",
      "jurisdiction": "England & Wales (HL)",
      "triageMin": 0
    },
    "cit-007": {
      "existence": "confirmed-external",
      "fidelity": 88,
      "fidelityLabel": "Faithful",
      "jurisdiction": "England & Wales",
      "triageMin": 8,
      "note": "In-jurisdiction but outside the curated corpus — confirmed on open-web search only. Verify the quotation and procedural context manually before filing."
    },
    "cit-008": {
      "existence": "confirmed-internal",
      "fidelity": 34,
      "fidelityLabel": "Scope drift",
      "jurisdiction": "England & Wales",
      "triageMin": 12,
      "signal": [{
        "type": "Scope drift · short-range",
        "text": "The overreach is short-range and on-topic: Anglia v Reed is genuinely a damages authority, and the brief shifts it only from reliance to expectation loss — neighbouring measures for the same breach. A reviewer who recognises it as \"the damages case\" nods it through without re-checking which measure it actually supports."
      }, {
        "type": "Uniform fluency",
        "text": "The misuse is invisible on the page: impeccable citation format, a real and famous case, written as confidently as the genuine authorities around it. Nothing in the prose flags it — only checking the holding reveals it."
      }],
      "defensibility": "Reviewer call — scope drift, not fabrication. The authority is real and on-topic; whether the stretch is defensible aggressive advocacy or a misstatement is a partner judgment. Flagged because the cited proposition (expectation / lost-profit) exceeds the holding’s ratio (reliance loss)."
    },
    "cit-009": {
      "existence": "confirmed-external",
      "fidelity": 31,
      "fidelityLabel": "Scope drift",
      "jurisdiction": "England & Wales",
      "triageMin": 12,
      "signal": [{
        "type": "Scope drift · short-range",
        "text": "Negotiating (Wrotham Park) damages and ordinary expectation damages are adjacent remedies for the same wrong. The brief slides from the release-fee measure to lost-profit recovery — one step along the damages spectrum, not an obvious leap."
      }, {
        "type": "Uniform fluency",
        "text": "A real, well-known property case cited in correct form. Reading at speed, a reviewer sees a damages authority used for damages and moves on; the distinction between measures only surfaces on a holding-level check."
      }],
      "defensibility": "Reviewer call — scope drift, not fabrication. The authority exists and is on-topic; the partner must judge whether treating negotiating damages as ordinary lost-profit damages is arguable advocacy or a misstatement that risks misleading the court."
    },
    "cit-010": {
      "existence": "absent",
      "fidelity": null,
      "fidelityLabel": "—",
      "jurisdiction": "Claimed E&W · unresolved",
      "triageMin": 4
    },
    "cit-011": {
      "existence": "absent",
      "fidelity": null,
      "fidelityLabel": "—",
      "jurisdiction": "Claimed E&W · unresolved",
      "triageMin": 4
    },
    "cit-012": {
      "existence": "absent",
      "fidelity": null,
      "fidelityLabel": "—",
      "jurisdiction": "Claimed E&W · unresolved",
      "triageMin": 4
    }
  },
  filing: {
    "deadline": "16:00",
    "label": "Without-notice injunction · same-day filing",
    "submitted": "09:42",
    "baselineRemaining": 9540
  }
};
Object.assign(window.CCData, {
  projects: [{
    id: 'crestholm',
    matter: 'Crestholm Dynamics plc v Veltros Industries Inc',
    client: 'Veltros Industries Inc',
    type: 'Skeleton Argument',
    updated: 'Today 09:46',
    health: 58,
    status: 'Partner review',
    citations: 12,
    flags: 5,
    active: true
  }, {
    id: 'penrose',
    matter: 'Penrose Capital LLP v Doraville Holdings',
    client: 'Penrose Capital',
    type: 'Skeleton Argument',
    updated: '5 days ago',
    health: 92,
    status: 'Filed',
    citations: 9,
    flags: 0
  }, {
    id: 'harwell',
    matter: 'Harwell Bio NV v Sentris Pharma Ltd',
    client: 'Harwell Bio NV',
    type: 'Particulars of Claim',
    updated: 'Yesterday',
    health: 81,
    status: 'Cleared',
    citations: 14,
    flags: 1
  }, {
    id: 'lockton',
    matter: 'Lockton Maritime v Argo Freight SA',
    client: 'Lockton Maritime',
    type: 'Witness Statement',
    updated: '2 days ago',
    health: 64,
    status: 'In review',
    citations: 7,
    flags: 3
  }],
  // Skeleton-argument prose. Each block may embed a citation (cite=finding id);
  // the citation string is highlighted by verdict in the back-to-back view.
  docBlocks: [{
    kind: 'court',
    text: 'IN THE HIGH COURT OF JUSTICE · BUSINESS AND PROPERTY COURTS OF ENGLAND AND WALES · COMMERCIAL COURT (KBD)'
  }, {
    kind: 'title',
    text: 'Skeleton argument on behalf of the Claimant'
  }, {
    kind: 'h',
    text: 'A. Introduction'
  }, {
    kind: 'p',
    text: 'This skeleton is filed in support of the Claimant’s application for a without-notice injunction and for damages arising from the Defendant’s interference with the Claimant’s contractual relations. The claim is valued at approximately £47m.'
  }, {
    kind: 'h',
    text: 'B. Tortious interference'
  }, {
    kind: 'p',
    cite: 'cit-001',
    text: 'It is well established that intentionally procuring a breach of contract is actionable: Lumley v Gye (1853) 2 E & B 216. The Defendant knowingly induced the counterparty to abandon its exclusive obligations to the Claimant.'
  }, {
    kind: 'p',
    cite: 'cit-002',
    text: 'The modern structure of the economic torts was restated in OBG Ltd v Allan [2007] UKHL 21, which the Claimant relies upon to distinguish inducing breach from causing loss by unlawful means.'
  }, {
    kind: 'p',
    cite: 'cit-003',
    text: 'Where the inducement is indirect, knowledge and unlawful means are required: DC Thomson & Co Ltd v Deakin [1952] Ch 646.'
  }, {
    kind: 'h',
    text: 'C. Damages'
  }, {
    kind: 'p',
    cite: 'cit-004',
    text: 'Losses flowing naturally from the breach, or within the parties’ reasonable contemplation, are recoverable: Hadley v Baxendale (1854) 9 Ex 341.'
  }, {
    kind: 'p',
    cite: 'cit-005',
    text: 'The Claimant acknowledges the assumption-of-responsibility gloss in The Achilleas [2008] UKHL 48, but submits the losses here were plainly of the kind contemplated.'
  }, {
    kind: 'p',
    cite: 'cit-008',
    text: 'The Claimant is entitled to recover its expectation loss, including lost profits, as authority for which it relies on Anglia Television Ltd v Reed [1972] 1 QB 60.'
  }, {
    kind: 'p',
    cite: 'cit-009',
    text: 'Further, ordinary lost-profit damages are supported by Wrotham Park Estate Co Ltd v Parkside Homes Ltd [1974] 1 WLR 798.'
  }, {
    kind: 'h',
    text: 'D. Injunctive relief'
  }, {
    kind: 'p',
    cite: 'cit-006',
    text: 'The test for interim relief is the familiar one in American Cyanamid Co v Ethicon Ltd [1975] AC 396: a serious question to be tried and the balance of convenience.'
  }, {
    kind: 'p',
    cite: 'cit-007',
    text: 'On the without-notice application and the relative strength of the parties’ cases, the Claimant relies on Series 5 Software Ltd v Clarke [1996] 1 All ER 853.'
  }, {
    kind: 'h',
    text: 'E. Recent commercial authority'
  }, {
    kind: 'p',
    cite: 'cit-010',
    text: 'The principle has been applied to commercial logistics interference in Fairfax International Logistics v Brennan Holdings [2019] EWHC 1847 (Comm).'
  }, {
    kind: 'p',
    cite: 'cit-011',
    text: 'It was followed in the procurement context in Stonegate Capital Partners v Redwood Procurement [2021] EWHC 3312 (Ch),'
  }, {
    kind: 'p',
    cite: 'cit-012',
    text: 'and most recently in the aerospace supply chain in Pemberton Aerospace Systems v Delta Global Ventures [2023] EWHC 892 (TCC).'
  }]
});

/* Source Library — the verification corpus. Every authority below is a real
   case drawn from the provided UK/Commonwealth corpus (hard_coding/main_data);
   citations are genuine — none are synthesized. `discovered` holds real cases
   surfaced from internet sources during verification runs that a lawyer can
   promote into the trusted corpus. */
Object.assign(window.CCData, {
  sourceLibrary: [
  // Economic torts & interference
  {
    id: 'src-lumley',
    case: 'Lumley v Gye',
    citation: '(1853) 2 E & B 216',
    court: "Queen's Bench",
    jur: 'ew',
    area: 'Economic torts',
    year: 1853
  }, {
    id: 'src-allen',
    case: 'Allen v Flood',
    citation: '[1898] AC 1',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Economic torts',
    year: 1898
  }, {
    id: 'src-quinn',
    case: 'Quinn v Leathem',
    citation: '[1901] AC 495',
    court: 'House of Lords',
    jur: 'ni',
    origin: 'Irish appeal · 1901 (facts in present-day Northern Ireland)',
    area: 'Economic torts',
    year: 1901
  }, {
    id: 'src-thomson',
    case: 'DC Thomson & Co Ltd v Deakin',
    citation: '[1952] Ch 646',
    court: 'Court of Appeal',
    jur: 'ew',
    area: 'Economic torts',
    year: 1952
  }, {
    id: 'src-rookes',
    case: 'Rookes v Barnard',
    citation: '[1964] AC 1129',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Economic torts',
    year: 1964
  }, {
    id: 'src-obg',
    case: 'OBG Ltd v Allan',
    citation: '[2007] UKHL 21',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Economic torts',
    year: 2007
  }, {
    id: 'src-total',
    case: 'HM Revenue & Customs v Total Network SL',
    citation: '[2008] UKHL 19',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Economic torts',
    year: 2008
  }, {
    id: 'src-meretz',
    case: 'Meretz Investments NV v ACP Ltd',
    citation: '[2007] EWCA Civ 1303',
    court: 'Court of Appeal',
    jur: 'ew',
    area: 'Economic torts',
    year: 2007
  }, {
    id: 'src-debenture',
    case: 'Law Debenture Trust Corp v Ural Caspian Oil Corp',
    citation: '[1995] Ch 152',
    court: 'Court of Appeal',
    jur: 'ew',
    area: 'Economic torts',
    year: 1995
  }, {
    id: 'src-marathon-c',
    case: 'Crawford Adjusters v Sagicor General Insurance (Cayman)',
    citation: '[2013] UKPC 17',
    court: 'Privy Council',
    jur: 'pc',
    origin: 'Cayman Islands appeal',
    area: 'Economic torts',
    year: 2013
  }, {
    id: 'src-willers',
    case: 'Willers v Joyce (No 1)',
    citation: '[2016] UKSC 43',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'Economic torts',
    year: 2016
  },
  // Damages & remoteness
  {
    id: 'src-hadley',
    case: 'Hadley v Baxendale',
    citation: '(1854) 9 Ex 341',
    court: 'Court of Exchequer',
    jur: 'ew',
    area: 'Damages & remoteness',
    year: 1854
  }, {
    id: 'src-heron',
    case: 'Czarnikow Ltd v Koufos (The Heron II)',
    citation: '[1969] 1 AC 350',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Damages & remoteness',
    year: 1969
  }, {
    id: 'src-parsons',
    case: 'H Parsons (Livestock) Ltd v Uttley Ingham & Co',
    citation: '[1978] QB 791',
    court: 'Court of Appeal',
    jur: 'ew',
    area: 'Damages & remoteness',
    year: 1978
  }, {
    id: 'src-achilleas',
    case: 'Transfield Shipping v Mercator (The Achilleas)',
    citation: '[2008] UKHL 48',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Damages & remoteness',
    year: 2008
  }, {
    id: 'src-anglia',
    case: 'Anglia Television Ltd v Reed',
    citation: '[1972] 1 QB 60',
    court: 'Court of Appeal',
    jur: 'ew',
    area: 'Damages & remoteness',
    year: 1971
  }, {
    id: 'src-cphaulage',
    case: 'C & P Haulage v Middleton',
    citation: '[1983] 1 WLR 1461',
    court: 'Court of Appeal',
    jur: 'ew',
    area: 'Damages & remoteness',
    year: 1983
  }, {
    id: 'src-doyle',
    case: 'Doyle v Olby (Ironmongers) Ltd',
    citation: '[1969] 2 QB 158',
    court: 'Court of Appeal',
    jur: 'ew',
    area: 'Damages & remoteness',
    year: 1969
  }, {
    id: 'src-east',
    case: 'East v Maurer',
    citation: '[1991] 1 WLR 461',
    court: 'Court of Appeal',
    jur: 'ew',
    area: 'Damages & remoteness',
    year: 1991
  }, {
    id: 'src-broome',
    case: 'Broome v Cassell & Co Ltd',
    citation: '[1972] AC 1027',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Damages & remoteness',
    year: 1972
  }, {
    id: 'src-devenish',
    case: 'Devenish Nutrition Ltd v Sanofi-Aventis SA',
    citation: '[2008] EWCA Civ 1086',
    court: 'Court of Appeal',
    jur: 'ew',
    area: 'Restitution',
    year: 2008
  }, {
    id: 'src-simmons',
    case: 'Simmons v Castle',
    citation: '[2012] EWCA Civ 1039',
    court: 'Court of Appeal',
    jur: 'ew',
    area: 'Damages & remoteness',
    year: 2012
  },
  // Negligence & duty of care
  {
    id: 'src-donoghue',
    case: 'Donoghue v Stevenson',
    citation: '[1932] AC 562',
    court: 'House of Lords',
    jur: 'sc',
    origin: 'Scottish appeal · 1932 SC (HL) 31',
    area: 'Negligence & duty',
    year: 1932
  }, {
    id: 'src-hedley',
    case: 'Hedley Byrne & Co Ltd v Heller & Partners Ltd',
    citation: '[1964] AC 465',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Negligence & duty',
    year: 1964
  }, {
    id: 'src-caparo',
    case: 'Caparo Industries plc v Dickman',
    citation: '[1990] 2 AC 605',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Negligence & duty',
    year: 1990
  }, {
    id: 'src-anns',
    case: 'Anns v Merton London Borough Council',
    citation: '[1978] AC 728',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Negligence & duty',
    year: 1977
  }, {
    id: 'src-murphy',
    case: 'Murphy v Brentwood District Council',
    citation: '[1991] 1 AC 398',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Negligence & duty',
    year: 1990
  }, {
    id: 'src-junior',
    case: 'Junior Books Ltd v Veitchi Co Ltd',
    citation: '[1983] 1 AC 520',
    court: 'House of Lords',
    jur: 'sc',
    origin: 'Scottish appeal',
    area: 'Negligence & duty',
    year: 1982
  }, {
    id: 'src-white',
    case: 'White v Jones',
    citation: '[1995] 2 AC 207',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Negligence & duty',
    year: 1995
  }, {
    id: 'src-3rivers',
    case: 'Three Rivers DC v Bank of England (No 3)',
    citation: '[2003] 2 AC 1',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Negligence & duty',
    year: 2001
  }, {
    id: 'src-bpe',
    case: 'Hughes-Holland v BPE Solicitors',
    citation: '[2017] UKSC 21',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'Negligence & duty',
    year: 2017
  }, {
    id: 'src-sienkiewicz',
    case: 'Sienkiewicz v Greif (UK) Ltd',
    citation: '[2011] UKSC 10',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'Negligence & duty',
    year: 2011
  }, {
    id: 'src-herrington',
    case: 'British Railways Board v Herrington',
    citation: '[1972] AC 877',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Negligence & duty',
    year: 1972
  },
  // Injunctions
  {
    id: 'src-cyanamid',
    case: 'American Cyanamid Co v Ethicon Ltd',
    citation: '[1975] AC 396',
    court: 'House of Lords',
    jur: 'ew',
    area: 'Injunctions',
    year: 1975
  }, {
    id: 'src-wolverhampton',
    case: 'Wolverhampton CC v London Gypsies & Travellers',
    citation: '[2023] UKSC 47',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'Injunctions',
    year: 2023
  },
  // Jurisdiction & conflict of laws
  {
    id: 'src-4seasons',
    case: 'Four Seasons Holdings Inc v Brownlie',
    citation: '[2017] UKSC 80',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'Jurisdiction',
    year: 2017
  }, {
    id: 'src-cairo',
    case: 'FS Cairo (Nile Plaza) LLC v Brownlie',
    citation: '[2021] UKSC 45',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'Jurisdiction',
    year: 2021
  }, {
    id: 'src-vtb',
    case: 'VTB Capital plc v Nutritek International Corp',
    citation: '[2013] UKSC 5',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'Jurisdiction',
    year: 2013
  }, {
    id: 'src-ak',
    case: 'AK Investment CJSC v Kyrgyz Mobil Tel Ltd',
    citation: '[2011] UKPC 7',
    court: 'Privy Council',
    jur: 'pc',
    origin: 'Isle of Man appeal',
    area: 'Jurisdiction',
    year: 2011
  },
  // Contract & commercial
  {
    id: 'src-triple',
    case: 'Triple Point Technology Inc v PTT Public Co Ltd',
    citation: '[2021] UKSC 29',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'Contract',
    year: 2021
  }, {
    id: 'src-oceanbulk',
    case: 'Oceanbulk Shipping & Trading SA v TMT Asia Ltd',
    citation: '[2010] UKSC 44',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'Contract',
    year: 2010
  }, {
    id: 'src-uber',
    case: 'Uber BV v Aslam',
    citation: '[2021] UKSC 5',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'Employment',
    year: 2021
  }, {
    id: 'src-starbucks',
    case: 'Starbucks (HK) Ltd v British Sky Broadcasting',
    citation: '[2015] UKSC 31',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'IP & passing off',
    year: 2015
  }],
  discovered: [{
    id: 'disc-series5',
    case: 'Series 5 Software Ltd v Clarke',
    citation: '[1996] 1 All ER 853',
    court: 'Chancery Division',
    jur: 'ew',
    area: 'Injunctions',
    foundVia: 'Perplexity Live Search',
    matter: 'Crestholm Dynamics plc v Veltros',
    confidence: 84,
    note: 'Cited in the Crestholm skeleton for without-notice relief. Confirmed on open-web search but outside the curated corpus — adding it lets future matters verify this authority deterministically.'
  }, {
    id: 'disc-onestep',
    case: 'One Step (Support) Ltd v Morris-Garner',
    citation: '[2018] UKSC 20',
    court: 'UK Supreme Court',
    jur: 'ew',
    area: 'Damages & remoteness',
    foundVia: 'CourtListener',
    matter: 'Crestholm Dynamics plc v Veltros',
    confidence: 93,
    note: 'The Supreme Court’s modern restatement of negotiating (Wrotham Park) damages. Surfaced while checking cit-009 — this is the authority the skeleton should rely on instead of mis-stating Wrotham Park.'
  }, {
    id: 'disc-pell',
    case: 'Pell Frischmann Engineering Ltd v Bow Valley Iran Ltd',
    citation: '[2009] UKPC 45',
    court: 'Privy Council',
    jur: 'pc',
    area: 'Damages & remoteness',
    foundVia: 'Perplexity Live Search',
    matter: 'Lockton Maritime v Argo Freight',
    confidence: 88,
    note: 'Leading Privy Council authority on the assessment of negotiating damages. Persuasive in E&W — flag jurisdiction on use.'
  }, {
    id: 'disc-marathon',
    case: 'Marathon Asset Management LLP v Seddon',
    citation: '[2017] EWHC 300 (Comm)',
    court: 'Commercial Court',
    jur: 'ew',
    area: 'Economic torts',
    foundVia: 'CourtListener',
    matter: 'Harwell Bio NV v Sentris Pharma',
    confidence: 86,
    note: 'Confidential-information and unlawful-means analysis. Found on the open web during the Harwell review; not yet in the corpus.'
  }],
  corpusStats: {
    base: 58,
    seedLabel: 'White & Case verified case corpus'
  }
});

/* Partner-approved revisions for the working document — each rewrites the
   paragraph to reflect the verified legal position, grounded in the real
   corpus. Applied as tracked changes on the left-hand working copy. */
window.CCData.revisions = {
  'cit-008': 'The Claimant is entitled to recover wasted expenditure incurred in reliance on the contract: Anglia Television Ltd v Reed [1972] 1 QB 60. Lost profits, claimed as expectation loss, are pursued separately under Hadley v Baxendale (1854) 9 Ex 341 — Anglia is not relied upon for expectation damages.',
  'cit-009': 'To the extent negotiating damages are sought, the Claimant relies on Wrotham Park Estate Co Ltd v Parkside Homes Ltd [1974] 1 WLR 798 as restated in One Step (Support) Ltd v Morris-Garner [2018] UKSC 20. Ordinary lost-profit expectation damages are pleaded separately under Hadley v Baxendale.',
  'cit-010': '[Citation removed in review — "Fairfax International Logistics v Brennan Holdings [2019] EWHC 1847 (Comm)" could not be verified in any available source. Interference with commercial relations is supported by OBG Ltd v Allan [2007] UKHL 21.]',
  'cit-011': '[Citation removed in review — "Stonegate Capital Partners v Redwood Procurement [2021] EWHC 3312 (Ch)" could not be verified. Recovery of procurement and investment loss is addressed under Hedley Byrne & Co Ltd v Heller & Partners Ltd [1964] AC 465.]',
  'cit-012': '[Citation removed in review — "Pemberton Aerospace Systems v Delta Global Ventures [2023] EWHC 892 (TCC)" could not be verified. Consequential supply-chain loss is governed by Czarnikow Ltd v Koufos (The Heron II) [1969] 1 AC 350.]'
};

/* Lightweight client-side citation detection for uploaded documents (demo). */
window.CCDetectCitations = function (text) {
  const out = [];
  const seen = new Set();
  const reCase = /\b([A-Z][A-Za-z'’.&-]+(?:\s+[A-Z][A-Za-z'’.&-]+){0,4})\s+v\.?\s+([A-Z][A-Za-z'’.&-]+(?:\s+[A-Z][A-Za-z'’.&-]+){0,4})/g;
  let m;
  while ((m = reCase.exec(text)) && out.length < 60) {
    const s = m[0].replace(/\s+/g, ' ').trim();
    if (!seen.has(s)) {
      seen.add(s);
      out.push(s);
    }
  }
  return out;
};

/* Parallel citations — one judgment, multiple law-report references.
   A single case is reported across several series (neutral citation, Appeal
   Cases, Weekly Law Reports, All England, specialist reporters); each is a
   distinct address for the same authority. The verifier normalises across all
   of them, so a lawyer can paste ANY one and the tool resolves the same case.
   Every reference below is a genuine parallel citation for the case.
   A fabricated citation resolves in NO series — its absence everywhere is the tell. */
window.CCData.parallelCites = {
  'cit-001': {
    primary: '(1853) 2 E & B 216',
    refs: ['(1853) 2 E & B 216', '118 ER 749', '[1843-60] All ER Rep 208']
  },
  'cit-002': {
    primary: '[2007] UKHL 21',
    refs: ['[2007] UKHL 21', '[2008] 1 AC 1', '[2007] 2 WLR 920', '[2007] 4 All ER 545', '[2007] Bus LR 1600']
  },
  'cit-003': {
    primary: '[1952] Ch 646',
    refs: ['[1952] Ch 646', '[1952] 2 All ER 361', '[1952] 2 TLR 105']
  },
  'cit-004': {
    primary: '(1854) 9 Ex 341',
    refs: ['(1854) 9 Ex 341', '156 ER 145', '[1843-60] All ER Rep 461']
  },
  'cit-005': {
    primary: '[2008] UKHL 48',
    refs: ['[2008] UKHL 48', '[2009] 1 AC 61', '[2008] 3 WLR 345', '[2008] 4 All ER 159', "[2008] 2 Lloyd's Rep 275"]
  },
  'cit-006': {
    primary: '[1975] UKHL 1',
    refs: ['[1975] AC 396', '[1975] UKHL 1', '[1975] 2 WLR 316', '[1975] 1 All ER 504', '[1975] RPC 513', '[1975] FSR 101']
  },
  'cit-007': {
    primary: '[1996] 1 All ER 853',
    refs: ['[1996] 1 All ER 853', '[1996] FSR 273', '[1996] CLC 631']
  },
  'cit-008': {
    primary: '[1972] 1 QB 60',
    refs: ['[1972] 1 QB 60', '[1971] 3 WLR 528', '[1971] 3 All ER 690']
  },
  'cit-009': {
    primary: '[1974] 1 WLR 798',
    refs: ['[1974] 1 WLR 798', '[1974] 2 All ER 321', '(1974) 27 P & CR 296']
  },
  'cit-010': {
    primary: '[2019] EWHC 1847 (Comm)',
    refs: [],
    unresolved: true
  },
  'cit-011': {
    primary: '[2021] EWHC 3312 (Ch)',
    refs: [],
    unresolved: true
  },
  'cit-012': {
    primary: '[2023] EWHC 892 (TCC)',
    refs: [],
    unresolved: true
  }
};

/* Parallel citations for Source Library entries (keyed by entry id). */
window.CCData.parallelLib = {
  'src-lumley': ['(1853) 2 E & B 216', '118 ER 749', '[1843-60] All ER Rep 208'],
  'src-quinn': ['[1901] AC 495', '[1900-3] All ER Rep 1'],
  'src-thomson': ['[1952] Ch 646', '[1952] 2 All ER 361', '[1952] 2 TLR 105'],
  'src-obg': ['[2007] UKHL 21', '[2008] 1 AC 1', '[2007] 2 WLR 920', '[2007] 4 All ER 545'],
  'src-hadley': ['(1854) 9 Ex 341', '156 ER 145', '[1843-60] All ER Rep 461'],
  'src-heron': ['[1969] 1 AC 350', '[1967] 3 WLR 1491', '[1967] 3 All ER 686', "[1967] 2 Lloyd's Rep 457"],
  'src-achilleas': ['[2008] UKHL 48', '[2009] 1 AC 61', '[2008] 3 WLR 345', '[2008] 4 All ER 159'],
  'src-anglia': ['[1972] 1 QB 60', '[1971] 3 WLR 528', '[1971] 3 All ER 690'],
  'src-donoghue': ['[1932] AC 562', '1932 SC (HL) 31', '[1932] All ER Rep 1', '1932 SLT 317', '48 TLR 494'],
  'src-hedley': ['[1964] AC 465', '[1963] 3 WLR 101', '[1963] 2 All ER 575', "[1963] 1 Lloyd's Rep 485"],
  'src-caparo': ['[1990] 2 AC 605', '[1990] 2 WLR 358', '[1990] 1 All ER 568'],
  'src-cyanamid': ['[1975] AC 396', '[1975] UKHL 1', '[1975] 2 WLR 316', '[1975] 1 All ER 504', '[1975] RPC 513']
};

/* Ratio vs obiter — does the cited proposition rest on the case's BINDING ratio,
   or on a weaker obiter / plurality passage?  A citation can "exist" and even be
   described accurately yet still be mischaracterised in WEIGHT: relying on an aside
   as if it were the holding overstates the authority. Three failure modes:
     ratio-mismatch — the skeleton's proposition differs from the actual ratio
     obiter-weak    — the proposition is real but is obiter / not the ratio (weaker)
     partial        — broadly the ratio, but stated more widely than the case holds
   Grounded in the real holdings of the corpus cases. */
window.CCData.ratioAnalysis = {
  'cit-001': {
    type: 'aligned',
    label: 'Ratio aligned',
    strength: 'Binding ratio',
    citedAs: 'Intentional procurement of a breach of contract is itself a tort.',
    actualRatio: 'That is the ratio of Lumley v Gye — knowingly inducing breach of an existing contract is actionable.',
    note: 'The cited proposition is the binding ratio of the case and is used correctly.'
  },
  'cit-002': {
    type: 'aligned',
    label: 'Ratio aligned',
    strength: 'Binding ratio (HL)',
    citedAs: 'The economic torts share a unified structure distinguishing inducing breach from unlawful-means liability.',
    actualRatio: 'That distinction is the central holding of the House in OBG v Allan.',
    note: 'Used for the case\u2019s core holding — appropriate weight.'
  },
  'cit-003': {
    type: 'partial',
    label: 'Mostly ratio · some obiter',
    strength: 'Ratio on direct inducement; indirect procurement is obiter',
    citedAs: 'Knowledge and intention are required for inducing breach of contract.',
    actualRatio: 'The knowledge/intention requirement is ratio; the wider remarks on indirect procurement by unlawful means are obiter and were later refined in OBG.',
    note: 'Sound for the direct-inducement proposition. If relied on for indirect procurement, that part is obiter — flag the weaker weight.'
  },
  'cit-004': {
    type: 'aligned',
    label: 'Ratio aligned',
    strength: 'Binding ratio',
    citedAs: 'Recoverable loss is limited to what was within the parties\u2019 reasonable contemplation (two limbs).',
    actualRatio: 'The two-limb remoteness rule is the ratio of Hadley v Baxendale.',
    note: 'The foundational ratio, correctly applied.'
  },
  'cit-005': {
    type: 'obiter-weak',
    label: 'Cited point is obiter',
    strength: 'Plurality rationale — not the binding ratio',
    citedAs: 'Treated as binding authority that recoverability turns on a defendant\u2019s assumption of responsibility for the type of loss.',
    actualRatio: 'The result in The Achilleas is consistent with orthodox Hadley remoteness; Lord Hoffmann\u2019s assumption-of-responsibility rationale did not command the whole House and is best read as a plurality / obiter view rather than the ratio.',
    note: 'The proposition is real, but it rests on reasoning that was not the ratio of the decision — the authority is weaker than the skeleton presents it. Present it as persuasive, not settled.'
  },
  'cit-006': {
    type: 'aligned',
    label: 'Ratio aligned',
    strength: 'Binding ratio (HL)',
    citedAs: 'The guidelines governing the grant of interim injunctions (serious issue, adequacy of damages, balance of convenience).',
    actualRatio: 'Those guidelines are the ratio of American Cyanamid v Ethicon.',
    note: 'Cited for its binding guidelines — correct weight.'
  },
  'cit-007': {
    type: 'partial',
    label: 'Mostly ratio · first-instance gloss',
    strength: 'Persuasive (first instance)',
    citedAs: 'A court may weigh the relative merits when granting without-notice / interim relief.',
    actualRatio: 'Laddie J\u2019s merits-based reading is influential but is a first-instance gloss on Cyanamid, not a higher-court ratio.',
    note: 'Accurate, but note its weight: a first-instance decision read alongside the binding Cyanamid guidelines.'
  },
  'cit-008': {
    type: 'ratio-mismatch',
    label: 'Ratio mismatch',
    strength: 'Wrong limb of the holding',
    citedAs: 'Authority for recovering expectation damages for lost profits.',
    actualRatio: 'The ratio of Anglia Television v Reed is that a claimant may instead recover wasted (reliance) expenditure where expectation loss is hard to prove — it is a reliance-loss authority, not a lost-profits one.',
    note: 'The case is correct law but the skeleton has the ratio wrong: it is cited for a proposition (expectation / lost profits) that is the opposite of what the case actually decides (reliance loss).'
  },
  'cit-009': {
    type: 'ratio-mismatch',
    label: 'Ratio mismatch',
    strength: 'Different measure of damages',
    citedAs: 'Authority for ordinary lost-profit expectation damages.',
    actualRatio: 'The ratio of Wrotham Park is that, where an injunction is refused, damages may be assessed as the hypothetical fee for releasing the obligation (negotiating damages) — a distinct measure from ordinary expectation loss.',
    note: 'Right case, wrong ratio: negotiating damages are conceptually different from the lost-profit measure the skeleton relies on.'
  },
  'cit-010': {
    type: 'na',
    label: 'No ratio — unverified',
    strength: 'n/a',
    note: 'The authority could not be verified, so there is no holding to test ratio against.'
  },
  'cit-011': {
    type: 'na',
    label: 'No ratio — unverified',
    strength: 'n/a',
    note: 'Not found in any source checked; no ratio to assess.'
  },
  'cit-012': {
    type: 'na',
    label: 'No ratio — unverified',
    strength: 'n/a',
    note: 'Suspected fabrication; no holding exists to compare.'
  }
};
window.CCRatioMeta = {
  aligned: {
    hue: 'var(--verified)',
    bg: 'var(--verified-bg)',
    icon: 'check-circle',
    short: 'Ratio aligned'
  },
  partial: {
    hue: 'var(--mischar)',
    bg: 'var(--mischar-bg, var(--risk-high-bg))',
    icon: 'circle-slash',
    short: 'Partly ratio'
  },
  'obiter-weak': {
    hue: 'var(--mischar)',
    bg: 'var(--mischar-bg, var(--risk-high-bg))',
    icon: 'message-square-warning',
    short: 'Obiter — weaker'
  },
  'ratio-mismatch': {
    hue: 'var(--fabricated)',
    bg: 'var(--fabricated-bg)',
    icon: 'git-compare-arrows',
    short: 'Ratio mismatch'
  },
  na: {
    hue: 'var(--ash)',
    bg: 'var(--surface-bone)',
    icon: 'minus-circle',
    short: 'No ratio'
  }
};

/* Jurisdiction taxonomy — the UK is NOT one jurisdiction. */
window.CCJurMeta = {
  ew: {
    code: 'E&W',
    label: 'England & Wales',
    dot: 'var(--charcoal)',
    short: 'E&W'
  },
  sc: {
    code: 'Scot',
    label: 'Scotland',
    dot: 'var(--primary-deep)',
    short: 'Scotland'
  },
  ni: {
    code: 'NI',
    label: 'Northern Ireland',
    dot: 'var(--mischar)',
    short: 'N. Ireland'
  },
  pc: {
    code: 'PC',
    label: 'Privy Council · Commonwealth',
    dot: 'var(--ash)',
    short: 'Privy Council'
  },
  us: {
    code: 'US',
    label: 'United States',
    dot: 'var(--fabricated)',
    short: 'US (persuasive)'
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/data.js", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/flow.js
try { (() => {
/* Consistency Check — verification flow engine.
   Mirrors the two-stage decision flow:
     Stage 1 (internal corpus) → described correctly?  → Verified / Real-misused
     Stage 2 (external check)   → found? described?     → Externally-verified / Externally-real-misused / Likely-fabricated
   Firm guardrails (set pre-run) then route each leaf verdict to Pass or Review. */
(function () {
  const VERDICT = {
    'Verified': {
      stage: 'internal',
      status: 'Verified',
      tone: 'var(--verified)'
    },
    'Real, misused': {
      stage: 'internal',
      status: 'Mischaracterised',
      tone: 'var(--mischar)'
    },
    'Externally verified': {
      stage: 'external',
      status: 'Verified',
      tone: 'var(--verified)'
    },
    'Externally real, misused': {
      stage: 'external',
      status: 'Mischaracterised',
      tone: 'var(--mischar)'
    },
    'Not found': {
      stage: 'external',
      status: 'Fabricated',
      tone: 'var(--fabricated)'
    }
  };
  const EXTERNAL_CASE_SOURCES = ['CourtListener', 'Perplexity Live Search'];
  function matchOf(f) {
    return (window.CCData.corpus[f.id] || {}).match;
  }

  // Derive the leaf verdict + the decision path for a finding.
  function verdictOf(f) {
    const m = matchOf(f);
    const steps = [];
    let leaf;
    if (m === 'corpus') {
      steps.push({
        stage: 'Stage 1 · internal',
        q: 'Found in trusted corpus?',
        a: 'Yes — case in internal corpus',
        result: 'yes'
      });
      if (f.status === 'Verified') {
        steps.push({
          q: 'Claim matches the holding?',
          a: 'Yes — proposition supported',
          result: 'yes'
        });
        leaf = 'Verified';
      } else {
        steps.push({
          q: 'Claim matches the holding?',
          a: 'No — proposition not supported',
          result: 'no'
        });
        leaf = 'Real, misused';
      }
    } else {
      steps.push({
        stage: 'Stage 1 · internal',
        q: 'Found in trusted corpus?',
        a: 'No — not in internal corpus',
        result: 'no'
      });
      steps.push({
        stage: 'Stage 2 · external',
        q: 'Escalate to external check',
        a: 'Authoritative / open-source search',
        result: 'go'
      });
      if (m === 'external') {
        steps.push({
          q: 'Found in an approved external source?',
          a: 'Yes — source exists externally',
          result: 'yes'
        });
        if (f.status === 'Verified') {
          steps.push({
            q: 'Claim matches external text?',
            a: 'Yes — described correctly',
            result: 'yes'
          });
          leaf = 'Externally verified';
        } else {
          steps.push({
            q: 'Claim matches external text?',
            a: 'No — described incorrectly',
            result: 'no'
          });
          leaf = 'Externally real, misused';
        }
      } else {
        steps.push({
          q: 'Found in an approved external source?',
          a: 'No — absent from every source checked',
          result: 'no'
        });
        leaf = 'Not found';
      }
    }
    return {
      leaf,
      steps,
      meta: VERDICT[leaf]
    };
  }
  function externalSupported(g) {
    return EXTERNAL_CASE_SOURCES.some(s => g.trusted[s]);
  }
  const RISK_RANK = {
    Critical: 4,
    High: 3,
    Medium: 2,
    Low: 1
  };
  function jurisdictionOf(f) {
    const j = (window.CCData.analysis[f.id] || {}).jurisdiction || '';
    return {
      label: j,
      out: /\bUS\b|United States|\bEU\b|European/i.test(j),
      inUk: /England|Wales|United Kingdom|\bUK\b/i.test(j)
    };
  }

  // Apply firm guardrails → Pass or Review, with the reason for the flag.
  function disposition(f, g) {
    const {
      leaf,
      meta
    } = verdictOf(f);
    if (meta.stage === 'external' && !externalSupported(g)) {
      return {
        d: 'Review',
        leaf,
        reason: 'No approved external source enabled — manual check required'
      };
    }
    const jur = jurisdictionOf(f);
    if (jur.out && g.jurisdiction === 'flag') {
      return {
        d: 'Review',
        leaf,
        reason: 'Out-of-jurisdiction authority (' + jur.label + ') — flagged: persuasive only, not binding in E&W'
      };
    }
    switch (leaf) {
      case 'Verified':
        return {
          d: 'Pass',
          leaf,
          reason: 'Exists in corpus and correctly applied'
        };
      case 'Externally verified':
        return g.routeExtVerified === 'review' ? {
          d: 'Review',
          leaf,
          reason: 'Firm routes externally-verified citations to review'
        } : {
          d: 'Pass',
          leaf,
          reason: 'Confirmed in approved external source'
        };
      case 'Real, misused':
        return {
          d: 'Review',
          leaf,
          reason: 'Authority exists but is misapplied'
        };
      case 'Externally real, misused':
        return {
          d: 'Review',
          leaf,
          reason: 'External authority exists but is misapplied'
        };
      case 'Not found':
        return g.absent === 'ignore' ? {
          d: 'Pass',
          leaf,
          reason: 'Absent from checked sources — ignored per firm threshold'
        } : {
          d: 'Review',
          leaf,
          reason: 'Not found in any available source — suspected fabrication'
        };
      default:
        return {
          d: 'Review',
          leaf,
          reason: 'Needs review'
        };
    }
  }

  // Triage order — what to fix first against the clock (severity, then weakest fidelity).
  function triage(findings, g) {
    const items = findings.map(f => ({
      f,
      disp: disposition(f, g),
      min: (window.CCData.analysis[f.id] || {}).triageMin || 0
    })).filter(x => x.disp.d === 'Review').sort((a, b) => RISK_RANK[b.f.risk] - RISK_RANK[a.f.risk] || ((window.CCData.analysis[a.f.id] || {}).fidelity ?? 999) - ((window.CCData.analysis[b.f.id] || {}).fidelity ?? 999));
    return {
      items,
      totalMin: items.reduce((s, x) => s + x.min, 0),
      count: items.length
    };
  }
  function summary(findings, g) {
    const s = {
      total: findings.length,
      stage1Found: 0,
      stage1Escalate: 0,
      internalVerified: 0,
      internalMisused: 0,
      stage2Found: 0,
      stage2Absent: 0,
      extVerified: 0,
      extMisused: 0,
      fabricated: 0,
      pass: 0,
      review: 0
    };
    findings.forEach(f => {
      const {
        leaf
      } = verdictOf(f);
      if (leaf === 'Verified') {
        s.stage1Found++;
        s.internalVerified++;
      } else if (leaf === 'Real, misused') {
        s.stage1Found++;
        s.internalMisused++;
      } else if (leaf === 'Externally verified') {
        s.stage1Escalate++;
        s.stage2Found++;
        s.extVerified++;
      } else if (leaf === 'Externally real, misused') {
        s.stage1Escalate++;
        s.stage2Found++;
        s.extMisused++;
      } else {
        s.stage1Escalate++;
        s.stage2Absent++;
        s.fabricated++;
      }
      const disp = disposition(f, g);
      if (disp.d === 'Pass') s.pass++;else s.review++;
    });
    s.readyToFile = s.review === 0 ? 'Yes' : 'No';
    return s;
  }
  window.CCFlow = {
    verdictOf,
    disposition,
    summary,
    externalSupported,
    jurisdictionOf,
    triage,
    EXTERNAL_CASE_SOURCES
  };

  // Default firm guardrails — conservative base posture: anything short of clear
  // certainty is flagged. The lawyer can relax each control.
  window.CCDefaultGuardrails = {
    posture: 'conservative',
    routeExtVerified: 'review',
    // ext. verified → review
    absent: 'flag',
    // absent = flag (vs ignore)
    jurisdiction: 'flag',
    // out-of-jurisdiction → flag (vs persuasive / allow)
    trusted: {
      'CourtListener': true,
      'legislation.gov.uk': true,
      'EUR-Lex / CELLAR SPARQL': true,
      'Caselaw Access Project': true,
      'UK Supreme Court': true,
      'Perplexity Live Search': true
    }
  };

  // Named review postures the lawyer can pick at upload time.
  // Conservative is the safe base; Flexible relaxes the external-verified routing
  // (and treats out-of-jurisdiction authority as persuasive rather than a flag),
  // while STILL flagging suspected fabrications — that guardrail is never relaxed.
  window.CCPostures = {
    conservative: {
      key: 'conservative',
      label: 'Conservative',
      tag: 'recommended',
      blurb: 'Flag anything short of certainty. Externally-verified citations still go to a human, and out-of-jurisdiction authority is flagged.',
      rules: {
        routeExtVerified: 'review',
        absent: 'flag',
        jurisdiction: 'flag'
      }
    },
    flexible: {
      key: 'flexible',
      label: 'Flexible',
      tag: 'fewer reviews',
      blurb: 'Accept approved external sources without flagging, and treat foreign authority as persuasive. Suspected fabrications are always flagged.',
      rules: {
        routeExtVerified: 'pass',
        absent: 'flag',
        jurisdiction: 'persuasive'
      }
    }
  };
  // Build a full guardrails object for a posture, preserving the trusted-source list.
  window.CCGuardrailsForPosture = function (key, base) {
    const p = window.CCPostures[key] || window.CCPostures.conservative;
    const b = base || window.CCDefaultGuardrails;
    return {
      ...JSON.parse(JSON.stringify(b)),
      ...p.rules,
      posture: p.key
    };
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/flow.js", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/metrics.js
try { (() => {
/* Per-matter analytics. The live Crestholm matter derives every figure from
   the real findings + corpus + flow engine; the other three matters carry
   summarized figures so each one shows a full, distinct Insights view.
   Static demo workspace — no figures are computed from a live backend. */
(function () {
  // existence → x position on the risk map (in corpus / external / not found), kept off the axes
  const EXIST_X = {
    'confirmed-internal': 0.9,
    'confirmed-external': 0.58,
    'absent': 0.08
  };
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // Deterministic pseudo-spread so synthesized points look organic but stable.
  function jitter(seed, span) {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return (x - Math.floor(x) - 0.5) * span;
  }

  // Build scatter points from verdict buckets for non-live matters.
  function synthPoints(v, m, n, ext) {
    const pts = [];
    let k = 0;
    for (let i = 0; i < v; i++) {
      const isExt = i < ext;
      pts.push({
        id: 'v' + i,
        label: 'Verified authority',
        status: 'Verified',
        risk: 'Low',
        x: clamp((isExt ? 0.58 : 0.88) + jitter(k, isExt ? 0.06 : 0.1), 0.03, 0.95),
        y: clamp(90 + jitter(k + 7, 14), 4, 96),
        fidNull: false
      });
      k++;
    }
    for (let i = 0; i < m; i++) {
      pts.push({
        id: 'm' + i,
        label: 'Mischaracterised authority',
        status: 'Mischaracterised',
        risk: 'High',
        x: clamp(0.88 + jitter(k, 0.1), 0.03, 0.95),
        y: clamp(42 + jitter(k + 3, 22), 4, 96),
        fidNull: false
      });
      k++;
    }
    for (let i = 0; i < n; i++) {
      pts.push({
        id: 'n' + i,
        label: 'Not found',
        status: 'Fabricated',
        risk: 'Critical',
        x: clamp(0.08 + jitter(k, 0.05), 0.03, 0.2),
        y: clamp(7 + jitter(k + 1, 6), 4, 16),
        fidNull: true
      });
      k++;
    }
    return pts;
  }
  function pct(a, b) {
    return b ? Math.round(a / b * 100) : 0;
  }
  function normalize(raw) {
    const saved = Math.max(0, raw.manualMin - raw.assistedMin);
    return Object.assign({
      savedMin: saved,
      pctFaster: pct(saved, raw.manualMin),
      verifiedPct: pct(raw.verified, raw.total)
    }, raw);
  }

  // Live matter — everything from real data.
  function crestholm(g) {
    const F = window.CCData.findings;
    const A = window.CCData.analysis;
    const C = window.CCData.corpus;
    const sum = window.CCFlow.summary(F, g);
    const tri = window.CCFlow.triage(F, g);
    let internal = 0,
      external = 0,
      noneProv = 0;
    F.forEach(f => {
      const mm = (C[f.id] || {}).match;
      if (mm === 'corpus') internal++;else if (mm === 'external') external++;else noneProv++;
    });
    let uk = 0,
      foreign = 0,
      unresolved = 0;
    F.forEach(f => {
      const j = (A[f.id] || {}).jurisdiction || '';
      const m = (C[f.id] || {}).match;
      if (m === 'none' || /unresolved/i.test(j) || !j) unresolved++;else if (/\bUS\b|United States|Texas|\bEU\b|European/i.test(j)) foreign++;else uk++;
    });
    const existConfirmed = F.filter(f => /confirmed/.test((A[f.id] || {}).existence || '')).length;
    const fidVals = F.map(f => (A[f.id] || {}).fidelity).filter(v => v != null);
    const avgFid = Math.round(fidVals.reduce((s, v) => s + v, 0) / (fidVals.length || 1));
    const points = F.map((f, i) => {
      const a = A[f.id] || {};
      const m = (C[f.id] || {}).match;
      const baseX = EXIST_X[a.existence] != null ? EXIST_X[a.existence] : m === 'none' ? 0.08 : 0.9;
      const baseY = a.fidelity == null ? m === 'none' ? 7 : 50 : a.fidelity;
      const notFound = m === 'none';
      return {
        id: f.id,
        label: f.citation,
        status: f.status,
        risk: f.risk,
        x: clamp(baseX + jitter(i + 1, notFound ? 0.05 : 0.06), 0.03, 0.95),
        y: clamp(baseY + jitter(i + 9, notFound ? 5 : 5), 4, 96),
        fidNull: a.fidelity == null,
        flagged: window.CCFlow.disposition(f, g).d === 'Review'
      };
    });
    const manualMin = F.length * 18; // unaided: ~18 min to read, locate & verify each authority
    const assistedMin = tri.totalMin + sum.pass * 2; // assisted: triage the flagged + a 2-min confirm per pass

    return normalize({
      id: 'crestholm',
      live: true,
      total: F.length,
      verified: sum.internalVerified + sum.extVerified,
      mischar: sum.internalMisused + sum.extMisused,
      none: sum.fabricated,
      pass: sum.pass,
      review: sum.review,
      flagged: tri.count,
      flaggedMin: tri.totalMin,
      prov: {
        internal,
        external,
        none: noneProv
      },
      jur: {
        uk,
        foreign,
        unresolved
      },
      existConfirmed,
      avgFid,
      manualMin,
      assistedMin,
      points,
      health: window.CCData.scores.health,
      deadline: window.CCData.filing.deadline,
      status: 'Partner review'
    });
  }
  const STATIC = {
    penrose: {
      id: 'penrose',
      total: 9,
      verified: 9,
      mischar: 0,
      none: 0,
      pass: 9,
      review: 0,
      flagged: 0,
      flaggedMin: 0,
      prov: {
        internal: 7,
        external: 2,
        none: 0
      },
      jur: {
        uk: 9,
        foreign: 0,
        unresolved: 0
      },
      existConfirmed: 9,
      avgFid: 93,
      manualMin: 162,
      assistedMin: 20,
      health: 92,
      deadline: '—',
      status: 'Filed',
      points: synthPoints(9, 0, 0, 2)
    },
    harwell: {
      id: 'harwell',
      total: 14,
      verified: 13,
      mischar: 1,
      none: 0,
      pass: 13,
      review: 1,
      flagged: 1,
      flaggedMin: 10,
      prov: {
        internal: 11,
        external: 3,
        none: 0
      },
      jur: {
        uk: 12,
        foreign: 2,
        unresolved: 0
      },
      existConfirmed: 14,
      avgFid: 86,
      manualMin: 252,
      assistedMin: 38,
      health: 81,
      deadline: '—',
      status: 'Cleared',
      points: synthPoints(13, 1, 0, 3)
    },
    lockton: {
      id: 'lockton',
      total: 7,
      verified: 4,
      mischar: 2,
      none: 1,
      pass: 4,
      review: 3,
      flagged: 3,
      flaggedMin: 34,
      prov: {
        internal: 4,
        external: 2,
        none: 1
      },
      jur: {
        uk: 5,
        foreign: 1,
        unresolved: 1
      },
      existConfirmed: 6,
      avgFid: 71,
      manualMin: 126,
      assistedMin: 46,
      health: 64,
      deadline: '15:30',
      status: 'In review',
      points: synthPoints(4, 2, 1, 2)
    }
  };
  window.CCMetrics = function (projectId, guardrails) {
    if (projectId === 'crestholm') return crestholm(guardrails || window.CCDefaultGuardrails);
    const raw = STATIC[projectId];
    return raw ? normalize(raw) : null;
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/metrics.js", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/shared.jsx
try { (() => {
/* Shared icon helper + small primitives for the Consistency Check UI kit. */
const {
  useRef,
  useEffect
} = React;

/** Lucide icon by name. Inherits currentColor; 1.75 stroke. */
function Icon({
  name,
  size = 16,
  stroke = 1.75,
  style = {}
}) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.lucide) return;
    ref.current.innerHTML = '';
    const el = document.createElement('i');
    el.setAttribute('data-lucide', name);
    ref.current.appendChild(el);
    window.lucide.createIcons({
      attrs: {
        width: size,
        height: size,
        'stroke-width': stroke
      },
      root: ref.current
    });
  }, [name, size, stroke]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      lineHeight: 0,
      ...style
    }
  });
}

/** Section eyebrow label. */
function Overline({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: dark ? 'var(--on-dark-mute)' : 'var(--mute)',
      ...style
    }
  }, children);
}

/** Small key/value metadata pair used in the case header. */
function Meta({
  label,
  children,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--ash)',
      whiteSpace: 'nowrap'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 14,
      color: accent || 'var(--ink)'
    }
  }, children));
}
window.CCIcon = Icon;
window.CCOverline = Overline;
window.CCMeta = Meta;

/** Authoritative public-record verification link(s) for a finding,
 *  keyed by jurisdiction + citation. Used across modal, drawer & report
 *  so any reader can independently re-check an authority. */
window.CCVerify = function (finding) {
  const a = window.CCData.analysis && window.CCData.analysis[finding.id] || {};
  const jur = (a.jurisdiction || '').toLowerCase();
  const cit = finding.citation || '';
  const q = encodeURIComponent(cit);
  const isUS = /united states|\bus\b|u\.s\.|tex|american|delaware|new york/.test(jur) || /\bS\.?W\.?2d\b|Tex App|F\.?\dd|U\.?S\.?\s/.test(cit);
  const isEU = /\beu\b|european union|cjeu|euro/.test(jur);
  if (isUS) return [{
    label: 'CourtListener',
    url: 'https://www.courtlistener.com/?q=' + q,
    host: 'courtlistener.com'
  }, {
    label: 'Caselaw Access',
    url: 'https://case.law/search/#/cases?search=' + q,
    host: 'case.law'
  }];
  if (isEU) return [{
    label: 'EUR-Lex',
    url: 'https://eur-lex.europa.eu/search.html?type=quick&text=' + q,
    host: 'eur-lex.europa.eu'
  }];
  return [{
    label: 'Google Scholar',
    url: 'https://scholar.google.com/scholar?q=' + q,
    host: 'scholar.google.com'
  }, {
    label: 'CourtListener',
    url: 'https://www.courtlistener.com/?q=' + q,
    host: 'courtlistener.com'
  }];
};

/* ---- dynamic-effect + visual helpers ---- */
const {
  useState: _uS,
  useEffect: _uE,
  useRef: _uR
} = React;

// Verdict display labels — honest framing ("Not found" not "Fabricated").
window.CCVerdictLabel = status => ({
  Verified: 'Verified',
  Mischaracterised: 'Mischaracterised',
  Fabricated: 'Not found'
})[status] || status;

// Number that counts up on mount.
function CountUp({
  value,
  duration = 700,
  format = v => v,
  style
}) {
  const [n, setN] = _uS(0);
  _uE(() => {
    let raf,
      start,
      done = false;
    const tgt = Number(value) || 0;
    const finish = () => {
      if (!done) {
        done = true;
        setN(tgt);
      }
    };
    const step = t => {
      if (done) return;
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      setN(tgt * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);else finish();
    };
    raf = requestAnimationFrame(step);
    const fb = setTimeout(finish, duration + 140); // snaps to final even if rAF is paused (backgrounded tab / capture)
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fb);
    };
  }, [value]);
  return /*#__PURE__*/React.createElement("span", {
    style: style
  }, format(Math.round(n)));
}
window.CCCountUp = CountUp;

// Staggered fade-up wrapper.
window.CCReveal = ({
  i = 0,
  delay = 0,
  children,
  style = {}
}) => /*#__PURE__*/React.createElement("div", {
  className: "cc-reveal",
  style: {
    animationDelay: (delay || i * 70) + 'ms',
    ...style
  }
}, children);

// Live ticking value (seconds remaining), for the filing countdown.
window.CCUseCountdown = startSeconds => {
  const [s, setS] = _uS(startSeconds);
  _uE(() => {
    const t = setInterval(() => setS(x => x > 0 ? x - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);
  return s;
};

// Two-axis decomposition: Existence (deterministic) + Fidelity (model judgment).
window.CCTwoAxis = ({
  id,
  compact = false
}) => {
  const a = (window.CCData.analysis || {})[id] || {};
  const EX = {
    'confirmed-internal': {
      label: 'Confirmed',
      sub: 'deterministic corpus match',
      hue: 'var(--verified)',
      icon: 'shield-check',
      certain: true
    },
    'confirmed-external': {
      label: 'Confirmed',
      sub: 'open-web search · outside corpus',
      hue: 'var(--verified)',
      icon: 'globe',
      certain: true
    },
    'absent': {
      label: 'Not found',
      sub: 'absent from every source checked',
      hue: 'var(--fabricated)',
      icon: 'shield-alert',
      certain: false
    }
  }[a.existence] || {
    label: '—',
    sub: '',
    hue: 'var(--mute)'
  };
  const fid = a.fidelity;
  const fhue = fid == null ? 'var(--stone)' : fid >= 80 ? 'var(--verified)' : fid >= 60 ? 'var(--mischar)' : 'var(--fabricated)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      padding: '11px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, "Existence"), /*#__PURE__*/React.createElement(Icon, {
    name: EX.icon,
    size: 14,
    style: {
      color: EX.hue
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 15,
      color: EX.hue,
      marginTop: 6
    }
  }, EX.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--mute)',
      marginTop: 2
    }
  }, EX.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)',
      marginTop: 6
    }
  }, EX.certain ? 'Near-deterministic' : 'Bounded to checked sources')), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-md)',
      padding: '11px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--overline)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--mute)'
    }
  }, "Fidelity"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--code-sm)',
      color: fhue
    }
  }, fid == null ? 'N/A' : fid + '%')), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--caption-strong)',
      fontSize: 15,
      color: fhue,
      marginTop: 6
    }
  }, a.fidelityLabel || '—'), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 3,
      background: 'var(--hairline)',
      marginTop: 8,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: (fid == null ? 0 : fid) + '%',
      background: fhue,
      borderRadius: 3,
      transformOrigin: 'left',
      animation: 'ccGrowX 600ms ease'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--code-sm)',
      color: 'var(--ash)',
      marginTop: 6
    }
  }, "Model judgment")));
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consistency-check/treatment.js
try { (() => {
/* Consistency Check — citation treatment / triangulation layer.
   The primary judgment is the ultimate authority for "is the holding-claim correct".
   This layer adds the SECONDARY signal a lawyer uses to triangulate good law:
   how the authority has been treated across the corpus (applied / considered /
   distinguished / doubted / overruled), and what that pattern implies.

   Every citing case below is a real authority from the provided UK/Commonwealth
   corpus or the Source Library; the cross-citations are genuine relationships
   (e.g. OBG v Allan re-affirming Lumley v Gye; The Achilleas qualifying Hadley
   v Baxendale; One Step v Morris-Garner narrowing Wrotham Park).

   signal taxonomy (Bernard's four scenarios):
     settled     — exists + applied consistently in the same way   → triangulation reinforces
     developing  — exists + applied but refined/qualified over time → correct, evolving
     contested   — exists + cited divergently (applied vs doubted)  → correct, but FLAG
     isolated    — exists but no corpus cross-citation              → not yet triangulated
     corroborated— treatment INDEPENDENTLY contradicts the brief's use (mischaracterised)
     confabulation— not found, but the proposition maps onto real dicta the draft drifted from
*/
window.CCData.treatment = {
  // ── Verified, well-triangulated ──────────────────────────────────────────
  'cit-001': {
    signal: 'settled',
    citingCount: 4,
    summary: 'Applied as the foundational authority for accessory liability in four later corpus cases — consistently, and without contradiction. Strong triangulation: the brief uses it for exactly the proposition the line of cases settles.',
    citedBy: [{
      case: 'OBG Ltd v Allan',
      citation: '[2007] UKHL 21',
      court: 'House of Lords',
      treatment: 'applied',
      point: 'Lord Hoffmann and Lord Nicholls re-affirmed Lumley as the genus tort of inducing breach, restoring it after a period of doctrinal drift.',
      para: '[1], [32]–[44]'
    }, {
      case: 'Quinn v Leathem',
      citation: '[1901] AC 495',
      court: 'House of Lords',
      treatment: 'applied',
      point: 'Approved and extended the Lumley principle to interference effected by unlawful means.'
    }, {
      case: 'DC Thomson & Co Ltd v Deakin',
      citation: '[1952] Ch 646',
      court: 'Court of Appeal',
      treatment: 'considered',
      point: 'Carried the principle into indirect procurement, requiring knowledge of the contract and unlawful means.'
    }, {
      case: 'Allen v Flood',
      citation: '[1898] AC 1',
      court: 'House of Lords',
      treatment: 'distinguished',
      point: 'Confined Lumley: no liability for intentional harm by lawful means absent a procured breach.'
    }],
    ratio: {
      binding: true,
      note: 'The existence of the tort is ratio in Lumley itself and re-affirmed as ratio in OBG v Allan. The brief relies on it for precisely that binding proposition.'
    }
  },
  'cit-002': {
    signal: 'settled',
    citingCount: 2,
    summary: 'The modern apex restatement of the economic torts. Applied without dissent in the corpus authorities that follow it — a current, settled foundation.',
    citedBy: [{
      case: 'HM Revenue & Customs v Total Network SL',
      citation: '[2008] UKHL 19',
      court: 'House of Lords',
      treatment: 'applied',
      point: "Adopted OBG's unlawful-means framework when analysing unlawful-means conspiracy.",
      para: '[43]–[45]'
    }, {
      case: 'Meretz Investments NV v ACP Ltd',
      citation: '[2007] EWCA Civ 1303',
      court: 'Court of Appeal',
      treatment: 'applied',
      point: "Applied OBG's separation of the inducing-breach tort from the unlawful-means tort."
    }],
    ratio: {
      binding: true,
      note: "OBG's two-tort taxonomy is ratio. The brief invokes it for that distinction — on point."
    }
  },
  'cit-003': {
    signal: 'developing',
    citingCount: 1,
    summary: "Sound authority, but its reasoning has been partly absorbed. OBG v Allan reorganised the economic torts and folded aspects of Thomson's 'indirect interference' analysis into the unlawful-means tort — so parts of it no longer stand wholly independently.",
    citedBy: [{
      case: 'OBG Ltd v Allan',
      citation: '[2007] UKHL 21',
      court: 'House of Lords',
      treatment: 'considered',
      point: "Re-characterised Thomson's indirect-procurement reasoning within the unified unlawful-means framework; the result survives, the route was re-cast.",
      para: '[36]–[39]'
    }],
    ratio: {
      binding: true,
      note: 'The knowledge + unlawful-means requirement remains good law; read it through the OBG lens rather than in isolation.'
    }
  },
  'cit-004': {
    signal: 'developing',
    citingCount: 3,
    summary: 'The remoteness rule is bedrock and heavily triangulated — but live. Applied repeatedly, then qualified by The Achilleas. Strong support, with one material gloss the draft should acknowledge.',
    citedBy: [{
      case: 'Czarnikow Ltd v Koufos (The Heron II)',
      citation: '[1969] 1 AC 350',
      court: 'House of Lords',
      treatment: 'applied',
      point: "Refined the second limb to a 'not unlikely to result' standard of contemplation."
    }, {
      case: 'H Parsons (Livestock) Ltd v Uttley Ingham & Co',
      citation: '[1978] QB 791',
      court: 'Court of Appeal',
      treatment: 'applied',
      point: 'Applied the type-of-loss approach: foreseeability attaches to the type of loss, not its extent.'
    }, {
      case: 'Transfield Shipping v Mercator (The Achilleas)',
      citation: '[2008] UKHL 48',
      court: 'House of Lords',
      treatment: 'distinguished',
      point: 'Overlaid an assumption-of-responsibility filter, so a foreseeable loss may still be too remote where market understanding would not place that risk on the defendant.',
      para: '[9], [21]–[23]'
    }],
    ratio: {
      binding: true,
      note: 'The two-limb test is ratio. Whether the Achilleas assumption-of-responsibility gloss is itself ratio or a narrow exception is the open question — see cit-005.'
    }
  },
  'cit-005': {
    signal: 'contested',
    citingCount: 2,
    summary: 'The authority exists and is correctly named — but its ratio is genuinely unsettled. The House of Lords split on the reasoning, and later cases have read it narrowly. This is exactly why the brief is flagged "review wording": the wide principle it leans on may be the contested, not the binding, reading.',
    citedBy: [{
      case: 'Transfield (The Achilleas) — within the decision',
      citation: '[2008] UKHL 48',
      court: 'House of Lords',
      treatment: 'doubted',
      point: 'Internally divergent: Lord Hoffmann decided on assumption of responsibility; Lords Rodger and Baroness Hale reached the same result on orthodox Hadley grounds — leaving which rationale is binding unclear.',
      para: '[11]–[15] cf [60]–[63]'
    }, {
      case: 'Sylvia Shipping Co v Progress Bulk Carriers',
      citation: '[2010] EWHC 542 (Comm)',
      court: 'Commercial Court',
      treatment: 'distinguished',
      point: 'Read The Achilleas narrowly — assumption of responsibility is an exception for unusual cases, not a general re-writing of Hadley.',
      external: true
    }],
    ratio: {
      binding: null,
      note: 'Whether the assumption-of-responsibility principle is ratio or obiter is itself disputed across the bench and later cases. The deepest fidelity question here — ratio vs dicta — is roadmap, not yet automated.',
      roadmap: true
    }
  },
  'cit-006': {
    signal: 'settled',
    citingCount: 1,
    summary: 'The standard interim-injunction test, settled for 50 years. One corpus authority glosses it — Series 5 Software — which is itself relied on later in this very brief (cit-007).',
    citedBy: [{
      case: 'Series 5 Software Ltd v Clarke',
      citation: '[1996] 1 All ER 853',
      court: 'Chancery Division',
      treatment: 'considered',
      point: 'Laddie J read American Cyanamid as permitting a limited assessment of the relative merits where the evidence credibly allows it.',
      external: true
    }],
    ratio: {
      binding: true,
      note: 'Serious-question-to-be-tried + balance of convenience is ratio and undisturbed. The brief states it correctly.'
    }
  },
  'cit-007': {
    signal: 'isolated',
    citingCount: 0,
    summary: 'Confirmed on open-web search but outside the curated corpus — and no in-corpus authority cites it, so it cannot yet be triangulated. Promoting it into the Source Library would let future matters cross-check it deterministically rather than re-running an open-web search.',
    citedBy: [],
    ratio: {
      binding: null,
      note: 'Outside the corpus; treatment unknown to this system. Verify the quotation and procedural context against the judgment before filing.'
    }
  },
  // ── Mischaracterised — treatment INDEPENDENTLY corroborates the flag ──────
  'cit-008': {
    signal: 'corroborated',
    citingCount: 3,
    summary: 'The decisive secondary check. Across the corpus, Anglia v Reed is cited uniformly for RELIANCE loss — never once for the expectation / lost-profit proposition the brief advances. The treatment pattern independently corroborates the mischaracterisation flag: the case is real and good law, but for a different measure of damages.',
    citedBy: [{
      case: 'C & P Haulage v Middleton',
      citation: '[1983] 1 WLR 1461',
      court: 'Court of Appeal',
      treatment: 'applied',
      point: 'Applied Anglia for reliance loss — and held a claimant cannot use reliance damages to escape a bad bargain. Squarely a reliance-measure authority.'
    }, {
      case: 'Doyle v Olby (Ironmongers) Ltd',
      citation: '[1969] 2 QB 158',
      court: 'Court of Appeal',
      treatment: 'considered',
      point: 'Reliance/out-of-pocket measure in deceit — the same family of loss as Anglia, not expectation.'
    }, {
      case: 'East v Maurer',
      citation: '[1991] 1 WLR 461',
      court: 'Court of Appeal',
      treatment: 'considered',
      point: 'Lost-opportunity reliance measure; again, not the expectation/lost-profit basis the brief asserts.'
    }],
    ratio: {
      binding: true,
      note: "Denning MR's reliance-loss holding is the ratio. The brief cites the case for expectation loss — a proposition that is neither its ratio nor its dicta."
    }
  },
  'cit-009': {
    signal: 'corroborated',
    citingCount: 2,
    summary: 'Triangulation contradicts the brief twice over. Every corpus treatment places Wrotham Park in the negotiating-damages line — and the Supreme Court in One Step has since narrowed it expressly. It is not, and after One Step plainly cannot be, authority for ordinary lost-profit expectation damages.',
    citedBy: [{
      case: 'One Step (Support) Ltd v Morris-Garner',
      citation: '[2018] UKSC 20',
      court: 'UK Supreme Court',
      treatment: 'doubted',
      point: "Re-characterised 'Wrotham Park damages' as negotiating damages and confined them — emphatically NOT a route to ordinary lost-profit expectation damages.",
      para: '[91]–[95]'
    }, {
      case: 'Pell Frischmann Engineering v Bow Valley Iran',
      citation: '[2009] UKPC 45',
      court: 'Privy Council',
      treatment: 'applied',
      point: 'Applied Wrotham Park to assess a negotiating / release-fee award for breach of an exclusivity obligation.',
      external: true
    }],
    ratio: {
      binding: true,
      note: 'The release-fee / negotiating measure is the ratio, narrowed by One Step. The brief relies on it for a measure the line of authority excludes.'
    }
  },
  // ── Not found — confabulation trace (scenario 4) ─────────────────────────
  'cit-010': {
    signal: 'confabulation',
    citingCount: 0,
    summary: 'No such case exists in any source checked — that verdict stands. But its stated proposition maps cleanly onto well-settled dicta in real authorities, which is how the error most likely arose: a plausible-sounding name confabulated around a genuine principle the draft had seen cross-cited.',
    citedBy: [{
      case: 'OBG Ltd v Allan',
      citation: '[2007] UKHL 21',
      court: 'House of Lords',
      treatment: 'source-of-drift',
      point: 'The proposition the passage needs — interference with commercial and contractual relations — is governed by OBG. The likely real authority the draft drifted from.'
    }, {
      case: 'Lumley v Gye',
      citation: '(1853) 2 E & B 216',
      court: "Queen's Bench",
      treatment: 'source-of-drift',
      point: 'The root authority for the inducing-breach principle the fabricated case was invented to support.'
    }],
    ratio: {
      binding: false,
      note: 'There is no judgment to read. Use the real authorities above; do not cite the fabricated name.'
    }
  },
  'cit-011': {
    signal: 'confabulation',
    citingCount: 0,
    summary: 'Unverifiable — and the party names appear synthetic. Its proposition (recovery of procurement and investment loss) tracks the established pure-economic-loss line, the likely source the draft drifted from.',
    citedBy: [{
      case: 'Hedley Byrne & Co Ltd v Heller & Partners Ltd',
      citation: '[1964] AC 465',
      court: 'House of Lords',
      treatment: 'source-of-drift',
      point: 'The genuine route to recovering pure financial / investment loss — negligent misstatement on an assumption of responsibility.'
    }],
    ratio: {
      binding: false,
      note: 'No judgment exists to verify. Rely on Hedley Byrne for the underlying proposition.'
    }
  },
  'cit-012': {
    signal: 'confabulation',
    citingCount: 0,
    summary: 'Not found in any source available here; treat as suspected fabrication. The consequential supply-chain proposition it is cited for is governed by the remoteness line — the principle the draft most likely generalised from.',
    citedBy: [{
      case: 'Czarnikow Ltd v Koufos (The Heron II)',
      citation: '[1969] 1 AC 350',
      court: 'House of Lords',
      treatment: 'source-of-drift',
      point: 'Controls recoverability of consequential loss on a commercial supply contract — remoteness measured by what was "not unlikely" to result.'
    }],
    ratio: {
      binding: false,
      note: 'No judgment to read. The genuine authority for the proposition is The Heron II.'
    }
  }
};

/* Signal + treatment visual metadata, plus a triangulation summary helper. */
window.CCTreatmentMeta = {
  signal: {
    settled: {
      label: 'Settled',
      hue: 'var(--verified)',
      bg: 'var(--verified-bg)',
      icon: 'shield-check',
      blurb: 'applied consistently'
    },
    developing: {
      label: 'Developing',
      hue: 'var(--primary-deep)',
      bg: 'var(--primary-soft)',
      icon: 'route',
      blurb: 'applied, then refined'
    },
    contested: {
      label: 'Contested',
      hue: 'var(--mischar)',
      bg: 'var(--mischar-bg)',
      icon: 'split',
      blurb: 'divergent treatment'
    },
    isolated: {
      label: 'Not triangulated',
      hue: 'var(--charcoal)',
      bg: 'var(--surface-bone)',
      icon: 'circle-dashed',
      blurb: 'no corpus cross-cites'
    },
    corroborated: {
      label: 'Corroborates flag',
      hue: 'var(--mischar)',
      bg: 'var(--mischar-bg)',
      icon: 'target',
      blurb: 'treatment contradicts the brief'
    },
    confabulation: {
      label: 'Confabulation trace',
      hue: 'var(--fabricated)',
      bg: 'var(--fabricated-bg)',
      icon: 'git-branch',
      blurb: 'maps onto real dicta'
    }
  },
  treatment: {
    applied: {
      label: 'Applied',
      hue: 'var(--verified)',
      bg: 'var(--verified-bg)',
      icon: 'check'
    },
    followed: {
      label: 'Followed',
      hue: 'var(--verified)',
      bg: 'var(--verified-bg)',
      icon: 'check'
    },
    considered: {
      label: 'Considered',
      hue: 'var(--charcoal)',
      bg: 'var(--surface-bone)',
      icon: 'eye'
    },
    distinguished: {
      label: 'Distinguished',
      hue: 'var(--mischar)',
      bg: 'var(--mischar-bg)',
      icon: 'git-fork'
    },
    doubted: {
      label: 'Doubted',
      hue: 'var(--primary-deep)',
      bg: 'var(--primary-soft)',
      icon: 'help-circle'
    },
    overruled: {
      label: 'Overruled',
      hue: 'var(--fabricated)',
      bg: 'var(--fabricated-bg)',
      icon: 'x'
    },
    'source-of-drift': {
      label: 'Likely source',
      hue: 'var(--fabricated)',
      bg: 'var(--fabricated-bg)',
      icon: 'git-branch'
    }
  }
};

/* Per-signal one-line verdict used in the table row + report. */
window.CCTreatmentVerdict = function (id) {
  const t = (window.CCData.treatment || {})[id];
  if (!t) return null;
  const m = window.CCTreatmentMeta.signal[t.signal] || {};
  const n = t.citingCount || 0;
  const cited = n === 0 ? 'no corpus cites' : n + ' corpus cite' + (n === 1 ? '' : 's');
  return {
    signal: t.signal,
    label: m.label,
    hue: m.hue,
    bg: m.bg,
    icon: m.icon,
    blurb: m.blurb,
    citingCount: n,
    citedText: cited
  };
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consistency-check/treatment.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.FilterChip = __ds_scope.FilterChip;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.HealthMeter = __ds_scope.HealthMeter;

__ds_ns.RiskBadge = __ds_scope.RiskBadge;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatCard = __ds_scope.StatCard;

})();
