# Brand: Video

Video content is the most dynamic and time-intensive channel in the #sharp brand. This document is self-contained for AI consumption; it inlines the relevant visual and verbal subsets and cites canonical refs for depth. Do not alter values found here without first updating `docs/brand/foundations.md` and `docs/brand/voice.md`.

---

## 1. Purpose & context

Video content at #sharp spans four primary formats, each serving a distinct purpose in the content marketing and thought leadership programme.

**Talking-head explainers**

Direct-to-camera commentary from a team member on a subject they know well — digital transformation patterns, AI integration approaches, operational failure modes. Audience: potential clients, sector peers, and journalists who follow the #sharp perspective. Duration: 3–5 minutes. Distribution: LinkedIn video, YouTube, embedded in blog posts.

**Screen-recording walkthroughs**

Step-by-step demonstrations of a tool, framework, or process. The presenter's voice leads; the screen provides the evidence. Audience: practitioners who want to see how something works, not just what it does. Duration: 5–10 minutes. Distribution: YouTube, blog embeds, client-facing resource pages.

**Podcast covers and episode cards**

Static or animated cards promoting a podcast episode or guest appearance. These are short-form social assets rather than full video content — they use the same visual system but are produced more quickly. See `brand/social.md` for social platform dimension specs that apply to these cards.

**Social cut-downs**

Vertical (9:16) short-form clips — typically ≤ 60 seconds — extracted or produced for LinkedIn and other platforms. These share visual rules with this document and platform specs with `brand/social.md`. Captions are always burned in on social cut-downs.

**What video is not at #sharp:** a corporate broadcast channel, a showreel of logos and taglines, or a place for content that exists to fill a publishing schedule. Every piece of video earns its production cost by delivering a specific argument, demonstration, or insight that the audience cannot get more efficiently from a text post.

---

## 2. Visual specs (inlined subset)

### Colour

On-screen colour follows the same palette as all other #sharp touchpoints.

| Role                     | Hex       | Notes                                                                      |
| ------------------------ | --------- | -------------------------------------------------------------------------- |
| Accent / primary         | `#D41F21` | Motion accent lines, highlight elements. Never a full-frame fill or flash. |
| On-screen text (dark bg) | `#FFFFFF` | White text on charcoal or dark-overlaid backgrounds.                       |
| On-screen text (light)   | `#333333` | Charcoal text on white or light backgrounds.                               |
| Card background (dark)   | `#333333` | Intro/outro cards, section transition cards.                               |
| Card background (light)  | `#FFFFFF` | Alternative intro/outro treatment on light backgrounds.                    |

**The brand red `#D41F21` is an accent, not a fill.** In motion, it enters as a line drawing across the frame — use the foundations §8 ease-underline curve (`cubic-bezier(0.21, 0.01, 0.47, 0.99)`, 0.28 s) for the draw-on animation of the red accent line. It is never used as a background for a full card, a flash effect, or a colour-burn transition. See `docs/brand/foundations.md §2` for the complete colour system and deprecated values.

### Typography

| Role                     | Font    | Weight         | Notes                                                         |
| ------------------------ | ------- | -------------- | ------------------------------------------------------------- |
| Intro/outro card titles  | Manrope | Weight 200–300 | Consistent with the brand headline treatment across channels. |
| Lower third — name       | Manrope | Weight 400     | Slightly heavier than card titles; readable at speed.         |
| Lower third — role       | Inter   | Regular (400)  | Secondary line under the name.                                |
| Caption text (burned-in) | Inter   | Regular (400)  | Captions burned into social cut-downs; SRT/WebVTT elsewhere.  |
| Section transition cards | Manrope | Weight 300     | Single line; large enough to dominate the frame.              |

### Logo in video

