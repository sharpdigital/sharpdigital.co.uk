import { sanitize } from '@/lib/utils';
import { FC } from 'react';

interface ColumnHeaderProps {
  title: string;
  description: string;
}

const ColumnHeader: FC<ColumnHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-[5em]">
      <h2
        className="content-title text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-26"
        dangerouslySetInnerHTML={{
          __html: sanitize(title),
        }}
      ></h2>
      <div className="content-wrapper space-y-6">
        <p
          className="content-text text-lg text-charcoal font-body leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: sanitize(description),
          }}
        ></p>
      </div>
    </div>
  );
};

export default ColumnHeader;
