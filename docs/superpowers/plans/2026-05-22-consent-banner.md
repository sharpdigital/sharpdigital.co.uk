# Cookie Consent Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a PECR/UK-GDPR–compliant cookie consent banner with GTM Consent Mode v2 default-deny gating, persisted in localStorage, with a Playwright E2E test suite covering every acceptance criterion from issue [#59](https://github.com/sharpdigital/sharpdigital.co.uk/issues/59).

**Architecture:** Pure logic in `src/lib/consent.ts` (read/write localStorage, push Consent Mode v2 updates to dataLayer). UI in `src/components/ConsentBanner.tsx` (fixed-bottom bar, Accept/Reject) and `src/components/WithdrawConsentButton.tsx` (mounted on `/privacy`). Two new inline `beforeInteractive` scripts in `src/app/layout.tsx` (one for default-deny, one for restoring stored consent on returning visits). Direct `gtag.js` install is removed — GA4 flows only through the existing GTM container (which already has a Google Tag for `G-LTTYDCF3WC`).

**Tech Stack:** Next.js 15.4.1 (App Router, `output: 'export'` static), React 19.1.0, TailwindCSS 3.4, Bun, Playwright (new — for E2E). GitHub Actions for CI.

**Spec:** [`docs/superpowers/specs/2026-05-21-consent-banner-design.md`](../specs/2026-05-21-consent-banner-design.md)

---

## Task 1: Branch hygiene — switch to a gitflow-compliant feature branch

The current branch `claude/quirky-benz-c4fc8a` is based on `master`. Per the project's gitflow rules (CLAUDE.md), feature work must live on `feature/<name>` branched from `develop` and PR'd back to `develop`. The single spec commit on the current branch needs to move.

**Files:**

- No code changes; pure git operations.

- [ ] **Step 1: Confirm current state**

Run: `git status && git log --oneline -3`

Expected: clean working tree, HEAD at `30ce585 Add design spec for cookie consent banner (issue #59)`, branch `claude/quirky-benz-c4fc8a`.

- [ ] **Step 2: Fetch develop and confirm it's reachable**

Run: `git fetch origin develop && git log --oneline origin/develop -3`

Expected: shows recent develop commits including `32d65c5 Merge release 2.6.1 back into develop` or newer.

- [ ] **Step 3: Create the proper feature branch from origin/develop with the spec commit on top**

Run:

```bash
git checkout -b feature/issue-59-consent-banner origin/develop
git cherry-pick 30ce585
```

Expected: cherry-pick succeeds cleanly (the spec is a new file under `docs/`, no conflicts).

- [ ] **Step 4: Verify**

Run: `git log --oneline -3 && git status`

Expected: HEAD is a fresh cherry-pick commit on top of develop. Clean working tree.

- [ ] **Step 5: Push the feature branch and set upstream**

Run: `git push -u origin feature/issue-59-consent-banner`

Expected: branch created on origin.

- [ ] **Step 6: Delete the obsolete claude branch (local only — origin doesn't have it)**

Run: `git branch -D claude/quirky-benz-c4fc8a`

Expected: branch deleted.

---

## Task 2: Install Playwright and add base config

Add Playwright as a dev dependency, generate config tailored to this codebase (Chromium + WebKit, auto-launch dev server), update `.gitignore`, and add scripts.

**Files:**

- Modify: `package.json` (add devDep + 2 scripts)
- Create: `playwright.config.ts`
- Modify: `.gitignore`
- Create: `tests/e2e/.gitkeep` (so the directory exists before the first test)

- [ ] **Step 1: Add `@playwright/test` to devDependencies**

Run: `bun add -d @playwright/test`

Expected: `package.json` and lockfile updated, package installed under `node_modules/@playwright/test`.

- [ ] **Step 2: Install Playwright browsers**

Run: `bunx playwright install chromium webkit`

Expected: downloads and unpacks both browsers (~250 MB).

- [ ] **Step 3: Add test scripts to `package.json`**

Open `package.json`. Add to the `scripts` section (after the existing `lint` script):

```json
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report"
```

- [ ] **Step 4: Create `playwright.config.ts` in the repo root**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['html'], ['github']] : 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 5: Update `.gitignore`**

Append to `.gitignore`:

```
# Playwright
test-results/
playwright-report/
playwright/.cache/
```

- [ ] **Step 6: Create placeholder for the test directory**

Run: `mkdir -p tests/e2e && touch tests/e2e/.gitkeep`

- [ ] **Step 7: Sanity check — Playwright recognizes the config**

Run: `bunx playwright test --list`

Expected: lists 0 tests, no errors. Output like `Total: 0 tests in 0 files`.

- [ ] **Step 8: Commit**

