# Brand: Social media

Social media posts are the most public, most frequent, and most conversational channel in the #sharp brand. This document is self-contained for AI consumption; it inlines the relevant visual and verbal subsets and cites canonical refs for depth. Do not alter values found here without first updating `docs/brand/foundations.md` and `docs/brand/voice.md`.

---

## 1. Purpose & context

Social media posts at #sharp span two primary platforms — LinkedIn as the main channel and X / Bluesky as secondary channels — with distinct audience expectations on each.

**Primary platform: LinkedIn**

LinkedIn is where the #sharp brand does the heaviest lifting in public. The audience is industry peers, decision-makers, and potential clients operating in the digital-transformation space: heads of operations, CTOs, digital directors, and the people who brief them. They are not passive consumers — they are professionals who will judge the quality of an insight before they engage with it. Posts that earn a "save" or a "share" are the benchmark; posts that earn only a "like" are noise.

**Secondary platforms: X / Bluesky**

X and Bluesky attract the more technically minded slice of the same audience, plus journalists, analysts, and sector commentators. Shorter form, faster cadence, and a higher tolerance for provocation — but the same standard of reasoning applies.

**Use cases by post type:**

- **Thought leadership** — the team's perspective on digital transformation, AI adoption, and the organisational patterns that make or break change programmes.
- **Company announcements** — new clients (with permission), team additions, services milestones, published case studies.
- **Recruitment** — open roles, the team culture, what working at #sharp is like in practice.
- **Link-sharing** — external articles, research, or tools the team has found genuinely useful, always with commentary rather than bare links.

What social media is not at #sharp: a sales broadcast, a vanity metrics channel, or a place for content that exists only to fill a posting schedule.

---

## 2. Visual specs (inlined subset)

### Colour

Visual posts (graphic cards, carousel slides, quote cards, stat cards) use the same colour constraints as all other #sharp touchpoints.

| Role                 | Hex       | Notes                                                                                    |
| -------------------- | --------- | ---------------------------------------------------------------------------------------- |
| Accent / primary     | `#D41F21` | Accent lines, large numbers, emphasis. Never used as a background fill on a visual card. |
| Body text / headings | `#333333` | All text on white-background cards. Titles, context lines, attribution.                  |
| Background           | `#FFFFFF` | Default card background.                                                                 |
| Background (alt)     | `#333333` | Charcoal background for high-contrast cards. Use inverted logo on dark cards.            |

**The brand red `#D41F21` is an accent, not a fill.** On visual cards it appears as a horizontal rule, a number, or a one-word emphasis — never as the background of a full card. See `docs/brand/foundations.md §2` for the complete colour system and deprecated values.

### Typography

| Role                        | Font    | Weight         | Notes                                          |
| --------------------------- | ------- | -------------- | ---------------------------------------------- |
| Graphic card titles         | Manrope | Weight 200–300 | Consistent with brand headline treatment.      |
| Quote / stat figures        | Manrope | Weight 200–300 | Airy; commands space without heaviness.        |
| Long captions / thread body | Inter   | Regular (400)  | Optimised for on-screen reading in text posts. |
| Attribution / source lines  | Inter   | Regular (400)  | Subordinate to primary text; smaller size.     |

### Logo on visual cards

The #sharp logo appears at the bottom-right of every graphic card. Use `img/sharp_logo.svg` on white or light backgrounds and `img/sharp_logo_invert.svg` on dark (charcoal) backgrounds. The logo must never be smaller than 12% of the card's shorter edge — see §10 Hard constraints.

→ For full visual rules, see [`brand/foundations.md`](foundations.md).

---

## 3. Verbal specs (inlined subset)

### Tone register

Social posts use the **conversational-confident** end of the tone spectrum — the most informal register in the #sharp system, and the furthest from the formal-corporate register of proposals and contracts. This does not mean casual or imprecise. It means direct, opinionated, and grounded in reasoning.

From `brand/voice.md` (Tone spectrum, conversational-confident examples):

