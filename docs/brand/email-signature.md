# Brand: Email signature channel guidelines

Email signatures are the smallest persistent brand touchpoint #sharp has — they appear on every outbound client email, every reply, every enquiry response. Getting them right is low effort and high leverage. This document is self-contained for AI consumption; it inlines the relevant visual and verbal subsets and cites canonical refs for depth. Do not alter values found here without first updating `docs/brand/foundations.md` and `docs/brand/voice.md`.

---

## 1. Purpose & context

Email signatures are used by all team members on every client-facing email — outbound enquiries, replies, follow-ups, and meeting confirmations alike.

**Audience:** Every external email recipient who receives a message from a #sharp team member. This includes prospects, active clients, partners, and referred contacts. The signature may be the first or only brand element they see in a message thread.

**When it appears:** Every business email sent from a @sharpdigital.co.uk address. There is no opt-out for client-facing correspondence. Internal-only email between team members may use the simplified internal variant (see §7).

**Why it matters:** A consistent, well-formed signature signals professionalism without requiring the reader to think about it. An inconsistent, over-decorated, or broken signature does the opposite. The standard should be invisible — clean enough that the reader focuses on the message content, not the signature beneath it.

---

## 2. Visual specs (inlined subset)

### Colour

Email signatures use a restrained subset of the #sharp palette. Only three values are in use.

| Role                         | Hex       | Where used                                                   |
| ---------------------------- | --------- | ------------------------------------------------------------ |
| Name and body text           | `#333`    | Name line, role, company text, phone, all readable content   |
| Company name accent          | `#D41F21` | The `#sharp` portion of the company name only — nowhere else |
| Separators and tertiary text | `#a0a0a0` | Horizontal divider lines, separator dots between fields      |

**Do not** use any other red shade in signatures. The brand primary is `#D41F21`. See `docs/brand/foundations.md §2` for deprecated values.

### Typography

| Role     | Font stack                                                       | Size    | Line-height |
| -------- | ---------------------------------------------------------------- | ------- | ----------- |
| All text | `Inter, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif` | 13–14px | 1.35        |

Inter will not load in most email clients, including Outlook. The cascade ensures the signature reads cleanly even when Inter is unavailable. **Do not** reference external web font URLs in signature HTML — they will be blocked.

### Logo

- Use the small inverted-or-light variant of the logo at 24–32px height.
- The logo sits to the left of the name and company lines, vertically centred.
- Always include a meaningful `alt` attribute (see §10).

→ For full visual rules, see [`brand/foundations.md`](foundations.md).

---

## 3. Verbal specs (inlined subset)

### Tone

Email signatures use a **professional-warm but minimal** register. The signature is not a place for personality flourishes, marketing copy, or motivational phrases. It states facts clearly and stops.

### Brand name format

The company name appears in the signature as:

```
#sharp · Digital Transformation Consultancy
```

- `#sharp` is always lowercase with the hash prefix.
- `#sharp` never starts a sentence or a line in isolation — but within the fixed company name string it leads by convention.
- The separator dot `·` (middle dot, U+00B7) is preferred over a pipe or dash.
- Do not abbreviate the trading name or omit the descriptor.

### What to omit

- No marketing taglines or value-proposition copy.
- No inspirational quotes or aphorisms.
- No pronouns graphic or social-cause declarations.
- No seasonal messaging.

→ For full verbal rules, see [`brand/voice.md`](voice.md).

---

## 4. Format & dimensions

### HTML format

Signatures are implemented as **HTML with inline CSS only**. Email clients — particularly Outlook, Apple Mail, and Gmail — strip `<style>` blocks and external stylesheets. Every style property must be applied directly on the element via the `style` attribute.

- Table-based or div-based layouts are both acceptable; either renders consistently across major clients.
- **Width:** Cap the signature container at `480px` to ensure it renders well on mobile without horizontal scrolling.
- **No external font references:** `@import` and `<link>` to Google Fonts will not load in most clients. Use the font-family cascade (see §2).
- **No external CSS:** Everything required to render the signature must be in the `style` attributes of the HTML itself.

### Plain-text fallback

Every signature variant must have a plain-text equivalent for non-HTML email clients. The plain-text version uses only ASCII-safe characters: no fancy dots, no styled text, no HTML tags.

### Logo embedding

Use the logo as an inline image reference or a base64-encoded `<img>` tag. Do not hotlink from an external URL (blocked by most corporate email clients). A PNG variant is preferable for email-client compatibility — see §11 for the current asset gap.

---

## 5. Layout & composition

### Two-line preferred layout

The standard layout is two lines of content with the logo to the left, vertically centred across both lines:

```
[Logo]  [Name] · [Role]
        #sharp · Digital Transformation Consultancy · [phone] · [calendar link]
```

- Logo: 24–32px height, aligned left, with 12–16px of space to the right before the text column.
- Line 1: name in charcoal `#333`, a separator dot, then role in charcoal `#333`.
- Line 2: `#sharp` in primary `#D41F21`, separator dot, descriptor in charcoal `#333`, separator dot, phone, optional separator dot, optional calendar link.
- A thin horizontal rule in `#a0a0a0` may appear above the signature block as a visual separator from the message body.