```bash
git add package.json bun.lock playwright.config.ts .gitignore tests/e2e/.gitkeep
git commit -m "$(cat <<'EOF'
Add Playwright E2E test infrastructure

Installs @playwright/test, adds playwright.config.ts targeting Chromium
and WebKit, and wires up test:e2e* scripts. webServer auto-launches
bun run dev. Foundation for the issue #59 consent banner E2E suite.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Add CI workflow for E2E tests

Extend the existing `deploy.yml` is risky (it's the deploy path); add a new `ci.yml` workflow that runs E2E tests on PR.

**Files:**

- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [develop, 'feature/**', 'bugfix/**']
  pull_request:
    branches: [develop, master]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Install Playwright browsers
        run: bunx playwright install --with-deps chromium webkit

      - name: Run E2E tests
        run: bun run test:e2e

      - name: Upload Playwright report
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "$(cat <<'EOF'
Add CI workflow for Playwright E2E tests

Runs on push to feature/bugfix branches and on PRs to develop/master.
Installs Chromium + WebKit, executes the E2E suite, uploads the HTML
report on failure.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Create `src/lib/consent.ts` (pure logic module)

Pure module containing constants, types, and four exported helpers: `readConsent`, `writeConsent`, `pushConsentUpdate`, `clearConsent`. No React, no test runner — exercised via E2E later.

**Files:**

- Create: `src/lib/consent.ts`

- [ ] **Step 1: Write the module**

```ts
// src/lib/consent.ts
// Cookie consent state + GTM Consent Mode v2 dataLayer push helpers.
//
// IMPORTANT: the dataLayer payload in `pushConsentUpdate` must stay in sync
// with the inline `consent-restore` script in `src/app/layout.tsx`. Both push
// the same Consent Mode v2 shape; if you change one, change the other.

export const CONSENT_VERSION = 1;
export const CONSENT_KEY = 'sharp.consent.v1';

export type ConsentChoice = 'granted' | 'denied';

export interface StoredConsent {
  version: number;
  analytics_storage: ConsentChoice;
  ad_storage: 'denied';
  timestamp: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function readConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (parsed.analytics_storage !== 'granted' && parsed.analytics_storage !== 'denied')
      return null;
    return parsed as StoredConsent;
  } catch {
    return null;
  }
}

export function pushConsentUpdate(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
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
}

export function writeConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  const payload: StoredConsent = {
    version: CONSENT_VERSION,
    analytics_storage: choice,
    ad_storage: 'denied',
    timestamp: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
  } catch {
    // Quota exceeded or storage disabled — still push the update so consent
    // applies for this session even if not persisted.
  }
  pushConsentUpdate(choice);
}

