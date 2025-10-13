import { FC } from 'react';
import TagButton from '../ui/TagButton';
import { textToSlug } from '../contentParsingUtils';

interface Props {
  title?: string | React.ReactNode;
  tags: string[];
  active?: string;
}

const allPostsSlug = 'all-posts';

const TagSection: FC<Props> = ({ tags, active }) => {
  return (
    <section className="tags-section bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="tags-wrapper">
          <div className="tags-content flex flex-wrap gap-3">
            <TagButton text={allPostsSlug} href="/blog" active={allPostsSlug === active} />
            {tags.map((tag) => {
              const slug = textToSlug(tag);
              return <TagButton key={slug} text={slug} active={slug === active} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TagSection;
