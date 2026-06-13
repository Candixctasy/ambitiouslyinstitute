#!/usr/bin/env node
/**
 * Replaces "barrier" (skin barrier) terminology with proper medical esthetician terms.
 * "barrier" → "acid mantle" (the skin's acid pH protective layer)
 * "barrier lipids" → "intercellular lipids" (ceramide/cholesterol/FA matrix — distinct concept)
 *
 * Run on: cai-handler.js, ingredients.json
 */

const fs = require('fs');
const path = require('path');

// Ordered replacements — more specific phrases first, then broader ones
// Each entry: [regex/string, replacement, flags]
const REPLACEMENTS = [
  // ── Lipid-specific (not the acid mantle — the intercellular lipid matrix) ──
  [/barrier lipid(s?)/gi, 'intercellular lipid$1'],
  [/lipid barrier/gi, 'intercellular lipid matrix'],

  // ── Specific compound phrases ──
  [/acid mantle disruption/gi, 'acid mantle disruption'],  // already correct if it shows up
  [/barrier disruption/gi, 'acid mantle disruption'],
  [/barrier breakdown/gi, 'acid mantle breakdown'],
  [/barrier compromise/gi, 'acid mantle compromise'],
  [/barrier damage/gi, 'acid mantle damage'],
  [/barrier recovery/gi, 'acid mantle recovery'],
  [/barrier repair/gi, 'acid mantle restoration'],
  [/repair the barrier/gi, 'restore the acid mantle'],
  [/restore the barrier/gi, 'restore the acid mantle'],
  [/barrier is restored/gi, 'acid mantle is restored'],
  [/barrier is intact/gi, 'acid mantle is intact'],
  [/barrier is confirmed intact/gi, 'acid mantle is confirmed intact'],
  [/barrier health/gi, 'acid mantle integrity'],
  [/barrier integrity/gi, 'acid mantle integrity'],
  [/barrier function/gi, 'acid mantle function'],
  [/barrier status/gi, 'acid mantle status'],
  [/barrier support/gi, 'acid mantle support'],
  [/barrier calm/gi, 'acid mantle support'],
  [/barrier concerns/gi, 'acid mantle concerns'],
  [/barrier tolerance/gi, 'acid mantle tolerance'],

  // ── Adjective forms ──
  [/compromised barrier/gi, 'compromised acid mantle'],
  [/severely compromised barrier/gi, 'severely compromised acid mantle'],
  [/damaged barrier/gi, 'damaged acid mantle'],
  [/impaired barrier/gi, 'impaired acid mantle'],
  [/barrier-compromised/gi, 'acid mantle-compromised'],
  [/barrier-first/gi, 'acid mantle integrity-focused'],
  [/barrier-friendly/gi, 'acid mantle-friendly'],

  // ── Noun forms ──
  [/skin barrier/gi, 'acid mantle'],
  [/epidermal barrier/gi, 'acid mantle'],
  [/moisture barrier/gi, 'acid mantle'],
  [/protective barrier/gi, 'acid mantle'],
  [/stratum corneum barrier/gi, 'acid mantle'],

  // ── Verb phrases ──
  [/protect(ing)? the barrier/gi, 'protect$1 the acid mantle'],
  [/strengthen(ing)? the barrier/gi, 'strengthen$1 the acid mantle'],
  [/support(ing)? the barrier/gi, 'support$1 the acid mantle'],
  [/maintain(ing)? the barrier/gi, 'maintain$1 the acid mantle'],
  [/repair(ing)? the barrier/gi, 'restor$1 the acid mantle'],
  [/build(ing)? the barrier/gi, 'build$1 the acid mantle'],
  [/rebuild(ing)? the barrier/gi, 'rebuild$1 the acid mantle'],

  // ── Standalone "barrier" as noun (most general — run last) ──
  // Only where it clearly means the skin's protective layer
  [/the barrier\b/gi, 'the acid mantle'],
  [/\ba barrier\b/gi, 'an acid mantle'],

  // ── barrierStatus field name (JSON schema) ──
  [/"barrierStatus"/g, '"acidMantleStatus"'],
  [/barrierStatus/g, 'acidMantleStatus'],

  // ── Remove hype/trend language ──
  [/\btrending ingredient\b/gi, 'clinically studied ingredient'],
  [/\bclean beauty\b/gi, 'consciously formulated'],
  [/\bnon-toxic\b/gi, 'toxicologically reviewed'],
  [/\bclean\b(?= ingredient| formula| skincare)/gi, 'consciously sourced'],
  [/\bgame[- ]changer\b/gi, 'clinically significant'],
  [/\bmiracl\w+\b/gi, 'clinically validated'],
  [/\brevolutionar\w+\b/gi, 'evidence-based'],
];

function applyReplacements(content) {
  let result = content;
  for (const [pattern, replacement] of REPLACEMENTS) {
    if (typeof pattern === 'string') {
      result = result.split(pattern).join(replacement);
    } else {
      result = result.replace(pattern, replacement);
    }
  }
  return result;
}

const files = [
  path.resolve(__dirname, '../aws/lambda/cai-handler.js'),
  path.resolve(__dirname, '../bybobo/data/ingredients.json'),
];

for (const filePath of files) {
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = applyReplacements(original);
  if (original !== updated) {
    fs.writeFileSync(filePath, updated, 'utf8');
    const count = (original.match(/barrier/gi) || []).length;
    console.log(`✅ ${path.basename(filePath)}: replaced ~${count} instances`);
  } else {
    console.log(`⬜ ${path.basename(filePath)}: no changes needed`);
  }
}

// Verify
const handler = fs.readFileSync(path.resolve(__dirname, '../aws/lambda/cai-handler.js'), 'utf8');
const remaining = (handler.match(/\bbarrier\b/gi) || []);
if (remaining.length > 0) {
  console.log('\n⚠️  Remaining "barrier" in cai-handler.js:');
  const lines = handler.split('\n');
  lines.forEach((line, i) => {
    if (/\bbarrier\b/i.test(line)) console.log(`  L${i+1}: ${line.trim()}`);
  });
} else {
  console.log('\n✅ cai-handler.js: zero remaining "barrier" instances');
}

// Validate JSON
const json = fs.readFileSync(path.resolve(__dirname, '../bybobo/data/ingredients.json'), 'utf8');
try {
  JSON.parse(json);
  console.log('✅ ingredients.json: still valid JSON');
} catch(e) {
  console.error('❌ ingredients.json: JSON parse error after replacement!', e.message);
}
