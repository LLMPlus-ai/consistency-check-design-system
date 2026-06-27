/* Document workspace — DocuSign-style working editor.
   LEFT  = the working document (editable, tracked changes).
   RIGHT = the verification report as supporting guidance + per-case checklist.
   The document is the working copy; the report guides which edits to make. */
const { Card: WCard, StatusBadge: WStatus, RiskBadge: WRisk, Button: WBtn, IconButton: WIconBtn } = window.ConsistencyCheckDesignSystem_77c3a7;
const { CCIcon: WIcon, CCOverline: WOverline } = window;
const { useState: wState, useRef: wRef } = React;

const W_HUE = { Verified: 'var(--verified)', Mischaracterised: 'var(--mischar)', Fabricated: 'var(--fabricated)' };
const W_BG = { Verified: 'var(--verified-bg)', Mischaracterised: 'var(--mischar-bg)', Fabricated: 'var(--fabricated-bg)' };
const CHECK_STYLE = {
  pass: { icon: 'check', hue: 'var(--verified)' },
  warn: { icon: 'alert-triangle', hue: 'var(--mischar)' },
  fail: { icon: 'x', hue: 'var(--fabricated)' },
  na: { icon: 'minus', hue: 'var(--stone)' },
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
  return [
    { k: 'Case exists & is real', s: absent ? 'fail' : 'pass', note: absent ? 'Not found in any source checked' : (ext ? 'Confirmed on open-web search' : 'Matched in the provided corpus') },
    { k: 'Correct jurisdiction', s: absent ? 'na' : (foreign ? 'warn' : 'pass'), note: absent ? '—' : (foreign ? (a.jurisdiction + ' — persuasive only, not binding in E&W') : (a.jurisdiction || 'England & Wales')) },
    { k: 'Contextual grounding', s: absent ? 'fail' : (ext ? 'warn' : 'pass'), note: absent ? 'No court or holding to ground the cite' : (c.court ? c.court + (c.neutral ? ' · ' + c.neutral : '') : 'Limited context') },
    { k: 'Timeline · still good law', s: absent ? 'na' : 'pass', note: absent ? '—' : 'No overruling or negative treatment found' },
    { k: 'Still a valid authority', s: absent ? 'fail' : 'pass', note: absent ? 'Cannot be relied upon — unverifiable' : (mis ? 'Valid authority — but for a different proposition' : 'Good law as cited') },
    { k: 'Applied in the correct context', s: absent ? 'na' : (ver ? 'pass' : 'fail'), note: ver ? 'Proposition matches the holding' : (mis ? 'Overreaches — ' + (f.actualAuthority || 'used beyond what it supports') : 'Authority unverifiable') },
    { k: 'Not miscontextualised', s: absent ? 'na' : (ver ? 'pass' : 'fail'), note: ver ? 'Used as the court used it' : (mis ? 'Distinguish: the judgment supports a narrower / different point' : 'N/A') },
  ];
}

function CheckRow({ c }) {
  const st = CHECK_STYLE[c.s] || CHECK_STYLE.na;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '7px 0', borderTop: '1px solid var(--hairline)' }}>
      <span style={{ width: 18, height: 18, borderRadius: '50%', background: c.s === 'na' ? 'var(--surface-bone)' : st.hue + '22', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', marginTop: 1 }}><WIcon name={st.icon} size={12} style={{ color: st.hue }} /></span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ display: 'block', font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)' }}>{c.k}</span>
        <span style={{ display: 'block', font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 1 }}>{c.note}</span>
      </span>
    </div>
  );
}

function CiteMark({ finding, active, onClick }) {
  const hue = W_HUE[finding.status];
  return (
    <span onClick={onClick} title="Review this authority"
      style={{ cursor: 'pointer', background: active ? hue : W_BG[finding.status], color: active ? 'var(--on-primary)' : hue, borderRadius: 3, padding: '1px 4px', fontWeight: 600, boxShadow: active ? '0 0 0 2px var(--ring-focus)' : `inset 0 -2px 0 ${hue}`, transition: 'background 120ms ease, color 120ms ease' }}>
      {finding.citation}
    </span>
  );
}

