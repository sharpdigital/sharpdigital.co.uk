# SEO & Usability Audit — sharpdigital.co.uk

**Audited:** 29 April 2026  
**Branch:** `seo-usability-review`  
**Tool:** Lighthouse 13.1 (headless Chrome) + manual code review

---

## 1. Lighthouse Scores

| Page                                     | Performance | Accessibility | Best Practices |    SEO    |
| ---------------------------------------- | :---------: | :-----------: | :------------: | :-------: |
| `/` (Home)                               |  **72** 🟡  |   **93** 🟢   |   **100** 🟢   | **92** 🟢 |
| `/blog/customer-experience-optimization` |  **86** 🟢  |   **96** 🟢   |   **100** 🟢   | **85** 🟡 |
| `/services/customer-experience`          |  **83** 🟢  |   **96** 🟢   |   **100** 🟢   | **92** 🟢 |

> 🟢 90–100 · 🟡 50–89 · 🔴 0–49

---

## 2. Core Web Vitals

### Home (`/`)

| Metric                       | Value     | Score  |
| ---------------------------- | --------- | ------ |
| First Contentful Paint       | 1.3 s     | 🟢 98  |
| **Largest Contentful Paint** | **7.9 s** | 🔴 3   |
| Total Blocking Time          | 20 ms     | 🟢 100 |
| Cumulative Layout Shift      | 0         | 🟢 100 |
| Speed Index                  | 4.8 s     | 🟡 67  |
| Time to Interactive          | 8.0 s     | 🟡 42  |

### Blog post (`/blog/customer-experience-optimization`)

| Metric                       | Value     | Score  |
| ---------------------------- | --------- | ------ |
| First Contentful Paint       | 0.9 s     | 🟢 100 |
| **Largest Contentful Paint** | **4.2 s** | 🟡 45  |
| Total Blocking Time          | 10 ms     | 🟢 100 |
| Cumulative Layout Shift      | 0         | 🟢 100 |
| Speed Index                  | 1.7 s     | 🟢 100 |
| Time to Interactive          | 4.2 s     | 🟡 85  |

### Service page (`/services/customer-experience`)

| Metric                       | Value     | Score  |
| ---------------------------- | --------- | ------ |
| First Contentful Paint       | 1.2 s     | 🟢 99  |
| **Largest Contentful Paint** | **4.3 s** | 🟡 42  |
| Total Blocking Time          | 20 ms     | 🟢 100 |
| Cumulative Layout Shift      | 0         | 🟢 100 |
| Speed Index                  | 4.1 s     | 🟡 79  |
| Time to Interactive          | 4.3 s     | 🟡 84  |

> **LCP is the biggest problem across all pages.** WCAG target is ≤ 2.5 s. The home page at 7.9 s is critical.

---

## 3. Issues by Severity

### 🔴 Critical — Broken Functionality

| #   | Issue                                                                                    | Location           | Impact        |
| --- | ---------------------------------------------------------------------------------------- | ------------------ | ------------- |
| 1   | **`/terms` page missing** — footer link returns 404                                      | `Footer.tsx:12`    | Legal & trust |
| 2   | **`/privacy` page missing** — footer link returns 404                                    | `Footer.tsx:18`    | Legal & GDPR  |
| 3   | **`/llm.txt` route missing** — footer link returns 404 (no public file or route handler) | `Footer.tsx:24`    | Broken link   |
| 4   | **Placeholder Google/Yandex verification codes** — Search Console won't verify           | `layout.tsx:58–61` | SEO indexing  |

---

### 🟠 High — Performance

