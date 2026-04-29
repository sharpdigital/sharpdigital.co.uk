import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import { getService, getServices } from '@/lib/contentService';
import PageHeader from '@/components/sections/PageHeader';
import ContentSection, { ContentSectionProps } from '@/components/sections/ContentSection';
import { generateFeatureCards, parseContentSection } from '@/components/contentParsingUtils';
import CardSection from '@/components/sections/CardSection';
import AccordionSection from '@/components/sections/AccordionSection';
import { AccordionItem } from '@/components/accordion/AccordionPanel';
import PageEndSection from '@/components/sections/PageEndSection';

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

  const ogImage = service.image || '/img/services_bg.jpg';

  return {
    title: `${service.title} - Digital Transformation Services | #sharp`,
    description: service.description || '',
    keywords: `${service.title.toLowerCase()}, digital transformation, ${(service.features ?? []).join(', ').toLowerCase()}`,
    alternates: {
      canonical: `https://sharpdigital.co.uk/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} - Digital Transformation Services | #sharp`,
      description: service.description || '',
      type: 'website',
      images: [{ url: ogImage, alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} - Digital Transformation Services | #sharp`,
      description: service.description || '',
      images: [ogImage],
    },
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

  const contentSetup: ContentSectionProps | null = service.content
    ? parseContentSection(service.content)
    : null;
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
      {!!contentSetup && <ContentSection {...contentSetup} />}

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
      <PageEndSection
        title={`Ready to Transform Your ${service.title}?`}
        description={`Let's discuss how we can help you achieve your digital transformation goals with our proven ${service.title.toLowerCase()} solutions.`}
        primaryButtonText="Get Started"
        primaryButtonLink="/contact"
        secondaryButtonText="View All Services"
        secondaryButtonLink="/services"
      />
    </Layout>
  );
}