/* ---- LEFT: the working document ---- */
function WorkingDoc({ app, sel, setSel, editingId, setEditingId, leftRef, blockRefs }) {
  const blocks = window.CCData.docBlocks;
  const byId = (id) => window.CCData.findings.find((f) => f.id === id);
  const mode = app.docMode;
  const [draft, setDraft] = wState('');

  return (
    <div ref={leftRef} style={{ overflowY: 'auto', flex: 1, background: 'var(--stone-wash, #efece6)', padding: '22px 22px 60px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', background: 'var(--surface-card)', boxShadow: 'var(--elev-panel)', borderRadius: 2, padding: '48px 52px 64px', minHeight: 600 }}>
        {blocks.map((b, i) => {
          if (b.kind === 'court') return <div key={i} style={{ font: 'var(--code-sm)', color: 'var(--mute)', letterSpacing: '0.02em', textAlign: 'center', marginBottom: 18 }}>{b.text}</div>;
          if (b.kind === 'title') return <div key={i} style={{ font: 'var(--heading-sm)', color: 'var(--ink)', textAlign: 'center', paddingBottom: 18, marginBottom: 22, borderBottom: '1px solid var(--hairline)' }}>{b.text}</div>;
          if (b.kind === 'h') return <div key={i} style={{ font: 'var(--caption-strong)', fontSize: 21, color: 'var(--ink)', margin: '30px 0 12px' }}>{b.text}</div>;
          const f = b.cite ? byId(b.cite) : null;
          if (!f) return <p key={i} style={{ margin: '0 0 13px', fontSize: 19, lineHeight: 1.9, fontFamily: 'Georgia, "Times New Roman", serif', color: 'var(--body)' }}>{b.text}</p>;

          const edit = app.docEdits[f.id];
          const selected = sel === f.id;
          const reviewed = app.reviews[f.id];
          const hasFix = !!window.CCData.revisions[f.id];
          const editing = editingId === f.id;

          // inline manual editor
          if (editing) {
            return (
              <div key={i} ref={(el) => (blockRefs.current[f.id] = el)} style={{ margin: '0 0 14px', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--primary)', background: 'var(--surface-bone)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8, font: 'var(--caption-strong)', fontSize: 12, color: 'var(--primary-deep)', textTransform: 'uppercase', letterSpacing: '0.08em' }}><WIcon name="pencil" size={13} /> Editing paragraph</div>
                <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={5} style={{ width: '100%', boxSizing: 'border-box', font: 'var(--body-md)', lineHeight: 1.6, color: 'var(--ink)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--hairline-strong)', background: 'var(--surface-card)', resize: 'vertical', outline: 'none' }} />
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <WBtn variant="primary" size="sm" iconLeft={<WIcon name="check" size={15} />} onClick={() => { if (draft.trim()) app.editBlock(f.id, draft.trim()); setEditingId(null); }}>Save change</WBtn>
                  <WBtn variant="ghost" size="sm" onClick={() => setEditingId(null)}>Cancel</WBtn>
                  {hasFix && <WBtn variant="outline" size="sm" iconLeft={<WIcon name="sparkles" size={14} />} onClick={() => setDraft(window.CCData.revisions[f.id])}>Use suggested</WBtn>}
                </div>
              </div>
            );
          }

          // edited → redline (tracked) or clean
          if (edit) {
            if (mode === 'clean') {
              return <p key={i} ref={(el) => (blockRefs.current[f.id] = el)} onClick={() => setSel(f.id)} style={{ margin: '0 0 13px', fontSize: 19, lineHeight: 1.9, fontFamily: 'Georgia, "Times New Roman", serif', color: 'var(--body)', cursor: 'pointer', background: sel === f.id ? 'var(--surface-bone)' : 'transparent', borderRadius: 4, padding: sel === f.id ? '2px 6px' : 0 }}>{edit.revised}</p>;
            }
            return (
              <div key={i} ref={(el) => (blockRefs.current[f.id] = el)} onClick={() => setSel(f.id)} style={{ margin: '0 0 14px', cursor: 'pointer' }}>
                {mode === 'tracked' && (
                  <p style={{ margin: '0 0 4px', fontSize: 19, lineHeight: 1.9, fontFamily: 'Georgia, "Times New Roman", serif', color: 'var(--ash)', textDecoration: 'line-through', textDecorationColor: 'var(--fabricated)', background: 'var(--fabricated-bg)', borderRadius: 3, padding: '2px 4px' }}>{b.text}</p>
                )}
                <p style={{ margin: 0, fontSize: 19, lineHeight: 1.9, fontFamily: 'Georgia, "Times New Roman", serif', color: 'var(--ink)', background: 'var(--verified-bg)', borderLeft: '2px solid var(--verified)', borderRadius: '0 3px 3px 0', padding: '6px 10px' }}>
                  {edit.revised}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: 'var(--caption-strong)', fontSize: 12, color: 'var(--verified)' }}><WIcon name={edit.mode === 'applied' ? 'wand-2' : 'pencil'} size={12} /> {edit.mode === 'applied' ? 'Suggested fix applied' : 'Edited by reviewer'}</span>
                  <button onClick={(e) => { e.stopPropagation(); setDraft(edit.revised); setEditingId(f.id); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', color: 'var(--charcoal)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><WIcon name="pencil" size={12} /> Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); app.revertBlock(f.id); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', color: 'var(--mute)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><WIcon name="undo-2" size={12} /> Revert</button>
                </div>
              </div>
            );
          }

          // normal cited paragraph
          if (mode === 'clean') {
            return <p key={i} ref={(el) => (blockRefs.current[f.id] = el)} onClick={() => setSel(f.id)} style={{ margin: '0 0 13px', fontSize: 19, lineHeight: 1.9, fontFamily: 'Georgia, "Times New Roman", serif', color: 'var(--body)', cursor: 'pointer', background: sel === f.id ? 'var(--surface-bone)' : 'transparent', borderRadius: 4, padding: sel === f.id ? '2px 6px' : 0 }}>{b.text}</p>;
          }
          const idx = b.text.indexOf(f.citation);
          const before = idx >= 0 ? b.text.slice(0, idx) : b.text + ' ';
          const after = idx >= 0 ? b.text.slice(idx + f.citation.length) : '';
          return (
            <div key={i} ref={(el) => (blockRefs.current[f.id] = el)} style={{ margin: '0 0 13px' }}>
              <p onClick={() => setSel(f.id)} style={{ margin: 0, fontSize: 19, lineHeight: 1.9, fontFamily: 'Georgia, "Times New Roman", serif', color: 'var(--body)', cursor: 'pointer', background: selected ? 'var(--surface-bone)' : 'transparent', borderRadius: 4, padding: selected ? '4px 6px' : 0, transition: 'background 120ms ease' }}>
                {before}{idx >= 0 ? <CiteMark finding={f} active={selected} onClick={() => setSel(f.id)} /> : <CiteMark finding={f} active={selected} onClick={() => setSel(f.id)} />}{after}
              </p>
              {selected && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7, flexWrap: 'wrap' }}>
                  {reviewed === 'Approved'
                    ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: 'var(--caption-strong)', fontSize: 12, color: 'var(--verified)' }}><WIcon name="check-circle" size={13} /> Accepted as drafted</span>
                    : <>
                        {hasFix && <button onClick={() => app.applyFix(f.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 12px', borderRadius: 'var(--radius-full)', background: 'var(--surface-dark)', color: 'var(--on-dark)', border: 'none', cursor: 'pointer', font: 'var(--button-sm)' }}><WIcon name="wand-2" size={13} /> Apply suggested fix</button>}
                        <button onClick={() => { setDraft(b.text); setEditingId(f.id); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 12px', borderRadius: 'var(--radius-full)', background: 'var(--surface-card)', border: '1px solid var(--hairline-strong)', cursor: 'pointer', font: 'var(--button-sm)', color: 'var(--ink)' }}><WIcon name="pencil" size={13} /> Edit text</button>
                        {f.status === 'Verified' && <button onClick={() => app.review(f.id, 'Approved')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 12px', borderRadius: 'var(--radius-full)', background: 'transparent', border: '1px solid var(--hairline)', cursor: 'pointer', font: 'var(--button-sm)', color: 'var(--charcoal)' }}><WIcon name="check" size={13} /> Accept</button>}
                      </>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
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
  fabrication:  { label: 'Fabrication',          sub: 'Unverified citation · suggest removal',          hue: 'var(--fabricated)' },
  fidelity:     { label: 'Mischaracterisation',  sub: 'Mischaracterisation · revise proposition',        hue: 'var(--mischar)' },
  jurisdiction: { label: 'Jurisdiction',         sub: 'Out-of-jurisdiction · confirm it applies here',   hue: '#2a6fdb' },
  wording:      { label: 'Wording & context',    sub: 'Wording & context · review before filing',        hue: 'var(--charcoal)' },
};

// every citation in document order (deduped) — the single source of truth for
// the review queue, the stepper counts, and the partner sign-off.
window.CCReviewQueue = function () {
  const seen = {};
  return (window.CCData.docBlocks || [])
    .filter((b) => b.cite && !seen[b.cite] && (seen[b.cite] = 1))
    .map((b) => window.CCData.findings.find((f) => f.id === b.cite))
    .filter(Boolean);
};

function associateDecisionOf(f, app) {
  const edit = app.docEdits[f.id]; const rev = app.reviews[f.id];
  if (edit && edit.mode === 'applied') return { label: 'Applied the suggested fix — tracked change inserted', tone: 'change' };
  if (edit && edit.mode === 'manual') return { label: 'Edited the wording by hand — tracked change inserted', tone: 'change' };
  if (rev === 'Approved') return { label: 'Confirmed the authority is correctly applied', tone: 'keep' };
  if (rev === 'Rejected') return { label: 'Reviewed and kept as written', tone: 'keep' };
  if (rev) return { label: 'Reviewed — ' + rev.toLowerCase(), tone: 'keep' };
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
function SignalBlock({ a }) {
  const [open, setOpen] = React.useState(false);
  if (!a.signal || !a.signal.length) return null;
  return (
    <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <button onClick={() => setOpen((v) => !v)} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left', padding: '10px 12px', background: 'var(--surface-bone)', border: 'none', cursor: 'pointer' }}>
        <WIcon name="eye-off" size={15} style={{ color: 'var(--primary-deep)', flex: '0 0 auto' }} />
        <span style={{ font: 'var(--caption-strong)', fontSize: 13, color: 'var(--ink)', flex: 1 }}>Signal · why this could slip past a busy reviewer</span>
        <span style={{ font: 'var(--code-sm)', color: 'var(--ash)', flex: '0 0 auto' }}>{a.signal.length}</span>
        <WIcon name={open ? 'chevron-up' : 'chevron-down'} size={15} style={{ color: 'var(--mute)', flex: '0 0 auto' }} />
      </button>
      {open && (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 11, borderTop: '1px solid var(--hairline)' }}>
          {a.signal.map((sg, i) => (
            <div key={i} style={{ borderLeft: '2px solid var(--mischar)', paddingLeft: 11 }}>
              <div style={{ font: 'var(--caption-strong)', fontSize: 12.5, color: 'var(--ink)' }}>{i + 1}. {sg.type}</div>
              <div style={{ font: 'var(--body-sm)', color: 'var(--body)', marginTop: 3 }}>{sg.text}</div>
            </div>
          ))}
          {a.defensibility && (
            <div style={{ display: 'flex', gap: 8, padding: '9px 11px', background: 'var(--surface-bone)', borderRadius: 'var(--radius-sm)' }}>
              <WIcon name="scale" size={14} style={{ color: 'var(--charcoal)', marginTop: 1, flex: '0 0 auto' }} />
              <span style={{ font: 'var(--body-sm)', color: 'var(--body)' }}>{a.defensibility}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---- mini per-citation Verification flow (deepdive) ---- */
function MiniFlow({ f }) {
  const c = (window.CCData.corpus || {})[f.id] || {};
  const a = window.CCData.analysis[f.id] || {};
  const ok = 'var(--verified)', bad = 'var(--fabricated)', warn = 'var(--mischar)';
  const steps = [];
  steps.push({ label: 'Extracted from skeleton', sub: 'claim · citation · source pointer', dot: ok });
  if (c.match === 'corpus') steps.push({ label: 'Stage 1 · Internal corpus', sub: 'deterministic match — found', dot: ok });
  else { steps.push({ label: 'Stage 1 · Internal corpus', sub: 'not found in 57-authority corpus', dot: warn });
    steps.push({ label: 'Stage 2 · External sources', sub: c.match === 'external' ? 'confirmed on approved open sources' : 'not found on any approved source', dot: c.match === 'external' ? ok : bad }); }
  if (f.status !== 'Fabricated') steps.push({ label: 'Holding comparison', sub: (a.fidelity != null ? a.fidelity + '% — ' : '') + (a.fidelityLabel || '—'), dot: (a.fidelity >= 80 ? ok : warn) });
  steps.push({ label: 'Disposition', sub: window.CCVerdictLabel(f.status), dot: f.status === 'Verified' ? ok : f.status === 'Mischaracterised' ? warn : bad });
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: s.dot, marginTop: 4 }} />
            {i < steps.length - 1 && <span style={{ width: 2, flex: 1, background: 'var(--hairline)', minHeight: 16 }} />}
          </div>
          <div style={{ paddingBottom: i < steps.length - 1 ? 12 : 0 }}>
            <div style={{ font: 'var(--caption-strong)', fontSize: 12.5, color: 'var(--ink)' }}>{s.label}</div>
            <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 1 }}>{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- mini per-citation Audit trail (deepdive) ---- */
function MiniAudit({ f, app }) {
  const c = (window.CCData.corpus || {})[f.id] || {};
  const ev = [
    { t: '09:42', who: 'Consistency Check Engine', label: 'Citation extracted', sub: 'parsed from the skeleton argument' },
    { t: '09:43', who: 'Citation Verifier', label: f.status === 'Verified' ? 'Authority confirmed' : f.status === 'Mischaracterised' ? 'Mischaracterisation flagged' : 'No source found — flagged', sub: c.source ? ('matched · ' + c.source) : (c.searched ? ('searched ' + c.searched.length + ' sources') : 'corpus + open-web checked') },
  ];
  const ed = app.docEdits[f.id], rv = app.reviews[f.id];
  if (ed) ev.push({ t: '—', who: 'Emma Stride · Associate', label: ed.mode === 'applied' ? 'Applied suggested fix' : 'Edited wording by hand', sub: 'tracked change inserted', human: true });
  else if (rv) ev.push({ t: '—', who: 'Emma Stride · Associate', label: rv === 'Approved' ? 'Confirmed correctly applied' : 'Reviewed — kept as written', sub: 'associate decision recorded', human: true });
  if (app.partnerApproved[f.id]) ev.push({ t: '—', who: 'R. Penhallow KC · Partner', label: 'Approved for filing', sub: 'partner sign-off', human: true });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      {ev.map((e, i) => (
        <div key={i} style={{ display: 'flex', gap: 10 }}>
          <span style={{ font: 'var(--code-sm)', color: e.human ? 'var(--primary-deep)' : 'var(--ash)', flex: '0 0 auto', width: 34 }}>{e.t}</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ font: 'var(--caption-strong)', fontSize: 12.5, color: 'var(--ink)' }}>{e.label} {e.human && <WIcon name="user" size={11} style={{ color: 'var(--primary-deep)' }} />}</div>
            <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 1 }}>{e.who} · {e.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- mini per-citation Data sources (deepdive) ---- */
function MiniSources({ f }) {
  const c = (window.CCData.corpus || {})[f.id] || {};
  const matched = c.source;
  const checked = c.searched || ['Provided UK / Commonwealth corpus', 'CourtListener', 'legislation.gov.uk', 'Open-web (Perplexity)'];
  const rows = [];
  if (matched) rows.push({ name: c.match === 'external' ? matched : ('Corpus · ' + matched), tag: c.match === 'external' ? 'External match' : 'Corpus match', hit: true });
  checked.forEach((s) => { if (!matched || !s.includes('corpus')) rows.push({ name: s, tag: matched ? 'also checked' : 'searched', hit: false }); });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <WIcon name={r.hit ? 'check-circle' : 'search'} size={14} style={{ color: r.hit ? 'var(--verified)' : 'var(--stone)', flex: '0 0 auto' }} />
          <span style={{ font: 'var(--code-sm)', color: 'var(--ink)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</span>
          <span style={{ font: 'var(--caption)', color: r.hit ? 'var(--verified)' : 'var(--ash)', flex: '0 0 auto' }}>{r.tag}</span>
        </div>
      ))}
    </div>
  );
}

function EvidenceSection({ icon, title, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}><WIcon name={icon} size={14} style={{ color: 'var(--charcoal)' }} /><WOverline>{title}</WOverline></div>
      {children}
    </div>
  );
}

function RatioSignal({ f }) {
  const [open, setOpen] = wState(false);
  const r = (window.CCData.ratioAnalysis || {})[f.id];
  if (!r || r.type === 'aligned' || r.type === 'na') return null;
  const meta = (window.CCRatioMeta || {})[r.type] || {};
  return (
    <div style={{ borderRadius: 'var(--radius-md)', background: meta.bg, border: '1px solid ' + meta.hue + '33', overflow: 'hidden' }}>
      <button onClick={() => setOpen((v) => !v)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '10px 12px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <WIcon name={meta.icon || 'scale'} size={15} style={{ color: meta.hue, flex: '0 0 auto' }} />
        <span style={{ font: 'var(--caption-strong)', fontSize: 12.5, color: meta.hue, flex: 1, minWidth: 0 }}>{r.label}{r.strength && r.strength !== 'n/a' ? ' · ' + r.strength : ''}</span>
        <WIcon name={open ? 'chevron-up' : 'chevron-down'} size={15} style={{ color: meta.hue, flex: '0 0 auto' }} />
      </button>
      {open && (
        <div style={{ padding: '0 12px 11px 36px' }}>
          {r.citedAs && (
            <div style={{ display: 'grid', gridTemplateColumns: '78px 1fr', gap: '3px 10px', font: 'var(--body-sm)', marginBottom: 7 }}>
              <span style={{ color: 'var(--ash)' }}>Cited as</span><span style={{ color: 'var(--body)' }}>{r.citedAs}</span>
              <span style={{ color: 'var(--ash)' }}>Actual ratio</span><span style={{ color: 'var(--body)' }}>{r.actualRatio}</span>
            </div>
          )}
          <div style={{ font: 'var(--body-sm)', color: 'var(--charcoal)' }}>{r.note}</div>
        </div>
      )}
    </div>
  );
}

function GuidanceItem({ f, app, goNext }) {
  const [showEvidence, setShowEvidence] = React.useState(false);
  // every citation collapses back to high-level when you move to a different one
  React.useEffect(() => { setShowEvidence(false); }, [f.id]);
  const reviewed = app.reviews[f.id];
  const edit = app.docEdits[f.id];
  const hasFix = !!window.CCData.revisions[f.id];
  const a = window.CCData.analysis[f.id] || {};
  const partnerStage = app.wfStage === 'partner';
  const approved = !!app.partnerApproved[f.id];
  const decision = associateDecisionOf(f, app);
  const resolved = !!(edit || reviewed);
  const hue = f.status === 'Verified' ? 'var(--verified)' : f.status === 'Mischaracterised' ? 'var(--mischar)' : 'var(--fabricated)';
  const confirmNext = (fn) => { fn(); if (goNext) setTimeout(goNext, 90); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* ---- high-level summary (always visible) ---- */}
      <WStatus status={f.status} label={window.CCVerdictLabel(f.status)} />
      <div>
        <div style={{ font: 'var(--code-md)', fontSize: 17, color: 'var(--ink)', lineHeight: 1.3 }}>{f.citation}</div>
        <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 4 }}>{f.legalIssue}</div>
      </div>
      <div style={{ borderLeft: '3px solid ' + hue, paddingLeft: 13 }}>
        <p style={{ margin: 0, fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 16, lineHeight: 1.55, color: 'var(--ink)' }}>{verdictHeadline(f)}</p>
      </div>

      {/* ratio/obiter signal — header by default, expand for detail */}
      <RatioSignal f={f} />

      {/* Mischaracterised / fabricated: show the suggested revision in full up-front */}
      {hasFix && f.status !== 'Verified' && (
        <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', padding: '12px 14px', background: 'var(--surface-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}><WIcon name="wand-2" size={14} style={{ color: 'var(--primary-deep)' }} /><WOverline>Suggested revision</WOverline></div>
          <p style={{ margin: '0 0 6px', font: 'var(--body-sm)', lineHeight: 1.6, color: 'var(--ash)', textDecoration: 'line-through', textDecorationColor: 'var(--fabricated)' }}>{(window.CCData.docBlocks.find((b) => b.cite === f.id) || {}).text}</p>
          <p style={{ margin: 0, font: 'var(--body-sm)', lineHeight: 1.6, color: 'var(--ink)', fontWeight: 600 }}>{window.CCData.revisions[f.id]}</p>
        </div>
      )}

      {/* Signal header — collapsed by default (mischaracterised) */}
      {f.status !== 'Verified' && <SignalBlock a={a} />}

      {/* confidence / risk */}
      <div style={{ display: 'flex', gap: 40 }}>
        <div>
          <WOverline>Confidence</WOverline>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 24, color: 'var(--ink)', marginTop: 3, lineHeight: 1.1 }}>{f.confidence}%</div>
          <div style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>{confidenceSub(f, a)}</div>
        </div>
        <div>
          <WOverline>Risk</WOverline>
          <div style={{ marginTop: 6 }}><WRisk level={f.risk} /></div>
        </div>
      </div>

      {/* ---- primary action ---- */}
      {partnerStage ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {decision && (
            <div style={{ background: decision.tone === 'change' ? 'var(--verified-bg)' : 'var(--mischar-bg)', borderRadius: 'var(--radius-sm)', padding: '9px 12px', font: 'var(--body-sm)', color: 'var(--body)' }}>
              <strong style={{ color: 'var(--ink)' }}>Emma Stride</strong> {decision.label.charAt(0).toLowerCase() + decision.label.slice(1)}
            </div>
          )}
          {approved
            ? <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 42, borderRadius: 'var(--radius-full)', background: 'var(--verified-bg)', color: 'var(--verified)', font: 'var(--button-md)' }}><WIcon name="shield-check" size={16} /> Approved for filing</span>
            : <>
                <button onClick={() => confirmNext(() => app.approveCitation(f.id))} style={{ height: 46, borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--ink)', color: '#fff', font: 'var(--button-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><WIcon name="check" size={17} /> Approve for filing</button>
                <WBtn variant="outline" size="sm" iconLeft={<WIcon name="corner-up-left" size={14} />} onClick={() => app.sendBackCitation(f.id)}>Send back to associate</WBtn>
              </>}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {edit ? (
            <>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 42, borderRadius: 'var(--radius-full)', background: 'var(--verified-bg)', color: 'var(--verified)', font: 'var(--button-md)' }}><WIcon name="check-circle" size={16} /> Applied to document</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <WBtn variant="outline" size="sm" iconLeft={<WIcon name="undo-2" size={14} />} onClick={() => app.revertBlock(f.id)}>Revert</WBtn>
                {goNext && <WBtn variant="ghost" size="sm" iconLeft={<WIcon name="arrow-right" size={14} />} onClick={goNext}>Next citation</WBtn>}
              </div>
            </>
          ) : reviewed ? (
            <>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 42, borderRadius: 'var(--radius-full)', background: 'var(--verified-bg)', color: 'var(--verified)', font: 'var(--button-md)' }}><WIcon name="check-circle" size={16} /> {reviewed === 'Approved' ? 'Confirmed — correctly applied' : 'Reviewed — kept as written'}</span>
              {goNext && <WBtn variant="ghost" size="sm" iconLeft={<WIcon name="arrow-right" size={14} />} onClick={goNext}>Next citation</WBtn>}
            </>
          ) : f.status === 'Verified' ? (
            <button onClick={() => confirmNext(() => app.review(f.id, 'Approved'))} style={{ height: 46, borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--ink)', color: '#fff', font: 'var(--button-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><WIcon name="check" size={17} /> Confirm — correctly applied</button>
          ) : (
            <>
              {hasFix && <button onClick={() => confirmNext(() => app.applyFix(f.id))} style={{ height: 46, borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--ink)', color: '#fff', font: 'var(--button-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><WIcon name="check" size={17} /> Use this version</button>}
              <div style={{ display: 'flex', gap: 8 }}>
                <WBtn variant="outline" size="sm" iconLeft={<WIcon name="pencil" size={14} />} onClick={() => app.requestEdit(f.id)}>Edit by hand</WBtn>
                {!hasFix && <WBtn variant="ghost" size="sm" iconLeft={<WIcon name="check" size={14} />} onClick={() => confirmNext(() => app.review(f.id, 'Approved'))}>Confirm as-is</WBtn>}
              </div>
            </>
          )}
        </div>
      )}

      {/* ---- See full evidence (deepdive) ---- */}
      <button onClick={() => setShowEvidence((v) => !v)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, alignSelf: 'center', background: 'transparent', border: 'none', cursor: 'pointer', font: 'var(--button-sm)', color: 'var(--charcoal)', padding: '4px 8px' }}>
        {showEvidence ? 'Hide full evidence' : 'See full evidence'} <WIcon name={showEvidence ? 'chevron-up' : 'chevron-down'} size={15} />
      </button>

      {showEvidence && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 4, borderTop: '1px solid var(--hairline)' }}>
          {/* jurisdiction + the seven checks */}
          <EvidenceSection icon="shield-check" title="Authority verification">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 6 }}><WIcon name={/US|EU|unresolved/i.test(a.jurisdiction || '') ? 'map-pin-off' : 'map-pin'} size={13} style={{ color: 'var(--charcoal)' }} /><span style={{ font: 'var(--caption-strong)', fontSize: 12, color: 'var(--ink)' }}>{a.jurisdiction || '—'}</span></div>
            <div>{caseChecks(f).map((c, i) => <CheckRow key={i} c={c} />)}</div>
          </EvidenceSection>

          {/* ratio vs obiter */}
          {(() => {
            const r = (window.CCData.ratioAnalysis || {})[f.id];
            if (!r) return null;
            const meta = (window.CCRatioMeta || {})[r.type] || {};
            return (
              <EvidenceSection icon="scale" title="Ratio vs obiter">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 20, padding: '0 9px', borderRadius: 'var(--radius-full)', font: 'var(--caption-strong)', fontSize: 11.5, background: meta.bg, color: meta.hue, marginBottom: 8 }}><WIcon name={meta.icon || 'scale'} size={12} /> {r.label}{r.strength && r.strength !== 'n/a' ? ' · ' + r.strength : ''}</span>
                {r.citedAs && (
                  <div style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: '4px 10px', font: 'var(--body-sm)', marginBottom: 8 }}>
                    <span style={{ color: 'var(--ash)' }}>Cited as</span><span style={{ color: 'var(--body)' }}>{r.citedAs}</span>
                    <span style={{ color: 'var(--ash)' }}>Actual ratio</span><span style={{ color: 'var(--body)' }}>{r.actualRatio}</span>
                  </div>
                )}
                <div style={{ font: 'var(--body-sm)', color: 'var(--charcoal)' }}>{r.note}</div>
              </EvidenceSection>
            );
          })()}

          {f.actualAuthority && (
            <EvidenceSection icon="alert-triangle" title="Why it should not be applied as drafted">
              <div style={{ font: 'var(--body-sm)', color: 'var(--body)' }}>{f.explanation}</div>
            </EvidenceSection>
          )}

          {/* triangulation reasoning */}
          {(() => {
            const t = (window.CCData.treatment || {})[f.id];
            if (!t || !t.summary) return null;
            const v = window.CCTreatmentVerdict ? window.CCTreatmentVerdict(f.id) : null;
            return (
              <EvidenceSection icon="git-branch" title="How Consistency Check judged this">
                {v && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 18, padding: '0 8px', borderRadius: 'var(--radius-full)', font: 'var(--caption-strong)', fontSize: 11, background: v.bg, color: v.hue, marginBottom: 6 }}>{v.label} · {v.citedText}</span>}
                <div style={{ font: 'var(--body-sm)', color: 'var(--body)' }}>{t.summary}</div>
              </EvidenceSection>
            );
          })()}

          {/* Disposition */}
          <EvidenceSection icon="flag" title="Disposition">
            <div style={{ font: 'var(--body-sm)', color: 'var(--body)' }}>{f.recommendedAction}</div>
            {decision && <div style={{ marginTop: 6, font: 'var(--body-sm)', color: 'var(--charcoal)' }}><strong style={{ color: 'var(--ink)' }}>Emma Stride</strong> {decision.label.charAt(0).toLowerCase() + decision.label.slice(1)}</div>}
          </EvidenceSection>

          {/* ---- new: verification flow / audit / sources ---- */}
          <EvidenceSection icon="workflow" title="Verification flow"><MiniFlow f={f} /></EvidenceSection>
          <EvidenceSection icon="history" title="Audit trail"><MiniAudit f={f} app={app} /></EvidenceSection>
          <EvidenceSection icon="database" title="Data sources checked"><MiniSources f={f} /></EvidenceSection>
        </div>
      )}
    </div>
  );
}

