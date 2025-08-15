import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-charcoal via-gray-950 to-charcoal py-12 px-6 lg:px-8" aria-label="Footer">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-sm font-body text-white mb-4">
            &copy; {new Date().getFullYear()} #sharp. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <Link
              href="/terms"
              className="font-body text-sm text-white hover:text-primary transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="font-body text-sm text-white hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/llm.txt"
              className="font-body text-sm text-white hover:text-primary transition-colors duration-200"
            >
              llms.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;