### Single-line layout

Acceptable when vertical space is constrained (e.g., very short replies). Combines name, role, and company into one line:

```
[Logo]  [Name] · [Role] · #sharp · Digital Transformation Consultancy · [phone]
```

Use single-line sparingly — the two-line layout is preferred for readability on narrow screens.

### Light-mode only

Signatures are designed for light-mode email clients (white or near-white background). Do not apply background colours to the signature block. The transparent background ensures the signature reads correctly whether the client is in light mode, dark mode, or a custom theme.

### Red accent constraint

`#D41F21` appears only on the `#sharp` text in the company name. It must not appear on the name, role, phone, or any other element.

---

## 6. Component / element library

There is a single component: the **signature block**. It is not decomposed into independently deployed sub-components — the entire block is copied as a unit into the email client's signature settings.

The signature block comprises the following sub-elements:

| Sub-element      | Required | Notes                                                                                                                  |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| Logo image       | Optional | Recommended for standard and client-facing variants; omitted for internal                                              |
| Name + role line | Required | Always present. Name in `#333`, middle dot separator, role in `#333`.                                                  |
| Company line     | Required | `#sharp` in `#D41F21`, descriptor and contact details in `#333`.                                                       |
| Horizontal rule  | Optional | `1px solid #a0a0a0` separator above the block; use with care — some clients render rules inconsistently.               |
| Legal disclaimer | Optional | Fourth line for a confidentiality or legal disclaimer, if required by the engagement or client. Inter 11px, `#a0a0a0`. |

---

## 7. Templates / starters

Three named variants. Copy the HTML for your variant into your email client's signature settings. Replace all `{{placeholder}}` values with your own details.

### Standard signature

Two-line layout. No calendar link. Suitable for all general correspondence.

**HTML:**

```html
<table
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="font-family: Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.35; color: #333; max-width: 480px;"
>
  <tr>
    <td style="padding-right: 14px; vertical-align: middle;">
      <img
        src="cid:sharp_logo"
        alt="#sharp logo"
        width="28"
        height="28"
        style="display: block; width: 28px; height: 28px;"
      />
    </td>
    <td style="vertical-align: middle;">
      <div style="color: #333;">{{name}} &middot; {{role}}</div>
      <div>
        <span style="color: #D41F21;">#sharp</span>
        <span style="color: #333;">
          &middot; Digital Transformation Consultancy &middot; {{phone}}</span
        >
      </div>
    </td>
  </tr>
</table>
```

**Plain-text fallback:**

```
{{name}} - {{role}}
#sharp - Digital Transformation Consultancy - {{phone}}
https://sharpdigital.co.uk
```

---

### Client-facing signature

Two-line layout with a calendar booking link appended to line 2. Use for client communications where scheduling a meeting is likely.

**HTML:**

```html
<table
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="font-family: Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.35; color: #333; max-width: 480px;"
>
  <tr>
    <td style="padding-right: 14px; vertical-align: middle;">
      <img
        src="cid:sharp_logo"
        alt="#sharp logo"
        width="28"
        height="28"
        style="display: block; width: 28px; height: 28px;"
      />
    </td>
    <td style="vertical-align: middle;">
      <div style="color: #333;">{{name}} &middot; {{role}}</div>
      <div>
        <span style="color: #D41F21;">#sharp</span>
        <span style="color: #333;">
          &middot; Digital Transformation Consultancy &middot; {{phone}} &middot;
        </span>
        <a href="{{calendar_url}}" style="color: #333; text-decoration: underline;">Book a call</a>
      </div>
    </td>
  </tr>
</table>
```

**Plain-text fallback:**

```
{{name}} - {{role}}
#sharp - Digital Transformation Consultancy - {{phone}}
Book a call: {{calendar_url}}
https://sharpdigital.co.uk
```

---

### Internal signature

Minimal variant for internal team communication only. No logo, no company line. Name and role only.

**HTML:**

```html
<table
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="font-family: Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.35; color: #333; max-width: 480px;"
>
  <tr>
    <td style="vertical-align: middle;">
      <div style="color: #333;">{{name}} &middot; {{role}}</div>
    </td>
  </tr>
</table>
```

**Plain-text fallback:**

```
{{name}} - {{role}}
```

---

## 8. Worked examples

Full rendered HTML for the standard signature with real values for Janos Csikos, Co-Founder. Use this as a calibration reference when checking whether a signature implementation is on-brand.

### HTML (inline CSS, production-ready)

```html
<table
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="font-family: Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.35; color: #333333; max-width: 480px;"
>
  <tr>
    <td style="padding-right: 14px; vertical-align: middle;">
      <img
        src="cid:sharp_logo"
        alt="#sharp logo — Digital Transformation Consultancy"
        width="28"
        height="28"
        style="display: block; width: 28px; height: 28px;"
      />
    </td>
    <td style="vertical-align: middle;">
      <div style="color: #333333; font-size: 13px; line-height: 1.35;">
        Janos Csikos &middot; Co-Founder
      </div>
      <div style="font-size: 13px; line-height: 1.35;">
        <span style="color: #D41F21; font-weight: 500;">#sharp</span>
        <span style="color: #333333;">
          &middot; Digital Transformation Consultancy &middot; +44 7700 000000</span
        >
      </div>
    </td>
  </tr>
</table>
```

