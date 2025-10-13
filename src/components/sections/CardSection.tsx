import ServiceCard from '@/components/ServiceCard';
import { CardSum } from '@/lib/appwrite';
import { formatDate } from '@/lib/utils';
import { FC } from 'react';
import AnimButton from '../ui/AnimButton';
import Link from 'next/link';

interface Props {
  setup: CardSum[];
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  isGrid?: boolean;
  hasBackground?: boolean;
  minTitleHeight?: string;
  linkBase?: string;
  largeButtonText?: string;
  largeButtonLink?: string;
  secondaryButton?: boolean;
  noCardButton?: boolean;
  extraPaddingTop?: boolean;
}

const CardSection: FC<Props> = ({
  setup,
  title,
  description,
  isGrid,
  hasBackground,
  minTitleHeight,
  linkBase,
  largeButtonText,
  largeButtonLink,
  secondaryButton,
  noCardButton,
  extraPaddingTop,
}) => {
  return (
    <section
      className={`${extraPaddingTop ? 'pt-[6rem] pb-[4rem]' : 'py-20'} ${hasBackground ? ' bg-gray-50' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="mb-16">
            {!!title && (
              <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-8">
                {title}
              </h2>
            )}
            {!!description && (
              <p className="text-lg text-charcoal font-body leading-relaxed">{description}</p>
            )}
          </div>
        )}

        <div className={isGrid ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : ''}>
          {setup.map((setupItem) => {
            let details;
            if (setupItem.author || setupItem.$createdAt) {
              details = `${setupItem.author ? `By ${setupItem.author}` : ''}${setupItem.author && setupItem.$createdAt ? ' • ' : ''}${setupItem.$createdAt ? formatDate(setupItem.$createdAt) : ''}`;
            }
            return (
              <ServiceCard
                key={setupItem.$id}
                title={setupItem.title}
                subTitle={setupItem.subTitle}
                description={setupItem.description || ''}
                details={details}
                features={setupItem.features}
                href={`${setupItem.slug}`}
                tags={setupItem.tags}
                imageUrl={setupItem.image ?? undefined}
                isGrid={isGrid}
                minTitleHeight={minTitleHeight}
                buttonText={setupItem.buttonText}
                linkBase={linkBase}
                secondaryButton={secondaryButton}
                noButton={noCardButton}
              />
            );
          })}
        </div>
        {largeButtonText && largeButtonLink ? (
          <div className="large-bottom-button">
            <Link href={largeButtonLink}>
              <AnimButton fullWidth inverted>
                <div className="large-button py-2">{largeButtonText}</div>
              </AnimButton>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CardSection;
