# Proposal Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the #sharp proposal template per `docs/superpowers/specs/2026-05-05-proposal-template-design.md` — rewrite `docs/brand/proposal.md` as a Google Slides channel doc, generate a 5-slide `.pptx` template, document usage in a `docs/templates/README.md`, and add a one-line cross-reference from `docs/brand/presentation.md`.

**Architecture:** The `.pptx` is the deliverable, but it is generated reproducibly by a Node script (`scripts/generate-proposal-template.mjs`) using `pptxgenjs`. Both the script and the generated binary are committed; the script makes diffs reviewable and changes repeatable. `proposal.md` is fully rewritten in place but retains the canonical 12-section channel template so the existing `scripts/verify-brand-docs.mjs` passes without modification.

**Tech Stack:** Markdown documentation; Node ESM script with `pptxgenjs` (run via `node scripts/generate-proposal-template.mjs`); existing repo tooling (`bun`, `npm run verify:brand`, husky + lint-staged on commit).

**Branch:** Working on `feature/issue-27-proposal-template-spec` (already pushed). All commits go to this branch; PR to `develop` per gitflow when complete.

**Reference:**

- Spec: `docs/superpowers/specs/2026-05-05-proposal-template-design.md`
- Inheritance source: `docs/brand/presentation.md`, `docs/brand/foundations.md`, `docs/brand/voice.md`
- Verifier: `scripts/verify-brand-docs.mjs` (must continue to pass)
- Issue: [#27](https://github.com/sharpdigital/sharpdigital.co.uk/issues/27)

---

## File Structure

**Create:**

- `docs/brand/proposal.md` — full rewrite (file already exists; treat as create-by-overwrite)
- `docs/templates/README.md` — usage doc for the template directory
- `docs/templates/proposal-template.pptx` — generated 5-slide deck (V1 ordering)
- `scripts/generate-proposal-template.mjs` — generator script (idempotent; commits with the .pptx)

**Modify:**

- `docs/brand/presentation.md` — add a one-line cross-reference note in §12
- `package.json` — add `scripts.generate:proposal-template` and add `pptxgenjs` to devDependencies

**Out of scope (per spec §5):**

- Drive folder creation (manual, post-merge)
- A change to `foundations.md`, `voice.md`, `invoice.md`

---

## Decisions locked at plan time

These are concrete choices the engineer must not re-derive:

1. **Generator language: Node ESM with `pptxgenjs`.** Matches the Node/Bun toolset already in `package.json`. `python-pptx` is rejected because it would introduce a Python toolchain.
2. **Default placeholder day rate: £1,200/day.** Matches the worked example in the current `proposal.md` (line 288). Placeholder card prices computed from this (e.g. 8 days × £1,200 = `£9,600`) so authors don't ship a deck with an arbitrary-looking number.
3. **About us / Why us snapshot copy is fixed in this plan** (Task 4 below). Sourced from `src/app/about/page.tsx` content blocks, edited to fit the slide constraints. The plan supplies the literal copy so the engineer doesn't reinterpret it.
4. **Drive folder URL is a documented placeholder** (`<<DRIVE FOLDER URL — add when folder is created>>`). README explicitly flags it as TODO.
5. **proposal.md retains the 12-section channel template** (`Purpose & context`, `Visual specs`, `Verbal specs`, `Format & dimensions`, `Layout & composition`, `Component / element library`, `Templates / starters`, `Worked examples`, `Do / Don't`, `Hard constraints`, `Asset references`, `Related docs`). The verifier checks substrings of these section names against every channel doc; restructuring would break the verifier. Spec §4a's section list collapses naturally onto these 12 — see the section map in Task 1.

---

## Task 1: Rewrite `docs/brand/proposal.md` as the Slides channel doc

**Files:**

- Modify (full overwrite): `docs/brand/proposal.md`

**Section map** (spec §4a → existing 12-section template):

| Spec §4a section    | proposal.md section that holds it                                       |
| ------------------- | ----------------------------------------------------------------------- |
| Purpose & context + "When to use" disambiguation | §1 Purpose & context                       |
| Visual specs        | §2 Visual specs (inlined subset)                                        |
| Verbal specs        | §3 Verbal specs (inlined subset)                                        |
| Format & dimensions | §4 Format & dimensions                                                  |
| Slide structure (V1/V2 ordering, the 5 slides) | §5 Layout & composition + §7 Templates / starters |
| New components (5-card grid, About/Why split) | §6 Component / element library                |
| Worked examples     | §8 Worked examples                                                      |
| Do / Don't          | §9 Do / Don't                                                           |
| Hard constraints    | §10 Hard constraints                                                    |
| Asset references    | §11 Asset references                                                    |
| Related docs        | §12 Related docs                                                        |

- [ ] **Step 1: Capture the current verifier baseline (failing-test analogue).**

Run the verifier against the current state to record what passes today:

```bash
npm run verify:brand
```

Expected: exits 0 — every check passes (the existing PDF-format `proposal.md` already satisfies the 12-section template).

- [ ] **Step 2: Overwrite `docs/brand/proposal.md` with the rewritten content.**

Replace the entire file contents with:

````markdown
# Brand: Proposal channel guidelines

Client proposals are the highest-stakes client-facing artefact #sharp produces — they convert a discovery conversation into a signed engagement. The visual and verbal standards here carry full brand weight. This document is self-contained for AI consumption; it inlines the relevant visual and verbal subsets and cites canonical refs for depth. Do not alter values found here without first updating `docs/brand/foundations.md` and `docs/brand/voice.md`.

---

## 1. Purpose & context

A proposal is a **5-slide Google Slides deck** sent to a prospect's buying committee after a discovery call, to convert a qualified opportunity into a signed engagement. The deck is the proposal artefact; PDF is a derivative export for emailing.

**Audience:** A buying committee — typically a mix of business sponsor (budget holder), technical lead, and operational stakeholder. The deck must work in two modes: presented live by #sharp, and forwarded for internal review without a presenter in the room.

**When to issue a proposal:** After a discovery call confirms genuine fit and a prospect has explicitly requested a proposal. Never issue a proposal speculatively; it devalues the document and wastes both sides' time.

**Engagement-size variation:** A single 5-slide structure covers all engagement sizes (discovery, full-engagement, follow-on). Variation is handled by adjusting per-slide content density — not by switching templates.

**Proposal-deck vs. `presentation.md` leave-behind:** A proposal **proposes solutions with pricing**. A leave-behind (see `brand/presentation.md` §7) **recaps a discovery call** without commercials. If the deck contains pricing or a "next steps" sign-off ask, it is a proposal — use this document. Otherwise it is a leave-behind — use `presentation.md`.

**Relationship to other channels:** After signature, a proposal's per-card pricing informs the invoice (see `brand/invoice.md`). Commercial terms (VAT rate, payment schedule) are governed by `invoice.md`, not by the proposal deck.

---

## 2. Visual specs (inlined subset)

### Colour

| Role                         | Hex       | Where used                                                                |
| ---------------------------- | --------- | ------------------------------------------------------------------------- |
| Body text / headings         | `#333333` | All slide body copy, table text, footer                                   |
| Background                   | `#FFFFFF` | All slides; never replaced with a fill colour                             |
| Accent / primary (sparingly) | `#D41F21` | Cover accent line, slide-title underline, solutions-card price text       |
| Logo (light bg)              | —         | Use `img/sharp_logo.svg`                                                  |

Brand primary `#D41F21` only — no other red shades. Red must never be used as a slide background. See `docs/brand/foundations.md §2`.

### Typography

| Role                | Font    | Weight / size                       | Notes                                                       |
| ------------------- | ------- | ----------------------------------- | ----------------------------------------------------------- |
| Cover title         | Manrope | Weight 200, 60–80pt                 | One-line project topic                                      |
| Slide titles        | Manrope | Weight 200–300, 36–48pt             | Sentence case, with a `#D41F21` underline                   |
| Sub-headings        | Manrope | Weight 500, 14pt                    | Hierarchy within a slide (e.g. About us / Why us columns)   |
| Body / bullets      | Inter   | Regular (400), 18–24pt              | Standard slide body                                         |
| Solutions-card body | Inter   | Regular (400) / Semibold (600), 11pt | Documented exception (see §4) — required by 5-card density |
| Footer              | Inter   | Regular (400), 9pt                  | "Confidential · #sharp", every slide                        |

Manrope and Inter are Google Fonts; Google Slides loads them automatically on import.

### Logo

- **Light-background slides** (default white): `img/sharp_logo.svg`.
- Minimum rendered height: 24 px in a 1920 × 1080 frame.
- Logo never recoloured, rotated, skewed, or stretched.
- Cover slide places the logo **top-left** (per `presentation.md` §6 cover convention). Body slides do not require the logo; the master-slide footer carries it.

→ For full visual rules, see [`brand/foundations.md`](foundations.md).

---

## 3. Verbal specs (inlined subset)

### Tone register

Proposal decks use the **professional-warm** register from the tone spectrum, leaning toward the formal end. Confident enough to be credible, human enough to be approachable, disciplined enough to survive scrutiny by a procurement or finance reviewer reading the deck without #sharp present.

### Voice attributes engaged

- **Authoritative** — every claim is specific and method-grounded.
- **Trustworthy** — state what is included, what is excluded, what depends on client inputs. No over-claiming.
- **Results-focused** — every solution card frames an outcome, not a task.
- **Innovative** — evidence-led, not adjective-led.

### Slide copy rules

- **Slide titles in sentence case.** "Your brief" not "Your Brief".
- **Bullets ≤ 12 words each.** If a bullet needs more, the point belongs in speaker notes.
- **Active voice.** "We design" not "solutions are designed."
- **No emoji.** Ever.
- **No unsubstantiated superlatives.** "Leading" needs proof; "world-class" is forbidden.
- `#sharp` is always lowercase with hash prefix; it never starts a sentence.
- UK English throughout. "Programme" not "program". "Optimise" not "optimize".

→ For full verbal rules, see [`brand/voice.md`](voice.md).

---

## 4. Format & dimensions

- **Aspect ratio:** 16:9, 1920 × 1080 px (preferred). 4:3 (1024 × 768) only on explicit client request.
- **File format:** Google Slides; source-of-truth `.pptx` lives at `docs/templates/proposal-template.pptx` and is imported into a #sharp Google Drive shared folder for working copies.
- **PDF export:** 150 DPI for circulation. The PDF is read-only; the Google Slides working copy remains the editable source for that proposal.
- **Margins:** ≥ 10% of frame edge on all sides (≥ 192 px left/right, ≥ 108 px top/bottom at 1920 × 1080).

**Documented type-size exception (solutions slide):** The solutions slide uses Inter 11pt body type — well below `presentation.md`'s 18–24pt body range. This is required by the 5-cards-in-one-row density and is the only slide on which the exception applies.

→ See `presentation.md` §4 for full deck format conventions; this section overrides only where stated.

---

## 5. Layout & composition

### Three-zone slide grid

Inherited from `presentation.md` §5: title zone (~15%), content zone (~72%), footer zone (~13%). Left-align all body copy; centring is permitted only on the cover slide.

### Slide-title underline

Every body slide carries a 2–4 px `#D41F21` line beneath the slide title. This is the brand "underline" motif; it is the structural use of red on body slides.

### Two ordering variants

| Variant                | Slide order                                                       | When to use                                                              |
| ---------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **V1 — Forwarded context** | Cover · About us / Why us · Your brief · Proposed solutions · Next steps | Default. Use when the deck will be **forwarded for internal review** without a #sharp presenter. |
| **V2 — Situation first**   | Cover · Your brief · Proposed solutions · About us / Why us · Next steps | Use when the deck will be **presented live by #sharp**. Honours the brand "credentials live late" rule. |

The template ships in V1 order. To switch to V2 in Google Slides, drag slide 2 (About us / Why us) to position 4. See `docs/templates/README.md` for the step-by-step.

### The 5 slides — V1 order

1. **Cover** *(per-proposal)* — project topic (Manrope 200, 60–80pt, `#333333`); 4–8 px `#D41F21` accent line beneath the title **or** first-word red, choose one not both; logo top-left ≥ 24 px high; client name + proposal date bottom-right (Inter 14pt). Footer applied via slide master.
2. **About us / Why us** *(static across all proposals)* — single slide, two-column layout. Slide title "About #sharp" with red underline. Left column "About us" (Manrope 14pt weight 500 sub-heading + 2–3 short paragraphs/bullets). Right column "Why us" (same sub-heading style + 3–4 bullets ≤ 12 words). Snapshotted from the website `/about` page; refreshed periodically (see `docs/templates/README.md`).
3. **Your brief** *(placeholder)* — 3–5 bullets ≤ 12 words. Covers problem, key goals, scope as understood from the discovery call. Author types this in per proposal.
4. **Proposed solutions** *(placeholder, distinctive slide)* — single row of 5 cards. See §6 for the card spec. "All prices exclude VAT." footer note bottom-left, Inter 9pt `#333333`.
5. **Next steps** *(placeholder + standard contact)* — 1–3 numbered actions; contact lockup (name · email · booking link) at the bottom.

### Footer

`Confidential · #sharp` only — Inter 9pt, `#333333`, applied via slide master. **No company registration number on the deck.** T&Cs and company registration are handled in the separate signed agreement at contract time, not in the proposal deck.

---

## 6. Component / element library

Two proposal-specific components, defined here because they are not in `presentation.md`'s component library.

### 5-card solutions grid

Single row of 5 equal-width cards with a consistent gutter, filling the content zone of the solutions slide.

| Element        | Spec                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Card title     | Manrope 14pt weight 500, ≤ 4 words. Numbered prefix (`1. `, `2. `, …) for orientation.                                          |
| Description    | Inter 11pt regular, ≤ 15 words. Sits directly under the card title.                                                             |
| Outcome line   | Inter 11pt; prefix `Outcome:` in semibold; outcome text ≤ 10 words. What the client gets.                                       |
| Card footer    | 1 px `#eee` divider above. Effort (`8 days`) Inter 11pt `#666` left; price (`£9,600`) Inter 11pt weight 600 `#D41F21` right.    |
| VAT note       | "All prices exclude VAT." — Inter 9pt `#333333`, bottom-left of the slide content area, below the cards.                        |

The 11pt body type on this slide is the only documented exception to `presentation.md`'s 18–24pt body range — required by the 5-cards-in-one-row density.

### About us / Why us split slide

Two-column slide with one slide title spanning both columns.

| Element        | Spec                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Slide title    | "About #sharp" — sentence case, Manrope 36–48pt weight 200–300. Single title for the whole slide.                                     |
| Underline      | 2–4 px `#D41F21` line beneath the slide title.                                                                                        |
| Layout         | Two columns, equal width, left-aligned within each. Each column has its own sub-heading.                                              |
| Left column    | Sub-heading "About us" (Manrope 14pt weight 500). Body: 2–3 short paragraphs or bullets — #sharp positioning.                         |
| Right column   | Sub-heading "Why us" (Manrope 14pt weight 500). Body: 3–4 bullets, ≤ 12 words each — the case for robust digital processes.           |
| Refresh        | Snapshotted, not live. Refreshed periodically when website `/about` content changes materially.                                       |

→ For non-proposal-specific slide components (cover, agenda, content, stat highlight, etc.), see `presentation.md` §6.

---

## 7. Templates / starters

A single 5-slide structure replaces the prior three engagement-size sub-types (discovery / full-engagement / follow-on). Engagement-size variation is handled by adjusting per-slide content density, not by switching templates.

The implementation file at `docs/templates/proposal-template.pptx` ships in **V1 (Forwarded context)** order:

1. Cover
2. About us / Why us
3. Your brief
4. Proposed solutions
5. Next steps

To use V2 (Situation first), open the file in Google Slides and drag slide 2 to position 4. See `docs/templates/README.md` for the per-step procedure and the V1/V2 selection rule.

Authors fill in placeholder text — clearly marked with `[Square brackets]` — for the cover, brief, solutions, and next-steps slides. The About us / Why us slide is static across all proposals.

---

## 8. Worked examples

### Example A: Cover slide

```
Slide type: Cover

Title (Manrope 72pt weight 200):
  AI Transformation Assessment

Red accent: 5 px horizontal line beneath the title (#D41F21)

Bottom-right (Inter 14pt, #333333):
  Meridian Retail Group
  4 May 2026

Logo: top-left, sharp_logo.svg, ≥ 24 px height

Footer (master): Confidential · #sharp
```

### Example B: Proposed solutions slide — all 5 cards filled in

Each card is a column in a single row across the slide. Cards numbered 1–5.

```
Slide title (Manrope 36pt weight 300):
  Proposed solutions
  ──────────  (#D41F21 underline, 2 px)

Card 1
  1. Discovery (Manrope 14pt 500)
  Map current-state operations and define the brief. (Inter 11pt)
  Outcome: a costed, prioritised opportunity list. (Inter 11pt; "Outcome:" semibold)
  ──────────  (1 px #eee)
  5 days (Inter 11pt #666)         £6,000 (Inter 11pt 600 #D41F21)

Card 2
  2. CX uplift
  Redesign the customer support journey end-to-end.
  Outcome: faster first-response, fewer escalations.
  ──────────
  10 days                          £12,000

Card 3
  3. AI triage
  Integrate an LLM-based triage layer into the support queue.
  Outcome: 30–40% reduction in routing time.
  ──────────
  8 days                           £9,600

Card 4
  4. Data pipeline
  Automate three highest-value manual data flows.
  Outcome: hours-not-days reporting cycle.
  ──────────
  12 days                          £14,400

Card 5
  5. Enablement
  Train the in-house team to operate the new processes.
  Outcome: durable capability — no #sharp dependency.
  ──────────
  4 days                           £4,800

Bottom-left (Inter 9pt #333333):
  All prices exclude VAT.

Footer (master): Confidential · #sharp
```

Placeholder day rate: £1,200/day. All five card prices in this example are computed from that rate.

---

## 9. Do / Don't

**Don't** include a company registration number, full T&Cs, or a counter-signature block on the deck.
**Do** keep the deck as the proposal artefact only. T&Cs and company registration belong in the separate signed agreement at contract time.

---

**Don't** present V1 (forwarded order) live, with About us / Why us as slide 2. It puts credentials before the client's situation.
**Do** switch to V2 (situation first) when presenting live — drag slide 2 to position 4. Keep V1 only when the deck will be forwarded without a presenter.

---

**Don't** hardcode a VAT rate or compute a VAT-inclusive total on any card.
**Do** quote ex-VAT prices on every card and include the single "All prices exclude VAT." footer note on the solutions slide. Templates do not auto-update when rates change; invoices apply VAT at issue time per `brand/invoice.md`.

---

**Don't** introduce a sixth solutions card or split solutions across two slides.
**Do** keep the deck at exactly 5 slides and the solutions slide at exactly 5 cards. The single-row, all-five comparison is the slide's job.

---

**Don't** introduce a third type size on the solutions slide.
**Do** use Manrope 14pt weight 500 for card titles and Inter 11pt for everything else on that slide. The one body-size exception is documented in §4 and must not be extended elsewhere.

---

## 10. Hard constraints

Non-negotiable rules. A proposal that violates any item must be corrected before issue.

- **Brand primary only:** `#D41F21` is the only red used. No other red shades, including deprecated historical values. See `docs/brand/foundations.md §2`.
- **Manrope and Inter only:** No other typefaces in any slide.
- **Confidentiality marking:** The text `Confidential · #sharp` appears in the footer of every slide, applied via the slide master. No exceptions.
- **No company registration number on the deck.** Company registration is handled in the separate signed agreement at contract time.
- **Pricing is ex-VAT:** Per-card prices are ex-VAT. The "All prices exclude VAT." footer note is mandatory on the solutions slide. The deck never computes or stores a VAT rate.
- **No emoji on any slide.**
- **5 slides total.** The deck never grows or shrinks. Engagement-size variation is handled by per-slide content density.
- **Logo never rendered below 24 px height** in a 1920 × 1080 frame, never recoloured, rotated, skewed, or stretched.

---

## 11. Asset references

All paths are relative to the repository root.

| Asset                      | Path                                  | Use in proposals                                                          |
| -------------------------- | ------------------------------------- | ------------------------------------------------------------------------- |
| Primary logo (light bg)    | `img/sharp_logo.svg`                  | Cover top-left; master footer logo lockup                                 |
| Inverted logo (dark bg)    | `img/sharp_logo_invert.svg`           | Reserved for any optional dark accent (not used in default V1 deck)       |
| Team photo — Janos         | `public/img/team_janos.jpg`           | Reference asset; not used by default in the 5-slide deck                  |
| Team photo — Loreen        | `public/img/team_loreen.jpg`          | Reference asset; not used by default in the 5-slide deck                  |
| Template source            | `docs/templates/proposal-template.pptx` | The committed `.pptx` file; imported to the #sharp Drive folder for use |
| Template README            | `docs/templates/README.md`            | How to use, refresh, and switch between V1 and V2 ordering                |

**Note on generated proposal PDFs:** Completed proposal PDFs are stored according to the team's Google Drive convention — a folder per client, named by project reference. The Google Drive folder structure is out of scope for this document.

---

## 12. Related docs

- [`brand/foundations.md`](foundations.md) — full visual reference: colours, typography, logo, spacing, imagery, composition, accessibility, token reference.
- [`brand/voice.md`](voice.md) — full verbal reference: voice attributes, tone spectrum, writing principles, vocabulary, audience messaging, value propositions.
- [`brand/presentation.md`](presentation.md) — sibling channel document for non-proposal decks (pitch, leave-behind, case study). Proposals propose solutions with pricing; leave-behinds recap a discovery call. See `presentation.md` §12 for the disambiguation note.
- [`brand/invoice.md`](invoice.md) — commercial terms in a proposal must align with the invoice template. VAT rate, payment schedule, and company registration details are governed by `invoice.md`, not by the proposal deck.
````

- [ ] **Step 3: Run the verifier and confirm it still passes.**

```bash
npm run verify:brand
```

Expected: exits 0; all 12 channel-template headings still detected in `proposal.md`; no forbidden values; entry doc still references `brand/proposal.md`.

If a check fails, the most likely cause is a missing section heading. Cross-check the rewritten file against the `CHANNEL_TEMPLATE_HEADINGS` list in `scripts/verify-brand-docs.mjs` (lines 45–58) and add or rename the heading. Do **not** modify the verifier in this task.

- [ ] **Step 4: Commit.**

```bash
git add docs/brand/proposal.md
git commit -m "docs(brand): rewrite proposal.md as Google Slides channel doc

Replaces the A4 PDF spec with a 5-slide Slides deck spec per the
2026-05-05 proposal template design. Retains the 12-section channel
template so the brand-doc verifier passes unchanged."
```

---

## Task 2: Add the cross-reference note to `docs/brand/presentation.md`

**Files:**

- Modify: `docs/brand/presentation.md` (§12 Related docs)

Per spec §4d: a one-line disambiguation note in §12 only. No structural changes.

- [ ] **Step 1: Read `docs/brand/presentation.md` §12 and locate the existing `brand/proposal.md` bullet** (around line 336).

The current bullet reads:

```markdown
- [`brand/proposal.md`](proposal.md) — sibling channel document; proposals often accompany decks. The proposal carries the reasoning; the deck carries the points.
```

- [ ] **Step 2: Replace that bullet with the updated text.**

```markdown
- [`brand/proposal.md`](proposal.md) — for proposals (proposing solutions with pricing), see `proposal.md`. The leave-behind template here is for post-discovery recap, not for proposing options.
```

- [ ] **Step 3: Run the verifier.**

```bash
npm run verify:brand
```

Expected: exits 0.

- [ ] **Step 4: Commit.**

```bash
git add docs/brand/presentation.md
git commit -m "docs(brand): add proposal-vs-leave-behind disambiguation in presentation.md §12"
```

---

## Task 3: Add `pptxgenjs` and a generator npm script

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Install `pptxgenjs` as a devDependency.**

```bash
npm install --save-dev pptxgenjs
```

Expected: `package.json` `devDependencies` now contains `"pptxgenjs"` at the latest 3.x version; `package-lock.json` updated.

- [ ] **Step 2: Add the generator script.**

Edit `package.json` `"scripts"` to add the new entry below `"verify:brand"`:

```json
"generate:proposal-template": "node scripts/generate-proposal-template.mjs",
```

- [ ] **Step 3: Verify the script slot resolves cleanly.**

```bash
npm run | grep -E "verify:brand|generate:proposal-template"
```

Expected: both commands listed.

- [ ] **Step 4: Commit.**

```bash
git add package.json package-lock.json
git commit -m "build: add pptxgenjs and generate:proposal-template script"
```

---

## Task 4: Lock in the snapshotted About us / Why us copy

**Why this is its own task:** Spec §4b says "snapshotted static content from `/about` at template-creation time." The plan supplies the literal copy so the generator script in Task 5 has a deterministic input.

**Source:** `src/app/about/page.tsx` `contentSetup` block (lines 49–84) — Our Story / Mission / Values.

**Locked About us copy** (left column — 3 short bullets, plain text, no inline HTML):

```
- Digital transformation consultancy bridging vision and execution.
- We combine deep business acumen with cutting-edge technical expertise.
- Collaborative, data-driven, focused on sustainable, measurable results.
```

**Locked Why us copy** (right column — 4 bullets, ≤ 12 words each):

```
- Specific outcomes, measured in weeks — not vague programmes.
- AI transformation framework grounded in twelve years of practice.
- Robust, repeatable digital processes — not bespoke heroics.
- We name what is in scope, what is not, and why.
```

- [ ] **Step 1: Confirm word counts.** Each Why-us bullet is ≤ 12 words. About-us bullets have no word cap but should be ≤ 15 words.

Counts (verify by hand):
- Why us bullet 1: 8 words. ✓
- Why us bullet 2: 10 words. ✓
- Why us bullet 3: 7 words. ✓
- Why us bullet 4: 12 words. ✓ (at the limit)

- [ ] **Step 2: No file changes in this task.** The copy is recorded in this plan and used as input by Task 5. Move to Task 5.

---

## Task 5: Build the `.pptx` generator script

**Files:**

- Create: `scripts/generate-proposal-template.mjs`

This script writes a 5-slide deck to `docs/templates/proposal-template.pptx` in V1 order, with the master-slide footer, the locked About/Why content from Task 4, and labelled `[Square bracket]` placeholders on the per-proposal slides.

- [ ] **Step 1: Create the script.**

Write the following exact contents to `scripts/generate-proposal-template.mjs`:

```javascript
#!/usr/bin/env node
// Generator for docs/templates/proposal-template.pptx.
// Produces the 5-slide V1 (Forwarded context) deck per
// docs/brand/proposal.md and docs/superpowers/specs/2026-05-05-proposal-template-design.md.
//
// Run: npm run generate:proposal-template

import PptxGenJS from 'pptxgenjs';
import { resolve, dirname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const OUT_PATH = resolve(ROOT, 'docs/templates/proposal-template.pptx');
const LOGO_PATH = resolve(ROOT, 'img/sharp_logo.svg');

const RED = 'D41F21';
const CHARCOAL = '333333';
const GREY = '666666';
const HAIRLINE = 'EEEEEE';

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';        // 13.333 × 7.5 inches = 1920 × 1080 at 144 dpi
pptx.title = '#sharp · Proposal · Template';
pptx.subject = 'Proposal deck template';
pptx.company = '#sharp';

// --- Master slide: footer "Confidential · #sharp" + small logo lockup ---
pptx.defineSlideMaster({
  title: 'SHARP_PROPOSAL',
  background: { color: 'FFFFFF' },
  objects: [
    {
      text: {
        text: 'Confidential · #sharp',
        options: {
          x: 0.5, y: 7.05, w: 12.33, h: 0.3,
          fontFace: 'Inter', fontSize: 9, color: CHARCOAL,
          align: 'left', valign: 'middle',
        },
      },
    },
  ],
});

// --- Slide 1: Cover (per-proposal placeholders) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  slide.addImage({ path: LOGO_PATH, x: 0.5, y: 0.4, w: 1.4, h: 0.4 });
  slide.addText('[Project topic]', {
    x: 0.9, y: 2.6, w: 11.5, h: 1.2,
    fontFace: 'Manrope', fontSize: 60, bold: false, color: CHARCOAL, align: 'left',
  });
  // Red accent line beneath the title
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: 3.95, w: 6.0, h: 0.06,
    fill: { color: RED }, line: { color: RED },
  });
  slide.addText(
    [
      { text: '[Client name]', options: { fontFace: 'Inter', fontSize: 14, color: CHARCOAL } },
      { text: '\n[Proposal date]', options: { fontFace: 'Inter', fontSize: 14, color: CHARCOAL } },
    ],
    { x: 8.5, y: 6.3, w: 4.3, h: 0.7, align: 'right', valign: 'bottom' }
  );
}

// --- Slide 2: About us / Why us (static content) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  slide.addText('About #sharp', {
    x: 0.9, y: 0.7, w: 11.5, h: 0.7,
    fontFace: 'Manrope', fontSize: 36, color: CHARCOAL, align: 'left',
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: 1.45, w: 3.0, h: 0.04,
    fill: { color: RED }, line: { color: RED },
  });

  // Left column: About us
  slide.addText('About us', {
    x: 0.9, y: 1.9, w: 5.5, h: 0.4,
    fontFace: 'Manrope', fontSize: 14, bold: true, color: CHARCOAL,
  });
  slide.addText(
    [
      { text: 'Digital transformation consultancy bridging vision and execution.', options: { bullet: true } },
      { text: 'We combine deep business acumen with cutting-edge technical expertise.', options: { bullet: true } },
      { text: 'Collaborative, data-driven, focused on sustainable, measurable results.', options: { bullet: true } },
    ],
    {
      x: 0.9, y: 2.3, w: 5.5, h: 4.0,
      fontFace: 'Inter', fontSize: 18, color: CHARCOAL,
      paraSpaceAfter: 8, valign: 'top',
    }
  );

  // Right column: Why us
  slide.addText('Why us', {
    x: 7.0, y: 1.9, w: 5.5, h: 0.4,
    fontFace: 'Manrope', fontSize: 14, bold: true, color: CHARCOAL,
  });
  slide.addText(
    [
      { text: 'Specific outcomes, measured in weeks — not vague programmes.', options: { bullet: true } },
      { text: 'AI transformation framework grounded in twelve years of practice.', options: { bullet: true } },
      { text: 'Robust, repeatable digital processes — not bespoke heroics.', options: { bullet: true } },
      { text: 'We name what is in scope, what is not, and why.', options: { bullet: true } },
    ],
    {
      x: 7.0, y: 2.3, w: 5.5, h: 4.0,
      fontFace: 'Inter', fontSize: 18, color: CHARCOAL,
      paraSpaceAfter: 8, valign: 'top',
    }
  );
}

// --- Slide 3: Your brief (placeholder) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  slide.addText('Your brief', {
    x: 0.9, y: 0.7, w: 11.5, h: 0.7,
    fontFace: 'Manrope', fontSize: 36, color: CHARCOAL,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: 1.45, w: 3.0, h: 0.04,
    fill: { color: RED }, line: { color: RED },
  });
  slide.addText(
    [
      { text: '[Problem statement — one line]', options: { bullet: true } },
      { text: '[Key goal 1 — what the client wants to achieve]', options: { bullet: true } },
      { text: '[Key goal 2]', options: { bullet: true } },
      { text: '[Scope boundary — what is in / out]', options: { bullet: true } },
      { text: '[Constraint or dependency the client flagged]', options: { bullet: true } },
    ],
    {
      x: 0.9, y: 2.0, w: 11.5, h: 4.5,
      fontFace: 'Inter', fontSize: 22, color: CHARCOAL,
      paraSpaceAfter: 12, valign: 'top',
    }
  );
}

// --- Slide 4: Proposed solutions (5-card grid, placeholders) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  slide.addText('Proposed solutions', {
    x: 0.9, y: 0.5, w: 11.5, h: 0.6,
    fontFace: 'Manrope', fontSize: 36, color: CHARCOAL,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: 1.15, w: 3.0, h: 0.04,
    fill: { color: RED }, line: { color: RED },
  });

  // Card layout: 5 columns across the 12.33" usable width.
  // Margin 0.9" left/right -> 11.53" content; gutter 0.2"; card width = (11.53 - 4*0.2)/5 = 2.146"
  const cardY = 1.6;
  const cardH = 4.6;
  const cardW = 2.15;
  const gutter = 0.2;
  const startX = 0.9;

  for (let i = 0; i < 5; i += 1) {
    const x = startX + i * (cardW + gutter);

    slide.addText(`${i + 1}. [Card title]`, {
      x, y: cardY, w: cardW, h: 0.4,
      fontFace: 'Manrope', fontSize: 14, bold: true, color: CHARCOAL,
    });
    slide.addText('[Description ≤ 15 words explaining the solution.]', {
      x, y: cardY + 0.45, w: cardW, h: 1.5,
      fontFace: 'Inter', fontSize: 11, color: CHARCOAL, valign: 'top',
    });
    slide.addText(
      [
        { text: 'Outcome: ', options: { bold: true } },
        { text: '[outcome ≤ 10 words].' },
      ],
      {
        x, y: cardY + 2.05, w: cardW, h: 1.3,
        fontFace: 'Inter', fontSize: 11, color: CHARCOAL, valign: 'top',
      }
    );

    // Hairline divider above the card footer row
    slide.addShape(pptx.ShapeType.line, {
      x, y: cardY + 3.95, w: cardW, h: 0,
      line: { color: HAIRLINE, width: 0.75 },
    });

    // Effort (left) and price (right)
    slide.addText('[N] days', {
      x, y: cardY + 4.05, w: cardW * 0.5, h: 0.4,
      fontFace: 'Inter', fontSize: 11, color: GREY, align: 'left',
    });
    slide.addText('£[N,NNN]', {
      x: x + cardW * 0.5, y: cardY + 4.05, w: cardW * 0.5, h: 0.4,
      fontFace: 'Inter', fontSize: 11, bold: true, color: RED, align: 'right',
    });
  }

  // VAT note
  slide.addText('All prices exclude VAT.', {
    x: 0.9, y: 6.5, w: 6.0, h: 0.3,
    fontFace: 'Inter', fontSize: 9, color: CHARCOAL, align: 'left',
  });
}

// --- Slide 5: Next steps (placeholder + standard contact) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  slide.addText('Next steps', {
    x: 0.9, y: 0.7, w: 11.5, h: 0.7,
    fontFace: 'Manrope', fontSize: 36, color: CHARCOAL,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: 1.45, w: 3.0, h: 0.04,
    fill: { color: RED }, line: { color: RED },
  });

  slide.addText(
    [
      { text: '1. [Client action — e.g. confirm preferred option(s) by date]' },
      { text: '2. [#sharp action — e.g. kickoff workshop on agreed date]' },
      { text: '3. [Optional joint action]' },
    ],
    {
      x: 0.9, y: 2.0, w: 11.5, h: 3.0,
      fontFace: 'Inter', fontSize: 24, color: CHARCOAL,
      paraSpaceAfter: 16, valign: 'top',
    }
  );

  // Contact lockup (placeholders)
  slide.addText(
    [
      { text: '[Name] · [email] · [booking link]', options: { fontSize: 16 } },
    ],
    {
      x: 0.9, y: 6.4, w: 11.5, h: 0.4,
      fontFace: 'Inter', color: CHARCOAL, align: 'left',
    }
  );
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
await pptx.writeFile({ fileName: OUT_PATH });
console.log(`Wrote ${OUT_PATH}`);
```

- [ ] **Step 2: Run the generator.**

```bash
npm run generate:proposal-template
```

Expected output:

```
Wrote /Users/.../docs/templates/proposal-template.pptx
```

The file `docs/templates/proposal-template.pptx` should now exist.

- [ ] **Step 3: Smoke-check the file with `unzip -l` (a `.pptx` is a ZIP).**

```bash
unzip -l docs/templates/proposal-template.pptx | grep -E "slide[1-5]\.xml|slideMaster"
```

Expected: 5 slide entries (`slide1.xml`–`slide5.xml`) and at least one `slideMaster1.xml` listed.

- [ ] **Step 4: Verify the master footer text is embedded.**

```bash
unzip -p docs/templates/proposal-template.pptx ppt/slideMasters/slideMaster1.xml | grep -c "Confidential"
```

Expected: ≥ 1.

- [ ] **Step 5: Open the file manually** in Google Slides (drag-import) **or** PowerPoint **or** Keynote and confirm visually:
  - 5 slides in order (Cover, About us / Why us, Your brief, Proposed solutions, Next steps).
  - Master footer "Confidential · #sharp" appears on every slide.
  - Solutions slide shows 5 equal-width cards in one row with `[Card title]` / description / `Outcome:` / divider / effort / price.
  - About us / Why us slide shows the locked copy in two columns.
  - "All prices exclude VAT." appears bottom-left of the solutions slide.

If any visual issue is found, edit `scripts/generate-proposal-template.mjs`, regenerate, and re-check.

- [ ] **Step 6: Commit the script and the generated file together.**

```bash
git add scripts/generate-proposal-template.mjs docs/templates/proposal-template.pptx
git commit -m "feat(templates): add proposal-template.pptx generator and 5-slide V1 deck

Builds the V1 (Forwarded context) deck via pptxgenjs:
Cover · About us / Why us · Your brief · Proposed solutions · Next steps.
About us / Why us copy snapshotted from /about. Master slide carries the
\"Confidential · #sharp\" footer."
```

---

## Task 6: Write `docs/templates/README.md`

**Files:**

- Create: `docs/templates/README.md`

Per spec §4c: covers what the directory contains, how to use the template, V1/V2 selection and reorder, refresh process, leave-behind disambiguation, Drive folder link.

- [ ] **Step 1: Create the file with this exact content.**

````markdown
# `docs/templates/`

Source-of-truth template files for #sharp client-facing artefacts. Files here are imported into the team's Google Drive shared folders to produce per-client working copies; they are **not** edited in Google Drive directly. When a template needs changing, update the source in this directory, regenerate (where applicable), commit, and re-import to Drive.

---

## Files

| File                                                    | Purpose                                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`proposal-template.pptx`](./proposal-template.pptx)    | The #sharp client-proposal deck — 5 slides, V1 ordering. See below.                  |
| [`../../scripts/generate-proposal-template.mjs`](../../scripts/generate-proposal-template.mjs) | Generator for `proposal-template.pptx`. Run `npm run generate:proposal-template` to rebuild. |

