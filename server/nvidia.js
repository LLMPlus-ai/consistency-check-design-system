'use strict';
/*
 * nvidia.js — the "NVIDIA AI Processing Layer" + "Perplexity API" boxes, live.
 *
 * Talks to the real models used in the hackathon brief:
 *   • NVIDIA Nemotron (open models) via OpenRouter   — reasoning / extraction /
 *     mischaracterisation analysis. Chat-completions, OpenAI-compatible.
 *   • Perplexity `sonar`                              — live out-of-corpus web
 *     retrieval for citations not in the local corpus.
 *
 * Keys are read from the environment (never committed). For local hackathon
 * convenience they fall back to the provided brief files under
 * challenges_documents/ when those exist on disk. If no key is configured the
 * client reports `configured:false` and the pipeline uses its deterministic
 * engine instead — the product still works fully offline.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ---- tiny .env loader (no dependency) ----
(function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
})();

// ---- key resolution: env first, then the brief files (dev only) ----
function readBriefKey(relPath, pattern) {
  try {
    const p = path.join(ROOT, 'challenges_documents', relPath);
    if (!fs.existsSync(p)) return null;
    const m = fs.readFileSync(p, 'utf8').match(pattern);
    return m ? m[0] : null;
  } catch { return null; }
}

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY
  || readBriefKey('models/nvidia/api_key.md', /sk-or-v1-[a-f0-9]+/);
const PERPLEXITY_KEY = process.env.PERPLEXITY_API_KEY
  || readBriefKey('models/Perplexity AI_used_to_search_internet/api.md', /pplx-[A-Za-z0-9]+/);

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const PERPLEXITY_URL = 'https://api.perplexity.ai/chat/completions';

// Model catalogue (verbatim OpenRouter ids from the brief). Each pipeline stage
// picks a tier: nano for cheap extraction, super for reasoning, ultra for the
// hardest judgments.
const MODELS = {
  nano: 'nvidia/nemotron-3-nano-30b-a3b:free',
  super: 'nvidia/nemotron-3-super-120b-a12b:free',
  ultra: 'nvidia/nemotron-3-ultra-550b-a55b',
  perplexity: 'sonar',
};

function configured() {
  return { openrouter: !!OPENROUTER_KEY, perplexity: !!PERPLEXITY_KEY };
}

async function withTimeout(promise, ms, label) {
  let to;
  const timeout = new Promise((_, rej) => { to = setTimeout(() => rej(new Error((label || 'request') + ' timed out')), ms); });
  try { return await Promise.race([promise, timeout]); }
  finally { clearTimeout(to); }
}

/* Call a Nemotron model via OpenRouter. Returns { text, model, usage }. */
async function nemotron(messages, opts = {}) {
  if (!OPENROUTER_KEY) throw new Error('OPENROUTER_API_KEY not configured');
  const model = opts.model || MODELS[opts.tier || 'super'] || MODELS.super;
  const res = await withTimeout(fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + OPENROUTER_KEY,
      'HTTP-Referer': 'https://consistency-check.local',
      'X-Title': 'Consistency Check',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: opts.maxTokens || 600,
      temperature: opts.temperature != null ? opts.temperature : 0.1,
      ...(opts.json ? { response_format: { type: 'json_object' } } : {}),
    }),
  }), opts.timeout || 45000, 'Nemotron');
  const data = await res.json();
  if (data.error) throw new Error('OpenRouter: ' + (data.error.message || JSON.stringify(data.error)));
  return { text: (data.choices && data.choices[0] && data.choices[0].message.content) || '', model: data.model || model, usage: data.usage || null };
}

/* Call Perplexity `sonar` for live web retrieval. Returns { text, citations }. */
async function perplexity(query, opts = {}) {
  if (!PERPLEXITY_KEY) throw new Error('PERPLEXITY_API_KEY not configured');
  const res = await withTimeout(fetch(PERPLEXITY_URL, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + PERPLEXITY_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODELS.perplexity,
      messages: [
        ...(opts.system ? [{ role: 'system', content: opts.system }] : []),
        { role: 'user', content: query },
      ],
      max_tokens: opts.maxTokens || 400,
      temperature: 0.1,
    }),
  }), opts.timeout || 45000, 'Perplexity');
  const data = await res.json();
  if (data.error) throw new Error('Perplexity: ' + (data.error.message || JSON.stringify(data.error)));
  return {
    text: (data.choices && data.choices[0] && data.choices[0].message.content) || '',
    citations: data.citations || (data.choices && data.choices[0] && data.choices[0].message.citations) || [],
  };
}

// Best-effort JSON extraction from a model reply (handles ```json fences).
function parseJSON(text) {
  if (!text) return null;
  let t = text.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const a = t.indexOf('{'); const b = t.lastIndexOf('}');
  if (a >= 0 && b > a) t = t.slice(a, b + 1);
  try { return JSON.parse(t); } catch { return null; }
}

module.exports = { configured, nemotron, perplexity, parseJSON, MODELS, OPENROUTER_URL, PERPLEXITY_URL };
