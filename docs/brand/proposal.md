# Brand: Proposal channel guidelines

Client proposals are the highest-stakes written artefact #sharp produces — they convert a discovery conversation into a signed engagement. The visual and verbal standards here carry full brand weight. This document is self-contained for AI consumption; it inlines the relevant visual and verbal subsets and cites canonical refs for depth. Do not alter values found here without first updating `docs/brand/foundations.md` and `docs/brand/voice.md`.

---

## 1. Purpose & context

Client proposals are formal PDF documents sent to a prospect's decision-making committee after a discovery call, to convert a qualified opportunity into a signed engagement.

**Audience:** A buying committee — typically a mix of business sponsor (budget holder), technical lead, and operational stakeholder. They read proposals at a desk, often across multiple sittings. They compare options. They share the document internally. Every section must hold up to close, sceptical reading without a presenter in the room.

**When to issue a proposal:** After a discovery call confirms genuine fit and a prospect has explicitly requested a proposal. Never issue a proposal speculatively; it devalues the document and wastes both sides' time.

**Three standard proposal types:**

- **Discovery-phase proposal** — a short, focused proposal for a bounded discovery or assessment engagement. Typically the first commercial step with a new client. Scope is tightly defined; the proposal primarily establishes trust and frames the problem correctly.
- **Full-engagement proposal** — a comprehensive proposal for a multi-workstream programme, often following a completed discovery. Contains detailed scope, methodology, team, timeline, and commercial breakdown.
- **Follow-on / extension proposal** — issued to an existing client to extend or expand a current engagement. References the prior work; builds on established trust.

**Relationship to other channels:** A proposal often accompanies a presentation deck (see `brand/presentation.md`). The deck carries the points; the proposal carries the reasoning. Never paste deck bullets into proposal prose. After signature, a proposal's commercial section informs the invoice (see `brand/invoice.md`).

---

## 2. Visual specs (inlined subset)

### Colour

Proposals use a restrained colour application. Red is reserved for moments of structural emphasis only.

| Role                         | Hex       | Where used                                                           |
| ---------------------------- | --------- | -------------------------------------------------------------------- |
| Body text / headings         | `#333333` | All body copy, table text, footnotes                                 |
| Background                   | `#FFFFFF` | All pages; clean, professional, printable                            |
| Accent / primary (sparingly) | `#D41F21` | Cover section heading, section divider lines, pricing Total row only |
| Logo (light pages)           | —         | Use `img/sharp_logo.svg`                                             |
| Logo (dark section dividers) | —         | Use `img/sharp_logo_invert.svg` on `#333333` divider backgrounds     |

**Do not** use red as a background fill for body pages. Do not use any additional red shades — the brand primary is `#D41F21` only. See `docs/brand/foundations.md §2` for deprecated values.

### Typography

| Role               | Font    | Weight / size          | Notes                                                          |
| ------------------ | ------- | ---------------------- | -------------------------------------------------------------- |
| Cover title        | Manrope | Weight 300, 60pt       | Large and authoritative; the first thing the reader encounters |
| Section headings   | Manrope | Weight 400, 18pt       | Clear section delineation without visual heaviness             |
| Sub-headings       | Manrope | Weight 500, 14pt       | Hierarchy within a section                                     |
| Body copy          | Inter   | Regular (400), 11pt    | Optimised for dense reading at print size                      |
| Table content      | Inter   | Regular (400), 10–11pt | Consistent with body; numbers right-aligned in pricing tables  |
| Footnotes / labels | Inter   | Regular (400), 9pt     | Footer metadata, source citations, confidentiality marking     |

Manrope and Inter are both available via Google Fonts. All fonts must be embedded in the exported PDF.

### Logo

- **Body pages** (white background): use `img/sharp_logo.svg`, top-right of cover page.
- **Section divider pages** (dark background): use `img/sharp_logo_invert.svg`, small, bottom-right or top-right.
- Never recolour, rotate, skew, or stretch the logo.
- Minimum rendered size: sufficient to remain legible at A4 print resolution (≥ 18mm height on the cover).

→ See [`brand/foundations.md`](foundations.md) for full visual rules.

---

## 3. Verbal specs (inlined subset)

### Tone for proposals

