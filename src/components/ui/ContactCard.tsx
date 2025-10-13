import { sanitize } from '@/lib/utils';
import { FC } from 'react';

interface ContactCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ContactCard: FC<ContactCardProps> = ({ icon, title, description }) => {
  return (
    <div className="contact-card gradient-background">
      <div className="contact-card-header">
        <div className="contact-card-icon">{icon}</div>
        <div
          className="contact-card-title"
          dangerouslySetInnerHTML={{
            __html: sanitize(title),
          }}
        ></div>
      </div>

      <div
        className="contact-card-text"
        dangerouslySetInnerHTML={{
          __html: sanitize(description),
        }}
      ></div>
    </div>
  );
};

export default ContactCard;
