# Brand: Enquiry replies

First-contact email replies are the opening move in every client relationship. They are short, specific, and earn the next conversation. This document is self-contained for AI consumption; it inlines the relevant visual and verbal subsets and cites canonical refs for depth. Do not alter values found here without first updating `docs/brand/foundations.md` and `docs/brand/voice.md`.

---

## 1. Purpose & context

Enquiry replies are sent in response to inbound messages from prospects who have reached out to #sharp — via the website contact form, a direct email, a referral, or a conference introduction.

**Audience:** A single prospect, often senior (director, C-suite, or business owner), typically time-constrained. They are evaluating whether #sharp is worth a conversation, not yet whether they want to buy. The enquiry reply is the first written interaction and frames every subsequent exchange.

**When it is used:** Any time a team member replies to an inbound lead or follows up after a period of silence. It is not a proposal, a pitch deck, or a discovery-call agenda — it is the thing that gets the discovery call booked.

**Why it matters:** A well-formed enquiry reply signals that #sharp is specific, professional, and worth the prospect's time. A generic reply ("Thanks for reaching out — happy to chat!") signals that #sharp is like everyone else. The standard is precision and warmth, not volume.

---

## 2. Visual specs (inlined subset)

Enquiry replies are plain prose email. There are no design elements in the message body itself — no images, no formatted tables, no colour. The only visual brand element is the signature block at the bottom of every reply.

### Signature

The client-facing signature variant applies to all enquiry replies. It includes the calendar booking link as a persistent affordance beneath the message CTA.

For full signature HTML, colour values, and font stacks, see [`brand/email-signature.md`](email-signature.md) §7 (Client-facing signature template).

### Colour in the message body

None. Do not apply HTML formatting, coloured text, or inline styles to the message body of an enquiry reply. Default email rendering in the recipient's client is the intended presentation.

### Typography in the message body

Default email font as rendered by the recipient's client. Do not specify a font-family in the message body.

→ For full visual rules, see [`brand/foundations.md`](foundations.md).

---

## 3. Verbal specs (inlined subset)

### Tone

Enquiry replies use the **professional-warm** register from the tone spectrum — the same register as client-facing presentations, not the minimal register of email signatures. The goal is to sound like a knowledgeable peer who has actually read the question, not like an autoresponder.

### Voice: confident, not eager

The #sharp voice does not oversell. The first sentence acknowledges specifically what the prospect asked. The second sentence establishes substantive content — an insight, a direct partial answer, or a framing observation. The final paragraph proposes a single next step.

### Structure

- **First sentence:** acknowledges what they asked. Specific, not generic.
- **Second and third sentences:** substance. Answer part of their question or surface a relevant insight. No platitudes.
- **Final paragraph:** single clear next step. No multiple options. No "let me know what works".

### Brand name

`#sharp` is always lowercase with the hash prefix. It never starts a sentence. Write "The team at #sharp…" or "At #sharp, we…", not "#sharp would love to…".

### UK English

Use UK spelling throughout: organisation, recognise, favour, colour, programme. No US spellings.

→ For full verbal rules, see [`brand/voice.md`](voice.md).

---

## 4. Format & dimensions

**Channel:** Email body.

**Length:** ≤ 200 words for the first reply. Every word must earn its place. A 120-word reply that answers the question is better than a 200-word reply that performs thoroughness.

**Subject line:**

- When replying to an existing thread: `Re: [their original subject line]`. Do not change the thread subject unless it is completely blank or says only "Enquiry".
- When initiating outreach cold (e.g., a warm introduction referral): `Following your enquiry about [specific topic]` — replace the bracketed phrase with the actual topic. Never use a blank subject or "Hello".
- Never leave the subject as `Re:` alone with nothing after it.

**Signature:** The client-facing variant from `brand/email-signature.md` must appear at the bottom of every reply. No exceptions for enquiry emails.

**Attachments:** None, unless the prospect explicitly asked for something specific (e.g., "could you send your credentials document?"). Do not proactively attach case studies, credentials decks, or brochures in a first reply.

---

## 5. Layout & composition

Enquiry replies follow a four-part structure. No more than four paragraphs total.