Proposals use the **formal-corporate** register from the tone spectrum. This is the most structured, precise voice #sharp uses. The register is appropriate because the document will be scrutinised by a procurement process, legal review, or finance team — not just the person who invited the proposal.

Formal-corporate does not mean cold. The writing is warm in its intent (we want to work with you; we understand your challenge) but disciplined in its execution (precise scope, clear terms, unambiguous pricing).

### Voice attributes engaged

- **Authoritative** — heavily emphasised. Every claim about approach or capability must be specific and method-grounded. "Our AI transformation framework moves clients from assessment to measurable operational change in twelve weeks" is authoritative. "We have extensive experience in AI" is not.
- **Trustworthy** — heavily emphasised. Proposals convert when the reader believes #sharp will do what it says. Over-claiming destroys this. State what is included, what is excluded, and what depends on client inputs. Precision builds trust.
- **Results-focused** — frame every proposed workstream in terms of business outcomes, not tasks. "Reduce manual processing time by mapping and automating three core data flows" beats "conduct a process analysis workshop."
- **Innovative** — evidence-led, not adjective-led. Reference specific methods (AI pipeline design, LLM integration, operational change management) rather than claiming general innovation.

### Copy rules specific to proposals

- Use "we" and "you" throughout — never refer to #sharp or the client in the third person ("the client", "#sharp will"). Third-person distancing reads as bureaucratic.
- Scope and T&Cs sections use legal-adjacent precision: define terms on first use, use consistent defined terms thereafter (e.g., "the Services", "the Engagement Period").
- Executive summary: 100–200 words, active voice, outcome-focused. Must stand alone if extracted.
- Long paragraphs are permitted in narrative sections (understanding, approach). Use bullet lists in scope, methodology, and assumptions sections.
- UK English throughout. "Programme" not "program". "Optimise" not "optimize".
- `#sharp` is always lowercase with hash prefix; it never starts a sentence. Write "The team at #sharp…" not "#sharp delivers…".
- No emoji, no exclamation marks.
- No unsubstantiated superlatives. "World-class" is forbidden; "leading" requires citation.

→ See [`brand/voice.md`](voice.md) for full verbal rules.

---

## 4. Format & dimensions

### Page dimensions

- **Size:** A4 portrait — 210 × 297 mm.
- **Margins:** 25 mm top and bottom; 20 mm left and right.
- **Gutter:** No additional gutter; single-column layout throughout.

### Typography scale

| Element        | Font    | Size | Weight | Line-height |
| -------------- | ------- | ---- | ------ | ----------- |
| H1 (cover)     | Manrope | 60pt | 300    | 1.1         |
| H2 (sections)  | Manrope | 18pt | 400    | 1.3         |
| H3 (sub-heads) | Manrope | 14pt | 500    | 1.3         |
| Body           | Inter   | 11pt | 400    | 1.4         |
| Tables         | Inter   | 10pt | 400    | 1.4         |
| Footnotes      | Inter   | 9pt  | 400    | 1.3         |

### Footer

- **Footer left:** Page number (e.g., `3 of 18`).
- **Footer right:** `[Project reference] · Confidential` — the project reference is set per engagement (e.g., `SHARPx-2026-04 · Confidential`).
- Footer text: Inter 9pt, `#333333`.
- The confidentiality marking must appear on every page without exception.

### Output format

- **Delivery format:** PDF, embedded fonts, no form fields.
- **Document metadata:** Title field set to `[Client name] · [Project name] · Proposal` (e.g., `Meridian Retail Group · AI Transformation Assessment · Proposal`).
- **Source file:** The editable source (e.g., Google Docs, InDesign) is kept in the team's Google Drive; the PDF is the client-facing artefact.

---

## 5. Layout & composition

### Section flow

Every numbered section begins on a new page. A section divider page (see §6) precedes each major section. Body pages follow immediately after the divider.

### Page anatomy

```
┌───────────────────────────────────────────────┐
│  [Project ref]               [Page n of N]    │  ← header, Inter 9pt
├───────────────────────────────────────────────┤
│                                               │
│  BODY CONTENT                                 │
│  (single-column, full width within margins)   │
│                                               │
├───────────────────────────────────────────────┤
│  [Page number]     [Project ref · Confidential]│  ← footer, Inter 9pt
└───────────────────────────────────────────────┘
```

