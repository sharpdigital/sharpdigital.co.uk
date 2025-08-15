import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Contact Us - Digital Transformation Consultancy | #sharp',
  description: 'Get in touch with #sharp for expert digital transformation consulting. Contact us to discuss your business transformation needs and goals.',
  keywords: 'contact sharp, digital transformation consultation, business transformation contact, get in touch',
};

export default function ContactPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-charcoal py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading leading-tight text-white mb-6">
              Let&apos;s <span className="text-primary">Connect</span>
            </h1>
            <p className="text-xl text-white font-body leading-relaxed max-w-3xl mx-auto">
              Ready to start your digital transformation journey? We&apos;re here to help you succeed with expert guidance and proven strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
                  Get Started Today
                </h2>
                <p className="text-lg text-charcoal font-body leading-relaxed">
                  Tell us about your business challenges and transformation goals. We&apos;ll get back to you within 24 hours with a tailored approach.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
                  Why Choose #sharp?
                </h2>
                <p className="text-lg text-charcoal font-body leading-relaxed mb-8">
                  We bring deep expertise, proven methodologies, and a track record of successful digital transformations.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-heading text-charcoal flex items-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      Proven Track Record
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-charcoal font-body leading-relaxed">
                      Successfully guided dozens of organizations through their digital transformation journeys with measurable results and ROI.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-heading text-charcoal flex items-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      Expert Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-charcoal font-body leading-relaxed">
                      Our team combines deep technical expertise with business acumen to deliver solutions that work in the real world.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-heading text-charcoal flex items-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      Tailored Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-charcoal font-body leading-relaxed">
                      We understand that every business is unique. Our solutions are customized to your specific needs and objectives.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              What Happens Next?
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed max-w-3xl mx-auto">
              Once you reach out, here&apos;s what you can expect from our process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">1</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Initial Consultation</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We&apos;ll schedule a free 30-minute consultation to understand your challenges and goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">2</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Assessment & Strategy</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We&apos;ll assess your current state and develop a customized transformation strategy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">3</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Implementation</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We&apos;ll work together to implement your transformation plan with measurable milestones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}