---

## `proposal-template.pptx` — what it is

The #sharp proposal deck specified in [`docs/brand/proposal.md`](../brand/proposal.md). Five slides, 16:9, in **V1 (Forwarded context)** order:

1. Cover
2. About us / Why us
3. Your brief
4. Proposed solutions (5-card grid)
5. Next steps

Use this template whenever you need to issue a client proposal — a deck that proposes solutions and pricing. For a post-discovery recap (no pricing, no sign-off ask), use the leave-behind structure documented in [`docs/brand/presentation.md`](../brand/presentation.md) §7 instead.

### Fonts

Manrope (titles) and Inter (body) are Google Fonts. Google Slides loads them automatically on import. PowerPoint and Keynote may prompt to install the fonts if they are not on the local machine — install both before editing offline.

---

## How to create a new proposal

1. Download `proposal-template.pptx` from this repo (or use the Drive shared folder copy — see "Drive folder" below).
2. Import / upload to Google Drive: **New → File upload**, then **Open with → Google Slides**. Google Slides converts the `.pptx` into a Slides document.
3. **Duplicate** the converted Slides file into the per-client folder (e.g. `Drive/Proposals/<Client name>/`).
4. Rename the duplicate: `[Client name] · [Project topic] · Proposal · YYYY-MM-DD`.
5. Fill in every `[Square bracket]` placeholder — cover, brief, solutions, next steps.
6. Decide V1 vs. V2 ordering (see next section); reorder if needed.
7. Export to PDF (**File → Download → PDF Document (.pdf)**) for emailing.

