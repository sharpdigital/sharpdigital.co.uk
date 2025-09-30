import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import RichTextRenderer from '@/components/RichTextRenderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getService, getServices } from '@/lib/contentService';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = await getServices();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: 'Service Not Found - #sharp',
      description: 'The requested service page was not found.',
    };
  }

  return {
    title: `${service.title} - Digital Transformation Services | #sharp`,
    description: service.description || '',
    keywords: `${service.title.toLowerCase()}, digital transformation, ${service.features.join(', ').toLowerCase()}`,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  const colorMapping: { [key: string]: { gradient: string; text: string; bg: string } } = {
    'customer-experience': {
      gradient: 'from-orange-sharp to-yellow-sharp',
      text: 'text-orange-sharp',
      bg: 'bg-orange-sharp',
    },
    'operational-efficiency': {
      gradient: 'from-sky-sharp to-blue-sharp',
      text: 'text-sky-sharp',
      bg: 'bg-sky-sharp',
    },
    'data-and-analytics': {
      gradient: 'from-purple-sharp to-magenta-sharp',
      text: 'text-purple-sharp',
      bg: 'bg-purple-sharp',
    },
  };

  const colors = colorMapping[service.slug] || {
    gradient: 'from-gray-400 to-gray-600',
    text: 'text-gray-600',
    bg: 'bg-gray-600',
  };

  const imageMapping: { [key: string]: string } = {
    'customer-experience': '/img/customerExperience.jpg',
    'operational-efficiency': '/img/automation.jpg',
    'data-and-analytics': '/img/analyse.jpg',
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        {/* Background Image */}
        {imageMapping[service.slug] && (
          <div className="absolute inset-0 z-0">
            <Image
              src={imageMapping[service.slug]}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-charcoal/70"></div>
          </div>
        )}

        {/* Fallback Background */}
        {!imageMapping[service.slug] && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-charcoal via-gray-950 to-charcoal"></div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading leading-tight text-white mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-white font-body leading-relaxed max-w-3xl mx-auto">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RichTextRenderer content={service.content || null} />
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              Key Features
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              Our comprehensive approach to {service.title.toLowerCase()} includes these essential
              components.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 ${colors.bg} rounded-full flex items-center justify-center`}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <CardTitle className={`text-lg font-heading ${colors.text}`}>{feature}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-charcoal font-body leading-relaxed">
                    Expert implementation of {feature.toLowerCase()} to drive measurable business
                    results.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              Our Process
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful {service.title.toLowerCase()}{' '}
              implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">1</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Discovery</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We start by understanding your current state, challenges, and objectives.
              </p>
            </div>

            <div className="">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">2</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Strategy</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We develop a comprehensive strategy tailored to your specific needs.
              </p>
            </div>

            <div className="">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">3</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Implementation</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We execute the solution with careful attention to detail and quality.
              </p>
            </div>

            <div className="">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">4</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Optimization</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We continuously monitor and optimize for maximum impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
            Ready to Transform Your {service.title}?
          </h2>
          <p className="text-lg text-charcoal font-body leading-relaxed mb-8">
            Let&apos;s discuss how we can help you achieve your digital transformation goals with
            our proven {service.title.toLowerCase()} solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-primary text-white font-heading text-base px-8 py-4 rounded-md hover:bg-primary-hover active:bg-primary-active transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Get Started
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                className="bg-transparent text-primary border-2 border-primary font-heading text-base px-8 py-4 rounded-md hover:bg-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
