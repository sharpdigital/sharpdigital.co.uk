# Brand foundations

Canonical visual reference for #sharp. Every colour, typeface, logo rule, spacing token, motion curve, and imagery convention lives here once. Channel documents (`presentation.md`, `proposal.md`, etc.) and `02_visual-design-system.md` cite this file rather than defining their own values. Every specification below includes a source-of-truth pointer so future drift is detectable.

---

## 1. Brand essence

#sharp is a digital transformation consultancy that makes the complex feel achievable. The brand communicates four qualities simultaneously: **clean** — uncluttered layouts that let content breathe; **professional** — precise typography, controlled colour, and rigorous structure; **trustworthy** — consistency across every touchpoint, honest language, and no visual hyperbole; **AI-confident** — a forward-looking identity that treats AI transformation as a natural capability, not a gimmick. The signature red accent (`#D41F21`) is used sparingly and always purposefully: on primary calls to action, key phrase emphasis within headings, and page-header metadata. Overuse of red is as damaging as none at all.

---

## 2. Color system

### Primary palette

All values sourced from `tailwind.config.js` (lines 11–14).

| Token            | Hex       | Usage                                                                |
| ---------------- | --------- | -------------------------------------------------------------------- |
| `primary`        | `#D41F21` | CTAs, primary buttons, accent spans in headings, page-header details |
| `primary-hover`  | `#BC1B1D` | Hover state on primary buttons                                       |
| `primary-active` | `#A41719` | Active/pressed state on primary buttons                              |
| `charcoal`       | `#333333` | Body text, headings, icon fill                                       |
| White            | `#FFFFFF` | Page backgrounds, card surfaces                                      |

**Important:** `#D41F21` is the brand primary. Any other red is drift and is rejected by `scripts/verify-brand-docs.mjs`.

### WCAG 2.1 AA contrast pairings

Contrast ratios are calculated against sRGB. Values marked ✓ pass AA for normal text (4.5:1), ✓✓ pass AAA (7:1).

| Foreground         | Background         | Ratio   | Normal text | Large text (≥18pt/14pt bold) |
| ------------------ | ------------------ | ------- | ----------- | ---------------------------- |
| `#D41F21` primary  | `#FFFFFF` white    | ~5.0:1  | ✓ AA        | ✓ AA                         |
| `#333333` charcoal | `#FFFFFF` white    | ~12.6:1 | ✓✓ AAA      | ✓✓ AAA                       |
| `#D41F21` primary  | `#333333` charcoal | ~2.4:1  | ✗           | ✗                            |
| `#FFFFFF` white    | `#D41F21` primary  | ~5.0:1  | ✓ AA        | ✓ AA                         |
| `#FFFFFF` white    | `#333333` charcoal | ~12.6:1 | ✓✓ AAA      | ✓✓ AAA                       |

### Do / Don't

- **Do** use `primary` on white backgrounds for CTA text and key accent spans.
- **Do** verify contrast (≥4.5:1 for body text, ≥3:1 for large text) before using `primary` on coloured backgrounds.

---

## 3. Typography

### Typefaces

Both fonts loaded via `next/font/google` in `src/app/layout.tsx` (lines 2, 6–14). They are served as CSS custom properties (`--font-inter`, `--font-manrope`) injected on the `<body>` element (line 83).

| Role                   | Font    | Token          | CSS variable     |
| ---------------------- | ------- | -------------- | ---------------- |
| Headings / titles      | Manrope | `font-heading` | `--font-manrope` |
| Body reading text      | Inter   | `font-body`    | `--font-inter`   |
| UI / form / micro-copy | Inter   | `font-sans`    | `--font-inter`   |

Font family stacks from `tailwind.config.js` (lines 16–20):

```
heading: ['Manrope', 'Inter', 'sans-serif']
body:    ['Inter', 'serif']
sans:    ['Inter', 'sans-serif']
```

`font-body` and `font-sans` share the same primary typeface (Inter) but carry different fallback stacks: `font-body` falls back to `serif` and is intended for body reading text, while `font-sans` falls back to `sans-serif` and is used for UI elements, form controls, and micro-copy.

Fonts are loaded via `next/font/google` in `src/app/layout.tsx`. No local webfont assets are bundled.

### Type scale

Sourced from `tailwind.config.js` (lines 21–27).

