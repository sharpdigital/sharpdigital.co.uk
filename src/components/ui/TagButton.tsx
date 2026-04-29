import { FC } from 'react';
import Link from 'next/link';
import { slugToText } from '../contentParsingUtils';

interface TagButtonProps {
  text: string;
  urlRoot?: string;
  scale?: number;
  href?: string;
  active?: boolean;
}

const TagButton: FC<TagButtonProps> = ({ text, urlRoot = '/blog/tag/', href, active }) => {
  const formatted = slugToText(text);
  const link = href ? href : `${urlRoot}${text}`;
  const buttonClass = `tag-button${active ? ' active' : ''}`;

  return (
    <Link href={link}>
      <div className={buttonClass}>
        <div className="tag-button-slider">
          <div className="tag-button-inside">{formatted}</div>
        </div>
        <div className="tag-button-inside">{formatted}</div>
      </div>
    </Link>
  );
};

export default TagButton;