### Section number and name

The first body page of each section carries the section number and name as an H2 heading, set in Manrope 18pt. A 2pt red (`#D41F21`) horizontal rule sits immediately beneath the section heading, spanning the full text width. This is the only structural use of red on a body page.

### Pricing tables

- Numbers are right-aligned in all pricing columns.
- Line items use Inter 10pt, regular weight.
- The Total row uses Manrope 11pt, weight 500. The Total cell background is `#D41F21`; the Total label and amount are white Inter — this is the one permitted use of red as a background on a body page.
- Subtotal and VAT rows use Inter 10pt, no colour distinction beyond row spacing.

### Text density

- Narrative sections (executive summary, understanding, approach): prose paragraphs, 3–5 sentences. A proposal earns the reader's sustained attention here.
- Scope, methodology, assumptions sections: bulleted or numbered lists, one idea per bullet, ≤ 25 words per bullet.
- Never use red text in body copy. Red is structural, not expressive.

### Images

- Keep images (team photos, diagrams) in distinct page regions — never place text over an image.
- Service photography (`img/analyse.jpg`, `img/automation.jpg`, `img/customerExperience.jpg`) may appear in the cover, understanding section, or approach section only — not in commercial or T&Cs sections.

---

## 6. Component / element library

Named page types that function as primitives when assembling a proposal. Every proposal is built from these components.

**Cover page**
Full-bleed white. Title in Manrope 60pt weight 300, `#333333`. A single `#D41F21` accent line (3pt) beneath the title. Client name in Manrope 18pt below the title. Project reference, date, and engagement type in Inter 11pt, one line each, beneath the client name. The #sharp logo (`img/sharp_logo.svg`) sits top-right at a consistent size. No other imagery on the cover page unless explicitly approved.

**Section divider page**
Dark background (`#333333`). Section number and name centred vertically and horizontally in white Manrope 36pt weight 200. A `#D41F21` 3pt horizontal accent line above the section name. Page number in Inter 9pt white, bottom-centre. The #sharp inverted logo (`img/sharp_logo_invert.svg`) sits bottom-right, small. No body copy on this page type.

**Body page**
Standard page within a section. Header line (Inter 9pt): project reference left, page number right. Body content (see layout above). Footer line (Inter 9pt): page number left, `[Project ref] · Confidential` right.

**Pricing table**
Itemised line-by-line breakdown. Columns: Description | Unit | Rate | Quantity | Amount. Subtotal row, VAT row (rate from engagement config — see §10), Total row. Total row in `#D41F21` background, white Inter text. Numbers right-aligned throughout.

**Team page**
Small team photo (square crop, consistent across all team members), right-aligned. Name in Manrope 14pt weight 500. Role in Inter 11pt. Two-line bio in Inter 11pt. Relevant credentials or certifications in Inter 10pt. Team photos: `public/img/team_janos.jpg` (Janos) and `public/img/team_loreen.jpg` (Loreen).

**Timeline / Gantt page**
Horizontal bar chart. Primary `#D41F21` bars for #sharp-led phases; `#333333` bars for client-led or joint phases. Phase labels left-aligned in Inter 10pt. Week numbers or calendar week references on the horizontal axis. Each phase clearly bounded; no overlapping bars unless genuinely concurrent.

**Appendix divider page**
Same visual treatment as section divider. Text reads: `Appendix [letter]: [Appendix name]` (e.g., `Appendix A: Terms and Conditions`). Used to open each appendix.

---

## 7. Templates / starters

Three named proposal structures. Use these as starting frameworks; adjust page count and section depth to fit the engagement. Preserve the narrative logic — particularly the principle that #sharp's credentials come near the end, after the client has seen a compelling picture of their own situation.

### Discovery-phase proposal (~10–15 pages)

Page sequence:

1. Cover — client name, engagement type ("Discovery"), project reference, date.
2. Executive summary — 1 page; situation, proposed response, expected outcome, and investment at a glance.
3. Our understanding — the client's current situation and the challenge as #sharp understood it from the discovery call.
4. Proposed discovery scope — the specific activities, outputs, and boundaries of the proposed discovery engagement.
5. Timeline — indicative schedule (typically 2–4 weeks); Gantt or simple milestone list.
6. Fee and commercials — day rate or fixed fee; total; VAT; payment terms.
7. Next steps — two or three concrete actions (sign-off, kickoff date, introductions needed).
8. About #sharp — brief credentials; team; relevant prior work. (After the substance, not before.)
9. Terms and conditions — summary or Schedule A reference.
10. Appendix A: [if applicable] — supporting materials.

