#!/usr/bin/env node
// Generator for docs/templates/proposal-template.pptx.
// Produces the 5-slide V1 (Forwarded context) deck per
// docs/brand/proposal.md and docs/superpowers/specs/2026-05-05-proposal-template-design.md.
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

const RED = 'D41F21';
const CHARCOAL = '333333';
const GREY = '666666';
const HAIRLINE = 'EEEEEE';

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';        // 13.333 × 7.5 inches = 1920 × 1080 at 144 dpi
pptx.title = '#sharp · Proposal · Template';
pptx.subject = 'Proposal deck template';
pptx.company = '#sharp';

// --- Master slide: footer "Confidential · #sharp" (text only — no footer logo per proposal.md §5) ---
pptx.defineSlideMaster({
  title: 'SHARP_PROPOSAL',
  background: { color: 'FFFFFF' },
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

// --- Slide 1: Cover (per-proposal placeholders) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  slide.addImage({ path: LOGO_PATH, x: 0.5, y: 0.4, w: 1.4, h: 0.4 });
  slide.addText('[Project topic]', {
    x: 0.9, y: 2.6, w: 11.5, h: 1.2,
    fontFace: 'Manrope', fontSize: 60, bold: false, color: CHARCOAL, align: 'left',
  });
  // Red accent line beneath the title
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: 3.95, w: 6.0, h: 0.06,
    fill: { color: RED }, line: { color: RED },
  });
  slide.addText(
    [
      { text: '[Client name]', options: { fontFace: 'Inter', fontSize: 14, color: CHARCOAL } },
      { text: '\n[Proposal date]', options: { fontFace: 'Inter', fontSize: 14, color: CHARCOAL } },
    ],
    { x: 8.5, y: 6.0, w: 4.3, h: 0.7, align: 'right', valign: 'bottom' }
  );
}

// --- Slide 2: About us / Why us (static content) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  slide.addText('About #sharp', {
    x: 0.9, y: 0.7, w: 11.5, h: 0.7,
    fontFace: 'Manrope', fontSize: 36, color: CHARCOAL, align: 'left',
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: 1.45, w: 3.0, h: 0.04,
    fill: { color: RED }, line: { color: RED },
  });

  // Left column: About us
  slide.addText('About us', {
    x: 0.9, y: 1.9, w: 5.5, h: 0.4,
    fontFace: 'Manrope', fontSize: 14, bold: true, color: CHARCOAL,
  });
  slide.addText(
    [
      { text: 'Digital transformation consultancy bridging vision and execution.', options: { bullet: true } },
      { text: 'We combine deep business acumen with cutting-edge technical expertise.', options: { bullet: true } },
      { text: 'Collaborative, data-driven, focused on sustainable, measurable results.', options: { bullet: true } },
    ],
    {
      x: 0.9, y: 2.3, w: 5.5, h: 4.0,
      fontFace: 'Inter', fontSize: 18, color: CHARCOAL,
      paraSpaceAfter: 8, valign: 'top',
    }
  );

  // Right column: Why us
  slide.addText('Why us', {
    x: 7.0, y: 1.9, w: 5.5, h: 0.4,
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
      x: 7.0, y: 2.3, w: 5.5, h: 4.0,
      fontFace: 'Inter', fontSize: 18, color: CHARCOAL,
      paraSpaceAfter: 8, valign: 'top',
    }
  );
}

// --- Slide 3: Your brief (placeholder) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  slide.addText('Your brief', {
    x: 0.9, y: 0.7, w: 11.5, h: 0.7,
    fontFace: 'Manrope', fontSize: 36, color: CHARCOAL,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: 1.45, w: 3.0, h: 0.04,
    fill: { color: RED }, line: { color: RED },
  });
  slide.addText(
    [
      { text: '[Problem statement — one line]', options: { bullet: true } },
      { text: '[Key goal 1 — what the client wants to achieve]', options: { bullet: true } },
      { text: '[Key goal 2]', options: { bullet: true } },
      { text: '[Scope boundary — what is in / out]', options: { bullet: true } },
      { text: '[Constraint or dependency the client flagged]', options: { bullet: true } },
    ],
    {
      x: 0.9, y: 2.0, w: 11.5, h: 4.5,
      fontFace: 'Inter', fontSize: 22, color: CHARCOAL,
      paraSpaceAfter: 12, valign: 'top',
    }
  );
}

