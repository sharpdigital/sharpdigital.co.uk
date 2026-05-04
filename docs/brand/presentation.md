# Brand: Presentation channel guidelines

Google Slides decks are a primary client-facing touchpoint for #sharp — the visual and verbal standards here carry full brand weight. This document is self-contained for AI consumption; it inlines the relevant visual and verbal subsets and cites canonical refs for depth. Do not alter values found here without first updating `docs/brand/foundations.md` and `docs/brand/voice.md`.

---

## 1. Purpose & context

Google Slides decks serve three use cases at #sharp:

- **Client pitches** — the primary sales instrument for new-business conversations. Audience: prospect evaluating whether to engage.
- **Discovery-call leave-behinds** — a short, personalised deck emailed after an initial meeting. Audience: prospect who has expressed interest; often forwarded internally.
- **Case-study walkthroughs** — evidence of delivered outcomes, used in both new-business and mid-engagement settings. Audience: active client or prospective client seeking proof of capability.

In all three cases the audience is a person making or influencing a commercial decision. They are time-poor, outcome-focused, and will form a first impression within seconds. The deck must earn its reading.

**When to use a deck vs. a proposal:** a deck is for a meeting room or screen share; a proposal (see `brand/proposal.md`) is for careful desk-top reading. Decks carry points; proposals carry reasoning. Never paste proposal prose into a slide.

---

## 2. Visual specs (inlined subset)

### Colour

The colours used in decks are a subset of the full #sharp palette.

| Role                      | Hex             | Notes                                                                         |
| ------------------------- | --------------- | ----------------------------------------------------------------------------- |
| Accent / primary          | `#D41F21`       | CTA elements, accent lines, first-word emphasis on cover. Sparingly — see §5. |
| Body text / headings      | `#333333`       | All slide body copy, table text, speaker notes.                               |
| Background                | `#FFFFFF`       | Default slide background. Never replace with primary red or a dark colour.    |
| Extended hues (chart use) | See foundations | One extended hue per additional chart series at most; never rainbow palettes. |

**Do not** use the semantic error colour or any other red shade in client decks. The brand primary is `#D41F21` only — see `docs/brand/foundations.md §2` for which historical reds are deprecated.

### Typography

| Role              | Font    | Weight / size                              | Notes                                                      |
| ----------------- | ------- | ------------------------------------------ | ---------------------------------------------------------- |
| Slide titles      | Manrope | Weight 200–300, 36–48pt (scaled to layout) | Airy, not heavy — consistent with brand `text-5xl` spirit. |
| Cover title       | Manrope | Weight 200, 60–80pt                        | Large and open.                                            |
| Body / bullets    | Inter   | Regular (400), 18–24pt                     | Optimised for on-screen reading.                           |
| Captions / labels | Inter   | Regular (400), 14–16pt                     | Tables, chart labels, attribution lines.                   |

Both Manrope and Inter are Google Fonts and are available natively in Google Slides — no embedding required.

**No more than two type sizes per slide:** one for the title, one for the body. Do not introduce a third size.

### Logo

- **Light-background slides** (white, default): use `img/sharp_logo.svg`.
- **Dark-background slides** (section dividers): use `img/sharp_logo_invert.svg`.
- Minimum rendered height: 24 px in a 1920 × 1080 frame; scale proportionally for 1280 × 720 exports.
- Never recolour, rotate, skew, or stretch the logo.

→ For full visual rules, see [`brand/foundations.md`](foundations.md).

---

## 3. Verbal specs (inlined subset)

### Tone modulation for decks

Decks use the **professional-warm** register from the tone spectrum. This sits between formal-corporate (proposals, contracts) and conversational-confident (social posts). The goal is peer-to-peer clarity: confident enough to be credible, human enough to be approachable.

### Voice attributes engaged

- **Authoritative** — state things plainly and specifically. "Our AI transformation framework moves clients from assessment to measurable operational change in twelve weeks" beats "we have extensive experience."
- **Trustworthy** — do not over-claim. Let proof slides do the talking. If a metric is approximate, say so.

### Slide copy rules

- **Slide titles in sentence case**, not Title Case. "How we approach customer experience" not "How We Approach Customer Experience".
- **Bullets: ≤ 12 words each.** If a bullet needs more, the point belongs in speaker notes.
- **Speaker notes carry the elaboration; slides carry the points.** The audience reads one; the presenter reads the other. Never conflate them.
- **Active voice.** "We design" not "solutions are designed."
- **No emoji on client decks.** Ever.
- **No unsubstantiated superlatives.** "Leading" needs proof; "world-class" is forbidden.
- `#sharp` is always lowercase with hash prefix; it never starts a sentence. Write "The team at #sharp…" not "#sharp delivers…".

→ For full verbal rules, see [`brand/voice.md`](voice.md).

---

## 4. Format & dimensions

### Primary format

- **Aspect ratio:** 16:9
- **Full-HD dimensions:** 1920 × 1080 px (preferred — crisp on modern displays and screen sharing)
- **HD dimensions:** 1280 × 720 px (acceptable alternative; same ratio)
- **File format:** Google Slides (`.gslides` or shared link); source of truth is always the Google Drive copy.