function ReportGuidance({ app, sel, setSel, guideRef, guideItemRefs }) {
  const findings = window.CCData.findings;
  const order = [...findings].sort((a, b) => (a.status === 'Verified' ? 1 : 0) - (b.status === 'Verified' ? 1 : 0));
  const changes = Object.keys(app.docEdits).length;
  // Every suggestion is bucketed by THIS system's own risk taxonomy
  // (shared with the per-item labels via window.CCCategoryOf so they stay in lockstep).
  const categoryOf = window.CCCategoryOf;
  const needsAttention = (f) => !/^no action/i.test(f.recommendedAction || '');
  const isResolved = (f) => !!(app.docEdits[f.id] || app.reviews[f.id]);
  const flagged = findings.filter(needsAttention);
  const resolved = flagged.filter(isResolved).length;
  const ready = resolved === flagged.length;
  const CATS = [
    ['fabrication', 'Fabrication', 'var(--fabricated)'],
    ['fidelity', 'Mischaracterisation', 'var(--mischar)'],
    ['jurisdiction', 'Jurisdiction', '#2a6fdb'],
    ['wording', 'Wording & context', 'var(--charcoal)'],
  ];
  const openByCat = (key) => flagged.filter((f) => categoryOf(f) === key && !isResolved(f)).length;
  const jumpToCat = (key) => {
    const target = flagged.find((f) => categoryOf(f) === key && !isResolved(f)) || flagged.find((f) => categoryOf(f) === key);
    if (target) setSel(target.id);
  };
  const stage = app.wfStage;
  const partApproved = flagged.filter((f) => app.partnerApproved[f.id]).length;
  const assocReady = ready;
  const partReady = partApproved === flagged.length && flagged.length > 0;
  const ids = flagged.map((f) => f.id);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: '1 1 0', minWidth: 0, background: 'var(--surface-card)' }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface-bone)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <WIcon name={stage === 'partner' ? 'gavel' : 'sparkles'} size={16} style={{ color: stage === 'partner' ? 'var(--primary-deep)' : 'var(--primary-deep)' }} />
          <span style={{ font: 'var(--heading-sm)', fontSize: 15, color: 'var(--ink)' }}>{stage === 'partner' ? 'Partner sign-off' : 'Associate review'}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 8px', borderRadius: 'var(--radius-full)', background: (stage === 'partner' ? (flagged.length - partApproved) : (flagged.length - resolved)) ? 'var(--mischar-bg)' : 'var(--verified-bg)', color: (stage === 'partner' ? (flagged.length - partApproved) : (flagged.length - resolved)) ? 'var(--mischar)' : 'var(--verified)', font: 'var(--caption-strong)', fontSize: 12 }}>{stage === 'partner' ? (flagged.length - partApproved) + ' to approve' : (flagged.length - resolved) + ' open'}</span>
          <span style={{ marginLeft: 'auto', font: 'var(--caption)', color: 'var(--ash)' }}>{stage === 'partner' ? 'reviewing the associate’s decisions' : 'from the verification report'}</span>
        </div>
        {stage === 'associate' && (
        <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
          {CATS.map(([key, lbl, hue]) => { const n = openByCat(key); return (
            <button key={key} onClick={() => jumpToCat(key)} title={n ? ('Jump to ' + lbl) : (lbl + ' — all resolved')} style={{ flex: 1, textAlign: 'left', background: 'transparent', border: 'none', padding: 0, cursor: n ? 'pointer' : 'default' }}>
              <div style={{ height: 3, borderRadius: 2, background: hue, opacity: n ? 1 : 0.25 }} />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 6 }}><span style={{ font: 'var(--caption-strong)', fontSize: 11.5, color: 'var(--charcoal)', lineHeight: 1.2 }}>{lbl}</span><span style={{ font: 'var(--code-sm)', fontWeight: 600, color: n ? hue : 'var(--ash)' }}>{n}</span></div>
            </button>
          ); })}
        </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
          <span style={{ flex: 1, height: 6, background: 'var(--hairline)', borderRadius: 3, overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: (flagged.length ? ((stage === 'partner' ? partApproved : resolved) / flagged.length) * 100 : 100) + '%', background: stage === 'partner' ? 'var(--primary-deep)' : (ready ? 'var(--verified)' : 'var(--mischar)'), borderRadius: 3, transition: 'width 300ms ease' }} /></span>
          <span style={{ font: 'var(--code-sm)', color: 'var(--charcoal)' }}>{stage === 'partner' ? partApproved : resolved}/{flagged.length} {stage === 'partner' ? 'approved' : 'reviewed'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, font: 'var(--body-sm)', color: (stage === 'partner' ? partReady : ready) ? 'var(--verified)' : 'var(--charcoal)' }}>
          <WIcon name={(stage === 'partner' ? partReady : ready) ? 'shield-check' : 'shield-alert'} size={14} style={{ color: (stage === 'partner' ? partReady : ready) ? 'var(--verified)' : 'var(--mischar)' }} />
          {stage === 'partner'
            ? (partReady ? 'All citations approved — ready to generate the clean copy' : 'Approve each citation, or trust the associate review below')
            : (ready ? 'All flags reviewed — ready to hand to the partner' : 'Resolve each flagged authority in the document on the left')}
        </div>
      </div>
      <div ref={guideRef} style={{ overflowY: 'auto', flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>{stage === 'partner' ? 'Each card shows the associate’s decision and the evidence the AI surfaced. Approve for filing, or send back.' : 'Each suggestion points to a paragraph on the left. Apply to insert a tracked change, or dismiss to keep the original.'}</div>
        {order.map((f) => <div key={f.id} ref={(el) => { if (guideItemRefs) guideItemRefs.current[f.id] = el; }}><GuidanceItem f={f} app={app} expanded={sel === f.id} onToggle={() => setSel(sel === f.id ? null : f.id)} /></div>)}
      </div>
    </div>
  );
}

