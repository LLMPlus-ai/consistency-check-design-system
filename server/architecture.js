'use strict';
/*
 * architecture.js — a machine-readable model of the system diagram
 * ("Legal AI Citation Verification & Supervision System").
 *
 * The System page renders this verbatim, so the picture in the brief and the
 * running product can never drift. Every node carries:
 *   - `tab`  : the UI screen it links to (clickable navigation), and/or
 *   - `api`  : the live endpoint that backs it (clickable to inspect JSON).
 * That is what makes "everything linkable" — each box is a hyperlink into the
 * running system, not a static drawing.
 */

const COLUMNS = [
  {
    id: 'inputs',
    n: 1,
    title: 'Inputs',
    nodes: [
      { id: 'in-docs', name: 'Legal Documents', sub: 'PDF / DOCX / skeleton arguments', icon: 'file-text', tab: 'Document', api: '/api/documents' },
      { id: 'in-corpus', name: 'Case-Law Corpus', sub: 'Internal authority database', icon: 'scale', tab: 'Source Library', api: '/api/source-library' },
      { id: 'in-open', name: 'Open Legal Sources', sub: 'web / legislation / case lookup', icon: 'globe', tab: 'Data Sources', api: '/api/sources' },
    ],
  },
  {
    id: 'processing',
    n: 2,
    title: 'NVIDIA AI Processing Layer',
    header: { name: 'NVIDIA Open Models', icon: 'cpu' },
    nodes: [
      { id: 'pr-parse', name: 'Parse / OCR', sub: 'Nemotron Parse', icon: 'scan-text', tab: 'Verification', api: '/api/pipeline/stages', stage: 'parse' },
      { id: 'pr-extract', name: 'Citation Extraction', sub: 'rules + Nemotron', icon: 'list', tab: 'Verification', api: '/api/pipeline/stages', stage: 'extract' },
      { id: 'pr-normalise', name: 'Citation Normalisation', sub: 'parallel-citation merge', icon: 'git-merge', tab: 'Verification', api: '/api/pipeline/stages', stage: 'normalise' },
      { id: 'pr-mischar', name: 'Mischaracterisation Analysis', sub: 'Nemotron embeddings / reasoning', icon: 'git-compare-arrows', tab: 'Verification', api: '/api/pipeline/stages', stage: 'mischar' },
    ],
  },
  {
    id: 'verification',
    n: 3,
    title: 'Verification + Live Retrieval',
    nodes: [
      { id: 'vf-deterministic', name: 'Deterministic Verification Engine', sub: 'match citations to known authorities', icon: 'shield-check', tab: 'Verification', api: '/api/pipeline/stages', stage: 'deterministic' },
      { id: 'vf-perplexity', name: 'Perplexity API', sub: 'live web / out-of-corpus lookup', icon: 'search', tab: 'Data Sources', api: '/api/engines', stage: 'live' },
      { id: 'vf-external', name: 'External Sources', sub: 'web / legislation / case databases', icon: 'database', tab: 'Data Sources', api: '/api/sources' },
    ],
  },
  {
    id: 'outputs',
    n: 4,
    title: 'Outputs + Human Supervision',
    nodes: [
      { id: 'out-verdicts', name: 'Citation Verdicts', sub: 'Verified / Mischaracterised / Fabricated', icon: 'check-circle', tab: 'Citation Checker', api: '/api/findings' },
      { id: 'out-risk', name: 'Risk Score + Explanation', sub: 'graded risk with rationale', icon: 'bar-chart-3', tab: 'Insights', api: '/api/scores' },
      { id: 'out-dashboard', name: 'Partner Review Dashboard', sub: 'approve · amend · override', icon: 'monitor', tab: 'Citation Checker', api: '/api/queue' },
      { id: 'out-audit', name: 'Audit Trail / Report', sub: 'defensible supervision record', icon: 'file-check-2', tab: 'Audit Trail', api: '/api/audit' },
    ],
  },
];

// Bottom band — Application Infrastructure (UI · API · Database · Reports).
const INFRASTRUCTURE = [
  { id: 'inf-ui', name: 'UI', sub: 'React verification dashboard', icon: 'layout', tab: 'Dashboard', api: null },
  { id: 'inf-api', name: 'API', sub: 'REST — Node http server', icon: 'cog', tab: 'System', api: '/api/health' },
  { id: 'inf-db', name: 'Database', sub: 'persisted document store', icon: 'database', tab: 'System', api: '/api/bootstrap' },
  { id: 'inf-reports', name: 'Reports', sub: 'partner-ready filing record', icon: 'file-text', tab: 'Audit Trail', api: '/api/reports' },
];

// Left-to-right data-flow edges between columns (for the connector arrows).
const FLOW = [
  { from: 'inputs', to: 'processing' },
  { from: 'processing', to: 'verification' },
  { from: 'verification', to: 'outputs' },
];

function model() {
  return {
    title: 'Legal AI Citation Verification & Supervision System',
    subtitle: 'Powered by NVIDIA Open Models and Perplexity',
    columns: COLUMNS,
    infrastructure: INFRASTRUCTURE,
    flow: FLOW,
  };
}

module.exports = { model };