The #sharp logo appears at the bottom-right of intro and outro cards. On dark backgrounds use `img/sharp_logo_invert.svg`; on light backgrounds use `img/sharp_logo.svg`. The logo must never be rendered below 5% of the frame width (54 px at 1080 px wide). On long-form content a small logo watermark in the bottom-right corner is permitted for the duration; it should be rendered at no less than 5% of frame width and at reduced opacity (≈ 60%) to remain unobtrusive.

→ For full visual rules, see [`brand/foundations.md`](foundations.md).

---

## 3. Verbal specs (inlined subset)

### Tone register

Tone varies by format, but always stays within the #sharp voice system.

- **Talking-head explainers:** conversational-confident. The presenter speaks as a practitioner sharing hard-won knowledge, not as a lecturer or a sales representative. Contractions are natural; jargon is explained when it first appears; opinions are stated plainly.
- **Screen-recording walkthroughs:** professional-warm. More structured than a talking head — the narration follows the screen logic — but the voice remains human. Never robotic or procedural.
- **Podcast covers and episode cards:** the verbal treatment follows the platform (see `brand/voice.md` tone spectrum).

### UK English

All spoken and written content uses UK English: organisation, recognise, programme, behaviour, colour, licence (noun) / license (verb). Captions must be proofed against this standard — auto-generated captions are never published verbatim.

### Brand name in spoken content

"We are the team at #sharp" is correct. In voiceover and spoken introductions, say "sharp digital" — do not say "hash sharp" or "number sharp". In on-screen text and captions, write `#sharp` (lowercase, hash prefix). `#sharp` never starts a sentence.

→ For the full verbal system, see [`brand/voice.md`](voice.md).

---

## 4. Format & dimensions

### Aspect ratios and dimensions

| Format         | Dimensions     | Frame rate | Primary use                                              |
| -------------- | -------------- | ---------- | -------------------------------------------------------- |
| 16:9 landscape | 1920 × 1080 px | 25 fps     | Primary format. YouTube, LinkedIn, embedded blog video.  |
| 9:16 vertical  | 1080 × 1920 px | 25 fps     | Social cut-downs. LinkedIn mobile, short-form platforms. |
| 1:1 square     | 1080 × 1080 px | 25 fps     | Selected social posts; podcast episode cards as video.   |

25 fps is the UK / PAL convention and the default for all #sharp video production. Do not use 30 fps as the primary — it introduces a slight "US broadcast" aesthetic that is inconsistent with the brand.

### Audio

| Loudness standard | Target   | Use case                                             |
| ----------------- | -------- | ---------------------------------------------------- |
| Online / web      | −16 LUFS | YouTube, LinkedIn, embedded web.                     |
| Broadcast         | −23 LUFS | Broadcast or podcast aggregators requiring EBU R128. |

Normalise audio to the appropriate target before export. Music and voiceover should be mixed so speech intelligibility is maintained at all listening levels.

### Captions

Captions are required on all published video (see §10 Hard constraints). Accepted formats:

- **SRT** — for YouTube upload and most video platforms.
- **WebVTT** — for HTML5 video embeds on the #sharp website.

Captions must be proofed for UK English spelling, `#sharp` brand terms, and correct speaker attribution in multi-person recordings. Auto-generated captions are a starting point only — they require human review before publishing.

---

## 5. Layout & composition

### Safe areas

| Zone        | Inset from edge | Purpose                                                         |
| ----------- | --------------- | --------------------------------------------------------------- |
| Title-safe  | 5%              | No text or critical graphics outside this boundary.             |
| Action-safe | 10%             | No primary content outside this boundary on broadcast delivery. |

At 1920 × 1080: title-safe = 96 px from each edge; action-safe = 192 px from each edge.

### On-screen text size

On-screen text must be no smaller than 5% and no larger than 8% of the frame height. At 1080 px height that is approximately 54–86 px. The hard minimum is 24 px equivalent at 1080p (≈ 2.2% frame height) — see §10. This ensures legibility on small screens and for captions.

### Lower thirds

