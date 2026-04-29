import { sanitize } from '@/lib/utils';
import { FC } from 'react';

export interface ContentSectionProps {
  title?: string;
  description?: string[];
  cards?: { title?: string; text?: string[]; list?: string[] }[];
}

const ContentSection: FC<ContentSectionProps> = ({ title, description, cards }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!!title && (
          <h2
            className="content-title text-3xl md:text-4xl font-heading leading-tight text-charcoal mb-26"
            dangerouslySetInnerHTML={{
              __html: sanitize(title),
            }}
          ></h2>
        )}
        <div className="content-wrapper space-y-6">
          {!!description && (
            <div className="mb-6 space-y-6">
              {description.map((desc: string) => (
                <p
                  key={desc}
                  className="content-text text-lg text-charcoal font-body leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(desc),
                  }}
                ></p>
              ))}
            </div>
          )}
          {!!cards && (
            <div>
              {cards.map((card) => {
                const { title, text, list } = card;
                return (
                  <div key={title} className="content-card gradient-background">
                    {!!title && (
                      <h3
                        className="content-card-title font-heading text-charcoal"
                        dangerouslySetInnerHTML={{
                          __html: sanitize(title),
                        }}
                      ></h3>
                    )}
                    {!!text &&
                      text.map((t, idx) => (
                        <p
                          key={t}
                          className="text-lg text-charcoal font-body leading-relaxed"
                          style={{ marginBottom: idx == text.length - 1 && !!list ? '2rem' : '' }}
                          dangerouslySetInnerHTML={{
                            __html: sanitize(t),
                          }}
                        ></p>
                      ))}
                    {!!list && (
                      <ul className="space-y-3 text-lg text-charcoal font-body">
                        {list.map((l) => (
                          <li
                            key={l}
                            dangerouslySetInnerHTML={{
                              __html: sanitize(`• ${l}`),
                            }}
                          ></li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