---

## V1 vs. V2 ordering — selection rule

| Variant                | Slide order                                                       | When to use                                                              |
| ---------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **V1 — Forwarded context** | Cover · About us / Why us · Your brief · Proposed solutions · Next steps | The deck will be **forwarded for internal review** without a #sharp presenter. (Default — this is what the template ships with.) |
| **V2 — Situation first**   | Cover · Your brief · Proposed solutions · About us / Why us · Next steps | The deck will be **presented live** by #sharp. Honours the brand "credentials live late" rule. |

**Rule of thumb:** if a buying-committee member will read it without you, ship V1. If you will be in the room when they see it, ship V2.

### How to switch from V1 to V2 in Google Slides

1. Open the duplicated Slides file.
2. In the slide thumbnail panel on the left, click and hold **slide 2** ("About #sharp").
3. Drag it down to position 4 (between "Proposed solutions" and "Next steps") and release.
4. Confirm the order is now: Cover · Your brief · Proposed solutions · About #sharp · Next steps.

That is the entire V2 conversion. Do not duplicate the file or maintain a separate V2 template.

---

## Refresh process for the static About us / Why us content

Slide 2 ("About #sharp") carries snapshotted, not-live copy. Refresh the snapshot when:

- The website `/about` page changes materially (new positioning statement, new mission, new values).
- The "Why us" bullets become out of date (e.g. capability claims that no longer hold).

