import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Privacy Policy | #sharp',
  description:
    'Privacy policy for #sharp — how we collect, use, and protect your personal data in accordance with UK GDPR.',
  alternates: {
    canonical: 'https://sharpdigital.co.uk/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <Layout>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-heading font-light text-charcoal mb-8">Privacy Policy</h1>
            <p className="text-sm font-body text-grey mb-12">Last updated: April 2026</p>

            <div className="space-y-10 font-body text-charcoal leading-relaxed">
              <div>
                <h2 className="text-2xl font-heading font-light mb-4">1. Who We Are</h2>
                <p>
                  #sharp is a digital transformation consultancy based in the United Kingdom. We are
                  the data controller for personal information collected through this website. For
                  any privacy-related queries, please contact us via our{' '}
                  <a href="/contact" className="text-primary underlined">
                    contact page
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">2. What Data We Collect</h2>
                <p className="mb-3">We may collect the following personal data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Name and contact details (e.g. email address, phone number) provided through our
                    contact form
                  </li>
                  <li>
                    Information about your organisation and enquiry submitted via the contact form
                  </li>
                  <li>
                    Technical data such as IP address, browser type, and pages visited (via
                    analytics)
                  </li>
                  <li>Cookie data where you have consented to non-essential cookies</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">3. How We Use Your Data</h2>
                <p className="mb-3">We use your personal data to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Respond to enquiries and provide our consultancy services</li>
                  <li>Manage our client relationships</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">
                  4. Legal Basis for Processing
                </h2>
                <p className="mb-3">Under UK GDPR, we rely on the following legal bases:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Legitimate interests</strong> — responding to business enquiries and
                    improving our services
                  </li>
                  <li>
                    <strong>Consent</strong> — for marketing communications and non-essential
                    cookies
                  </li>
                  <li>
                    <strong>Contract performance</strong> — when processing data to fulfil a service
                    agreement
                  </li>
                  <li>
                    <strong>Legal obligation</strong> — where required by law
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">5. Data Retention</h2>
                <p>
                  We retain personal data only for as long as necessary for the purposes described
                  in this policy, or as required by law. Contact enquiry data is retained for up to
                  3 years unless a longer period is required for an ongoing client relationship.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">6. Sharing Your Data</h2>
                <p>
                  We do not sell your personal data. We may share data with trusted third-party
                  service providers (such as hosting or email services) who process data on our
                  behalf under appropriate data processing agreements. We will only share data with
                  others where required by law or with your consent.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">7. Cookies</h2>
                <p>
                  This website uses essential cookies required for the site to function. We may also
                  use analytics cookies to understand how visitors use the site. You can manage
                  cookie preferences in your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">8. Your Rights</h2>
                <p className="mb-3">Under UK GDPR, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request erasure of your data (the &ldquo;right to be forgotten&rdquo;)</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time (where processing is based on consent)</li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, please contact us via our{' '}
                  <a href="/contact" className="text-primary underlined">
                    contact page
                  </a>
                  . You also have the right to lodge a complaint with the Information
                  Commissioner&rsquo;s Office (ICO) at ico.org.uk.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">9. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. Any changes will be posted on
                  this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">10. Contact</h2>
                <p>
                  For any questions about this privacy policy or how we handle your data, please
                  contact us via our{' '}
                  <a href="/contact" className="text-primary underlined">
                    contact page
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
