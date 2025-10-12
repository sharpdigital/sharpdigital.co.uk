import ServiceCard from '@/components/ServiceCard';
import { CardSum } from '@/lib/appwrite';
import { formatDate, sanitize } from '@/lib/utils';
import { FC } from 'react';
import AnimButton from '../ui/AnimButton';
import Link from 'next/link';
import AccordionPanel, { AccordionItem } from '../accordion/AccordionPanel';

interface Props {
  setup: AccordionItem[];
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
}

const AccordionSection: FC<Props> = ({ setup, title, description }) => {
  return (
    <section className="py-21 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-8">
            {title}
          </h2>
          <p className="text-lg text-charcoal font-body leading-relaxed">{description}</p>
        </div>
        <div className="w-full">
          {setup?.map((element: AccordionItem) => {
            const { title, column, icon } = element;

            return (
              <AccordionPanel title={title} key={title} icon={icon}>
                {[column].map((col) => {
                  const { title, details } = col;
                  return (
                    <div className="accordion-column" key={title}>
                      {!details ? null : (
                        <>
                          <div className="accordion-column-title">{title}</div>
                          <div
                            className="accordion-column-details alt-font"
                            dangerouslySetInnerHTML={{
                              __html: sanitize(details),
                            }}
                          ></div>
                        </>
                      )}
                    </div>
                  );
                })}
              </AccordionPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AccordionSection;
