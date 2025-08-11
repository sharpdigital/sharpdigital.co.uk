import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import RichTextRenderer from '@/components/RichTextRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBlogPost, getBlogPosts } from '@/lib/contentService';
import { formatDate } from '@/lib/utils';

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

  return {
    title: `${post.title} | #sharp Blog`,
    description: post.excerpt || '',
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.publishDate || '',
      authors: [post.author || ''],
      tags: post.tags,
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
    .filter(p => p.$id !== post.$id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-primary font-body text-lg">
                {formatDate(post.publishDate || '')}
              </span>
              <span className="text-charcoal font-body text-lg">
                by {post.author || 'Unknown'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading leading-tight text-charcoal mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-charcoal font-body leading-relaxed max-w-3xl mx-auto mb-8">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Badge variant="outline" className="text-base px-4 py-2 hover:bg-primary hover:text-white transition-colors">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <RichTextRenderer content={post.content || null} />
          </article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
                Related Articles
              </h2>
              <p className="text-lg text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
                Continue exploring our insights on digital transformation and business optimization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.$id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-primary font-body">
                        {formatDate(relatedPost.publishDate || '')}
                      </span>
                      <span className="text-sm text-charcoal font-body">
                        by {relatedPost.author || 'Unknown'}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-heading text-charcoal line-clamp-2">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-base text-charcoal font-body leading-relaxed mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {relatedPost.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link 
                      href={`/blog/${relatedPost.slug}`}
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
      )}

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-charcoal font-body leading-relaxed mb-8">
            Let&apos;s discuss how we can help you achieve your digital transformation goals with proven strategies and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-primary text-white font-heading text-base px-8 py-4 rounded-md hover:bg-primary-hover active:bg-primary-active transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Get Started
              </Button>
            </Link>
            <Link href="/blog">
              <Button 
                variant="outline" 
                className="bg-transparent text-primary border-2 border-primary font-heading text-base px-8 py-4 rounded-md hover:bg-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                More Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}