# Cookie consent banner + GTM Consent Mode v2 — design

**Issue:** [#59](https://github.com/sharpdigital/sharpdigital.co.uk/issues/59)
**Date:** 2026-05-21
**Status:** Design — awaiting user review

## Goal

Add a UK-PECR / UK-GDPR–compliant cookie consent system to sharpdigital.co.uk so that no non-essential cookies are set, and no analytics requests are sent, until the visitor has given explicit consent.

In passing, fix an unrelated-but-related issue discovered during exploration: GA4 is currently being hit **twice per page load** (once via direct `gtag.js` in `layout.tsx`, once via a Google Tag inside the GTM container) — double-counting traffic.

## Decisions made during brainstorming

| Decision                              | Choice                                                                                 | Rationale                                                                                                                                                                                                                              |
| ------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Remove duplicate GA4 install path     | Delete direct `gtag.js` from `layout.tsx`; route GA4 only through GTM                  | GTM container already has a properly configured Google Tag pointing at `G-LTTYDCF3WC` (verified by fetching the published container). Removes double-counting; fits the issue's "consent gates everything through GTM" mental model.   |
| Banner placement                      | Full-width fixed-bottom bar (charcoal background, white text)                          | User preference. Pragmatic interpretation of the "no content covered on mobile" AC — banner overlays without permanent layout shift.                                                                                                   |
| Returning-visitor consent restoration | Both inline `beforeInteractive` script **and** `useEffect` fallback in `ConsentBanner` | Belt-and-braces: inline script handles the fast path inside GTM's 500ms `wait_for_update` window; `useEffect` covers the rare case where the inline script raced. Both calls are idempotent.                                           |
| Implementation structure              | Approach 2 — pure logic in `lib/consent.ts`, UI in components                          | Right level of separation for ~120 LOC. Logic is unit-testable without React. Two consumers (banner + withdraw button) share helpers — no localStorage-key drift.                                                                      |
| Test framework                        | Playwright E2E only (no Vitest in this PR)                                             | All critical acceptance criteria are observable browser behaviors (network requests, cookies, real localStorage, mobile layout). One test runner. Foundation for future E2E work. Unit tests for `consent.ts` deferred to a follow-up. |
| Test matrix                           | Chromium + WebKit (Safari)                                                             | ~30% of UK traffic is iOS Safari. User explicitly requested.                                                                                                                                                                           |

## Architecture

```
                      ┌──────────────────────────────────────────────┐
   Page load          │  src/app/layout.tsx (Server Component)        │
   ───────────►       │                                                │
                      │  <head>                                        │
                      │   [1] <Script beforeInteractive id=            │
                      │        "consent-default">                      │
                      │         gtag('consent','default',{all denied,  │
                      │              wait_for_update: 500})            │
                      │                                                │
                      │   [2] <Script beforeInteractive id=            │
                      │        "consent-restore">                      │
                      │         read localStorage 'sharp.consent.v1'   │
                      │         if granted → gtag('consent','update',…)│
                      │                                                │
                      │   [3] <Script beforeInteractive id="gtm-init"> │
                      │         (existing GTM loader, unchanged)       │
                      │                                                │
                      │   ⊘ direct gtag.js snippet REMOVED             │
                      │  </head>                                       │
                      │                                                │
                      │  <body>                                        │
                      │    {children}                                  │
                      │    <ConsentBanner /> ◄── client component      │
                      │  </body>                                       │
                      └──────────────────────────────────────────────┘
                                       │
                                       │ imports
                                       ▼
                      ┌──────────────────────────────────────────────┐
                      │  src/lib/consent.ts (pure, no React)          │
                      │   • CONSENT_KEY, CONSENT_VERSION              │
                      │   • readConsent(): StoredConsent | null       │
                      │   • writeConsent(choice: 'granted'|'denied')  │
                      │   • pushConsentUpdate(choice)                 │
                      │   • clearConsent()                            │
                      └──────────────────────────────────────────────┘
                                       ▲
                                       │ used by
                       ┌───────────────┴────────────────┐
                       │                                │
   ┌──────────────────────────────┐   ┌──────────────────────────────┐
   │ src/components/              │   │ src/components/              │
   │   ConsentBanner.tsx          │   │   WithdrawConsentButton.tsx  │
   │   (client)                   │   │   (client)                   │
   │   shown when no choice yet   │   │   mounted in /privacy page   │
   └──────────────────────────────┘   └──────────────────────────────┘
                                                   ▲
                                                   │ rendered in
                                       ┌──────────────────────────────┐
                                       │ src/app/privacy/page.tsx     │
                                       │  + new "Cookies we set"      │
                                       │    section + button          │
                                       └──────────────────────────────┘
```

## Files

| File                                       | State           | Purpose                                                                                                                      |
| ------------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/consent.ts`                       | new             | Pure helpers: read/write/clear localStorage, push consent update to dataLayer                                                |
| `src/components/ConsentBanner.tsx`         | new             | Client component — bottom bar with Accept/Reject buttons                                                                     |
| `src/components/WithdrawConsentButton.tsx` | new             | Client island for the `/privacy` page — clears stored consent                                                                |
| `src/app/layout.tsx`                       | modified        | Remove direct gtag.js; add `consent-default` + `consent-restore` scripts; mount banner                                       |
| `src/app/privacy/page.tsx`                 | modified        | New cookie list + "Manage preferences" section with the withdraw button                                                      |
| `playwright.config.ts`                     | new             | Playwright config — Chromium + WebKit, webServer auto-launches `bun run dev`                                                 |
| `tests/e2e/consent-banner.spec.ts`         | new             | All AC verification tests (banner, accept, reject, withdraw, mobile)                                                         |
| `tests/e2e/gtm-container.spec.ts`          | new             | AC6 — fetches published GTM container, asserts GA4 tag has consent gating                                                    |
| `package.json`                             | modified        | Add `@playwright/test` devDep; `test:e2e` / `test:e2e:ui` scripts                                                            |
| `.github/workflows/ci.yml`                 | new or extended | Install Playwright browsers, run E2E suite on PR                                                                             |
| `.gitignore`                               | modified        | `test-results/`, `playwright-report/`                                                                                        |
| `src/app/globals.css`                      | modified        | Add `@keyframes consent-in` + `.animate-consent-in` utility (used by `ConsentBanner.tsx`); respects `prefers-reduced-motion` |

## Module: `src/lib/consent.ts`

```ts
export const CONSENT_VERSION = 1;
export const CONSENT_KEY = 'sharp.consent.v1';

export type ConsentChoice = 'granted' | 'denied';

export interface StoredConsent {
  version: number;
  analytics_storage: ConsentChoice;
  ad_storage: 'denied'; // pinned until we add an ads use case
  timestamp: string; // ISO 8601
}

// SSR-safe (returns null when window is undefined).
// Catches JSON.parse errors and corrupt entries.
// Returns null for unknown `version` values.
export function readConsent(): StoredConsent | null;

// Persist a choice + push consent update.
export function writeConsent(choice: ConsentChoice): void;

// Push the Consent Mode v2 update to dataLayer. Idempotent.
// Exported separately so the ConsentBanner useEffect fallback can replay it.
export function pushConsentUpdate(choice: ConsentChoice): void;

// Remove the localStorage key and reload the page.
// Reload is the simplest way to restore the default-deny state cleanly.
export function clearConsent(): void;
```

**Push payload** (must stay in sync with the `consent-restore` inline script in `layout.tsx`):

```ts
window.dataLayer.push({
  event: 'consent_update',
  consent: {
    analytics_storage: choice,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  },
});
```

**Version field rationale:** if the stored shape changes later (e.g., granular toggles), bumping `CONSENT_VERSION` makes existing entries read as `null` → users re-see the banner once → fresh entry written under new shape. No migration code.

## Component: `src/components/ConsentBanner.tsx`

Client component. Slim — delegates logic to `consent.ts`.

**State machine:** `'unknown' → 'visible' | 'hidden'`. Three states because the server-rendered HTML must always be empty (avoids flash-of-banner for returning visitors).

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { readConsent, writeConsent, pushConsentUpdate } from '@/lib/consent';

export function ConsentBanner() {
  const [status, setStatus] = useState<'unknown' | 'visible' | 'hidden'>('unknown');

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      pushConsentUpdate(stored.analytics_storage); // fallback for inline-script race
      setStatus('hidden');
    } else {
      setStatus('visible');
    }

    // Cross-tab sync — if another tab changes consent, update this one.
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'sharp.consent.v1') {
        setStatus(e.newValue ? 'hidden' : 'visible');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (status !== 'visible') return null;

  return (
    <aside
      aria-label="Cookie consent"
      className="
        fixed inset-x-0 bottom-0 z-50
        bg-charcoal text-white
        border-t border-white/10
        shadow-[0_-4px_16px_rgba(0,0,0,0.08)]
        animate-consent-in
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <p className="font-body text-sm leading-relaxed flex-1">
            We use analytics cookies to understand how visitors use our site. They help us improve
            what we offer but aren't essential.{' '}
            <a href="/privacy" className="underline underline-offset-2 hover:text-white/80">
              Privacy policy
            </a>
            .
          </p>
          <div className="flex gap-2 sm:flex-shrink-0">
            <Button
              variant="outline"
              onClick={() => {
                writeConsent('denied');
                setStatus('hidden');
              }}
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Reject non-essential
            </Button>
            <Button
              onClick={() => {
                writeConsent('granted');
                setStatus('hidden');
              }}
              className="bg-white text-charcoal hover:bg-white/90"
            >
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
```

**Design choices:**

- **Equal-weight buttons.** Reject is outline-white, Accept is white-filled. Same height, same row, identical typography. PECR/ICO guidance requires Reject be no harder to find than Accept.
- **Mobile layout (<640px).** Stacks vertically; copy on top, buttons side-by-side below. Banner overlays the bottom ~120px of the viewport without permanent layout shift.
- **No close (×) button.** Dismissal without a choice is non-compliant under PECR.
- **Semantic `<aside>`** with `aria-label`. Native `<button>` elements. No focus trap (non-modal).
- **Animation.** Custom `animate-consent-in` class — defined in `src/app/globals.css` as a `@keyframes` that translates from `translateY(8px)` + `opacity:0` to `translateY(0)` + `opacity:1` over 300ms. Avoids pulling in `tailwindcss-animate` for a single use site. (The keyframe respects `@media (prefers-reduced-motion: reduce)` by collapsing duration to 0ms.)
- **`z-50`** so the banner sits above all normal content.

## Component: `src/components/WithdrawConsentButton.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { readConsent, clearConsent } from '@/lib/consent';

export function WithdrawConsentButton() {
  const [hasChoice, setHasChoice] = useState<boolean | null>(null);

  useEffect(() => {
    setHasChoice(readConsent() !== null);
  }, []);

  if (hasChoice === null) return null;

  if (!hasChoice) {
    return (
      <p className="text-sm font-body text-grey italic">
        No cookie preference is currently stored. The banner will appear on your next visit.
      </p>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <Button variant="outline" onClick={clearConsent}>
        Withdraw consent &amp; reset preferences
      </Button>
      <p className="text-sm font-body text-grey">
        Clears stored preferences and reloads the page. The banner will reappear.
      </p>
    </div>
  );
}
```

Lives as a client island so the rest of `/privacy` stays server-rendered.

## Changes to `src/app/layout.tsx`

**Remove (line 8 + lines 85–97):**

```tsx
const GA_ID = 'G-LTTYDCF3WC';  // no longer needed

{/* Google tag (gtag.js) */}
<Script id="gtag-src" src={`...?id=${GA_ID}`} strategy="beforeInteractive" />
<Script id="gtag-init" strategy="beforeInteractive">{`...gtag('config', '${GA_ID}');`}</Script>
{/* End Google tag (gtag.js) */}
```

**Add — import:**

```tsx
import { ConsentBanner } from '@/components/ConsentBanner';
```

**Add — two new `<Script>` tags inserted ABOVE the existing `gtm-init` block:**

```tsx
{
  /* Consent Mode v2 — default-deny. MUST run before GTM. */
}
<Script id="consent-default" strategy="beforeInteractive">
  {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});`}
</Script>;

{
  /* Returning-visitor fast path — replay stored consent BEFORE GTM evaluates tags.
    Mirrors pushConsentUpdate() in src/lib/consent.ts. Keep shapes in sync. */
}
<Script id="consent-restore" strategy="beforeInteractive">
  {`try {
  var raw = localStorage.getItem('sharp.consent.v1');
  if (raw) {
    var stored = JSON.parse(raw);
    if (stored && stored.version === 1 && stored.analytics_storage) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'update', {
        analytics_storage: stored.analytics_storage,
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted'
      });
    }
  }
} catch (e) {}`}
</Script>;
```

