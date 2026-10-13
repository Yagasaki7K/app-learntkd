import Link from 'next/link';
import { FormEvent, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { usePreferences } from './Preferences';

const Shell = styled.div`
  min-height: 100vh; display: flex; flex-direction: column;
  .header { position: sticky; top: 0; z-index: 20; border-bottom: 1px solid ${({ theme }) => theme.border}; background: ${({ theme }) => theme.header}; backdrop-filter: blur(12px); }
  .header-inner { width: min(1240px, calc(100% - 48px)); min-height: 66px; margin: auto; display: flex; align-items: center; gap: 24px; }
  .brand { display: inline-flex; align-items: center; gap: 9px; font-weight: 800; letter-spacing: -.04em; white-space: nowrap; }
  .mark { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; background: ${({ theme }) => theme.text}; color: ${({ theme }) => theme.background}; font-size: 12px; }
  .nav { display: flex; align-items: center; gap: 18px; color: ${({ theme }) => theme.muted}; font-size: 13px; white-space: nowrap; }
  .nav a:hover, .nav a[aria-current="page"] { color: ${({ theme }) => theme.text}; }
  .search { margin-left: auto; display: flex; align-items: center; gap: 7px; }
  .search input { width: 175px; border: 1px solid ${({ theme }) => theme.border}; border-radius: 8px; padding: 8px 10px; color: ${({ theme }) => theme.text}; background: ${({ theme }) => theme.surface}; font-size: 12px; outline: none; }
  .search button { border: 0; border-radius: 8px; padding: 8px 11px; color: ${({ theme }) => theme.background}; background: ${({ theme }) => theme.text}; font-size: 12px; font-weight: 700; cursor: pointer; }
  main { flex: 1; }
  footer { border-top: 1px solid ${({ theme }) => theme.border}; }
  .footer-inner { width: min(1160px, calc(100% - 48px)); padding: 22px 0; margin: auto; display: flex; justify-content: space-between; gap: 15px; color: ${({ theme }) => theme.muted}; font-size: 12px; }
  @media (max-width: 1440px) { .header-inner { width: min(1240px, calc(100% - 48px)); } }
  @media (max-width: 1024px) { .header-inner { flex-wrap: wrap; gap: 12px 20px; padding: 12px 0; } .nav { order: 3; width: 100%; overflow-x: auto; padding: 3px 0; } .search { margin-left: auto; } }
  @media (max-width: 768px) { .header-inner, .footer-inner { width: calc(100% - 36px); } .search input { width: min(175px, 35vw); } }
  @media (max-width: 480px) { .header-inner, .footer-inner { width: calc(100% - 28px); } .nav { gap: 15px; } .search input { width: min(145px, 40vw); } .footer-inner { flex-direction: column; gap: 3px; } }
  @media (max-width: 390px) { .header-inner, .footer-inner { width: calc(100% - 24px); } .brand { font-size: 14px; } .search input { width: 112px; } }
`;

export default function Layout({ children }: { children: ReactNode }) {
  const { language } = usePreferences();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const pt = language === 'pt-BR';
  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    void router.push({ pathname: '/techniques/', query: query ? { q: query } : {} });
  };
  return <Shell>
    <header className="header">
      <div className="header-inner">
        <Link className="brand" href="/"><span className="mark">태</span> TKD Study</Link>
        <nav className="nav" aria-label={pt ? 'Navegação principal' : 'Main navigation'}>
          <Link href="/techniques/">{pt ? 'Técnicas' : 'Techniques'}</Link>
          <Link href="/belts/">{pt ? 'Faixas' : 'Belts'}</Link>
          <Link href="/grading/">{pt ? 'Graduação' : 'Grading'}</Link>
          <Link href="/hierarchy/">{pt ? 'Hierarquia' : 'Hierarchy'}</Link>
          <Link href="/terminology/">{pt ? 'Termos' : 'Terms'}</Link>
          <Link href="/settings/">{pt ? 'Ajustes' : 'Settings'}</Link>
        </nav>
        <form className="search" role="search" onSubmit={onSearch}>
          <input aria-label={pt ? 'Buscar em todo o conteúdo' : 'Search all content'} placeholder={pt ? 'Buscar conteúdo…' : 'Search content…'} value={query} onChange={(event) => setQuery(event.target.value)} />
          <button type="submit">{pt ? 'Buscar' : 'Search'}</button>
        </form>
      </div>
    </header>
    <main>{children}</main>
    <footer><div className="footer-inner"><span>{pt ? 'Guia de estudo WT • conteúdo para revisão' : 'WT study guide • content for review'}</span><span>{pt ? 'Confirme os requisitos com seu instrutor.' : 'Confirm requirements with your instructor.'}</span></div></footer>
  </Shell>;
}
