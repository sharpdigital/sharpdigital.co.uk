import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout';
import { getServices } from '@/lib/contentService';
import { AccordionItem } from '@/components/accordion/AccordionPanel';
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
        "We've refined our approach through dozens of successful transformations across diverse industries. Our frameworks are battle-tested, iterative, and designed to deliver real results in real situations that solve specific challenges.",
    },
  },
  {
    title: 'Measurable Results',
    icon: <MeasureIcon />,
    column: {
      title: 'Accountable to Outcomes',
      details:
        "We're accountable to outcomes. Every engagement is anchored to clear KPIs and business metrics that matter to you, whether that's revenue growth, cost reduction, customer acquisition, or operational efficiency. You'll see where value is being created and why.",
    },
  },
  {
    title: 'Specialist Team',
    icon: <TeamIcon />,
    column: {
      title: 'Rare Depth, Holistic Solutions',
      details:
        'Our leadership combines rare depth: full-stack technical architects, strategic communications experts, and data-driven strategists. What sets us apart is that we collaborate across disciplines to solve problems holistically, ensuring technology decisions align with your business priorities and culture.',
    },
  },
];

const contentSetup: ContentSectionProps = {
  title: 'Our <span>Approach</span>',
  description: [
    `We offer business and digital transformation support to give your organisation what it needs most: winning customer experience, operational efficiency, and unmatched data-driven insight.`,
    `We partner with you to identify what&apos;s working well, uncover opportunities for improvement, and implement practical strategies that create measurable business impact. Through a seamless, end-to-end approach, we help your business streamline operations, strengthen performance, and position itself for sustainable growth in an increasingly competitive market.`,
    `Our team brings deep expertise in full-stack architecture, customer experience design, and data-driven strategy. We work collaboratively across your organisation to ensure technology decisions align with your business goals, your teams are equipped to innovate confidently, and your business can create real, measurable impact.`,
  ],
  cards: [
    {
      title: 'Future-Ready <span>Digital Transformation</span>',
      text: [
        `We help ambitious organisations architect, launch or digitise their offering to drive growth, strengthen customer relationships, and create competitive advantage. Whether you&apos;re modernising legacy systems, building next-generation platforms, or scaling proven digital experiences, we partner with you to deliver solutions that work — technically sound, commercially smart, and built to last.`,
      ],
    },
    {
      title: 'Our <span>AI Transformation</span> Approach',
      text: [
        `We leverage artificial intelligence and machine learning to accelerate your digital transformation journey. Our AI-powered solutions help you:`,
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
