#!/usr/bin/env node
// Generator for docs/templates/proposal-template.pptx.
// Produces the 5-slide V1 (Forwarded context) deck per
// docs/brand/proposal.md and docs/superpowers/specs/2026-05-05-proposal-template-design.md.
//
// Layout matches the website page chrome: white header strip with logo (top),
// hero band with the page-specific bg image and white title (middle),
// white content area (below). Master slide carries the "Confidential · #sharp" footer.
//
// Run: npm run generate:proposal-template

import PptxGenJS from 'pptxgenjs';
import { resolve, dirname } from 'node:path';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const OUT_PATH = resolve(ROOT, 'docs/templates/proposal-template.pptx');
const LOGO_PATH = resolve(ROOT, 'img/sharp_logo.svg');

// Hero images per slide — each maps to the website page that owns this content.
const HEROES = {
  cover:     resolve(ROOT, 'public/img/services_bg.jpg'),
  about:     resolve(ROOT, 'public/img/about_bg.jpg'),
  brief:     resolve(ROOT, 'public/img/analyse.jpg'),
  solutions: resolve(ROOT, 'public/img/automation.jpg'),
  nextSteps: resolve(ROOT, 'public/img/contact_bg.jpg'),
};

const RED = 'D41F21';
const CHARCOAL = '333333';
const GREY = '666666';
const HAIRLINE = 'EEEEEE';
const WHITE = 'FFFFFF';

// Slide geometry (LAYOUT_WIDE = 13.333" × 7.5"):
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const HEADER_H = 0.7;        // white strip with logo (matches site header h-20)
const HERO_TOP = HEADER_H;
const HERO_H = 1.85;         // hero band height for content slides
const HERO_BOTTOM = HERO_TOP + HERO_H;  // 2.55
const CONTENT_TOP = 2.7;
const CONTENT_BOTTOM = 6.95; // above master footer at 7.05
const COVER_HERO_BOTTOM = 7.0; // cover hero stops above master footer line

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';        // 13.333 × 7.5 inches (16:9 widescreen)
pptx.title = '#sharp · Proposal · Template';
pptx.subject = 'Proposal deck template';
pptx.company = '#sharp';

// --- Master slide: white background + footer "Confidential · #sharp" (text only — no footer logo per proposal.md §5) ---
pptx.defineSlideMaster({
  title: 'SHARP_PROPOSAL',
  background: { color: WHITE },
  objects: [
    {
      text: {
        text: 'Confidential · #sharp',
        options: {
          x: 0.5, y: 7.05, w: 12.33, h: 0.3,
          fontFace: 'Inter', fontSize: 9, color: CHARCOAL,
          align: 'left', valign: 'middle',
        },
      },
    },
  ],
});

// White header strip with the logo top-left — same chrome as the site header.
function addHeaderStrip(slide) {
  // Master bg is already white, so 0..HEADER_H stays white.
  // Thin charcoal hairline along the bottom edge of the strip mirrors the site's border-b.
  slide.addShape(pptx.ShapeType.line, {
    x: 0, y: HEADER_H, w: SLIDE_W, h: 0,
    line: { color: HAIRLINE, width: 0.75 },
  });
  slide.addImage({ path: LOGO_PATH, x: 0.5, y: 0.15, w: 1.4, h: 0.4 });
}

// Hero band for content slides 2–5: bg image + dark overlay + white title.
function addHeroBand(slide, heroPath, title) {
  slide.addImage({
    path: heroPath,
    x: 0, y: HERO_TOP, w: SLIDE_W, h: HERO_H,
    sizing: { type: 'cover', w: SLIDE_W, h: HERO_H },
  });
  // Dark charcoal overlay for white-text legibility (matches the site's PageHeader treatment).
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: HERO_TOP, w: SLIDE_W, h: HERO_H,
    fill: { color: CHARCOAL, transparency: 35 },
    line: { type: 'none' },
  });
  // Slide title — Manrope 36pt, white, vertically centred in the hero band.
  slide.addText(title, {
    x: 0.9, y: HERO_TOP, w: 11.5, h: HERO_H,
    fontFace: 'Manrope', fontSize: 36, color: WHITE,
    align: 'left', valign: 'middle',
  });
  // Red accent line beneath the title — kept as the brand "underline" motif,
  // sat low in the hero so it reads like a divider into the content area.
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: HERO_BOTTOM - 0.12, w: 1.8, h: 0.06,
    fill: { color: RED }, line: { color: RED },
  });
}