Lower thirds occupy the bottom 20% of the frame. The name line (Manrope weight 400) sits above the role line (Inter regular). The red `#D41F21` accent line sits beneath the name, drawing on from left to right using the foundations §8 ease-underline curve. The "#sharp" identifier appears small and to the right or below the role line, at reduced opacity or in a lighter weight, to avoid competing with the name.

Lower thirds should not obscure speaker faces. If a talking-head composition places the speaker centrally, offset the lower third to the lower-left quadrant and ensure it does not cover the mouth region.

### Motion line composition

The red accent line that draws on during intro cards and lower thirds uses the foundations §8 ease-underline curve (`cubic-bezier(0.21, 0.01, 0.47, 0.99)`) for the draw-on, and the foundations §8 ease-hover curve (`cubic-bezier(0.1, 0.09, 0.11, 1)`) for any quick dismissal. These curves are the canonical #sharp motion language — do not substitute generic ease values.

---

## 6. Component / element library

Named video components used across all formats. All share the colour and typography rules in §2; the entries below describe each component's specific construction and behaviour.

**Intro card (2–3 s)**
Dark background (`#333333`). Logo centred or placed upper-left. Episode or video title in Manrope weight 300, large, white. The red `#D41F21` accent line draws on beneath the title using the ease-underline curve (see §5 and foundations §8). Cut to main content on the frame beat. The intro card establishes context, not atmosphere — it is brief and direct.

**Outro card (3–5 s)**
Dark or light background (matched to the overall video treatment). CTA text: "Subscribe" or "Visit sharpdigital.co.uk" — one primary action only, in Manrope weight 300. The full URL (`https://sharpdigital.co.uk`) appears below in Inter regular. A signature line ("The team at #sharp") at small size. Logo bottom-right. No animated overlays or motion backgrounds on the outro — it should hold still and be easy to read.

**Lower third (3–5 s on screen)**
Name in Manrope weight 400 (white on dark overlays; charcoal on light). Role in Inter regular, slightly smaller. Red accent line beneath the name, drawn on. "#sharp" identifier small, to the right or below the role. Fades in at the first mention of the person; dismissed cleanly when the speaker moves to a new point. Reintroduce for guests only — do not repeat for the host in a long-form video.

**Section transition card (1–2 s)**
Single line of section title text in Manrope weight 300. Dark background. No logo. The text appears with a fast hold — no complex animation. This component acts as a chapter marker, not a visual showcase.

**End-screen template (YouTube, 20 s)**
Two content card positions (linked videos) in the upper portion of the frame. Subscribe button overlay in the lower-left. The #sharp logo and site URL hold at the lower-right. This template follows YouTube's native end-screen element constraints — position within the bottom 60% of the frame to avoid clipping on most displays.

---

## 7. Templates / starters

Three named production structures. Adapt the duration and B-roll density to the specific content; preserve the narrative logic and component sequencing.

### Talking-head explainer (3–5 min)

**Structure:** intro card → talking head → optional B-roll cutaways → outro card.

1. **Intro card (2–3 s)** — title of the explainer; red accent line draws on.
2. **Talking head** — direct to camera. No script read-out; the presenter speaks from notes or to prompts. Cuts between takes at natural pause points — no jump cuts within a sentence.
3. **B-roll (optional)** — screen recordings, still graphics, or relevant imagery cut to the voiceover. Lower thirds reintroduce participants when returning from extended B-roll.
4. **Outro card (3–5 s)** — single CTA; URL; signature line.

Captions: SRT file delivered alongside the export. Proof before upload.

### Screen-recording walkthrough (5–10 min)

**Structure:** intro card → screen recording with voiceover and lower third → key moment cuts → outro card.