| #   | Issue                                                                                                                                                             | Pages Affected        | Est. Saving |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| 5   | **LCP 7.9 s on home** — Carousel background images are plain `<img>` via CSS `backgroundImage`, bypassing Next.js optimisation (no srcset, no WebP, no lazy load) | Home                  | Major       |
| 6   | **Image cache TTL only 10 minutes** — GitHub Pages serves images with `Cache-Control: max-age=600`. All large images re-download on every visit                   | All                   | 1,404 KB    |
| 7   | **Service card images not optimised** — `service_1.jpg` (284 KB) could save 264 KB; `service_2.jpg` 62 KB savings                                                 | Home, Services        | 365 KB      |
| 8   | **Page redirect adds 760–780 ms** — Each page load has an extra redirect before the HTML is served                                                                | Blog, Services        | 760–780 ms  |
| 9   | **Render-blocking CSS** — Two Next.js CSS bundles block initial render                                                                                            | All                   | 130 ms      |
| 10  | **Unused JavaScript** — ~62 KB of JS loaded but not used on page load                                                                                             | All                   | 62 KB       |
| 11  | **Legacy JavaScript** — ~12 KB of ES5 polyfills sent to modern browsers                                                                                           | All                   | 12 KB       |
| 12  | **Hero logo missing `priority` prop** — Above-the-fold Next.js `<Image>` lazy loads by default                                                                    | Home (`page.tsx:107`) | LCP         |

---

### 🟠 High — SEO

| #   | Issue                                                                                                                      | Location                                           | Impact            |
| --- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------- |
| 13  | **Missing canonical URLs on blog posts** — Lighthouse confirms no `rel=canonical`                                          | `blog/[slug]/page.tsx`                             | Duplicate content |
| 14  | **Missing canonical URLs on service detail pages**                                                                         | `services/[slug]/page.tsx`                         | Duplicate content |
| 15  | **Missing canonical URLs on tag pages**                                                                                    | `blog/tag/[tag]/page.tsx`                          | Duplicate content |
| 16  | **Generic link text** — 6 links on home read "Learn More" or "Read More". Search engines use link text as a ranking signal | `CardSection.tsx`                                  | SEO signal loss   |
| 17  | **Missing Open Graph images on dynamic pages** — Social shares show no preview image for blog posts or service pages       | `blog/[slug]`, `services/[slug]`, `blog/tag/[tag]` | Social CTR        |

---

### 🟡 Medium — Accessibility

| #   | Issue                                                                                                                                                                                   | Detail                                | WCAG             |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------- |
| 18  | **Insufficient colour contrast on primary red buttons** — `#ed2224` on `#ffffff` gives 4.32:1 (needs 4.5:1). Affects nav Contact button, carousel CTA, and service card secondary links | `AnimButton`, `globals.css`           | 1.4.3 AA         |
| 19  | **Insufficient colour contrast on `.service-card-details`** — `#999999` with `opacity: 0.5` applied yields ~2.84:1 (needs 4.5:1)                                                        | `globals.css` `.service-card-details` | 1.4.3 AA         |
| 20  | **Carousel indicator buttons too small** — Touch targets are below the 24×24 px minimum (WCAG 2.5.8). Affects all three slide dots                                                      | `carousel.css` `.carousel-indicator`  | 2.5.8 AA         |
| 21  | **Missing Article schema on blog posts** — No structured data for rich snippets (author, datePublished, etc.)                                                                           | `blog/[slug]/page.tsx`                | SEO/rich results |

---

### 🔵 Low — Best Practices

| #   | Issue                                                                                                                                                                      | Location                |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| 22  | **Missing `BreadcrumbList` JSON-LD schema** — Missed rich snippet opportunity on inner pages                                                                               | All pages               |
| 23  | **Carousel background images bypass Next.js `<Image>`** — No srcset, no WebP conversion, no size hints                                                                     | `Carousel.tsx:64`       |
| 24  | **`ZoomBackground` uses plain `<img>`** — Same issue as carousel; not optimised. Carries `alt=""` which is valid for decorative images but could carry descriptive context | `ZoomBackground.tsx:13` |
| 25  | **Missing `loading="lazy"` and `fetchpriority`** — Service card images below the fold don't declare lazy loading explicitly                                                | `ServiceCard.tsx`       |
| 26  | **Card titles not clickable** — Service and blog card `<h3>` titles are plain text; only the image and button link to the detail page                                      | `ServiceCard.tsx:75`    |

---

## 4. Detailed Findings

### 4.1 LCP Root Cause (Home — 7.9 s)

The home page carousel background images are set via CSS `backgroundImage: url(...)` inside a React inline style. This means:

- The browser cannot discover or preload them from the HTML
- Next.js `<Image>` optimisation (WebP, srcset, responsive sizes) is not applied
- No `<link rel="preload">` hint is generated

