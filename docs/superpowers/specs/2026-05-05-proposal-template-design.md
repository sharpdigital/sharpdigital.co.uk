# Proposal Template — Design Spec

**Date:** 2026-05-05
**Issue:** [#27 — Create #sharp-branded Google Slides proposal template](https://github.com/sharpdigital/sharpdigital.co.uk/issues/27)
**Status:** Design approved; pending implementation plan.

---

## 1. Overview

Define a #sharp-branded Google Slides template for client business proposals. The template:

- Uses the **5-slide structure** specified in issue #27 — Cover · About us / Why us · Your brief · Proposed solutions · Next steps.
- Replaces the current A4 PDF format defined in `docs/brand/proposal.md`. The proposal channel becomes a Slides deck; PDF becomes a derivative export only.
- Ships in **two ordering variants** so the deck works both for live presentations (situation-first) and for forwarded reading (credentials-first).
- Carries **per-card pricing** on the solutions slide, ex-VAT.
- Lives in the repo as a `.pptx` file (single source of truth) and is imported into a #sharp Google Drive shared folder for working copies.

The brand `proposal.md` is fully rewritten. Most current PDF-specific content is removed; new content is slim because most visual and layout rules are inherited from `presentation.md` and `foundations.md`.

## 2. Decisions reached during brainstorming

| #   | Decision                                                                                                                                                                                                                                              | Rationale                                                                                                                                                              |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Channel = Google Slides deck**, not A4 PDF. `docs/brand/proposal.md` is rewritten accordingly.                                                                                                                                                      | Direct user instruction. PDF format had grown to specify a complex multi-page document not aligned with how proposals are currently produced.                          |
| 2   | **PDF is a derivative export**, not a separate format. Slides is the single source of truth.                                                                                                                                                          | One spec, one file to maintain. PDF export is what Google Slides natively produces for emailing.                                                                       |
| 3   | **Single 5-slide structure** replaces the three engagement-size sub-types (discovery / full-engagement / follow-on) in the current `proposal.md`. Sub-types collapse into tonal/content variations within one structure.                              | #27 specifies one structure; engagement-size variation handled by adjusting per-slide content density rather than introducing distinct templates.                      |
| 4   | **Two ordering variants** ship together: V1 "Forwarded context" (Cover · About us · Brief · Solutions · Next steps), V2 "Situation first" (Cover · Brief · Solutions · About us · Next steps). Selection rule documented in `proposal.md`.            | V1 honours #27 verbatim; V2 honours the existing brand "credentials live late" rule. Different use cases (forwarded vs. presented) genuinely warrant different orders. |
| 5   | **Solutions slide = single slide, 5-card grid** (one row of 5). Deck stays at 5 slides total.                                                                                                                                                         | Lets the buying committee compare options at a glance. Multi-slide alternatives (one slide per option) blow out deck length and remove the comparison view.            |
| 6   | **Per-card fields = Title · Description · Outcome · Effort + Price.** Description ≤15 words; outcome ≤10 words; footer row carries effort (days) and price (£), price set in primary `#D41F21`.                                                       | Density tested visually at 5-cards-in-one-row size. Outcome line is what committee members scan for; structured fields keep cards comparable.                          |
| 7   | **Pricing is per-card on slide 4, ex-VAT.** A single "All prices exclude VAT" footer note sits on the solutions slide.                                                                                                                                | Cleaner cards; comparable numbers; matches B2B reading convention. The current `proposal.md` rule that VAT must never be hardcoded is trivially preserved — the deck shows ex-VAT prices and never computes VAT.                                                          |
| 8   | **Cover, brief, and next-steps slide content** follows brand defaults from `presentation.md` (cover convention, sentence-case titles, ≤12-word bullets, contact lockup on next-steps).                                                                | Inherits existing rules rather than redefining; keeps `proposal.md` slim.                                                                                              |
| 9   | **About us / Why us is a single combined slide** (two-column layout: About us left, Why us right). Static across all proposals; sourced from the website `/about` page at template-creation time and refreshed periodically.                          | Per #27 ("1a is still on the first page"). Periodic refresh — not live — chosen so the template doesn't depend on runtime content fetching.                            |
| 10  | **Footer = "Confidential · #sharp" only.** No company registration number on the deck. T&Cs / company registration handled in a separate signed document at contract time.                                                                            | Direct user decision. Slides deck is the proposal artefact, not the contract; contractual specifics belong in the signed agreement.                                    |
| 11  | **Single `.pptx` file**, V1 ordering by default. README documents the slide-reorder for V2 (drag slide 2 to position 4).                                                                                                                              | Avoids file duplication. The reorder is a 30-second action in Google Slides; no need for two near-identical files.                                                     |
| 12  | **Source of truth = `.pptx` in `docs/templates/`**, imported into a #sharp Google Drive shared folder for working copies. Re-imported when the source changes.                                                                                        | Per the resolved discussion on #27. The general brand convention (Drive as source of truth for decks) is overridden for this specific template — the repo carries the canonical version. |

## 3. The 5 slides — content spec

### Slide 1 — Cover *(per-proposal)*

Layout follows the `presentation.md` cover convention (not the current PDF `proposal.md` cover) — logo top-left, client name + date bottom-right.

| Element             | Spec                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Project topic       | Title slot. Manrope, weight 200, 60–80pt, `#333333`. The proposal's working title (e.g. "AI Transformation Assessment").            |
| Logo                | `img/sharp_logo.svg`, **top-left**, ≥24px height in 1920×1080.                                                                      |
| Client name + date  | Bottom-right, Inter 14pt, `#333333`. Two short lines: client name, then proposal date.                                              |
| Red accent          | 4–8px line beneath the title **or** first-word red — choose one, not both. Per `presentation.md` §5.                                 |
| Footer              | "Confidential · #sharp" — Inter 9pt, `#333333`, applied via slide master on every slide.                                            |

### Slide 2 (V1) / Slide 4 (V2) — About us / Why us *(static across all proposals)*

| Element        | Spec                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Slide title    | "About #sharp" — sentence case, Manrope 36–48pt weight 200–300. (One slide title, even though the slide carries two distinct content blocks.)     |
| Underline      | 2–4px `#D41F21` line beneath the slide title.                                                                                                     |
| Layout         | Two columns, left-aligned within each. Each column has its own sub-heading.                                                                       |
| Left column    | Sub-heading "About us" (Manrope 14pt weight 500). Body: 2–3 short paragraphs or bullets — #sharp positioning sourced from the website `/about`.   |
| Right column   | Sub-heading "Why us" (Manrope 14pt weight 500). Body: 3–4 bullets, ≤12 words each — the case for robust digital processes.                        |
| Refresh        | Snapshotted, not live. Refreshed periodically when website content changes materially. Refresh process documented in `docs/templates/README.md`.  |

### Slide 3 (V1) / Slide 2 (V2) — Your brief *(placeholder)*

| Element     | Spec                                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| Title       | "Your brief" — sentence case.                                                                                     |
| Underline   | 2–4px `#D41F21` line beneath the slide title.                                                                     |
| Body        | 3–5 bullets, ≤12 words each. Covers: problem statement, key goals, scope as understood from the discovery call.   |
| Authoring   | Author types this in per proposal. Placeholder text in the template clearly marks each slot.                      |

### Slide 4 (V1) / Slide 3 (V2) — Proposed solutions *(placeholder, distinctive slide)*

| Element       | Spec                                                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title         | "Proposed solutions" — sentence case.                                                                                                                                                             |
| Underline     | 2–4px `#D41F21` line beneath the slide title.                                                                                                                                                     |
| Layout        | Single row of 5 cards, equal width, with consistent gutter.                                                                                                                                       |
| Card title    | Manrope 14pt weight 500, ≤4 words. Numbered prefix (`1. `, `2. `, …) for orientation.                                                                                                              |
| Description   | Inter 11pt regular, ≤15 words. Sits directly under the card title.                                                                                                                                |
| Outcome line  | Inter 11pt, prefixed `Outcome:` in semibold; outcome text ≤10 words. What the client gets.                                                                                                        |
| Card footer   | 1px `#eee` divider above; effort (e.g. `8 days`) Inter 11pt `#666` on the left; price (e.g. `£9,600`) Inter 11pt weight 600 `#D41F21` on the right.                                                |
| Body type size | The 11pt body type on this slide is an intentional exception to `presentation.md`'s 18–24pt body size — required by the 5-cards-in-one-row density. Document this exception in `proposal.md`. |
| VAT note      | "All prices exclude VAT." — Inter 9pt, `#333333`, bottom-left of the slide content area, below the cards.                                                                                          |
| Pricing rule  | Price is informational and ex-VAT. The template never computes or stores a VAT rate. (Inherits the principle from current `proposal.md` hard constraints.)                                         |

### Slide 5 — Next steps *(placeholder + standard contact)*

| Element     | Spec                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Title       | "Next steps" — sentence case.                                                                                                         |
| Underline   | 2–4px `#D41F21` line beneath the slide title.                                                                                         |
| Body        | 1–3 numbered actions. Typically one for the client (e.g. "decide preferred option(s)"), one for #sharp (e.g. "kickoff workshop on agreed date"). |
| Contact     | Lockup at bottom: name · email · booking link. Default values can live in the template; author personalises per proposal.             |

### Inherited (not redefined) from `presentation.md` / `foundations.md`

- Aspect ratio 16:9 (1920×1080); 4:3 only on explicit client request.
- White background; `#333333` body; `#D41F21` primary accent only, ≤10% of frame.
- Manrope titles, Inter body — no other typefaces.
- Margins ≥10% frame edge; left-aligned body; sentence-case titles.
- ≤12 words per bullet; no emoji; no unsubstantiated superlatives.
- `#sharp` always lowercase with hash prefix; never starts a sentence.
- Logo never recoloured/rotated/skewed; minimum 24px in 1920×1080.

## 4. Deliverables

### 4a. `docs/brand/proposal.md` — full rewrite

Replace the entire current contents with a Slides-deck channel doc. New shape:

| Section             | Content                                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose & context   | What a proposal is, audience (buying committee), when to issue, relationship to discovery calls. (Adapted from current §1; trimmed.)                           |
| Visual specs        | Brief subset of brand visuals. Inherits from `foundations.md` and `presentation.md`. Lists only proposal-specific reds, type sizes, and logo placements.       |
| Verbal specs        | Tone register: **professional-warm** (deck convention), with a note that proposals lean toward the formal end of professional-warm. Inherits from `voice.md`.   |
| Format & dimensions | 16:9 Google Slides; PDF export at 150 DPI for email circulation. References `presentation.md` §4 rather than duplicating.                                       |
| Slide structure     | The 5 slides per §3 above. Both ordering variants documented with the V1 vs. V2 selection rule.                                                                |
| New components      | **5-card solutions grid** and **About us / Why us split slide** specified here (not in `presentation.md`'s component library — these are proposal-specific).    |
| Worked examples     | At least one cover-slide example with on-brand copy, and one solutions-slide example with all 5 cards filled in. Adapted from current §8 examples in Slides format. |
| Hard constraints    | Brand primary `#D41F21` only; Manrope/Inter only; no emoji; "Confidential · #sharp" footer on every slide; pricing ex-VAT with footer note; no hardcoded VAT.  |
| When to use         | "Proposal-deck vs. `presentation.md` leave-behind" disambiguation: proposal proposes solutions with pricing; leave-behind recaps a discovery call.             |
| Asset references    | Logo paths, team photo paths. Adapted from current §11.                                                                                                        |
| Related docs        | `foundations.md`, `voice.md`, `presentation.md`, `invoice.md`.                                                                                                  |

**Removed from current `proposal.md`:**

- A4 page dimensions, margins, gutter spec.
- Three engagement-size sub-types (discovery / full-engagement / follow-on) and their page-sequence templates.
- PDF page anatomy diagram.
- PDF-specific components: section divider page, body page, pricing table, team page, timeline / Gantt page, appendix divider.
- PDF metadata constraint, no-tracking-pixels constraint.
- Company registration footer constraint.
- Worked example A (cover page ASCII layout) and example C (pricing table) — replaced with Slides-format examples.
- Discovery / full-engagement / follow-on page sequences in §7.

### 4b. `docs/templates/proposal-template.pptx` — implementation file

Single `.pptx` file with 5 slides in V1 order:

1. Cover (placeholder client name, date, project ref).
2. About us / Why us (snapshotted static content from `/about` at template-creation time).
3. Your brief (placeholder bullets).
4. Proposed solutions (5 placeholder cards with title / desc / outcome / effort / price slots).
5. Next steps (placeholder actions + contact lockup).

Requirements:

- Manrope and Inter applied. Note in README that Google Slides will auto-load these from Google Fonts on import.
- Master slide carries the "Confidential · #sharp" footer and logo footer.
- Placeholder text clearly labelled with `[Square brackets]` so authors immediately see what to fill.
- File committed to the repo; binary diff is acceptable (low change frequency).

### 4c. `docs/templates/README.md`

New file. Sections:

- What this directory contains.
- The `proposal-template.pptx` — what it is, when to use it.
- How to create a new proposal: download → import to the #sharp Google Drive shared folder → duplicate into a per-client folder → fill in placeholders.
- V1 vs. V2 selection rule (lifted from `proposal.md`).
- How to switch from V1 to V2 inside Google Slides (drag slide 2 to position 4).
- Proposal-deck vs. `presentation.md` leave-behind: when to use which.
- Refresh process for the static About us / Why us content (when to refresh; where to copy from; how to re-export and re-import).
- Drive folder link (placeholder until folder is created).

### 4d. `docs/brand/presentation.md` — minor cross-reference update

Add a one-line note in §12 ("Related docs"): "for proposals (proposing solutions with pricing), see `proposal.md`. The leave-behind template here is for post-discovery recap, not for proposing options."

No structural changes to `presentation.md`.

### 4e. Verification

The brand-doc verifier (`scripts/verify-brand-docs.mjs`) must pass against the rewritten `proposal.md` and the updated `presentation.md`. Any verifier rules that assumed the PDF format need updating as part of the implementation.

## 5. Out of scope

- Creating the actual Google Drive shared folder (operational task, not a brand-doc deliverable).
- Generating the static About us / Why us content text — sourced from the website at template-build time as part of the implementation step, not pre-defined here.
- Generated proposal PDFs and their archival convention (Google Drive folder structure per client — out of scope per existing brand convention).
- Multi-language proposal templates (English UK only, per existing brand defaults).
- Any change to `invoice.md`, `voice.md`, or `foundations.md` — those docs are referenced but not modified.
- Tooling to auto-populate the template from a content source (e.g. CMS-driven proposal generation) — manual fill-in is the workflow.

## 6. Open questions for implementation

These do not block design approval but should be resolved during implementation:

- **Font embedding in `.pptx`:** confirm whether Manrope and Inter embed cleanly in `.pptx` or whether the README needs to instruct authors to install the fonts locally before opening the file in PowerPoint (Google Slides handles this automatically via Google Fonts).
- **Drive folder URL:** the README references the shared Drive folder; the actual URL is added once the folder is created.
- **Default day rate for placeholder pricing:** the placeholder cards in the template show example prices (e.g. £9,600 for 8 days). Implementation should pick a realistic placeholder day rate so authors don't ship a deck with a placeholder number that looks like a real quote.

## 7. Acceptance criteria

Maps to the existing checklist in issue #27, with the structure decisions resolved:

- [ ] `docs/brand/proposal.md` rewritten per §4a and verified against `scripts/verify-brand-docs.mjs`.
- [ ] `docs/templates/proposal-template.pptx` committed per §4b, with V1 ordering and labelled placeholders.
- [ ] `docs/templates/README.md` covers all bullets in §4c, including the V1/V2 reorder instruction and the leave-behind disambiguation.
- [ ] `docs/brand/presentation.md` updated with the cross-reference note per §4d.
- [ ] About us / Why us content sourced from the website `/about` page and snapshotted into the template.
- [ ] Drive shared folder created and linked from the README.
