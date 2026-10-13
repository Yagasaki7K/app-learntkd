import Link from 'next/link';
import { GetStaticProps } from 'next';
import HomeDetails from '../styles/HomeDetails';
import { Belt, getBelts, getTechniques, Technique } from '../lib/content';
import { usePreferences } from '../components/Preferences';

type Props = { belts: Belt[]; techniques: Technique[] };
export const getStaticProps: GetStaticProps<Props> = async () => ({ props: { belts: getBelts(), techniques: getTechniques() } });
const colors: Record<string, string> = { White: '#fff', Yellow: '#f2d64b', Green: '#57a76a', Blue: '#4d75c7', Red: '#cf4a45', Black: '#252525' };

export default function Home({ belts, techniques }: Props) {
  const { language } = usePreferences();
  const pt = language === 'pt-BR';
  const featured = techniques[0];
  const category = pt ? ({ kick: 'Chute', strike: 'Golpe', block: 'Defesa', stance: 'Base', 'self-defense': 'Defesa pessoal' } as Record<string, string>)[featured.category] : ({ kick: 'Kick', strike: 'Strike', block: 'Block', stance: 'Stance', 'self-defense': 'Self-defense' } as Record<string, string>)[featured.category];
  const level = pt ? featured.level === 'beginner' ? 'iniciante' : featured.level === 'intermediate' ? 'intermediário' : 'avançado' : featured.level;
  return <HomeDetails>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">{pt ? 'Companheiro de estudo WT' : 'WT study companion'}</span>
        <h1>{pt ? 'Treine com intenção. Aprenda para a vida.' : 'Train with purpose. Learn for life.'}</h1>
        <p className="lead">{pt ? 'Técnicas, faixas e termos do taekwondo em um guia simples para revisar antes e depois do treino.' : 'Taekwondo techniques, belts and terminology in one clear guide to revisit before and after practice.'}</p>
        <div className="actions"><Link className="button primary" href="/techniques/">{pt ? 'Explorar técnicas' : 'Explore techniques'}</Link><Link className="button" href="/belts/">{pt ? 'Ver progressão de faixas' : 'View belt progression'}</Link></div>
      </div>
      <aside className="hero-card"><span className="eyebrow">{pt ? 'Hoje no dojang' : 'Today in the dojang'}</span><h2>{pt ? 'Técnica para revisar' : 'Technique to revisit'}</h2>
        <div className="meta">{category} · {level}</div><h3>{pt ? featured.portuguese : featured.english}</h3><p>{featured.hangul} · {featured.romanji}</p>
        <div className="progress" aria-label={pt ? 'Progressão de faixas' : 'Belt progression'}>{belts.map((belt) => <span key={belt.slug} title={pt ? belt.namePt : belt.name} style={{ background: colors[belt.color] || '#fff', borderTop: belt.tip !== 'None' ? `3px solid ${colors[belt.tip] || '#222'}` : undefined }} />)}</div>
        <div className="actions"><Link className="button" href={`/techniques/${featured.slug}/`}>{pt ? 'Abrir técnica' : 'Open technique'}</Link></div>
      </aside>
    </section>
    <section><div className="section-head"><div><span className="eyebrow">{pt ? 'Comece por aqui' : 'Start here'}</span><h2>{pt ? 'Seu guia de treino' : 'Your training guide'}</h2></div></div>
      <div className="grid">
        <Link className="card" href="/techniques/"><span className="meta">01 / {pt ? 'Biblioteca' : 'Library'}</span><h3>{pt ? 'Técnicas' : 'Techniques'}</h3><p>{pt ? 'Pesquise chutes, golpes, defesas, bases e princípios de defesa pessoal.' : 'Search kicks, strikes, blocks, stances and self-defense principles.'}</p></Link>
        <Link className="card" href="/grading/"><span className="meta">02 / {pt ? 'Progressão' : 'Progression'}</span><h3>{pt ? 'Gub e Dan' : 'Gup and Dan'}</h3><p>{pt ? 'Entenda a sequência das faixas e o que costuma ser avaliado.' : 'Understand belt order and what is commonly assessed.'}</p></Link>
        <Link className="card" href="/terminology/"><span className="meta">03 / {pt ? 'Vocabulário' : 'Vocabulary'}</span><h3>{pt ? 'Termos do dojang' : 'Dojang terms'}</h3><p>{pt ? 'Comandos, cumprimentos, números e partes do corpo em coreano.' : 'Commands, greetings, numbers and body parts in Korean.'}</p></Link>
      </div>
    </section>
  </HomeDetails>;
}