To refresh:

1. Read the current `/about` page (`https://sharpdigital.co.uk/about` or `src/app/about/page.tsx` `contentSetup` block).
2. Edit `scripts/generate-proposal-template.mjs` — update the About us / Why us text in the slide-2 block. Preserve the constraints: 2–3 About us bullets ≤ 15 words; 3–4 Why us bullets ≤ 12 words.
3. Run `npm run generate:proposal-template` to rebuild the `.pptx`.
4. Verify the file opens correctly (Google Slides drag-import).
5. Commit the script change and the regenerated `.pptx` together.
6. Re-import into the #sharp Drive shared folder, replacing the previous version (Drive's version-history retains the prior copy).

---

## Drive folder

Working copies of the template live in the #sharp Drive shared folder:

`<<DRIVE FOLDER URL — add when folder is created>>`

> **TODO:** create the Drive shared folder, paste the link above, and remove this admonition. Per the spec, folder creation is operational work, not a brand-doc deliverable.

---

## Proposal-deck vs. `presentation.md` leave-behind

Use this directory's `proposal-template.pptx` when the deck **proposes solutions with pricing**. The deck has a "Next steps" sign-off ask.

Use the leave-behind structure in [`docs/brand/presentation.md`](../brand/presentation.md) §7 ("Discovery-call leave-behind") when the deck **recaps a discovery call**. No commercials, no sign-off ask.