**Add — mount banner before `</body>`:**

```tsx
{
  children;
}
<ConsentBanner />;
```

**Script execution order in `<head>`:**

```
1. consent-default   →  defines gtag, sets all consent: denied, opens 500ms wait window
2. consent-restore   →  reads localStorage, pushes 'update' if stored (still inside the 500ms)
3. gtm-init          →  loads GTM, evaluates tags against current consent state
```

All three use `strategy="beforeInteractive"` and Next.js injects them in JSX order.

## Changes to `src/app/privacy/page.tsx`

1. **Replace current Section 7 ("Cookies")** with an accurate cookie table.
2. **Add new Section 8 ("Manage your cookie preferences")** containing `<WithdrawConsentButton />`.
3. **Renumber** existing sections 8/9/10 → 9/10/11.
4. **Update "Last updated"** date.

New Section 7:

```tsx
<div>
  <h2 className="text-2xl font-heading font-light mb-4">7. Cookies</h2>
  <p className="mb-3">This site uses the following cookies and similar storage:</p>
  <table className="w-full text-sm border-collapse">
    <thead>
      <tr className="border-b border-charcoal/20 text-left">
        <th className="py-2 font-heading font-medium">Name</th>
        <th className="py-2 font-heading font-medium">Purpose</th>
        <th className="py-2 font-heading font-medium">Set when</th>
      </tr>
    </thead>
    <tbody className="font-body">
      <tr className="border-b border-charcoal/10">
        <td className="py-2 pr-4">
          <code>_ga</code>, <code>_ga_*</code>
        </td>
        <td className="py-2 pr-4">Google Analytics — measures site usage</td>
        <td className="py-2">Only after you accept analytics cookies</td>
      </tr>
      <tr>
        <td className="py-2 pr-4">
          <code>sharp.consent.v1</code> <span className="text-grey">(localStorage)</span>
        </td>
        <td className="py-2 pr-4">Remembers your cookie preference</td>
        <td className="py-2">When you choose Accept or Reject</td>
      </tr>
    </tbody>
  </table>
  <p className="mt-4">
    No advertising or tracking cookies are set. Google Tag Manager loads on every page but is
    configured not to set any cookies or send personal data until you give consent above.
  </p>
</div>
```