/* ---- uploaded real document view ---- */
function UploadedDoc({ app }) {
  const doc = app.uploadedDoc;
  const cites = doc.citations || [];
  const highlight = (text) => {
    if (!cites.length) return text;
    const parts = []; let rest = text; let key = 0;
    const re = new RegExp('(' + cites.map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'g');
    let last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) parts.push(text.slice(last, m.index));
      parts.push(<span key={key++} style={{ background: 'var(--primary-soft)', color: 'var(--primary-deep)', borderRadius: 3, padding: '0 3px', fontWeight: 600 }}>{m[0]}</span>);
      last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 0, alignItems: 'stretch', height: 'calc(100vh - 232px)', minHeight: 540, border: '1px solid var(--hairline)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--elev-card)' }}>
      <div style={{ overflowY: 'auto', background: '#efece6', padding: '22px 22px 60px' }}>
        {(doc.pages || []).map((pg, i) => (
          <div key={i} style={{ maxWidth: 720, margin: '0 auto 20px', background: 'var(--surface-card)', boxShadow: 'var(--elev-panel)', borderRadius: 2, padding: '44px 52px', position: 'relative' }}>
            <span style={{ position: 'absolute', top: 12, right: 16, font: 'var(--code-sm)', color: 'var(--stone)' }}>p. {i + 1}</span>
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.9, fontFamily: 'Georgia, "Times New Roman", serif', color: 'var(--body)', whiteSpace: 'pre-wrap' }}>{highlight(pg)}</p>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--surface-card)', borderLeft: '1px solid var(--hairline)', overflowY: 'auto', padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><WIcon name="file-check-2" size={16} style={{ color: 'var(--verified)' }} /><span style={{ font: 'var(--heading-sm)', fontSize: 15, color: 'var(--ink)' }}>Parsed document</span></div>
        <div style={{ font: 'var(--body-sm)', color: 'var(--mute)', marginTop: 6 }}>{doc.name} · {(doc.pages || []).length} page{(doc.pages || []).length === 1 ? '' : 's'} · text extracted in-browser.</div>
        <div style={{ marginTop: 14 }}><WOverline>Citations detected · {cites.length}</WOverline>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {cites.length ? cites.map((c, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, font: 'var(--code-sm)', color: 'var(--ink)' }}><WIcon name="quote" size={12} style={{ color: 'var(--primary-deep)', flex: '0 0 auto' }} />{c}</div>)
              : <div style={{ font: 'var(--body-sm)', color: 'var(--mute)' }}>No case-name citations detected in the extracted text.</div>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 16, padding: '11px 13px', background: 'var(--surface-bone)', borderRadius: 'var(--radius-md)', font: 'var(--body-sm)', color: 'var(--charcoal)' }}>
          <WIcon name="info" size={14} style={{ marginTop: 1, flex: '0 0 auto', color: 'var(--stone)' }} />
          <span>Extraction is live. Full citation verification &amp; the tracked-change workflow are demonstrated on the worked Crestholm matter.</span>
        </div>
        <div style={{ marginTop: 14 }}><WBtn variant="outline" size="sm" iconLeft={<WIcon name="arrow-left" size={14} />} onClick={() => app.clearUploaded()}>Back to worked example</WBtn></div>
      </div>
    </div>
  );
}

