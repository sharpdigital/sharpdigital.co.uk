import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import { getBlogPost, getBlogPosts } from '@/lib/contentService';
import PageHeader from '@/components/sections/PageHeader';
import {
  assembleDetails,
  blogPostsToCardSums,
  parseContentSection,
} from '@/components/contentParsingUtils';
import TagSection from '@/components/sections/TagSection';
import ContentSection, { ContentSectionProps } from '@/components/sections/ContentSection';
import CardSection from '@/components/sections/CardSection';
import PageEndSection from '@/components/sections/PageEndSection';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found - #sharp',
      description: 'The requested blog post was not found.',
    };
  }

  const ogImage = post.featuredImageUrl || '/img/blog_bg.jpg';

  return {
    title: `${post.title} | #sharp Blog`,
    description: post.excerpt || '',
    keywords: post.tags.join(', '),
    alternates: {
      canonical: `https://sharpdigital.co.uk/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.publishDate || '',
      authors: [post.author || ''],
      tags: post.tags,
      images: [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same tags, excluding current post)
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.$id !== post.$id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  const contentSetup: ContentSectionProps = parseContentSection(post.content ?? '');

  const related = relatedPosts.length ? blogPostsToCardSums(relatedPosts) : undefined;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    datePublished: post.publishDate || post.$createdAt,
    dateModified: post.$updatedAt || post.$createdAt,
    author: { '@type': 'Person', name: post.author || '#sharp' },
    publisher: {
      '@type': 'Organization',
      name: '#sharp',
      logo: { '@type': 'ImageObject', url: 'https://sharpdigital.co.uk/img/sharp_logo.svg' },
    },
    image: post.featuredImageUrl || 'https://sharpdigital.co.uk/img/blog_bg.jpg',
    url: `https://sharpdigital.co.uk/blog/${slug}`,
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Hero Section */}
      <PageHeader
        title={post.title}
        description={post.excerpt}
        image={post.featuredImageUrl ?? undefined}
        details={assembleDetails({
          $createdAt: post.$createdAt,
          author: post.author,
        })}
      />
      <TagSection tags={post.tags} single />
      <ContentSection {...contentSetup} />
      {!!related && (
        <CardSection
          setup={related}
          title="Related Articles"
          description="Continue exploring our insights on digital transformation and business optimization."
          linkBase="/blog/"
          isGrid
          hasBackground
        />
      )}
      <PageEndSection
        title="Ready to Transform Your Business?"
        description="Let's talk about your digital transformation goals and how our expert guidance can bring it life"
        primaryButtonText="Get Started"
        primaryButtonLink="/contact"
        secondaryButtonText="More Articles"
        secondaryButtonLink="/blog"
        noBackground={!!relatedPosts.length}
      />
    </Layout>
  );
}
