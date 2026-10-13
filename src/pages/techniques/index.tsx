import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import TechniquesDetails from '../../styles/TechniquesDetails';
import { Belt, getBelts, getMarkdownPage, getTechniques, Technique } from '../../lib/content';
import { usePreferences } from '../../components/Preferences';

type Props = { techniques: Technique[]; belts: Belt[]; searchItems: { title: string; subtitle: string; href: string; text: string }[] };
export const getStaticProps: GetStaticProps<Props> = async () => {
  const belts = getBelts();
  const docs = [
    { folder: 'grading' as const, file: 'system.md', href: '/grading/' },
    { folder: 'hierarchy' as const, file: 'ranks.md', href: '/hierarchy/' },
    { folder: 'terminology' as const, file: 'general.md', href: '/terminology/' },
  ].map(({ folder, file, href }) => { const page = getMarkdownPage(folder, file); return { title: page.title, subtitle: folder, href, text: page.plain }; });
  const beltItems = belts.map((item) => ({ title: `${item.name} / ${item.namePt}`, subtitle: `${item.rank} · ${item.level}`, href: `/belts/${item.slug}/`, text: [item.meaning, item.meaningPt, item.advance, item.advancePt].join(' ') }));
  return { props: { techniques: getTechniques(), belts, searchItems: [...beltItems, ...docs] } };
};

export default function TechniquesPage({ techniques, belts, searchItems }: Props) {
  const router = useRouter();
  const { language } = usePreferences();
  const pt = language === 'pt-BR';
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [belt, setBelt] = useState('all');
  useEffect(() => { if (typeof router.query.q === 'string') setQuery(router.query.q); }, [router.query.q]);
  const results = useMemo(() => techniques.filter((item) => {
    const text = [item.romanji, item.hangul, item.english, item.portuguese, item.purpose, item.purposeEnglish, item.execution, item.executionEnglish, item.belt, item.category, item.level].join(' ').toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (category === 'all' || item.category === category) && (level === 'all' || item.level === level) && (belt === 'all' || item.beltSlug === belt);
  }), [techniques, query, category, level, belt]);
  const otherResults = useMemo(() => query.trim() ? searchItems.filter((item) => `${item.title} ${item.subtitle} ${item.text}`.toLowerCase().includes(query.toLowerCase())) : [], [searchItems, query]);
  const words = pt ? { eyebrow: 'Biblioteca', heading: 'Técnicas', intro: 'Pesquise por nome coreano, tradução, faixa ou aplicação. Use os filtros para focar seu estudo.', search: 'Nome, descrição ou tradução…', all: 'Todas', level: 'Nível', belt: 'Faixa', category: 'Categoria', count: `${results.length} técnicas`, empty: 'Nenhuma técnica encontrada. Ajuste a busca ou os filtros.', open: 'Ver execução →', beginner: 'Iniciante', intermediate: 'Intermediário', advanced: 'Avançado' } : { eyebrow: 'Library', heading: 'Techniques', intro: 'Search by Korean name, translation, belt or purpose. Use filters to focus your study.', search: 'Name, description or translation…', all: 'All', level: 'Level', belt: 'Belt', category: 'Category', count: `${results.length} techniques`, empty: 'No techniques found. Try another search or filter.', open: 'View execution →', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
  const categoryName = (key: string) => ({ kick: pt ? 'Chutes' : 'Kicks', strike: pt ? 'Golpes' : 'Strikes', block: pt ? 'Defesas' : 'Blocks', stance: pt ? 'Bases' : 'Stances', 'self-defense': pt ? 'Defesa pessoal' : 'Self-defense' } as Record<string, string>)[key] || key;
  const levelName = (key: string) => key === 'all' ? words.all : key === 'beginner' ? words.beginner : key === 'intermediate' ? words.intermediate : words.advanced;
  return <TechniquesDetails>
    <div className="page-head"><span className="eyebrow">{words.eyebrow}</span><h1>{words.heading}</h1><p className="intro">{words.intro}</p></div>
    <div className="filters"><input aria-label={pt ? 'Buscar técnicas' : 'Search techniques'} placeholder={words.search} value={query} onChange={(e) => setQuery(e.target.value)} />
      <select aria-label={words.category} value={category} onChange={(e) => { setCategory(e.target.value); toast.success(pt ? 'Filtro de categoria aplicado' : 'Category filter applied'); }}><option value="all">{words.category}: {words.all}</option>{['kick','strike','block','stance','self-defense'].map((item) => <option key={item} value={item}>{categoryName(item)}</option>)}</select>
      <select aria-label={words.level} value={level} onChange={(e) => { setLevel(e.target.value); toast.success(pt ? 'Filtro de nível aplicado' : 'Level filter applied'); }}><option value="all">{words.level}: {words.all}</option>{['beginner','intermediate','advanced'].map((item) => <option key={item} value={item}>{levelName(item)}</option>)}</select>
      <select aria-label={words.belt} value={belt} onChange={(e) => { setBelt(e.target.value); toast.success(pt ? 'Filtro de faixa aplicado' : 'Belt filter applied'); }}><option value="all">{words.belt}: {words.all}</option>{belts.map((item) => <option key={item.slug} value={item.slug}>{pt ? item.namePt : item.name} · {pt ? item.rank : item.rankEn}</option>)}</select>
    </div>
    <div className="results">{words.count}</div>
    {results.length ? <div className="grid">{results.map((item) => <Link href={`/techniques/${item.slug}/`} className="card" key={item.slug}>
      <div className="topline"><span>{categoryName(item.category)}</span><span className="pill">{levelName(item.level)}</span></div>
      <h2>{pt ? item.portuguese : item.english}</h2><p className="hangul">{item.hangul}</p>
      <p className="translation">{item.romanji} · {pt ? item.belt : item.beltEnglish}</p><p className="purpose">{pt ? item.purpose : item.purposeEnglish}</p><span className="learn">{words.open}</span>
    </Link>)}</div> : !otherResults.length ? <div className="empty">{words.empty}</div> : null}
    {otherResults.length > 0 && <><div className="results">{pt ? 'Outros conteúdos' : 'Other content'}</div><div className="grid">{otherResults.map((item) => <Link href={item.href} className="card" key={item.href}><div className="topline"><span>{item.subtitle}</span></div><h2>{item.title}</h2><p className="purpose">{item.text.slice(0, 180)}…</p><span className="learn">{pt ? 'Abrir conteúdo →' : 'Open content →'}</span></Link>)}</div></>}
  </TechniquesDetails>;
}