// --- Slide 1: Cover (per-proposal placeholders) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  addHeaderStrip(slide);

  // Full-bleed hero below the header (stops above master footer line).
  slide.addImage({
    path: HEROES.cover,
    x: 0, y: HERO_TOP, w: SLIDE_W, h: COVER_HERO_BOTTOM - HERO_TOP,
    sizing: { type: 'cover', w: SLIDE_W, h: COVER_HERO_BOTTOM - HERO_TOP },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: HERO_TOP, w: SLIDE_W, h: COVER_HERO_BOTTOM - HERO_TOP,
    fill: { color: CHARCOAL, transparency: 35 },
    line: { type: 'none' },
  });

  // Project topic — large Manrope, white, vertically centred-ish in the hero.
  slide.addText('[Project topic]', {
    x: 0.9, y: 2.4, w: 11.5, h: 1.6,
    fontFace: 'Manrope', fontSize: 60, bold: false, color: WHITE,
    align: 'left', valign: 'middle',
  });

  // Red accent line beneath the title.
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: 4.2, w: 6.0, h: 0.06,
    fill: { color: RED }, line: { color: RED },
  });

  // Client name + proposal date — bottom-right, white over hero.
  slide.addText(
    [
      { text: '[Client name]', options: { fontFace: 'Inter', fontSize: 14, color: WHITE } },
      { text: '\n[Proposal date]', options: { fontFace: 'Inter', fontSize: 14, color: WHITE } },
    ],
    { x: 8.5, y: 6.0, w: 4.3, h: 0.7, align: 'right', valign: 'bottom' }
  );
}

// --- Slide 2: About us / Why us (static content) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  addHeaderStrip(slide);
  addHeroBand(slide, HEROES.about, 'About #sharp');

  // Left column: About us
  slide.addText('About us', {
    x: 0.9, y: CONTENT_TOP, w: 5.5, h: 0.4,
    fontFace: 'Manrope', fontSize: 14, bold: true, color: CHARCOAL,
  });
  slide.addText(
    [
      { text: 'Digital transformation consultancy bridging vision and execution.', options: { bullet: true } },
      { text: 'We combine deep business acumen with cutting-edge technical expertise.', options: { bullet: true } },
      { text: 'Collaborative, data-driven, focused on sustainable, measurable results.', options: { bullet: true } },
    ],
    {
      x: 0.9, y: CONTENT_TOP + 0.45, w: 5.5, h: CONTENT_BOTTOM - (CONTENT_TOP + 0.45),
      fontFace: 'Inter', fontSize: 18, color: CHARCOAL,
      paraSpaceAfter: 8, valign: 'top',
    }
  );

  // Right column: Why us
  slide.addText('Why us', {
    x: 7.0, y: CONTENT_TOP, w: 5.5, h: 0.4,
    fontFace: 'Manrope', fontSize: 14, bold: true, color: CHARCOAL,
  });
  slide.addText(
    [
      { text: 'Specific outcomes, measured in weeks — not vague programmes.', options: { bullet: true } },
      { text: 'AI transformation framework grounded in twelve years of practice.', options: { bullet: true } },
      { text: 'Robust, repeatable digital processes — not bespoke heroics.', options: { bullet: true } },
      { text: 'We name what is in scope, what is not, and why.', options: { bullet: true } },
    ],
    {
      x: 7.0, y: CONTENT_TOP + 0.45, w: 5.5, h: CONTENT_BOTTOM - (CONTENT_TOP + 0.45),
      fontFace: 'Inter', fontSize: 18, color: CHARCOAL,
      paraSpaceAfter: 8, valign: 'top',
    }
  );
}

// --- Slide 3: Your brief (placeholder) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  addHeaderStrip(slide);
  addHeroBand(slide, HEROES.brief, 'Your brief');

  slide.addText(
    [
      { text: '[Problem statement — one line]', options: { bullet: true } },
      { text: '[Key goal 1 — what the client wants to achieve]', options: { bullet: true } },
      { text: '[Key goal 2]', options: { bullet: true } },
      { text: '[Scope boundary — what is in / out]', options: { bullet: true } },
      { text: '[Constraint or dependency the client flagged]', options: { bullet: true } },
    ],
    {
      x: 0.9, y: CONTENT_TOP, w: 11.5, h: CONTENT_BOTTOM - CONTENT_TOP,
      fontFace: 'Inter', fontSize: 22, color: CHARCOAL,
      paraSpaceAfter: 12, valign: 'top',
    }
  );
}

