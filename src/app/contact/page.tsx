import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import PageHeader from '@/components/sections/PageHeader';
import ColumnHeader from '@/components/ui/ColumnHeader';
import ContactCard from '@/components/ui/ContactCard';
import TeamIcon from '@/components/icons/TeamIcon';
import TrackIcon from '@/components/icons/TrackIcon';
import FlaskIcon from '@/components/icons/FlaskIcon';
import AccordionSection from '@/components/sections/AccordionSection';
import { AccordionItem } from '@/components/accordion/AccordionPanel';

export const metadata: Metadata = {
  title: 'Contact Us - Digital Transformation Consultancy | #sharp',
  description:
    'Get in touch with #sharp for expert digital transformation consulting. Contact us to discuss your business transformation needs and goals.',
  keywords:
    'contact sharp, digital transformation consultation, business transformation contact, get in touch',
};

const contactAccordion: AccordionItem[] = [
  {
    title: 'Initial Consultation',
    icon: '1',
    column: {
      title: 'Understanding Your Needs',
      details:
        "We'll schedule a free 30-minute consultation to understand your challenges and goals.",
    },
  },
  {
    title: 'Assessment & Strategy',
    icon: '2',
    column: {
      title: 'Establishing a Clear Direction',
      details: "We'll assess your current state and develop a customized transformation strategy.",
    },
  },
  {
    title: 'Implementation',
    icon: '3',
    column: {
      title: 'Driving Measurable Results',
      details:
        "We'll work together to implement your transformation plan with measurable milestones.",
    },
  },
];

export default function ContactPage() {
  return (
    <Layout>
      <PageHeader
        title={
          <>
            Let&apos;s <span className="text-primary">Connect</span>
          </>
        }
        description={
          <>
            Ready to start your digital transformation journey? <br />
            We&apos;re here to help you succeed with expert guidance and proven strategies.
          </>
        }
        image="/img/contact_bg.jpg"
      />

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <ColumnHeader
                title="Get Started Today"
                description="Tell us about your business challenges and transformation goals. We'll get back to you within 24 hours with a tailored approach."
              />
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <ColumnHeader
                title="Why Choose <span>#sharp</span>?"
                description="We bring deep expertise, proven methodologies, and a track record of successful digital transformations."
              />

              <div className="contact-cards">
                <ContactCard
                  icon={<TrackIcon />}
                  title="Proven Track Record"
                  description="Successfully guided dozens of organizations through their digital
                      transformation journeys with measurable results and ROI."
                />
                <ContactCard
                  icon={<TeamIcon />}
                  title="Expert Team"
                  description="Our team combines deep technical expertise with business acumen to deliver
                      solutions that work in the real world."
                />
                <ContactCard
                  icon={<FlaskIcon />}
                  title="Tailored Approach"
                  description="We understand that every business is unique. Our solutions are customized to
                      your specific needs and objectives."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <AccordionSection
        setup={contactAccordion}
        title="What Happens Next?"
        description="Once you reach out, here's what you can expect from our process."
        hasBackground
      />

      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-6">
              What Happens Next?
            </h2>
            <p className="text-lg text-charcoal font-body leading-relaxed">
              Once you reach out, here&apos;s what you can expect from our process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">1</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Initial Consultation</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We&apos;ll schedule a free 30-minute consultation to understand your challenges and
                goals.
              </p>
            </div>

            <div className="">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">2</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Assessment & Strategy</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We&apos;ll assess your current state and develop a customized transformation
                strategy.
              </p>
            </div>

            <div className="">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-heading text-xl">3</span>
              </div>
              <h3 className="text-xl font-heading text-charcoal mb-4">Implementation</h3>
              <p className="text-base text-charcoal font-body leading-relaxed">
                We&apos;ll work together to implement your transformation plan with measurable
                milestones.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </Layout>
  );
}
