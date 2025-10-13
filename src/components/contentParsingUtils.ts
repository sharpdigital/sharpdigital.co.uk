import { BlogPost, CardSum } from '@/lib/appwrite';
import { ContentSectionProps } from './sections/ContentSection';

/** Convert simple markdown emphasis to inline HTML */
function mdInlineToHtml(s: string): string {
  // **bold**
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // _em_ or *em* (optional)
  s = s.replace(/(^|[^*])\*(?!\*)([^*]+)\*(?!\*)/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^_])_([^_]+)_/g, '$1<em>$2</em>');
  return s.trim();
}

/** Normalize and join paragraph lines */
function flushPara(buf: string[]): string | null {
  const text = buf.join(' ').replace(/\s+/g, ' ').trim();
  return text ? mdInlineToHtml(text) : null;
}

/** Parse markdown-ish content into ContentSectionProps */
export function parseContentSection(markdown: string): ContentSectionProps {
  const lines = markdown.split(/\r?\n/);

  const result: ContentSectionProps = { title: undefined, description: [], cards: [] };

  let currentCard: { title?: string; text?: string[]; list?: string[] } | null = null;
  let paraBuf: string[] = [];
  let inDescription = true;

  const pushParagraph = () => {
    const p = flushPara(paraBuf);
    paraBuf = [];
    if (!p) return;

    if (inDescription) {
      result.description!.push(p);
    } else if (currentCard) {
      (currentCard.text ??= []).push(p);
    }
  };

  // eslint-disable-next-line prefer-const
  for (let raw of lines) {
    const line = raw.trim();

    // Skip empty lines but flush paragraph when needed
    if (!line) {
      if (paraBuf.length) pushParagraph();
      continue;
    }

    // H1 => title
    const h1 = line.match(/^#\s+(.+)$/);
    if (h1) {
      if (paraBuf.length) pushParagraph();
      result.title = mdInlineToHtml(h1[1]);
      continue;
    }

    // H2 => new card
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      if (paraBuf.length) pushParagraph();
      inDescription = false;
      // finalize previous card
      if (currentCard) result.cards!.push(currentCard);
      currentCard = { title: mdInlineToHtml(h2[1]), text: [], list: [] };
      continue;
    }

    // List item
    const li = line.match(/^-+\s+(.*)$/);
    if (li) {
      if (paraBuf.length) pushParagraph();
      const content = mdInlineToHtml(li[1]);
      if (inDescription) {
        // If lists appear before any H2, treat them as a standalone card
        if (!currentCard) currentCard = { title: 'List', text: [], list: [] };
        inDescription = false;
      }
      (currentCard!.list ??= []).push(content);
      continue;
    }

    // Regular text line -> buffer for paragraph
    paraBuf.push(line);
  }

  // flush trailing paragraph and card
  if (paraBuf.length) pushParagraph();
  if (currentCard) result.cards!.push(currentCard);

  // Clean empty arrays
  if (result.description && result.description.length === 0) delete result.description;
  if (result.cards && result.cards.length === 0) delete result.cards;

  return result;
}

export function generateFeatureCards(features: string[]): CardSum[] {
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  return features.map((feature, i) => ({
    $id: String(i + 1),
    title: feature,
    slug: slugify(feature),
    description: `Expert implementation of ${feature.toLowerCase()} to drive measurable business results.`,
    image: `/img/feature_${i + 1}.jpg`,
  }));
}

export function blogPostsToCardSums(posts: BlogPost[]): CardSum[] {
  return posts.map((post, index) => ({
    $id: post.$id,
    title: post.title,
    slug: post.slug,
    description: post.excerpt ?? null,
    content: post.content ?? null,
    image: post.featuredImageUrl ?? null,
    tags: post.tags ?? [],
    author: post.author ?? null,
    publishDate: post.publishDate ?? null,
    $createdAt: post.$createdAt ?? undefined,
    orderIndex: index + 1,
    buttonText: 'Read More',
  }));
}

export function slugToText(slug: string): string {
  return slug
    .replace(/(^[a-z])|-(\w)/g, (_, first, afterDash) => (first || ' ' + afterDash).toUpperCase())
    .replace(/-/g, ' ')
    .replace(/\b(Ux|Ui|Ai)\b/g, (match) => match.toUpperCase());
}

export function textToSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-');
}
