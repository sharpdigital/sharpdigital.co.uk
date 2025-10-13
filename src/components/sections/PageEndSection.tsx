import { FC } from 'react';
import AnimButton from '../ui/AnimButton';
import { sanitize } from '@/lib/utils';

interface Props {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  noBackground?: boolean;
}

const PageEndSection: FC<Props> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  noBackground,
}) => {
  return (
    <section className={`py-21${noBackground ? '' : ' bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!!title && (
          <h2
            className="bottom-cta-title text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-8"
            dangerouslySetInnerHTML={{
              __html: sanitize(title),
            }}
          ></h2>
        )}
        {!!description && (
          <p
            className="bottom-cta-text text-lg text-charcoal font-body leading-relaxed mb-8"
            dangerouslySetInnerHTML={{
              __html: sanitize(description),
            }}
          ></p>
        )}
        {(primaryButtonText || secondaryButtonText) && (
          <div className="bottom-cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
            {!!primaryButtonText && !!primaryButtonLink && (
              <a href={primaryButtonLink}>
                <AnimButton>
                  <div className="bottom-cta-button">{primaryButtonText}</div>
                </AnimButton>
              </a>
            )}
            {!!secondaryButtonText && !!secondaryButtonLink && (
              <a href={secondaryButtonLink}>
                <AnimButton inverted>
                  <div className="bottom-cta-button">{secondaryButtonText}</div>
                </AnimButton>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageEndSection;
