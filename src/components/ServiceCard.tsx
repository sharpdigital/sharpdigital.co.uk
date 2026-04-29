'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimButton from './ui/AnimButton';
import TagButton from './ui/TagButton';
import { textToSlug } from './contentParsingUtils';

interface ServiceCardProps {
  title: string;
  subTitle?: string;
  details?: string;
  description: string;
  features?: string[];
  href: string;
  imageUrl?: string;
  tags?: string[];
  isGrid?: boolean;
  buttonText?: string;
  linkBase?: string;
  minTitleHeight?: string;
  secondaryButton?: boolean;
  noButton?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subTitle,
  details,
  description,
  features,
  href,
  imageUrl,
  tags,
  isGrid,
  buttonText = 'Learn More',
  linkBase = '/',
  minTitleHeight = '2.7em',
  secondaryButton,
  noButton,
}) => {
  return (
    <div className={`service-card${!isGrid ? ' horizontal' : ''}`}>
      <div className="service-card-shadow"></div>
      <div className="service-card-content bg-white overflow-hidden">
        {imageUrl ? (
          <div
            className={
              isGrid ? 'service-card-image aspect-video w-full mb-2' : 'service-card-image'
            }
          >
            {noButton ? (
              <Image
                src={imageUrl}
                alt={title}
                width={400}
                height={225}
                className="w-full h-full object-cover"
              />
            ) : (
              <Link href={`${linkBase}${href}`}>
                <Image
                  src={imageUrl}
                  alt={title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover"
                />
              </Link>
            )}
          </div>
        ) : null}
        <div className="service-card-text p-6 flex flex-col">
          <h3 className="text-2xl font-heading leading-snug text-charcoal mb-4">
            <div style={{ minHeight: minTitleHeight }}>{title}</div>
            {!!subTitle && <div className="service-card-subtitle">{subTitle}</div>}
            {!!details && <div className="service-card-details title-font">{details}</div>}
          </h3>
          <p
            className="text-base font-body leading-normal text-charcoal mb-6"
            style={noButton ? { marginBottom: '1.24rem' } : undefined}
          >
            {description}
          </p>
          {!!features && (
            <ul className="text-sm text-charcoal font-body mb-46 space-y-2">
              {features.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          )}
          {tags && tags.length ? (
            <div className="service-card-tags mb-4">
              {tags.map((tag: string) => {
                const slug = textToSlug(tag);
                return <TagButton key={slug} text={slug} />;
              })}
            </div>
          ) : null}

          {!noButton && (
            <>
              <div className="flex-1"></div>
              <Link href={`${linkBase}${href}`} className="mb-[0.5rem]">
                {secondaryButton ? (
                  <div className="service-card-secondary-button underlined">{buttonText}</div>
                ) : (
                  <AnimButton fullWidth>
                    <div className="px-6 py-2">{buttonText}</div>
                  </AnimButton>
                )}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
