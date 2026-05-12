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

The #sharp proposal deck specified in [`docs/brand/proposal.md`](../brand/proposal.md). Five slides, 16:9, in **V1 (Forwarded context)** order. Each slide carries the website's page chrome (white header strip with logo · page-specific hero band with the slide title in white · white content area below):

| # | Slide                  | Hero image                                                 |
| - | ---------------------- | ---------------------------------------------------------- |
| 1 | Cover                  | `public/img/services_bg.jpg` (full-bleed below the header) |
| 2 | About us / Why us      | `public/img/about_bg.jpg`                                  |
| 3 | Your brief             | `public/img/analyse.jpg`                                   |
| 4 | Proposed solutions     | `public/img/automation.jpg`                                |
| 5 | Next steps             | `public/img/contact_bg.jpg`                                |

Use this template whenever you need to issue a client proposal — a deck that proposes solutions and pricing. For a post-discovery recap (no pricing, no sign-off ask), use the leave-behind structure documented in [`docs/brand/presentation.md`](../brand/presentation.md) §7 instead.

### Fonts

Manrope (titles) and Inter (body) are Google Fonts. Google Slides loads them automatically on import. PowerPoint and Keynote may prompt to install the fonts if they are not on the local machine — install both before editing offline.

### Binary determinism

`pptxgenjs` embeds a build timestamp into the `.pptx`, so every run of `npm run generate:proposal-template` produces a binary with a different `dcterms:created` / `dcterms:modified`. Treat the committed `.pptx` as authored output; do not commit drive-by regenerations alongside unrelated changes.

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
- The website's hero photography is replaced (any of `services_bg.jpg`, `about_bg.jpg`, `analyse.jpg`, `automation.jpg`, `contact_bg.jpg` — see the table at the top of this file). The deck's heroes track the website's heroes; refresh together.

To refresh:

1. Read the current `/about` page (`https://sharpdigital.co.uk/about` or `src/app/about/page.tsx` `contentSetup` block).
2. Edit `scripts/generate-proposal-template.mjs` — update the About us / Why us text in the slide-2 block. Preserve the constraints: 2–3 About us bullets ≤ 15 words; 3–4 Why us bullets ≤ 12 words. If a hero asset has been replaced, update the corresponding entry in the `HEROES` map at the top of the script.
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
