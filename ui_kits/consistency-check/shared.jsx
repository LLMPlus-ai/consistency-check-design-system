/* Shared icon helper + small primitives for the Consistency Check UI kit. */
const { useRef, useEffect } = React;

/** Lucide icon by name. Inherits currentColor; 1.75 stroke. */
function Icon({ name, size = 16, stroke = 1.75, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.lucide) return;
    ref.current.innerHTML = '';
    const el = document.createElement('i');
    el.setAttribute('data-lucide', name);
    ref.current.appendChild(el);
    window.lucide.createIcons({ attrs: { width: size, height: size, 'stroke-width': stroke }, root: ref.current });
  }, [name, size, stroke]);
  return <span ref={ref} style={{ display: 'inline-flex', lineHeight: 0, ...style }} />;
}

/** Section eyebrow label. */
function Overline({ children, dark = false, style = {} }) {
  return (
    <div style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.12em', color: dark ? 'var(--on-dark-mute)' : 'var(--mute)', ...style }}>
      {children}
    </div>
  );
}

/** Small key/value metadata pair used in the case header. */
function Meta({ label, children, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ash)', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ font: 'var(--caption-strong)', fontSize: 14, color: accent || 'var(--ink)' }}>{children}</span>
    </div>
  );
}

window.CCIcon = Icon;
window.CCOverline = Overline;
window.CCMeta = Meta;

/** Authoritative public-record verification link(s) for a finding,
 *  keyed by jurisdiction + citation. Used across modal, drawer & report
 *  so any reader can independently re-check an authority. */
window.CCVerify = function (finding) {
  const a = (window.CCData.analysis && window.CCData.analysis[finding.id]) || {};
  const jur = (a.jurisdiction || '').toLowerCase();
  const cit = finding.citation || '';
  const q = encodeURIComponent(cit);
  const isUS = /united states|\bus\b|u\.s\.|tex|american|delaware|new york/.test(jur) || /\bS\.?W\.?2d\b|Tex App|F\.?\dd|U\.?S\.?\s/.test(cit);
  const isEU = /\beu\b|european union|cjeu|euro/.test(jur);
  if (isUS) return [
    { label: 'CourtListener', url: 'https://www.courtlistener.com/?q=' + q, host: 'courtlistener.com' },
    { label: 'Caselaw Access', url: 'https://case.law/search/#/cases?search=' + q, host: 'case.law' },
  ];
  if (isEU) return [{ label: 'EUR-Lex', url: 'https://eur-lex.europa.eu/search.html?type=quick&text=' + q, host: 'eur-lex.europa.eu' }];
  return [
    { label: 'Google Scholar', url: 'https://scholar.google.com/scholar?q=' + q, host: 'scholar.google.com' },
    { label: 'CourtListener', url: 'https://www.courtlistener.com/?q=' + q, host: 'courtlistener.com' },
  ];
};

/* ---- dynamic-effect + visual helpers ---- */
const { useState: _uS, useEffect: _uE, useRef: _uR } = React;

// Verdict display labels — honest framing ("Not found" not "Fabricated").
window.CCVerdictLabel = (status) => ({ Verified: 'Verified', Mischaracterised: 'Mischaracterised', Fabricated: 'Not found' }[status] || status);

// Number that counts up on mount.
function CountUp({ value, duration = 700, format = (v) => v, style }) {
  const [n, setN] = _uS(0);
  _uE(() => {
    let raf, start, done = false;
    const tgt = Number(value) || 0;
    const finish = () => { if (!done) { done = true; setN(tgt); } };
    const step = (t) => { if (done) return; if (!start) start = t; const p = Math.min(1, (t - start) / duration); setN(tgt * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(step); else finish(); };
    raf = requestAnimationFrame(step);
    const fb = setTimeout(finish, duration + 140); // snaps to final even if rAF is paused (backgrounded tab / capture)
    return () => { cancelAnimationFrame(raf); clearTimeout(fb); };
  }, [value]);
  return <span style={style}>{format(Math.round(n))}</span>;
}
window.CCCountUp = CountUp;

// Staggered fade-up wrapper.
window.CCReveal = ({ i = 0, delay = 0, children, style = {} }) =>
  <div className="cc-reveal" style={{ animationDelay: (delay || i * 70) + 'ms', ...style }}>{children}</div>;

// Live ticking value (seconds remaining), for the filing countdown.
window.CCUseCountdown = (startSeconds) => {
  const [s, setS] = _uS(startSeconds);
  _uE(() => { const t = setInterval(() => setS((x) => (x > 0 ? x - 1 : 0)), 1000); return () => clearInterval(t); }, []);
  return s;
};

// Two-axis decomposition: Existence (deterministic) + Fidelity (model judgment).
window.CCTwoAxis = ({ id, compact = false }) => {
  const a = (window.CCData.analysis || {})[id] || {};
  const EX = {
    'confirmed-internal': { label: 'Confirmed', sub: 'deterministic corpus match', hue: 'var(--verified)', icon: 'shield-check', certain: true },
    'confirmed-external': { label: 'Confirmed', sub: 'open-web search · outside corpus', hue: 'var(--verified)', icon: 'globe', certain: true },
    'absent': { label: 'Not found', sub: 'absent from every source checked', hue: 'var(--fabricated)', icon: 'shield-alert', certain: false },
  }[a.existence] || { label: '—', sub: '', hue: 'var(--mute)' };
  const fid = a.fidelity;
  const fhue = fid == null ? 'var(--stone)' : fid >= 80 ? 'var(--verified)' : fid >= 60 ? 'var(--mischar)' : 'var(--fabricated)';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '11px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Existence</span>
          <Icon name={EX.icon} size={14} style={{ color: EX.hue }} />
        </div>
        <div style={{ font: 'var(--caption-strong)', fontSize: 15, color: EX.hue, marginTop: 6 }}>{EX.label}</div>
        <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 2 }}>{EX.sub}</div>
        <div style={{ font: 'var(--code-sm)', color: 'var(--ash)', marginTop: 6 }}>{EX.certain ? 'Near-deterministic' : 'Bounded to checked sources'}</div>
      </div>
      <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '11px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--mute)' }}>Fidelity</span>
          <span style={{ font: 'var(--code-sm)', color: fhue }}>{fid == null ? 'N/A' : fid + '%'}</span>
        </div>
        <div style={{ font: 'var(--caption-strong)', fontSize: 15, color: fhue, marginTop: 6 }}>{a.fidelityLabel || '—'}</div>
        <div style={{ height: 6, borderRadius: 3, background: 'var(--hairline)', marginTop: 8, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: (fid == null ? 0 : fid) + '%', background: fhue, borderRadius: 3, transformOrigin: 'left', animation: 'ccGrowX 600ms ease' }} />
        </div>
        <div style={{ font: 'var(--code-sm)', color: 'var(--ash)', marginTop: 6 }}>Model judgment</div>
      </div>
    </div>
  );
};
