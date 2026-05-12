# Visual Design System

> **Brand-level visual rules live in [`brand/foundations.md`](brand/foundations.md).** This document is the **web implementation reference** — Tailwind class mappings, component CSS, web-specific WCAG verification. When this doc and `brand/foundations.md` disagree, foundations wins.

---

## Color Tokens — Tailwind Mappings

All values sourced from `tailwind.config.js`. For hex values, extended palette, semantic colors, and WCAG contrast pairings, see [`brand/foundations.md`](brand/foundations.md) §2.

### Primary Palette

- **Primary Red**: `#D41F21`
  - Usage: Primary CTAs, links, accent elements
  - Hover: `#BC1B1D` (Tailwind `bg-primary-hover`)
  - Active: `#A41719` (Tailwind `bg-primary-active`)
  - Contrast: White text (`#FFFFFF`)
  - WCAG AA: ~5.0:1 contrast ratio against white
  - **Tailwind**: `bg-primary`, `text-primary`, `border-primary`

- **Charcoal Text**: `#333333`
  - Usage: Primary text, headings, body copy
  - Contrast: White background (`#FFFFFF`) — ~12.6:1
  - **Tailwind**: `bg-charcoal`, `text-charcoal`, `border-charcoal`

- **Pure White**: `#FFFFFF`
  - Usage: Page backgrounds, card surfaces, contrast text on dark backgrounds
  - **Tailwind**: `bg-white`, `text-white`, `border-white`

### Neutral Colors

- **Light Gray**: `#F8F9FA` — Section backgrounds, card backgrounds — **Tailwind**: `bg-gray-50`
- **Medium Gray**: `#6C757D` — Secondary text, placeholders — **Tailwind**: `text-gray-500`
- **Dark Gray**: `#495057` — Tertiary text, borders — **Tailwind**: `text-gray-600`
- **Border Gray**: `#DEE2E6` — Borders, dividers — **Tailwind**: `border-gray-200`

### WCAG Web-Component Verification

Full contrast pairings in [`brand/foundations.md`](brand/foundations.md) §11. Web-component-specific notes:

- Primary red (`#D41F21`) on white: ~5.0:1 — passes AA for normal text and large text. Permitted for CTA buttons, accent spans, and nav active state.
- Charcoal on white: ~12.6:1 — passes AAA. Default for body text and headings.
- Do **not** place primary red on charcoal — ~2.4:1, fails AA at all sizes.

---

## Typography — Tailwind Mappings

Fonts are loaded via `next/font/google` in `src/app/layout.tsx`. For typeface specifications, weight rationale, and the full type scale sourced from `tailwind.config.js`, see [`brand/foundations.md`](brand/foundations.md) §3.

### Font Tokens

- **Headings**: Manrope — **Tailwind**: `font-heading`
- **Body**: Inter — **Tailwind**: `font-body`
- **UI / micro-copy**: Inter — **Tailwind**: `font-sans`

No `font-mono` token defined; for code formatting use the system monospace stack inline.

### Desktop Typography Scale

| Tag | Tailwind class                        | Size / line-height                    | Source           |
| --- | ------------------------------------- | ------------------------------------- | ---------------- |
| H1  | `text-5xl font-heading leading-tight` | 5rem / 1.32                           | custom config    |
| H2  | `text-4xl font-heading leading-tight` | 2.6rem / 1.224                        | custom config    |
| H3  | `text-3xl font-heading leading-snug`  | 1.875rem / 2.25rem (Tailwind default) | Tailwind default |
| H4  | `text-2xl font-heading leading-snug`  | 1.68rem                               | custom config    |
| H5  | `text-xl font-heading leading-normal` | 1.22rem / line-height 1.485           | custom config    |
| H6  | `text-lg font-heading leading-normal` | 1rem, weight 410                      | custom config    |

### Body Text Scale

