import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout';
import { getBlogPosts, getAllTags } from '@/lib/contentService';
import PageHeader from '@/components/sections/PageHeader';
import TagSection from '@/components/sections/TagSection';
import CardSection from '@/components/sections/CardSection';
import { blogPostsToCardSums } from '@/components/contentParsingUtils';

export const metadata: Metadata = {
  title: 'Blog - Digital Transformation Insights | #sharp',
  description:
    'Expert insights on digital transformation, AI implementation, customer experience optimization, and data analytics from the #sharp team.',
  keywords:
    'digital transformation blog, AI insights, customer experience, data analytics, business transformation',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const tags = await getAllTags();

  const postCards = blogPostsToCardSums(posts);

  return (
    <Layout>
      <PageHeader
        title={
          <>
            Our <span className="text-primary">Insights</span>
          </>
        }
        description={
          <>
            Expert perspectives on digital transformation, AI implementation,
            <br />
            and business optimization from the{' '}
            <span style={{ color: 'var(--primaryColor)' }}>#sharp</span> team.
          </>
        }
        image="/img/blog_bg.jpg"
      />

      <TagSection tags={tags} active="all-posts" />

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