New Section 8:

```tsx
<div>
  <h2 className="text-2xl font-heading font-light mb-4">8. Manage your cookie preferences</h2>
  <p className="mb-4">
    You can change your mind at any time. Clicking the button below will clear your stored
    preference and reopen the consent banner.
  </p>
  <WithdrawConsentButton />
</div>
```

Plus add the import at the top of the file.

## Testing — Playwright E2E

**Setup:**

- Add `@playwright/test` to devDeps.
- `package.json` scripts: `"test:e2e": "playwright test"`, `"test:e2e:ui": "playwright test --ui"`.
- `playwright.config.ts` — Chromium + WebKit projects; `webServer` auto-launches `bun run dev` on `localhost:3000`.
- `.gitignore` — `test-results/`, `playwright-report/`.

**`tests/e2e/consent-banner.spec.ts` — one test per AC:**

| AC      | Test                                                                                                  |
| ------- | ----------------------------------------------------------------------------------------------------- |
| AC1     | Banner appears with Accept, Reject, and privacy link                                                  |
| AC2     | `consent-default` fires before GTM with all denied                                                    |
| AC3     | Banner persists choice in `localStorage` under `sharp.consent.v1`                                     |
| AC4     | Banner pushes `consent_update` to `dataLayer` on click                                                |
| AC5     | Returning visitors do not see the banner again                                                        |
| AC7/AC9 | No `_ga` cookies and no `/g/collect` requests pre-consent (and post-Reject)                           |
| AC8     | After Accept: `_ga` cookies present, exactly **one** `/g/collect` request fires (also validates AC12) |
| AC10    | `/privacy` lists cookies; withdraw button clears localStorage and reopens banner                      |
| AC11    | Mobile 375×667 — CLS < 0.05; footer remains scroll-reachable while banner is up                       |
| AC12    | Single GA4 hit per page load (no double-counting from removed direct gtag.js)                         |