> "Most digital transformation programmes stall not because of technology, but because the change wasn't designed with the people in mind. We fix that."
> "AI isn't magic. It's engineering. Here's what that actually looks like in practice."

That is the calibration point.

### First-person plural

"We've been seeing…", "We've been asked a lot about…", "We think…" — first-person plural is correct for LinkedIn and X/Bluesky posts. The #sharp voice is a team voice on social, not a solo founder voice.

### Hot takes

Reasoned opinion is encouraged. A post that says "The standard digital transformation playbook is broken — here's what we're doing instead" and then explains the reasoning is on-brand. A post that says "Interesting times in AI 👀" and posts a link is not.

**Never end with "thoughts?" alone.** It signals the author has nothing to add. Ask a specific question or make no ask.

### UK English

Standard throughout: organisation, recognise, programme, behaviour, colour, licence (noun) / license (verb).

### Emoji policy

- **Business posts (insight, opinion, link-sharing):** no emoji.
- **Celebratory / announcement posts:** one emoji maximum, at the end of a line, not mid-sentence.
- **AMAs and Q&A threads:** a single emoji in the prompt line is acceptable.

The prayer-hands emoji is never used. Avoid emoji that infantilise a professional message.

→ For the full verbal system, see [`brand/voice.md`](voice.md).

---

## 4. Format & dimensions

### LinkedIn

| Format              | Dimensions     | Notes                                                                          |
| ------------------- | -------------- | ------------------------------------------------------------------------------ |
| Feed image (link)   | 1200 × 627 px  | Landscape; displayed as the link-preview card.                                 |
| Square image post   | 1200 × 1200 px | Works well for standalone graphic cards and quote cards.                       |
| Carousel slide      | 1080 × 1080 px | Per slide; numbered (1/5, 2/5…); max 10 slides but 5–7 is the effective range. |
| Profile banner      | 1584 × 396 px  | Company page header — see §11 for status of this asset.                        |
| Company page avatar | 1024 × 1024 px | Square; see §11 for status.                                                    |

**Text post guidelines:**

- Maximum character count: 3,000 characters.
- Target for engagement: ≤ 1,300 characters (the point where LinkedIn stops truncating in most feed views).
- Only the first 3 lines are visible before the "see more" fold. The hook must appear in those 3 lines.
- Hashtag policy: 3–5 hashtags, lowercase, appended at the end of the post. No emoji-hashtags. Avoid proprietary or vanity tags that nobody searches.

**Example hashtag set:** `#digitaltransformation #aiintegration #operationalefficiency`

### X

| Format     | Dimensions     | Notes                                                          |
| ---------- | -------------- | -------------------------------------------------------------- |
| Image post | 1600 × 900 px  | Landscape; displayed inline.                                   |
| Post text  | 280 characters | Core limit. Each tweet in a thread must be a complete thought. |

**Thread conventions:** each tweet stands alone as a readable unit; the thread structure is additive, not required to parse individual tweets. Number threads (1/ 2/ 3/) only when the sequence matters for comprehension.

### Bluesky

| Format     | Dimensions     | Notes                                                              |
| ---------- | -------------- | ------------------------------------------------------------------ |
| Image post | 1000 × 500 px  | Default; landscape. Bluesky renders alt text prominently — use it. |
| Post text  | 300 characters | Slightly more generous than X; the same discipline applies.        |

---

## 5. Layout & composition

### Text posts (all platforms)

The structure of a text post mirrors the brand's rhetorical logic: lead with the point, then support it.

```
[Hook — 1 sentence. The entire argument in its sharpest form.]
[Single blank line — forces the "see more" fold on LinkedIn; creates breathing room on X/Bluesky]

[Context — 1–2 sentences. Why this matters now or where it comes from.]

[Insight — 2–3 sentences. The substantive content: the pattern, the finding, the argument.]

[Soft CTA or specific question — 1 sentence, optional. Not "thoughts?"]
```

