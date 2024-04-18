import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
import '@/styles/fontface.css';
import '@/styles/typography.css';
import '@/styles/uistyles.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { Lexend, OpenSans } from '@/app/fonts';
import { siteConfig } from '@/constant/config';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL( siteConfig.url ),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: false, follow: false },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [ `${siteConfig.url}/images/og.jpg` ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ `${siteConfig.url}/images/og.jpg` ],
    creator: 'https://vereintech.com',
  }
};

export default function RootLayout ( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <html className={ `${OpenSans.variable} ${Lexend.variable}` }>
      <body>
        <main>
          { children }
        </main>
      </body>
    </html>
  );
}
