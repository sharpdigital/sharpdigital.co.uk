import ServiceCard from '@/components/ServiceCard';
import { Service } from '@/lib/appwrite';
import { FC } from 'react';

interface Props {
  setup: Service[];
  title: string | React.ReactNode;
  description: string | React.ReactNode;
}
const CardSection: FC<Props> = ({ setup, title, description }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-8">
            {title}
          </h2>
          <p className="text-lg text-charcoal font-body leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {setup.map((service) => {
            const colorMapping: { [key: string]: { from: string; to: string } } = {
              'customer-experience': { from: 'from-orange-sharp', to: 'to-yellow-sharp' },
              'operational-efficiency': { from: 'from-sky-sharp', to: 'to-blue-sharp' },
              'data-and-analytics': { from: 'from-purple-sharp', to: 'to-magenta-sharp' },
            };

            const colors = colorMapping[service.slug] || {
              from: 'from-gray-400',
              to: 'to-gray-600',
            };

            const imageMapping: { [key: string]: string } = {
              'customer-experience': '/img/customerExperience.jpg',
              'operational-efficiency': '/img/automation.jpg',
              'data-and-analytics': '/img/analyse.jpg',
            };

            const iconMapping: { [key: string]: React.ReactNode } = {
              'customer-experience': (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              ),
              'operational-efficiency': (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ),
              'data-and-analytics': (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3v18h18v-2H5V3H3z" />
                  <path d="M7 12l4-4 4 4 4-4v3l-4 4-4-4-4 4V12z" />
                </svg>
              ),
            };

            return (
              <ServiceCard
                key={service.$id}
                title={service.title}
                description={service.description || ''}
                features={service.features}
                gradientFrom={colors.from}
                gradientTo={colors.to}
                href={`/services/${service.slug}`}
                imageUrl={imageMapping[service.slug]}
                icon={
                  iconMapping[service.slug] || (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  )
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CardSection;
