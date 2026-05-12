# Brand cleanup — design spec

**Issue:** [#34](https://github.com/sharpdigital/sharpdigital.co.uk/issues/34)
**Date:** 2026-05-12
**Branch:** `feature/brand-cleanup` (off `develop`)

## Goal

Reconcile this repo's brand surface to what the live website actually renders. Two things have drifted: (1) `tailwind.config.js` and `docs/brand/foundations.md` describe a richer system than the site ships, and (2) Frutiger legacy references survive in CLAUDE.md, the spec/migration docs, `globals.css`, and the `font/` folder. This PR prunes both layers in one coordinated change so the config and docs match the rendered site, then flips the source-of-truth pointer toward the forthcoming `sharp-hub` operations repo.

Out of scope: migrating brand docs into `sharp-hub`, changing the visual design, modifying `docs/brand/voice.md` or the seven channel docs.

## Scope decisions (resolved during brainstorm)

| Decision                            | Choice                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| PR scope                            | **Single PR** — one audit-then-prune commit, no split                          |
| `docs/prototype/`                   | **Delete** (not archive, not keep-with-note)                                   |
| Source-of-truth wording             | **Verbatim issue wording**, plus both GitHub URL and local-clone path          |
| Audit ordering                      | **Audit-first** — collect evidence, publish table, then prune                  |
| `body: ['Inter', 'serif']` fallback | **Leave as-is**; surface as a question in the PR rather than silently flipping |

## Audit methodology

The audit is the load-bearing artifact of this PR. For each token currently declared in `tailwind.config.js`, run:

1. **Source grep** — scan `src/` for class-name usage across all relevant Tailwind class prefixes (colors: `bg-`, `text-`, `border-`, `fill-`, `stroke-`, `from-`, `to-`, `via-`, `ring-`, `outline-`, `divide-`, `placeholder-`, `caret-`, `accent-`, `shadow-`; equivalent prefixes for the other token families). Record hit count.
2. **Built-CSS check** — run `bun run build` and inspect `out/_next/static/css/*.css` for emitted utility classes referencing each token. Record presence/absence.
3. **Live-site spot-check** — open https://sharpdigital.co.uk in DevTools, sanity-check a few of the kept and cut tokens to confirm method 1+2 agrees with reality.

**Decision rule:** a token is **kept** iff source-grep hits > 0 **OR** built CSS contains it. Otherwise cut. If methods 1 and 2 disagree (typical cause: a dynamically-composed class name that Tailwind's content scanner misses), pause and investigate before deciding.

**Audit output:** markdown tables in the PR description with columns `token | source hits | in built CSS | live-site visible | decision | notes` — one table per token family (color, fontSize, maxWidth, container, animation).

### Visual regression sweep (secondary safety net)

Capture before/after screenshots at desktop 1440px and mobile 390px viewports across this route set:

`/`, `/about`, `/about/loreen`, `/about/janos`, `/about/david`, `/services`, `/services/customer-experience`, `/services/operational-efficiency`, `/services/data-and-analytics`, `/blog`, `/blog/<one-slug>`, `/contact`, `/privacy`, `/terms`

Diff with ImageMagick `compare` (or `odiff` if installed) into `/tmp/before/` and `/tmp/after/`. Any nonzero pixel diff beyond anti-aliasing noise is a blocker.

**Important — what the visual diff does NOT cover:**

- Animations (`fade-in`, `slide-up`, `bounce-gentle`) — transient frames invisible to still captures
- Hover, focus, active, visited, disabled, and other pseudo-class states
- Form interaction and validation states
- Scroll-triggered classes or breakpoints between the two captured viewports
- Pages or components not in the capture set
- Anything composed at runtime from JS state

The audit (source grep + built CSS) is the **primary** defense. The visual sweep is a partial safety net: a token surviving the diff doesn't prove removal was safe — it only proves the rendered default states captured didn't regress. Animation token decisions rely entirely on source grep + built CSS.

## Change set by file

Within the single commit, ordered safety-first (deletions and isolated edits before the rendering-sensitive config change):

### Bulk deletions (no rendering risk)

- `font/` folder — delete entirely
- `docs/prototype/` — delete entirely
- `src/app/globals.css:5-14` — remove the commented-out `@font-face` block; leave a single-line comment pointing at `src/app/layout.tsx` for where fonts are actually loaded

### Tailwind config prune (`tailwind.config.js`)

Apply audit decisions to `colors`, `fontSize`, `maxWidth`, `container`, `animation`, `keyframes`. Open micro-decision flagged in the PR: line 33 has `body: ['Inter', 'serif']` — the `serif` fallback is arguably wrong for a sans-serif primary, but the issue says "the code is right." Leave untouched; surface as a PR-thread question.

### Doc reconciliation (mirrors the trimmed config)

- `docs/brand/foundations.md` §2 — remove accent-color rows that no longer exist; keep only surviving tokens. Preserve all section headings (the verifier checks for them) and the fenced ` ```json ` token block with `"primary"` still inside.
- `docs/02_visual-design-system.md` — trim "Color Tokens — Tailwind Mappings", "Extended #sharp Spectrum", "Semantic Colors" sections to match the new config.
- `docs/brand-guideline.md` §"Brand at a glance" — update to match reality.

### Typography claim fixes

- `CLAUDE.md:33-34, 74` — rewrite typography section to cite `docs/brand/foundations.md` as canonical; remove "Frutiger" / "Web-safe serif" / "from /font/ directory".
- `docs/00_specifications.md:25-26` — same.
- `docs/01_web-design-strategy.md:193` — remove stale Frutiger reference.
- `docs/06_migration-plan.md:36` — remove stale plan step.

### Source-of-truth flip (`docs/brand-guideline.md` §lines 79-86)

Replace with:

> **Source of truth & maintenance**
>
> [`sharp-hub/brand/tokens/`](https://github.com/sharpdigital/sharp-hub/tree/main/brand/tokens) (in the operations repo) is canonical — locally, it sits at `../sharp-hub/` alongside this repo. This repo's `tailwind.config.js` is reconciled to those tokens; when in doubt, `sharp-hub` wins.

The heading text "Source of truth" must be preserved verbatim because `scripts/verify-brand-docs.mjs` checks for it in `ENTRY_HEADINGS`.

### `scripts/verify-brand-docs.mjs` adjustment

Widen `SCAN_PATHS` so the verifier becomes a permanent guard against Frutiger drift in the files we're cleaning. Add:

```js
'CLAUDE.md',
'docs/00_specifications.md',
'docs/01_web-design-strategy.md',
'docs/06_migration-plan.md',
'src/app/globals.css',
```

No other script changes required — the existing structural checks all survive the trim because we keep section headings, the JSON token block, and the source-citation pointers intact.

## Verification & rollback

**Pre-merge verification (run in order):**

1. Token grep guards from the issue's acceptance criteria — all return empty:

   ```bash
   find . -name 'frutiger*' -not -path './node_modules/*' -not -path './.git/*'
   grep -r 'Web-safe serif' --include='*.md' .
   grep -ri 'frutiger' --include='*.md' --include='*.ts' --include='*.tsx' --include='*.js' --include='*.css' . \
     | grep -v 'node_modules\|.next\|.git/\|out/'
   ```

   No `docs/prototype/` carve-out needed because we're deleting it.

2. Brand verifier: `node scripts/verify-brand-docs.mjs` exits 0.

3. Build: `bun run build` succeeds; built CSS doesn't reference cut tokens:

   ```bash
   bun run build
   grep -oE '\.(bg|text|border)-(orange|yellow|lime|green|mint|cyan|sky|blue|purple|magenta|pink)-sharp' out/_next/static/css/*.css || echo clean
   ```

   (Substitute whichever tokens the audit actually cut.)

4. Visual regression sweep — before/after at desktop 1440 and mobile 390 across the route set above. Nonzero pixel diff beyond anti-aliasing = blocker.

5. Live-site cross-check on the deploy preview — eyeball home + one service detail page.

**Rollback:** single squash-merged commit on `develop` → `git revert <sha>` restores everything (cut tokens, deleted folders, doc text) in one move. No external systems involved. If the regression escapes into a release tag, thread the revert through git flow (revert on develop → release branch → master).

## Acceptance criteria

Mirrors the issue's criteria. Re-stated here as the explicit pass-gate:

- [ ] Audit table recorded in the PR description with per-token decisions and evidence
- [ ] `tailwind.config.js` contains only tokens with confirmed usage on the live site
- [ ] `find . -name 'frutiger*' -not -path './node_modules/*' -not -path './.git/*'` returns empty
- [ ] Frutiger grep across `*.md`/`*.ts`/`*.tsx`/`*.js`/`*.css` returns empty
- [ ] `grep -r 'Web-safe serif' --include='*.md' .` returns empty
- [ ] CLAUDE.md typography section cites `docs/brand/foundations.md` as canonical
- [ ] `docs/00_specifications.md` typography section aligned likewise
- [ ] `src/app/globals.css:5-14` commented `@font-face` block removed
- [ ] `docs/brand/foundations.md` §2 and `docs/02_visual-design-system.md` reflect the trimmed token set
- [ ] `docs/brand-guideline.md` source-of-truth statement updated to name `sharp-hub/brand/tokens/` as canonical
- [ ] `node scripts/verify-brand-docs.mjs` exits 0
- [ ] `bun run build` succeeds
- [ ] Visual regression sweep clean (with caveats above re: animations / pseudo-states)
- [ ] `docs/prototype/` deleted
- [ ] `font/` folder deleted
- [ ] PR description includes the open question about the `body: ['Inter', 'serif']` fallback

## Follow-up (separate PR, blocked on this landing)

1. Migrate `docs/brand-guideline.md`, `docs/brand/foundations.md`, `docs/brand/voice.md`, and the seven channel docs into `sharp-hub/brand/`
2. Generate `sharp-hub/brand/tokens/{colors.json,typography.json,tailwind.preset.js}` from this repo's (now-trimmed) `tailwind.config.js`
3. Replace this repo's `tailwind.config.js` color/font sections with an `extends` from the published preset, plus a `scripts/sync-brand.sh` to refresh from sharp-hub