```
[Personalised opener — 1 sentence]

[Substance — 2–3 sentences]

[CTA — 1–2 sentences]

[Sign-off]
[Signature block]
```

### Personalised opener

One sentence. Names the specific thing the prospect asked about. This is not a generic greeting — it demonstrates the message was read. Do not open with "Thanks for reaching out", "Hope this finds you well", or any variant.

**Pattern:** `Thanks — your question about [specific topic] is [brief framing].`

### Substance paragraph

Two to three sentences. This is the most important part of the reply. It must contain actual content: a direct partial answer, a relevant observation, or a concrete framing of how #sharp approaches the problem. Never use this paragraph to describe #sharp's full service range. Answer the question they asked.

### Single CTA paragraph

One or two sentences. Proposes a single next step — almost always a 30-minute discovery call. Offers one specific time window and includes the calendar link as a fallback. Do not offer multiple slots or say "let me know what works for you" without a specific anchor.

**Pattern:** `Would [specific day / time window] work for a 30-minute call to go deeper on this? If that doesn't suit, you can grab a time directly: [calendar URL].`

### Sign-off

`Best,` or `Best regards,` — consistent across the team. Do not use `Kind regards,`, `Cheers,`, `Warmly,`, or any variant. Sign-off is followed immediately by the signature block.

---

## 6. Component / element library

There is no visual component library for enquiry replies — the message body is plain prose. The following named elements define the structural components of the reply.

| Element             | Required | Notes                                                                                                           |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| Personalised opener | Required | Names the specific thing they asked about. Not "Thanks for reaching out."                                       |
| Substance paragraph | Required | Answers part of the question or surfaces a relevant insight. Never just "happy to chat" or "we'd love to help." |
| Single CTA line     | Required | One specific next step — a 30-minute discovery call. One time window offered, with calendar link as fallback.   |
| Sign-off            | Required | `Best,` or `Best regards,` — consistent across the team.                                                        |
| Signature block     | Required | Client-facing variant per `brand/email-signature.md`. Must be present on every enquiry reply without exception. |

### Personalised opener — detail

The opener names the specific subject matter from the prospect's message. Examples of what it targets:

- "Thanks — your question about post-merger CX consolidation is one we work on regularly."
- "Thanks — the data analytics challenge you described is directly in our wheelhouse."

What it is not:

- "Thanks for reaching out."
- "Great to hear from you."
- "Hope you're having a good week."

### Substance paragraph — detail

The substance paragraph provides content the prospect can actually use. It might:

- Offer a partial direct answer to their question.
- Surface a pattern #sharp has observed across similar organisations.
- Reframe the question in a way that reveals depth of understanding.

It does not describe #sharp's full service range or capability stack. That information belongs in a proposal or a discovery call, not a first reply.

### Single CTA line — detail

One next step. One specific time anchor. One fallback link. The discovery call is almost always the right next step — it is low-commitment for the prospect and high-value for both parties.

Pattern: `Would [day, time window] work for a 30-minute discovery call? If that doesn't suit, here's a link to book directly: [calendar URL].`

The calendar link must use `https://`. The URL must point to the team's actual booking tool — do not use a placeholder URL in a sent reply.

---

## 7. Templates / starters

Five named templates. Use as the starting point for a reply; personalise all bracketed fields before sending. Each template is ≤ 150 words.

### General info request

Use when the prospect has asked a broad "tell me about #sharp" or "what do you do?" question.

---

Subject: Re: [their subject]

Thanks — the question about what #sharp does in digital transformation is a good one to answer specifically, rather than generically.

At #sharp, we work with mid-market and enterprise organisations on the parts of transformation that tend to stall: customer experience redesign, AI integration into operations, and turning data into decisions rather than dashboards. We don't do strategy-deck-and-exit; we stay close to implementation.

Would [day, e.g. Thursday afternoon] work for a 30-minute call so I can understand your context and give you a more useful answer? If that timing doesn't suit, you can grab a slot here: [calendar URL].

Best,
[Signature block]

---

### Pricing question (deflect to discovery)

Use when the prospect has asked about cost, rates, or "how much does it cost?"

---

Subject: Re: [their subject]

