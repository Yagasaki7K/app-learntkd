import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'pt-BR';
export type ThemeChoice = 'system' | 'light' | 'dark';
type Preferences = { language: Language; setLanguage: (language: Language) => void; theme: ThemeChoice; setTheme: (theme: ThemeChoice) => void; preferencesLoaded: boolean };
const PreferenceContext = createContext<Preferences | null>(null);

export function PreferenceProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt-BR');
  const [theme, setTheme] = useState<ThemeChoice>('system');
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  useEffect(() => {
    const systemLanguage: Language = navigator.language.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en';
    try {
      const savedLanguage = localStorage.getItem('tkd-language');
      const savedTheme = localStorage.getItem('tkd-theme');
      setLanguage(savedLanguage === 'en' || savedLanguage === 'pt-BR' ? savedLanguage : systemLanguage);
      setTheme(savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system' ? savedTheme : 'system');
    } catch {
      setLanguage(systemLanguage);
      setTheme('system');
    } finally {
      setPreferencesLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (!preferencesLoaded) return;
    try { localStorage.setItem('tkd-language', language); } catch { /* Storage can be unavailable in private contexts. */ }
  }, [language, preferencesLoaded]);
  useEffect(() => {
    if (!preferencesLoaded) return;
    try { localStorage.setItem('tkd-theme', theme); } catch { /* Storage can be unavailable in private contexts. */ }
  }, [theme, preferencesLoaded]);
  const value = useMemo(() => ({ language, setLanguage, theme, setTheme, preferencesLoaded }), [language, theme, preferencesLoaded]);
  return <PreferenceContext.Provider value={value}>{children}</PreferenceContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferenceContext);
  if (!value) throw new Error('usePreferences must be used inside PreferenceProvider');
  return value;
}