function StageStepper({ app, bare }) {
  const queue = window.CCReviewQueue();
  const flagged = queue; // every citation is confirmed/actioned, not just the flagged ones
  const assocDone = flagged.filter((f) => app.docEdits[f.id] || app.reviews[f.id]).length;
  const partDone = flagged.filter((f) => app.partnerApproved[f.id]).length;
  const stage = app.wfStage;
  const actor = stage === 'partner' ? { who: 'R. Penhallow KC', role: 'Partner', av: 'RP', hue: 'var(--primary-deep)' } : { who: 'Emma Stride', role: 'Associate', av: 'ES', hue: 'var(--ink)' };
  const steps = [
    { key: 'associate', label: 'Associate review', sub: assocDone + '/' + flagged.length + ' reviewed' },
    { key: 'partner', label: 'Partner sign-off', sub: partDone + '/' + flagged.length + ' approved' },
    { key: 'clean', label: 'Clean copy', sub: 'final filing copy' },
  ];
  const order = ['associate', 'partner', 'clean'];
  const cur = order.indexOf(stage);
  const assocReady = flagged.length > 0 && assocDone === flagged.length;
  const partReady = flagged.length > 0 && partDone === flagged.length;
  // forward advance is gated on the current stage being complete; earlier steps go back.
  const stepAction = (key, i) => {
    if (i < cur) { if (key === 'associate') return app.backToAssociate; return null; }
    if (key === 'partner' && stage === 'associate' && assocReady) return app.sendToPartner;
    if (key === 'clean' && stage === 'partner' && partReady) return app.completeClean;
    return null;
  };
  const nextUnlocked = (stage === 'associate' && assocReady) ? 'partner' : (stage === 'partner' && partReady) ? 'clean' : null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: bare ? 'nowrap' : 'wrap', width: bare ? '100%' : 'auto', maxWidth: 'none', padding: bare ? 0 : '12px 16px', background: bare ? 'transparent' : 'var(--surface-card)', border: bare ? 'none' : '1px solid var(--hairline)', borderRadius: bare ? 0 : 'var(--radius-lg)', boxShadow: bare ? 'none' : 'var(--elev-card)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        {steps.map((s, i) => {
          const done = i < cur; const on = i === cur;
          const action = stepAction(s.key, i);
          const isNext = s.key === nextUnlocked;
          return (
            <React.Fragment key={s.key}>
              {i > 0 && <WIcon name="chevron-right" size={15} style={{ color: 'var(--stone)' }} />}
              <button type="button" disabled={!action} onClick={() => action && action()} title={action ? (i < cur ? 'Go back to ' + s.label : 'Advance to ' + s.label) : (isNext ? 'Resolve all items to unlock' : '')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px', borderRadius: 'var(--radius-full)', background: isNext ? 'var(--primary-soft)' : on ? 'var(--surface-bone)' : 'transparent', border: isNext ? '1px solid var(--primary)' : '1px solid transparent', cursor: action ? 'pointer' : 'default', font: 'inherit', textAlign: 'left', animation: isNext ? 'ccStepPulse 1.8s ease-in-out infinite' : 'none' }}
                onMouseEnter={(e) => { if (action && !isNext) e.currentTarget.style.background = 'var(--surface-bone)'; }}
                onMouseLeave={(e) => { if (action && !isNext && !on) e.currentTarget.style.background = 'transparent'; }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: 'var(--caption-strong)', fontSize: 11, background: done ? 'var(--verified)' : on ? 'var(--surface-dark)' : isNext ? 'var(--primary-deep)' : 'var(--surface-bone)', color: (done || on || isNext) ? 'var(--on-dark)' : 'var(--mute)' }}>{done ? <WIcon name="check" size={12} /> : i + 1}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', whiteSpace: 'nowrap', font: 'var(--caption-strong)', fontSize: 13, color: on ? 'var(--ink)' : done ? 'var(--charcoal)' : isNext ? 'var(--primary-deep)' : 'var(--mute)', lineHeight: 1.1 }}>{s.label}</span>
                  <span style={{ display: 'block', whiteSpace: 'nowrap', font: 'var(--code-sm)', fontSize: 11, color: isNext ? 'var(--primary-deep)' : 'var(--ash)', marginTop: 1 }}>{isNext ? 'Ready — click to continue' : s.sub}</span>
                </span>
                {isNext && <WIcon name="arrow-right" size={14} style={{ color: 'var(--primary-deep)' }} />}
              </button>
            </React.Fragment>
          );
        })}
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 11px 5px 6px', borderRadius: 'var(--radius-full)', background: 'var(--surface-bone)' }}>
        <span style={{ width: 24, height: 24, borderRadius: '50%', background: actor.hue, color: 'var(--on-dark)', font: 'var(--caption-strong)', fontSize: 11, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{actor.av}</span>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: 'block', font: 'var(--caption-strong)', fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.1 }}>{actor.who}</span>
          <span style={{ display: 'block', font: 'var(--code-sm)', fontSize: 11, color: 'var(--mute)' }}>acting as {actor.role}</span>
        </span>
      </span>
    </div>
  );
}