// --- Slide 4: Proposed solutions (5-card grid, placeholders) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  slide.addText('Proposed solutions', {
    x: 0.9, y: 0.5, w: 11.5, h: 0.6,
    fontFace: 'Manrope', fontSize: 36, color: CHARCOAL,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: 1.15, w: 3.0, h: 0.04,
    fill: { color: RED }, line: { color: RED },
  });

  // Card layout: 5 cards × 2.15" + 4 × 0.2" gutters = 11.55" total content row,
  // starting at 0.9" left margin → cards span 0.9" to 12.45", leaving 0.88" right margin
  // within the 13.333" LAYOUT_WIDE frame.
  const cardY = 1.6;
  const cardH = 4.6;
  const cardW = 2.15;
  const gutter = 0.2;
  const startX = 0.9;

  for (let i = 0; i < 5; i += 1) {
    const x = startX + i * (cardW + gutter);

    slide.addText(`${i + 1}. [Card title]`, {
      x, y: cardY, w: cardW, h: 0.4,
      fontFace: 'Manrope', fontSize: 14, bold: true, color: CHARCOAL,
    });
    slide.addText('[Description ≤ 15 words explaining the solution.]', {
      x, y: cardY + 0.45, w: cardW, h: 1.5,
      fontFace: 'Inter', fontSize: 11, color: CHARCOAL, valign: 'top',
    });
    slide.addText(
      [
        { text: 'Outcome: ', options: { bold: true } },
        { text: '[outcome ≤ 10 words].' },
      ],
      {
        x, y: cardY + 2.05, w: cardW, h: 1.3,
        fontFace: 'Inter', fontSize: 11, color: CHARCOAL, valign: 'top',
      }
    );

    // Hairline divider above the card footer row
    slide.addShape(pptx.ShapeType.line, {
      x, y: cardY + 3.95, w: cardW, h: 0,
      line: { color: HAIRLINE, width: 0.75 },
    });

    // Effort (left) and price (right)
    slide.addText('[N] days', {
      x, y: cardY + 4.05, w: cardW * 0.5, h: 0.4,
      fontFace: 'Inter', fontSize: 11, color: GREY, align: 'left',
    });
    slide.addText('£[N,NNN]', {
      x: x + cardW * 0.5, y: cardY + 4.05, w: cardW * 0.5, h: 0.4,
      fontFace: 'Inter', fontSize: 11, bold: true, color: RED, align: 'right',
    });
  }

  // VAT note
  slide.addText('All prices exclude VAT.', {
    x: 0.9, y: 6.5, w: 6.0, h: 0.3,
    fontFace: 'Inter', fontSize: 9, color: CHARCOAL, align: 'left',
  });
}

// --- Slide 5: Next steps (placeholder + standard contact) ---
{
  const slide = pptx.addSlide({ masterName: 'SHARP_PROPOSAL' });
  slide.addText('Next steps', {
    x: 0.9, y: 0.7, w: 11.5, h: 0.7,
    fontFace: 'Manrope', fontSize: 36, color: CHARCOAL,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.9, y: 1.45, w: 3.0, h: 0.04,
    fill: { color: RED }, line: { color: RED },
  });

  slide.addText(
    [
      { text: '1. [Client action — e.g. confirm preferred option(s) by date]' },
      { text: '2. [#sharp action — e.g. kickoff workshop on agreed date]' },
      { text: '3. [Optional joint action]' },
    ],
    {
      x: 0.9, y: 2.0, w: 11.5, h: 3.0,
      fontFace: 'Inter', fontSize: 24, color: CHARCOAL,
      paraSpaceAfter: 16, valign: 'top',
    }
  );

  // Contact lockup (placeholders)
  slide.addText(
    [
      { text: '[Name] · [email] · [booking link]', options: { fontSize: 16 } },
    ],
    {
      x: 0.9, y: 6.4, w: 11.5, h: 0.4,
      fontFace: 'Inter', color: CHARCOAL, align: 'left',
    }
  );
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
await pptx.writeFile({ fileName: OUT_PATH });
console.log(`Wrote ${OUT_PATH}`);
