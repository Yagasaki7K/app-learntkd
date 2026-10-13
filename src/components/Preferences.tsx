import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'pt-BR';
export type ThemeChoice = 'system' | 'light' | 'dark';
type Preferences = { language: Language; setLanguage: (language: Language) => void; theme: ThemeChoice; setTheme: (theme: ThemeChoice) => void; resetPreferences: () => void; preferencesLoaded: boolean };
const PreferenceContext = createContext<Preferences | null>(null);

export function PreferenceProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt-BR');
  const [theme, setTheme] = useState<ThemeChoice>('system');
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const systemLanguage: Language = typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en';
  const updateLanguage = (next: Language) => {
    setLanguage(next);
    try { localStorage.setItem('tkd-language', next); } catch { /* Storage can be unavailable in private contexts. */ }
  };
  const updateTheme = (next: ThemeChoice) => {
    setTheme(next);
    try { localStorage.setItem('tkd-theme', next); } catch { /* Storage can be unavailable in private contexts. */ }
  };
  const resetPreferences = () => {
    setLanguage(systemLanguage);
    setTheme('system');
    try { localStorage.removeItem('tkd-language'); localStorage.removeItem('tkd-theme'); } catch { /* Storage can be unavailable in private contexts. */ }
  };
  useEffect(() => {
    const detectedLanguage: Language = navigator.language.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en';
    try {
      const savedLanguage = localStorage.getItem('tkd-language');
      const savedTheme = localStorage.getItem('tkd-theme');
      setLanguage(savedLanguage === 'en' || savedLanguage === 'pt-BR' ? savedLanguage : detectedLanguage);
      setTheme(savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system' ? savedTheme : 'system');
    } catch {
      setLanguage(detectedLanguage);
      setTheme('system');
    } finally {
      setPreferencesLoaded(true);
    }
  }, []);
  const value = useMemo(() => ({ language, setLanguage: updateLanguage, theme, setTheme: updateTheme, resetPreferences, preferencesLoaded }), [language, theme, preferencesLoaded]);
  return <PreferenceContext.Provider value={value}>{children}</PreferenceContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferenceContext);
  if (!value) throw new Error('usePreferences must be used inside PreferenceProvider');
  return value;
}