Line breaks within LinkedIn posts are single blank lines between paragraphs; no markdown headers or bullet nesting — LinkedIn strips formatting.

### Visual cards

Layout logic for all graphic cards (quote, stat, carousel, announcement):

```
┌────────────────────────────────────────┐
│                                        │
│  TITLE / MAIN CONTENT                  │
│  (top 50–60% of the card)              │
│  Manrope weight 200–300                │
│                                        │
├────────────────────────────────────────┤
│  ─────  Red accent line (4–6 px)       │
├────────────────────────────────────────┤
│  Supporting text / attribution         │
│  (bottom 30–40% of the card)           │
│  Inter regular                         │
│                                  [logo]│
└────────────────────────────────────────┘
```

The red `#D41F21` accent appears as a horizontal rule dividing title from supporting content — not as a background fill, not as a coloured text block, not as a border around the card. It is a single horizontal line.

**Card margins:** maintain ≥ 8% of each edge as protected whitespace. For a 1200 × 1200 card: left/right ≥ 96 px; top/bottom ≥ 96 px.

**Text alignment:** left-aligned throughout. Centre-alignment is not used on #sharp social cards.

---

## 6. Component / element library

Named card types used on social. All share the layout logic in §5; the entries below describe what distinguishes each.

**Quote card**
A single attributed quotation — from a team member, a client (with permission), or an external source (clearly attributed). The quotation appears in Manrope weight 300 in the top section. A `#D41F21` horizontal rule separates it from the attribution line ("— Name, Role, Organisation") in Inter regular. Background: white or charcoal. No quotation marks — the typographic treatment carries the emphasis.

**Stat card**
A single large number or percentage in Manrope weight 200 — large enough to dominate the top half of the card. A one-line context sentence below explains what the number means. A smaller source line at the bottom-left cites the origin ("Source: [report/organisation], [year]"). The number may be set in `#D41F21` if it is the primary focus of the card; all surrounding text remains `#333333`.

**Thread cover**
Used as the first image in a LinkedIn carousel or as a standalone image linking to an X/Bluesky thread. Title in Manrope weight 300. A "Thread →" or "Read on →" indicator in Inter regular, smaller. Red accent line beneath the title. This card sets expectations for the content that follows.

**Carousel slide**
One point per slide. Numbered in the top-right corner (1/5, 2/5…) in Inter regular, small. The point occupies the top two-thirds; a brief supporting sentence or example fills the lower third. Maximum 6–8 lines of text per slide. Final slide uses a soft CTA or a reference to the full article/post.

**Team announcement**
Square format (1200 × 1200 or 1080 × 1080). Team photo at left or top (square-cropped). Name in Manrope weight 300. Role in Inter regular. A one-line context sentence — what this person does, or why this addition matters — in Inter regular. Red accent line. Logo bottom-right.

---

## 7. Templates / starters

Three named post structures with draft text at LinkedIn-suitable length. Adapt bracketed fields before posting; the structure and voice are calibrated.

---

### Insight post

**Structure:** hook → context → insight → soft question (optional).

**Draft:**

Most digital transformation programmes don't fail at the technology layer.

They fail because the operational model that was supposed to change… didn't. The new platform goes live. The old workarounds persist. And six months later, leadership is asking why the numbers haven't moved.

We've been working through this pattern with a client in financial services over the past quarter. The technology was sound. The integration was clean. What it took to move the needle was redesigning the decision logic that sat on top of the data — who owns which insight, what changes when they have it, and what it costs to be wrong.

The lesson: implementation is the easy part. The hard part is the accountability structure you build around it.

What's the point of failure you see most often in programmes you've worked on or observed?

`#digitaltransformation #operationalefficiency #aiintegration`

---

### Announcement

**Structure:** what → who → why → link (if applicable).

**Draft:**

We've published a case study on our AI integration work with [Client Name, sector] — covering how we moved from a proof-of-concept to full operational deployment in [timeframe], and what the team learned along the way about the gap between demo-ready and production-ready AI.

The write-up is honest about what didn't work as well as what did. We think that's more useful than the polished version.