| Class      | Font size | Line-height | Weight    | Usage                            |
| ---------- | --------- | ----------- | --------- | -------------------------------- |
| `text-lg`  | `1rem`    | (default)   | 410       | Body lead / large UI labels      |
| `text-xl`  | `1.22rem` | `1.485`     | 300       | Subheadings, card descriptions   |
| `text-2xl` | `1.68rem` | (default)   | (default) | Section subheadings              |
| `text-4xl` | `2.6rem`  | `1.224`     | (default) | Page headings                    |
| `text-5xl` | `5rem`    | `1.32`      | 200       | Hero headlines — airy, not heavy |

### Body letter-spacing

`.leading-relaxed` applies `letter-spacing: -0.02em` (from `globals.css` line 44). This tightening is intentional for Inter at body sizes and must not be overridden without design approval.

### Web fallback chain

Manrope → Inter → sans-serif. If Manrope fails to load, Inter maintains the weight-200 headline feel at the cost of some personality. The final `sans-serif` fallback is a last resort.

### Print / PDF substitution policy

When Manrope is unavailable (e.g., print or PDF export), substitute **Helvetica Neue** (or **Arial** as a secondary fallback). No local webfont assets are bundled — fonts are loaded exclusively via `next/font/google`.

---

## 4. Logo

### Asset inventory

All logo assets live in `img/` at the repo root (also mirrored in `public/img/` for Next.js serving).

| File                        | Variant                        | Dimensions / notes                                                       |
| --------------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| `img/sharp_logo.svg`        | Full-colour vector             | Scalable; primary web format                                             |
| `img/sharp_logo_invert.svg` | Inverted / reversed-out vector | For dark backgrounds                                                     |
| `img/sharp_logo.png`        | Full-colour raster             | Fallback; exact dimensions not specified                                 |
| `img/sharp_logo_w264.png`   | Square raster, 264 × 264 px    | Social/OG image, Apple touch icon (see `src/app/layout.tsx` lines 40–44) |

### Clear space

Maintain a minimum clear space of **0.5× the logo height** on all four sides. At the standard web header size of 40 px (`h-10`, from `src/components/Header.tsx` line 36), this means 20 px of protected space around the mark.

### Minimum size

- **Web:** 24 px height minimum.
- **Print:** 12 mm height minimum.

### Colour variants

- Use `sharp_logo.svg` on white or light backgrounds.
- Use `sharp_logo_invert.svg` on the charcoal (`#333333`) footer gradient or any dark background.
- Do not apply the primary red (`#D41F21`) as a tint or fill colour to the logo mark — it is already encoded as a brand asset.

### Do / Don't

- **Don't** recolour the logo outside its approved variants.
- **Don't** rotate, skew, stretch, or apply drop shadows to the logo.
- **Don't** place the standard (non-inverted) logo on coloured or photographic backgrounds without a white clearance zone.
- **Do** use the SVG format wherever possible for sharpness at all sizes.

### Identified gaps (tracked as separate issues)

The following assets do not currently exist and should be created as separate deliverables:

- **Favicon set** (`favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`) — currently the site uses `sharp_logo_w264.png` as an Apple touch icon (a stopgap, per `layout.tsx` line 55).
- **1:1 square avatar** optimised for social profile images (separate from the OG image use of `sharp_logo_w264.png`).
- **Horizontal wordmark lockup** — logo mark alongside the `#sharp` wordmark on one baseline, for email headers and letterheads.

---

## 5. Iconography

### Custom brand icons

Hand-crafted SVG icons live in `src/components/icons/`. Current set:

| Component      | File                                    | Used in                                          |
| -------------- | --------------------------------------- | ------------------------------------------------ |
| `TeamIcon`     | `src/components/icons/TeamIcon.tsx`     | Contact page (`src/app/contact/page.tsx` line 8) |
| `TrackIcon`    | `src/components/icons/TrackIcon.tsx`    | Contact page (line 9)                            |
| `FlaskIcon`    | `src/components/icons/FlaskIcon.tsx`    | Contact page (line 10)                           |
| `DesignIcon`   | `src/components/icons/DesignIcon.tsx`   | Services                                         |
| `ExecuteIcon`  | `src/components/icons/ExecuteIcon.tsx`  | Services                                         |
| `FunnelIcon`   | `src/components/icons/FunnelIcon.tsx`   | Services                                         |
| `MeasureIcon`  | `src/components/icons/MeasureIcon.tsx`  | Services                                         |
| `StrategyIcon` | `src/components/icons/StrategyIcon.tsx` | Services                                         |

**Style rules for custom icons:**

- Stroke-based geometry with rounded line caps and joins.
- Effective line weight approximately 1.5 px at 24 px canvas.
- Geometric construction — circles, rectangles, and arcs; no decorative serifs or organic curves.
- Colour is controlled via the CSS custom property `--color` on the SVG `fill` attribute (as seen in `TeamIcon.tsx` line 9: `fill="var(--color)"`), allowing the parent context to set the icon colour without modifying the SVG source.
- Viewbox: `0 0 256 256` (consistent across the set).