export function clearConsent(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    // ignore
  }
  window.location.reload();
}
```

- [ ] **Step 2: Verify it compiles**

Run: `bunx tsc --noEmit`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/consent.ts
git commit -m "$(cat <<'EOF'
Add src/lib/consent.ts — pure consent helpers

Read/write a versioned localStorage entry under 'sharp.consent.v1' and
push Consent Mode v2 updates to window.dataLayer. SSR-safe and tolerant
of localStorage failures (private browsing, quota exceeded).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Add slide-in keyframe to `src/app/globals.css`

Custom CSS animation instead of pulling in `tailwindcss-animate` for a single use site.

**Files:**

- Modify: `src/app/globals.css`

- [ ] **Step 1: Append to `src/app/globals.css`**

Add at the very end of the file:

```css
/* Consent banner slide-up animation */
@keyframes consent-in {
  from {
    transform: translateY(8px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-consent-in {
  animation: consent-in 300ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .animate-consent-in {
    animation-duration: 0ms;
  }
}
```

- [ ] **Step 2: Verify build still works**

Run: `bun run build`

Expected: build succeeds, output includes the new CSS.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "$(cat <<'EOF'
Add consent-in keyframe + .animate-consent-in utility

Custom slide-up + fade-in for the consent banner mount. 300ms ease-out;
respects prefers-reduced-motion.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Create `src/components/ConsentBanner.tsx`

Client component. State machine `unknown → visible | hidden`. Reads from `consent.ts` on mount, pushes update for returning visitors (fallback path), renders banner UI when no choice exists, listens for cross-tab `storage` events.

**Files:**

- Create: `src/components/ConsentBanner.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/ConsentBanner.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CONSENT_KEY, readConsent, writeConsent, pushConsentUpdate } from '@/lib/consent';

type Status = 'unknown' | 'visible' | 'hidden';

export function ConsentBanner() {
  const [status, setStatus] = useState<Status>('unknown');

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      // Fallback for the inline beforeInteractive script — idempotent.
      pushConsentUpdate(stored.analytics_storage);
      setStatus('hidden');
    } else {
      setStatus('visible');
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) {
        setStatus(e.newValue ? 'hidden' : 'visible');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (status !== 'visible') return null;

  const onAccept = () => {
    writeConsent('granted');
    setStatus('hidden');
  };
  const onReject = () => {
    writeConsent('denied');
    setStatus('hidden');
  };

  return (
    <aside
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 bg-charcoal text-white border-t border-white/10 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] animate-consent-in"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <p className="font-body text-sm leading-relaxed flex-1">
            We use analytics cookies to understand how visitors use our site. They help us improve
            what we offer but aren&rsquo;t essential.{' '}
            <a href="/privacy" className="underline underline-offset-2 hover:text-white/80">
              Privacy policy
            </a>
            .
          </p>
          <div className="flex gap-2 sm:flex-shrink-0">
            <Button
              variant="outline"
              onClick={onReject}
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Reject non-essential
            </Button>
            <Button onClick={onAccept} className="bg-white text-charcoal hover:bg-white/90">
              Accept all
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `bunx tsc --noEmit`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ConsentBanner.tsx
git commit -m "$(cat <<'EOF'
Add ConsentBanner client component

Fixed-bottom bar with Accept all / Reject non-essential buttons and a
privacy link. State machine (unknown→visible|hidden) keeps SSR output
empty to avoid hydration flash for returning visitors. Cross-tab sync
via storage event listener.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Wire into `src/app/layout.tsx` — TDD with AC1 (banner appears)

Add the AC1 test, watch it fail, then make the surgical edits to `layout.tsx` (remove direct gtag.js, add `consent-default` + `consent-restore` scripts, mount `<ConsentBanner />`) to make it pass.

**Files:**

- Create: `tests/e2e/consent-banner.spec.ts` (first test only)
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write the failing AC1 test**

Create `tests/e2e/consent-banner.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('Consent banner — first visit (no stored choice)', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('AC1: banner appears with Accept, Reject, and privacy link', async ({ page }) => {
    await page.goto('/');
    const banner = page.getByRole('region', { name: /cookie consent/i });
    await expect(banner).toBeVisible();
    await expect(banner.getByRole('button', { name: /accept all/i })).toBeVisible();
    await expect(banner.getByRole('button', { name: /reject non-essential/i })).toBeVisible();
    await expect(banner.getByRole('link', { name: /privacy policy/i })).toHaveAttribute(
      'href',
      '/privacy'
    );
  });
});
```

- [ ] **Step 2: Run the test, watch it fail**

Run: `bun run test:e2e tests/e2e/consent-banner.spec.ts -g "AC1"`

Expected: FAIL — `Locator expected to be visible` for the cookie consent region (banner not mounted yet).

- [ ] **Step 3: Update `src/app/layout.tsx`**

Open `src/app/layout.tsx`. Apply these changes (current file shown earlier):

Add at the top with other imports (after `import './globals.css'` and `import '../components/ui/ui.css'`):

```tsx
import { ConsentBanner } from '@/components/ConsentBanner';
```

Delete line 8:

```tsx
const GA_ID = 'G-LTTYDCF3WC';
```

Delete lines 85–97 (the entire `Google tag (gtag.js)` block including its comments):

```tsx
{/* Google tag (gtag.js) */}
<Script id="gtag-src" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="beforeInteractive" />
<Script id="gtag-init" strategy="beforeInteractive">
  {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
</Script>
{/* End Google tag (gtag.js) */}
```

In `<head>`, **above** the existing `<Script id="gtm-init" ...>` block (line 77), insert these two new scripts:

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

In `<body>`, immediately before the closing `</body>` tag (after `{children}`), add:

```tsx
<ConsentBanner />
```

- [ ] **Step 4: Verify it compiles and builds**

Run: `bunx tsc --noEmit && bun run build`

Expected: both succeed.

- [ ] **Step 5: Run the AC1 test again, watch it pass**

Run: `bun run test:e2e tests/e2e/consent-banner.spec.ts -g "AC1"`

Expected: PASS on both chromium and webkit projects.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx tests/e2e/consent-banner.spec.ts
git commit -m "$(cat <<'EOF'
Wire ConsentBanner into root layout with default-deny scripts

- Remove direct gtag.js install (GA4 routes via GTM only — fixes
  pre-existing double-counting where both GTM and the direct gtag.js
  were sending events for G-LTTYDCF3WC)
- Add consent-default beforeInteractive script: denies all consent
  with a 500ms wait_for_update window
- Add consent-restore beforeInteractive script: replays stored
  consent for returning visitors before GTM evaluates tags
- Mount <ConsentBanner /> just before </body>
- Add AC1 Playwright test verifying the banner renders with the
  expected accessible roles and labels

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: TDD AC2 — consent-default fires before GTM with all denied

**Files:**

- Modify: `tests/e2e/consent-banner.spec.ts` (add AC2 test)

- [ ] **Step 1: Add the AC2 test to the existing describe block**

Edit `tests/e2e/consent-banner.spec.ts`. Inside the existing `test.describe('Consent banner — first visit (no stored choice)', () => { ... })` block (after the AC1 test), add:

```ts
test('AC2: consent-default fires with all denied before GTM', async ({ page }) => {
  await page.goto('/');
  const firstConsentEntry = await page.evaluate(() => {
    const dl = (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];
    // The consent-default script uses gtag() which pushes its args as
    // an Arguments object; on the dataLayer this looks like an array-like
    // with 'consent', 'default', {...} at indices 0/1/2.
    return dl.find((e) => {
      const arr = e as { 0?: string; 1?: string };
      return arr[0] === 'consent' && arr[1] === 'default';
    });
  });

  expect(firstConsentEntry).toBeDefined();
  const args = firstConsentEntry as { 0: string; 1: string; 2: Record<string, string | number> };
  expect(args[2]).toMatchObject({
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });
});
```

- [ ] **Step 2: Run AC2 — should already pass (Task 7 added the script)**

Run: `bun run test:e2e tests/e2e/consent-banner.spec.ts -g "AC2"`

Expected: PASS on both projects.

If it FAILS: open DevTools manually on `bun run dev` → check `window.dataLayer` in the console; verify the consent-default script in `<head>` and that it runs before GTM.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/consent-banner.spec.ts
git commit -m "$(cat <<'EOF'
Add AC2 test — consent-default with all denied fires before GTM

Verifies the first dataLayer entry is a Consent Mode v2 default-deny
call with the expected shape (analytics_storage, ad_storage,
ad_user_data, ad_personalization all denied; wait_for_update=500).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: TDD AC7 + AC9 — no GA traffic and no \_ga cookies pre-consent / after reject

These are the highest-stakes assertions in the whole suite — they verify the actual compliance posture.

**Files:**

- Modify: `tests/e2e/consent-banner.spec.ts`

- [ ] **Step 1: Add AC7 + AC9 tests to the spec file**

At the top of the file (just below imports), add:

```ts
const GA_COLLECT_RE = /google-analytics\.com\/g\/collect|analytics\.google\.com\/g\/collect/;
```

Then inside the first-visit `describe` block (after AC2):

```ts
test('AC7: no _ga cookies and no GA4 collect requests before consent', async ({
  page,
  context,
}) => {
  const collectRequests: string[] = [];
  page.on('request', (req) => {
    if (GA_COLLECT_RE.test(req.url())) collectRequests.push(req.url());
  });

  await page.goto('/');
  // Give GTM a chance to evaluate tags (its wait_for_update is 500ms;
  // we wait longer to be sure nothing fires).
  await page.waitForTimeout(2000);

  expect(collectRequests, 'no GA4 /g/collect requests expected pre-consent').toEqual([]);

  const cookies = await context.cookies();
  const gaCookies = cookies.filter((c) => c.name.startsWith('_ga'));
  expect(gaCookies, 'no _ga* cookies expected pre-consent').toEqual([]);
});
```

Add a new describe block after the first one:

```ts
test.describe('Consent banner — Reject flow', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('AC9: no GA traffic and no _ga cookies after rejecting', async ({ page, context }) => {
    const collectRequests: string[] = [];
    page.on('request', (req) => {
      if (GA_COLLECT_RE.test(req.url())) collectRequests.push(req.url());
    });

    await page.goto('/');
    await page.getByRole('button', { name: /reject non-essential/i }).click();
    await page.waitForTimeout(2000);

    expect(collectRequests, 'no GA4 traffic expected after Reject').toEqual([]);

    const cookies = await context.cookies();
    const gaCookies = cookies.filter((c) => c.name.startsWith('_ga'));
    expect(gaCookies, 'no _ga* cookies expected after Reject').toEqual([]);
  });
});
```

- [ ] **Step 2: Run AC7 + AC9 — should pass since direct gtag.js was removed in Task 7**

Run: `bun run test:e2e tests/e2e/consent-banner.spec.ts -g "AC7|AC9"`

Expected: PASS on both projects.

If FAIL on AC7: check that the direct gtag.js block was fully removed from `layout.tsx` (no `gtag-src` or `gtag-init` scripts remain). The GTM container's GA4 tag should not fire because consent is denied.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/consent-banner.spec.ts
git commit -m "$(cat <<'EOF'
Add AC7 + AC9 tests — no GA traffic pre-consent or post-reject

The two highest-stakes compliance tests:
- AC7: no _ga cookies and no /g/collect requests on first visit
  before the user has interacted with the banner.
- AC9: same after clicking Reject non-essential.

Both observed via request interception and the BrowserContext cookies.
Together these assert the consent gating is genuinely blocking GTM-
managed GA4 tags from firing.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: TDD AC3 + AC4 — choice persists in localStorage and pushes consent_update

**Files:**

- Modify: `tests/e2e/consent-banner.spec.ts`

- [ ] **Step 1: Add the Accept-flow describe block**

Add to `tests/e2e/consent-banner.spec.ts` (after the Reject describe):

```ts
test.describe('Consent banner — Accept flow', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('AC3: choice persists in localStorage under sharp.consent.v1', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /accept all/i }).click();

    const stored = await page.evaluate(() => localStorage.getItem('sharp.consent.v1'));
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed).toMatchObject({
      version: 1,
      analytics_storage: 'granted',
      ad_storage: 'denied',
    });
    expect(typeof parsed.timestamp).toBe('string');
  });

  test('AC4: clicking Accept pushes a consent_update to dataLayer', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /accept all/i }).click();

    const update = await page.evaluate(() => {
      const dl =
        (window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer ?? [];
      return dl.find((e) => e?.event === 'consent_update');
    });

    expect(update).toBeDefined();
    expect(update).toMatchObject({
      event: 'consent_update',
      consent: {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
      },
    });
  });
});
```

- [ ] **Step 2: Run AC3 + AC4**

Run: `bun run test:e2e tests/e2e/consent-banner.spec.ts -g "AC3|AC4"`

Expected: PASS on both projects.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/consent-banner.spec.ts
git commit -m "$(cat <<'EOF'
Add AC3 + AC4 tests — Accept persists localStorage + pushes consent_update

After clicking Accept all:
- AC3: localStorage 'sharp.consent.v1' contains the versioned shape
  with analytics_storage='granted', ad_storage='denied', a timestamp.
- AC4: window.dataLayer contains a consent_update entry with the full
  Consent Mode v2 payload.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: TDD AC5 — returning visitors do not see the banner again

**Files:**

- Modify: `tests/e2e/consent-banner.spec.ts`

- [ ] **Step 1: Add AC5 to the Accept-flow describe block**

Add this test inside the existing `test.describe('Consent banner — Accept flow', ...)`:

```ts
test('AC5: returning visitor with stored consent does not see banner', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /accept all/i }).click();

  // Reload — banner should not re-appear.
  await page.reload();
  await expect(page.getByRole('region', { name: /cookie consent/i })).toHaveCount(0);

  // Belt-and-braces: the consent-restore inline script should also have
  // pushed a consent_update before the page hydrated.
  const updateCount = await page.evaluate(() => {
    const dl = (window as Window & { dataLayer?: Array<unknown> }).dataLayer ?? [];
    return dl.filter((e) => {
      const arr = e as { 0?: string; 1?: string };
      return arr[0] === 'consent' && arr[1] === 'update';
    }).length;
  });
  expect(updateCount).toBeGreaterThanOrEqual(1);
});
```

- [ ] **Step 2: Run AC5**

Run: `bun run test:e2e tests/e2e/consent-banner.spec.ts -g "AC5"`

Expected: PASS on both projects.

If FAIL — banner re-appears: investigate the `useEffect` in `ConsentBanner.tsx`. `readConsent()` should return the stored shape on second visit and the banner should `setStatus('hidden')`.

If FAIL — no update found: verify the `consent-restore` script in `layout.tsx` is present and reads `sharp.consent.v1` correctly.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/consent-banner.spec.ts
git commit -m "$(cat <<'EOF'
Add AC5 test — returning visitors don't see banner; consent restored

After Accept + reload, the cookie consent region is absent and the
inline consent-restore script has pushed at least one consent update.
Confirms both halves of the belt-and-braces restoration path work.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: TDD AC8 + AC12 — after Accept, GA4 fires exactly ONCE per page load

This test verifies both that GA4 starts collecting (AC8) AND that the double-counting issue is fixed (AC12 — only one `/g/collect` per page load, not two).

**Files:**

- Modify: `tests/e2e/consent-banner.spec.ts`

- [ ] **Step 1: Add AC8 + AC12 test to the Accept-flow describe**

Add inside the `Accept flow` describe block:

```ts
test('AC8 + AC12: after Accept, exactly one GA4 collect request per page load', async ({
  page,
  context,
}) => {
  const collectRequests: string[] = [];
  page.on('request', (req) => {
    if (GA_COLLECT_RE.test(req.url())) collectRequests.push(req.url());
  });

  // First visit — banner shows, accept it.
  await page.goto('/');
  await page.getByRole('button', { name: /accept all/i }).click();
  await page.waitForTimeout(2000);

  // After Accept, GA4 fires once (the consent_update triggers the gated tag).
  expect(
    collectRequests.length,
    'expected exactly one /g/collect after Accept on first visit'
  ).toBe(1);

  // Cookies were set.
  const cookies = await context.cookies();
  const gaCookies = cookies.filter((c) => c.name.startsWith('_ga'));
  expect(gaCookies.length, 'expected _ga* cookies after Accept').toBeGreaterThan(0);

  // Second visit (reload) — consent already granted, GA4 should fire exactly once more.
  collectRequests.length = 0;
  await page.reload();
  await page.waitForTimeout(2000);
  expect(
    collectRequests.length,
    'expected exactly one /g/collect on reload after consent — double-counting must be fixed'
  ).toBe(1);
});
```

- [ ] **Step 2: Run AC8 + AC12**

Run: `bun run test:e2e tests/e2e/consent-banner.spec.ts -g "AC8"`

Expected: PASS on both projects.

If the count is **2** — the direct `gtag.js` was not fully removed from `layout.tsx`. Re-check Task 7's deletions.

If the count is **0** — GTM container is not firing the GA4 tag (could be a Consent Settings issue on the GTM tag, or a network issue blocking GTM). Open `https://www.googletagmanager.com/gtm.js?id=GTM-5CC6DQ8L` and confirm the `vtp_tagId:"G-LTTYDCF3WC"` is present.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/consent-banner.spec.ts
git commit -m "$(cat <<'EOF'
Add AC8 + AC12 test — exactly one GA4 hit per page load after consent

After clicking Accept and on subsequent reload, expects exactly one
/g/collect request per page view. This validates both that GA4
collection works (AC8) and that the previously-existing
double-counting (direct gtag.js + GTM Google Tag firing for the same
measurement ID) is fixed by removing the direct gtag.js (AC12).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Create `WithdrawConsentButton.tsx`

Small client island used on the `/privacy` page. Adapts label based on whether a stored choice exists; calls `clearConsent()` on click.

**Files:**

- Create: `src/components/WithdrawConsentButton.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/WithdrawConsentButton.tsx
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

- [ ] **Step 2: Verify it compiles**

Run: `bunx tsc --noEmit`

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/WithdrawConsentButton.tsx
git commit -m "$(cat <<'EOF'
Add WithdrawConsentButton client island for /privacy

Reads consent state on mount; shows either an italic 'no preference
stored' note or a button that clears the stored choice and reloads
(banner reappears). Separated as its own component so /privacy can
stay a server component.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 14: TDD AC10 — update `/privacy` with cookie table and withdraw button

**Files:**

- Modify: `tests/e2e/consent-banner.spec.ts` (add AC10 test)
- Modify: `src/app/privacy/page.tsx`

- [ ] **Step 1: Write the AC10 test**

Add a new describe block to the end of `tests/e2e/consent-banner.spec.ts`:

```ts
test.describe('Privacy page', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('AC10: /privacy lists cookies and the withdraw button clears stored consent', async ({
    page,
  }) => {
    // Establish stored consent.
    await page.goto('/');
    await page.getByRole('button', { name: /accept all/i }).click();

    await page.goto('/privacy');

    // Cookie table mentions both _ga and sharp.consent.v1.
    await expect(page.getByText('_ga', { exact: false })).toBeVisible();
    await expect(page.getByText('sharp.consent.v1', { exact: false })).toBeVisible();

    // Withdraw button is present.
    const withdrawBtn = page.getByRole('button', { name: /withdraw consent/i });
    await expect(withdrawBtn).toBeVisible();

    // Click it — localStorage is cleared and banner reappears.
    await withdrawBtn.click();
    await page.waitForLoadState('networkidle');

    const stored = await page.evaluate(() => localStorage.getItem('sharp.consent.v1'));
    expect(stored).toBeNull();

    await expect(page.getByRole('region', { name: /cookie consent/i })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run AC10 — should FAIL (page not updated yet)**

Run: `bun run test:e2e tests/e2e/consent-banner.spec.ts -g "AC10"`

Expected: FAIL — "\_ga" text not visible / withdraw button not visible.

- [ ] **Step 3: Update `src/app/privacy/page.tsx`**

Open `src/app/privacy/page.tsx`. Apply these edits:

**3a. Add the import after the existing `import Layout` line:**

```tsx
import { WithdrawConsentButton } from '@/components/WithdrawConsentButton';
```

**3b. Update the "Last updated" line (currently `April 2026`):**

Change:

```tsx
<p className="text-sm font-body text-grey mb-12">Last updated: April 2026</p>
```

To:

```tsx
<p className="text-sm font-body text-grey mb-12">Last updated: May 2026</p>
```

**3c. Replace the entire current Section 7 block** (the `<div>` containing `<h2>...7. Cookies</h2>...`) with the new version:

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

**3d. Immediately after that `<div>`, insert a new section 8:**

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

**3e. Renumber the existing sections that follow:**

- The current "8. Your Rights" → becomes **9. Your Rights**
- The current "9. Changes to This Policy" → becomes **10. Changes to This Policy**
- The current "10. Contact" → becomes **11. Contact**

(Edit the `<h2>` content for each.)

- [ ] **Step 4: Verify it compiles and builds**

Run: `bunx tsc --noEmit && bun run build`

Expected: both succeed.

- [ ] **Step 5: Run AC10 — should now PASS**

Run: `bun run test:e2e tests/e2e/consent-banner.spec.ts -g "AC10"`

Expected: PASS on both projects.

- [ ] **Step 6: Commit**

```bash
git add src/app/privacy/page.tsx tests/e2e/consent-banner.spec.ts
git commit -m "$(cat <<'EOF'
Update /privacy with accurate cookie list and withdraw control

- Replace Section 7 'Cookies' with a table listing _ga / _ga_* and
  sharp.consent.v1 with when each is set.
- Add Section 8 'Manage your cookie preferences' containing the
  <WithdrawConsentButton /> client island.
- Renumber existing sections 8/9/10 → 9/10/11.
- Bump 'Last updated' to May 2026.
- Add AC10 Playwright test covering the full flow.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 15: TDD AC11 — mobile layout has no CLS and footer is reachable

**Files:**

- Modify: `tests/e2e/consent-banner.spec.ts`

- [ ] **Step 1: Add the mobile describe block**

Append to `tests/e2e/consent-banner.spec.ts`:

```ts
test.describe('Mobile layout (375x667)', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('AC11: banner does not cause CLS > 0.05 and footer remains reachable', async ({ page }) => {
    await page.goto('/');

    // Measure cumulative layout shift via PerformanceObserver.
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let total = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as PerformanceEntry[]) {
            const ls = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
            if (!ls.hadRecentInput && typeof ls.value === 'number') total += ls.value;
          }
        });
        try {
          observer.observe({ type: 'layout-shift', buffered: true } as PerformanceObserverInit);
        } catch {
          // WebKit currently doesn't support layout-shift entries — resolve to 0
          // so this test passes on Safari but still validates Chromium.
          resolve(0);
          return;
        }
        setTimeout(() => {
          observer.disconnect();
          resolve(total);
        }, 1500);
      });
    });

    expect(cls, 'CLS should be under 0.05').toBeLessThan(0.05);

    // Footer is reachable by scrolling, even while the banner is up.
    const footer = page.locator('footer').first();
    await footer.scrollIntoViewIfNeeded();
    const firstLink = footer.getByRole('link').first();
    await expect(firstLink).toBeInViewport();
  });
});
```

- [ ] **Step 2: Run AC11**

Run: `bun run test:e2e tests/e2e/consent-banner.spec.ts -g "AC11"`

Expected: PASS on both projects.

If CLS FAIL: open the dev server in Chrome DevTools → Lighthouse mobile audit on `localhost:3000` → identify the shifting element. The banner uses `position: fixed` so it shouldn't contribute to CLS, but the keyframe animation could if not properly translate-based.

If `toBeInViewport` FAIL: a `<footer>` element exists in the project (verify with `grep -r "<footer" src/components/`); ensure the footer is reachable when scrolled.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/consent-banner.spec.ts
git commit -m "$(cat <<'EOF'
Add AC11 test — mobile (375x667) CLS < 0.05, footer reachable

Asserts cumulative layout shift stays under the strict 0.05 threshold
with the banner mounted, and that the footer can still be scrolled
into view while the consent banner overlays the viewport.

WebKit currently doesn't support layout-shift PerformanceObserver
entries; the test gracefully resolves to 0 on Safari so the assertion
still effectively validates Chromium.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 16: AC6 — GTM container assertion test (live CDN)

Verifies that the published GTM container has `analytics_storage` in the consent settings of every Google Tag. This catches the case where a future GTM workspace publish forgets to set Consent Settings on a new tag.

**Files:**

- Create: `tests/e2e/gtm-container.spec.ts`

- [ ] **Step 1: Create the test file**

```ts
// tests/e2e/gtm-container.spec.ts
//
// Verifies the published GTM container (GTM-5CC6DQ8L) has consent gating
// configured on its Google Tags. This depends on Google's CDN being
// reachable, so it can be skipped via SKIP_GTM_LIVE=1 in flaky CI envs.
import { test, expect } from '@playwright/test';

