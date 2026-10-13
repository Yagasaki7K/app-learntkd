import { GetStaticProps } from 'next';
import HierarchyDetails from '../styles/HierarchyDetails';
import { ContentPage, getMarkdownPage } from '../lib/content';
import { usePreferences } from '../components/Preferences';

export const getStaticProps: GetStaticProps<{ page: ContentPage }> = async () => ({ props: { page: getMarkdownPage('hierarchy', 'ranks.md') } });
export default function HierarchyPage({ page }: { page: ContentPage }) {
  const { language } = usePreferences(); const pt = language === 'pt-BR';
  return <HierarchyDetails><div className="page-head"><span className="eyebrow">{pt ? 'Pessoas e títulos' : 'People and titles'}</span><h1>{pt ? 'Hierarquia do dojang' : 'Dojang hierarchy'}</h1><p className="intro">{pt ? 'Termos de graduação, ensino e liderança escolar.' : 'Terms for student grades, teaching and school leadership.'}</p></div><article className="prose" dangerouslySetInnerHTML={{ __html: pt ? page.htmlPortuguese : page.htmlEnglish }} /></HierarchyDetails>;
}
