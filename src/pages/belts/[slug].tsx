import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import BeltDetails from '../../styles/BeltDetails';
import { Belt, getBelts, getTechniques, Technique } from '../../lib/content';
import { usePreferences } from '../../components/Preferences';

type Props = { belt: Belt; techniques: Technique[]; nextBelt: Belt | null };
export const getStaticPaths: GetStaticPaths = async () => ({ paths: getBelts().map((belt) => ({ params: { slug: belt.slug } })), fallback: false });
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const belts = getBelts(); const belt = belts.find((item) => item.slug === params?.slug);
  if (!belt) return { notFound: true };
  return { props: { belt, techniques: getTechniques().filter((item) => item.beltSlug === belt.slug), nextBelt: belts.find((item) => item.slug === belt.next) || null } };
};
const colors: Record<string, string> = { White: '#fff', Yellow: '#f2d64b', Green: '#57a76a', Blue: '#4d75c7', Red: '#cf4a45', Black: '#252525' };

export default function BeltPage({ belt, techniques, nextBelt }: Props) {
  const { language } = usePreferences(); const pt = language === 'pt-BR';
  return <BeltDetails><Link className="back" href="/belts/">← {pt ? 'Todas as faixas' : 'All belts'}</Link>
    <article className="panel"><div className="banner"><span className="swatch" style={{ '--belt-color': colors[belt.color] || '#fff', '--belt-tip': belt.tip === 'None' ? 'transparent' : colors[belt.tip] || '#252525' } as React.CSSProperties} /><div><span className="eyebrow">{pt ? belt.level === 'beginner' ? 'iniciante' : belt.level === 'intermediate' ? 'intermediário' : 'avançado' : belt.level} · {pt ? `Nível ${belt.order} de 11` : `Level ${belt.order} of 11`}</span><h1>{pt ? belt.namePt : belt.name}</h1><p className="rank">{pt ? belt.rank : belt.rankEn} · {pt ? belt.colorPt : belt.color}{(pt ? belt.tipPt : belt.tip) !== (pt ? 'Sem ponta' : 'None') ? ` / ${pt ? belt.tipPt : belt.tip}` : ''}</p></div></div>
      <section className="section"><h2>{pt ? 'Significado e história' : 'Meaning and history'}</h2><p>{pt ? belt.meaningPt : belt.meaning}</p>{!pt && <div className="section-copy" dangerouslySetInnerHTML={{ __html: belt.html }} />}</section>
      <section className="section"><h2>{pt ? 'Técnicas introduzidas' : 'Techniques introduced'}</h2>{techniques.length ? <div className="techniques">{techniques.map((item) => <Link className="technique" href={`/techniques/${item.slug}/`} key={item.slug}><strong>{pt ? item.portuguese : item.english}</strong><span>{item.romanji} · {pt ? item.level === 'beginner' ? 'iniciante' : item.level === 'intermediate' ? 'intermediário' : 'avançado' : item.level}</span></Link>)}</div> : <p>{pt ? 'O currículo técnico desta faixa é definido pela escola; consulte seu instrutor.' : 'The technical curriculum for this grade is set by your school; check with your instructor.'}</p>}</section>
      <section className="section"><h2>{pt ? 'Para avançar' : 'To advance'}</h2><p>{pt ? belt.advancePt : belt.advance}</p></section>
      <section className="section"><h2>{pt ? 'Transição' : 'Transition'}</h2>{nextBelt ? <><p>{pt ? 'O próximo nível é' : 'The next level is'} {pt ? nextBelt.namePt : nextBelt.name} ({pt ? nextBelt.rank : nextBelt.rankEn}).</p><Link className="next" href={`/belts/${nextBelt.slug}/`}>{pt ? 'Ver próxima faixa' : 'View next belt'} →</Link></> : <p>{pt ? 'O 9º Dan é o nível mais alto desta sequência de estudo.' : '9th Dan is the highest level in this study sequence.'}</p>}</section>
    </article>
  </BeltDetails>;
}