- **Body Large**: `text-lg font-body leading-relaxed` (1rem per `tailwind.config.js`)
- **Body Regular**: `text-base font-body leading-normal`
- **Body Small**: `text-sm font-body leading-snug`
- **Caption**: `text-xs font-body leading-snug`

### Mobile Typography Scale

Apply responsive prefixes to scale down 15–20% on mobile:

- **H1**: `text-4xl md:text-5xl font-heading leading-tight`
- **H2**: `text-3xl md:text-4xl font-heading leading-tight`
- **H3**: `text-2xl md:text-3xl font-heading leading-snug`
- **H4**: `text-xl md:text-2xl font-heading leading-snug`
- **H5**: `text-lg md:text-xl font-heading leading-normal`
- **H6**: `text-base md:text-lg font-heading leading-normal`

### Typography Usage

- Headings: sentence case; max 2–3 heading levels per page; `mt-8 mb-4` for standard margins
- Body: 16px minimum; paragraph spacing `mb-4`
- Links: `text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`

---

## Component Library

### Buttons

#### Primary Button

- **Background**: `bg-primary` (`#D41F21`)
- **Text**: `text-white`
- **Font**: `font-heading text-base`
- **Padding**: `px-6 py-3` (12px 24px)
- **Border Radius**: `rounded` (6px)
- **Hover**: `hover:bg-primary-hover` (`#BC1B1D`)
- **Active**: `active:bg-primary-active` (`#A41719`)
- **Tailwind**: `bg-primary text-white font-heading text-base px-6 py-3 rounded hover:bg-primary-hover active:bg-primary-active disabled:opacity-50 transition-colors duration-200`

#### Secondary Button

- **Background**: `bg-transparent`
- **Text**: `text-primary`
- **Border**: `border-2 border-primary`
- **Hover**: Primary background, white text
- **Tailwind**: `bg-transparent text-primary border-2 border-primary font-heading text-base px-6 py-2.5 rounded hover:bg-primary hover:text-white active:bg-primary-active transition-colors duration-200`

#### Tertiary Button

- **Background**: `bg-transparent`
- **Text**: `text-charcoal`
- **Hover**: Light Gray background
- **Tailwind**: `bg-transparent text-charcoal font-heading text-base px-4 py-2 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200`

#### Button Sizes

- **Large**: `text-lg px-8 py-4`
- **Regular**: `text-base px-6 py-3`
- **Small**: `text-sm px-4 py-2`

---

### Form Elements

#### Input Fields

- **Tailwind**: `bg-white border border-gray-200 rounded px-4 py-3 font-body text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`
- **Error State**: `border-error text-error focus:ring-error focus:border-error`

#### Select Dropdowns

- **Tailwind**: `bg-white border border-gray-200 rounded px-4 py-3 font-body text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none`

#### Checkboxes & Radio Buttons

- **Checkbox**: `w-4 h-4 border-2 border-gray-200 rounded text-primary focus:ring-primary focus:ring-2`
- **Radio**: `w-4 h-4 border-2 border-gray-200 rounded-full text-primary focus:ring-primary focus:ring-2`

#### Labels

- **Tailwind**: `block font-heading text-sm font-semibold text-charcoal mb-2`
- **Required Asterisk**: `text-error`

---

### Cards

#### Basic Card

- **Tailwind**: `bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`

#### Service Card

The `.service-card-shadow` CSS class applies the brand signature shadow (source: `globals.css` line 184):

```css
box-shadow: -20px 24px 70px -6px rgba(0, 0, 0, 0.12);
```

On hover (`.service-card:hover .service-card-shadow`):

```css
box-shadow: -2px 8px 15px -4px rgba(0, 0, 0, 0.18);
```

Shadow transition uses two distinct easing curves (source: `globals.css` lines 185 and 190):

