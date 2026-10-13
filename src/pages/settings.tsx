import SettingsDetails from '../styles/SettingsDetails';
import { usePreferences } from '../components/Preferences';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { language, setLanguage, theme, setTheme } = usePreferences(); const pt = language === 'pt-BR';
  const reset = () => { localStorage.removeItem('tkd-language'); localStorage.removeItem('tkd-theme'); setLanguage(navigator.language.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en'); setTheme('system'); toast.success(pt ? 'Preferências redefinidas' : 'Preferences reset'); };
  return <SettingsDetails><div className="page-head"><span className="eyebrow">{pt ? 'Preferências' : 'Preferences'}</span><h1>{pt ? 'Ajustes' : 'Settings'}</h1><p className="intro">{pt ? 'Personalize o idioma e a aparência do seu guia.' : 'Choose the language and appearance for your guide.'}</p></div>
    <section className="group"><div className="row"><div><h2>{pt ? 'Idioma' : 'Language'}</h2><p>{pt ? 'Selecione o idioma da interface e das traduções.' : 'Choose the interface and translation language.'}</p></div><select aria-label={pt ? 'Idioma' : 'Language'} value={language} onChange={(event) => setLanguage(event.target.value as 'en' | 'pt-BR')}><option value="pt-BR">{pt ? 'Português (Brasil)' : 'Portuguese (Brazil)'}</option><option value="en">{pt ? 'Inglês' : 'English'}</option></select></div></section>
    <section className="group"><div className="row"><div><h2>{pt ? 'Aparência' : 'Appearance'}</h2><p>{pt ? 'Por padrão, acompanha a preferência do dispositivo.' : 'By default, follows your device preference.'}</p></div><select aria-label={pt ? 'Aparência' : 'Appearance'} value={theme} onChange={(event) => setTheme(event.target.value as 'system' | 'light' | 'dark')}><option value="system">{pt ? 'Sistema' : 'System'}</option><option value="light">{pt ? 'Claro' : 'Light'}</option><option value="dark">{pt ? 'Escuro' : 'Dark'}</option></select></div></section>
    <section className="group"><h2>{pt ? 'Redefinir preferências' : 'Reset preferences'}</h2><p>{pt ? 'Apaga somente idioma e tema salvos neste navegador.' : 'Clears only the language and theme saved in this browser.'}</p><button className="danger" type="button" onClick={reset}>{pt ? 'Redefinir ajustes' : 'Reset settings'}</button></section>
  </SettingsDetails>;
}
