import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBlogPosts, getAllTags } from '@/lib/contentService';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog - Digital Transformation Insights | #sharp',
  description: 'Expert insights on digital transformation, AI implementation, customer experience optimization, and data analytics from the #sharp team.',
  keywords: 'digital transformation blog, AI insights, customer experience, data analytics, business transformation',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const tags = await getAllTags();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading leading-tight text-charcoal mb-6">
              Our <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              Expert perspectives on digital transformation, AI implementation, and business optimization from the #sharp team.
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
              {tags.map((tag) => (
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

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.sys.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-primary font-body">
                        {formatDate(post.fields.publishDate)}
                      </span>
                      <span className="text-sm text-charcoal font-body">
                        by {post.fields.author}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-heading text-charcoal line-clamp-2">
                      <Link href={`/blog/${post.fields.slug}`} className="hover:text-primary transition-colors">
                        {post.fields.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-base text-charcoal font-body leading-relaxed mb-4 line-clamp-3">
                      {post.fields.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.fields.tags.map((tag) => (
                        <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Badge variant="secondary" className="text-xs hover:bg-primary hover:text-white transition-colors">
                            {tag}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                    <Link 
                      href={`/blog/${post.fields.slug}`}
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
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-heading text-charcoal mb-4">No blog posts found</h3>
              <p className="text-lg text-charcoal font-body">
                We&apos;re working on bringing you fresh insights. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}