import { GetStaticProps } from 'next';
import TerminologyDetails from '../styles/TerminologyDetails';
import { ContentPage, getMarkdownPage } from '../lib/content';
import { usePreferences } from '../components/Preferences';

export const getStaticProps: GetStaticProps<{ page: ContentPage }> = async () => ({ props: { page: getMarkdownPage('terminology', 'general.md') } });
export default function TerminologyPage({ page }: { page: ContentPage }) {
  const { language } = usePreferences(); const pt = language === 'pt-BR';
  return <TerminologyDetails><div className="page-head"><span className="eyebrow">{pt ? 'Vocabulário de estudo' : 'Study vocabulary'}</span><h1>{pt ? 'Terminologia' : 'Terminology'}</h1><p className="intro">{pt ? 'Comandos, cumprimentos, contagem e partes do corpo com romanização e Hangul.' : 'Commands, greetings, counting and body parts with romanization and Hangul.'}</p></div><article className="prose" dangerouslySetInnerHTML={{ __html: pt ? page.htmlPortuguese : page.htmlEnglish }} /></TerminologyDetails>;
}