If you find yourself adding a pricing slide to a leave-behind, you have crossed into proposal territory — switch to this template.

---

## Related docs

- [`docs/brand/proposal.md`](../brand/proposal.md) — the proposal channel guidelines (visual, verbal, structural rules).
- [`docs/brand/presentation.md`](../brand/presentation.md) — the deck channel guidelines for non-proposal decks.
- [`docs/superpowers/specs/2026-05-05-proposal-template-design.md`](../superpowers/specs/2026-05-05-proposal-template-design.md) — the design spec that drove this template.
````

- [ ] **Step 2: Confirm the README contains the four required sections** (per spec §4c).

```bash
grep -E "^##|^###" docs/templates/README.md
```

Expected: headings include "Files", "How to create a new proposal", "V1 vs. V2 ordering", "How to switch from V1 to V2", "Refresh process", "Drive folder", "Proposal-deck vs. `presentation.md` leave-behind".

- [ ] **Step 3: Confirm the Drive folder placeholder is present and unambiguous.**

```bash
grep "DRIVE FOLDER URL" docs/templates/README.md
```

Expected: 1 match (the placeholder line).

- [ ] **Step 4: Commit.**

```bash
git add docs/templates/README.md
git commit -m "docs(templates): add README for proposal template usage and refresh"
```

