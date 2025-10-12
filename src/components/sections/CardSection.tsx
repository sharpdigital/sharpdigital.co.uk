import ServiceCard from '@/components/ServiceCard';
import { CardSum } from '@/lib/appwrite';
import { formatDate } from '@/lib/utils';
import { FC } from 'react';

interface Props {
  setup: CardSum[];
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  isGrid?: boolean;
  hasBackground?: boolean;
  minTitleHeight?: string;
  linkBase?: string;
}

const CardSection: FC<Props> = ({
  setup,
  title,
  description,
  isGrid,
  hasBackground,
  minTitleHeight,
  linkBase,
}) => {
  return (
    <section className={`py-20 ${hasBackground ? 'bg-gray-50' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-8">
            {title}
          </h2>
          <p className="text-lg text-charcoal font-body leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {setup.map((setupItem) => {
            let details;
            if (setupItem.author || setupItem.$createdAt) {
              details = `${setupItem.author ?? ''}${setupItem.author && setupItem.$createdAt ? ' • ' : ''}${setupItem.$createdAt ? formatDate(setupItem.$createdAt) : ''}`;
            }
            return (
              <ServiceCard
                key={setupItem.$id}
                title={setupItem.title}
                description={setupItem.description || ''}
                details={details}
                features={setupItem.features}
                href={`${setupItem.slug}`}
                imageUrl={setupItem.image ?? undefined}
                isGrid={isGrid}
                minTitleHeight={minTitleHeight}
                buttonText={setupItem.buttonText}
                linkBase={linkBase}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CardSection;
