# Branding Guideline Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the multi-channel brand guideline documentation system specified in `docs/superpowers/specs/2026-05-04-branding-guideline-design.md` — 10 new docs + reconciliation of 2 existing docs + a verification script — reflecting the current shipping website.

**Architecture:** Progressive disclosure — short entry doc in `docs/`, canonical visual + verbal references in `docs/brand/`, seven self-contained per-channel docs in `docs/brand/`. Each channel doc inlines its brand subset and links to canonical refs. A Node verification script enforces structural acceptance criteria; AI-readiness probes are run manually as a final gate.

**Tech Stack:** Markdown documentation; Node ESM verification script (run via `node scripts/verify-brand-docs.mjs`); existing repo tooling (Bun, prettier-on-commit via husky + lint-staged).

**Branch:** Working on `feature/issue-22-brand-guideline-spec` (already pushed). All commits go to this branch; PR to `develop` per gitflow when complete.

**Reference:** Source-of-truth files for reconciliation are:

- `tailwind.config.js` — colors, fontFamily, fontSize, container, animations
- `src/app/layout.tsx` — Google Fonts loaded via `next/font/google` (Manrope + Inter)
- `src/app/globals.css` — custom CSS utilities, motion curves, shadow patterns
- `src/components/**/*.tsx` — actual class usage (`font-heading`, `font-body`, etc.)
- `img/` — logo and photography asset inventory
- `docs/04_content-framework.md` — voice/tone source material to extract

---

## File Structure

**Create:**

- `docs/brand-guideline.md` — entry point (target ≤ 200 lines)
- `docs/brand/foundations.md` — canonical visual ref
- `docs/brand/voice.md` — canonical verbal ref
- `docs/brand/presentation.md` — Google Slides / decks
- `docs/brand/proposal.md` — client proposals
- `docs/brand/invoice.md` — invoices
- `docs/brand/enquiry.md` — first-contact replies
- `docs/brand/email-signature.md` — email signatures
- `docs/brand/social.md` — LinkedIn / X / Bluesky
- `docs/brand/video.md` — video content
- `scripts/verify-brand-docs.mjs` — structural verifier

**Modify:**

- `docs/02_visual-design-system.md` — reconcile to shipping code; narrow to web-engineering reference
- `docs/04_content-framework.md` — extract voice content; narrow to web copy reference
- `package.json` — add `verify:brand` script

---

## Task 1: Build the verification script

**Files:**

- Create: `scripts/verify-brand-docs.mjs`
- Modify: `package.json` (add `scripts.verify:brand`)

**Why first:** subsequent tasks treat the verifier as the failing-test → passing-test gate. Building it first means every doc-writing task ends with a concrete pass/fail signal.

- [ ] **Step 1: Create the script with all checks expressed as failing-by-default assertions.**

Create `scripts/verify-brand-docs.mjs` with this exact content:

````javascript
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
````

- [ ] **Step 2: Add the verify script to `package.json`.**

Modify `package.json`. The existing `"scripts"` block is at lines 5-11. Add `"verify:brand"` after `"lint"`:

```json
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "verify:brand": "node scripts/verify-brand-docs.mjs",
    "prepare": "husky"
  },
```

- [ ] **Step 3: Run the verifier — it must fail because no brand docs exist yet.**

Run: `bun run verify:brand`

Expected: exit code 1; output lists "Missing file: docs/brand-guideline.md", "Missing file: docs/brand/foundations.md", and so on for all 10 required files.

If it passes, the verifier is broken — re-check Step 1.

- [ ] **Step 4: Commit.**

```bash
git add scripts/verify-brand-docs.mjs package.json
git commit -m "Add brand docs verification script (#22)"
```

---

## Task 2: Write `docs/brand/foundations.md`

**Files:**

- Create: `docs/brand/foundations.md`
- Reference (read-only): `tailwind.config.js`, `src/app/layout.tsx`, `src/app/globals.css`, `src/components/**/*.tsx`, `img/`

**Why second:** every other doc cites it; building it first establishes canonical token values.

- [ ] **Step 1: Read the source-of-truth files.**

Read each of these files completely before writing:

```
tailwind.config.js
src/app/layout.tsx
src/app/globals.css
src/components/Header.tsx
src/components/Footer.tsx
src/components/Layout.tsx
src/app/page.tsx
src/app/contact/page.tsx
```

For each value you'll document, note the source file and line. The doc must cite these in the form "from `tailwind.config.js` → `colors.primary`" or "from `src/app/layout.tsx` (Google Fonts via next/font)".

Also list the `img/` folder contents:

```bash
ls img/
```

- [ ] **Step 2: Verify dead/drift references.**

```bash
grep -i "frutiger\|#ED2224" src/ tailwind.config.js docs/02_visual-design-system.md
```

Expected: matches in `docs/02_visual-design-system.md` (the drifted doc) and in `src/app/globals.css` (commented-out Frutiger `@font-face`). No active uses in src.

Also check the lucide-react usage — there is exactly one (in `src/components/ui/select.tsx`, for shadcn select chrome). The foundations doc must reflect this nuance: hand-crafted SVG for **brand icons** (custom in `src/components/icons/`); lucide-react allowed only for **UI affordances within shadcn components**. Do NOT write a blanket "no third-party icon libraries" rule that contradicts the actual code.

```bash
grep -rn "lucide" src/
```

Expected: one match in `src/components/ui/select.tsx`.

- [ ] **Step 3: Create `docs/brand/foundations.md` with all 12 sections.**

Use the section list from spec §5 (Foundations doc anatomy). Each H2 heading must contain one of the keyword strings the verifier checks for: "Brand essence", "Color", "Typography", "Logo", "Iconography", "Spacing", "Shape", "Motion", "Imagery", "Composition", "Accessibility", "Token reference".

**Required content per section:**

