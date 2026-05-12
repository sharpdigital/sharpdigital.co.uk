# Brand cleanup implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prune `tailwind.config.js` (and reconciled docs) to match what the live website actually renders, remove all Frutiger legacy, and flip the source-of-truth pointer toward `sharp-hub/brand/tokens/`. One PR, one merged commit. Live-site rendering unchanged.

**Architecture:** Audit-first. Three-source token audit (source grep + built CSS + live spot-check) produces a decision table that drives every subsequent edit. Bulk deletions land before config changes; doc reconciliation follows the trimmed config. Visual regression sweep at the end is a partial safety net (catches static rendering regressions; cannot see animations or pseudo-states).

**Tech Stack:** Bun, Next.js 15, Tailwind CSS, ImageMagick `compare` for screenshot diffing, Chrome MCP for screenshot capture.

**Reference spec:** [`docs/superpowers/specs/2026-05-12-brand-cleanup-design.md`](../specs/2026-05-12-brand-cleanup-design.md)
**Issue:** [#34](https://github.com/sharpdigital/sharpdigital.co.uk/issues/34)
**Branch:** `feature/brand-cleanup` (off `develop`) — already created in this worktree.

---

## File structure

**Files deleted:**

- `font/` (folder with `.eot`/`.svg`/`.ttf`/`.woff` Frutiger files)
- `docs/prototype/` (folder)

**Files modified:**
| File | Responsibility |
|---|---|
| `tailwind.config.js` | Single source of token declarations; trimmed to only-what-the-site-renders |
| `src/app/globals.css` | Global CSS; loses the commented `@font-face` block |
| `CLAUDE.md` | Project guide for Claude; typography section rewritten to cite `docs/brand/foundations.md` |
| `docs/00_specifications.md` | Migration spec; typography section aligned with CLAUDE.md |
| `docs/01_web-design-strategy.md` | Strategy doc; stale Frutiger reference removed |
| `docs/06_migration-plan.md` | Migration plan; stale Frutiger step removed |
| `docs/brand/foundations.md` | Canonical visual reference; §2 (Color) trimmed to match the new config |
| `docs/02_visual-design-system.md` | Visual design system; color-token tables trimmed |
| `docs/brand-guideline.md` | Brand entry doc; "Brand at a glance" updated, source-of-truth rule 3 rewritten |
| `scripts/verify-brand-docs.mjs` | Brand verifier; `SCAN_PATHS` widened to guard newly-cleaned files |

**Working note (not committed):**

- `/tmp/brand-cleanup-audit.md` — audit tables that will be pasted into the PR description

---

## Task 1: Run the token audit

**Files:**

- Create: `/tmp/brand-cleanup-audit.md` (working note, not committed)
- Read: `tailwind.config.js`

This task produces the decision table that drives every subsequent edit. Engineer collects three streams of evidence per token, then writes a markdown table with the keep/cut decision.

- [ ] **Step 1: Source grep for each token**

Run this script from the worktree root:

```bash
PREFIXES='bg|text|border|fill|stroke|from|to|via|ring|outline|divide|placeholder|caret|accent|shadow'

COLORS=(
  primary primary-hover primary-active charcoal
  orange-sharp yellow-sharp lime-sharp green-sharp
  mint-sharp cyan-sharp sky-sharp blue-sharp
  purple-sharp magenta-sharp pink-sharp
  success warning error info
)

echo "=== COLOR TOKENS — source hits in src/ ==="
printf "%-20s %s\n" TOKEN HITS
for c in "${COLORS[@]}"; do
  hits=$(grep -rE "(${PREFIXES})-${c}\b" src/ 2>/dev/null | wc -l | tr -d ' ')
  printf "%-20s %s\n" "$c" "$hits"
done
```

Save the output. Anything with `0` hits is a deletion candidate.

- [ ] **Step 2: Source grep for non-color tokens**

```bash
echo "=== fontSize overrides — explicit usage ==="
for size in lg xl 2xl 4xl 5xl; do
  hits=$(grep -rE "\btext-${size}\b" src/ 2>/dev/null | wc -l | tr -d ' ')
  printf "text-%-6s %s\n" "$size" "$hits"
done

echo "=== maxWidth.7xl ==="
hits=$(grep -rE "\bmax-w-7xl\b" src/ 2>/dev/null | wc -l | tr -d ' ')
printf "max-w-7xl     %s\n" "$hits"

echo "=== container usage ==="
hits=$(grep -rE "\bcontainer\b" src/ 2>/dev/null | wc -l | tr -d ' ')
printf "container     %s\n" "$hits"

echo "=== animations ==="
for anim in fade-in slide-up bounce-gentle; do
  hits=$(grep -rE "\banimate-${anim}\b" src/ 2>/dev/null | wc -l | tr -d ' ')
  printf "animate-%-13s %s\n" "$anim" "$hits"
done
```

Note: `text-lg`, `text-xl`, etc. are Tailwind defaults. The audit checks whether the **override** (with the custom font-weight / line-height) is needed. A token with zero source hits can still be kept if its default behaviour matters elsewhere — engineer judgment.

- [ ] **Step 3: Built CSS check**

```bash
bun install
bun run build
echo "=== COLOR TOKENS — emitted in built CSS ==="
for c in primary primary-hover primary-active charcoal \
         orange-sharp yellow-sharp lime-sharp green-sharp \
         mint-sharp cyan-sharp sky-sharp blue-sharp \
         purple-sharp magenta-sharp pink-sharp \
         success warning error info; do
  if grep -qE "(bg|text|border|fill|stroke|from|to|via|ring|outline|divide|placeholder|caret|accent|shadow)-${c}\b" out/_next/static/css/*.css 2>/dev/null; then
    echo "$c: PRESENT"
  else
    echo "$c: absent"
  fi
done
```

Tailwind's JIT only emits classes that appear in the content scan, so this is the ground truth for what the build ships.

- [ ] **Step 4: Live-site spot-check**

Open <https://sharpdigital.co.uk> in DevTools. For each token where steps 1 and 2 disagree (source hit > 0 but absent from built CSS, or vice versa), eyeball a rendered element on the live site. Pause and investigate any token that looks live but the static audit thinks is dead — Tailwind's content scan can miss dynamically-composed class names.

- [ ] **Step 5: Write the audit table to `/tmp/brand-cleanup-audit.md`**

Use this template, one block per token family:

```markdown
## Audit — colors

| token   | source hits | in built CSS | live-site visible | decision | notes    |
| ------- | ----------- | ------------ | ----------------- | -------- | -------- |
| primary | 12          | yes          | yes               | KEEP     | required |
| ...     | ...         | ...          | ...               | ...      | ...      |

## Audit — fontSize overrides

| token   | source hits | in built CSS | decision | notes          |
| ------- | ----------- | ------------ | -------- | -------------- |
| text-lg | 4           | yes          | KEEP     | body lead text |
| ...     | ...         | ...          | ...      | ...            |

## Audit — maxWidth, container, animation

| token           | source hits | in built CSS | decision | notes              |
| --------------- | ----------- | ------------ | -------- | ------------------ |
| max-w-7xl       | 8           | yes          | KEEP     | section containers |
| container       | 0           | n/a          | CUT      | unused             |
| animate-fade-in | 3           | yes          | KEEP     | hero entry         |
| ...             | ...         | ...          | ...      | ...                |
```

Save to `/tmp/brand-cleanup-audit.md`. This is the working note that becomes the PR description body.

- [ ] **Step 6: Sanity check — fail loudly if any decision is ambiguous**

If any token has source hits AND is absent from built CSS, **stop and investigate**. This is the failure mode the audit exists to catch. Common causes: dynamically-built class names (`\`text-${color}-sharp\``in a`.tsx`file), classes inside`string` literals not picked up by Tailwind's content scanner. Resolve before proceeding — either fix the content config to pick up the dynamic name, or convert to a static class. Do not auto-cut.

- [ ] **Step 7: No commit yet**

The audit is a working note. Real edits start in later tasks.

---

## Task 2: Capture baseline screenshots

**Files:**

- Create: `/tmp/brand-cleanup-before/` (working artifact, not committed)

Capture the "before" state for the visual regression sweep. After all edits land, Task 10 will capture "after" and diff.

- [ ] **Step 1: Start dev server in background**

```bash
bun run dev
```

Wait until <http://localhost:3000> (or 3001 if 3000 is taken) responds:

```bash
until curl -sf -o /dev/null http://localhost:3000/services 2>/dev/null \
   || curl -sf -o /dev/null http://localhost:3001/services 2>/dev/null; do
  sleep 1
done && echo ready
```

- [ ] **Step 2: Determine port and capture URLs**

```bash
PORT=3000
curl -sf -o /dev/null http://localhost:3000/services 2>/dev/null || PORT=3001
echo "Dev server on port $PORT"
```

Capture set (14 routes):

- `/`, `/about`, `/about/loreen`, `/about/janos`, `/about/david`
- `/services`, `/services/customer-experience`, `/services/operational-efficiency`, `/services/data-and-analytics`
- `/blog`, `/blog/ai-strategy-implementation-guide`
- `/contact`, `/privacy`, `/terms`

- [ ] **Step 3: Screenshot every URL at desktop and mobile via Chrome MCP**

Use Chrome MCP `mcp__claude-in-chrome__navigate` + `computer.screenshot` (with viewport sizes 1440×900 desktop and 390×844 mobile). Save each as `/tmp/brand-cleanup-before/{route}-{viewport}.png` where `{route}` is the URL path with `/` → `-`. Use `browser_batch` to chain navigate + screenshot per route.

Alternative if Chrome MCP is unavailable: `bunx playwright install chromium && bunx playwright screenshot` or `bunx puppeteer-cli`. Engineer's call.

- [ ] **Step 4: Verify capture set**

```bash
ls /tmp/brand-cleanup-before/ | wc -l
```

Expected: 28 files (14 routes × 2 viewports). If short, retry the missing ones.

- [ ] **Step 5: Stop the dev server**

Use TaskStop on the background task, or `kill %1` if running in foreground.

- [ ] **Step 6: No commit yet**

These are working artifacts, not committed.

---

## Task 3: Bulk Frutiger deletions

**Files:**

- Delete: `font/` (folder)
- Delete: `docs/prototype/` (folder)
- Modify: `src/app/globals.css:5-15`

Three independent deletions. No rendering risk because none of these are loaded by the current code.

- [ ] **Step 1: Verify font/ folder is not referenced in code**

```bash
grep -rE "/font/|font/frutiger" src/ public/ --include='*.ts' --include='*.tsx' --include='*.css' --include='*.js' --include='*.json' 2>/dev/null
```

Expected: no output. If any hits surface, **stop** — they need investigation before deletion.

- [ ] **Step 2: Delete font/ folder**

```bash
rm -rf font/
```

- [ ] **Step 3: Delete docs/prototype/ folder**

```bash
rm -rf docs/prototype/
```

- [ ] **Step 4: Clean globals.css**

Open `src/app/globals.css`. Replace lines 5-15 (the `/* Frutiger font face declarations */` comment plus the commented `@font-face` block) with a single explanatory comment:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Fonts (Manrope, Inter) are loaded via next/font/google in src/app/layout.tsx. */

@layer base {
  body {
    @apply bg-white text-gray-900;
  }
}
```

- [ ] **Step 5: Verify nothing references the removed assets**

```bash
grep -rE "frutiger" --include='*.md' --include='*.ts' --include='*.tsx' --include='*.js' --include='*.css' . \
  | grep -v 'node_modules\|.next\|.git/\|out/\|docs/superpowers/' \
  || echo "no Frutiger refs in code"
```

The Frutiger references in `docs/` markdown will still surface — those get cleaned in Task 7. The `docs/superpowers/` exclusion is for the spec and plan files (which legitimately mention Frutiger when describing the cleanup).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Delete font/ folder, docs/prototype/, and dead @font-face block

font/ contained Frutiger Light webfont files never loaded by the current
implementation (fonts come from Google Fonts via next/font/google).
docs/prototype/ was the pre-migration static-HTML snapshot, no longer
referenced. The @font-face block in globals.css was already commented out
and pointed at the dead font/ paths.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 7: Verify build still works**

```bash
bun run build
```

Expected: clean build, all 30 routes generate. If it fails, investigate.

---

## Task 4: Apply the Tailwind config prune

**Files:**

- Modify: `tailwind.config.js`

This is the only edit that affects rendering. Apply the audit's decisions exactly.

- [ ] **Step 1: Read the audit table**

Open `/tmp/brand-cleanup-audit.md`. Compile the keep-list per token family.

- [ ] **Step 2: Edit tailwind.config.js — colors**

Open `tailwind.config.js`. In the `colors` block (lines 10-29 in the current file), keep only tokens with `KEEP` decisions. Remove the rest.

Example shape (the actual contents depend on audit decisions — engineer fills in):

```js
colors: {
  primary: '#D41F21',
  'primary-hover': '#BC1B1D',
  'primary-active': '#A41719',
  charcoal: '#333333',
  // ...any other KEEP tokens
},
```

Do **not** preserve a token "because it might be used later." If the audit says CUT, cut it. Reintroducing later is one line.

- [ ] **Step 3: Edit tailwind.config.js — fontSize**

In the `fontSize` block (lines 36-42), keep only tokens with `KEEP` decisions.

- [ ] **Step 4: Edit tailwind.config.js — maxWidth, container, animation, keyframes**

Apply audit decisions. If `container` is CUT, remove the entire `container: { ... }` block. If an animation is CUT, also remove its corresponding `keyframes` entry.

- [ ] **Step 5: Build and verify cut tokens are gone from the output**

```bash
bun run build
# Substitute the actually-cut tokens here. Example for the full *-sharp accent spectrum:
grep -oE "(bg|text|border)-(orange|yellow|lime|green|mint|cyan|sky|blue|purple|magenta|pink)-sharp" out/_next/static/css/*.css 2>/dev/null \
  || echo "clean: no cut color tokens in built CSS"
```

Expected: "clean: no cut color tokens in built CSS" (or output empty).

- [ ] **Step 6: Verify kept tokens still appear in the output**

```bash
grep -oE "(bg|text|border)-(primary|charcoal)" out/_next/static/css/*.css 2>/dev/null | sort -u
```

Expected: at minimum, `bg-primary` / `text-primary` / `text-charcoal` etc. should appear. If they don't, something went wrong — the kept tokens should still be reachable.

- [ ] **Step 7: Commit**

```bash
git add tailwind.config.js
git commit -m "Prune tailwind.config.js to tokens the live site actually uses

Audit (source grep + built-CSS check + live-site spot-check) drove the
decisions. See PR description for the full audit table.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Reconcile docs/brand/foundations.md to the trimmed config

**Files:**

- Modify: `docs/brand/foundations.md`

The canonical brand-foundations doc has tables that mirror the now-trimmed config. Trim the same tokens out, update line-number citations, and remove the stale `public/font/` note.

- [ ] **Step 1: Update "Primary palette" table line citation**

In §2.Color system → "Primary palette", line 17 reads `All values sourced from 'tailwind.config.js' (lines 10–13).` After Task 4, the primary palette no longer ends at line 13 — it ends wherever the kept tokens end. Update the line range to match the new config.

- [ ] **Step 2: Trim "Extended #sharp spectrum" table**

In the same §2 section, the "Extended #sharp spectrum" subsection has a table of 11 hues (lines 29-46). Keep only rows whose tokens survived the audit. If the entire spectrum is cut, remove the subsection heading, intro paragraph, and table together.

Also update line 31's citation `tailwind.config.js (lines 15–25)` to match the new config.

- [ ] **Step 3: Trim "Semantic colours" table**

In the same §2 section, "Semantic colours" (lines 47-56) lists `success` / `warning` / `error` / `info`. Keep only rows that survived the audit. Update line 49's citation `tailwind.config.js (lines 26–29)` to match.

- [ ] **Step 4: Trim "WCAG 2.1 AA contrast pairings"**

If extended hues were cut, the paragraph at line 70-72 ("Extended hues against white") no longer applies — remove or shorten it. If `error` was kept (likely, it's semantic), the Do-Don't reference at line 79 stays.

- [ ] **Step 5: Update typography paragraph about public/font/**

Line 105 currently reads:

```
Note: legacy webfont assets in `public/font/` are no longer loaded; the active implementation uses `next/font/google` via `src/app/layout.tsx`.
```

Replace with:

```
Fonts are loaded via `next/font/google` in `src/app/layout.tsx`. No local webfont assets are bundled.
```

- [ ] **Step 6: Update type-scale citation**

Line 109 reads `Sourced from 'tailwind.config.js' (lines 36–42).` Adjust the range to match the new config.

- [ ] **Step 7: Verify foundations still passes the verifier**

```bash
node scripts/verify-brand-docs.mjs
```

Expected: exit 0. The verifier checks `FOUNDATIONS_HEADINGS` (which we preserve), the JSON token block with `"primary"` (which we preserve), and the source citations `tailwind.config.js` / `layout.tsx` / `globals.css` (all still mentioned).

- [ ] **Step 8: Commit**

```bash
git add docs/brand/foundations.md
git commit -m "Reconcile docs/brand/foundations.md §2 to the trimmed config

Removed accent-color rows from the Extended #sharp spectrum and unused
semantic colors. Updated line-number citations to match the new
tailwind.config.js. Removed the obsolete public/font/ note.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Reconcile docs/02_visual-design-system.md to the trimmed config

**Files:**

- Modify: `docs/02_visual-design-system.md`

Same trim, different file. This doc has its own "Color Tokens — Tailwind Mappings", "Extended #sharp Spectrum", and "Semantic Colors" sections.

- [ ] **Step 1: Locate the color-token sections**

```bash
grep -n -iE "color token|extended.*sharp|semantic color" docs/02_visual-design-system.md
```

This gives the line numbers of each subsection. The file is 446 lines — the color sections are typically a contiguous block in the upper half.

- [ ] **Step 2: Trim each subsection**

For each color subsection, remove rows whose tokens were cut from `tailwind.config.js`. Keep formatting consistent with the surrounding doc style (don't introduce a new table convention).

- [ ] **Step 3: Verify the cross-reference to foundations.md is preserved**

The verifier checks that 02 cites `brand/foundations.md`:

```bash
grep -n "brand/foundations.md" docs/02_visual-design-system.md
```

Expected: at least one hit. If trimming removed the only reference, restore it (typically near the top, e.g., "All values sourced from `brand/foundations.md`").

- [ ] **Step 4: Run verifier**

```bash
node scripts/verify-brand-docs.mjs
```

Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add docs/02_visual-design-system.md
git commit -m "Reconcile docs/02_visual-design-system.md to the trimmed config

Removed accent-color rows from Extended #sharp Spectrum and Semantic
Colors sections to match the new tailwind.config.js.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Fix typography claims and remove stale Frutiger references in non-brand docs

**Files:**

- Modify: `CLAUDE.md` (lines 33-34, 74)
- Modify: `docs/00_specifications.md` (lines 25-26)
- Modify: `docs/01_web-design-strategy.md` (line 193)
- Modify: `docs/06_migration-plan.md` (line 36)

Four files, four small text edits. They all describe the typography or Frutiger plan incorrectly relative to current reality.

- [ ] **Step 1: Edit CLAUDE.md typography section (lines 32-34)**

The current text:

```markdown
### Typography

- **Headings/Titles**: Manrope (sans-serif) from `/font/` directory
- **Body/Paragraphs**: Web-safe serif font
- **Logo**: Use `img/sharp_logo.svg`
```

Replace with:

```markdown
### Typography

See `docs/brand/foundations.md` §3 for the canonical typography rules.

- **Headings/Titles**: Manrope, loaded via `next/font/google` in `src/app/layout.tsx`
- **Body / paragraphs / UI**: Inter, loaded via `next/font/google`
- **Logo**: Use `img/sharp_logo.svg`
```

- [ ] **Step 2: Edit CLAUDE.md "Key Files" entry (line 74)**

The current line 74:

```markdown
- `font/`: Frutiger font files for headings/titles
```

Delete this line entirely. The `font/` folder no longer exists.

- [ ] **Step 3: Edit docs/00_specifications.md typography section (lines 24-26)**

The current text:

```markdown
### Typography

- **Headings and titles**: Manrope (sans-serif) from `/font/` directory
- **Paragraphs and body text**: Web-safe serif font
```

Replace with:

```markdown
### Typography

Canonical: `docs/brand/foundations.md` §3.

- **Headings and titles**: Manrope, loaded via `next/font/google` in `src/app/layout.tsx`
- **Paragraphs / body / UI**: Inter, loaded via `next/font/google`
```

- [ ] **Step 4: Edit docs/01_web-design-strategy.md (line 193)**

The current line 193:

```markdown
- **Font Loading**: Optimized Frutiger font loading
```

Replace with:

```markdown
- **Font Loading**: Manrope and Inter loaded via `next/font/google` (`src/app/layout.tsx`)
```

- [ ] **Step 5: Edit docs/06_migration-plan.md (line 36)**

The current line 36:

```markdown
- Integrate Frutiger fonts from `/font/` directory
```

Replace with:

```markdown
- Integrate Manrope and Inter via `next/font/google`
```

- [ ] **Step 6: Verify the Frutiger grep guard is clean**

```bash
grep -ri 'frutiger' --include='*.md' --include='*.ts' --include='*.tsx' --include='*.js' --include='*.css' . \
  | grep -v 'node_modules\|.next\|.git/\|out/\|docs/superpowers/'
```

Expected: empty output. Exclusions: `node_modules`, build output, git internals, and `docs/superpowers/` (spec + plan files legitimately describe the cleanup).

If any hits surface from a doc not in this task, edit them in this same task and re-run.

- [ ] **Step 7: Verify the "Web-safe serif" guard is clean**

```bash
grep -r 'Web-safe serif' --include='*.md' . | grep -v 'docs/superpowers/'
```

Expected: empty.

- [ ] **Step 8: Verify the find guard is clean**

```bash
find . -name 'frutiger*' -not -path './node_modules/*' -not -path './.git/*'
```

Expected: empty (font/ folder was deleted in Task 3).

- [ ] **Step 9: Commit**

```bash
git add CLAUDE.md docs/00_specifications.md docs/01_web-design-strategy.md docs/06_migration-plan.md
git commit -m "Fix typography claims and remove stale Frutiger references

CLAUDE.md and docs/00_specifications.md typography sections now cite
docs/brand/foundations.md and accurately describe the Inter/Manrope
implementation via next/font/google. docs/01_web-design-strategy.md
and docs/06_migration-plan.md no longer reference Frutiger.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Update docs/brand-guideline.md

**Files:**

- Modify: `docs/brand-guideline.md` (lines 13-22, 79-86)

Two edits in one file: the "Brand at a glance" card stays accurate to the trimmed tokens, and rule 3 in "Source of truth & maintenance" flips to name `sharp-hub`.

- [ ] **Step 1: Check whether "Brand at a glance" needs updates**

The card currently lists:

```markdown
- **Primary color:** `#D41F21` (red), with hover `#BC1B1D` and active `#A41719`
- **Headings:** Manrope (loaded via Google Fonts)
- **Body:** Inter (loaded via Google Fonts)
- **Logo:** `img/sharp_logo.svg` (red on light), `img/sharp_logo_invert.svg` (white on dark)
- **Voice:** authoritative · trustworthy · innovative · results-focused — clear and confident without aggressive sales language
- **The brand name:** always lowercase with hash prefix (`#sharp`); never `Sharp` or `SHARP`
```

If `primary` / `primary-hover` / `primary-active` all survived the audit (very likely), no edits needed here. If any were cut, remove the corresponding line.

- [ ] **Step 2: Rewrite rule 3 of "Source of truth & maintenance" (line 85)**

Current text (lines 79-86):

```markdown
## Source of truth & maintenance

Three rules:

1. `brand/foundations.md` is canonical for all visual tokens; `brand/voice.md` is canonical for all verbal rules. Do not define values in channel docs — cite this file instead.
2. Channel docs inline only the subset they need, and must re-sync when the canonical ref changes.
3. The website code itself (`tailwind.config.js`, `src/app/layout.tsx`, `src/app/globals.css`) is the ultimate truth — docs are reconciled to code, never the reverse.
```

Replace **rule 3 only** (keep rules 1 and 2 intact, and keep the "Source of truth & maintenance" heading — the verifier checks for it). The new rule 3:

```markdown
3. [`sharp-hub/brand/tokens/`](https://github.com/sharpdigital/sharp-hub/tree/main/brand/tokens) (in the operations repo) is canonical — locally, it sits at `../sharp-hub/` alongside this repo. This repo's `tailwind.config.js` is reconciled to those tokens; when in doubt, `sharp-hub` wins.
```

- [ ] **Step 3: Verify the heading and 200-line limit are still passing**

```bash
node scripts/verify-brand-docs.mjs
```

The verifier checks (a) entry doc ≤ 200 lines (was 96, edits are net-neutral length), (b) entry doc has the `'Source of truth'` substring (we preserved the heading text). Both should pass.

- [ ] **Step 4: Commit**

```bash
git add docs/brand-guideline.md
git commit -m "Flip source-of-truth pointer to sharp-hub/brand/tokens/

Rule 3 of 'Source of truth & maintenance' now names sharp-hub as
canonical. Rules 1 and 2 (within-repo hierarchy: foundations.md
canonical for visual tokens, channel docs cite never duplicate) are
unchanged. Token-sync mechanism is tracked as a follow-up issue.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Widen scripts/verify-brand-docs.mjs SCAN_PATHS

**Files:**

- Modify: `scripts/verify-brand-docs.mjs` (lines 117-121)

Add the newly-cleaned files to the forbidden-value scan so the verifier becomes a permanent guard against Frutiger drift.

- [ ] **Step 1: Edit SCAN_PATHS**

Current declaration (lines 117-121):

```js
const SCAN_PATHS = [
  ...REQUIRED_FILES,
  'docs/02_visual-design-system.md',
  'docs/04_content-framework.md',
];
```

Replace with:

```js
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
```

- [ ] **Step 2: Run the verifier**

```bash
node scripts/verify-brand-docs.mjs
```

Expected: exit 0. If it fails on any of the newly-added paths, that means we missed a Frutiger reference — fix the source file (not the verifier).

- [ ] **Step 3: Sanity check — verifier would have caught a regression**

Temporarily inject a Frutiger reference into one of the newly-guarded files to confirm the guard works:

```bash
echo "# Frutiger test" >> CLAUDE.md
node scripts/verify-brand-docs.mjs ; echo "exit=$?"
# Expected: exit=1 with a "Frutiger" failure listed.
# Then revert:
sed -i.bak -e '$d' CLAUDE.md && rm CLAUDE.md.bak
node scripts/verify-brand-docs.mjs ; echo "exit=$?"
# Expected: exit=0.
```

This sanity check proves the new entries are actually being scanned, not silently ignored.

- [ ] **Step 4: Commit**

```bash
git add scripts/verify-brand-docs.mjs
git commit -m "Widen verify-brand-docs.mjs SCAN_PATHS for Frutiger drift guard

Adds CLAUDE.md, docs/00_specifications.md, docs/01_web-design-strategy.md,
docs/06_migration-plan.md, and src/app/globals.css to the forbidden-value
scan so any future re-introduction of 'Frutiger' fails CI.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: Visual regression sweep

**Files:**

- Create: `/tmp/brand-cleanup-after/` (working artifact, not committed)
- Create: `/tmp/brand-cleanup-diff/` (working artifact, not committed)

Capture the "after" state and diff against Task 2's baseline.

- [ ] **Step 1: Build and serve**

```bash
bun install
bun run dev
```

Wait for dev server ready (same loop as Task 2 Step 1).

- [ ] **Step 2: Determine port**

```bash
PORT=3000
curl -sf -o /dev/null http://localhost:3000/services 2>/dev/null || PORT=3001
echo "Dev server on port $PORT"
```

- [ ] **Step 3: Capture every route at both viewports**

Same 14-route set as Task 2 Step 2, same viewport sizes (1440×900 and 390×844). Save into `/tmp/brand-cleanup-after/{route}-{viewport}.png`.

- [ ] **Step 4: Diff every pair**

Requires ImageMagick. Install if missing:

```bash
which compare || brew install imagemagick
```

Diff loop:

```bash
mkdir -p /tmp/brand-cleanup-diff
cd /tmp/brand-cleanup-before
fail=0
for f in *.png; do
  if [ -f "../brand-cleanup-after/$f" ]; then
    diff_pixels=$(compare -metric AE "$f" "../brand-cleanup-after/$f" "../brand-cleanup-diff/$f" 2>&1 | tr -d '\n')
    if [ "$diff_pixels" != "0" ]; then
      echo "DIFF: $f → $diff_pixels pixels"
      fail=$((fail + 1))
    fi
  else
    echo "MISSING after-shot: $f"
    fail=$((fail + 1))
  fi
done
cd -
echo "Total differing pairs: $fail"
```

- [ ] **Step 5: Investigate any nonzero diff**

The audit decisions are evidence-based, so a nonzero diff means either (a) a kept token's rendering is somehow different (highly unusual for a token-pruning PR), or (b) a cut token was used somewhere the audit didn't catch (the failure mode this sweep exists to catch).

For each `/tmp/brand-cleanup-diff/<route>-<viewport>.png` with nonzero diff:

1. Open the diff image — colored highlights show where pixels differ
2. Identify the affected element on the rendered page
3. Find the Tailwind class on that element
4. If it references a cut token, restore the token to `tailwind.config.js` and `docs/brand/foundations.md` / `docs/02_visual-design-system.md`
5. Re-run capture and diff for that route

Tiny diffs (≤ a few hundred pixels, often anti-aliasing on text edges) are usually noise. Threshold judgment is engineer's call — but anything obviously colored, geometric, or affecting more than rendering artifacts is a blocker.

- [ ] **Step 6: Stop dev server**

- [ ] **Step 7: No commit yet**

These are working artifacts. Investigations from Step 5 produce additional commits in the appropriate task (e.g., a token restore is an amendment to Task 4's commit, or a follow-up commit if Task 4 is already pushed).

---

## Task 11: Final verification suite

**Files:**

- (No file changes — verification only)

All edits are landed. Run every acceptance-criteria check end to end.

- [ ] **Step 1: Frutiger artifact check**

```bash
find . -name 'frutiger*' -not -path './node_modules/*' -not -path './.git/*'
```

Expected: empty.

- [ ] **Step 2: Frutiger reference check**

```bash
grep -ri 'frutiger' --include='*.md' --include='*.ts' --include='*.tsx' --include='*.js' --include='*.css' . \
  | grep -v 'node_modules\|.next\|.git/\|out/\|docs/superpowers/'
```

Expected: empty. (Spec and plan files under `docs/superpowers/` legitimately reference Frutiger when describing this cleanup.)

- [ ] **Step 3: Web-safe serif check**

```bash
grep -r 'Web-safe serif' --include='*.md' . | grep -v 'docs/superpowers/'
```

Expected: empty.

- [ ] **Step 4: Brand verifier**

```bash
node scripts/verify-brand-docs.mjs
```

Expected: exit 0 with all checks passing.

- [ ] **Step 5: Build**

```bash
bun run build
```

Expected: clean build, all 30 routes generate.

- [ ] **Step 6: Built CSS does not contain cut tokens**

Substitute the actually-cut tokens. Example for a full accent-spectrum cut:

```bash
grep -oE "(bg|text|border|fill|stroke|from|to|via|ring|outline|divide|placeholder|caret|accent|shadow)-(orange|yellow|lime|green|mint|cyan|sky|blue|purple|magenta|pink)-sharp" out/_next/static/css/*.css \
  || echo "clean: no cut tokens in built CSS"
```

Expected: empty or "clean".

- [ ] **Step 7: Built CSS still contains kept tokens**

```bash
grep -oE "(bg|text|border)-(primary|charcoal)" out/_next/static/css/*.css | sort -u
```

Expected: at minimum `bg-primary`, `text-primary`, `text-charcoal` if those survived.

- [ ] **Step 8: Visual regression sweep clean (from Task 10)**

Confirm `/tmp/brand-cleanup-diff/` contains no significant diffs, or all diffs are documented and accepted as anti-aliasing noise.

---

## Task 12: Push and open PR

**Files:**

- (No file changes — push + PR)

- [ ] **Step 1: Push the branch**

```bash
git push -u origin feature/brand-cleanup
```

- [ ] **Step 2: Compose the PR body**

Use this template, with the audit table from `/tmp/brand-cleanup-audit.md` pasted into the "Audit" section:

```markdown
Closes #34.

## Summary

Reconciles `tailwind.config.js` to what the live site actually renders, removes all Frutiger legacy, and flips the source-of-truth pointer toward `sharp-hub/brand/tokens/`. No visual regressions intended — only unused tokens are removed.

## Audit

<!-- Paste tables from /tmp/brand-cleanup-audit.md here -->

## Change set

- Deleted `font/` folder and `docs/prototype/` folder.
- Removed commented `@font-face` block from `src/app/globals.css`.
- Pruned `tailwind.config.js` colors / fontSize / maxWidth / container / animation / keyframes per audit.
- Reconciled `docs/brand/foundations.md` §2 and `docs/02_visual-design-system.md` color tables.
- Fixed typography claims in `CLAUDE.md` and `docs/00_specifications.md`; removed stale Frutiger references in `docs/01_web-design-strategy.md` and `docs/06_migration-plan.md`.
- Flipped rule 3 of `docs/brand-guideline.md` "Source of truth & maintenance" to name `sharp-hub`.
- Widened `scripts/verify-brand-docs.mjs` `SCAN_PATHS` to permanently guard newly-cleaned files against Frutiger drift.

## Open question for review

`tailwind.config.js` line 33 declares `body: ['Inter', 'serif']`. The `serif` fallback is arguably wrong for a sans-serif primary (Inter). Issue #34 explicitly says "the code is right" so this PR leaves it untouched, but raising it here in case you want to flip the fallback to `'sans-serif'` in this PR or a follow-up.

## Verification

- [x] `find . -name 'frutiger*'` returns empty
- [x] Frutiger reference grep returns empty across `*.md`/`*.ts`/`*.tsx`/`*.js`/`*.css`
- [x] `grep -r 'Web-safe serif'` returns empty
- [x] `node scripts/verify-brand-docs.mjs` exits 0
- [x] `bun run build` succeeds
- [x] Built CSS contains no cut tokens
- [x] Visual regression sweep clean (14 routes × 2 viewports — caveat: still captures cannot see animations, hover/focus/active/visited states, or runtime-composed classes)

## Follow-up (separate PR)

- Migrate brand docs into `sharp-hub/`
- Generate `sharp-hub/brand/tokens/{colors.json,typography.json,tailwind.preset.js}` from this repo's trimmed `tailwind.config.js`
- Replace this repo's `tailwind.config.js` color/font sections with an `extends` from the published preset, plus a sync script

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

- [ ] **Step 3: Open the PR**

```bash
gh pr create --base develop --head feature/brand-cleanup \
  --title "Brand cleanup: prune unused Tailwind tokens, remove Frutiger legacy, flip source-of-truth to sharp-hub (#34)" \
  --body "$(cat /tmp/brand-cleanup-pr-body.md)"
```

(Where `/tmp/brand-cleanup-pr-body.md` is the composed body from Step 2.)

- [ ] **Step 4: Confirm the PR opened**

The `gh pr create` output prints the PR URL. Open it in a browser, verify the audit table renders correctly, attach a few before/after screenshots from `/tmp/brand-cleanup-{before,after}/` as visual evidence.

- [ ] **Step 5: Done**

The implementation is complete. The PR is queued for review and merge.