**Fix:** Add `<link rel="preload">` for the first slide image in the `<head>`, or replace the CSS background with a Next.js `<Image>` positioned absolutely inside the slide.

### 4.2 Colour Contrast

Three distinct contrast failures:

| Element                          | FG colour               | BG colour | Ratio   | Required |
| -------------------------------- | ----------------------- | --------- | ------- | -------- |
| Primary button text (AnimButton) | `#ffffff`               | `#ed2224` | 4.32:1  | 4.5:1    |
| Service card secondary link      | `#ed2224`               | `#ffffff` | 4.32:1  | 4.5:1    |
| Service card details text        | `#999999` @ opacity 0.5 | `#ffffff` | ~2.84:1 | 4.5:1    |

The red `#ed2224` is 0.18 points short of AA. Darkening it slightly to `#d41f21` achieves 4.55:1 while remaining visually red.

### 4.3 Generic Link Text

Lighthouse flagged 6 links on the home page with non-descriptive text:

| Link destination                          | Current text |
| ----------------------------------------- | ------------ |
| `/services/customer-experience/`          | "Learn More" |
| `/services/operational-efficiency/`       | "Learn More" |
| `/services/data-and-analytics/`           | "Learn More" |
| `/blog/ai-strategy-implementation-guide/` | "Read More"  |
| `/blog/customer-experience-optimization/` | "Read More"  |
| `/blog/data-driven-decision-making/`      | "Read More"  |

**Fix:** Make link text descriptive (e.g. "Learn more about Customer Experience" or use `aria-label`).

### 4.4 Redirect Penalty (Blog & Services)

Blog and service pages incur a ~780 ms redirect before serving HTML. This may be a `www` → non-`www` (or vice-versa) redirect at the CDN/GitHub Pages level. Investigate and ensure the canonical domain is accessed directly.

### 4.5 Missing Pages (404s)

| Route      | Linked from | Status                                     |
| ---------- | ----------- | ------------------------------------------ |
| `/terms`   | Footer      | 404 — no `src/app/terms/page.tsx`          |
| `/privacy` | Footer      | 404 — no `src/app/privacy/page.tsx`        |
| `/llm.txt` | Footer      | 404 — no `public/llm.txt` or route handler |

---

## 5. Recommendations — Priority Order

1. **Fix dead footer links** (`/terms`, `/privacy`, `/llm.txt`) — legal and usability blocker
2. **Replace placeholder verification codes** in `layout.tsx` — unlock Search Console data
3. **Add canonical URLs** to `blog/[slug]`, `services/[slug]`, `blog/tag/[tag]` — prevent duplicate content penalty
4. **Preload first carousel image** or convert to Next.js `<Image>` — fix 7.9 s LCP on home
5. **Darken primary red** from `#ed2224` to `#d41f21` — pass WCAG AA contrast
6. **Fix `.service-card-details` opacity** — increase text colour so effective contrast ≥ 4.5:1 without opacity trick
7. **Increase carousel indicator touch targets** to at least 24×24 px
8. **Add OG images to dynamic pages** — improve social sharing CTR
9. **Make "Learn More" / "Read More" links descriptive** — SEO signal + accessibility
10. **Add `priority` to above-the-fold images** (hero logo, first carousel slide)
11. **Add `Article` JSON-LD schema** to blog post pages
12. **Investigate redirect** on blog/service pages — remove extra round trip
13. ✅ **Make card titles clickable links** — `ServiceCard.tsx` title now links to detail page (fixed)

---

## 6. What's Working Well

- ✅ No layout shift (CLS = 0 across all pages)
- ✅ Excellent TBT (10–20 ms) — no heavy main-thread work
- ✅ FCP is fast (0.9–1.3 s) — HTML and critical CSS arrive quickly
- ✅ Best Practices score 100 on all pages
- ✅ Sitemap covers all routes with correct domain
- ✅ Robots.txt properly configured
- ✅ Organization JSON-LD schema on homepage
- ✅ All form inputs have associated `<label>` elements
- ✅ Carousel indicators have `aria-label` and `aria-selected`
- ✅ `<main id="main-content">` landmark present (skip link works)
- ✅ `trailingSlash: true` consistently applied

---

_Generated by Claude Code · Lighthouse 13.1 · 29 April 2026_