1. **Brand essence** — one paragraph; "clean, professional, trustworthy, AI-confident".
2. **Color** — primary `#D41F21` (cite: `tailwind.config.js` line 11), hover `#BC1B1D`, active `#A41719`. Charcoal `#333333`. Pure white. The 11 `*-sharp` extended hues from `tailwind.config.js` lines 15-25. Semantic: success `#25ED21`, warning `#EDEA21`, error `#ED2224`, info `#218BED`. WCAG pairings: which colors pass AA against white background, which against charcoal. Do/don't combinations (e.g., never red-on-yellow).
3. **Typography** — Manrope (headings) via `next/font/google` in `src/app/layout.tsx`. Inter (body) via same. Type scale: `text-lg` 1rem/410, `text-xl` 1.22rem/300, `text-2xl` 1.68rem, `text-4xl` 2.6rem/1.224, `text-5xl` 5rem/200/1.32 (cite `tailwind.config.js` lines 36-42). Body letter-spacing -0.02em (cite `globals.css` line 44). Web-fallback: Manrope → Inter → sans-serif. Print/PDF: substitute with system sans (Helvetica Neue / Arial) when Manrope unavailable.
4. **Logo** — inventory of `img/sharp_logo.svg`, `img/sharp_logo_invert.svg`, `img/sharp_logo.png`, `img/sharp_logo_w264.png`. Clear-space rule (suggest 0.5× logo height all sides). Minimum web 24px height; minimum print 12mm. Color variants. Do/don't (no recoloring outside brand, no rotation, no shadow effects). **Identified gaps section** listing missing variants: favicon set, 1:1 square avatar for social, horizontal lockup. Note these are tracked as separate issues.
5. **Iconography** — custom SVG in `src/components/icons/` (TeamIcon, TrackIcon, FlaskIcon visible in `src/app/contact/page.tsx`). Style: stroke-based, ~1.5px line weight, rounded line caps, geometric. **Exception:** lucide-react allowed in shadcn UI components (`src/components/ui/`) for affordance icons (chevrons, checks). Brand-distinctive iconography is hand-crafted only.
6. **Spacing & rhythm** — custom utility scale from `globals.css`: `.py-19` 8rem/8rem, `.py-20` 4.8rem/8rem, `.py-21` 4.8rem/8.7rem, `.py-24` 8rem/11.6rem (cite `globals.css` lines 62-80). Mobile collapsed values from the `@media (max-width: 767px)` block. Container max-width `66em` (cite `tailwind.config.js` line 44). Container padding `2rem`. Breakpoints: 767px mobile, 1400px 2xl.
7. **Shape & elevation** — signature shadow `box-shadow: -20px 24px 70px -6px rgba(0, 0, 0, 0.12)` for cards (cite `globals.css` line 184). Hover state `-2px 8px 15px -4px rgba(0, 0, 0, 0.18)` (cite line 189). The asymmetric direction (negative X, positive Y) is deliberate — never use generic centered shadows.
8. **Motion** — bezier curves: `cubic-bezier(0.5, 0.09, 0.7, 1)` for shadow transitions (cite `globals.css` line 185); `cubic-bezier(0.08, 0, 0.83, 1)` for slow zoom (cite line 150); `cubic-bezier(0.21, 0.01, 0.47, 0.99)` for hover underline (cite line 242); `cubic-bezier(0.1, 0.09, 0.11, 1)` for fast hover (cite line 190). Standard durations: 0.28s underline, 0.4s hover, 0.48s shadow, 20s slow zoom. When to animate: image zoom on hover, shadow lift on card hover, underline reveal on links. When not: page transitions stay calm.
9. **Imagery & photography** — observed style in `img/`: candid-professional team portraits (`janos.*`, `loreen.*`); real-world business contexts (`pexels-yankrukov-7693692.jpg`); service images (`analyse.jpg`, `automation.jpg`, `customerExperience.jpg`). Style: warm lighting, muted-but-present color, no stock-corporate handshakes. Color overlay: dark backgrounds with image at 0.16 opacity scaled 1.25 (the `.zoom-background` pattern from `globals.css` lines 135-155). Aspect ratios in active use: 1920×1080 landscape; 1:1 square avatars.
10. **Composition & hierarchy** — hero pattern: `text-5xl` headline at weight 200 with line-height 1.32 — airy, not heavy. Red accent: appears only on CTAs (`text-primary`), key spans inside headings (`.content-title > span` etc., cite `globals.css` lines 321-326), and the page-header-details (line 367). Asymmetric grid pattern: `.intro-container { grid-template-columns: 0.444fr 1fr }` (cite `globals.css` line 170) — the 0.444 ratio is brand-specific.
11. **Accessibility** — WCAG 2.1 AA contrast tables. Primary `#D41F21` against white: 5.0:1 (passes AA for normal text). Charcoal `#333` against white: 12.6:1 (passes AAA). Provide pass/fail for each `*-sharp` color against both white and charcoal. Minimum text size: 14px web, 9pt print. Focus states required on all interactive elements.
12. **Token reference (machine-readable)** — a fenced ` ```json ` block listing every token. Required structure:

````
```json
{
  "color": {
    "primary": "#D41F21",
    "primary-hover": "#BC1B1D",
    "primary-active": "#A41719",
    "charcoal": "#333333",
    "white": "#FFFFFF",
    "extended": {
      "orange-sharp": "#ED8421",
      "yellow-sharp": "#EDEA21",
      "lime-sharp": "#8BED21",
      "green-sharp": "#25ED21",
      "mint-sharp": "#21ED84",
      "cyan-sharp": "#21EDEA",
      "sky-sharp": "#218BED",
      "blue-sharp": "#2125ED",
      "purple-sharp": "#8421ED",
      "magenta-sharp": "#EA21ED",
      "pink-sharp": "#ED218B"
    },
    "semantic": {
      "success": "#25ED21",
      "warning": "#EDEA21",
      "error": "#ED2224",
      "info": "#218BED"
    }
  },
  "typography": {
    "heading": "Manrope",
    "body": "Inter",
    "scale": {
      "lg": "1rem",
      "xl": "1.22rem",
      "2xl": "1.68rem",
      "4xl": "2.6rem",
      "5xl": "5rem"
    }
  },
  "spacing": {
    "container-max": "66em",
    "container-padding": "2rem"
  },
  "shadow": {
    "card": "-20px 24px 70px -6px rgba(0,0,0,0.12)",
    "card-hover": "-2px 8px 15px -4px rgba(0,0,0,0.18)"
  },
  "motion": {
    "ease-shadow": "cubic-bezier(0.5, 0.09, 0.7, 1)",
    "ease-zoom": "cubic-bezier(0.08, 0, 0.83, 1)",
    "ease-underline": "cubic-bezier(0.21, 0.01, 0.47, 0.99)",
    "ease-hover": "cubic-bezier(0.1, 0.09, 0.11, 1)"
  }
}
```
````

- [ ] **Step 4: Run the verifier.**

Run: `bun run verify:brand`

Expected: foundations checks pass (sections present, JSON token block found, source files cited). Other docs still missing — that's expected.

- [ ] **Step 5: Commit.**

```bash
git add docs/brand/foundations.md
git commit -m "Add brand/foundations.md canonical visual reference (#22)"
```

---

## Task 3: Write `docs/brand/voice.md`

**Files:**

- Create: `docs/brand/voice.md`
- Reference (read-only): `docs/04_content-framework.md`

- [ ] **Step 1: Read the source.**

Read `docs/04_content-framework.md` end-to-end. Identify which sections are voice/verbal-rules (extract) vs which are web-page-specific copy (leave behind in §4 of this plan):

**Extract to `voice.md`:**

- "Content Guidelines & Tone of Voice" → Brand Voice Attributes; Writing Guidelines; Communication Style; Language & Tone
- "Value Propositions & Key Messaging" → Core Value Proposition; Messaging Hierarchy; Target Audience Messaging
- Any tone-of-voice prescriptions and content quality standards that aren't web-specific

**Leave in `04_content-framework.md`:**

- "Headlines & Subheadings" (page-by-page H1/H2/H3 copy)
- "Call-to-Action Copy" (web CTA text)
- "SEO-Optimized Content Structure"
- "Content Calendar & Strategy"

- [ ] **Step 2: Create `docs/brand/voice.md` with all 10 sections per spec §6.**

Each H2 must contain one of the verifier keywords: "Brand voice in one breath", "Voice attributes", "Tone spectrum", "Writing principles", "Vocabulary", "Audience", "Value proposition", "Common formats", "Do / Don", "Out of scope".

**Required content per section:**

1. **Brand voice in one breath** — exactly one sentence: "#sharp sounds authoritative, trustworthy, innovative, and results-focused — clear and confident without aggressive sales language."
2. **Voice attributes** — four pillars from `04_content-framework.md` (authoritative / trustworthy / innovative / results-focused). For each: definition (1 sentence), what it sounds like (1 example), what it deliberately is not (1 example).
3. **Tone spectrum** — three-row matrix: formal-corporate (proposals, invoices, T&Cs); professional-warm (web pages, presentations, enquiry replies); conversational-confident (LinkedIn posts, video, social). Each row: 2-3 example phrasings of the same idea ("we help with digital transformation") at that tone.
4. **Writing principles** — bulleted operational rules: active voice; present tense for capabilities; precision over plain language (technical terms allowed when they're precise); UK English (`en_GB`); Oxford comma yes; Title Case for H1s, Sentence case for H2-H4; the brand name "#sharp" is always lowercase with a hash prefix and never starts a sentence (rephrase if needed); never appears as "Sharp" or "SHARP".
5. **Vocabulary** — three lists. **Signature phrases** (10 items): "digital transformation", "AI-first approach", "measurable impact", "operational efficiency", "customer experience", "data and analytics", "transformation journey", "intelligent automation", "actionable intelligence", "strategic partner". **Preferred over alternatives** (5 pairs): partner not vendor; transformation not disruption; programme not initiative; outcomes not deliverables; help not solution. **Avoid** (10 items): synergy; leverage as verb; best-in-class; world-class; cutting-edge; revolutionise; game-changer; ecosystem (when used vaguely); thought leader (use evidence instead); any superlative without proof.
6. **Audience-aware messaging** — three personas. C-suite (focus: ROI, strategic outcomes; tone: results-oriented; sample sentence). Operations & technology managers (focus: process, efficiency; tone: practical; sample). Business development professionals (focus: growth, customer acquisition; tone: scalable solutions; sample). Carry across faithfully from `04_content-framework.md`, refined.
7. **Value proposition library** — core brand promise (one paragraph). Three service-level value props (customer experience / operational efficiency / data & analytics) — each with primary, secondary, tertiary phrasings. Pre-approved language AI can pull verbatim. Carry from `04_content-framework.md`.
8. **Common formats** — six templates with worked examples: tagline (≤8 words); section heading (≤7 words, sentence case); one-paragraph elevator pitch (60-80 words); CTA verb phrase (2-4 words, action verb first); sign-off line for emails ("[Name] · [Role] · #sharp"); company boilerplate (the "About #sharp" paragraph used in every proposal/press release — write a 60-80 word version).
9. **Do / Don't sample copy** — three pairs. **1-line:** generic ("We leverage cutting-edge AI to revolutionise your business synergies.") vs on-brand ("We help businesses use AI to make their operations measurably better."). **Paragraph:** generic 80-word corporate slop vs on-brand 80-word precise statement. **Full email:** generic 200-word "happy to chat" reply vs on-brand 200-word substantive enquiry response with concrete next step.
10. **Out of scope (verbal)** — explicit list: legal/contract language (governed by lawyers); technical documentation tone (governed by docs-as-code conventions); internal Slack tone; individual team members' personal LinkedIn voices.

- [ ] **Step 3: Run the verifier.**

Run: `bun run verify:brand`

Expected: voice section checks pass; remaining missing files still listed.

- [ ] **Step 4: Commit.**

```bash
git add docs/brand/voice.md
git commit -m "Add brand/voice.md canonical verbal reference (#22)"
```

---

## Task 4: Reconcile `docs/02_visual-design-system.md`

**Files:**

- Modify: `docs/02_visual-design-system.md`

**Goal:** narrow scope to web-engineering reference; fix all drift; cite `brand/foundations.md` as source of truth for brand-level rules.

- [ ] **Step 1: Add upward pointer at the top.**

Insert immediately after the `# Visual Design System` H1, before the existing `## #sharp - Digital Transformation Consultancy` line:

