#!/usr/bin/env node
// Structural verifier for the brand guideline documentation system.
// Implements acceptance criteria §10.1 and §10.2 from
// docs/superpowers/specs/2026-05-04-branding-guideline-design.md
//
// Exit code: 0 if all checks pass, 1 otherwise.

import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const failures = [];

function fail(msg) {
  failures.push(msg);
}

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}

function read(relPath) {
  const full = join(ROOT, relPath);
  if (!existsSync(full)) return null;
  return readFileSync(full, 'utf8');
}

const REQUIRED_FILES = [
  'docs/brand-guideline.md',
  'docs/brand/foundations.md',
  'docs/brand/voice.md',
  'docs/brand/presentation.md',
  'docs/brand/proposal.md',
  'docs/brand/invoice.md',
  'docs/brand/enquiry.md',
  'docs/brand/email-signature.md',
  'docs/brand/social.md',
  'docs/brand/video.md',
];

const CHANNEL_FILES = REQUIRED_FILES.filter((f) =>
  /^docs\/brand\/(presentation|proposal|invoice|enquiry|email-signature|social|video)\.md$/.test(f)
);

const CHANNEL_TEMPLATE_HEADINGS = [
  'Purpose & context',
  'Visual specs',
  'Verbal specs',
  'Format & dimensions',
  'Layout & composition',
  'Component',
  'Templates',
  'Worked examples',
  'Do / Don',
  'Hard constraints',
  'Asset references',
  'Related docs',
];

const FOUNDATIONS_HEADINGS = [
  'Brand essence',
  'Color',
  'Typography',
  'Logo',
  'Iconography',
  'Spacing',
  'Shape',
  'Motion',
  'Imagery',
  'Composition',
  'Accessibility',
  'Token reference',
];

const VOICE_HEADINGS = [
  'Brand voice in one breath',
  'Voice attributes',
  'Tone spectrum',
  'Writing principles',
  'Vocabulary',
  'Audience',
  'Value proposition',
  'Common formats',
  'Do / Don',
  'Out of scope',
];

const ENTRY_HEADINGS = [
  'What #sharp is',
  'Brand at a glance',
  'Document index',
  'Using these docs with AI',
  'Source of truth',
  'Out of scope',
];

const FORBIDDEN_VALUE_RULES = [
  {
    needle: '#ED2224',
    reason: 'old primary red — should be #D41F21',
    // Allowed in foundations.md only, where it's documented as the
    // intentional semantic error color (still #ED2224 in tailwind.config.js).
    allowedIn: ['docs/brand/foundations.md'],
  },
  {
    needle: 'Frutiger',
    reason: 'dead font — should not be referenced',
    allowedIn: [],
  },
  {
    needle: 'frutiger-light',
    reason: 'dead font asset — should not be referenced',
    allowedIn: [],
  },
];

const SCAN_PATHS = [
  ...REQUIRED_FILES,
  'docs/02_visual-design-system.md',
  'docs/04_content-framework.md',
  // Added for #34 — Frutiger drift guard
  'CLAUDE.md',
  'docs/00_specifications.md',
  'docs/01_web-design-strategy.md',
  'docs/06_migration-plan.md',
  'src/app/globals.css',
];

console.log('\n→ Checking required files exist…');
for (const f of REQUIRED_FILES) {
  if (existsSync(join(ROOT, f))) pass(f);
  else fail(`Missing file: ${f}`);
}

console.log('\n→ Checking entry doc length (≤ 200 lines)…');
const entry = read('docs/brand-guideline.md');
if (entry !== null) {
  const lines = entry.split('\n').length;
  if (lines <= 200) pass(`docs/brand-guideline.md is ${lines} lines`);
  else fail(`docs/brand-guideline.md is ${lines} lines (max 200)`);
}

console.log('\n→ Checking entry doc sections…');
if (entry !== null) {
  for (const h of ENTRY_HEADINGS) {
    if (entry.includes(h)) pass(`entry has section: ${h}`);
    else fail(`entry missing section: ${h}`);
  }
}

console.log('\n→ Checking foundations.md sections…');
const foundations = read('docs/brand/foundations.md');
if (foundations !== null) {
  for (const h of FOUNDATIONS_HEADINGS) {
    if (foundations.includes(h)) pass(`foundations has section: ${h}`);
    else fail(`foundations missing section: ${h}`);
  }
}

console.log('\n→ Checking voice.md sections…');
const voice = read('docs/brand/voice.md');
if (voice !== null) {
  for (const h of VOICE_HEADINGS) {
    if (voice.includes(h)) pass(`voice has section: ${h}`);
    else fail(`voice missing section: ${h}`);
  }
}

console.log('\n→ Checking each channel doc follows the 12-section template…');
for (const channel of CHANNEL_FILES) {
  const content = read(channel);
  if (content === null) continue;
  for (const h of CHANNEL_TEMPLATE_HEADINGS) {
    if (content.includes(h)) pass(`${channel}: ${h}`);
    else fail(`${channel} missing section: ${h}`);
  }
}

console.log('\n→ Scanning for forbidden values (drift / dead refs)…');
for (const f of SCAN_PATHS) {
  const content = read(f);
  if (content === null) continue;
  for (const { needle, reason, allowedIn } of FORBIDDEN_VALUE_RULES) {
    if (allowedIn.includes(f)) continue;
    if (content.includes(needle)) {
      fail(`${f} contains "${needle}" — ${reason}`);
    }
  }
}
pass('forbidden-value scan complete');

console.log('\n→ Checking foundations.md has machine-readable token block…');
if (foundations !== null) {
  if (/```json[\s\S]*"primary"[\s\S]*```/.test(foundations)) {
    pass('foundations has JSON token block with "primary"');
  } else {
    fail('foundations.md missing fenced ```json block containing "primary"');
  }
}

console.log('\n→ Checking foundations.md cites source files…');
if (foundations !== null) {
  const expectedSources = ['tailwind.config.js', 'layout.tsx', 'globals.css'];
  for (const src of expectedSources) {
    if (foundations.includes(src)) pass(`foundations cites ${src}`);
    else fail(`foundations does not cite ${src}`);
  }
}

console.log('\n→ Checking 02 + 04 reconciliation pointers…');
const ds = read('docs/02_visual-design-system.md');
const cf = read('docs/04_content-framework.md');
if (ds !== null) {
  if (ds.includes('brand/foundations.md')) pass('02 cites brand/foundations.md');
  else fail('02_visual-design-system.md missing pointer to brand/foundations.md');
}
if (cf !== null) {
  if (cf.includes('brand/voice.md')) pass('04 cites brand/voice.md');
  else fail('04_content-framework.md missing pointer to brand/voice.md');
}

console.log('');
if (failures.length === 0) {
  console.log('✓ All structural checks passed.\n');
  process.exit(0);
} else {
  console.log(`✗ ${failures.length} failure(s):\n`);
  for (const f of failures) console.log(`  ✗ ${f}`);
  console.log('');
  process.exit(1);
}
