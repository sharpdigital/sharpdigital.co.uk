import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout';
import ServiceCard from '@/components/ServiceCard';
import { getServices } from '@/lib/contentService';

export const metadata: Metadata = {
  title: 'Digital Transformation Services - #sharp',
  description: 'Comprehensive digital transformation services including customer experience optimization, operational efficiency, and data & analytics solutions.',
  keywords: 'digital transformation services, customer experience, operational efficiency, data analytics, AI solutions',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading leading-tight text-charcoal mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              Comprehensive digital transformation solutions across three key areas that drive measurable business impact.
            </p>
          </div>
        </div>
      </section>

      {/* What is Digital Transformation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              What is Digital Transformation?
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-charcoal font-body leading-relaxed">
              Digital transformation is the integration of digital technology into all areas of a business, fundamentally changing how you operate and deliver value to customers. It&apos;s also a cultural change that requires organizations to continually challenge the status quo, experiment, and get comfortable with failure.
            </p>
            
            <p className="text-lg text-charcoal font-body leading-relaxed">
              At <span className="text-primary font-heading">#sharp</span>, we understand that digital transformation isn&apos;t just about technology—it&apos;s about people, processes, and culture. Our approach ensures that your transformation initiatives deliver real, measurable business value.
            </p>
            
            <div className="bg-gray-50 p-8 rounded-lg mt-8">
              <h3 className="text-2xl font-heading text-charcoal mb-4">Our AI Transformation Approach</h3>
              <p className="text-lg text-charcoal font-body leading-relaxed mb-4">
                We leverage artificial intelligence and machine learning to accelerate your digital transformation journey. Our AI-powered solutions help you:
              </p>
              <ul className="space-y-3 text-lg text-charcoal font-body">
                <li>• Automate complex processes and reduce operational costs</li>
                <li>• Gain deeper insights from your data for better decision-making</li>
                <li>• Enhance customer experiences through personalization</li>
                <li>• Predict future trends and optimize business strategies</li>
                <li>• Scale operations efficiently as your business grows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              Our Service Areas
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              We focus on three core areas that are essential for successful digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const colorMapping: { [key: string]: { from: string; to: string } } = {
                'customer-experience': { from: 'from-orange-sharp', to: 'to-yellow-sharp' },
                'operational-efficiency': { from: 'from-sky-sharp', to: 'to-blue-sharp' },
                'data-and-analytics': { from: 'from-purple-sharp', to: 'to-magenta-sharp' },
              };

              const colors = colorMapping[service.slug] || { from: 'from-gray-400', to: 'to-gray-600' };

              const iconMapping: { [key: string]: React.ReactNode } = {
                'customer-experience': (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                ),
                'operational-efficiency': (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ),
                'data-and-analytics': (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3v18h18v-2H5V3H3z"/>
                    <path d="M7 12l4-4 4 4 4-4v3l-4 4-4-4-4 4V12z"/>
                  </svg>
                ),
              };

              return (
                <ServiceCard
                  key={service.$id}
                  title={service.title}
                  description={service.description || ''}
                  features={service.features}
                  gradientFrom={colors.from}
                  gradientTo={colors.to}
                  href={`/services/${service.slug}`}
                  icon={iconMapping[service.slug] || (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  )}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Sharp Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              Why Choose <span className="text-primary">#sharp</span>?
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              We bring proven methodologies, deep expertise, and a track record of successful transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 6.5 15.5 8zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Proven Methodologies</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                Our battle-tested frameworks and methodologies have helped dozens of organizations achieve successful digital transformation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Measurable Results</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We focus on delivering tangible business outcomes with clear metrics and KPIs that demonstrate ROI.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Expert Team</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                Our team combines deep technical expertise with business acumen to deliver solutions that work in the real world.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}