Notes on the example above:

- `cid:sharp_logo` is the content-ID reference for a logo image embedded in the email. In practice, configure your email client to embed the PNG variant (see §11) as an inline attachment with this content-ID, or substitute with a base64 data URI.
- When images are blocked, the `alt` text provides a readable fallback and the text column remains fully legible — the layout does not collapse.
- `#D41F21` is applied only to `#sharp`; all other text is `#333333`.

### Plain-text fallback (side-by-side reference)

```
Janos Csikos - Co-Founder
#sharp - Digital Transformation Consultancy - +44 7700 000000
https://sharpdigital.co.uk
```

The plain-text version strips all formatting and HTML structure. No separator dots, no colours, no logo. It is functional, not decorative.

---

## 9. Do / Don't

**Don't** leave the "Sent from my iPhone" (or equivalent device default) in your signature when sending from a mobile device.
**Do** delete the device-default signature text in your iOS Mail, Android Mail, or Gmail mobile settings before sending client-facing email.

---

**Don't** apply a background colour to the signature block or to any table cell within it.
**Do** keep the background transparent — set no `background-color` on any element, and let the email client's default (typically white) show through. This ensures the signature reads correctly in both light-mode and dark-mode email clients.

---

**Don't** include large logos, banner images, pronoun graphics, certification badges, or decorative imagery in the signature.
**Do** keep the total signature height at or under 80px. The only permitted image is the #sharp logo at 24–32px height. Compact signatures load faster and look more professional.

---

**Don't** add a quote, aphorism, motivational phrase, or marketing tagline beneath the contact details.
**Do** keep the signature factual: name, role, company, phone, and optionally a calendar link. If you have something worth saying, put it in the email body.

---

**Don't** embed external CSS, reference a `<style>` block, or link to a web font `@import` URL.
**Do** use inline `style` attributes on every element, and use the font-family fallback cascade (`Inter, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`) so the signature reads well in every client regardless of font availability.

---

## 10. Hard constraints

Non-negotiable requirements. A signature that violates any item here must be corrected before use.

- **Plain-text fallback always provided.** Every team member's signature configuration must include a plain-text version alongside the HTML version. Most email clients allow both to be set.
- **Logo `alt` attribute must be meaningful.** `alt="#sharp logo — Digital Transformation Consultancy"` is acceptable. `alt=""` or `alt="image"` is not. When images are blocked, the `alt` text is the only representation of the logo.
- **All links must use `https://`.** No plain HTTP links in signatures. Calendar links, website links, and any other URLs must be HTTPS.
- **Renders correctly with images blocked.** When the logo image fails to load or is blocked, the text column must still present a complete, intentional-looking signature. Do not rely on the logo being visible to convey the company name — the text in line 2 carries that.
- **No tracking pixels, no analytics URLs.** Signatures must not include 1×1 tracking images, UTM-tagged links, or any URL that sends analytics data about the recipient's behaviour. This is a privacy constraint.

---

## 11. Asset references

All paths are relative to the repository root.

| Asset                        | Path                        | Notes                                                                                                |
| ---------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------- |
| Primary logo (SVG, light bg) | `img/sharp_logo.svg`        | Source logo; not suitable for direct embedding in most email clients — use a PNG export instead.     |
| Small logo PNG (email use)   | _(gap — see below)_         | A 64×64px PNG export for email embedding is a known gap, tracked under follow-up issue #15.          |
| Inverted logo (SVG, dark bg) | `img/sharp_logo_invert.svg` | Not used in standard email signatures (light-mode only), but available for dark-background contexts. |

**Known asset gap:** No small PNG variant of the logo currently exists for email embedding. The `img/sharp_logo.svg` source is in place, but a 64×64px (or 2× at 128×128px for retina) PNG export needs to be produced and committed before signatures can be fully configured across all email clients. This is tracked as follow-up issue #15.

Until the PNG is available, teams may use a base64-encoded data URI generated from the SVG, with the caveat that SVG rendering in Outlook is not guaranteed.

---

## 12. Related docs

- [`brand/foundations.md`](foundations.md) — full visual reference: colours, typography, logo rules, spacing, accessibility, and token reference. Signature colour and typography values are derived from foundations.
- [`brand/voice.md`](voice.md) — full verbal reference: voice attributes, tone spectrum, writing principles, and vocabulary. Signature tone and brand name formatting follow voice guidelines.
- [`brand/enquiry.md`](enquiry.md) — signatures appear at the bottom of every enquiry reply. The enquiry channel document governs the message body; this document governs the signature block beneath it. _(Note: enquiry.md is planned in Task 10; the link path is correct for when it exists.)_