### Exception: lucide-react in shadcn UI components

`lucide-react` is imported in `src/components/ui/select.tsx` (line 5: `Check`, `ChevronDown`, `ChevronUp`) for **UI affordance icons** within shadcn/ui components. This is permitted: these are structural indicators (disclosure arrows, confirmation marks) generated by the component library, not brand-distinctive iconography.

**Rule:** lucide-react icons may only appear inside `src/components/ui/` as part of shadcn component internals. Any icon that communicates brand meaning, a service, or a concept must be a hand-crafted SVG in `src/components/icons/`.

---

## 6. Spacing & rhythm

### Custom vertical rhythm utilities

Sourced from `globals.css` (lines 62–80). These override Tailwind defaults:

| Class    | `padding-top` | `padding-bottom` | Mobile (`≤767px`)                  |
| -------- | ------------- | ---------------- | ---------------------------------- |
| `.py-19` | `8rem`        | `8rem`           | `3.5rem` / `3.5rem` (line 505–508) |
| `.py-20` | `4.8rem`      | `8rem`           | `3rem` / `5rem` (line 510–513)     |
| `.py-21` | `4.8rem`      | `8.7rem`         | `3rem` / `5rem` (line 515–518)     |
| `.py-24` | `8rem`        | `11.6rem`        | `4rem` / `5rem` (line 520–523)     |

Mobile breakpoint: `@media (max-width: 767px)` (from `globals.css` line 473).

### Container

- **Max-width:** `66em` — from `tailwind.config.js` (line 29, `maxWidth['7xl']`). Applied via `max-w-7xl` class.
- **Container utility:** No Tailwind `container` block is defined. Horizontal padding is applied per-section using `px-4 sm:px-6 lg:px-8`.
- **Standard page sections** use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (as seen in `src/app/page.tsx` line 103 and `src/app/contact/page.tsx` line 71).

### Custom horizontal padding overrides

From `globals.css` (lines 47–59):

| Class   | Value               |
| ------- | ------------------- |
| `.px-4` | `2rem` left + right |
| `.px-6` | `3rem` left + right |
| `.px-8` | `4rem` left + right |

---

## 7. Shape & elevation

### Signature card shadow

Used on `.service-card-shadow` — sourced from `globals.css` (line 184):

```css
box-shadow: -20px 24px 70px -6px rgba(0, 0, 0, 0.12);
```

The **negative X offset** (left and slightly upward) paired with a positive Y offset is deliberate — it creates the impression of light coming from the upper right, consistent across all card components. Never substitute a centred or symmetric shadow; this asymmetry is a brand-specific detail.

### Card hover shadow

Applied on `.service-card:hover .service-card-shadow` — sourced from `globals.css` (line 189):

```css
box-shadow: -2px 8px 15px -4px rgba(0, 0, 0, 0.18);
```

On hover the shadow tightens and becomes more opaque, conveying that the card has lifted toward the viewer.

### Border radius

Tailwind defaults apply. No custom border-radius tokens are defined — use standard utility classes (`rounded`, `rounded-lg`, etc.) consistent with the shadcn/ui component defaults.

### Elevation principle

Cards sit above the page surface via shadow, not via border or background colour change. The background remains white (`#FFFFFF`); depth is communicated through shadow alone.

---

## 8. Motion

All transitions are defined in `globals.css`. Use these exact curves — do not substitute generic `ease-in-out`.

### Named easing curves

| Name                          | Curve                                  | Duration | Source                       |
| ----------------------------- | -------------------------------------- | -------- | ---------------------------- |
| Shadow transition (rest→rest) | `cubic-bezier(0.5, 0.09, 0.7, 1)`      | `0.48s`  | `globals.css` line 185       |
| Slow background zoom          | `cubic-bezier(0.08, 0, 0.83, 1)`       | `20s`    | `globals.css` line 150       |
| Link underline reveal         | `cubic-bezier(0.21, 0.01, 0.47, 0.99)` | `0.28s`  | `globals.css` line 242       |
| Fast hover response           | `cubic-bezier(0.1, 0.09, 0.11, 1)`     | `0.4s`   | `globals.css` lines 190, 422 |

### Standard durations

| Duration | Used for                                                                      |
| -------- | ----------------------------------------------------------------------------- |
| `0.28s`  | Underline reveal on `.underlined::after`                                      |
| `0.4s`   | Card hover shadow change; contact form field focus                            |
| `0.48s`  | Card shadow departure (rest state)                                            |
| `20s`    | Slow image zoom on `.zoom-background`                                         |
| `0.2s`   | Navigation link colour transitions (from `src/components/Header.tsx` line 11) |

