# Branding Guideline Documentation — Design Spec

**Date:** 2026-05-04
**Issue:** [#22 — Update the branding documentation](https://github.com/sharpdigital/sharpdigital.co.uk/issues/22)
**Status:** Design approved; pending implementation plan.

---

## 1. Overview

Build a comprehensive, multi-channel brand guideline documentation system that:

- **Reflects the website as it actually ships** (not aspirational, not drifted) — code is the source of truth.
- **Scales beyond web** to client-facing artifacts: presentations, proposals, invoices, enquiry replies, email signatures, social media, video content.
- **Is AI-consumable** — a fresh AI session given the right one or two files can generate on-brand artifacts without asking for additional context.
- **Is humanly maintainable** — progressive disclosure, predictable shape per file, clear ownership of every visual and verbal token.

The immediate downstream consumer is a Google Slides template generation task; the architecture must work equally well for every other channel listed.

## 2. Decisions reached during brainstorming

These resolve the load-bearing structural choices. Implementation must respect them.

| #   | Decision                                                                                                                                                                                                                                                 | Rationale                                                                                                                                                   |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Source of truth = the website code.** When `02_visual-design-system.md` and `tailwind.config.js` disagree, the config wins. The doc is reconciled to the code, never the reverse.                                                                      | Avoids documenting aspirations that the live site doesn't honour. Catches drift from the past.                                                              |
| 2   | **Per-channel scope = comprehensive, deep on every channel now.** All seven channels get full detail in this spec, not stubs.                                                                                                                            | User confirmed all channels are real near-term needs (slides next, others soon). Stubbed specs would just be rewritten.                                     |
| 3   | **Verbal guidance is integrated, not siloed.** Existing voice/tone material in `04_content-framework.md` is extracted into the new structure.                                                                                                            | A brand guideline that doesn't cover voice is half the asset. AI generating any client-facing content needs both halves.                                    |
| 4   | **Structure = progressive disclosure.** Short entry doc in `docs/`, detailed docs in `docs/brand/`, split by use case. Each use case has full context for its task and nothing irrelevant.                                                               | Direct user instruction. Optimises for both human navigation and AI context windows.                                                                        |
| 5   | **Per-channel docs are self-contained, not strict-DRY.** Each channel doc inlines the brand subset it actually uses, with links to canonical refs for depth.                                                                                             | DRY optimises the wrong axis (storage). AI consumption needs high signal-to-noise per file. Drift mitigation is cheap (grep-based) and an optional CI lint. |
| 6   | **No per-channel "AI Generation Prompt" sections.** Each channel doc is written as direct AI-consumable reference. The entry doc has a single "Using these docs with AI" section that explains both consumption modes (agent context, human copy-paste). | Per-channel prompt scaffolds confuse AI when the doc is loaded as context. The doc itself is the prompt material.                                           |

## 3. File structure

```
docs/
├── brand-guideline.md             # ENTRY POINT — short index, "how to use", scope
├── brand/
│   ├── foundations.md             # Canonical visual ref (colors, type, logo, spacing, imagery, motion)
│   ├── voice.md                   # Canonical verbal ref (voice, tone, vocabulary, sample copy)
│   ├── presentation.md            # Google Slides / pitch decks
│   ├── proposal.md                # Client proposals
│   ├── invoice.md                 # Invoices
│   ├── enquiry.md                 # First-contact / enquiry replies
│   ├── email-signature.md         # Email signatures (HTML + plain)
│   ├── social.md                  # LinkedIn / X / Bluesky
│   └── video.md                   # Video content (intro/outro, lower thirds, captions)
├── 02_visual-design-system.md     # RECONCILED — narrowed to web-engineering reference
├── 04_content-framework.md        # RECONCILED — narrowed to web-page-specific copy
└── ...                            # other existing docs untouched
```

**Roles at a glance:**

| File                         | Audience                            | Source of truth for                    |
| ---------------------------- | ----------------------------------- | -------------------------------------- |
| `brand-guideline.md`         | Anyone                              | Index + AI usage instructions          |
| `brand/foundations.md`       | Designers, devs, AI                 | All visual brand tokens                |
| `brand/voice.md`             | Writers, AI                         | All verbal brand rules                 |
| `brand/<channel>.md` (×7)    | Whoever produces that artifact + AI | Self-contained channel specs           |
| `02_visual-design-system.md` | Web developers only                 | Tailwind classes, components, web WCAG |
| `04_content-framework.md`    | Web content authors                 | Page-specific headlines, CTAs, SEO     |

**Two ownership rules:**

- Channel docs cite `foundations.md` / `voice.md` and inline only the relevant subset.
- Where `02_visual-design-system.md` and `foundations.md` overlap, foundations is the source of truth and the design system doc cites it.

## 4. Entry doc anatomy — `docs/brand-guideline.md`

**Goal:** opening this single file gives, in roughly one screen of reading, (a) what the brand is, (b) where to go next, (c) how to invoke the docs with AI.

**Target length:** 100-200 lines of markdown. Anything beyond that belongs in `foundations.md`, `voice.md`, or a channel doc.

**Sections, in order:**

1. **What #sharp is** — 2-3 sentences positioning the brand and audience.
2. **Brand at a glance** — quick-reference card with primary colour `#D41F21`, font pair (Manrope / Inter), logo paths, voice in one line. Lets one-off lookups skip opening another file.
3. **Document index** — table mapping "if you're doing X, open Y" for every `brand/*.md`, with a one-line scope statement per file.
4. **Using these docs with AI** — explains both consumption modes (agent loads docs vs human copy-paste); table of "task → files to attach"; one or two example prompts.
5. **Source of truth & maintenance** — `foundations.md` canonical visual; `voice.md` canonical verbal; channel docs inline subsets and re-sync if canonical refs change; the website code itself is the ultimate truth.
6. **Out of scope** — explicit list of what the guideline doesn't cover (legal copy, contract templates, internal team comms) so AI doesn't invent rules for those.

**Sketch of section 4:**

```markdown
## Using these docs with AI

Two modes:

**Mode 1 — Agent loads docs as context.** Attach only what the task needs.

| Task                          | Files to attach                               |
| ----------------------------- | --------------------------------------------- |
| Slide deck / pitch            | brand-guideline.md + brand/presentation.md    |
| Client proposal               | brand-guideline.md + brand/proposal.md        |
| Invoice                       | brand-guideline.md + brand/invoice.md         |
| Email signature               | brand-guideline.md + brand/email-signature.md |
| LinkedIn / social post        | brand-guideline.md + brand/social.md          |
| Video intro/outro             | brand-guideline.md + brand/video.md           |
| Enquiry / first-contact reply | brand-guideline.md + brand/enquiry.md         |
| Web component (engineering)   | docs/02_visual-design-system.md               |
| Anything not listed           | brand-guideline.md + brand/foundations.md +   |
|                               | brand/voice.md                                |

**Mode 2 — Human copy-pasting into chat AI.** Attach the same files, then prompt.
Example: "Using the attached brand guidelines, draft an enquiry response for a
prospect asking about our customer-experience services. Keep it under 200 words.
Match the voice exactly."
```

## 5. Foundations doc anatomy — `docs/brand/foundations.md`

The deep visual reference. Every colour, font, logo rule, spacing token, motion curve, and imagery rule lives here once. Channel docs cite it; `02_visual-design-system.md` cites it.

Reconciled to shipping code. Every spec includes a **source-of-truth pointer** (e.g., "from `tailwind.config.js` → `colors.primary`") so future drift is detectable.

**Sections, in order:**

1. **Brand essence** — one-paragraph design philosophy ("clean, professional, trustworthy, AI-confident").
2. **Color** — primary (`#D41F21` + hover `#BC1B1D` + active `#A41719`); neutral (charcoal `#333`, white, greys); extended palette (the 11 `*-sharp` hues with use-case hints); semantic (success/warning/error/info); WCAG contrast pairings; do/don't combinations; AI-prompt-ready JSON block.
3. **Typography** — Manrope (headings) + Inter (body) via Google Fonts (`next/font`). Type scale documented from current Tailwind values (`text-xl`, `text-4xl`, `text-5xl`). Weights in actual use (200 / 300 / 410 from config). Letter-spacing (-0.02em on body). Line heights. Pairing rules. Web-fallback chain. Print/PDF substitution policy.
4. **Logo** — asset inventory of `img/sharp_logo*`. Clear-space rule, minimum sizes (web / print), color variants. Do/don't (no recoloring outside brand, no rotation, no effects). **Identified gaps** flagged as TODOs (favicon set, square avatar for social, horizontal lockup) — to address in a follow-up issue.
5. **Iconography** — style notes from existing custom icons (`TeamIcon`, `TrackIcon`, `FlaskIcon`): line weight, corner style, fill vs stroke, sizing. Rule: hand-crafted SVG, no third-party icon libraries.
6. **Spacing & rhythm** — spacing scale (the custom `.py-19`, `.py-20`, `.py-24` from `globals.css` reflect a generous-rhythm philosophy). Container max-width (`66em` from `maxWidth.7xl`). Section padding rules. Breakpoints (767px mobile, 1400px 2xl).
7. **Shape & elevation** — distinctive asymmetric soft drop-shadows (`-20px 24px 70px -6px rgba(0,0,0,.12)`) as a brand signature, not generic Material elevation. Border radius conventions. Card / surface treatments.
8. **Motion** — the site's specific bezier curves (`cubic-bezier(0.5, 0.09, 0.7, 1)` for hover, `cubic-bezier(0.08, 0, 0.83, 1)` for slow zoom). Standard durations. Where motion is appropriate vs not.
9. **Imagery & photography** — candid-professional team portraits (not stock-corporate), warm lighting, muted-but-present color. Composition guidance. Color overlay treatments (the dark-mode zoom backgrounds with 0.16 opacity from `globals.css`). Aspect ratios in active use (1920×1080 landscape, square avatars).
10. **Composition & hierarchy** — high-level rules: hero headlines at `text-5xl` weight 200 with line-height 1.32 (confident but airy). Where the primary red accent goes (CTAs, key spans inside headings — see `.content-title > span`). Asymmetric layouts (the `.intro-container` 0.444fr/1fr split is a brand pattern).
11. **Accessibility** — WCAG 2.1 AA contrast tables (carried over from existing doc, fixed against `#D41F21` not `#ED2224`). Minimum text sizes per medium. Focus-state requirements.
12. **Token reference (machine-readable)** — fenced JSON block listing every named token: colors, font sizes, spacing, radii, shadows. AI-consumable; copyable into Figma/Slides/etc.

**Two principles for this doc:**

- **Every spec cites its source.** "From `tailwind.config.js` line 11" — drift is detectable.
- **Rules describe what's distinctive, not what's universal.** "Hero headlines are 5rem at weight 200 with 1.32 line-height — airy, not heavy" beats "use white space generously".

## 6. Voice doc anatomy — `docs/brand/voice.md`

The verbal counterpart to `foundations.md`. Source material: voice content extracted out of `04_content-framework.md`. The original keeps only web-page-specific copy (page H1/H2s, on-page CTAs, SEO copy).

**Sections, in order:**

1. **Brand voice in one breath** — single sentence: "#sharp sounds authoritative, trustworthy, innovative, and results-focused — clear and confident without aggressive sales language."
2. **Voice attributes** — four pillars (authoritative / trustworthy / innovative / results-focused), each with a definition, what it sounds like, and what it deliberately is _not_.
3. **Tone spectrum** — voice constant; tone modulates by context. Matrix: _formal-corporate_ (proposals, invoices) → _professional-warm_ (web, presentations) → _conversational-confident_ (LinkedIn, video). Each row gives 2-3 example phrasings.
4. **Writing principles** — operational rules: active voice; present tense; jargon-allowed-when-precise; UK English (`en_GB`); Oxford comma policy; how the brand name "#sharp" is written (lowercase, hash prefix).
5. **Vocabulary** — three lists: signature phrases ("digital transformation", "AI-first approach", "measurable impact"); preferred-over alternatives ("partner" over "vendor", "transformation" over "disruption"); avoid ("synergy", "leverage" as verb, "best-in-class", "world-class", any superlative without proof).
6. **Audience-aware messaging** — three personas (C-suite / ops & tech managers / biz dev) with focus, tone shift, and 1-2 sample sentences each.
7. **Value proposition library** — core brand promise + three service-level value props (customer experience / operational efficiency / data & analytics), each with primary / secondary / tertiary phrasings — pre-approved language AI can pull verbatim or remix.
8. **Common formats** — concrete templates with do/don't pairs: tagline, section heading, one-paragraph elevator pitch, CTA verb phrase, sign-off line, company boilerplate.
9. **Do / Don't sample copy** — side-by-side pairs at three lengths (1-line, paragraph, full email). Generic-AI-slop on the left, on-brand on the right.
10. **Out of scope (verbal)** — what the doc deliberately doesn't cover: legal/contract language, technical documentation tone, internal Slack tone, individual team members' personal LinkedIn voices.

**Two principles for this doc:**

- **Show, don't just describe.** Every voice attribute has a worked example.
- **Be ruthless about anti-patterns.** The "avoid" list and do/don't pairs are the highest-leverage content for AI consumers — most AI defaults to corporate slop unless told what slop looks like.

## 7. Channel doc template — universal 12-section shape

Every `brand/<channel>.md` follows the same skeleton. Predictability matters for AI (constraints always in the same place) and for humans (knows where new content goes).

| #   | Section                           | Purpose                                                                                             |
| --- | --------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1   | **Purpose & context**             | 2-3 sentences: what this channel is, who consumes the artifact, when #sharp uses it. Sets the lens. |
| 2   | **Visual specs (inlined subset)** | Only the foundations content this channel uses. With a one-line link to `foundations.md` for depth. |
| 3   | **Verbal specs (inlined subset)** | Voice attributes engaged + tone modulation for this channel. Link to `voice.md` for depth.          |
| 4   | **Format & dimensions**           | Hard technical specs: aspect ratios, file formats, safe zones, character limits. The "geometry".    |
| 5   | **Layout & composition**          | Channel-specific patterns. Reusable layout rules.                                                   |
| 6   | **Component / element library**   | Recurring building blocks for this channel as named primitives AI can invoke.                       |
| 7   | **Templates / starters**          | Concrete artifacts AI can produce or adapt. Each named, each complete.                              |
| 8   | **Worked examples**               | 2-3 fully-realised samples (not skeletons). Pattern-matchable.                                      |
| 9   | **Do / Don't**                    | Channel-specific antipatterns paired with correct counterparts.                                     |
| 10  | **Hard constraints**              | Non-negotiable rules in a bulleted block. The ones AI cannot soften.                                |
| 11  | **Asset references**              | Where source files live, where generated artifacts go.                                              |
| 12  | **Related docs**                  | Pointers to `foundations.md`, `voice.md`, sibling channels.                                         |

## 8. Per-channel scope

What each of the 7 channel docs uniquely owns, beyond the shared template.

### 8.1 `brand/presentation.md` — Google Slides / pitch decks

- **Format:** 16:9 primary, 4:3 fallback. Google Slides constraints — Manrope and Inter are both Google-hosted, so available in Slides directly.
- **Named slide types:** cover, agenda, section divider, content (text-heavy), content (visual-heavy), stat highlight, quote, team intro, comparison, table, chart, CTA, contact / next-steps.
- **Layout rules:** red accent as the only color outside neutrals; left-aligned text, generous margin (the airy hero pattern from foundations); slide titles in Manrope weight 200-300; body in Inter; logo bottom-right or watermark.
- **Templates:** "default 8-slide pitch deck", "case-study micro-deck (3 slides)", "discovery-call leave-behind (5 slides)".
- **Drives the next task** — Google Slides template generation.

### 8.2 `brand/proposal.md` — Client proposals

- **Format:** PDF (primary), Google Docs (working). A4 (UK), portrait. Page numbering, header/footer with logo + project ref + confidentiality marking.
- **Document structure:** cover → executive summary → understanding-of-need → proposed approach → scope → methodology → team → timeline → commercials → terms → appendix.
- **Tone:** formal-corporate end of the spectrum. Longer paragraphs OK. UK English; legal-adjacent precision in scope/T&Cs sections.
- **Templates:** "discovery-phase proposal", "full-engagement proposal", "follow-on / extension proposal".

### 8.3 `brand/invoice.md` — Invoices

- **Format:** PDF. Highly structured — minimal voice content, mostly visual + data layout.
- **Required fields:** registered company name + number, VAT number, registered address, invoice number (format `YYYY-NNNN`), issue date, due date, client billing address, line items, subtotal, VAT, total, payment terms, bank details / payment method.
- **Layout grid:** logo top-right, "INVOICE" wordmark top-left, two-column billing block (from / to), table for line items, totals right-aligned, footer with payment terms + bank details.
- **Color:** red accent reserved for total + due date; everything else charcoal-on-white.
- **Note:** the doc describes _format_; actual values (VAT number, bank details) come from a separate non-versioned config. The doc must say so explicitly.

### 8.4 `brand/enquiry.md` — First-contact / enquiry replies

- **Format:** Email (HTML + plain-text). Subject line conventions. Length guidance (≤200 words for first reply).
- **Tone:** professional-warm. Confident, not eager. Personalised opener (acknowledge what they asked); concrete substance; single clear CTA (book a 30-min call).
- **Templates:** "general info request", "pricing question (deflect to discovery call)", "scope question (light substance + invite)", "out-of-scope referral", "follow-up after silence".
- **Sign-off pattern:** consistent across team — name, role, "#sharp", optional calendar link.

### 8.5 `brand/email-signature.md` — Email signatures

- **Format:** HTML (with email-client-safe inline CSS) + plain-text fallback.
- **Content:** name | role | "#sharp · Digital Transformation Consultancy" | small logo | phone (optional) | email | website | LinkedIn. No quotes, no banners, no "Sent from my iPhone" energy.
- **Visual rules:** single-line or two-line layouts (no large blocks). Logo at 24-32px height. Red accent on the company name only. Inter at 13-14px. Light-mode safe.
- **Templates:** "standard signature", "client-facing signature (with calendar link)", "internal signature (minimal)".

### 8.6 `brand/social.md` — Social media

- **Platforms in scope:** LinkedIn (primary), X / Bluesky (secondary). Out of scope: Instagram, TikTok unless promoted by future spec.
- **Per-platform specs:** LinkedIn — feed image 1200×627, square 1200×1200, profile banner 1584×396, post text limits, hashtag policy (3-5, lowercase, no emoji-hashtags). X — image 1600×900, char limits, thread structure.
- **Tone:** conversational-confident end. First-person plural OK ("We've been seeing…"). No emoji except in specific listed cases. Hot takes OK if backed by reasoning; never just "thoughts?".
- **Visual templates:** "quote card", "stat card", "thread cover", "carousel slide", "team announcement". All use brand red as a single accent, never as background fill.
- **Profile elements:** bio copy, banner image spec, pinned-post pattern.

### 8.7 `brand/video.md` — Video content

- **Formats in scope:** talking-head explainer, screen-recording walkthrough, podcast cover/episode card, social cut-down (vertical 9:16). Out of scope: long-form documentary, paid TV ads.
- **Aspect ratios:** 16:9 primary, 9:16 vertical for social, 1:1 for some social platforms.
- **Brand elements on screen:** intro card (2-3s, logo + episode title), outro card (CTA + URL + signature line), lower thirds (name + role + #sharp), end-screen template.
- **Motion:** uses the brand bezier curves from foundations. Transitions: cut or simple cross-fade only — no flashy wipes. Red accent enters as a motion line, not a fill flash.
- **On-screen text:** Manrope at 5-8% of frame height. Caption/subtitle style: Inter, white with subtle shadow. UK English captions.
- **Music & SFX:** minimal. Restrained. No stock-corporate uplifting acoustic guitar.

**Cross-channel pattern:** red is always an accent, never a fill or background. Logo never decorated. Manrope for emphasis, Inter for substance. Voice modulates per channel; the four attributes stay constant.

## 9. Migration & reconciliation plan

### 9.1 Changes to `docs/02_visual-design-system.md`

| Change             | Detail                                                                                                                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reconcile to code  | Primary red `#ED2224` → `#D41F21` everywhere. Add hover/active variants. Fix WCAG ratios against the corrected red. Remove Frutiger references. Document the actual font pair (Manrope + Inter via Google Fonts). |
| Narrow scope       | This file becomes the _web-engineering reference_ only: Tailwind class mappings, component CSS, web-specific WCAG tables. Anything about brand identity in the abstract moves to `brand/foundations.md`.          |
| Add upward pointer | Top of file: "For brand-level visual rules, see `brand/foundations.md`. This document is the web implementation reference."                                                                                       |
| Filename           | Keep `02_` prefix to avoid breaking cross-references.                                                                                                                                                             |

### 9.2 Changes to `docs/04_content-framework.md`

| Change                      | Detail                                                                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Extract to `brand/voice.md` | Brand voice attributes, writing guidelines, tone of voice, target audience messaging, value propositions, content quality standards.         |
| Retain on this file         | Page-by-page H1/H2/H3 copy, web CTA copy, SEO keyword strategy, content calendar, content publication schedule, on-site performance metrics. |
| Add upward pointer          | Top of file: "For brand-level verbal rules (voice, tone, vocabulary), see `brand/voice.md`. This document is the web copy reference."        |
| Filename                    | Keep `04_` prefix.                                                                                                                           |

### 9.3 Untouched existing docs

`00_specifications.md`, `01_web-design-strategy.md`, `03_wireframes.md`, `06_migration-plan.md`, `contentful-to-supabase-migration.md`, `supabase-to-appwrite-migration.md`, `inspiration.md`, `prototype/`, `design_variations/`, `colors/`. Touched only if a referenced value drifted (none found in spot-checks).

### 9.4 Build order

1. Write `brand/foundations.md` first — every other doc cites it.
2. Write `brand/voice.md` next — channel docs cite both foundations and voice.
3. Reconcile `02_visual-design-system.md` against the new foundations (fixes drift; narrows the engineering reference).
4. Refactor `04_content-framework.md` — extract voice content out, leave web-specific copy.
5. Write `brand-guideline.md` entry doc — easier once canonical refs exist (the index can name actual section anchors).
6. Write the 7 channel docs. Order: `presentation.md` first (drives the immediate next task), then `proposal.md`, `email-signature.md`, `enquiry.md`, `social.md`, `invoice.md`, `video.md`. Each one validates the channel template and feeds back any structural improvements before the next.

## 10. Acceptance criteria

### 10.1 Structural

- All 10 files exist at the planned paths: `ls docs/brand-guideline.md docs/brand/{foundations,voice,presentation,proposal,invoice,enquiry,email-signature,social,video}.md` returns no errors.
- Each channel doc follows the 12-section template (verifiable by section-heading grep).
- Entry doc is ≤ 200 lines.
- Existing docs reconciled (02 + 04 updated, no broken cross-references).

### 10.2 Reconciliation

- Every visual token in `foundations.md` cites a source file/line (spot-check 5 random tokens).
- No drift between `foundations.md` and `tailwind.config.js` / `layout.tsx` / `globals.css`.
- No reference to dead artifacts: grep for `#ED2224`, "Frutiger", "Manrope-via-@font-face" returns zero hits across new + reconciled docs.

### 10.3 AI-readiness (the load-bearing test)

The point of all this is that an AI loading `brand-guideline.md` + a single channel doc can generate on-brand artifacts. We validate that _before_ calling the spec done.

- **Self-containedness probe:** for each channel doc, a fresh AI session given only that doc + the entry doc can produce a plausible artifact for that channel without asking for additional brand info.
- **Anchor test (`presentation.md`):** a fresh AI session generates a complete 8-slide pitch deck. The output uses the correct red, the right font pair, the named slide types, on-brand voice, and avoids the listed antipatterns. **This is the gating test — presentation drives the next task.**
- **Anti-slop probe:** a fresh AI session asked to write a LinkedIn post produces something the team would actually post — no "leverage", no "synergy", no superlatives, the right tone modulation.
- **Token-economy probe:** loading entry + a channel doc fits comfortably in a single prompt — confirming the progressive-disclosure split worked.

### 10.4 Process

- Spec doc is committed to `docs/superpowers/specs/`.
- Implementation plan is generated from this spec via the writing-plans skill.
- Follow-up GH issues are filed (see §11).

**Definition of done:** structural ✅, reconciliation ✅, all four AI-readiness probes pass on first try (especially the presentation anchor test). If a probe fails, the failing doc is revised before the spec closes.

## 11. Out of scope / follow-up issues

To be filed as separate GH issues after this spec is approved:

1. **Delete dead Frutiger font assets.** Remove `font/frutiger-light.{eot,svg,ttf,woff}` and any orphaned references. The `@font-face` declaration in `globals.css` is already commented out.
2. **Create missing logo variants.** `foundations.md` will identify gaps (favicon set, square avatar for social, horizontal lockup) but creating those assets is a separate design task.
3. **Implement non-versioned invoice configuration.** Actual VAT number, bank details, and company-registration values need a non-versioned config (e.g., `.env` or external secrets) loaded at template render time. Spec'd by `brand/invoice.md`; implementation is separate.
4. **Add drift-detection CI job.** A future job that grep-checks color hex consistency across docs and code, fails CI on drift. The source-of-truth pointers in `foundations.md` make this implementable.

These items are intentionally not part of the brand documentation work itself — they unblock or maintain it.