---

## Task 7: Final acceptance — run the verifier and walk the spec checklist

**Files:** none modified in this task; verification only.

- [ ] **Step 1: Run the brand-doc verifier one more time end-to-end.**

```bash
npm run verify:brand
```

Expected: exits 0; all checks pass on the rewritten `proposal.md` and the updated `presentation.md`.

- [ ] **Step 2: Walk the spec acceptance criteria (`spec §7`) and tick each one.**

For each item below, confirm by running the cited command or opening the cited file:

- `docs/brand/proposal.md` rewritten per §4a and verified.
  - Check: `grep -c "5-slide" docs/brand/proposal.md` returns ≥ 1.
  - Check: `npm run verify:brand` passes.
- `docs/templates/proposal-template.pptx` committed per §4b.
  - Check: `unzip -l docs/templates/proposal-template.pptx | grep -c "slide[1-5]\.xml"` returns 5.
  - Check: `git ls-files docs/templates/proposal-template.pptx` returns the path (file is tracked).
- `docs/templates/README.md` covers all bullets in §4c.
  - Check: `grep -E "V1|V2|Refresh|Drive folder|leave-behind" docs/templates/README.md` returns ≥ 5 matches.
- `docs/brand/presentation.md` updated with the cross-reference note per §4d.
  - Check: `grep "leave-behind template here is for post-discovery recap" docs/brand/presentation.md` returns 1 match.
