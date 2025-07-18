import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBlogPostsByTag, getAllTags } from '@/lib/contentService';
import { formatDate } from '@/lib/utils';

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
  const displayTag = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${displayTag} Articles - #sharp Blog`,
    description: `Expert insights and articles about ${displayTag.toLowerCase()} in digital transformation from the #sharp team.`,
    keywords: `${displayTag.toLowerCase()}, digital transformation, business optimization, ${displayTag.toLowerCase()} articles`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const displayTag = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Get all tags and find the matching one (case-insensitive)
  const allTags = await getAllTags();
  const originalTag = allTags.find(t => t.toLowerCase().replace(/\s+/g, '-') === tag);
  
  if (!originalTag) {
    notFound();
  }
  
  const posts = await getBlogPostsByTag(originalTag);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <Badge variant="outline" className="text-lg px-6 py-3 mb-4">
                {displayTag}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading leading-tight text-charcoal mb-6">
              {displayTag} <span className="text-primary">Articles</span>
            </h1>
            <p className="text-xl text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              Expert insights and practical guidance on {displayTag.toLowerCase()} from the #sharp team.
            </p>
          </div>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading text-charcoal mb-4">Browse by Topic</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/blog">
                <Badge variant="outline" className="text-base px-4 py-2 hover:bg-primary hover:text-white transition-colors">
                  All Posts
                </Badge>
              </Link>
              {allTags.map((tagItem) => {
                const tagSlug = tagItem.toLowerCase().replace(/\s+/g, '-');
                const isCurrentTag = tagSlug === tag;
                return (
                  <Link key={tagItem} href={`/blog/tag/${tagSlug}`}>
                    <Badge 
                      variant={isCurrentTag ? "default" : "outline"} 
                      className={`text-base px-4 py-2 transition-colors ${
                        isCurrentTag 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-primary hover:text-white'
                      }`}
                    >
                      {tagItem}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-heading text-charcoal mb-4">
              {posts.length} {posts.length === 1 ? 'Article' : 'Articles'} about {displayTag}
            </h2>
            <div className="w-24 h-1 bg-primary"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-primary font-body">
                      {formatDate(post.publish_date || '')}
                    </span>
                    <span className="text-sm text-charcoal font-body">
                      by {post.author || 'Unknown'}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-heading text-charcoal line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-base text-charcoal font-body leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tagItem) => (
                      <Link key={tagItem} href={`/blog/tag/${tagItem.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Badge 
                          variant={tagItem === originalTag ? "default" : "secondary"} 
                          className={`text-xs transition-colors ${
                            tagItem === originalTag 
                              ? 'bg-primary text-white' 
                              : 'hover:bg-primary hover:text-white'
                          }`}
                        >
                          {tagItem}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary font-body text-sm hover:text-primary-hover transition-colors"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}