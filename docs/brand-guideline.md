# Brand guideline

Entry point for the #sharp brand system. Start here; follow links to the relevant channel or canonical doc.

---

## What #sharp is

\#sharp is a digital transformation consultancy. We help businesses use AI to make customer experience, operations, and data work measurably better. We serve UK and international clients from C-suite to operational teams.

---

## Brand at a glance

Quick-reference card — detail lives in `brand/foundations.md` and `brand/voice.md`.

- **Primary color:** `#D41F21` (red), with hover `#BC1B1D` and active `#A41719`
- **Headings:** Manrope (loaded via Google Fonts)
- **Body:** Inter (loaded via Google Fonts)
- **Logo:** `img/sharp_logo.svg` (red on light), `img/sharp_logo_invert.svg` (white on dark)
- **Voice:** authoritative · trustworthy · innovative · results-focused — clear and confident without aggressive sales language
- **The brand name:** always lowercase with hash prefix (`#sharp`); never `Sharp` or `SHARP`

---

## Document index

All paths are relative to `docs/`.

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

---

## Using these docs with AI

Two modes of use:

**Mode 1 — Agent loads docs as context.** The agent attaches only the files relevant to the task. Keeping the context small improves output quality.

**Mode 2 — Human copy-pastes into a chat AI.** Attach the same files listed below, then add your prompt.

### Files to attach per task

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

### Example prompt

```text
Using the attached brand guidelines, draft an enquiry response for a prospect
asking about our customer-experience services. Keep it under 200 words. Match
the voice exactly.
```

---

## Source of truth & maintenance

Three rules:

1. `brand/foundations.md` is canonical for all visual tokens; `brand/voice.md` is canonical for all verbal rules. Do not define values in channel docs — cite this file instead.
2. Channel docs inline only the subset they need, and must re-sync when the canonical ref changes.
3. The website code itself (`tailwind.config.js`, `src/app/layout.tsx`, `src/app/globals.css`) is the ultimate truth — docs are reconciled to code, never the reverse.

---

## Out of scope

The brand system does not govern:

- Legal copy and contract templates
- Internal team communications
- Individual team members' personal social voices
- Product-specific UX copy not on the marketing site
