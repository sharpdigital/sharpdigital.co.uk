import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { getService, getServices } from '@/lib/contentService';
import PageHeader from '@/components/sections/PageHeader';
import ContentSection, { ContentSectionProps } from '@/components/sections/ContentSection';
import { generateFeatureCards, parseContentSection } from '@/components/contentParsingUtils';
import CardSection from '@/components/sections/CardSection';
import AccordionSection from '@/components/sections/AccordionSection';
import { AccordionItem } from '@/components/accordion/AccordionPanel';
import AnimButton from '@/components/ui/AnimButton';

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
    keywords: `${service.title.toLowerCase()}, digital transformation, ${(service.features ?? []).join(', ').toLowerCase()}`,
  };
}

const accordionSetup: AccordionItem[] = [
  {
    title: 'Discovery',
    column: {
      title: 'Understanding Your Landscape',
      details:
        'We start by understanding your current state, challenges, and objectives to form a clear foundation for transformation.',
    },
    icon: '1',
  },
  {
    title: 'Strategy',
    column: {
      title: 'Designing the Roadmap',
      details:
        'We craft a comprehensive strategy tailored to your goals, aligning technology, people, and processes for maximum impact.',
    },
    icon: '2',
  },
  {
    title: 'Implementation',
    column: {
      title: 'Turning Vision Into Action',
      details:
        'We execute your transformation plan with precision, integrating solutions that drive measurable and sustainable results.',
    },
    icon: '3',
  },
  {
    title: 'Optimization',
    column: {
      title: 'Continuous Improvement',
      details:
        'We monitor performance and refine strategies over time, ensuring your digital ecosystem evolves and scales effectively.',
    },
    icon: '4',
  },
];

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  if (!service.content) return null;
  const contentSetup: ContentSectionProps = parseContentSection(service.content);
  const features = service.features ? generateFeatureCards(service.features) : null;
  const featDesc = `Our comprehensive approach to ${service.title.toLowerCase()} includes these essential components.`;

  return (
    <Layout>
      {/* Hero Section */}
      <PageHeader
        title={service.title}
        description={service.description}
        image={service.image ?? ''}
      />

      {/* Main Content */}
      <ContentSection {...contentSetup} />

      {/* Key Features */}
      {!!features && (
        <CardSection
          setup={features}
          title="Key Features"
          description={featDesc}
          isGrid
          hasBackground
          noCardButton
        />
      )}

      {/* Process Section */}
      <AccordionSection
        title="Our Process"
        description={`We follow a proven methodology to ensure successful ${service.title.toLowerCase()} implementation.`}
        setup={accordionSetup}
      />

      {/* Call to Action */}
      <section className="py-21 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="bottom-cta-title text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-8">
            Ready to Transform Your {service.title}?
          </h2>
          <p className="bottom-cta-text text-lg text-charcoal font-body leading-relaxed mb-8">
            Let&apos;s discuss how we can help you achieve your digital transformation goals with
            our proven {service.title.toLowerCase()} solutions.
          </p>
          <div className="bottom-cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <AnimButton>
                <div className="bottom-cta-button">Get Started</div>
              </AnimButton>
            </Link>
            <Link href="/services">
              <AnimButton inverted>
                <div className="bottom-cta-button">View All Services</div>
              </AnimButton>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