```markdown
> **Brand-level visual rules live in [`brand/foundations.md`](brand/foundations.md).** This document is the **web implementation reference** — Tailwind class mappings, component CSS, web-specific WCAG verification. When this doc and `brand/foundations.md` disagree, foundations wins.
```

- [ ] **Step 2: Fix all `#ED2224` references to `#D41F21` and add hover/active variants.**

Search the file for `#ED2224`:

```bash
grep -n "#ED2224" docs/02_visual-design-system.md
```

For each match, change `#ED2224` to `#D41F21` UNLESS the context is explicitly "Error" (the semantic error color is still `#ED2224` per `tailwind.config.js` line 28 — it diverged from primary on purpose). Keep the error color as `#ED2224`; rename the section to clarify it's intentionally distinct from primary.

For the primary block, add hover/active variants matching `tailwind.config.js`:

```markdown
- **Primary Red**: `#D41F21`
  - Usage: Primary CTAs, links, accent elements
  - Hover: `#BC1B1D` (Tailwind `bg-primary-hover`)
  - Active: `#A41719` (Tailwind `bg-primary-active`)
  - Contrast: White text (#FFFFFF)
  - WCAG AA: 5.0:1 contrast ratio
```

- [ ] **Step 3: Remove all Frutiger references.**

Search:

```bash
grep -in "frutiger" docs/02_visual-design-system.md
```

Delete every Frutiger mention. The document should reflect that headings use Manrope (loaded via `next/font/google` in `src/app/layout.tsx`) and body uses Inter (same).

- [ ] **Step 4: Update WCAG section to reference the corrected primary.**

Recompute or annotate any contrast ratios that mentioned `#ED2224` as primary — they were stated against the wrong color. The section can either show updated ratios for `#D41F21` or simply state "see `brand/foundations.md` §11 Accessibility for full pairings; this doc tracks only web-component-specific ratios."

- [ ] **Step 5: Narrow scope — remove brand-identity content that now lives in foundations.**

Identify any sections that talk about the brand abstractly (not about Tailwind/web implementation) and move them to a deletion list. This file should end up containing:

- The pointer at the top
- Tailwind class mappings (e.g., `bg-primary` → `#D41F21`)
- Component CSS class references (e.g., `.service-card-shadow`)
- Web-specific WCAG verification table
- Any web-only design tokens not duplicated in foundations

Delete sections that are pure brand identity (already covered in `foundations.md`).

- [ ] **Step 6: Run the verifier.**

Run: `bun run verify:brand`

Expected: 02-reconciliation checks pass — pointer present, no `#ED2224` matches in this file. The verifier allows `#ED2224` only in `docs/brand/foundations.md` (the canonical semantic-color reference). In `02_visual-design-system.md`, semantic colors should be referenced by Tailwind class name (`bg-error`, `text-error`) without inlining the hex — that keeps this doc focused on web-implementation concerns and lets `foundations.md` own the values.

- [ ] **Step 7: Commit.**

```bash
git add docs/02_visual-design-system.md
# If you also moved hexes to foundations.md, add it too:
# git add docs/brand/foundations.md
git commit -m "Reconcile 02_visual-design-system.md to shipping code (#22)"
```

---

## Task 5: Refactor `docs/04_content-framework.md`

**Files:**

- Modify: `docs/04_content-framework.md`

**Goal:** extract voice content (now lives in `brand/voice.md`); narrow to web-page copy reference; add upward pointer.

- [ ] **Step 1: Add upward pointer at the top.**

Insert immediately after the `# Content Framework` H1:

```markdown
> **Brand-level verbal rules (voice, tone, vocabulary, value propositions, audience messaging) live in [`brand/voice.md`](brand/voice.md).** This document is the **web copy reference** — page-by-page H1/H2/H3 copy, on-page CTAs, SEO keyword strategy, content calendar. When this doc and `brand/voice.md` disagree on tone or vocabulary, voice wins.
```

- [ ] **Step 2: Remove sections that have been extracted to `brand/voice.md`.**

Delete these H2 sections entirely (they're now in `voice.md`):

- "Value Propositions & Key Messaging" (and all subsections)
- "Content Guidelines & Tone of Voice" (and all subsections)

Keep these H2 sections (web-specific):

- "Headlines & Subheadings" (page-by-page copy)
- "Call-to-Action Copy" (web CTA text)
- "SEO-Optimized Content Structure"
- "Content Calendar & Strategy"

Keep the closing summary paragraph but rephrase to reflect the narrower scope.

- [ ] **Step 3: Run the verifier.**

Run: `bun run verify:brand`

Expected: 04-reconciliation pointer check passes.

- [ ] **Step 4: Commit.**

```bash
git add docs/04_content-framework.md
git commit -m "Refactor 04_content-framework.md to web copy reference (#22)"
```

---

## Task 6: Write `docs/brand-guideline.md` (entry doc)

**Files:**

- Create: `docs/brand-guideline.md`

**Constraint:** ≤ 200 lines. Anything beyond goes in foundations / voice / a channel doc.

- [ ] **Step 1: Create the file with all 6 sections per spec §4.**

Each H2 must contain a verifier keyword: "What #sharp is", "Brand at a glance", "Document index", "Using these docs with AI", "Source of truth", "Out of scope".

**Required content per section:**

1. **What #sharp is** — 2-3 sentences. Example: "#sharp is a digital transformation consultancy. We help businesses use AI to make customer experience, operations, and data work measurably better. We serve UK and international clients from C-suite to operational teams."
2. **Brand at a glance** — quick-reference card:

```markdown
- **Primary color:** `#D41F21` (red), with hover `#BC1B1D` and active `#A41719`
- **Headings:** Manrope (loaded via Google Fonts)
- **Body:** Inter (loaded via Google Fonts)
- **Logo:** `img/sharp_logo.svg` (red on light), `img/sharp_logo_invert.svg` (white on dark)
- **Voice:** authoritative · trustworthy · innovative · results-focused — clear and confident without aggressive sales language
- **The brand name:** always lowercase with hash prefix (`#sharp`); never `Sharp` or `SHARP`
```

3. **Document index** — table:

```markdown
| If you're doing this                   | Open this                         |
| -------------------------------------- | --------------------------------- |
| Looking up a color, font, or logo rule | `brand/foundations.md`            |
| Looking up tone or what words to use   | `brand/voice.md`                  |
| Building a Google Slides / pitch deck  | `brand/presentation.md`           |
| Writing a client proposal              | `brand/proposal.md`               |
| Issuing an invoice                     | `brand/invoice.md`                |
| Replying to a first-contact enquiry    | `brand/enquiry.md`                |
| Setting up an email signature          | `brand/email-signature.md`        |
| Posting on LinkedIn / X / Bluesky      | `brand/social.md`                 |
| Producing video content                | `brand/video.md`                  |
| Building a web component (engineering) | `docs/02_visual-design-system.md` |
| Writing on-page web copy / CTAs        | `docs/04_content-framework.md`    |
```

4. **Using these docs with AI** — explain Mode 1 (agent loads files as context — attach entry + relevant channel doc) and Mode 2 (human copy-pastes into chat AI). Include the full task→files table from spec §4 (sketch). Provide one example prompt:

```text
Using the attached brand guidelines, draft an enquiry response for a prospect
asking about our customer-experience services. Keep it under 200 words. Match
the voice exactly.
```

5. **Source of truth & maintenance** — three rules: (a) `brand/foundations.md` is canonical for visual; `brand/voice.md` for verbal; (b) channel docs inline subsets and re-sync when canonical refs change; (c) the website code itself (`tailwind.config.js`, `src/app/layout.tsx`, `src/app/globals.css`) is the ultimate truth — docs are reconciled to code, never the reverse.
6. **Out of scope** — explicit list: legal copy / contract templates; internal team comms; individual team members' personal social voices; product-specific UX copy not on the marketing site.

- [ ] **Step 2: Verify line count.**

```bash
wc -l docs/brand-guideline.md
```

Expected: ≤ 200. If over, trim — push detail down into the canonical refs.

- [ ] **Step 3: Run the verifier.**

Run: `bun run verify:brand`

Expected: entry doc checks pass; only the 7 channel docs still missing.

- [ ] **Step 4: Commit.**

```bash
git add docs/brand-guideline.md
git commit -m "Add brand-guideline.md entry doc (#22)"
```

---

## Task 7: Write `docs/brand/presentation.md`

**Files:**

- Create: `docs/brand/presentation.md`

**Why this channel first:** drives the next downstream task (Google Slides template generation). Also serves as the validation of the channel-doc 12-section template before applying it to the other six.

- [ ] **Step 1: Create the file with all 12 sections per the channel template (spec §7) and presentation-specific scope (spec §8.1).**

Each H2 must contain a verifier keyword: "Purpose & context", "Visual specs", "Verbal specs", "Format & dimensions", "Layout & composition", "Component", "Templates", "Worked examples", "Do / Don", "Hard constraints", "Asset references", "Related docs".

**Required content per section:**

1. **Purpose & context** — Google Slides decks for client pitches, discovery-call leave-behinds, case-study walkthroughs. Audience: prospect or active client. Used in: sales meetings, discovery calls, project kickoffs.
2. **Visual specs (inlined subset)** — colors actually used in decks: `#D41F21` (accent only), `#333333` (text), `#FFFFFF` (background), one extended hue per chart series at most. Fonts: Manrope for slide titles (weight 200-300, large), Inter for body (regular, 18-24pt). Logo variant: `img/sharp_logo.svg` for light backgrounds, `img/sharp_logo_invert.svg` for dark. → For full visual rules, see `brand/foundations.md`.
3. **Verbal specs (inlined subset)** — tone modulation: professional-warm. Voice attributes engaged: authoritative + trustworthy. Slide titles in sentence case (not Title Case). Bullets concise (≤ 12 words each). Speaker notes carry the elaboration; slides carry the points. → For full verbal rules, see `brand/voice.md`.
4. **Format & dimensions** — 16:9 primary (1920×1080 or 1280×720); 4:3 fallback (1024×768) only when client environment requires it. Google Slides format. Both Manrope and Inter are Google-hosted, so available natively in Slides. PDF export at 150 DPI for circulation.
5. **Layout & composition** — three-zone slide grid (top: title, middle: content, bottom: red accent line + page number/branding). Generous margins (≥10% of frame edge). Left-aligned text, never centered for content slides (centering allowed on cover and section dividers only). Red accent appears as: a 4-8px line under the slide title; first word of the cover title set in primary; chart highlight color. Never as background fill.
6. **Component / element library** — named slide types AI uses as primitives:
   - **Cover slide** — large title (Manrope 60-80pt weight 200), red-accent on first word or as underline, subtitle (Inter 24pt), client name + date small bottom-right.
   - **Agenda slide** — numbered list, sentence case, no more than 5 items.
   - **Section divider** — full-bleed dark background with single sentence in white Manrope, red dot or line accent.
   - **Content (text-heavy)** — title at top, 3-5 bullets with brief sub-points, one supporting visual or none.
   - **Content (visual-heavy)** — title at top, single image/diagram filling 60-70% of frame, caption.
   - **Stat highlight** — single huge number (Manrope 200pt weight 200) in primary, 1-line context underneath.
   - **Quote** — italicized quote (Inter 28pt), attribution line, no quotation marks (typography handles emphasis).
   - **Team intro** — square photo, name (Manrope), role (Inter), one-line bio.
   - **Comparison** — two-column or table; before/after, them/us. Red accent on "us" column header only.
   - **Table** — Inter 14-16pt, generous row height, primary on header row, no vertical lines (horizontal only).
   - **Chart** — primary as the headline series; secondary series in charcoal or one extended hue; never rainbow.
   - **CTA slide** — single sentence imperative, large red button visual or red underlined CTA text.
   - **Contact / next-steps** — name, role, contact, calendar link; minimal.

7. **Templates / starters** — three named structures:
   - **Default 8-slide pitch deck** — Cover → Problem → Insight → Approach → Proof (case study) → Plan → Team → CTA + contact.
   - **Case-study micro-deck (3 slides)** — Context (the client + challenge) → What we did (approach + numbers) → Outcome.
   - **Discovery-call leave-behind (5 slides)** — Cover → What we heard → How we'd approach it → Indicative timeline & investment → Next steps.

8. **Worked examples** — write out (in markdown) two complete example slides:
   - A cover slide with full title, subtitle, attribution.
   - A stat highlight slide with the stat, context line, and source citation.

   Provide the actual text the slide would contain, not a description of it.

9. **Do / Don't** — five pairs:
   - **Don't** use stock photography of handshakes / suited people pointing at laptops. **Do** use real client-context imagery, abstract geometric backgrounds, or no imagery.
   - **Don't** use rainbow chart palettes. **Do** use primary as the highlight series with charcoal/grey secondaries.
   - **Don't** center body text. **Do** left-align.
   - **Don't** use bullets when 1 sentence suffices. **Do** prefer one strong line over a list.
   - **Don't** use red as a background fill. **Do** use red as accent (≤10% of frame area).

10. **Hard constraints** — non-negotiable:
    - Logo never below 24px height in 16:9 frame.
    - Logo never recolored, rotated, or stretched.
    - Primary `#D41F21` only — never `#ED2224` or other red shades.
    - Manrope for titles, Inter for body — no substitutions.
    - No more than 2 type sizes per slide (title + body).
    - No emoji on client decks.

11. **Asset references** — logo files in `img/sharp_logo.svg` and `img/sharp_logo_invert.svg`; team photos in `img/janos.*` and `img/loreen.*`; service imagery in `img/analyse.jpg`, `img/automation.jpg`, `img/customerExperience.jpg`. Generated decks live wherever the team's Google Drive convention places them (out of scope here).

12. **Related docs** — `brand/foundations.md` (full visual ref), `brand/voice.md` (full verbal ref), `brand/proposal.md` (sibling — proposals often accompany decks).

- [ ] **Step 2: Run the verifier.**

Run: `bun run verify:brand`

Expected: presentation.md checks pass.

- [ ] **Step 3: Commit.**

```bash
git add docs/brand/presentation.md
git commit -m "Add brand/presentation.md (#22)"
```

---

## Task 8: Write `docs/brand/proposal.md`

**Files:**

- Create: `docs/brand/proposal.md`

- [ ] **Step 1: Create the file with all 12 sections per spec §7 template and §8.2 scope.**

Each H2 must contain a verifier keyword (same set as Task 7).

**Required content per section:**

1. **Purpose & context** — formal client proposals (PDF). Audience: prospect's decision-makers (often a buying committee). Used: after discovery call to convert opportunity into engagement.
2. **Visual specs (inlined subset)** — A4 portrait. Colors: charcoal text on white; red accent on cover, section dividers, and pricing-total box only. Fonts: Manrope (cover title, section headings), Inter (body, tables). Logo: `img/sharp_logo.svg` top-right of cover; small inverted variant on dark section dividers. → See `brand/foundations.md`.
3. **Verbal specs (inlined subset)** — tone: formal-corporate. Voice attributes: authoritative + trustworthy heavily emphasised. UK English. Use "we" / "you", never "the client" / "#sharp" in third person. Scope and T&Cs use legal-adjacent precision. → See `brand/voice.md`.
4. **Format & dimensions** — A4 portrait, 210×297mm. Margins: 25mm top/bottom, 20mm left/right. Body 11pt Inter, 1.4 line-height. Headings: H1 28pt Manrope w300; H2 18pt Manrope w400; H3 14pt Manrope w500. Page numbering footer left; "[Project ref] · Confidential" footer right. PDF output, embedded fonts.
5. **Layout & composition** — sections always start on a new page. Section number and name in red at top of first page of each section. Pricing tables right-aligned numbers, primary on Total row only. Long paragraphs OK in narrative sections; bulleted lists in scope/methodology.
6. **Component / element library** —
   - **Cover page** — full-bleed; title 60pt; client name; date; project reference; #sharp logo top-right.
   - **Section divider page** — single line of text (the section name) in Manrope, large; red accent line; page number.
   - **Body page** — header (project ref + page number), body content, footer.
   - **Pricing table** — itemised work, day rate or fixed fee, subtotal, VAT, total. Total row in red.
   - **Team page** — small photo, name, role, 2-line bio, relevant credentials.
   - **Timeline / Gantt** — horizontal bars in primary; phases labelled; week numbers.
   - **Appendix divider** — same as section divider; "Appendix [letter]: [name]".
7. **Templates / starters** — three structures:
   - **Discovery-phase proposal** (~10-15 pages) — cover → exec summary → understanding → proposed discovery scope → timeline → fee → next steps → about #sharp → T&Cs → appendix.
   - **Full-engagement proposal** (~20-30 pages) — cover → exec summary → understanding → proposed approach → scope (detailed by workstream) → methodology → team → timeline → commercials → assumptions/dependencies → terms → appendix.
   - **Follow-on / extension proposal** (~6-10 pages) — references prior engagement; what we did; what we propose next; updated scope; commercials; sign-off.
8. **Worked examples** — write out: a complete cover page (in markdown describing layout); a complete one-paragraph executive summary (60-80 words, in #sharp voice); a complete pricing-table example with three line items + VAT + total.
9. **Do / Don't** — five pairs:
   - **Don't** include "About #sharp" before the executive summary. **Do** put it after the proposal substance, near the end (the prospect cares about themselves first).
   - **Don't** use generic management-consulting language ("synergies", "best-in-class"). **Do** name specific outcomes and methods.
   - **Don't** hide pricing in an appendix. **Do** present commercials in a clearly named section with a clear total.
   - **Don't** mix typefaces beyond Manrope + Inter. **Do** use Manrope weight variations for hierarchy.
   - **Don't** put text over images. **Do** keep image and text on separate page regions.
10. **Hard constraints**:
    - Every proposal includes registered company name and number in the footer or T&Cs section.
    - VAT calculation must use the rate from the (separate) invoice config, not be hardcoded.
    - Confidentiality marking on every page.
    - PDF must have document title metadata set to "[Client] · [Project] · Proposal".
    - No tracking pixels, no embedded scripts.
11. **Asset references** — logos in `img/`. Team photos in `img/janos.*`, `img/loreen.*`. Generated proposals stored according to team's Google Drive convention (out of scope).
12. **Related docs** — `brand/foundations.md`, `brand/voice.md`, `brand/presentation.md` (often accompanies proposals), `brand/invoice.md` (pricing terms must align).

- [ ] **Step 2: Run the verifier.**

Run: `bun run verify:brand`

Expected: proposal.md checks pass.

- [ ] **Step 3: Commit.**

```bash
git add docs/brand/proposal.md
git commit -m "Add brand/proposal.md (#22)"
```

---

## Task 9: Write `docs/brand/email-signature.md`

**Files:**

- Create: `docs/brand/email-signature.md`

- [ ] **Step 1: Create the file with all 12 sections per spec §7 + §8.5 scope.**

**Required content per section:**

1. **Purpose & context** — email signatures used by all team members on client-facing email. Audience: every external email recipient. Used: every business email.
2. **Visual specs (inlined subset)** — colors: charcoal `#333` for name, body text; primary `#D41F21` for the "#sharp" company name only; grey `#a0a0a0` for separators and tertiary lines. Font: Inter, 13-14px, 1.35 line-height. Logo: small inverted-or-light variant 24-32px. → See `brand/foundations.md`.
3. **Verbal specs (inlined subset)** — tone: professional-warm but minimal — signatures aren't the place for taglines. Brand name as `#sharp · Digital Transformation Consultancy`. → See `brand/voice.md`.
4. **Format & dimensions** — HTML signature with inline CSS only (email-client constraint). Plain-text fallback for non-HTML email clients. Width capped at 480px so it renders well on mobile. Logo as inline image (or base64), height 24-32px. No external font references — Inter is unlikely to load in Outlook; use the cascade `Inter, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`.
5. **Layout & composition** — single-line or two-line layout. Two-line preferred:

```
[Name] · [Role]
#sharp · Digital Transformation Consultancy · [phone] · [calendar link]
```

Logo to the left of both lines, vertically centered. Red accent appears only on `#sharp`. Light-mode safe (no white-on-white fall-through in dark-mode-rendering clients).

6. **Component / element library** — single component: the signature block. Sub-elements: logo, name+role line, company line, optional fourth line for legal disclaimer (if required).
7. **Templates / starters** — three variants:
   - **Standard signature** — two-line layout above, no calendar link.
   - **Client-facing signature** — same plus calendar link in line 2.
   - **Internal signature** — name + role only, no logo, no extra lines.

   Provide the actual HTML for each, with placeholders `{{name}}`, `{{role}}`, `{{calendar_url}}`.

8. **Worked examples** — full HTML for the standard signature, including inline styles, with example values filled in (Janos Csikos). Plain-text fallback shown side-by-side.
9. **Do / Don't** — five pairs:
   - **Don't** include "Sent from my iPhone". **Do** delete it from device defaults.
   - **Don't** use background colors. **Do** keep transparent background (works in light + dark modes).
   - **Don't** include large logos / banners / pronoun graphics. **Do** keep the signature compact (≤ 80px tall).
   - **Don't** use quote/aphorism lines. **Do** keep the signature factual.
   - **Don't** embed external CSS or web fonts. **Do** use inline styles and font fallbacks.
10. **Hard constraints**:
    - Plain-text fallback must always be provided.
    - Logo must have meaningful `alt` attribute.
    - All links use `https://`.
    - Signature renders correctly with images blocked (a fallback layout without the logo image must still look intentional).
    - No tracking pixels, no analytics URLs.
11. **Asset references** — logo at `img/sharp_logo.svg` (or a small PNG version for email-client compatibility — generate one if needed at 64×64px, also tracked under follow-up issue for missing logo variants).
12. **Related docs** — `brand/foundations.md`, `brand/voice.md`, `brand/enquiry.md` (signatures appear at the bottom of every enquiry reply).

- [ ] **Step 2: Run the verifier.**

Run: `bun run verify:brand`

Expected: email-signature.md checks pass.

- [ ] **Step 3: Commit.**

```bash
git add docs/brand/email-signature.md
git commit -m "Add brand/email-signature.md (#22)"
```

---

## Task 10: Write `docs/brand/enquiry.md`

**Files:**

- Create: `docs/brand/enquiry.md`

- [ ] **Step 1: Create the file with all 12 sections per spec §7 + §8.4 scope.**

**Required content per section:**

1. **Purpose & context** — first-contact email replies to inbound enquiries from prospects. Audience: a single prospect, possibly senior, often time-constrained. Used: as the first written interaction between #sharp and a potential client.
2. **Visual specs (inlined subset)** — same as `brand/email-signature.md` (signature appears at the bottom). Otherwise: plain prose, no images, default email rendering.
3. **Verbal specs (inlined subset)** — tone: professional-warm. Voice: confident, not eager. First sentence acknowledges what they asked; second establishes substance; final paragraph proposes next step. UK English. → See `brand/voice.md`.
4. **Format & dimensions** — email body. Length: ≤ 200 words for first reply. Subject line: descriptive, not generic — "Re: [their phrase]" if replying; "Following your enquiry about [specific topic]" if cold.
5. **Layout & composition** — opener (1 sentence personalised acknowledgement) → substance (2-3 sentences with concrete content, not platitudes) → CTA (single clear next step — usually a 30-min discovery call with a calendar link) → sign-off → signature block. No more than 4 paragraphs.
6. **Component / element library** —
   - **Personalised opener** — names the specific thing they asked about; not "Thanks for reaching out".
   - **Substance paragraph** — answers part of their question or surfaces a relevant insight; never just "happy to chat".
   - **Single CTA line** — "Would [specific time window] work for a 30-minute discovery call?" with calendar link as a backup.
   - **Sign-off** — "Best," / "Best regards," — consistent across team.
7. **Templates / starters** — five named templates:
   - **General info request** — acknowledge → 1-paragraph relevant context → CTA.
   - **Pricing question (deflect to discovery)** — acknowledge → "pricing depends on scope; happy to walk through how we'd approach yours" → CTA.
   - **Scope question (light substance + invite)** — acknowledge → 2-3 sentence substantive answer → invite for deeper conversation.
   - **Out-of-scope referral** — acknowledge → honest "this isn't our specialism" → recommendation (named partner if available, or the kind of firm to look for).
   - **Follow-up after silence** — single short paragraph, no guilt-trip, one fresh hook (an article, a relevant insight), CTA.

   Provide the actual draft text of each (≤ 150 words each).

8. **Worked examples** — write a complete general-info-request reply (≤ 200 words) with example client name and topic. Then write a complete pricing-question reply.
9. **Do / Don't** — five pairs:
   - **Don't** open with "Thanks for reaching out". **Do** name the thing they asked about ("Thanks — your question about post-merger CX is exactly the kind of thing we work on.")
   - **Don't** describe #sharp's full capability stack. **Do** answer their question.
   - **Don't** offer multiple meeting times. **Do** offer one specific window with a fallback link.
   - **Don't** apologise for response time unless > 48 hrs. **Do** treat 24 hrs as normal.
   - **Don't** say "looking forward to chatting". **Do** be specific about what the call will cover.
10. **Hard constraints**:
    - Subject line is never empty or "Re:" alone.
    - Every reply includes a single, clear next step (not "let me know how I can help").
    - Signature block must be present (per `brand/email-signature.md`).
    - No attachments unless explicitly requested.
    - Calendar link uses `https://` and the team's actual booking tool URL.
11. **Asset references** — none beyond signature assets.
12. **Related docs** — `brand/foundations.md`, `brand/voice.md`, `brand/email-signature.md`, `brand/proposal.md` (next step after a positive enquiry exchange).

- [ ] **Step 2: Run the verifier.**

Run: `bun run verify:brand`

Expected: enquiry.md checks pass.

- [ ] **Step 3: Commit.**

```bash
git add docs/brand/enquiry.md
git commit -m "Add brand/enquiry.md (#22)"
```

---

## Task 11: Write `docs/brand/social.md`

**Files:**

- Create: `docs/brand/social.md`

- [ ] **Step 1: Create the file with all 12 sections per spec §7 + §8.6 scope.**

**Required content per section:**

1. **Purpose & context** — social media posts on LinkedIn (primary), X / Bluesky (secondary). Audience: industry peers, decision-makers, potential clients in the digital-transformation space. Used: thought leadership, company announcements, recruitment, link-sharing.
2. **Visual specs (inlined subset)** — colors as foundations; visual posts use white or charcoal background with red accent only. Fonts: Manrope on graphic cards (titles), Inter on long captions. Logo small bottom-right of visual cards. → See `brand/foundations.md`.
3. **Verbal specs (inlined subset)** — tone: conversational-confident end of the spectrum. First-person plural OK ("We've been seeing…"). Hot takes allowed if backed by reasoning — never just "thoughts?". UK English. No emoji except in specific listed cases (announcements, AMAs). → See `brand/voice.md`.
4. **Format & dimensions** — per-platform:
   - **LinkedIn** — feed image 1200×627; square 1200×1200; carousel 1080×1080 per slide; profile banner 1584×396; post text up to 3000 chars but usually ≤ 1300 for engagement; first 3 lines visible before "see more".
   - **X** — image 1600×900; post 280 chars; threads OK with each tweet a complete thought.
   - **Bluesky** — image 1000×500 default; post 300 chars.
     Hashtag policy: 3-5, lowercase, no emoji-hashtags. No `#like4like` energy.
5. **Layout & composition** — text posts: lead sentence is the hook, line break after, body 2-4 short paragraphs, soft CTA at end. Visual cards: title takes top half, supporting text bottom; red accent as a horizontal line, not a fill.
6. **Component / element library** —
   - **Quote card** — single quotation in Manrope w300, attribution line, red accent line.
   - **Stat card** — large number (Manrope w200), context line, source.
   - **Thread cover** — title in Manrope w300, "Thread →" indicator.
   - **Carousel slide** — numbered (1/5, 2/5…), single point per slide, max 6-8 lines.
   - **Team announcement** — square photo, name + role, one-line context.
7. **Templates / starters** — three post structures:
   - **Insight post** — hook (1 sentence) → context (1-2 sentences) → insight (2-3 sentences) → soft question.
   - **Announcement** — what + who + why + link.
   - **Long-form / thread starter** — the controversial-but-reasoned opening, "Here's what we're seeing… [thread]", 5-8 follow-on tweets.

   Provide the actual draft text of each at the right length for LinkedIn.

8. **Worked examples** — write a complete insight post (≤ 250 words) and a complete 4-tweet thread.
9. **Do / Don't** — five pairs:
   - **Don't** open with "I'm thrilled to announce". **Do** open with the specific news.
   - **Don't** use the prayer-hands emoji. **Do** skip emoji in business posts unless the post is celebratory.
   - **Don't** post listicles ("5 ways to…"). **Do** post one strong take with reasoning.
   - **Don't** end with "thoughts?". **Do** end with a specific question or no question.
   - **Don't** use AI-generated images of suited people pointing at laptops. **Do** use real photography or geometric brand-graphic cards.
10. **Hard constraints**:
    - Brand red as accent only — never as background fill.
    - Logo on visual cards never below 12% of the shorter edge.
    - All external links use `https://`.
    - Hashtag count: 3-5 max.
    - No engagement-bait formats (giveaways, "comment X to enter", "like if you agree").
11. **Asset references** — logos in `img/`; team photos for announcements in `img/janos.*`, `img/loreen.*`. Banner image specs flagged as a follow-up item (square avatar variant + LinkedIn banner template are both gaps tracked under the missing-logo-variants follow-up issue).
12. **Related docs** — `brand/foundations.md`, `brand/voice.md`, `brand/video.md` (social-cut videos sit at the intersection).

- [ ] **Step 2: Run the verifier.**

Run: `bun run verify:brand`

Expected: social.md checks pass.

- [ ] **Step 3: Commit.**

```bash
git add docs/brand/social.md
git commit -m "Add brand/social.md (#22)"
```

---

## Task 12: Write `docs/brand/invoice.md`

**Files:**

- Create: `docs/brand/invoice.md`

- [ ] **Step 1: Create the file with all 12 sections per spec §7 + §8.3 scope.**

**Required content per section:**

1. **Purpose & context** — client invoices issued at engagement milestones (deposit, mid-project, completion) or monthly retainer schedule. Audience: client's accounts payable team. Used: triggering payment per agreed terms.
2. **Visual specs (inlined subset)** — A4 portrait, charcoal-on-white, red accent reserved for the Total and Due Date lines only. Manrope for the "INVOICE" wordmark and section labels; Inter for body and table content. Logo top-right. → See `brand/foundations.md`.
3. **Verbal specs (inlined subset)** — minimal verbal content. Use formal labels: "Invoice number", "Issue date", "Due date", "Bill to", "Description", "Quantity", "Rate", "Subtotal", "VAT", "Total", "Payment terms", "Payment details". UK English. No marketing copy on the invoice. → See `brand/voice.md`.
4. **Format & dimensions** — A4 portrait. Margins 20mm. Body 10pt Inter. Headings 14pt Manrope w400. "INVOICE" wordmark 32pt Manrope w300, top-left. Logo 80px wide top-right. Page number footer if more than 1 page.
5. **Layout & composition** — header band: "INVOICE" left, logo right. Below: two-column billing block (From left = #sharp registered details; To right = client billing details). Below: invoice metadata (number, issue date, due date) — these in a small grid. Below: line-items table (full width, rows: description, qty, rate, line total). Below: totals (subtotal right-aligned, VAT, **Total in red**, line above and below the Total). Below: payment terms paragraph. Footer: bank details + registered company info.
6. **Component / element library** —
   - **Header band** — "INVOICE" wordmark + logo.
   - **From / To block** — two columns.
   - **Metadata grid** — invoice number, issue date, due date.
   - **Line item row** — description, quantity, rate, line total.
   - **Totals block** — subtotal, VAT, total (in red).
   - **Payment terms paragraph** — terms (e.g., "Net 14 days from issue date") + late payment statement.
   - **Bank details footer** — sort code, account number, payment reference format.
7. **Templates / starters** — two structures:
   - **Single-line-item invoice** — fixed-fee deliverable, one row.
   - **Itemised invoice** — multiple line items (e.g., day rate × days, separate disbursements).
8. **Worked examples** — write a complete single-line-item invoice with example values (placeholder VAT/bank/company-reg fields marked clearly with `{{vat_number}}`, `{{bank_account}}`, `{{company_reg_number}}`).
9. **Do / Don't** — five pairs:
   - **Don't** hardcode VAT number, bank details, or company registration in templates. **Do** use placeholders that resolve from the (non-versioned) invoice config — see Task 14 follow-up.
   - **Don't** use red anywhere except Total + Due Date. **Do** keep red sparing.
   - **Don't** include marketing copy or thank-you messages on the invoice. **Do** keep the document strictly transactional.
   - **Don't** abbreviate "Invoice number" to "Inv #" or similar. **Do** use full label text.
   - **Don't** place totals left-aligned. **Do** right-align all numeric columns.
10. **Hard constraints**:
    - Invoice number format: `YYYY-NNNN` (e.g., `2026-0001`). Increments globally, not per-client.
    - Issue date and due date both in `DD MMM YYYY` format (e.g., `04 May 2026`).
    - VAT number, bank details, and company registration number are NEVER hardcoded in templates — they come from a non-versioned config (out of scope for this doc; tracked as follow-up issue).
    - Payment terms must be explicit: "Net 14 days from issue date" (or whatever the agreed terms are).
    - The total figure must be in primary red, all other numbers in charcoal.
    - PDF must include document title metadata `[Client] · Invoice [Number]`.
11. **Asset references** — logos in `img/`. Generated invoices stored according to team's accounting tool / Drive convention (out of scope).
12. **Related docs** — `brand/foundations.md`, `brand/voice.md`, `brand/proposal.md` (invoice line items must align with proposal pricing).

- [ ] **Step 2: Run the verifier.**

Run: `bun run verify:brand`

Expected: invoice.md checks pass.

- [ ] **Step 3: Commit.**

```bash
git add docs/brand/invoice.md
git commit -m "Add brand/invoice.md (#22)"
```

---

## Task 13: Write `docs/brand/video.md`

**Files:**

- Create: `docs/brand/video.md`

- [ ] **Step 1: Create the file with all 12 sections per spec §7 + §8.7 scope.**

**Required content per section:**

1. **Purpose & context** — video content: talking-head explainers, screen-recording walkthroughs, podcast covers/episode cards, social cut-downs (vertical 9:16). Audience varies per format. Used: thought leadership, content marketing, social distribution.
2. **Visual specs (inlined subset)** — colors per foundations. On-screen text: white on dark, charcoal on light. Red accent enters as a motion line, never a flash-fill. Logo bottom-right of intro/outro cards. → See `brand/foundations.md`.
3. **Verbal specs (inlined subset)** — tone: conversational-confident for talking-head; professional-warm for explainers. UK English captions. → See `brand/voice.md`.
4. **Format & dimensions** — aspect ratios: 16:9 primary (1920×1080); 9:16 vertical (1080×1920) for social; 1:1 (1080×1080) for some social. Frame rate: 25fps (UK / PAL convention). Audio: -16 LUFS for online, -23 LUFS for broadcast. Captions: SRT or WebVTT, UK English.
5. **Layout & composition** — title-safe area inset 5% from edge; action-safe inset 10%. On-screen text 5-8% of frame height. Lower thirds in the bottom 20% of frame.
6. **Component / element library** —
   - **Intro card (2-3s)** — logo + episode title in Manrope w300. Red accent line draws on.
   - **Outro card (3-5s)** — CTA ("Subscribe / Visit sharpdigital.co.uk") + URL + signature line.
   - **Lower third (3-5s)** — name (Manrope w400), role (Inter), "#sharp" small. Red accent.
   - **Section transition card** — 1-2s, single line of text, dark background.
   - **End-screen template** — for YouTube; cards for related content + subscribe.
7. **Templates / starters** — three structures:
   - **Talking-head explainer (3-5 min)** — intro card → talking head → optional B-roll cutaways → outro card.
   - **Screen-recording walkthrough (5-10 min)** — intro card → screen recording with voiceover and lower-third → key moments cut → outro card.
   - **Social cut-down (≤ 60s, 9:16)** — quick hook → main point → CTA. Captions burned in.
8. **Worked examples** — describe a complete intro card (text content, motion behaviour, duration); a complete lower-third example (Janos Csikos · Co-Founder · #sharp).
9. **Do / Don't** — five pairs:
   - **Don't** use flashy wipe transitions. **Do** use cuts or simple cross-fades.
   - **Don't** use stock-corporate uplifting acoustic guitar music. **Do** use minimal, restrained underscore or no music.
   - **Don't** burst red as a fill flash. **Do** introduce red as a motion line drawing across the frame.
   - **Don't** use auto-generated machine captions verbatim. **Do** clean up captions for UK English and #sharp brand terms.
   - **Don't** put the logo in every frame. **Do** put it on intro/outro and small in the corner of long-form content.
10. **Hard constraints**:
    - Captions are required on all published videos.
    - Brand red as accent only — never a full-frame fill or flash.
    - Logo never below 5% of frame width.
    - Music respects copyright (licensed or original only).
    - On-screen text never below 24px equivalent at 1080p (≈ 2.2% frame height).
11. **Asset references** — logos in `img/`. Lower-third graphics and intro/outro card templates flagged as a separate production task (out of scope here).
12. **Related docs** — `brand/foundations.md` (motion curves are the brand's bezier values), `brand/voice.md`, `brand/social.md` (social cut-downs share specs).

- [ ] **Step 2: Run the verifier.**

Run: `bun run verify:brand`

Expected: video.md checks pass; ALL structural checks now passing.

- [ ] **Step 3: Commit.**

```bash
git add docs/brand/video.md
git commit -m "Add brand/video.md (#22)"
```

---

## Task 14: Run AI-readiness probes (the gating tests)

**Files:** none modified — this task validates the work.

**Why:** structural verification is necessary but not sufficient. The acceptance criteria in spec §10.3 require evidence that an AI loading the docs can actually generate on-brand artifacts. These probes are subjective (no automated check) but each has a clear pass/fail.

- [ ] **Step 1: Self-containedness probe.**

For each of the 7 channel docs, open a fresh AI session (Claude.ai / Cursor / etc.). Attach only:

- `docs/brand-guideline.md`
- `docs/brand/<channel>.md`

Prompt: "Using the attached brand guidelines, produce a [channel artifact] for [example client]." For example, for `presentation.md`: "Produce a 5-slide discovery-call leave-behind for a UK retail bank exploring AI-driven customer support."

**Pass criterion:** the AI produces a plausible artifact without asking for additional brand info.
**Fail criterion:** the AI asks "what colors should I use?" or "what's your tone of voice?" or similar — meaning the channel doc didn't inline enough brand subset.

If a channel fails, return to that task and inline more brand-subset content into Sections 2-3 of the channel doc, then re-run the probe.

- [ ] **Step 2: Anchor test — `presentation.md`.**

Open a fresh AI session. Attach `brand-guideline.md` + `brand/presentation.md`. Prompt: "Produce a complete 8-slide pitch deck for a UK retail bank exploring AI-driven customer support, using the default 8-slide pitch deck template from the docs."

**Pass criterion:** output uses `#D41F21` as the only color outside neutrals; titles in Manrope-equivalent feel; uses the named slide types from the doc; voice is on-brand (no "leverage", no "synergy"); follows the 8-slide structure (Cover → Problem → Insight → Approach → Proof → Plan → Team → CTA).

**This is the gating test for the spec.** If it fails, fix `presentation.md` before closing the work.

- [ ] **Step 3: Anti-slop probe.**

Open a fresh AI session. Attach `brand-guideline.md` + `brand/social.md`. Prompt: "Write a LinkedIn post about how digital transformation projects fail when stakeholder alignment is overlooked."

**Pass criterion:** output contains none of these words: "leverage" (as verb), "synergy", "best-in-class", "world-class", "cutting-edge", "revolutionise", "game-changer", "thought leader". Output reads like a person at #sharp wrote it. Tone: conversational-confident.

If it fails, the **Vocabulary** and **Do / Don't sample copy** sections of `voice.md` need stronger anti-pattern content.

- [ ] **Step 4: Token-economy probe.**

Run:

```bash
wc -w docs/brand-guideline.md docs/brand/presentation.md
```

**Pass criterion:** combined word count ≤ 6000 words (rough proxy for "fits in a single prompt comfortably"). If over, the channel doc has likely duplicated too much from foundations — trim the inlined-subset back.

- [ ] **Step 5: Document probe results.**

Add a new file `docs/superpowers/specs/2026-05-04-branding-guideline-probe-results.md` with one section per probe (Steps 1-4) recording: pass/fail, date run, model used, what was tested, observations.

```bash
git add docs/superpowers/specs/2026-05-04-branding-guideline-probe-results.md
git commit -m "Document brand docs AI-readiness probe results (#22)"
```

---

## Task 15: File the four follow-up GH issues

**Files:** none modified — this task creates issues against the repo.

**Why:** the spec §11 lists four follow-ups that are out of scope for the doc work itself but unblock or maintain it. They become standalone GH issues so they're not lost.

- [ ] **Step 1: File issue — Delete dead Frutiger font assets.**

```bash
gh issue create --title "Delete dead Frutiger font assets" --body "$(cat <<'EOF'
## Context

`brand/foundations.md` (issue #22) documents that the production website uses Manrope (headings) and Inter (body), both via `next/font/google`. The legacy Frutiger files in `font/` are no longer referenced — the `@font-face` declaration in `src/app/globals.css` is commented out.

## Tasks

- [ ] Delete `font/frutiger-light.eot`
- [ ] Delete `font/frutiger-light.svg`
- [ ] Delete `font/frutiger-light.ttf`
- [ ] Delete `font/frutiger-light.woff`
- [ ] Delete the commented-out `@font-face` block at top of `src/app/globals.css`
- [ ] Verify `bun run build` still passes

## Notes

The `font/` directory itself can be removed entirely if no other fonts are added.
EOF
)"
```

- [ ] **Step 2: File issue — Create missing logo variants.**

```bash
gh issue create --title "Create missing brand logo variants" --body "$(cat <<'EOF'
## Context

`brand/foundations.md` §4 (issue #22) identifies that the current logo asset inventory is incomplete:

- `img/sharp_logo.svg` — full red logo on light background ✓
- `img/sharp_logo_invert.svg` — for dark backgrounds ✓
- `img/sharp_logo.png` and `img/sharp_logo_w264.png` — raster fallbacks ✓
- **Missing:** favicon set (16, 32, 192, 512 px + Apple touch icon)
- **Missing:** 1:1 square avatar for social profiles
- **Missing:** horizontal lockup (logo + wordmark side-by-side, for narrow placements like email signatures)

## Tasks

- [ ] Design and export favicon set
- [ ] Design and export 1:1 square avatar (1024×1024 master, with social-platform exports)
- [ ] Design and export horizontal lockup
- [ ] Add files to `img/`
- [ ] Update `brand/foundations.md` §4 inventory + delete the gaps subsection
- [ ] Update `src/app/layout.tsx` favicon references
- [ ] Update `brand/email-signature.md` if logo dimensions change
- [ ] Update `brand/social.md` profile-elements section with the new banner / avatar specs
EOF
)"
```

- [ ] **Step 3: File issue — Implement non-versioned invoice configuration.**

```bash
gh issue create --title "Implement non-versioned invoice configuration" --body "$(cat <<'EOF'
## Context

`brand/invoice.md` (issue #22) specifies the invoice layout and required fields, but the actual values for VAT number, bank details, and company registration number must NOT be hardcoded in templates.

## Tasks

- [ ] Decide on storage for these values (`.env`, secret manager, accounting tool config, etc.)
- [ ] Define schema: `company_registered_name`, `company_registration_number`, `vat_number`, `vat_rate`, `bank_account_number`, `sort_code`, `payment_reference_format`, `payment_terms`
- [ ] Update `brand/invoice.md` to reference the chosen storage mechanism
- [ ] Implement template rendering that pulls from this config
- [ ] Update README / onboarding docs so new team members know where to set these values

## Notes

Treat as sensitive — never commit actual values to the repo.
EOF
)"
```

- [ ] **Step 4: File issue — Add drift-detection CI job.**

```bash
gh issue create --title "Add drift-detection CI job for brand docs" --body "$(cat <<'EOF'
## Context

`brand/foundations.md` (issue #22) cites source files (e.g., `tailwind.config.js`, `src/app/layout.tsx`) for every visual token. The `scripts/verify-brand-docs.mjs` script already covers structural checks. A more comprehensive CI job would catch *value* drift between docs and code.

## Tasks

- [ ] Extend `scripts/verify-brand-docs.mjs` (or add a sibling script) to:
  - Parse `tailwind.config.js` and extract color hex values
  - Parse `brand/foundations.md`'s JSON token block
  - Diff the two; fail if mismatched
- [ ] Repeat for fontFamily declarations
- [ ] Add a GitHub Actions workflow that runs `bun run verify:brand` (and the new value-drift check) on every PR
- [ ] Document the workflow in `README.md` under the existing CI section

## Notes

The structural checks (file existence, sections present) are already in place. This issue is specifically about value-level drift.
EOF
)"
```

- [ ] **Step 5: Cross-link the new issues from issue #22.**

Post a comment on issue #22 listing the four newly filed issue URLs:

```bash
gh issue comment 22 --body "Follow-up issues filed:

- [ ] [Delete dead Frutiger font assets](URL_FROM_STEP_1)
- [ ] [Create missing brand logo variants](URL_FROM_STEP_2)
- [ ] [Implement non-versioned invoice configuration](URL_FROM_STEP_3)
- [ ] [Add drift-detection CI job for brand docs](URL_FROM_STEP_4)"
```

(Replace each `URL_FROM_STEP_N` with the actual URL printed by the corresponding `gh issue create` command above.)

---

## Task 16: Open the PR

**Files:** none modified.

- [ ] **Step 1: Push any remaining commits.**

```bash
git push
```

- [ ] **Step 2: Open PR from `feature/issue-22-brand-guideline-spec` → `develop`.**

```bash
gh pr create --base develop --head feature/issue-22-brand-guideline-spec --title "Build multi-channel brand guideline documentation system (#22)" --body "$(cat <<'EOF'
## Summary

Implements the brand guideline documentation system specified in [`docs/superpowers/specs/2026-05-04-branding-guideline-design.md`](../blob/feature/issue-22-brand-guideline-spec/docs/superpowers/specs/2026-05-04-branding-guideline-design.md). Closes #22.

- New entry doc `docs/brand-guideline.md`
- New canonical refs `docs/brand/foundations.md` and `docs/brand/voice.md`
- Seven new per-channel docs: presentation, proposal, invoice, enquiry, email-signature, social, video
- Reconciled `docs/02_visual-design-system.md` to shipping code; narrowed to web-engineering reference
- Refactored `docs/04_content-framework.md` to web copy reference (voice extracted to `brand/voice.md`)
- New verification script `scripts/verify-brand-docs.mjs` + `bun run verify:brand`

## Test plan

- [ ] `bun run verify:brand` passes (structural acceptance criteria)
- [ ] All four AI-readiness probes pass — see `docs/superpowers/specs/2026-05-04-branding-guideline-probe-results.md`
- [ ] `bun run build` passes
- [ ] Manual review of foundations.md against `tailwind.config.js` for value accuracy
- [ ] Manual review of voice.md against the original `04_content-framework.md` (no voice content lost in extraction)

## Follow-ups

Four follow-up issues filed (cross-linked from #22):

- Delete dead Frutiger font assets
- Create missing brand logo variants
- Implement non-versioned invoice configuration
- Add drift-detection CI job
EOF
)"
```

---

## Self-review checklist

Before declaring the plan complete, verify:

- [ ] Every spec section has a corresponding task (spec §3 file structure → tasks 2-13; §4 entry doc → task 6; §5 foundations → task 2; §6 voice → task 3; §7 channel template → tasks 7-13; §8 per-channel scope → tasks 7-13; §9 migration → tasks 4-5; §10 acceptance → tasks 1, 14; §11 follow-ups → task 15).
- [ ] No "TBD", "TODO", "implement later", "fill in details" placeholders.
- [ ] Every code/content step shows the actual content needed.
- [ ] Type/name consistency across tasks (e.g., `verify:brand` script name used consistently; `foundations.md` not `foundation.md` anywhere).
- [ ] Verification command is `bun run verify:brand` everywhere (the project uses Bun per `CLAUDE.md`).
- [ ] Every task ends with a commit step.
- [ ] Branch (`feature/issue-22-brand-guideline-spec`) is consistent throughout.
