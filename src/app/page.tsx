import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Carousel, { CarouselSetup } from '@/components/caroussel/Carousel';
import AnimButton from '@/components/ui/AnimButton';
import CardSection from '../components/sections/CardSection';
import { getServices, getBlogPosts } from '@/lib/contentService';
import { blogPostsToCardSums, servicesToCardSums } from '@/components/contentParsingUtils';

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
  const services = servicesToCardSums(await getServices());
  const news = blogPostsToCardSums(await getBlogPosts(3));

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

      {/* Dubai Event Promo */}
      <section
        id="dubai-event"
        className="py-19 bg-gray-50 scroll-mt-20"
        aria-labelledby="dubai-event-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1 lg:order-1">
              <Image
                src="/img/dubai-event-2026.jpg"
                alt="Unstoppable in the UAE job market — expert-led workshop poster"
                width={1200}
                height={1200}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="order-2 lg:order-2">
              <p className="text-sm uppercase tracking-[0.18em] text-primary font-heading font-semibold mb-3">
                Featured Event · Dubai, UAE
              </p>
              <h2
                id="dubai-event-heading"
                className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6"
              >
                What skills will make you <span className="text-primary">UNSTOPPABLE</span> in the
                UAE job market?
              </h2>
              <p className="text-lg text-charcoal font-body leading-relaxed mb-5">
                The UAE can be one of the most amazing places to work. But opportunities have become
                a lot more challenging due to recent geo-politics.
              </p>
              <p className="text-lg text-charcoal font-body leading-relaxed mb-7">
                Find out at our expert-led workshop! Learn what companies are hiring for, master
                your personal brand, and get practical tips to stand out with recruiters.
              </p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 mb-8 font-body text-charcoal">
                <dt className="font-heading font-semibold">Date:</dt>
                <dd>June 18 2026</dd>
                <dt className="font-heading font-semibold">Time:</dt>
                <dd>09.00–11.00 am</dd>
                <dt className="font-heading font-semibold">Venue:</dt>
                <dd>Blumi Cafe, Al Quoz</dd>
              </dl>
              <Link
                href="https://pay.ziina.com/blumicafedxb/FoxafYOQC"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AnimButton>
                  <div className="px-6 py-2">Secure your spot now!</div>
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
        hasBackground
      />
    </Layout>
  );
}