Read it here: https://sharpdigital.co.uk/blog/[slug]

`#casestudy #aiintegration #digitaltransformation`

---

### Long-form / thread starter

**Structure:** controversial-but-reasoned opening → "Here's what we're seeing… [thread]" → 5–8 follow-on tweets each carrying a single complete point.

**Starter post (LinkedIn or X/Bluesky thread cover):**

The AI transformation market has a honesty problem. Most of what's being sold as "AI strategy" is slide-deck repositioning of work that was already on the roadmap.

Here's what we're actually seeing in client engagements — and what separates the programmes that move the needle from the ones that produce a glossy report and stall. [Thread]

**Follow-on tweets (X / Bluesky):**

1/ The first sign a programme is in trouble: the AI "strategy" was written before anyone talked to the operations team. Strategy built without operational context produces a document, not a change.

2/ The second sign: the success metric is adoption rate, not outcome change. Getting people to log into a new tool is not transformation. What changes in the decision they make when they do?

3/ The pattern that works: start with one decision that matters — a specific operational choice someone makes repeatedly — and build the data and tooling around that decision first.

4/ The mistake we see most often at implementation: treating AI integration as a technical handoff rather than a change-management programme. The model can be excellent. If the people around it don't change how they work, the value stays theoretical.

5/ What "production-ready" actually means: the system performs reliably on the edge cases your team generates, not just the test cases the vendor used. That gap is where most post-launch surprises live.

6/ The programmes that succeed share one thing: a named person on the client side who owns the outcome, not the project. Ownership of the outcome changes every conversation.

7/ The uncomfortable implication: most organisations don't need a more sophisticated AI model. They need a clearer decision about what problem the AI is solving and for whom. Start there.

`#aiintegration #digitaltransformation #operationalefficiency`

---

## 8. Worked examples

Two complete posts — one standalone insight post and one 4-tweet thread — written to posting standard. These are calibration references for generating or reviewing social content.

---

### Example A: Insight post (LinkedIn, standalone)

There is a version of "data-driven" that is worse than instinct.

It's the version where you have a dashboard, the dashboard is always slightly wrong, and everyone has quietly stopped trusting it — but nobody has said so out loud. Decisions still get made. They just get made using the dashboard as cover rather than as input.

We've encountered this in almost every sector we work in. The dashboard exists because someone, at some point, genuinely wanted the data to inform the decision. What changed was the accumulation of small data-quality compromises — a field mapped incorrectly, a source that stopped updating, a definition that drifted — until the number on screen no longer matched the reality in the room.

The fix is never "better dashboards". It's auditing the decision the dashboard was meant to serve, tracing the data back to its source, and deciding whether you're maintaining an accurate instrument or an expensive fiction.

If you're in an organisation where people use phrases like "according to the dashboard, but in practice…" — that's the signal.

`#dataanalytics #digitaltransformation #operationalefficiency`

---

### Example B: 4-tweet thread (X / Bluesky)

**Tweet 1 (thread opener):**
Organisations keep asking us why their AI pilots don't scale. After running a lot of these, we think the answer is almost always the same — and it has nothing to do with the model. [thread]

**Tweet 2:**
1/ Pilots are designed to succeed. They use the cleanest data, the most motivated users, and the most accommodating edge cases. Production is everything the pilot wasn't. The gap between pilot performance and production performance is a design decision, not a surprise.

**Tweet 3:**
2/ The teams that close that gap do one thing differently: they test on failure modes, not success modes. Before you expand, run the system through the worst-case inputs your team actually generates. The failure surface tells you everything the pilot didn't.

**Tweet 4:**
3/ The question worth asking before you scale any AI pilot: "What would have to be true for this to fail at 10× the usage?" If you can't answer it, you're not ready to scale. If you can answer it, you know your next sprint.

---

## 9. Do / Don't

**Don't** open a post with "I'm thrilled to announce" or "Excited to share".
**Do** open with the specific news or observation itself — "We've published a case study on [topic]" or "A pattern we keep encountering in AI integration work:" — and let the content carry the weight.