1. **Intro card (2–3 s)** — title of the walkthrough; name of the tool or process being demonstrated.
2. **Lower third (3–5 s)** — presenter name, role, "#sharp" on entry.
3. **Screen recording with voiceover** — cursor movement narrated in real time. Zoom in on key areas using a slow zoom (consistent with the foundations §8 slow zoom curve for context; keep zooms brief and purposeful). Call out UI elements by name.
4. **Key moment cuts** — a brief recap card (section transition card, 1–2 s) between major chapters of the walkthrough.
5. **Outro card (3–5 s)** — links to relevant blog post or documentation; CTA; URL.

Captions: WebVTT for embedded web use; SRT for YouTube.

### Social cut-down (≤ 60 s, 9:16)

**Structure:** quick hook → main point → CTA.

1. **Hook (0–5 s)** — the first visual frame must communicate the topic before the viewer has decided whether to keep watching. Use a strong opening statement in on-screen text or a direct spoken line from the presenter — not a title card or logo hold.
2. **Main point (5–50 s)** — one argument, one demonstration, one insight. Do not compress a 5-minute video into 60 seconds by increasing pace. Instead, extract the single most valuable moment and treat it as a complete thought.
3. **CTA (50–60 s)** — spoken or on-screen: "Full video at sharpdigital.co.uk" or "Follow for more." One CTA only.

Captions are burned into social cut-downs — not delivered as a sidecar file. UK English; #sharp brand terms correctly spelled; punctuation consistent with natural spoken rhythm.

---

## 8. Worked examples

Two complete examples — actual content descriptions, not placeholders. Use these as calibration references when building or reviewing video assets.

### Example A: Intro card

**Video context:** a talking-head explainer titled "Why AI transformation programmes stall — and what to do instead." Recorded by Janos Csikos.

**Intro card specification:**

```
Duration: 2.5 s
Background: #333333 (full frame)
Logo: img/sharp_logo_invert.svg, centred, 30% frame width
Title line 1 (Manrope weight 300, white, 6% frame height):
  "Why AI transformation programmes stall"
Title line 2 (Manrope weight 300, white, 6% frame height):
  "— and what to do instead"
Red accent: #D41F21 horizontal line, 2 px, full title width
  Draws on left-to-right using ease-underline curve (foundations §8)
  Draw-on begins at 0.4 s; completes at 0.68 s
  Line holds until cut
Cut: hard cut to talking head at 2.5 s
```

The intro card makes no attempt to be cinematic. It states the topic and steps aside.

### Example B: Lower-third element

**Context:** Janos Csikos is introduced at the opening of a client-facing walkthrough video. He is speaking directly to camera.

**Lower-third specification:**

```
Duration on screen: 4 s
Trigger: 1 s after first spoken word
Background: none (overlaid on talking head, dark studio background)

Line 1 — Name (Manrope weight 400, white, 5% frame height):
  Janos Csikos

Line 2 — Role (Inter regular, white at 80% opacity, 3.5% frame height):
  Co-Founder

Line 3 — Brand identifier (Inter regular, #D41F21, 2.5% frame height):
  #sharp

Red accent line: #D41F21, 1 px, full width of name line
  Draws on beneath Line 1 using ease-underline curve (foundations §8)
  Draw-on completes within 0.28 s of appearance
  Line holds for the duration on screen

Dismiss: fade out over 0.4 s using ease-hover curve (foundations §8)
```

The lower third is legible on both dark and light talking-head backgrounds because it relies on font weight and spacing rather than a background fill.

---

## 9. Do / Don't

**Don't** use flashy wipe transitions, swipe animations, or cinematic dissolves between clips.
**Do** use hard cuts or simple cross-fades (≤ 0.5 s). The edit serves the argument; it does not draw attention to itself.

---

**Don't** use stock-corporate uplifting acoustic guitar music — the ubiquitous "inspiring business" underscore heard in every agency showreel.
**Do** use minimal, restrained instrumental underscore at low volume, or no music at all. Silence is preferable to the wrong music. Any music used must be licensed (royalty-free with a valid licence, or original composition).

---

