'use strict';
/*
 * ingest-corpus.js — one-off ingestion of the real UK/Commonwealth case-law
 * corpus supplied in the hackathon brief into a sanitized, key-free snapshot
 * the app commits and ships (server/corpus.json).
 *
 * Source : challenges_documents/data/.../Cambridge Hackathon - Case Law Database…
 * Output : server/corpus.json   { generatedAt, count, cases: [...], index: {...} }
 *
 * Each case record: { id, file, case, citations[], court, year, excerpt, holding, chars }
 * `index` maps a normalised citation/case key → case id for O(1) deterministic
 * verification ("is this authority in the trusted corpus?").
 *
 * Run:  node scripts/ingest-corpus.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CORPUS_DIR = path.join(ROOT, 'challenges_documents', 'data', 'data_descriptions',
  'Cambridge Hackathon - Case Law Database used for the white case_reference_challenge_2');
const OUT = path.join(ROOT, 'server', 'corpus.json');

// Non-case helper docs in the folder we must not ingest as authorities.
const SKIP = new Set(['understanding.md', 'DATA_EXPANSION.md', 'case_study_white_and_case.md']);

const CITATION_RE = /(\[\d{4}\]\s*[A-Z][A-Za-z. ]*?\d+(?:\s*\([A-Za-z]+\))?|\(\d{4}\)\s*\d+\s*[A-Z][A-Za-z &]*?\d+)/g;
const COURT_RE = /(House of Lords|UK Supreme Court|Supreme Court|Court of Appeal|Queen'?s Bench|King'?s Bench|Chancery Division|Privy Council|Court of Exchequer|Commercial Court|High Court)/i;

function normKey(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}

function caseNameFromFilename(name) {
  let base = name.replace(/\.md$/, '');
  // Slug form: "anglia-television-ltd-v-reed-england--wales-case-law"
  if (/^[a-z0-9-]+$/.test(base) && base.includes('-v-')) {
    base = base.replace(/--+/g, ' ').replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
    // Strip the trailing jurisdiction/source boilerplate (often OCR-truncated,
    // e.g. "uk nondevolved cas", "england wales case law").
    const STOP = new Set(['uk', 'nondevolved', 'nondevolve', 'england', 'wales', 'case', 'law', 'cas', 'l', 'and', 'another', 'others', 'cou', 'corpn', 'co']);
    let words = base.split(' ');
    while (words.length > 3 && STOP.has(words[words.length - 1])) words.pop();
    base = words.join(' ');
    base = base.replace(/\b([a-z])/g, (m, c) => c.toUpperCase()).replace(/\bV\b/g, 'v');
  }
  // Trailing parenthetical court/date in some real-citation filenames.
  return base.replace(/\s*\([^)]*\d{4}[^)]*\)\s*$/, '').trim();
}

function firstMeaningfulLines(text, n) {
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 25);
  return lines.slice(0, n).join(' ');
}

function holdingFrom(text) {
  const m = text.match(/Held[,. ][^.]*(?:\.[^.]*){0,3}\./);
  if (m) return m[0].replace(/\s+/g, ' ').trim().slice(0, 480);
  return '';
}

function ingest() {
  if (!fs.existsSync(CORPUS_DIR)) {
    console.error('Corpus directory not found:', CORPUS_DIR);
    console.error('This script needs the (gitignored) challenges_documents/ brief data present.');
    process.exit(1);
  }
  const files = fs.readdirSync(CORPUS_DIR).filter((f) => f.endsWith('.md') && !SKIP.has(f));
  const cases = [];
  const index = {};
  const seenCase = new Set();

  for (const file of files) {
    const text = fs.readFileSync(path.join(CORPUS_DIR, file), 'utf8');
    const id = 'corp-' + normKey(file).replace(/ /g, '-').slice(0, 48);
    const caseName = caseNameFromFilename(file);
    const head = text.slice(0, 4000);
    // IMPORTANT: index only the case's OWN citation (from the filename). Scanning
    // body text would pull in authorities this case merely *cites*, which would
    // wrongly map e.g. "Lumley v Gye" to whichever later case quotes it.
    const citations = Array.from(new Set(file.match(CITATION_RE) || []))
      .map((c) => c.replace(/\s+/g, ' ').trim()).slice(0, 4);
    const court = (head.match(COURT_RE) || [])[0] || null;
    const year = ((file.match(/\b(1[89]\d{2}|20\d{2})\b/) || [])[1]) || ((head.match(/\b(1[89]\d{2}|20\d{2})\b/) || [])[1]) || null;

    const rec = {
      id,
      file,
      case: caseName,
      citations,
      court: court ? court.replace(/'/, '’') : null,
      year: year ? Number(year) : null,
      excerpt: firstMeaningfulLines(text, 4).slice(0, 700),
      holding: holdingFrom(text),
      chars: text.length,
    };
    cases.push(rec);

    // Build the deterministic lookup index. Index the full name AND a
    // citation-stripped variant ("Lumley v Gye (1853) 2 E&B 216" → "lumley v gye")
    // so a lawyer can paste either the bare name or the full reference.
    const keyCase = normKey(caseName);
    const keyClean = normKey(caseName.replace(/[\[(].*$/, ''));
    [keyCase, keyClean].forEach((k) => { if (k && k.length > 3 && !seenCase.has(k)) { index[k] = id; seenCase.add(k); } });
    for (const c of citations) index[normKey(c)] = id;
  }

  cases.sort((a, b) => a.case.localeCompare(b.case));
  const out = {
    generatedAt: new Date().toISOString(),
    source: 'Cambridge Hackathon — White & Case UK/Commonwealth case-law database',
    count: cases.length,
    cases,
    index,
  };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
  console.log(`Ingested ${cases.length} authorities → ${path.relative(ROOT, OUT)}`);
  console.log(`Index keys: ${Object.keys(index).length}`);
  console.log('Sample:', cases.slice(0, 3).map((c) => c.case + (c.citations[0] ? ' · ' + c.citations[0] : '')).join('  |  '));
}

ingest();