**`tests/e2e/gtm-container.spec.ts` — AC6:**

Fetches `https://www.googletagmanager.com/gtm.js?id=GTM-5CC6DQ8L`, asserts every `__googtag` (GA4) tag block contains `analytics_storage` in its consent settings. Catches the case where GTM tags get added without consent gating.

Marked `test.skip()` in CI if Google's CDN is unreachable (config flag); runs nightly with retries via a separate workflow.

**CI workflow** (`.github/workflows/ci.yml`):

```yaml
- name: Install deps
  run: bun install
- name: Install Playwright browsers
  run: bunx playwright install --with-deps chromium webkit
- name: Run E2E tests
  run: bun run test:e2e
- name: Upload test report
  if: failure()
  uses: actions/upload-artifact@v4
  with: { name: playwright-report, path: playwright-report/ }
```

## Edge cases handled

| Case                                        | Behavior                                                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `localStorage` throws on read               | `readConsent` catches → returns `null` → banner shown. Degraded but not broken.                                                                  |
| Stored JSON is corrupted                    | Same — try/catch → null → banner shown.                                                                                                          |
| Stored entry has unknown `version`          | Treat as absent → banner shown → fresh entry written under current version.                                                                      |
| `window.dataLayer` undefined when pushing   | Every push site guards with `window.dataLayer = window.dataLayer \|\| []`.                                                                       |
| User opens two tabs, changes consent in one | `storage` event listener in `ConsentBanner` propagates the change to the other tab.                                                              |
| `localStorage` quota exceeded               | `writeConsent` catches; consent applies for the session but isn't persisted.                                                                     |
| JavaScript disabled                         | Banner doesn't render; GTM noscript iframe loads but consent-gated tags can't fire from a noscript iframe. Pre-consent behavior remains correct. |
| Safari ITP shortens `_ga` lifespan          | Out of scope — Google's cookie, not ours.                                                                                                        |

