import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      className="relative bg-gradient-to-br from-charcoal via-gray-950 to-charcoal mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Footer"
    >
      <div className="relative flex justify-left items-center h-20">
        <div className="flex space-x-6">
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
            href="/llm.txt"
            className="font-body text-sm text-grey hover:text-primary transition-colors duration-200"
          >
            llms.txt
          </Link>
        </div>
        <p className="absolute right-[0] text-sm font-body text-grey ml-6">
          &copy; {new Date().getFullYear()} #sharp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