- **Entry** (rest state): `transition: box-shadow 0.48s cubic-bezier(0.5, 0.09, 0.7, 1)` — gradual deceleration into the large ambient shadow
- **Return** (hover state): `transition: box-shadow 0.4s cubic-bezier(0.1, 0.09, 0.11, 1)` — fast initial pull, then near-linear settle into the tighter hover shadow

See also [`brand/foundations.md`](brand/foundations.md) §8 for motion rationale.

- **Tailwind base**: `bg-white border border-gray-200 p-8 service-card-shadow transition-shadow`
- **Icon**: `w-12 h-12 mb-4`
- **Title**: `text-2xl font-heading leading-snug text-charcoal mb-4`
- **Description**: `text-base font-body leading-normal text-charcoal mb-6`

#### Blog Card

- **Container**: `bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden rounded-lg`
- **Image**: `w-full aspect-video object-cover`
- **Content**: `p-6`
- **Title**: `text-xl font-heading leading-normal text-charcoal mb-2`
- **Excerpt**: `text-sm font-body leading-snug text-charcoal mb-4`
- **Meta**: `text-xs font-body leading-snug text-gray-500`

---

### Navigation

#### Header Navigation

- **Container**: `bg-white border-b border-gray-200 h-20 flex items-center justify-between px-6 lg:px-8`
- **Logo**: `h-10 w-auto` (40px height per `src/components/Header.tsx` line 36)
- **Nav Links wrapper**: `hidden md:flex space-x-8`
- **Link**: `font-heading text-base text-charcoal hover:text-primary transition-colors duration-200`
- **Active Link**: `font-heading text-base text-primary`
- **Mobile Menu**: `md:hidden`

#### Footer Navigation

- **Container**: `bg-gradient-to-br from-charcoal via-gray-950 to-charcoal py-12 px-6 lg:px-8`
- **Links**: `font-body text-sm text-gray-600 hover:text-primary transition-colors duration-200`

---

### Alerts & Messages

#### Success Message

- **Tailwind**: `bg-green-50 border border-success text-green-800 px-5 py-4 flex items-center space-x-3`
- **Icon**: `w-5 h-5 text-success`

#### Warning Message

- **Tailwind**: `bg-yellow-50 border border-warning text-yellow-800 px-5 py-4 flex items-center space-x-3`
- **Icon**: `w-5 h-5 text-warning`

#### Error Message

- **Tailwind**: `bg-red-50 border border-error text-red-800 px-5 py-4 flex items-center space-x-3`
- **Icon**: `w-5 h-5 text-error`

---

## Spacing & Grid System

### Spacing Scale (Base Unit: 4px)

| px  | rem     | Tailwind |
| --- | ------- | -------- |
| 4   | 0.25rem | `1`      |
| 8   | 0.5rem  | `2`      |
| 12  | 0.75rem | `3`      |
| 16  | 1rem    | `4`      |
| 20  | 1.25rem | `5`      |
| 24  | 1.5rem  | `6`      |
| 32  | 2rem    | `8`      |
| 40  | 2.5rem  | `10`     |
| 48  | 3rem    | `12`     |
| 64  | 4rem    | `16`     |
| 80  | 5rem    | `20`     |

### Custom Vertical Rhythm (globals.css overrides)

See [`brand/foundations.md`](brand/foundations.md) §6 for the full table. Key custom classes:

| Class    | Padding-top / bottom | Mobile (≤767px)     |
| -------- | -------------------- | ------------------- |
| `.py-19` | `8rem` / `8rem`      | `3.5rem` / `3.5rem` |
| `.py-20` | `4.8rem` / `8rem`    | `3rem` / `5rem`     |
| `.py-21` | `4.8rem` / `8.7rem`  | `3rem` / `5rem`     |
| `.py-24` | `8rem` / `11.6rem`   | `4rem` / `5rem`     |

### Common Spacing Patterns

- **Component Padding**: `p-4` to `p-6` (16px–24px)
- **Section Padding**: `py-12` to `py-20` (48px–80px)
- **Element Margins**: `mb-4` to `mb-8` (16px–32px)
- **Card Gaps**: `gap-6` to `gap-8` (24px–32px)