---

**Don't** use the prayer-hands emoji, or any emoji that performs gratitude or excitement in a business context.
**Do** skip emoji entirely in insight and opinion posts. Reserve a single emoji, used once, for genuinely celebratory announcements (a hire, a milestone, a launch).

---

**Don't** post a listicle ("5 ways to…", "7 things every leader should know about…").
**Do** post one strong take with the reasoning that supports it. A single well-argued point lands harder than a list of assertions.

---

**Don't** end a post with "thoughts?" as the only question.
**Do** end with a specific, answerable question ("What's the decision point where you've seen this stall?") or no question at all — a strong statement needs no invitation to respond.

---

**Don't** use AI-generated images of suited professionals pointing at laptops, shaking hands in glass buildings, or gathered around glowing screens.
**Do** use real photography of the team and real client environments (with permission), or use geometric brand-graphic cards produced within the visual system described in §5 and §6.

---

## 10. Hard constraints

Non-negotiable rules. A post or card that violates any item here must be corrected before publishing.

- **Brand red `#D41F21` as accent only.** Never use it as the background fill of a card, a banner, or a full-bleed image. It is a horizontal line, a large number, or a one-word emphasis — nothing more.
- **Logo on visual cards never rendered below 12% of the card's shorter edge.** On a 1200 × 1200 card: logo minimum width 144 px. On a 1080 × 1080 carousel slide: minimum 130 px.
- **All external links use `https://`.** No plain HTTP links in post body, captions, or comments.
- **Hashtag count: 3–5 maximum.** Fewer is better when the post is strong. Never exceed 5 — hashtag-dense posts read as spam and suppressed by LinkedIn's algorithm.
- **No engagement-bait formats.** This includes giveaways, "comment X to enter" mechanics, "like if you agree" prompts, tagging chains, and any format designed to inflate engagement metrics rather than deliver value. These are inconsistent with the #sharp brand and inconsistent with the audience's professional context.

---

## 11. Asset references

All paths are relative to the repository root.

| Asset                   | Path                         | Use on social                                                      |
| ----------------------- | ---------------------------- | ------------------------------------------------------------------ |
| Primary logo (light bg) | `img/sharp_logo.svg`         | Bottom-right of white and light-background visual cards.           |
| Inverted logo (dark bg) | `img/sharp_logo_invert.svg`  | Bottom-right of charcoal-background visual cards.                  |
| Team photo — Janos      | `public/img/team_janos.jpg`  | Team announcement cards (square-cropped); LinkedIn author context. |
| Team photo — Loreen     | `public/img/team_loreen.jpg` | Team announcement cards (square-cropped); LinkedIn author context. |

**Missing assets (tracked as follow-up):**

The following assets are required for platform profile completeness but do not yet exist in the repository. These are flagged for creation and tracked under the issue for missing logo variants:

- LinkedIn company page banner: 1584 × 396 px
- LinkedIn company page avatar / square logo: 1024 × 1024 px
- X / Bluesky profile header: 1500 × 500 px

Until these assets exist, do not update the platform profiles with interim or placeholder images — a missing banner is preferable to an off-brand one.

---

## 12. Related docs

- [`brand/foundations.md`](foundations.md) — full visual reference: colours, typography, logo rules, spacing, shape, imagery, composition, accessibility, token reference. The colour and typography values in §2 of this document are derived from foundations.md and must remain consistent with it.
- [`brand/voice.md`](voice.md) — full verbal reference: voice attributes, tone spectrum (social sits at the conversational-confident end), writing principles, vocabulary, audience messaging, value propositions. The verbal spec in §3 is derived from voice.md.
- [`brand/video.md`](video.md) — social cut-down video specs (short-form video for LinkedIn and X/Bluesky) share platform dimension specs with this document. When video.md is published (planned Task 13), the per-platform format table in §4 above should be cross-referenced with that file for video-specific constraints.
