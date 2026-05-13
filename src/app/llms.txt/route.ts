import { getBlogPosts, getServices, getAllTags } from '@/lib/contentService';

export const dynamic = 'force-static';

const BASE_URL = 'https://sharpdigital.co.uk';

const slugifyTag = (tag: string) => tag.toLowerCase().replace(/\s+/g, '-');

export async function GET() {
  const [services, blogPosts, tags] = await Promise.all([
    getServices(),
    getBlogPosts(),
    getAllTags(),
  ]);

  const orderedServices = [...services].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  const orderedBlogPosts = [...blogPosts].sort((a, b) => {
    const aDate = a.publishDate ? new Date(a.publishDate).getTime() : 0;
    const bDate = b.publishDate ? new Date(b.publishDate).getTime() : 0;
    return bDate - aDate;
  });

  const lines: string[] = [];

  lines.push('# #sharp — Digital Transformation Consultancy');
  lines.push('');
  lines.push('> Expert guidance for ambitious businesses navigating digital transformation.');
  lines.push('> Based in the United Kingdom.');
  lines.push('');

  lines.push('## Key pages');
  lines.push('');
  lines.push(`- [Home](${BASE_URL}/): Overview of services and latest insights`);
  lines.push(`- [About](${BASE_URL}/about/): Our story, approach, and team`);
  lines.push(`- [Services](${BASE_URL}/services/): Digital transformation service areas`);
  lines.push(`- [Blog](${BASE_URL}/blog/): Thought leadership and industry insights`);
  lines.push(`- [Contact](${BASE_URL}/contact/): Get in touch`);
  lines.push('');

  if (orderedServices.length > 0) {
    lines.push('## Services');
    lines.push('');
    for (const service of orderedServices) {
      const summary = service.description?.trim();
      lines.push(
        `- [${service.title}](${BASE_URL}/services/${service.slug}/)${summary ? `: ${summary}` : ''}`
      );
    }
    lines.push('');
  }

  if (orderedBlogPosts.length > 0) {
    lines.push('## Blog posts');
    lines.push('');
    for (const post of orderedBlogPosts) {
      const summary = post.excerpt?.trim();
      lines.push(
        `- [${post.title}](${BASE_URL}/blog/${post.slug}/)${summary ? `: ${summary}` : ''}`
      );
    }
    lines.push('');
  }

  if (tags.length > 0) {
    lines.push('## Blog topics');
    lines.push('');
    for (const tag of tags) {
      lines.push(`- [${tag}](${BASE_URL}/blog/tag/${slugifyTag(tag)}/)`);
    }
    lines.push('');
  }

  lines.push('## Optional');
  lines.push('');
  lines.push(`- [Sitemap](${BASE_URL}/sitemap.xml)`);
  lines.push(`- [Terms & Conditions](${BASE_URL}/terms/)`);
  lines.push(`- [Privacy Policy](${BASE_URL}/privacy/)`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