- About us / Why us content sourced from `/about` and snapshotted into the template.
  - Check: open `docs/templates/proposal-template.pptx` and confirm slide 2 shows the locked copy from Task 4.
- Drive shared folder created and linked from the README — **deferred (manual, post-merge)**. Acceptable to leave the placeholder in place; the placeholder is explicit about the TODO.

- [ ] **Step 3: Confirm the working tree is clean and the branch is ready for PR.**

```bash
git status
git log --oneline master..HEAD
```

Expected: working tree clean; commit log shows the 5 commits from Tasks 1, 2, 3, 5, and 6 on top of `master`/`develop`.

- [ ] **Step 4: Open a PR from `feature/issue-27-proposal-template-spec` to `develop`.** Per `CLAUDE.md` branching model — feature PRs target `develop`.

```bash
gh pr create --base develop --title "Proposal template — 5-slide Slides deck + brand doc rewrite" --body "$(cat <<'EOF'
## Summary

- Rewrites \`docs/brand/proposal.md\` as a Google Slides channel doc (was an A4 PDF spec). Retains the 12-section channel template; the brand-doc verifier passes unchanged.
- Adds \`docs/templates/proposal-template.pptx\` — the 5-slide V1 deck — generated reproducibly by \`scripts/generate-proposal-template.mjs\` (\`npm run generate:proposal-template\`).
- Adds \`docs/templates/README.md\` covering usage, V1/V2 ordering, refresh process, and the Drive folder TODO.
- Adds a one-line proposal-vs-leave-behind disambiguation note to \`docs/brand/presentation.md\` §12.

Implements [#27](https://github.com/sharpdigital/sharpdigital.co.uk/issues/27) per [\`docs/superpowers/specs/2026-05-05-proposal-template-design.md\`](docs/superpowers/specs/2026-05-05-proposal-template-design.md).

## Test plan

- [ ] \`npm run verify:brand\` exits 0
- [ ] \`npm run generate:proposal-template\` rebuilds the \`.pptx\` and the diff is clean
- [ ] Open the \`.pptx\` in Google Slides — 5 slides, master footer present, About/Why content correct, solutions cards render in a single row
- [ ] Walk the spec §7 acceptance checklist
EOF
)"
```

