import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import PageHeader from '@/components/sections/PageHeader';
import PageEndSection from '@/components/sections/PageEndSection';
import { getTeamMembers, getTeamMember } from '@/lib/contentService';

interface TeamMemberPageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  const members = await getTeamMembers();
  return members.map((member) => ({ name: member.slug }));
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { name } = await params;
  const member = await getTeamMember(name);

  if (!member) {
    return { title: 'Team Member Not Found | #sharp' };
  }

  return {
    title: `${member.name} — ${member.role ?? 'Team'} | #sharp`,
    description: member.description || '',
    alternates: {
      canonical: `https://sharpdigital.co.uk/about/${name}`,
    },
    openGraph: {
      title: `${member.name} — ${member.role ?? 'Team'} | #sharp`,
      description: member.description || '',
      type: 'profile',
      images: member.imageUrl ? [{ url: member.imageUrl, alt: member.name }] : [],
    },
  };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { name } = await params;
  const member = await getTeamMember(name);

  if (!member) {
    notFound();
  }

  return (
    <Layout>
      <PageHeader title={member.name} description={member.role ?? ''} image="/img/about_bg.jpg" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {member.imageUrl && (
              <div>
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={400}
                  height={500}
                  className="w-full object-cover"
                />
              </div>
            )}

            <div className={member.imageUrl ? 'lg:col-span-2' : 'lg:col-span-3'}>
              {member.description && (
                <p className="text-lg text-charcoal font-body leading-relaxed mb-8">
                  {member.description}
                </p>
              )}

              {member.features && member.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-heading font-light text-charcoal mb-4">Expertise</h2>
                  <ul className="space-y-2">
                    {member.features.map((feature) => (
                      <li key={feature} className="text-lg text-charcoal font-body">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(member.linkedinUrl || member.email) && (
                <div className="flex gap-6 mt-2">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underlined font-body"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-primary underlined font-body"
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <PageEndSection
        title={`Work with ${member.name}`}
        description="Get in touch to discuss how we can help your digital transformation journey."
        primaryButtonText="Get Started"
        primaryButtonLink="/contact"
        secondaryButtonText="Meet the Team"
        secondaryButtonLink="/about"
      />
    </Layout>
  );
}
