import { GetStaticProps } from 'next';
import GradingDetails from '../styles/GradingDetails';
import { ContentPage, getMarkdownPage } from '../lib/content';
import { usePreferences } from '../components/Preferences';

export const getStaticProps: GetStaticProps<{ page: ContentPage }> = async () => ({ props: { page: getMarkdownPage('grading', 'system.md') } });
export default function GradingPage({ page }: { page: ContentPage }) {
  const { language } = usePreferences(); const pt = language === 'pt-BR';
  return <GradingDetails><div className="page-head"><span className="eyebrow">{pt ? 'Sistema de graduação' : 'Grading system'}</span><h1>{pt ? 'Gub e Dan' : 'Gup and Dan'}</h1><p className="intro">{pt ? 'Como funcionam os níveis de faixa colorida e preta no guia de estudo.' : 'How colored-belt and black-belt grades work in this study guide.'}</p></div><article className="prose" dangerouslySetInnerHTML={{ __html: pt ? page.htmlPortuguese : page.htmlEnglish }} /></GradingDetails>;
}
