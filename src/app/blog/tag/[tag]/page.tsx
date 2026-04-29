import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import { getBlogPostsByTag, getAllTags } from '@/lib/contentService';
import PageHeader from '@/components/sections/PageHeader';
import { blogPostsToCardSums, slugToText, textToSlug } from '@/components/contentParsingUtils';
import TagSection from '@/components/sections/TagSection';
import CardSection from '@/components/sections/CardSection';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const displayTag = tag.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${displayTag} Articles - #sharp Blog`,
    description: `Expert insights and articles about ${displayTag.toLowerCase()} in digital transformation from the #sharp team.`,
    keywords: `${displayTag.toLowerCase()}, digital transformation, business optimization, ${displayTag.toLowerCase()} articles`,
    alternates: {
      canonical: `https://sharpdigital.co.uk/blog/tag/${tag}`,
    },
    openGraph: {
      title: `${displayTag} Articles - #sharp Blog`,
      description: `Expert insights and articles about ${displayTag.toLowerCase()} in digital transformation from the #sharp team.`,
      type: 'website',
      images: [{ url: '/img/blog_bg.jpg', alt: `${displayTag} articles` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayTag} Articles - #sharp Blog`,
      description: `Expert insights and articles about ${displayTag.toLowerCase()} in digital transformation from the #sharp team.`,
      images: ['/img/blog_bg.jpg'],
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const displayTag = slugToText(tag);
  // Get all tags and find the matching one (case-insensitive)
  const allTags = await getAllTags();
  const originalTag = allTags.find((t) => t.toLowerCase().replace(/\s+/g, '-') === tag);

  if (!originalTag) {
    notFound();
  }

  const posts = await getBlogPostsByTag(originalTag);

  const postCards = blogPostsToCardSums(posts);
  return (
    <Layout>
      <PageHeader
        title={
          <>
            {displayTag} <span className="text-primary">Articles</span>
          </>
        }
        description={
          <>
            Expert insights and practical guidance on {displayTag.toLowerCase()} from the #sharp
            team.
          </>
        }
        image="/img/blog_bg.jpg"
      />

      <TagSection tags={allTags} active={textToSlug(tag)} />
      <CardSection
        setup={postCards}
        minTitleHeight={'1em'}
        linkBase="/blog/"
        secondaryButton
        extraPaddingTop
      />
    </Layout>
  );
}
