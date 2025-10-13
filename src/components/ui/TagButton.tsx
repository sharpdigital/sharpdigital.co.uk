import { FC } from 'react';

interface TagButtonProps {
  text: string;
  urlRoot?: string;
  scale?: number;
  href?: string;
  active?: boolean;
}

const TagButton: FC<TagButtonProps> = ({ text, urlRoot = '/blog/tag/', href, active }) => {
  const formatted = text
    .replace(/(^[a-z])|-(\w)/g, (_, first, afterDash) => (first || ' ' + afterDash).toUpperCase())
    .replace(/-/g, ' ')
    .replace(/\b(Ux|Ui|Ai)\b/g, (match) => match.toUpperCase());

  const link = href ? href : `${urlRoot}${text}`;

  const buttonClass = `tag-button${active ? ' active' : ''}`;

  return (
    <a href={link}>
      <div className={buttonClass}>
        <div className="tag-button-slider">
          <div className="tag-button-inside">{formatted}</div>
        </div>
        <div className="tag-button-inside">{formatted}</div>
      </div>
    </a>
  );
};

export default TagButton;
