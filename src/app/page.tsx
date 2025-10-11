import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import HeroCarousel from '@/components/HeroCarousel';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import Carousel, { exampleSetup } from '@/components/caroussel/Carousel';
import AnimButton from '@/components/ui/AnimButton';
import CardSection from '../components/sections/CardSection';
import { getServices } from '@/lib/contentService';

export default async function Home() {
  const services = await getServices();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '#sharp',
    description:
      'Leading digital transformation consultancy helping businesses navigate their digital evolution with proven strategies.',
    url: 'https://sharpdigital.co.uk',
    logo: 'https://sharpdigital.co.uk/img/sharp_logo.svg',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://sharpdigital.co.uk/contact',
    },
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
    areaServed: 'GB',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Transformation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Customer Experience Transformation',
          description:
            'Optimize every touchpoint for exceptional customer journeys through digital transformation.',
        },
        {
          '@type': 'Offer',
          name: 'Operational Efficiency',
          description:
            'Streamline processes through intelligent automation and workflow optimization.',
        },
        {
          '@type': 'Offer',
          name: 'Data & Analytics',
          description:
            'Transform data into actionable business intelligence through advanced analytics.',
        },
      ],
    },
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      {/* Hero Carousel Section */}
      <Carousel setup={exampleSetup} hasMouse />

      {/* #sharp Statement Section */}
      <section className="py-19 bg-white" aria-label="About Sharp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="intro-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:text-left">
              <Image
                src="/img/sharp_logo.svg"
                alt="#sharp logo"
                width={200}
                height={80}
                className="h-20 w-auto mx-auto lg:mx-0 mb-6"
              />
            </div>
            <div className="lg:text-left">
              <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
                <span className="text-primary">#sharp</span> simplifies digital transformation for
                ambitious businesses
              </h2>
              <p className="text-lg text-charcoal font-body leading-relaxed mb-7">
                Expert guidance throughout your digital transformation journey, led by seasoned
                industry professionals. We combine business acumen with technical expertise to guide
                organisations through their digital evolution, one click at a time.
              </p>
              <Link href="/contact">
                <AnimButton>
                  <div className="px-6 py-2">Get Started</div>
                </AnimButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <CardSection
        setup={services}
        title="Our Service Areas"
        description="We focus on three core areas that are essential for successful digital transformation."
        isGrid
        hasBackground
      />

      {/* Blog Section */}
      <section className="py-20 bg-white" aria-label="Latest blog posts">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              Latest Insights & Thought Leadership
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed">
              Digital transformation expertise and industry insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <article className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-orange-sharp to-yellow-sharp"></div>
              <div className="p-6">
                <h3 className="text-xl font-heading leading-normal text-charcoal mb-2">
                  AI Strategy Implementation Guide
                </h3>
                <p className="text-sm font-body leading-snug text-charcoal mb-4">
                  A comprehensive guide to implementing AI strategies in your digital transformation
                  journey with proven methodologies.
                </p>
                <div className="flex items-center text-xs font-body leading-snug text-gray-500 mb-4">
                  <span>By Loreen • March 15, 2024</span>
                </div>
                <Link
                  href="/blog/ai-strategy-implementation-guide"
                  className="inline-flex items-center text-primary hover:text-primary-hover font-heading text-sm transition-colors duration-200"
                >
                  Read More
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-sky-sharp to-blue-sharp"></div>
              <div className="p-6">
                <h3 className="text-xl font-heading leading-normal text-charcoal mb-2">
                  Customer Experience Optimization
                </h3>
                <p className="text-sm font-body leading-snug text-charcoal mb-4">
                  How to optimize customer touchpoints for exceptional journeys through strategic
                  digital transformation.
                </p>
                <div className="flex items-center text-xs font-body leading-snug text-gray-500 mb-4">
                  <span>By Janos • March 10, 2024</span>
                </div>
                <Link
                  href="/blog/customer-experience-optimization"
                  className="inline-flex items-center text-primary hover:text-primary-hover font-heading text-sm transition-colors duration-200"
                >
                  Read More
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-purple-sharp to-magenta-sharp"></div>
              <div className="p-6">
                <h3 className="text-xl font-heading leading-normal text-charcoal mb-2">
                  Data-Driven Decision Making
                </h3>
                <p className="text-sm font-body leading-snug text-charcoal mb-4">
                  Transform your data into actionable business intelligence with advanced analytics
                  and visualization tools.
                </p>
                <div className="flex items-center text-xs font-body leading-snug text-gray-500 mb-4">
                  <span>By Loreen • March 5, 2024</span>
                </div>
                <Link
                  href="/blog/data-driven-decision-making"
                  className="inline-flex items-center text-primary hover:text-primary-hover font-heading text-sm transition-colors duration-200"
                >
                  Read More
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          </div>

          <div className="mt-12">
            <Link href="/blog">
              <Button
                variant="outline"
                className="inline-flex items-center bg-transparent text-primary border-2 border-primary font-heading text-base px-6 py-3 hover:bg-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                View All Posts
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
