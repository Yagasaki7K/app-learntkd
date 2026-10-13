import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { toast } from 'sonner';
import TechniqueDetails from '../../styles/TechniqueDetails';
import { getTechniques, Technique } from '../../lib/content';
import { usePreferences } from '../../components/Preferences';

export const getStaticPaths: GetStaticPaths = async () => ({ paths: getTechniques().map((item) => ({ params: { slug: item.slug } })), fallback: false });
export const getStaticProps: GetStaticProps<{ technique: Technique }> = async ({ params }) => {
  const technique = getTechniques().find((item) => item.slug === params?.slug);
  return technique ? { props: { technique } } : { notFound: true };
};

export default function TechniquePage({ technique }: { technique: Technique }) {
  const { language } = usePreferences(); const pt = language === 'pt-BR';
  const copyName = async () => {
    try { await navigator.clipboard.writeText(`${technique.romanji} · ${technique.hangul}`); toast.success(pt ? 'Nome copiado' : 'Name copied'); }
    catch { toast.error(pt ? 'Não foi possível copiar neste navegador' : 'Could not copy in this browser'); }
  };
  const speak = () => {
    if (!('speechSynthesis' in window)) { toast.info(pt ? `Pronúncia: ${technique.pronunciation}` : `Pronunciation: ${technique.pronunciation}`); return; }
    const speech = window.speechSynthesis;
    let completed = false;
    const play = () => {
      if (completed) return;
      const voice = speech.getVoices().find((item) => item.lang.toLowerCase().startsWith('ko'));
      if (voice) { completed = true; speech.removeEventListener('voiceschanged', play); const utterance = new SpeechSynthesisUtterance(technique.hangul); utterance.voice = voice; utterance.lang = 'ko-KR'; speech.speak(utterance); }
    };
    play();
    if (!completed) {
      speech.addEventListener('voiceschanged', play, { once: true });
      window.setTimeout(() => { if (!completed) { speech.removeEventListener('voiceschanged', play); completed = true; toast.info(pt ? `Voz coreana indisponível. Pronúncia: ${technique.pronunciation}` : `Korean voice unavailable. Pronunciation: ${technique.pronunciation}`); } }, 1000);
    }
  };
  return <TechniqueDetails><Link className="back" href="/techniques/">← {pt ? 'Biblioteca' : 'Library'}</Link>
    <article className="panel"><span className="eyebrow">{technique.category} · {pt ? technique.level === 'beginner' ? 'iniciante' : technique.level === 'intermediate' ? 'intermediário' : 'avançado' : technique.level} · {pt ? technique.belt : technique.beltEnglish}</span><h1>{pt ? technique.portuguese : technique.english}</h1><p className="hangul">{technique.hangul}</p><p className="translations">{technique.romanji} · {pt ? technique.english : technique.portuguese}</p>
      <div className="actions"><button type="button" onClick={speak}>🔊 {pt ? 'Ouvir coreano' : 'Hear Korean'}</button><button type="button" onClick={() => void copyName()}>{pt ? 'Copiar nome' : 'Copy name'}</button><Link className="tag" href={`/belts/${technique.beltSlug}/`}>{pt ? 'Faixa' : 'Belt'}: {pt ? technique.belt : technique.beltEnglish}</Link></div>
      <div className="detail-grid"><section><h2>{pt ? 'Propósito' : 'Purpose'}</h2><p>{pt ? technique.purpose : technique.purposeEnglish}</p></section><section><h2>{pt ? 'Execução' : 'Execution'}</h2><p>{pt ? technique.execution : technique.executionEnglish}</p></section></div>
      <div className="pronunciation"><strong>{pt ? 'Pronúncia aproximada' : 'Approximate pronunciation'}</strong><p>{technique.pronunciation}</p></div>
    </article>
  </TechniqueDetails>;
}
