import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Carousel, { CarouselSetup } from '@/components/caroussel/Carousel';
import AnimButton from '@/components/ui/AnimButton';
import CardSection from '../components/sections/CardSection';
import { getServices } from '@/lib/contentService';
import { fallbackBlogCards } from '@/lib/fallbackContent';

const carouselSetup: CarouselSetup[] = [
  {
    title: 'Transforming Customer Experience',
    title2: 'AI-Powered Digital Solutions',
    subtitle: 'Seamlessly',
    description: 'Optimize every touchpoint for exceptional customer journeys',
    imageUrl: '/img/customerExperience.jpg',
    buttonText: 'Find out more',
    buttonUrl: '/services/customer-experience',
  },
  {
    title: 'Transforming Business Operations',
    title2: 'AI-Powered Digital Solutions',
    subtitle: 'Smoothly',
    description: 'Streamline processes through intelligent automation',
    imageUrl: '/img/automation.jpg',
    buttonText: 'Find out more',
    buttonUrl: '/services/operational-efficiency',
  },
  {
    title: 'Leverage Sharp Insights',
    title2: 'AI-Powered Digital Solutions',
    subtitle: 'Unmatched data & analytics',
    description: 'Transform data into actionable business intelligence',
    imageUrl: '/img/analyse.jpg',
    buttonText: 'Find out more',
    buttonUrl: '/services/data-and-analytics',
  },
];

export default async function Home() {
  const services = await getServices();
  // TODO: get this card list from the backend
  const news = [...fallbackBlogCards];

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
      <Carousel setup={carouselSetup} hasMouse />

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
                priority
                className="h-20 w-[14em] mx-auto lg:mx-0 mb-6"
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
        linkBase="/services/"
        description="We focus on three core areas that are essential for successful digital transformation."
        isGrid
        hasBackground
      />

      <CardSection
        setup={news}
        title="Latest Insights & Thought Leadership"
        description="Digital transformation expertise and industry insights"
        minTitleHeight={'1em'}
        linkBase="/blog/"
        largeButtonText="View All Posts"
        largeButtonLink="/blog/"
        secondaryButton
      />
    </Layout>
  );
}