### When to animate

- **Image zoom:** hero carousel backgrounds use the 20 s slow zoom (`cubic-bezier(0.08, 0, 0.83, 1)`) via the `.zoom-background` / `.zoom-background.zoom` pattern (`globals.css` lines 135–155). The image scales from `1` to `1.25` (CSS variable `--scale: 1.25`, line 143).
- **Card shadow lift:** shadow transitions on hover convey physical depth.
- **Link underline reveal:** the `.underlined::after` pattern (`globals.css` lines 234–247) animates `width` from 100% to 0% on hover — the underline _retreats_, not advances.

### When not to animate

- Page transitions: keep calm, no slide or fade between routes.
- Content text: no animated entrance for body copy in static page sections.
- Avoid animations on elements where `prefers-reduced-motion: reduce` is active. Wrap motion in a `@media (prefers-reduced-motion: no-preference)` guard where possible. The shipping `globals.css` does not yet implement this guard; tracked as a future accessibility improvement.

---

## 9. Imagery & photography

### Observed assets in `public/img/`

| File                                              | Subject / purpose                     |
| ------------------------------------------------- | ------------------------------------- |
| `customerExperience.jpg`                          | Service hero — customer experience    |
| `automation.jpg`                                  | Service hero — operational efficiency |
| `analyse.jpg`                                     | Service hero — data & analytics       |
| `about_bg.jpg`                                    | About page hero background            |
| `contact_bg.jpg`                                  | Contact page hero background          |
| `services_bg.jpg`                                 | Services page hero background         |
| `blog_bg.jpg`                                     | Blog index hero background            |
| `service_1.jpg`, `service_2.jpg`, `service_3.jpg` | Service card thumbnails               |
| `feature_1.jpg`, `feature_2.jpg`, `feature_3.jpg` | Feature section images                |
| `blog_1.jpg`, `blog_2.jpg`, `blog_3.jpg`          | Blog post thumbnails                  |
| `default.jpg`                                     | Fallback image                        |
| `sharp_logo_w264.png`                             | Logo raster for OG/social             |

### Style direction

- **Tone:** warm, professional, real-world business contexts. Avoid generic stock imagery (no handshake clichés, no posed group photos against white backdrops).
- **Colour:** muted but present — images should not overwhelm the white layout.
- **Subjects:** technology in use, workspace environments, abstract data/network visuals, and contextual business settings.

### Colour overlay pattern (`.zoom-background`)

Dark pages and hero sections use a controlled overlay technique from `globals.css` (lines 135–155):

- Container background: `#121212` (near-black).
- Image opacity: `0.16` — the image reads as a very subtle texture behind the dark surface.
- Image scale: starts at `1`, zooms to `1.25` over 20 s on the `.zoom` class trigger.

This produces high contrast for white text placed on top. Do not increase image opacity above `0.25` — the dark surface must remain dominant.

### Aspect ratios in active use

- **Landscape 16:9 (approximately 1920 × 1080):** hero and background images.
- **Square 1:1:** `sharp_logo_w264.png` (264 × 264 px) used as social/OG image.
- **Service card image:** `height: 11rem` fixed, `width: 100%`, `object-fit: cover` (from `globals.css` lines 202–210).

---

## 10. Composition & hierarchy

### Hero headline pattern

`text-5xl` (5 rem, line-height `1.32`, font-weight `200`) from `tailwind.config.js` (line 26). The ultra-light weight is deliberate — it creates airiness and contrasts with the bold red accent. The combination reads as confident without being aggressive.

### Red accent placement

The primary red (`#D41F21`) is used as a text accent in exactly three contexts:

1. **`<span>` inside `.content-title`, `.content-text`, `.content-card-title`, `.content-card-description`** — from `globals.css` (lines 321–326):
   ```css
   .content-title > span,
   .content-text > span,
   .content-card-title > span,
   .content-card-description > span {
     color: var(--primaryColor);
   }
   ```
2. **`.page-header-details`** — from `globals.css` (line 367): `color: var(--primaryColor); font-size: 1.11rem;`. Used for metadata line (e.g., page category or date) above the main hero title.
3. **Primary buttons and CTAs** — background `#D41F21` with white text.

Red must not appear in body paragraphs, navigation links (except the active state), or footer text.

### Asymmetric intro grid

The `.intro-container` class applies a non-standard two-column split — sourced from `globals.css` (line 170):