### Fallback format

- **4:3 dimensions:** 1024 × 768 px — used **only** when the client environment requires it (older projectors, specific conference room AV). Confirm before building; it is the exception, not the default.

### Font availability

Both Manrope and Inter are hosted by Google Fonts. In Google Slides, search by name in the font picker — no manual upload or embedding required.

### PDF export

- Export at **150 DPI** for circulation (e.g., emailed leave-behinds, attachments in proposals).
- PDF exports are read-only artefacts; the editable Google Slides link remains the primary source.

---

## 5. Layout & composition

### Three-zone slide grid

Every standard slide follows a consistent spatial structure:

```
┌──────────────────────────────────────────┐
│  TITLE ZONE  (top ~15% of frame)         │
├──────────────────────────────────────────┤
│                                          │
│  CONTENT ZONE  (~72% of frame)           │
│                                          │
├──────────────────────────────────────────┤
│  FOOTER ZONE  (~13%): accent line +      │
│  page number / logo lockup               │
└──────────────────────────────────────────┘
```

### Margins

- Maintain **≥ 10% of the frame edge** as protected margin on all sides.
- At 1920 × 1080: left/right margin ≥ 192 px; top/bottom margin ≥ 108 px.

### Alignment

- **Left-align** all content text. Never centre body copy.
- **Centring is permitted only** on the cover slide and section dividers — it is a deliberate exception for high-impact moments, not a default.

### Red accent rules

The primary `#D41F21` may appear in slides as:

- A **4–8 px horizontal line** immediately beneath the slide title (the brand "underline" motif).
- **The first word** of the cover slide title, set in primary.
- The **highlight series** in a chart (the datum #sharp is drawing attention to).

Red must never be used as a **background fill** for standard slides. It is an accent — always ≤ 10% of the total frame area.

---

## 6. Component / element library

Named slide types that function as primitives when building or generating decks. Every deck is assembled from these components.

**Cover slide**
Large title (Manrope 60–80pt, weight 200). Red accent applied to the first word of the title or as an underline below the full title — choose one, not both. Subtitle in Inter 24pt. Client name and date, small, bottom-right. Logo top-left.

**Agenda slide**
Numbered list. Sentence case. No more than 5 items. Each item is one line. No sub-bullets on the agenda.

**Section divider**
Full-bleed dark background (`#333333`). Single sentence in white Manrope (weight 200, 40–48pt). Red dot or 4-px line accent. No body copy. Logo bottom-right in inverted variant.

**Content slide (text-heavy)**
Title at top. Three to five bullets with optional brief sub-points (one level only). Supporting visual or none. Do not exceed five top-level bullets.

**Content slide (visual-heavy)**
Title at top. Single image or diagram filling 60–70% of the frame. Caption below in Inter 14pt. Minimal text elsewhere.

**Stat highlight slide**
Single large number in Manrope, weight 200, approximately 160–200pt. Set in primary `#D41F21`. One-line context sentence below in Inter 24pt charcoal. Source citation in Inter 14pt at bottom-left. Nothing else on the slide.

**Quote slide**
Italicised quote in Inter 28pt. Attribution line in Inter 16pt. No quotation marks — the typographic treatment provides emphasis. Centre-aligned on this slide type only.

**Team intro slide**
Square photo (consistent crop across team members). Name in Manrope weight 300. Role in Inter regular. One-line bio. Logo footer.

**Comparison slide**
Two-column layout or table. Before / after, or them / us framing. Red accent on the "#sharp" or "after" column header only — never on both sides.

**Table slide**
Inter 14–16pt. Generous row height (≥ 1.5× font size). Primary `#D41F21` on header row text or background (check contrast — white text on primary passes AA). No vertical lines; horizontal dividers only.

**Chart slide**
Primary `#D41F21` as the headline / highlight series. Secondary series in `#333333` charcoal or one extended hue from the #sharp spectrum. Never a rainbow palette.

**CTA slide**
Single imperative sentence (Manrope, large). Red underlined text or a red-outlined button visual. No more than two lines total. High-impact, low-noise.

**Contact / next-steps slide**
Name, role, email, calendar booking link. Minimal layout. Logo. This is the last slide in most deck structures.

---

## 7. Templates / starters

Three named deck structures. Use these as starting points; adjust slide count to the engagement, but preserve the narrative logic.

### Default 8-slide pitch deck

1. Cover — client name, engagement topic, date.
2. Problem — the specific challenge the client faces.
3. Insight — the #sharp perspective on why it persists and what breaks the pattern.
4. Approach — the transformation framework applied to this context.
5. Proof — a case study or metric from a comparable engagement.
6. Plan — indicative phasing, milestones, and governance.
7. Team — the people who would deliver this engagement.
8. CTA + contact — the single next action and contact details.

### Case-study micro-deck (3 slides)

1. Context — client sector, scale, and the challenge in one slide.
2. What we did — approach, key decisions, and headline numbers.
3. Outcome — the measurable result and what changed for the client.

### Discovery-call leave-behind (5 slides)

1. Cover — personalised to the prospect's organisation.
2. What we heard — a reflection of what was shared in the call (shows active listening).
3. How we would approach it — the #sharp framework applied to their specific context.
4. Indicative timeline and investment — a range, clearly framed as indicative, not a quote.
5. Next steps — one clear action for both sides.

---

## 8. Worked examples

Two complete slide examples — actual copy, not descriptions. Use these as calibration references when generating or reviewing slide content.

### Example A: Cover slide

```
Slide type: Cover

Title (Manrope 72pt weight 200):
  [DIGITAL] TRANSFORMATION ASSESSMENT
  ← "DIGITAL" set in #D41F21; remaining words in #333333

Subtitle (Inter 24pt):
  A focused review of your current-state operations
  and the highest-impact opportunities for change.

Bottom-right (Inter 14pt):
  Meridian Retail Group  |  May 2026

Logo: top-left, sharp_logo.svg

Red accent: 5px horizontal line beneath the full title text
```

### Example B: Stat highlight slide

```
Slide type: Stat highlight

Stat (Manrope ~180pt weight 200, colour #D41F21):
  34%

Context line (Inter 24pt, colour #333333):
  reduction in manual processing time — delivered
  within the first eight weeks of the programme.

Source (Inter 14pt, colour #333333, bottom-left):
  Source: operational reporting, Meridian Retail Group, Q1 2026.
  Figure represents average across three process areas.
```

---

## 9. Do / Don't

**Don't** use stock photography of handshakes, suited people pointing at laptops, or generic "business meeting" imagery.
**Do** use real client-context imagery, abstract geometric backgrounds consistent with the #sharp visual language, or no imagery at all.

---

**Don't** use rainbow chart palettes (automatic colour sequences from charting tools).
**Do** use primary `#D41F21` as the highlight series; charcoal `#333333` or one extended hue for secondary series.

---

**Don't** centre body text on content slides.
**Do** left-align all body copy. Save centring for the cover and section dividers.

---

**Don't** use a bullet list when a single sentence suffices. A slide that says "We move fast" in one clean line lands harder than three bullets saying the same thing in fragments.
**Do** prefer one strong sentence over a list wherever the idea is unitary.

---

**Don't** use red as a background fill on any slide.
**Do** use red as an accent element — title underline, first-word emphasis, chart highlight, CTA text — and keep it below 10% of the frame area.

---

## 10. Hard constraints

Non-negotiable rules. If a design decision conflicts with any item here, the constraint wins.

- Logo never rendered below **24 px height** in a 16:9 (1920 × 1080) frame.
- Logo never recoloured, rotated, skewed, or stretched.
- Brand primary is `#D41F21` only — never older red shades or alternative hex variants. See `docs/brand/foundations.md §2` for the deprecated values.
- **Manrope for titles; Inter for body** — no substitutions. If a client template uses a different font, override it.
- No more than **two type sizes per slide** (title + body). A third size is only permitted for captions/labels, and only if they are visually subordinate.
- **No emoji on client decks.**
- Never place `#D41F21` on `#333333` — this pairing fails WCAG AA contrast at normal text sizes (ratio ~2.4:1).
- Never use extended-spectrum hues as body text on white without verifying contrast (several extended hues fall below 3:1 against white — see foundations §2).

---

## 11. Asset references

All assets below are relative to the repository root.

| Asset                      | Path                         | Use in decks                                            |
| -------------------------- | ---------------------------- | ------------------------------------------------------- |
| Primary logo (light bg)    | `img/sharp_logo.svg`         | Cover, footer lockup on white slides                    |
| Inverted logo (dark bg)    | `img/sharp_logo_invert.svg`  | Section dividers, any dark-background slide             |
| Service imagery — analyse  | `img/analyse.jpg`            | Visual-heavy slides for data and analytics services     |
| Service imagery — automate | `img/automation.jpg`         | Visual-heavy slides for operational efficiency services |
| Service imagery — CX       | `img/customerExperience.jpg` | Visual-heavy slides for customer experience services    |
| Team photo — Janos         | `public/img/team_janos.jpg`  | Team intro slide (square-cropped per component spec)    |
| Team photo — Loreen        | `public/img/team_loreen.jpg` | Team intro slide (square-cropped per component spec)    |

**Note on team photos:** the team photos currently live in `public/img/`. If a square-cropped variant for slide use is needed it should be exported alongside the source landscape file.

Generated deck files live wherever the team's Google Drive convention places them (Google Drive folder structure is out of scope for this document).

---

## 12. Related docs

- [`brand/foundations.md`](foundations.md) — full visual reference: colours, typography, logo, spacing, motion, imagery, composition, accessibility, token reference.
- [`brand/voice.md`](voice.md) — full verbal reference: voice attributes, tone spectrum, writing principles, vocabulary, audience messaging, value propositions.
- [`brand/proposal.md`](proposal.md) — sibling channel document; proposals often accompany decks. The proposal carries the reasoning; the deck carries the points. _(This file will be created in the next task.)_
