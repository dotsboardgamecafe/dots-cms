export const siteConfig = {
  title: 'Dots - Admin',
  description:
    'A starter for Next.js, Tailwind CSS, and TypeScript with Absolute Import, Seo, Link component, pre-configured with Husky',
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: 'http://localhost',
};

const environment = {
  dev: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_DEV,
    version: '1.1.244-next',
    publicDomain: 'http://localhost:3000'
  },
  staging: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_STAGING,
    version: '1.1.244-next',
    publicDomain: 'localhost'
  },
  production: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_PRODUCTION,
    version: '1.2.25-stable',
    publicDomain: process.env.NEXT_PUBLIC_SITE_DOMAIN
  }
};

export const appStage = process.env.NEXT_PUBLIC_STAGE as keyof typeof environment;

export const config = environment[ appStage ];

export const baseUrl = config?.baseUrl;
