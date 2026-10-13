import type { DefaultSeoProps } from 'next-seo/pages';

const siteUrl = 'https://learntkd.vercel.app';
const socialImage = `${siteUrl}/social-preview.png`;

const nextSeoConfig: DefaultSeoProps = {
  titleTemplate: '%s | Learn Taekwondo',
  defaultTitle: 'Learn Taekwondo',
  themeColor: '#f7f7f5',
  robotsProps: {
    maxImagePreview: 'large',
    maxSnippet: -1,
    maxVideoPreview: -1,
  },
  description:
    'A complete Taekwondo study companion to explore WT techniques, belt levels, grading, Korean terminology, and pronunciation.',
  canonical: siteUrl,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Learn Taekwondo',
    url: siteUrl,
    title: 'Learn Taekwondo',
    description:
      'Study WT Taekwondo techniques, belt levels, grading, Korean terminology, and pronunciation in one place.',
    images: [
      {
        url: socialImage,
        secureUrl: socialImage,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Learn Taekwondo — techniques, belts, and Korean terminology',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    { name: 'application-name', content: 'Learn Taekwondo' },
    { name: 'author', content: 'Learn Taekwondo' },
    {
      name: 'keywords',
      content:
        'Taekwondo, WT, World Taekwondo, techniques, Korean terminology, belts, grading, martial arts',
    },
    {
      name: 'googlebot',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    { name: 'color-scheme', content: 'light dark' },
    { name: 'format-detection', content: 'telephone=no' },
  ],
  additionalLinkTags: [
    { rel: 'manifest', href: '/manifest.json' },
    { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
    { rel: 'icon', href: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { rel: 'apple-touch-icon', href: '/icon-192.png', sizes: '192x192' },
  ],
};

export default nextSeoConfig;
