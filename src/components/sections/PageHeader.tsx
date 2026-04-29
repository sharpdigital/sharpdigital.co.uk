import { FC } from 'react';
import ZoomBackground from '../ZoomBackground';
import TagButton from '../ui/TagButton';

interface Props {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image?: string;
  tags?: string[];
  details?: string;
}

const PageHeader: FC<Props> = ({ title, description, image, tags, details }) => {
  return (
    <section className="relative bg-transparent from-charcoal via-gray-950 to-charcoal py-20 lg:py-24">
      <ZoomBackground image={image} />
      <div className="relative z-index-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-heading leading-tight text-white mb-36">
          {title}
        </h1>
        <div className="text-xl text-white font-body leading-relaxed px-1">
          {details ? (
            <span className="page-header-details">{details}</span>
          ) : (
            <>
              {description}
              {tags ? (
                <div className="mt-6">
                  {[...(tags ?? [])].map((tag) => {
                    const text = tag.toLowerCase().replace(/\s+/g, '-');
                    return <TagButton key={text} text={text} />;
                  })}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
