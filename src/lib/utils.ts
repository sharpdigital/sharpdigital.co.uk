import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import sanitizeHtml from 'sanitize-html';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const sanitize = (text: string): string => {
  return sanitizeHtml(text, {
    allowedTags: ['b', 'i', 'em', 'strong', 'span', 'br'],
    allowedAttributes: {},
  });
};
