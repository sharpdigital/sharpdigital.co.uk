import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
      bg: 'bg-orange-sharp'
    },
    'operational-efficiency': { 
      gradient: 'from-sky-sharp to-blue-sharp',
      text: 'text-sky-sharp',
      bg: 'bg-sky-sharp'
    },
    'data-and-analytics': { 
      gradient: 'from-purple-sharp to-magenta-sharp',
      text: 'text-purple-sharp',
      bg: 'bg-purple-sharp'
    },
  };

  const colors = colorMapping[service.slug] || { 
    gradient: 'from-gray-400 to-gray-600',
    text: 'text-gray-600',
    bg: 'bg-gray-600'
  };

  const iconMapping: { [key: string]: React.ReactNode } = {
    'customer-experience': (
      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    'operational-efficiency': (
      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    'data-and-analytics': (
      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 3v18h18v-2H5V3H3z"/>
        <path d="M7 12l4-4 4 4 4-4v3l-4 4-4-4-4 4V12z"/>
      </svg>
    ),
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`w-24 h-24 mx-auto mb-8 bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center`}>
              {iconMapping[service.slug] || (
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-heading leading-tight text-charcoal mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RichTextRenderer content={service.content} />
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              Key Features
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              Our comprehensive approach to {service.title.toLowerCase()} includes these essential components.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <Card key={index} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 mx-auto mb-4 ${colors.bg} rounded-full flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <CardTitle className={`text-lg font-heading ${colors.text}`}>
                    {feature}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm text-charcoal font-body leading-relaxed">
                    Expert implementation of {feature.toLowerCase()} to drive measurable business results.
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              Our Process
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful {service.title.toLowerCase()} implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">1</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Discovery</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We start by understanding your current state, challenges, and objectives.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">2</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Strategy</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We develop a comprehensive strategy tailored to your specific needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">3</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Implementation</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We execute the solution with careful attention to detail and quality.
              </p>
            </div>

            <div className="text-center">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
            Ready to Transform Your {service.title}?
          </h2>
          <p className="text-lg text-charcoal font-body leading-relaxed mb-8">
            Let&apos;s discuss how we can help you achieve your digital transformation goals with our proven {service.title.toLowerCase()} solutions.
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