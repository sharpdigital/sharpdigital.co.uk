import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

interface RichTextRendererProps {
  content: Document;
  className?: string;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <div className="space-y-4 text-charcoal font-body leading-relaxed">
        {documentToReactComponents(content)}
      </div>
    </div>
  );
};

export default RichTextRenderer;