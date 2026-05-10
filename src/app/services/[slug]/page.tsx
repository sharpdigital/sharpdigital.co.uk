import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import { getService, getServices } from '@/lib/contentService';
import PageHeader from '@/components/sections/PageHeader';
import AccordionSection from '@/components/sections/AccordionSection';
import { AccordionItem } from '@/components/accordion/AccordionPanel';
import PageEndSection from '@/components/sections/PageEndSection';
import RichTextRenderer from '@/components/RichTextRenderer';

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

  const ogImage = service.imageUrl || '/img/services_bg.jpg';

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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sharpdigital.co.uk' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://sharpdigital.co.uk/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://sharpdigital.co.uk/services/${slug}`,
      },
    ],
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHeader
        title={service.title}
        description={service.description ?? ''}
        image="/img/services_bg.jpg"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {service.imageUrl && (
            <div className="mb-12">
              <Image
                src={service.imageUrl}
                alt={service.title}
                width={1200}
                height={675}
                className="w-full object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              {service.content && <RichTextRenderer content={service.content} />}
            </div>

            {service.features && service.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-heading font-light text-charcoal mb-4">
                  Capabilities
                </h2>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-lg text-charcoal font-body">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <AccordionSection
        title="Our Process"
        description={`We follow a proven methodology to ensure successful ${service.title.toLowerCase()} implementation.`}
        setup={accordionSetup}
      />

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