function DocumentWorkspace({ app }) {
  if (app.uploadedDoc) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div><WOverline>Working document · uploaded</WOverline><h2 style={{ margin: '6px 0 0', font: 'var(--display-md)', letterSpacing: '-0.5px', color: 'var(--ink)' }}>{app.uploadedDoc.name}</h2></div>
          <WBtn variant="primary" iconLeft={<WIcon name="upload" size={15} />} onClick={() => app.openUpload()}>Upload another</WBtn>
        </div>
        <UploadedDoc app={app} />
      </div>
    );
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
  const onDragStart = (e) => {
    e.preventDefault();
    dragging.current = true; setDragActive(true);
    const move = (ev) => {
      if (!dragging.current || !splitRef.current) return;
      const r = splitRef.current.getBoundingClientRect();
      const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
      let pct = ((cx - r.left) / r.width) * 100;
      pct = Math.max(32, Math.min(78, pct));
      setLeftPct(pct);
    };
    const up = () => {
      dragging.current = false; setDragActive(false);
      document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up);
      document.removeEventListener('touchmove', move); document.removeEventListener('touchend', up);
      document.body.style.cursor = ''; document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', move); document.addEventListener('mouseup', up);
    document.addEventListener('touchmove', move, { passive: false }); document.addEventListener('touchend', up);
    document.body.style.cursor = 'col-resize'; document.body.style.userSelect = 'none';
  };

  // selecting from the report scrolls the working copy to the paragraph
  const selectAndScroll = (id) => {
    setSel(id);
    if (id) requestAnimationFrame(() => { const el = blockRefs.current[id]; const c = leftRef.current; if (el && c) c.scrollTop = Math.max(0, el.offsetTop - 28); });
  };
  // clicking a citation in the document reveals its suggestion on the RIGHT
  // (expand + scroll the guidance pane) without moving the document itself.
  const guideRef = wRef(null);
  const guideItemRefs = wRef({});
  const selectFromDoc = (id) => {
    setSel(id);
    if (id) setTimeout(() => {
      const el = guideItemRefs.current[id]; const c = guideRef.current;
      if (el && c) {
        const target = c.scrollTop + el.getBoundingClientRect().top - c.getBoundingClientRect().top - 12;
        c.scrollTop = Math.max(0, target);
      }
    }, 110);
  };
  app.requestEdit = (id) => { selectAndScroll(id); const b = window.CCData.docBlocks.find((x) => x.cite === id); setEditingId(id); };

  // review queue — every citation in document order; the panel walks them one at a time (Lumley first)
  const reviewQueue = window.CCReviewQueue();
  const isResolved = (f) => !!(app.docEdits[f.id] || app.reviews[f.id] || app.partnerApproved[f.id]);
  const reviewedCount = reviewQueue.filter(isResolved).length;
  const selIdx = reviewQueue.findIndex((f) => f.id === sel);
  const selFinding = window.CCData.findings.find((f) => f.id === sel);
  const navTo = (dir) => {
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
      if (!isResolved(f)) { selectFromDoc(f.id); return; }
    }
    setSel(null); // everything resolved
  };
  const panelOpen = !!selFinding;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* full-width working document — clean, centred */}
      <div ref={leftRef} style={{ height: 'calc(100vh - 96px)', minHeight: 560, overflowY: 'auto', background: 'var(--canvas)' }}>
        <WorkingDoc app={app} sel={sel} setSel={selectFromDoc} editingId={editingId} setEditingId={setEditingId} leftRef={null} blockRefs={blockRefs} />
      </div>

      {/* sliding single-citation review panel */}
      <div style={{ position: 'fixed', top: 64, right: 0, width: 434, height: 'calc(100vh - 64px)', background: 'var(--surface-card)', borderLeft: '1px solid var(--hairline)', boxShadow: '-8px 0 24px rgba(28,27,25,.06)', transform: panelOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform .26s cubic-bezier(.4,0,.2,1)', overflowY: 'auto', zIndex: 30, display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'sticky', top: 0, background: 'var(--surface-card)', borderBottom: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', zIndex: 5 }}>
          <span style={{ font: 'var(--code-sm)', color: 'var(--ash)' }}>{selIdx >= 0 ? 'Citation ' + (selIdx + 1) + ' of ' + reviewQueue.length : 'Citation'} · {reviewedCount}/{reviewQueue.length} reviewed</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => navTo(-1)} title="Previous flag" style={{ width: 28, height: 28, borderRadius: 7, border: '1px solid var(--hairline)', background: 'var(--surface-card)', color: 'var(--mute)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><WIcon name="chevron-up" size={15} /></button>
            <button onClick={() => navTo(1)} title="Next flag" style={{ width: 28, height: 28, borderRadius: 7, border: '1px solid var(--hairline)', background: 'var(--surface-card)', color: 'var(--mute)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><WIcon name="chevron-down" size={15} /></button>
            <button onClick={() => setSel(null)} title="Close" style={{ width: 28, height: 28, borderRadius: 7, border: 'none', background: 'transparent', color: 'var(--mute)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><WIcon name="x" size={17} /></button>
          </div>
        </div>
        <div style={{ padding: 16, flex: 1 }}>
          {selFinding ? <GuidanceItem f={selFinding} app={app} goNext={goNextPending} /> : null}
        </div>
      </div>
    </div>
  );
}
window.CCDocumentWorkspace = DocumentWorkspace;
window.CCStageStepper = StageStepper;
