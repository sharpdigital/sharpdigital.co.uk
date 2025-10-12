import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout';
import { getServices } from '@/lib/contentService';
import AccordionPanel, { AccordionItem } from '@/components/accordion/AccordionPanel';
import { sanitize } from '@/lib/utils';
import FlaskIcon from '@/components/icons/FlaskIcon';
import MeasureIcon from '@/components/icons/MeasureIcon';
import TeamIcon from '@/components/icons/TeamIcon';
import CardSection from '../../components/sections/CardSection';
import PageHeader from '@/components/sections/PageHeader';
import AccordionSection from '@/components/sections/AccordionSection';
import ContentSection, { ContentSectionProps } from '@/components/sections/ContentSection';

export const metadata: Metadata = {
  title: 'Digital Transformation Services - #sharp',
  description:
    'Comprehensive digital transformation services including customer experience optimization, operational efficiency, and data & analytics solutions.',
  keywords:
    'digital transformation services, customer experience, operational efficiency, data analytics, AI solutions',
};

const accordion: AccordionItem[] = [
  {
    title: 'Proven Methodologies',
    icon: <FlaskIcon />,
    column: {
      title: 'Tried & True Systems',
      details:
        'Our battle-tested frameworks and methodologies have helped dozens of organizations achieve successful digital transformation.',
    },
  },
  {
    /* title: 'Measurable <span class="text-primary">Results</span>', */
    title: 'Measurable Results',
    icon: <MeasureIcon />,
    column: {
      title: 'Verifiable Performance',
      details:
        'We focus on delivering tangible business outcomes with clear metrics and KPIs that demonstrate ROI.',
    },
  },
  {
    title: 'Expert Team',
    icon: <TeamIcon />,
    column: {
      title: 'Specialized Professionals',
      details:
        'Our team combines deep technical expertise with business acumen to deliver solutions that work in the real world.',
    },
  },
];

const contentSetup: ContentSectionProps = {
  title: 'What is Digital Transformation?',
  description: [
    `Digital transformation is the integration of digital technology into all areas of a
                business, fundamentally changing how you operate and deliver value to customers.
                It&apos;s also a cultural change that requires organizations to continually
                challenge the status quo, experiment, and get comfortable with failure.`,
    `At <span>#sharp</span>, we understand that
                digital transformation isn&apos;t just about technology—it&apos;s about people,
                processes, and culture. Our approach ensures that your transformation initiatives
                deliver real, measurable business value.`,
  ],
  cards: [
    {
      title: 'Our <span>AI Transformation</span> Approach',
      text: [
        `We leverage artificial intelligence and machine learning to accelerate your
                  digital transformation journey. Our AI-powered solutions help you:`,
      ],
      list: [
        'Automate complex processes and reduce operational costs',
        'Gain deeper insights from your data for better decision-making',
        'Enhance customer experiences through personalization',
        'Predict future trends and optimize business strategies',
        'Scale operations efficiently as your business grows',
      ],
    },
  ],
};
export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Layout>
        <PageHeader
          title={
            <>
              Our <span className="text-primary">Services</span>
            </>
          }
          description={
            <>
              Comprehensive digital transformation solutions across three key areas
              <br />
              that drive measurable business impact.
            </>
          }
          image="/img/services_bg.jpg"
        />

        {/* What is Digital Transformation Section */}
        <ContentSection {...contentSetup} />

        {/* Services Grid */}
        <CardSection
          setup={services}
          title="Our Service Areas"
          description="We focus on three core areas that are essential for successful digital transformation."
          isGrid
          linkBase="/services/"
          hasBackground
        />

        {/* Why Choose Sharp Section */}

        <AccordionSection
          setup={accordion}
          title={
            <>
              Why Choose <span className="text-primary">#sharp</span>?
            </>
          }
          description={
            <>
              We bring proven methodologies, deep expertise, and a track record of successful
              transformations.
            </>
          }
        />
      </Layout>
    </>
  );
}
