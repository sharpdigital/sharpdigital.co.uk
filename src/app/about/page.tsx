import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import Layout from '@/components/Layout';
import RichTextRenderer from '@/components/RichTextRenderer';
import { Card, CardContent } from '@/components/ui/card';
import { getTeamMembers } from '@/lib/contentService';

export const metadata: Metadata = {
  title: 'About #sharp - Digital Transformation Consultancy',
  description: 'Learn about #sharp, a leading digital transformation consultancy helping companies navigate their digital evolution with proven methodologies and measurable results.',
  keywords: 'digital transformation, consultancy, about sharp, company story, team',
};

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image 
              src="/img/sharp_logo.svg" 
              alt="#sharp logo" 
              width={120} 
              height={48} 
              className="mx-auto mb-8"
            />
            <h1 className="text-4xl md:text-5xl font-heading leading-tight text-charcoal mb-6">
              About <span className="text-primary">#sharp</span>
            </h1>
            <p className="text-xl text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              We help companies navigate their digital transformation journey with proven methodologies and measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              Our Story
            </h2>
          </div>
          
          {
            <div className="space-y-6">
              <p className="text-lg text-charcoal font-body leading-relaxed">
                <span className="text-primary font-heading text-2xl">#sharp</span> was founded with a simple yet powerful vision: to make digital transformation accessible and successful for organizations of all sizes. We believe that every company deserves to thrive in the digital age, and we&apos;re here to make that happen.
              </p>
              
              <p className="text-lg text-charcoal font-body leading-relaxed">
                Our journey began when we recognized that many organizations were struggling with digital transformation initiatives. Despite having access to cutting-edge technology, they lacked the strategic guidance and proven methodologies needed to achieve their goals. That&apos;s where we come in.
              </p>
              
              <p className="text-lg text-charcoal font-body leading-relaxed">
                We combine deep business acumen with cutting-edge technical expertise to deliver solutions that drive real business value. Our approach is collaborative, data-driven, and focused on sustainable results.
              </p>
              
              <div className="bg-gray-50 p-8 rounded-lg mt-8">
                <h3 className="text-2xl font-heading text-charcoal mb-4">Our Mission</h3>
                <p className="text-lg text-charcoal font-body leading-relaxed">
                  To empower organizations to successfully navigate their digital transformation journey through expert guidance, proven methodologies, and cutting-edge solutions that deliver measurable business impact.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg mt-6">
                <h3 className="text-2xl font-heading text-charcoal mb-4">Our Values</h3>
                <ul className="space-y-3 text-lg text-charcoal font-body">
                  <li>• <strong>Excellence:</strong> We deliver exceptional results through proven methodologies</li>
                  <li>• <strong>Innovation:</strong> We stay ahead of the curve with cutting-edge solutions</li>
                  <li>• <strong>Collaboration:</strong> We work as partners, not just consultants</li>
                  <li>• <strong>Transparency:</strong> We provide clear, honest guidance throughout the journey</li>
                  <li>• <strong>Impact:</strong> We focus on measurable business outcomes</li>
                </ul>
              </div>
            </div>
          }
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              Our expert team brings decades of combined experience in digital transformation, technology, and business strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-8 text-center">
                  {member.image_url && (
                    <div className="mb-6">
                      <Image
                        src={member.image_url}
                        alt={`${member.name} photo`}
                        width={120}
                        height={120}
                        className="mx-auto rounded-full object-cover"
                      />
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-heading text-charcoal mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-primary font-heading text-base mb-4">
                    {member.role}
                  </p>
                  
                  <div className="text-sm text-charcoal font-body mb-6">
                    <RichTextRenderer content={member.bio} />
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-hover transition-colors duration-200"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-primary hover:text-primary-hover transition-colors duration-200"
                        aria-label={`Email ${member.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              Our Approach
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              We follow a proven methodology that ensures successful digital transformation outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-sharp to-yellow-sharp rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">1. Assess & Strategy</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We begin by understanding your current state, business objectives, and transformation goals to create a tailored strategy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-sky-sharp to-blue-sharp rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">2. Design & Plan</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We design comprehensive solutions and create detailed implementation plans with clear milestones and success metrics.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-sharp to-magenta-sharp rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3v18h18v-2H5V3H3z"/>
                  <path d="M7 12l4-4 4 4 4-4v3l-4 4-4-4-4 4V12z"/>
                </svg>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">3. Execute & Optimize</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We implement solutions iteratively, measure performance, and continuously optimize for maximum business impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}