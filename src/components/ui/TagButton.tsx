import { FC } from 'react';

interface TagButtonProps {
  text: string;
  urlRoot?: string;
  scale?: number;
}

const TagButton: FC<TagButtonProps> = ({ text, urlRoot = '/blog/tag/' }) => {
  const formatted = text
    .replace(/(^[a-z])|-(\w)/g, (_, first, afterDash) => (first || ' ' + afterDash).toUpperCase())
    .replace(/-/g, ' ');

  return (
    <a href={`${urlRoot}${text}`}>
      <div className="tag-button">
        <div className="tag-button-slider">
          <div className="tag-button-inside">{formatted}</div>
        </div>
        <div className="tag-button-inside">{formatted}</div>
      </div>
    </a>
  );
};

export default TagButton;