### Full-engagement proposal (~20–30 pages)

Page sequence:

1. Cover.
2. Executive summary.
3. Our understanding — detailed situation analysis; the challenge and its root causes.
4. Proposed approach — the #sharp transformation framework applied to this engagement.
5. Scope — detailed by workstream; clearly states what is included and excluded.
6. Methodology — how the work is done; governance model; client team involvement.
7. Team — named leads with photos and credentials.
8. Timeline — Gantt by phase and workstream; key milestones and dependencies.
9. Commercials — full pricing table; payment schedule; assumptions underlying the fee.
10. Assumptions and dependencies — what #sharp requires from the client to deliver the scope.
11. Terms — contractual summary; reference to full T&Cs in appendix.
12. Appendix A: Terms and conditions (full).
13. Appendix B: [Additional materials as required].

### Follow-on / extension proposal (~6–10 pages)

Page sequence:

1. Cover — notes "extension to [prior engagement name]".
2. What we delivered — a concise summary of outcomes from the prior engagement; sets the baseline.
3. What we propose next — the rationale for the extension and what changes.
4. Updated scope — specific additions, removals, or amendments relative to the prior engagement.
5. Commercials — updated fee; any changes to rate or structure.
6. Sign-off — confirmation of continuation and next steps.

---

## 8. Worked examples

### Example A: Cover page (visual layout)

```
COVER PAGE — A4 portrait, 210 × 297 mm

┌─────────────────────────────────────────────┐  ← 25mm top margin
│                          [sharp_logo.svg]   │  ← logo top-right, ~18mm height
│                                             │
│                                             │
│                                             │
│  AI Transformation Assessment               │  ← Manrope 60pt, weight 300, #333333
│  ─────────────────────────────────          │  ← 3pt red (#D41F21) rule
│                                             │
│  Meridian Retail Group                      │  ← Manrope 18pt, weight 400, #333333
│                                             │
│  Project reference: SHARPx-2026-04          │  ← Inter 11pt, #333333
│  Proposal date: 4 May 2026                  │
│  Prepared by: #sharp                        │
│                                             │
│                                             │
│                                             │  ← 25mm bottom margin
└─────────────────────────────────────────────┘
```

### Example B: Executive summary (on-brand prose)

> Meridian Retail Group is carrying the operational cost of three manual data processes that were designed for a business half its current size. The team at #sharp proposes a four-week discovery engagement to map those processes in detail, identify the highest-value automation opportunities, and produce a costed implementation roadmap. At the end of the discovery, you will have a clear, evidenced picture of where intelligent automation delivers the greatest return — and a plan you can act on immediately, with or without #sharp's continued involvement.

_(86 words. Formal-corporate register. Outcome-focused. Authoritative without over-claiming.)_

### Example C: Pricing table

| Description                            | Unit | Rate (£) | Qty |          Amount (£) |
| -------------------------------------- | ---- | -------: | --: | ------------------: |
| Process mapping and analysis           | Day  |    1,200 |   5 |               6,000 |
| AI opportunity assessment              | Day  |    1,200 |   3 |               3,600 |
| Implementation roadmap and costed plan | Day  |    1,200 |   2 |               2,400 |
| **Subtotal**                           |      |          |     |          **12,000** |
| VAT at `{{vat_rate}}`                  |      |          |     |    `{{vat_amount}}` |
| **Total (inc. VAT)**                   |      |          |     | `{{total_inc_vat}}` |

`{{vat_rate}}`, `{{vat_amount}}`, and `{{total_inc_vat}}` are populated from the engagement configuration at issue time — never hardcoded in the template. See §10 for the VAT constraint.

_Payment terms: 50% on engagement commencement, 50% on delivery of final outputs. Invoices payable within 30 days._

---

## 9. Do / Don't

