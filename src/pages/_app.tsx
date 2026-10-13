import type { AppProps } from 'next/app';
import { generateDefaultSeo } from 'next-seo/pages';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';
import { PreferenceProvider, usePreferences } from '../components/Preferences';
import GlobalStyle from '../styles/GlobalStyle';
import { darkTheme, lightTheme } from '../styles/theme';
import nextSeoConfig from '../lib/next-seo.config';

function AppFrame({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { theme, language } = usePreferences();
  const [systemDark, setSystemDark] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemDark(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') void navigator.serviceWorker.register('/sw.js').catch(() => undefined);
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const activeTheme = theme === 'system' ? (systemDark ? darkTheme : lightTheme) : theme === 'dark' ? darkTheme : lightTheme;
  const canonicalPath = router.asPath.split(/[?#]/, 1)[0].replace(/\/$/, '') || '/';
  const canonical = `https://learntkd.vercel.app${canonicalPath === '/' ? '/' : `${canonicalPath}/`}`;
  const pathParts = canonicalPath.split('/').filter(Boolean);
  const routeTitle = (['belts', 'techniques'].includes(pathParts[0]) ? pathParts.slice(1) : pathParts)
    .map((part) => decodeURIComponent(part).replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()))
    .join(' ');
  const routeTitles: Record<string, string> = {
    '/belts': 'Taekwondo Belt Guide',
    '/grading': 'Taekwondo Grading System',
    '/hierarchy': 'Taekwondo Rank Hierarchy',
    '/settings': 'App Settings',
    '/techniques': 'Taekwondo Techniques Library',
    '/terminology': 'Korean Taekwondo Terminology',
  };
  const routeDescriptions: Record<string, string> = {
    '/belts': 'Explore the Taekwondo belt progression, color meanings, and the techniques introduced at each grade.',
    '/grading': 'Understand WT Taekwondo gup and dan ranks, grading requirements, and promotion exams.',
    '/hierarchy': 'Learn the student, instructor, master, and grandmaster ranks used in Taekwondo.',
    '/techniques': 'Search and study Taekwondo techniques by Korean name, belt, category, and level.',
    '/terminology': 'Study Korean Taekwondo commands, greetings, counting, body parts, and dojang etiquette.',
  };
  const pageTitle = canonicalPath === '/' ? undefined : routeTitles[canonicalPath] || `${routeTitle} Taekwondo Guide`;
  const pageDescription = routeDescriptions[canonicalPath] || (canonicalPath.startsWith('/belts/')
    ? `Learn about the ${routeTitle} belt, its place in the Taekwondo grading system, and the techniques practiced at this level.`
    : canonicalPath.startsWith('/techniques/')
      ? `Explore the ${routeTitle} technique, including its purpose, execution, and Korean pronunciation.`
      : nextSeoConfig.description || 'A complete Taekwondo study companion for WT techniques, belt levels, Korean terminology, and pronunciation.');
  const seo = generateDefaultSeo({
    ...nextSeoConfig,
    title: pageTitle,
    description: pageDescription,
    canonical,
    openGraph: { ...nextSeoConfig.openGraph, url: canonical, title: pageTitle || nextSeoConfig.openGraph?.title, description: pageDescription },
    additionalMetaTags: [
      { name: 'application-name', content: 'Learn Taekwondo' },
      { name: 'author', content: 'Learn Taekwondo' },
      { name: 'keywords', content: 'Taekwondo, WT, World Taekwondo, techniques, Korean terminology, belts, grading, martial arts' },
      { name: 'googlebot', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'color-scheme', content: 'light dark' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'twitter:title', content: pageTitle || nextSeoConfig.defaultTitle || 'Learn Taekwondo' },
      { name: 'twitter:description', content: pageDescription },
      { name: 'twitter:image', content: 'https://learntkd.vercel.app/social-preview.png' },
      { name: 'twitter:image:alt', content: 'Learn Taekwondo — techniques, belts, and Korean terminology' },
    ],
  });
  return <ThemeProvider theme={activeTheme}><Head>{seo}</Head><GlobalStyle /><Toaster position="top-right" richColors theme={activeTheme.mode as 'light' | 'dark'} /><Layout><Component {...pageProps} /></Layout></ThemeProvider>;
}

export default function App(props: AppProps) { return <PreferenceProvider><AppFrame {...props} /></PreferenceProvider>; }
