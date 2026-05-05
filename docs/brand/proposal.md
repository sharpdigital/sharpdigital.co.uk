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
| Background — header / content | `#FFFFFF` | Header strip and content area on every slide. Never replaced with a fill colour. |
| Hero band imagery            | per slide | Page-specific bg image (matched to the equivalent website page) with a `#333333` overlay at ≈ 35% opacity. Slides 2–5; cover full-bleed. See §5 and §11. |
| Hero band title text         | `#FFFFFF` | Slide titles overlaid on the hero band; reads on the dark overlay.        |
| Accent / primary (sparingly) | `#D41F21` | Cover accent line, slide-title underline, solutions-card price text       |
| Logo (light bg)              | —         | Use `img/sharp_logo.svg`                                                  |

Brand primary `#D41F21` only — no other red shades. Red must never be used as a slide background or as a hero overlay; the overlay is always `#333333`. See `docs/brand/foundations.md §2`.

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

- **Every slide** carries `img/sharp_logo.svg` in the white header strip, top-left, ~0.4" tall (≥ 24 px in a 1920 × 1080 frame).
- Logo never recoloured, rotated, skewed, or stretched.
- The master slide adds the text-only footer "Confidential · #sharp"; no footer logo lockup.

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

**Documented type-size exceptions (solutions slide):** The solutions slide carries three distinct type sizes within the content zone — slide title (Manrope 36pt), card title (Manrope 14pt weight 500), and card body (Inter 11pt) — plus the 9pt VAT note. This is two simultaneous overrides of `presentation.md` rules: (a) Inter 11pt body type sits well below `presentation.md`'s 18–24pt body range, required by the 5-cards-in-one-row density; (b) the 14pt card title introduces a third type size on the slide, overriding `presentation.md` §2's two-sizes-per-slide rule. Both exceptions apply only to the solutions slide.

→ See `presentation.md` §4 for full deck format conventions; this section overrides only where stated.

---

## 5. Layout & composition

### Four-zone slide grid

The proposal deck mirrors the website's page chrome (`Header` + `PageHeader` + content sections). Every slide carries:

| Zone           | Vertical band (1080-px frame)   | Treatment                                                                       |
| -------------- | ------------------------------- | ------------------------------------------------------------------------------- |
| Header strip   | top 0–10% (≈ 0.7" / 100 px)     | White; logo top-left; thin `#eeeeee` hairline along the bottom (mirrors the site's `border-b border-gray-200`). |
| Hero band      | 10–34% (≈ 1.85" / 265 px)       | Page-specific bg image with a `#333333` overlay at ≈ 35% opacity; slide title in white, Manrope 36pt, left-aligned, vertically centred. 4–8 px `#D41F21` underline along the bottom edge of the band, beneath the title. |
| Content area   | 34–93% (≈ 4.25" / 610 px)       | White. Bullets, cards, and per-slide content live here.                         |
| Footer         | bottom 7% (≈ 0.5" / 75 px)      | White; "Confidential · #sharp" Inter 9pt, applied via slide master.             |

The cover slide is the exception: its hero band fills the full content area below the header strip (down to the footer line), with the project topic and red accent overlaid in white.

This four-zone grid replaces the inherited three-zone treatment from `presentation.md` §5 — proposals get the website's page chrome instead of the deck-style three-zone grid. Left-align all body copy; centring is permitted only on the cover slide.

### Slide-title underline

Every body slide (2–5) carries a 4–8 px `#D41F21` line along the bottom edge of the hero band, beneath the slide title. The cover slide carries the same accent beneath its centred-vertically title, on the hero. This is the brand "underline" motif; it is the structural use of red on body slides.

### Two ordering variants

| Variant                | Slide order                                                       | When to use                                                              |
| ---------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **V1 — Forwarded context** | Cover · About us / Why us · Your brief · Proposed solutions · Next steps | Default. Use when the deck will be **forwarded for internal review** without a #sharp presenter. |
| **V2 — Situation first**   | Cover · Your brief · Proposed solutions · About us / Why us · Next steps | Use when the deck will be **presented live by #sharp**. Honours the brand "credentials live late" rule. |

The template ships in V1 order. To switch to V2 in Google Slides, drag slide 2 (About us / Why us) to position 4. See `docs/templates/README.md` for the step-by-step.

### The 5 slides — V1 order

1. **Cover** *(per-proposal)* — full-bleed hero with `public/img/services_bg.jpg` (matches the website's services-page hero) + `#333333` overlay (≈ 35% opacity). Project topic in white, Manrope 200, 60–80pt, left-aligned, vertically centred in the hero. 4–8 px `#D41F21` accent line beneath the title. Client name + proposal date bottom-right in white (Inter 14pt). Logo top-left in the white header strip. Footer applied via slide master.
2. **About us / Why us** *(static across all proposals)* — hero band carries `public/img/about_bg.jpg` (matches the website's `/about` page hero) with slide title "About #sharp" in white. Content area below: two columns. Left column "About us" (Manrope 14pt weight 500 sub-heading + 2–3 short paragraphs/bullets). Right column "Why us" (same sub-heading style + 3–4 bullets ≤ 12 words). Snapshotted from the website `/about` page; refreshed periodically (see `docs/templates/README.md`).
3. **Your brief** *(placeholder)* — hero band carries `public/img/analyse.jpg` (the discovery / analyse imagery from the website services) with slide title "Your brief" in white. Content area: 3–5 bullets ≤ 12 words. Covers problem, key goals, scope as understood from the discovery call. Author types this in per proposal.
4. **Proposed solutions** *(placeholder, distinctive slide)* — hero band carries `public/img/automation.jpg` (the doing / building imagery from the website services) with slide title "Proposed solutions" in white. Content area: single row of 5 cards. See §6 for the card spec. "All prices exclude VAT." footer note bottom-left, Inter 9pt `#333333`.
5. **Next steps** *(placeholder + standard contact)* — hero band carries `public/img/contact_bg.jpg` (matches the website's `/contact` page hero) with slide title "Next steps" in white. Content area: 1–3 numbered actions; contact lockup (name · email · booking link) at the bottom.

### Footer

`Confidential · #sharp` only — Inter 9pt, `#333333`, applied via slide master. This replaces `presentation.md` §5's footer treatment (accent line + page number + logo lockup) for proposals; do not add a page number or footer logo lockup to a proposal slide. **No company registration number on the deck.** T&Cs and company registration are handled in the separate signed agreement at contract time, not in the proposal deck.

---

## 6. Component / element library

Three proposal-specific components, defined here because they are not in `presentation.md`'s component library.

### Header strip + hero band

Every slide opens with a two-band chrome that mirrors the website's `Header` + `PageHeader` pattern. Treat this as one shared slide-master frame; never override per-slide.

| Element            | Spec                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Header strip       | Top 0.7" (≈ 100 px in 1080). White. Logo `img/sharp_logo.svg` top-left, ~0.4" tall. Thin `#eeeeee` hairline along the bottom (mirrors the site's `border-b border-gray-200`). |
| Hero band          | 1.85" tall directly below the header strip on slides 2–5. Cover slide's hero fills the full content area below the header strip, down to the footer line. |
| Hero image source  | Per slide — see §5 ("The 5 slides — V1 order") and §11 (asset paths).                                                         |
| Overlay            | `#333333` rectangle at ≈ 35% opacity over the full hero band. Lifts white-text legibility while keeping the photo readable.   |
| Title              | Manrope 36pt weight 200–300 (60–80pt on cover), `#FFFFFF`, left-aligned at 0.9" margin, vertically centred in the hero band.  |
| Underline accent   | 4–8 px `#D41F21` line, ~1.8" wide, sitting along the bottom edge of the hero band (slides 2–5) or beneath the cover title.    |

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

Header strip (top 0.7"): white; logo top-left (sharp_logo.svg, ~0.4" tall);
  thin #eeeeee hairline along the bottom edge.

Hero (full-bleed below the header strip, down to the footer line):
  Background image: public/img/services_bg.jpg
  Overlay: #333333 at ~35% opacity

Title (Manrope 72pt weight 200, white, vertically centred in the hero,
left-aligned at 0.9" margin):
  AI Transformation Assessment

Red accent: 5 px #D41F21 line beneath the title

Bottom-right (Inter 14pt, white):
  Meridian Retail Group
  4 May 2026

Footer (master): Confidential · #sharp
```

### Example B: Proposed solutions slide — all 5 cards filled in

Each card is a column in a single row across the slide. Cards numbered 1–5.

```
Header strip (top 0.7"): white; logo top-left.

Hero band (1.85" tall directly below the header strip):
  Background image: public/img/automation.jpg
  Overlay: #333333 at ~35% opacity
  Slide title (Manrope 36pt, white, left-aligned, vertically centred):
    Proposed solutions
  ──────────  (#D41F21 underline, ~6 px, along the bottom edge of the band)

Content area (white, below the hero band):

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
| Primary logo (light bg)    | `img/sharp_logo.svg`                  | Header strip top-left on every slide (no footer logo — see §5)             |
| Inverted logo (dark bg)    | `img/sharp_logo_invert.svg`           | Reserved for any optional dark accent (not used in default V1 deck)       |
| Hero — cover               | `public/img/services_bg.jpg`          | Slide 1 (Cover) hero — matches the website services-page hero              |
| Hero — about               | `public/img/about_bg.jpg`             | Slide 2 (About us / Why us) hero — matches the website `/about` hero       |
| Hero — brief               | `public/img/analyse.jpg`              | Slide 3 (Your brief) hero — discovery / analyse imagery                    |
| Hero — solutions           | `public/img/automation.jpg`           | Slide 4 (Proposed solutions) hero — doing / building imagery               |
| Hero — next steps          | `public/img/contact_bg.jpg`           | Slide 5 (Next steps) hero — matches the website `/contact` hero            |
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