const GTM_URL = 'https://www.googletagmanager.com/gtm.js?id=GTM-5CC6DQ8L';
const SKIP = process.env.SKIP_GTM_LIVE === '1';

test.describe('GTM container (live CDN)', () => {
  test.skip(SKIP, 'SKIP_GTM_LIVE=1 set');

  test('AC6: published container has GA4 tags with consent gating', async ({ request }) => {
    const res = await request.get(GTM_URL);
    expect(res.ok(), `expected 200 from ${GTM_URL}`).toBe(true);
    const body = await res.text();

    // The container must reference the GA4 measurement ID at least once.
    expect(body, 'expected GA4 measurement ID in container').toContain('G-LTTYDCF3WC');

    // It must contain at least one Google Tag function block.
    const googtagCount = (body.match(/"function":"__googtag"/g) ?? []).length;
    expect(googtagCount, 'expected at least one __googtag in container').toBeGreaterThan(0);

    // The container must reference analytics_storage somewhere — this is the
    // Consent Mode v2 signal. Without it, GA4 tags will fire regardless of
    // the gtag('consent', 'default', ...) call on our side.
    expect(body, 'expected analytics_storage referenced in container consent settings').toContain(
      'analytics_storage'
    );
  });
});
```

- [ ] **Step 2: Run AC6**

Run: `bun run test:e2e tests/e2e/gtm-container.spec.ts`

Expected: PASS on both projects.

If FAIL (no `analytics_storage`): the GTM container needs to be updated in the GTM workspace UI — for each Google Tag, set **Advanced Settings → Consent Settings → Require additional consent → `analytics_storage`**, then publish a new container version.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/gtm-container.spec.ts
git commit -m "$(cat <<'EOF'
Add AC6 test — published GTM container has consent gating

Fetches the live GTM-5CC6DQ8L container JS and asserts:
- GA4 measurement ID G-LTTYDCF3WC is referenced.
- At least one __googtag (Google Tag) block exists.
- analytics_storage appears somewhere in the consent settings.

This catches the case where a future workspace publish forgets to
gate a tag with Consent Settings. Skippable via SKIP_GTM_LIVE=1 for
flaky CI environments.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 17: Full-suite verification + lint + production build

Single full pass to confirm nothing regressed during incremental development.

**Files:**

- No code changes; verification only.

- [ ] **Step 1: Run the full E2E suite**

Run: `bun run test:e2e`

Expected: all tests PASS on both `chromium` and `webkit` projects. Total ~12 tests × 2 projects = ~24 test instances.

If any FAIL — investigate that specific test's history (which task added it) and re-run only the failing test with `-g "<name>"` to isolate.

- [ ] **Step 2: Run the linter**

Run: `bun run lint`

Expected: no errors. Warnings about Next.js best practices are acceptable but should be reviewed.

- [ ] **Step 3: Run a production build**

Run: `bun run build`

Expected: builds successfully, output `out/` directory is generated. Pay attention to bundle sizes — the consent code should add < 5 KB to the First Load JS.

- [ ] **Step 4: Run TypeScript type-check**

Run: `bunx tsc --noEmit`

Expected: no errors.

- [ ] **Step 5: Manual smoke (one-time, optional but recommended)**

Run: `bun run dev` and open `http://localhost:3000/` in an incognito Chrome window. Verify:

- Banner appears.
- DevTools → Application → Local Storage shows nothing initially.
- DevTools → Network → no `/g/collect` requests.
- Click Accept → banner disappears, `_ga` cookies appear, exactly one `/g/collect` request fires.
- Navigate to `/privacy` → cookie table visible, withdraw button visible.
- Click withdraw → page reloads, banner is back.

Capture a screenshot of the banner for the PR description.

- [ ] **Step 6: No commit — this task is verification only**

---

## Task 18: Push and open PR

**Files:**

- No code changes; git/GitHub operations only.

- [ ] **Step 1: Push the branch**

Run: `git push -u origin feature/issue-59-consent-banner`

Expected: branch already exists on origin from Task 1, this push adds the new commits.

- [ ] **Step 2: Create the PR targeting `develop`**

Run:

```bash
gh pr create --base develop --title "Cookie consent banner + GTM Consent Mode v2 (#59)" --body "$(cat <<'EOF'
## Summary

- Adds a UK-PECR / UK-GDPR–compliant cookie consent banner with default-deny + GTM Consent Mode v2 gating (issue #59)
- Removes the direct `gtag.js` install from `layout.tsx` — fixes pre-existing GA4 double-counting (GTM container already has a Google Tag for `G-LTTYDCF3WC`)
- Updates `/privacy` with an accurate cookie list and a Withdraw consent control
- Introduces Playwright E2E test infrastructure (Chromium + WebKit) with full acceptance-criteria coverage
- Adds CI workflow running the E2E suite on every PR

## Test plan

- [ ] CI is green (Playwright suite runs on Chromium + WebKit)
- [ ] Manually verify in Chrome incognito: banner appears, no `_ga` cookies before consent, no `/g/collect` requests before consent
- [ ] Manually verify on iOS Safari (or Safari Tech Preview): same as above
- [ ] After Accept: exactly one `/g/collect` per page load (no double-counting)
- [ ] After Reject: still no GA traffic
- [ ] `/privacy` shows the new cookie table and withdraw button works

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR URL printed.

- [ ] **Step 3: Print the PR URL for the user**

Run: `gh pr view --json url -q .url`

Expected: returns the PR URL. Include it in your final summary to the user.

---

## Plan complete

After Task 18, all acceptance criteria from issue #59 are covered by automated tests, the double-counting bug is fixed, and the PR is open against `develop` ready for review and merge per gitflow.

## Self-review verification

**Spec coverage check** — every requirement in the spec mapped to a task:

| Spec section                                       | Task(s)                                        |
| -------------------------------------------------- | ---------------------------------------------- |
| Decisions: remove duplicate GA4 install            | 7                                              |
| Decisions: full-width bottom bar                   | 6 + 7                                          |
| Decisions: both inline + useEffect for restoration | 7 + 11 (test)                                  |
| Decisions: split logic from UI                     | 4 + 6 + 13                                     |
| Decisions: Playwright E2E only                     | 2 + 3                                          |
| Decisions: Chromium + WebKit                       | 2                                              |
| Architecture diagram                               | 4 + 6 + 7 + 13 + 14                            |
| `src/lib/consent.ts`                               | 4                                              |
| `src/components/ConsentBanner.tsx`                 | 6 + 7                                          |
| `src/components/WithdrawConsentButton.tsx`         | 13                                             |
| `src/app/layout.tsx` surgical diff                 | 7                                              |
| `src/app/privacy/page.tsx` updates                 | 14                                             |
| Playwright config + scripts                        | 2                                              |
| CI workflow                                        | 3                                              |
| `globals.css` keyframe                             | 5                                              |
| Edge case: cross-tab sync                          | 6 (component code includes `storage` listener) |
| Edge case: localStorage failures                   | 4 (try/catch in all helpers)                   |
| AC1 banner exists                                  | 7                                              |
| AC2 default-deny before GTM                        | 8                                              |
| AC3 localStorage persists                          | 10                                             |
| AC4 dataLayer push on click                        | 10                                             |
| AC5 returning visitor                              | 11                                             |
| AC6 GTM container consent gating                   | 16                                             |
| AC7 no GA pre-consent                              | 9                                              |
| AC8 GA fires after Accept                          | 12                                             |
| AC9 no GA after Reject                             | 9                                              |
| AC10 /privacy + withdraw                           | 14                                             |
| AC11 mobile CLS + footer                           | 15                                             |
| AC12 single GA hit per page load                   | 12                                             |
| Risk: branch hygiene                               | 1                                              |

No spec requirements without a task.

**Type/name consistency check:**

- `CONSENT_KEY`, `CONSENT_VERSION` — exported from Task 4, imported in Tasks 6, 7, 13 with identical names. ✓
- `readConsent`, `writeConsent`, `clearConsent`, `pushConsentUpdate` — identical names across Tasks 4, 6, 7, 13. ✓
- `StoredConsent` type, `ConsentChoice` type — only referenced in Task 4 (where defined) and Task 6 (which uses inferred return types). ✓
- DOM `localStorage` key `'sharp.consent.v1'` — appears in Tasks 4 (lib), 7 (inline script), 10 (test assertion), 14 (privacy page UI text). All identical. ✓
- `data-testid` or accessible-name selectors — tests use `getByRole('region', { name: /cookie consent/i })` matching `<aside role="region" aria-label="Cookie consent">` in Task 6. ✓
- `getByRole('button', { name: /accept all/i })` and `/reject non-essential/i` — match button text in Task 6. ✓

No drift detected.
