import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      className="relative bg-gradient-to-br from-charcoal via-gray-950 to-charcoal mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Footer"
    >
      <div className="relative flex flex-col sm:flex-row justify-left items-center sm:h-20 py-4 sm:py-0 gap-y-2">
        <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center sm:justify-start">
          <Link
            href="/terms"
            className="font-body text-sm text-grey hover:text-primary transition-colors duration-200"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy"
            className="font-body text-sm text-grey hover:text-primary transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="/llms.txt"
            className="font-body text-sm text-grey hover:text-primary transition-colors duration-200"
          >
            llms.txt
          </Link>
        </div>
        <p className="sm:absolute sm:right-[0] text-sm font-body text-grey text-center sm:text-left">
          &copy; {new Date().getFullYear()} #sharp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
