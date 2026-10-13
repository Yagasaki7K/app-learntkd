import Link from 'next/link';
import { GetStaticProps } from 'next';
import BeltsDetails from '../../styles/BeltsDetails';
import { Belt, getBelts } from '../../lib/content';
import { usePreferences } from '../../components/Preferences';

export const getStaticProps: GetStaticProps<{ belts: Belt[] }> = async () => ({ props: { belts: getBelts() } });
const colors: Record<string, string> = { White: '#fff', Yellow: '#f2d64b', Green: '#57a76a', Blue: '#4d75c7', Red: '#cf4a45', Black: '#252525' };

export default function BeltsPage({ belts }: { belts: Belt[] }) {
  const { language } = usePreferences(); const pt = language === 'pt-BR';
  return <BeltsDetails><div className="page-head"><span className="eyebrow">{pt ? 'Progressão' : 'Progression'}</span><h1>{pt ? 'Guia de faixas' : 'Belt guide'}</h1><p className="intro">{pt ? 'De 10º Gub a 9º Dan: explore os níveis, suas cores, técnicas e transições.' : 'From 10th Gup to 9th Dan: explore the levels, colors, techniques and transitions.'}</p></div>
    <div className="sequence">{belts.map((belt) => <Link className="card" href={`/belts/${belt.slug}/`} key={belt.slug}>
      <span className="swatch" style={{ '--belt-color': colors[belt.color] || '#fff', '--belt-tip': belt.tip === 'None' ? 'transparent' : colors[belt.tip] || '#252525' } as React.CSSProperties} />
      <div><span className="order">{pt ? 'Nível' : 'Level'} {belt.order.toString().padStart(2, '0')}</span><h2>{pt ? belt.namePt : belt.name}</h2><span className="rank">{pt ? belt.rank : belt.rankEn}</span><br /><span className="level">{pt ? belt.level === 'beginner' ? 'iniciante' : belt.level === 'intermediate' ? 'intermediário' : 'avançado' : belt.level}</span></div>
    </Link>)}</div>
    <p className="note">{pt ? 'A sequência e os requisitos podem variar entre escolas e organizações. Consulte seu instrutor para o currículo oficial.' : 'Belt sequences and requirements can vary by school and organization. Ask your instructor for the official curriculum.'}</p>
  </BeltsDetails>;
}