Thanks — pricing is a fair first question, and I'll give you a straight answer: it genuinely depends on the scope of what you're trying to achieve, which varies significantly between organisations.

What I can say is that our engagements are outcome-scoped rather than time-and-materials, and we're typically working with organisations where the commercial case for the transformation covers the investment comfortably. The best way to give you a meaningful number is to understand your situation first.

Would [day] work for a 30-minute discovery call? I can walk through how we'd approach your specific challenge and give you a realistic range. Alternatively, grab a time here: [calendar URL].

Best,
[Signature block]

---

### Scope question (light substance + invite)

Use when the prospect has described a specific challenge and wants to know whether #sharp can help.

---

Subject: Re: [their subject]

Thanks — the [specific challenge they described, e.g. fragmented customer data across three legacy systems] is a pattern we work on directly. The underlying issue is usually less about the data itself and more about the decision logic that sits on top of it — who owns which insight, and what changes when they have it.

We've approached this in a few different ways depending on the organisation's maturity and appetite for change. It would be worth a short conversation to understand your context before I say more.

Would [day, time window] suit for a 30-minute call? Or book directly here: [calendar URL].

Best,
[Signature block]

---

### Out-of-scope referral

Use when the prospect's enquiry is outside #sharp's service areas.

---

Subject: Re: [their subject]

