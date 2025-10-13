import { FC } from 'react';
import TagButton from '../ui/TagButton';
import FunnelIcon from '../icons/FunnelIcon';

interface Props {
  title?: string | React.ReactNode;
  tags: string[];
  active?: string;
}

const TagSection: FC<Props> = ({ tags, active }) => {
  return (
    <section className="tags-section bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="tags-wrapper">
          <div className="tags-content flex flex-wrap gap-3">
            <TagButton text={'all-posts'} href="/blog" />
            {tags.map((tag) => {
              const text = tag.toLowerCase().replace(/\s+/g, '-');
              return <TagButton key={text} text={text} active={active === tag} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TagSection;
