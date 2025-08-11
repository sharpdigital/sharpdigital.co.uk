import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
  href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  gradientFrom,
  gradientTo,
  icon,
  href
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center">
      <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full flex items-center justify-center`}>
        {icon}
      </div>
      <h3 className="text-2xl font-heading leading-snug text-charcoal mb-4">
        {title}
      </h3>
      <p className="text-base font-body leading-normal text-charcoal mb-6">
        {description}
      </p>
      <ul className="text-sm text-charcoal font-body mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
      <Link href={href}>
        <Button className="inline-flex items-center bg-primary text-white font-heading text-base px-6 py-3 rounded-md hover:bg-primary-hover active:bg-primary-active transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          Learn More
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </Link>
    </div>
  );
};

export default ServiceCard;