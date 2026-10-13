import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'pt-BR';
export type ThemeChoice = 'system' | 'light' | 'dark';
type Preferences = { language: Language; setLanguage: (language: Language) => void; theme: ThemeChoice; setTheme: (theme: ThemeChoice) => void };
const PreferenceContext = createContext<Preferences | null>(null);

export function PreferenceProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt-BR');
  const [theme, setTheme] = useState<ThemeChoice>('system');
  useEffect(() => {
    const savedLanguage = localStorage.getItem('tkd-language') as Language | null;
    const savedTheme = localStorage.getItem('tkd-theme') as ThemeChoice | null;
    setLanguage(savedLanguage || (navigator.language.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en'));
    setTheme(savedTheme || 'system');
  }, []);
  useEffect(() => { localStorage.setItem('tkd-language', language); }, [language]);
  useEffect(() => { localStorage.setItem('tkd-theme', theme); }, [theme]);
  const value = useMemo(() => ({ language, setLanguage, theme, setTheme }), [language, theme]);
  return <PreferenceContext.Provider value={value}>{children}</PreferenceContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferenceContext);
  if (!value) throw new Error('usePreferences must be used inside PreferenceProvider');
  return value;
}
