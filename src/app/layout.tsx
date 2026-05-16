import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import '../components/ui/ui.css';

const GTM_ID = 'GTM-5CC6DQ8L';
const GA_ID = 'G-LTTYDCF3WC';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sharpdigital.co.uk'),
  title: {
    template: '%s | #sharp',
    default: 'Digital Transformation Consultancy | #sharp',
  },
  description:
    'Leading digital transformation consultancy helping businesses navigate their digital evolution with proven strategies in customer experience, operational efficiency, and data analytics.',
  keywords:
    'digital transformation, AI transformation, customer experience, operational efficiency, data analytics, business consulting, digital strategy',
  authors: [{ name: '#sharp' }],
  creator: '#sharp',
  publisher: '#sharp',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://sharpdigital.co.uk',
    title: 'Digital Transformation Consultancy | #sharp',
    description:
      'Leading digital transformation consultancy helping businesses navigate their digital evolution with proven strategies.',
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
    description:
      'Leading digital transformation consultancy helping businesses navigate their digital evolution with proven strategies.',
    images: ['/img/sharp_logo_w264.png'],
  },
  icons: {
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
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <Script
          id="gtag-src"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="beforeInteractive"
        />
        <Script id="gtag-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
        {/* End Google tag (gtag.js) */}
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
      <body
        className={`${inter.variable} ${manrope.variable} antialiased font-sans bg-white text-gray-900`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