Thanks for getting in touch. Having read your message carefully, I want to be straight with you: [the specific thing they've asked about, e.g. bespoke software development] isn't our specialism — #sharp focuses on digital transformation strategy, AI integration, and customer experience, rather than build-phase engineering delivery.

That said, [referral recommendation, e.g. this sounds like a good fit for an agency like X, or I'd be happy to introduce you to someone in my network who works in this space]. Happy to make that connection if useful.

Best,
[Signature block]

---

### Follow-up after silence

Use when a prospect has gone quiet after an initial exchange. Keep it short, no guilt-trip, one fresh hook.

---

Subject: Following up — [original topic]

Following up briefly in case my previous message got buried.

I came across [a relevant article / an observation from a recent engagement, e.g. this piece on post-merger CX integration] that's directly relevant to what you were describing — happy to share it if useful.

If now isn't the right moment, no problem at all. And if the timing has shifted or the project has moved on, good to know either way.

[calendar URL] is there if a call would be useful at some point.

Best,
[Signature block]

---

## 8. Worked examples

Two complete enquiry replies with real-feeling client names, topics, and detail. These are calibration references — use them to assess whether a draft reply is on-brand.

### Example A: General info request

**Context:** Prospect named Sarah Okonkwo, Head of Operations at a mid-size retail business, emailed via the website contact form saying: "Hi, we're going through a lot of change at the moment and exploring digital transformation. Could you tell me more about what you do?"

---

**Subject:** Re: Website enquiry

Hi Sarah,

Thanks — "going through a lot of change" is exactly the moment where the shape of a transformation programme matters most, so your question is a timely one.

At #sharp, we work with operations and leadership teams in retail and similar sectors on three things: redesigning customer experience around how people actually behave today, integrating AI into operational workflows so it reduces effort rather than adds complexity, and getting data to inform decisions rather than sit in reports that nobody reads. We stay close to delivery rather than handing off a strategy document.

Would Thursday afternoon work for a 30-minute call? I'd rather understand your situation before saying more — the specifics matter. If Thursday doesn't suit, you can book directly here: https://calendar.sharpdigital.co.uk.

Best,
Janos Csikos · Co-Founder
#sharp · Digital Transformation Consultancy · +44 7700 000000

---

**Word count:** 154 words. Subject is thread-aware. Opener names the thing they said ("going through a lot of change"). Substance paragraph answers part of the question with three concrete areas — not a capabilities brochure. CTA offers one day, one fallback link.

---

### Example B: Pricing question

**Context:** Prospect named Marcus Webb, CFO at a financial services firm, replied to a cold introduction with: "Interested in having a chat. Before we do — what sort of budgets are we talking about for this kind of work?"

---

**Subject:** Re: Introduction — digital transformation

Hi Marcus,

Thanks — it's a fair question to ask upfront, and I'll give you a straight answer: our engagements are scoped to outcome rather than time, so the number depends on what you're actually trying to achieve.

In financial services, the work we do most often involves AI integration into operations and customer journey redesign — both areas where the business case for the transformation typically justifies the investment clearly. A 30-minute call would let me understand the specific challenge you're facing and give you a realistic range rather than a generic one.

Would next Tuesday morning work? Alternatively, here is a direct link to book: https://calendar.sharpdigital.co.uk.

Best regards,
Janos Csikos · Co-Founder
#sharp · Digital Transformation Consultancy · +44 7700 000000

---

**Word count:** 140 words. Does not dodge the question — acknowledges it directly and explains why the answer is contextual. Substance provides sector-relevant framing (financial services) rather than generic copy. CTA is specific (Tuesday morning) with fallback.

---

## 9. Do / Don't

**Don't** open with "Thanks for reaching out."
**Do** name the specific thing they asked about — "Thanks — your question about post-merger CX is exactly the kind of thing we work on."

---

**Don't** describe #sharp's full capability stack in the reply body.
**Do** answer the question they actually asked. If they asked about pricing, answer about pricing. If they asked about a specific challenge, address that challenge.

---

**Don't** offer multiple meeting times or say "let me know what works for you" without a specific anchor.
**Do** offer one specific time window with a fallback calendar link — "Would Thursday afternoon work? If not, here's the link: [URL]."

---

**Don't** apologise for response time unless the gap has been over 48 hours.
**Do** treat a 24-hour turnaround as normal and professional. No "sorry for the delay" when there is no delay.

---

**Don't** close with "looking forward to chatting" or any variant.
**Do** be specific about what the call will cover — "I'd want to understand your current operational setup before saying more" gives the prospect a reason to take the call.

---

## 10. Hard constraints

Non-negotiable requirements. A reply that violates any item here must be corrected before sending.

- **Subject line is never empty or "Re:" alone.** Every reply has a meaningful, specific subject. If the original subject is blank or nonsensical, rewrite it to describe the topic.
- **Every reply includes a single, clear next step.** The CTA paragraph proposes one action — almost always a 30-minute discovery call. Do not present options ("we could do a call or I could send you some information"). Choose one and propose it.
- **Signature block must be present.** The client-facing variant from `brand/email-signature.md` must appear at the bottom of every enquiry reply. No exceptions.
- **No attachments unless explicitly requested.** Do not attach credentials decks, case studies, capability documents, or any other file in a first reply. Wait until the prospect asks, or until after the discovery call.
- **Calendar links must use `https://`.** No plain HTTP links. The URL must point to the team's actual booking tool — do not use a placeholder in a sent reply.

---

## 11. Asset references

Enquiry reply bodies contain no brand assets. The only asset present in an enquiry reply is the signature block.

For all signature assets (logo PNG, SVG paths, HTML templates, colour values), see [`brand/email-signature.md`](email-signature.md) §11.

| Asset                | Location                           | Notes                                                                                |
| -------------------- | ---------------------------------- | ------------------------------------------------------------------------------------ |
| Signature assets     | See `brand/email-signature.md §11` | Logo, HTML template, plain-text fallback — all defined in the signature doc.         |
| Calendar booking URL | Team booking tool                  | Use the team's actual `https://` booking URL. Not a static asset in this repository. |

---

## 12. Related docs

- [`brand/foundations.md`](foundations.md) — full visual reference: colours, typography, logo rules, spacing, accessibility, token reference. Enquiry replies reference foundations only via the signature block; the body is deliberately unstyled.
- [`brand/voice.md`](voice.md) — full verbal reference: voice attributes, tone spectrum, writing principles, vocabulary. The verbal spec in §3 of this document is derived from voice.md and should remain consistent with it.
- [`brand/email-signature.md`](email-signature.md) — the signature block that appears at the bottom of every enquiry reply. The client-facing variant (§7) is the required variant for this channel.
- [`brand/proposal.md`](proposal.md) — the natural next step after a positive enquiry exchange. When the prospect moves from discovery call to formal scope, a proposal follows. The enquiry reply is the opening; the proposal is what comes after.
