import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout';
import PageHeader from '@/components/sections/PageHeader';
import { fallbackTeamMemberCards } from '@/lib/fallbackContent';
import CardSection from '@/components/sections/CardSection';
import { AccordionItem } from '@/components/accordion/AccordionPanel';
import AccordionSection from '@/components/sections/AccordionSection';
import StrategyIcon from '@/components/icons/StrategyIcon';
import DesignIcon from '@/components/icons/DesignIcon';
import ExecuteIcon from '@/components/icons/ExecuteIcon';
import ContentSection, { ContentSectionProps } from '@/components/sections/ContentSection';

export const metadata: Metadata = {
  title: 'About #sharp - Digital Transformation Consultancy',
  description:
    'Learn about #sharp, a leading digital transformation consultancy helping companies navigate their digital evolution with proven methodologies and measurable results.',
  keywords: 'digital transformation, consultancy, about sharp, company story, team',
};

const approachAccordion: AccordionItem[] = [
  {
    title: 'Assess & Strategy',
    icon: <StrategyIcon />,
    column: {
      title: 'Understanding Your Foundation',
      details:
        'We begin by understanding your current state, business objectives, and transformation goals to create a tailored strategy.',
    },
  },
  {
    title: 'Design & Plan',
    icon: <DesignIcon />,
    column: {
      title: 'Blueprint for Success',
      details:
        'We design comprehensive solutions and create detailed implementation plans with clear milestones and success metrics.',
    },
  },
  {
    title: 'Execute & Optimize',
    icon: <ExecuteIcon />,
    column: {
      title: 'Continuous Improvement',
      details:
        'We implement solutions iteratively, measure performance, and continuously optimize for maximum business impact.',
    },
  },
];

const contentSetup: ContentSectionProps = {
  title: 'Our Story',
  description: [
    `Born from a simple yet powerful vision, <span>#sharp</span> was created to make digital
    transformation accessible and successful for organisations of all sizes. We believe that every
    company deserves to thrive in the digital age, and we&apos;re here to make that happen.`,
    `Our journey began when we recognised that many organisations were struggling with digital
    transformation initiatives. Despite having access to cutting-edge technology, they lacked the
    strategic guidance and tools to achieve their goals. That&apos;s where we come in.`,
    `We combine deep business acumen with cutting-edge technical expertise to deliver solutions
    that drive real business value. Our approach is collaborative, data-driven, and focused on
    sustainable results.`,
  ],
  cards: [
    {
      title: 'Our <span>Mission</span>',
      text: [
        `To empower businesses to thrive in the digital era by delivering innovative, data-driven
        strategies and seamless technology solutions. We bridge the gap between vision and
        execution, enabling organisations to transform, scale, and lead with confidence.`,
      ],
    },
    {
      title: 'Our <span>Values</span>',
      list: [
        `<strong>Excellence:</strong> We deliver exceptional results by turning digital ambition into measurable success`,
        `<strong>Innovation:</strong> We stay ahead of the curve with cutting-edge solutions`,
        `<strong>Collaboration:</strong> We collaborate and partner with your team – seamlessly`,
        `<strong>Transparency:</strong> We provide clear, honest guidance throughout`,
        `<strong>Impact:</strong> We focus on measurable business outcomes`,
      ],
    },
  ],
};

export default async function AboutPage() {
  /* const teamMembers = await getTeamMembers(); */
  // TODO: make it dynamic
  const teamMembers = [...fallbackTeamMemberCards];

  return (
    <Layout>
      <PageHeader
        title={
          <>
            About <span className="text-primary">#sharp</span>
          </>
        }
        description={
          <>
            Your unfair advantage in an unrelenting digital age.
            <br />
            We don’t just help you transform, we help you innovate measurable impact.
          </>
        }
        image="/img/about_bg.jpg"
      />

      {/* Company Story Section */}
      <ContentSection {...contentSetup} />

      {/* Team Section */}
      <CardSection
        setup={teamMembers}
        title="Meet Our Team"
        description="Our expert team brings decades of combined experience in digital transformation, technology, and business strategy."
        isGrid
        hasBackground
        minTitleHeight="2.05em"
      />

      {/* Approach Section */}
      <AccordionSection
        setup={approachAccordion}
        title="Our Approach"
        description="We follow a proven methodology that ensures successful digital transformation outcomes."
      />
    </Layout>
  );
}