### Grid System

#### Container

- **Max-width**: `max-w-7xl mx-auto` (66em per `tailwind.config.js`)
- **Page sections**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Narrow**: `max-w-4xl mx-auto` (800px)
- **Text column**: `max-w-2xl mx-auto` (600px)

#### Layout Patterns

- **Two Column (8/4)**: `grid grid-cols-1 lg:grid-cols-3 gap-6`
- **Two Column (6/6)**: `grid grid-cols-1 lg:grid-cols-2 gap-6`
- **Three Column**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Four Column**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
- **Sidebar (8/4)**: `grid grid-cols-1 lg:grid-cols-4 gap-6` with `lg:col-span-3` / `lg:col-span-1`
- **Asymmetric intro**: `.intro-container` applies `grid-template-columns: repeat(1, 0.444fr 1fr)` (collapses to single column on mobile)

#### Responsive Breakpoints

| Breakpoint   | Width   | Tailwind prefix |
| ------------ | ------- | --------------- |
| xs (default) | 320px+  | (none)          |
| sm           | 576px+  | `sm:`           |
| md           | 768px+  | `md:`           |
| lg           | 1024px+ | `lg:`           |
| xl           | 1200px+ | `xl:`           |

#### Component Responsive Behavior

- **Typography**: `text-2xl md:text-3xl lg:text-4xl`
- **Buttons**: Full width on mobile — `w-full md:w-auto`
- **Cards**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Navigation**: `hidden md:flex` (desktop nav) + `md:hidden` (mobile menu)

---

## TailwindCSS Configuration Reference

### Custom Colors (tailwind.config.js)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#D41F21',
        'primary-hover': '#BC1B1D',
        'primary-active': '#A41719',
        charcoal: '#333333',
      },
    },
  },
};
```

### Custom Typography (tailwind.config.js)

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Manrope', 'Inter', 'sans-serif'],
        body: ['Inter', 'serif'],
        sans: ['Inter', 'sans-serif'],
        // No mono family defined — for code formatting use the system monospace stack inline
      },
    },
  },
};
```

Fonts are loaded via `next/font/google` in `src/app/layout.tsx`. Legacy webfont assets in `public/font/` are no longer loaded — do not reference them in new work. See [`brand/foundations.md`](brand/foundations.md) §3.

### Shadcn/UI Configuration (components.json)

```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Shadcn/UI Component Overrides

- **Button**: `bg-primary hover:bg-primary-hover`
- **Input**: `border-gray-200 focus:border-primary focus:ring-primary`
- **Card**: `bg-white border-gray-200 shadow-sm hover:shadow-md`
- **Badge**: `bg-success text-white` or `bg-warning text-charcoal`

---

## Quality Assurance

### Design Review Checklist

- [ ] Brand colors used correctly (primary `#D41F21`, not legacy value)
- [ ] Typography hierarchy followed (`font-heading` for headings, `font-body` for copy)
- [ ] Spacing system applied consistently
- [ ] WCAG AA contrast met for all text — verify against [`brand/foundations.md`](brand/foundations.md) §11
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility tested

### Accessibility Checklist

- [ ] Keyboard navigation works for all interactive elements
- [ ] ARIA labels present on icon-only buttons and form controls
- [ ] Touch targets minimum 44px (use `min-h-[44px] min-w-[44px]`)
- [ ] Color is not the sole indicator for state (add icon or text label alongside color)
- [ ] Focus states visible (`focus:ring-2 focus:ring-primary`)
- [ ] Motion: wrap significant animations in `@media (prefers-reduced-motion: no-preference)`

### Performance Notes

- Fonts are served via `next/font/google` — no manual `<link>` tags needed
- Tree-shake unused Shadcn/UI components — import only what's used
- Use `next/image` for all imagery to get automatic optimisation
