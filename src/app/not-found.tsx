import type { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import AnimButton from '@/components/ui/AnimButton';

export const metadata: Metadata = {
  title: 'Page not found | #sharp',
  description:
    "The page you're looking for isn't here. Find your way back via our services, blog, or get in touch.",
  robots: 'noindex, follow',
};

const alternatives = [
  {
    href: '/',
    title: 'Home',
    description: 'Overview of services and the latest insights.',
  },
  {
    href: '/about/',
    title: 'About',
    description: 'Our story, our approach, and the team behind #sharp.',
  },
  {
    href: '/services/',
    title: 'Services',
    description: 'Customer experience, operational efficiency, data & analytics.',
  },
  {
    href: '/blog/',
    title: 'Blog',
    description: 'Thought leadership on digital and AI transformation.',
  },
  {
    href: '/contact/',
    title: 'Contact',
    description: 'Tell us about your transformation goals.',
  },
];

export default function NotFound() {
  return (
    <Layout>
      <section className="bg-white" aria-labelledby="not-found-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
            Error 404
          </p>
          <h1
            id="not-found-title"
            className="text-4xl md:text-5xl lg:text-6xl font-heading leading-tight text-charcoal mb-6"
          >
            We couldn&apos;t find that page.
          </h1>
          <p className="text-lg text-charcoal font-body leading-relaxed max-w-2xl mb-10">
            The page you were looking for doesn&apos;t exist or has moved. Let&apos;s help you find
            what you came for.
          </p>

          <div className="mb-16">
            <Link href="/">
              <AnimButton>
                <div className="px-6 py-2">Back to home</div>
              </AnimButton>
            </Link>
          </div>

          <h2 className="text-2xl md:text-3xl font-heading text-charcoal mb-8">
            Or jump straight to:
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {alternatives.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group block h-full border border-gray-200 hover:border-primary rounded-lg p-6 transition-colors duration-200"
                >
                  <h3 className="text-xl font-heading text-charcoal group-hover:text-primary transition-colors duration-200 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-body text-charcoal/80 leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
