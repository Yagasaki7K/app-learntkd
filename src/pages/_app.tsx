import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';
import { PreferenceProvider, usePreferences } from '../components/Preferences';
import GlobalStyle from '../styles/GlobalStyle';
import { darkTheme, lightTheme } from '../styles/theme';

function AppFrame({ Component, pageProps }: AppProps) {
  const { theme } = usePreferences();
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
  const activeTheme = theme === 'system' ? (systemDark ? darkTheme : lightTheme) : theme === 'dark' ? darkTheme : lightTheme;
  return <ThemeProvider theme={activeTheme}><GlobalStyle /><Toaster position="top-right" richColors theme={activeTheme.mode as 'light' | 'dark'} /><Layout><Component {...pageProps} /></Layout></ThemeProvider>;
}

export default function App(props: AppProps) { return <PreferenceProvider><AppFrame {...props} /></PreferenceProvider>; }