**Don't** use the brand red as a burst fill, a colour-flash effect, or a full-frame transition. Red used this way reads as aggressive and is inconsistent with the brand's restraint.
**Do** introduce red as a motion line drawing across the frame — the accent line on intro cards and lower thirds. It enters quietly and purposefully, using the ease-underline curve from foundations §8.

---

**Don't** publish auto-generated captions verbatim. Machine captions misread proper nouns, brand terms, and technical vocabulary, and they do not use UK English.
**Do** clean up captions against the script or a manual transcript. Correct spelling, punctuation, and capitalisation. Pay particular attention to "#sharp", "Appwrite", "Manrope", and any client names.

---

**Don't** put the #sharp logo in every frame of a video. Repeated logo placement reads as insecure branding and distracts from the content.
**Do** place the logo on the intro card, the outro card, and — for long-form content — as a small corner watermark (≥ 5% frame width, ≈ 60% opacity) that holds consistently rather than appearing and disappearing.

---

## 10. Hard constraints

Non-negotiable rules. A video that violates any item here must be corrected before publishing.

- **Captions are required on all published videos.** SRT for platform upload; WebVTT for web embeds; burned-in for social cut-downs. No exceptions.
- **Brand red `#D41F21` as accent only.** Never used as a full-frame fill, a colour-flash transition, or a background for any card. It is a motion line or a small identifier element — nothing more.
- **Logo never below 5% of frame width.** At 1080 px wide: logo minimum width 54 px. At 1920 px wide: minimum 96 px.
- **Music respects copyright.** Licensed royalty-free tracks with a valid production licence, or original composition only. No unlicensed music, regardless of intended use or clip duration.
- **On-screen text never below 24 px equivalent at 1080p** (approximately 2.2% of frame height). Text smaller than this fails legibility on mobile and accessibility standards.
- **No flashy wipe or burst-flash transitions.** Hard cuts and cross-fades only (see §9).
- **Captions proofed for UK English** before publishing. Auto-generated captions are a draft, not a deliverable.

---

## 11. Asset references

All paths are relative to the repository root.

| Asset                   | Path                        | Use in video                                                                          |
| ----------------------- | --------------------------- | ------------------------------------------------------------------------------------- |
| Primary logo (light bg) | `img/sharp_logo.svg`        | Intro/outro cards on light backgrounds; corner watermark on light-background content. |
| Inverted logo (dark bg) | `img/sharp_logo_invert.svg` | Intro/outro cards on dark (`#333333`) backgrounds; standard for most cards.           |

**Assets flagged as a separate production task (out of scope here):**

The following motion assets are required for consistent video production but do not yet exist as distributable files. They are flagged for creation as part of the broader brand asset build-out:

- Lower-third After Effects / DaVinci Resolve template (name, role, #sharp, red accent line animation).
- Intro card template (logo, title area, red accent line draw-on, 2–3 s).
- Outro card template (CTA, URL, signature line, logo, 3–5 s).
- Section transition card template (single title line, dark background, 1–2 s).
- YouTube end-screen template (two content cards, subscribe, logo, URL, 20 s hold).

Until these templates exist, produce intro/outro cards directly in the video editing application using the specifications in §6 and §8.

---

## 12. Related docs

- [`brand/foundations.md`](foundations.md) — full visual reference: colours, typography, logo rules, spacing, and motion curves. The motion curve names used in this document (ease-underline, ease-hover, ease-zoom, ease-shadow) refer to the named curves in foundations §8. Do not redefine motion values here — reference them by name.
- [`brand/voice.md`](voice.md) — full verbal reference: voice attributes, tone spectrum (talking-head sits at conversational-confident; explainers at professional-warm), writing principles, vocabulary, UK English standards.
- [`brand/social.md`](social.md) — social cut-down video specs and social platform dimension tables. The 9:16 vertical format and the per-platform dimension constraints in this document are cross-referenced with social.md §4. When social.md is updated with video-specific constraints, reconcile both files.
