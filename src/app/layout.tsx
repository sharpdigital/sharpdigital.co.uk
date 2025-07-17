import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sharpdigital.co.uk'),
  title: {
    template: '%s | #sharp',
    default: 'Digital Transformation Consultancy | #sharp',
  },
  description: 'Leading digital transformation consultancy helping businesses navigate their digital evolution with proven strategies in customer experience, operational efficiency, and data analytics.',
  keywords: 'digital transformation, AI transformation, customer experience, operational efficiency, data analytics, business consulting, digital strategy',
  authors: [{ name: '#sharp' }],
  creator: '#sharp',
  publisher: '#sharp',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://sharpdigital.co.uk',
    title: 'Digital Transformation Consultancy | #sharp',
    description: 'Leading digital transformation consultancy helping businesses navigate their digital evolution with proven strategies.',
    siteName: '#sharp',
    images: [
      {
        url: '/img/sharp_logo_w264.png',
        width: 264,
        height: 264,
        alt: '#sharp logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Transformation Consultancy | #sharp',
    description: 'Leading digital transformation consultancy helping businesses navigate their digital evolution with proven strategies.',
    images: ['/img/sharp_logo_w264.png'],
  },
  icons: {
    icon: '/img/sharp_logo.svg',
    shortcut: '/img/sharp_logo.svg',
    apple: '/img/sharp_logo_w264.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://sharpdigital.co.uk" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="#sharp" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.variable} antialiased font-sans bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