## Risks

1. **Drift between `consent-restore` inline script and `pushConsentUpdate()`.** Mitigation: Playwright test asserts both produce the same Consent Mode v2 shape; cross-reference comments in both files.
2. **Next.js `beforeInteractive` warning in App Router.** Mitigation: verify against installed Next version; if warned, switch the two consent scripts to raw `<script>` elements with inline content. Same execution semantics.
3. **`wait_for_update: 500` race on slow devices.** Mitigation: `useEffect` fallback in `ConsentBanner` replays the update; worst case is losing ~1 page-view of analytics for that pathological page load.
4. **AC6 test depends on Google CDN reachability.** Mitigation: skip in main CI, run nightly with retries.
5. **Branch hygiene.** Current branch `claude/quirky-benz-c4fc8a` is based on `master`, but per gitflow this feature should live on `feature/issue-59-consent-banner` based on `develop`. First implementation step: create the properly-named branch from `develop` (content is functionally identical) and continue there.

## Out of scope

- Vitest unit tests for `lib/consent.ts` (deferred — Playwright covers the criteria; nice-to-have polish)
- Granular per-vendor consent toggles
- TCF 2.2 / IAB CMP integration
- Server-side GTM
- Banner localisation (single-language site)
- A11y axe-core run (could fold into Playwright suite later)

## Acceptance criteria mapping

All criteria from issue #59 plus the discovered double-counting fix:

- [ ] AC1: `ConsentBanner.tsx` exists with Accept / Reject + privacy link → `consent-banner.spec.ts` AC1 test
- [ ] AC2: Default-deny `gtag('consent','default',...)` runs before GTM → AC2 test
- [ ] AC3: Choice persisted in `localStorage` under `sharp.consent.v1` → AC3 test
- [ ] AC4: `consent_update` pushed to `dataLayer` on user choice → AC4 test
- [ ] AC5: Returning visitors with stored consent don't see banner → AC5 test
- [ ] AC6: All GTM tags have Consent Settings configured → `gtm-container.spec.ts` test (live CDN fetch)
- [ ] AC7: No `_ga` cookies / no GA traffic when no choice made → AC7 test
- [ ] AC8: After Accept — cookies set, GA4 receives traffic → AC8 test
- [ ] AC9: After Reject — still no cookies, still no GA traffic → AC9 test
- [ ] AC10: `/privacy` lists cookies and offers withdraw control → AC10 test
- [ ] AC11: No layout shift / content covered on mobile 375×667 → AC11 test (CLS < 0.05)
- [ ] **AC12 (new):** Exactly one GA4 `/g/collect` request per page load after Accept (double-counting fixed) → folded into AC8 test