// --- Slide 4: Proposed solutions (5-card grid, placeholders) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  addHeaderStrip(slide);
  addHeroBand(slide, HEROES.solutions, 'Proposed solutions');

  // Card layout: 5 cards × 2.15" + 4 × 0.2" gutters = 11.55" total content row,
  // starting at 0.9" left margin → cards span 0.9" to 12.45", leaving 0.88" right margin
  // within the 13.333" LAYOUT_WIDE frame.
  const cardY = CONTENT_TOP;
  const cardW = 2.15;
  const gutter = 0.2;
  const startX = 0.9;

  // Per-card row layout (relative to cardY):
  //   title         0.00 – 0.35
  //   description   0.40 – 1.70
  //   outcome       1.80 – 2.95
  //   divider       3.05
  //   effort/price  3.15 – 3.50
  // Card total height ~3.5" — fits within CONTENT_TOP..6.45 with VAT note below.
  for (let i = 0; i < 5; i += 1) {
    const x = startX + i * (cardW + gutter);

    slide.addText(`${i + 1}. [Card title]`, {
      x, y: cardY, w: cardW, h: 0.35,
      fontFace: 'Manrope', fontSize: 14, bold: true, color: CHARCOAL,
    });
    slide.addText('[Description ≤ 15 words explaining the solution.]', {
      x, y: cardY + 0.40, w: cardW, h: 1.30,
      fontFace: 'Inter', fontSize: 11, color: CHARCOAL, valign: 'top',
    });
    slide.addText(
      [
        { text: 'Outcome: ', options: { bold: true } },
        { text: '[outcome ≤ 10 words].' },
      ],
      {
        x, y: cardY + 1.80, w: cardW, h: 1.15,
        fontFace: 'Inter', fontSize: 11, color: CHARCOAL, valign: 'top',
      }
    );

    // Hairline divider above the card footer row.
    slide.addShape(pptx.ShapeType.line, {
      x, y: cardY + 3.05, w: cardW, h: 0,
      line: { color: HAIRLINE, width: 0.75 },
    });

    // Effort (left) and price (right).
    slide.addText('[N] days', {
      x, y: cardY + 3.15, w: cardW * 0.5, h: 0.35,
      fontFace: 'Inter', fontSize: 11, color: GREY, align: 'left',
    });
    slide.addText('£[N,NNN]', {
      x: x + cardW * 0.5, y: cardY + 3.15, w: cardW * 0.5, h: 0.35,
      fontFace: 'Inter', fontSize: 11, bold: true, color: RED, align: 'right',
    });
  }

  // VAT note — bottom-left of the slide content area, below the cards.
  slide.addText('All prices exclude VAT.', {
    x: 0.9, y: 6.55, w: 6.0, h: 0.3,
    fontFace: 'Inter', fontSize: 9, color: CHARCOAL, align: 'left',
  });
}

// --- Slide 5: Next steps (placeholder + standard contact) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  addHeaderStrip(slide);
  addHeroBand(slide, HEROES.nextSteps, 'Next steps');

  slide.addText(
    [
      { text: '1. [Client action — e.g. confirm preferred option(s) by date]' },
      { text: '2. [#sharp action — e.g. kickoff workshop on agreed date]' },
      { text: '3. [Optional joint action]' },
    ],
    {
      x: 0.9, y: CONTENT_TOP, w: 11.5, h: 3.0,
      fontFace: 'Inter', fontSize: 24, color: CHARCOAL,
      paraSpaceAfter: 16, valign: 'top',
    }
  );

  // Contact lockup (placeholders).
  slide.addText('[Name] · [email] · [booking link]', {
    x: 0.9, y: 6.4, w: 11.5, h: 0.4,
    fontFace: 'Inter', fontSize: 16, color: CHARCOAL, align: 'left',
  });
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
await pptx.writeFile({ fileName: OUT_PATH });
console.log(`Wrote ${OUT_PATH}`);