**Stop here.** Drive folder creation and `.pptx` ↔ Drive import are post-merge operational tasks, out of scope for this plan.

---

## Self-review notes

- **Spec coverage:** every section of `docs/superpowers/specs/2026-05-05-proposal-template-design.md` is mapped to a task above. §1–§3 (overview, decisions, slide content spec) drive Task 1 (proposal.md) and Task 5 (the .pptx slide layouts). §4a → Task 1. §4b → Tasks 3 + 4 + 5. §4c → Task 6. §4d → Task 2. §4e → Tasks 1, 2, 7. §6 open questions: font embedding addressed in README (Task 6 step 1, "Fonts" section); Drive folder URL is a documented TODO (Task 6); placeholder day rate set to £1,200 in Task 5's solutions example (and the current proposal.md example carries through to the example in Task 1). §7 acceptance criteria → Task 7.
- **Type/name consistency:** the slide-master name `SHARP_PROPOSAL` (Task 5) is referenced consistently across all five `pptx.addSlide({ masterName: 'SHARP_PROPOSAL' })` calls. Task 4's About us / Why us copy is reproduced verbatim in Task 5's slide-2 block. The "All prices exclude VAT." string matches across proposal.md (Tasks 1) and the .pptx (Task 5).
- **Verifier compatibility:** Task 1's rewritten proposal.md keeps all 12 channel-template section headings (`Purpose & context`, `Visual specs`, `Verbal specs`, `Format & dimensions`, `Layout & composition`, `Component / element library`, `Templates / starters`, `Worked examples`, `Do / Don't`, `Hard constraints`, `Asset references`, `Related docs`); the verifier substring-matches each, so no verifier change is needed and spec §4e is satisfied without touching `scripts/verify-brand-docs.mjs`.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-05-proposal-template.md`. Two execution options:

1. **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — execute tasks in this session using `superpowers:executing-plans`, batch execution with checkpoints.

Which approach?