**Don't** open with "About #sharp" before the executive summary.
**Do** put credentials, team, and company background near the end of the proposal — after the scope, timeline, and commercials. The prospect's buying committee cares about their own situation first; they reach for your credentials only after they believe you understand the problem.

---

**Don't** use generic management-consulting language: "synergies", "best-in-class", "world-class", "holistic", "leverage" (as a verb), "cutting-edge", "innovative solutions".
**Do** name the specific outcome, the specific method, and the specific timeframe. "We reduce first-response time by integrating an LLM-based triage layer into your support queue" is concrete. "We leverage cutting-edge AI to enhance customer experience" is not.

---

**Don't** bury pricing in an appendix or present it without a clearly labelled total.
**Do** include a clearly named "Commercials" or "Fee and commercials" section in the main body, with an unambiguous Total row. Decision-makers resent having to hunt for a number.

---

**Don't** introduce typefaces beyond Manrope and Inter in any section of the proposal.
**Do** use Manrope weight variations (300, 400, 500) to create typographic hierarchy without adding visual noise. Weight changes carry hierarchy; typeface changes carry chaos.

---

**Don't** place body text over images or diagrams at any point in the document.
**Do** keep images and text in distinct page regions. If a diagram needs a label, position the label above, below, or beside the image — never overlaid.

---

## 10. Hard constraints

Non-negotiable rules. A proposal that violates any item here must be corrected before it is issued.

- **Company registration:** Every proposal must include the registered company name and company number in the footer of the T&Cs section or in a document footer. This is a legal requirement.
- **VAT calculation:** The VAT rate must be drawn from the current engagement configuration or invoice config — never hardcoded in the proposal template. Rates change; templates do not automatically update. Use a placeholder (e.g., `{{vat_rate}}`) that is populated at issue time.
- **Confidentiality marking:** The text `[Project reference] · Confidential` must appear on every page, in the footer, without exception. This includes cover, divider, and appendix pages.
- **PDF document metadata:** The PDF Title field must be set to `[Client name] · [Project name] · Proposal` before the file is sent. Empty or generic metadata (e.g., "Document1") is not acceptable.
- **No tracking pixels or embedded scripts:** The PDF is a static document. No form fields, no tracking pixels, no JavaScript. The recipient must be able to read the document offline with no network calls.
- **Brand primary only:** The accent colour used in the proposal is `#D41F21` — the single, versioned brand primary. No other red shades are permitted, including deprecated historical values. See `docs/brand/foundations.md §2`.

---

## 11. Asset references

All paths are relative to the repository root.

| Asset                      | Path                         | Use in proposals                                                    |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------- |
| Primary logo (light bg)    | `img/sharp_logo.svg`         | Cover page top-right; body page header (optional)                   |
| Inverted logo (dark bg)    | `img/sharp_logo_invert.svg`  | Section divider pages (dark background)                             |
| Service imagery — analyse  | `img/analyse.jpg`            | Understanding or approach sections; data and analytics workstreams  |
| Service imagery — automate | `img/automation.jpg`         | Approach or scope sections; operational efficiency workstreams      |
| Service imagery — CX       | `img/customerExperience.jpg` | Understanding or approach sections; customer experience workstreams |
| Team photo — Janos         | `public/img/team_janos.jpg`  | Team page; square crop consistent with presentation.md spec         |
| Team photo — Loreen        | `public/img/team_loreen.jpg` | Team page; square crop consistent with presentation.md spec         |

**Note on generated proposals:** Completed proposal PDFs are stored according to the team's Google Drive convention — a folder per client, named by project reference. The Google Drive structure is out of scope for this document.

---

## 12. Related docs

- [`brand/foundations.md`](foundations.md) — full visual reference: colours, typography, logo, spacing, imagery, composition, accessibility, and token reference. Proposals must not define new visual values without updating foundations first.
- [`brand/voice.md`](voice.md) — full verbal reference: voice attributes, tone spectrum, writing principles, vocabulary, audience messaging, and value propositions.
- [`brand/presentation.md`](presentation.md) — sibling channel document; presentations often accompany proposals. The deck carries the points; the proposal carries the reasoning. Never paste proposal prose into a slide.
- [`brand/invoice.md`](invoice.md) — the commercial terms in a proposal must align with the invoice template. VAT rate, payment schedule, and company registration details are governed by invoice.md.