```css
.intro-container {
  grid-template-columns: repeat(1, 0.444fr 1fr) !important;
}
```

The `0.444fr` narrow column (roughly 4:9 ratio) is a brand-specific proportion. It places a logo or visual anchor in a deliberately undersized left column, giving the text column visual dominance. On mobile (`≤767px`) this collapses to a single `1fr` column (from `globals.css` line 474–476).

### Navigation height

The site header is `h-20` (80 px) (`src/components/Header.tsx` line 27). Logo renders at `h-10` (40 px) within that header (line 36). Navigation links use Manrope (`font-heading`) at `text-base` weight.

### Gradient footer

The footer background uses `bg-gradient-to-br from-charcoal via-gray-950 to-charcoal` (from `src/components/Footer.tsx` line 7), producing a near-black surface that frames the white page content cleanly.

---

## 11. Accessibility

### Contrast requirements

WCAG 2.1 Level AA is the minimum standard for all shipping UI.

| Combination            | Ratio   | AA normal | AA large | AAA normal |
| ---------------------- | ------- | --------- | -------- | ---------- |
| `#D41F21` on `#FFFFFF` | ~5.0:1  | ✓         | ✓        | ✗          |
| `#FFFFFF` on `#D41F21` | ~5.0:1  | ✓         | ✓        | ✗          |
| `#333333` on `#FFFFFF` | ~12.6:1 | ✓         | ✓        | ✓          |
| `#FFFFFF` on `#333333` | ~12.6:1 | ✓         | ✓        | ✓          |
| `#D41F21` on `#333333` | ~2.4:1  | ✗         | ✗        | ✗          |

**Primary red on white passes AA** for normal text (5.0:1 > 4.5:1). This permits use on body-size text when the intent is an accent span — but do not use red as continuous body text.

### Minimum text sizes

- **Web:** 14 px (0.875 rem) minimum for any readable text. The smallest text in the current codebase is `0.7rem` in contact form error messages (`globals.css` line 448) — this should be reviewed.
- **Print / PDF:** 9 pt minimum.

### Focus states

All interactive elements require visible focus states. The `Layout.tsx` component includes a skip-navigation link (`src/components/Layout.tsx` lines 13–18):

```html
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 z-50"
>
  Skip to main content
</a>
```

Focus ring on the mobile menu button uses `focus:ring-2 focus:ring-inset focus:ring-primary` (`src/components/Header.tsx` line 73). Ensure all shadcn/ui interactive components maintain equivalent focus visibility.

### Motion / vestibular

Wrap significant animations in `@media (prefers-reduced-motion: no-preference)`. The 20 s background zoom is the most likely candidate to cause discomfort for users with vestibular disorders.

---

## 12. Token reference

Machine-readable token definitions. All values verified against `tailwind.config.js` and `globals.css`. Use this block as the single source for automated tooling.

```json
{
  "color": {
    "primary": "#D41F21",
    "primary-hover": "#BC1B1D",
    "primary-active": "#A41719",
    "charcoal": "#333333",
    "white": "#FFFFFF"
  },
  "typography": {
    "heading": "Manrope",
    "body": "Inter",
    "scale": {
      "lg": "1rem",
      "xl": "1.22rem",
      "2xl": "1.68rem",
      "4xl": "2.6rem",
      "5xl": "5rem"
    }
  },
  "spacing": {
    "container-max": "66em",
    "container-padding": "2rem"
  },
  "shadow": {
    "card": "-20px 24px 70px -6px rgba(0,0,0,0.12)",
    "card-hover": "-2px 8px 15px -4px rgba(0,0,0,0.18)"
  },
  "motion": {
    "ease-shadow": "cubic-bezier(0.5, 0.09, 0.7, 1)",
    "ease-zoom": "cubic-bezier(0.08, 0, 0.83, 1)",
    "ease-underline": "cubic-bezier(0.21, 0.01, 0.47, 0.99)",
    "ease-hover": "cubic-bezier(0.1, 0.09, 0.11, 1)"
  }
}
```

**Source files:**

- `tailwind.config.js` — colours (lines 10–15), typography stack (lines 16–20), type scale (lines 21–27), max-width (lines 28–30). No `container` block is defined.
- `src/app/layout.tsx` — Google Fonts loading via `next/font/google` (lines 2, 6–14), font CSS variables applied to `<body>` (line 83).
- `globals.css` — spacing utilities (lines 62–80), shadow definitions (lines 184–190), motion curves (lines 150, 185, 190, 242), overlay pattern (lines 135–155), grid composition (line 170), red accent rules (lines 321–326, 367).
