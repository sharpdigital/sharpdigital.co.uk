import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AnimButton from './ui/AnimButton';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
  href: string;
  imageUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  gradientFrom,
  gradientTo,
  icon,
  href,
  imageUrl,
}) => {
  return (
    <div className="bg-white overflow-hidden">
      {imageUrl ? (
        <div className="aspect-video w-full mb-2">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={225}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`w-16 h-16 mx-auto mb-6 mt-8 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full flex items-center justify-center`}
        >
          {icon}
        </div>
      )}
      <div className="p-6 flex flex-col">
        <h3 className="text-2xl min-h-[2.7em] font-heading leading-snug text-charcoal mb-4">
          {title}
        </h3>
        <p className="text-base font-body leading-normal text-charcoal mb-6">{description}</p>
        <ul className="text-sm text-charcoal font-body mb-46 space-y-2">
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
        <Link href={href} className="mb-[0.5rem]">
          <AnimButton fullWidth>
            <div className="px-6 py-2">Learn More</div>
            {/* <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg> */}
          </AnimButton>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
