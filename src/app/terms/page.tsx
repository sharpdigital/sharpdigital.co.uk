import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Terms & Conditions | #sharp',
  description:
    'Terms and conditions for using the #sharp website and engaging our digital transformation consultancy services.',
  alternates: {
    canonical: 'https://sharpdigital.co.uk/terms',
  },
};

export default function TermsPage() {
  return (
    <Layout>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-heading font-light text-charcoal mb-8">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm font-body text-grey mb-12">Last updated: April 2026</p>

            <div className="space-y-10 font-body text-charcoal leading-relaxed">
              <div>
                <h2 className="text-2xl font-heading font-light mb-4">1. Introduction</h2>
                <p>
                  These terms and conditions govern your use of the #sharp website at
                  sharpdigital.co.uk and the digital transformation consultancy services provided by
                  #sharp. By accessing this website or engaging our services, you agree to be bound
                  by these terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">2. Use of This Website</h2>
                <p className="mb-3">
                  You may use this website for lawful purposes only. You must not use it in any way
                  that breaches applicable local, national or international law or regulation, or
                  that is fraudulent or harmful.
                </p>
                <p>
                  We reserve the right to restrict access to parts of this website at any time
                  without notice.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">3. Intellectual Property</h2>
                <p>
                  All content on this website, including but not limited to text, graphics, logos,
                  and images, is the property of #sharp and is protected by applicable intellectual
                  property laws. You may not reproduce or distribute any content without our prior
                  written consent.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">4. Consultancy Services</h2>
                <p className="mb-3">
                  Engagements for digital transformation consultancy services are subject to a
                  separate service agreement. These terms apply to your use of this website and do
                  not constitute a contract for the provision of services.
                </p>
                <p>
                  All advice and guidance provided by #sharp is based on information available at
                  the time of engagement and is subject to change.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">
                  5. Limitation of Liability
                </h2>
                <p>
                  To the fullest extent permitted by law, #sharp excludes all liability for any loss
                  or damage arising from your use of this website or reliance on any information
                  contained within it. We do not guarantee that this website will be available at
                  all times or that it will be free from errors or viruses.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">6. External Links</h2>
                <p>
                  This website may contain links to third-party websites. These links are provided
                  for your convenience only. We have no control over the content of those sites and
                  accept no responsibility for them.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">7. Changes to These Terms</h2>
                <p>
                  We reserve the right to amend these terms at any time. Continued use of this
                  website following any changes constitutes acceptance of the revised terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">8. Governing Law</h2>
                <p>
                  These terms are governed by and construed in accordance with the laws of England
                  and Wales. Any disputes arising under these terms shall be subject to the
                  exclusive jurisdiction of the courts of England and Wales.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-light mb-4">9. Contact</h2>
                <p>
                  If you have any questions about these terms, please contact us via our{' '}
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
