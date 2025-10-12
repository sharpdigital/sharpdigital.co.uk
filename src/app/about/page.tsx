import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import Layout from '@/components/Layout';
import RichTextRenderer from '@/components/RichTextRenderer';
import { Card, CardContent } from '@/components/ui/card';
import { getTeamMembers } from '@/lib/contentService';
import PageHeader from '@/components/sections/PageHeader';
import { fallbackTeamMemberCards } from '@/lib/fallbackContent';
import CardSection from '@/components/sections/CardSection';

export const metadata: Metadata = {
  title: 'About #sharp - Digital Transformation Consultancy',
  description:
    'Learn about #sharp, a leading digital transformation consultancy helping companies navigate their digital evolution with proven methodologies and measurable results.',
  keywords: 'digital transformation, consultancy, about sharp, company story, team',
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-26">
            Our Story
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-charcoal font-body leading-relaxed">
              Born from a simple yet powerful vision,{' '}
              <span className="text-primary font-heading">#sharp</span> was created to make digital
              transformation accessible and successful for organisations of all sizes. We believe
              that every company deserves to thrive in the digital age, and we&apos;re here to make
              that happen.
            </p>

            <p className="text-lg text-charcoal font-body leading-relaxed">
              Our journey began when we recognised that many organisations were struggling with
              digital transformation initiatives. Despite having access to cutting-edge technology,
              they lacked the strategic guidance and tools to achieve their goals. That&apos;s where
              we come in.
            </p>

            <p className="text-lg text-charcoal font-body leading-relaxed mb-6">
              We combine deep business acumen with cutting-edge technical expertise to deliver
              solutions that drive real business value. Our approach is collaborative, data-driven,
              and focused on sustainable results.
            </p>

            <div className="bg-gray-50 p-8 mt-8">
              <h3 className="text-2xl font-heading text-charcoal mb-6">Our Mission</h3>
              <p className="text-lg text-charcoal font-body leading-relaxed mb-4">
                To empower businesses to thrive in the digital era by delivering innovative,
                data-driven strategies and seamless technology solutions. We bridge the gap between
                vision and execution, enabling organisations to transform, scale, and lead with
                confidence.
              </p>
            </div>

            <div className="small-top-gap bg-gray-50 p-8">
              <h3 className="text-2xl font-heading text-charcoal mb-6">
                Our <span className="text-primary">Values</span>
              </h3>
              <ul className="space-y-3 text-lg text-charcoal font-body">
                <li>
                  • <strong>Excellence:</strong> We deliver exceptional results by turning digital
                  ambition into measurable success
                </li>
                <li>
                  • <strong>Innovation:</strong> We stay ahead of the curve with cutting-edge
                  solutions
                </li>
                <li>
                  • <strong>Collaboration:</strong> We collaborate and partner with your team –
                  seamlessly
                </li>
                <li>
                  • <strong>Transparency:</strong> We provide clear, honest guidance throughout
                </li>
                <li>
                  • <strong>Impact:</strong> We focus on measurable business outcomes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <CardSection
        setup={teamMembers}
        title="Meet Our Team"
        description="Our expert team brings decades of combined experience in digital transformation, technology, and business strategy."
        isGrid
        hasBackground
        minTitleHeight="2em"
      />

      {/* Approach Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              Our Approach
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed">
              We follow a proven methodology that ensures successful digital transformation
              outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-sharp to-yellow-sharp rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">1. Assess & Strategy</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We begin by understanding your current state, business objectives, and
                transformation goals to create a tailored strategy.
              </p>
            </div>

            <div className="">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-sky-sharp to-blue-sharp rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">2. Design & Plan</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We design comprehensive solutions and create detailed implementation plans with
                clear milestones and success metrics.
              </p>
            </div>

            <div className="">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-sharp to-magenta-sharp rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3v18h18v-2H5V3H3z" />
                  <path d="M7 12l4-4 4 4 4-4v3l-4 4-4-4-4 4V12z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">3. Execute & Optimize</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We implement solutions iteratively, measure performance, and continuously optimize
                for maximum business impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
