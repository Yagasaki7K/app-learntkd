import Link from 'next/link';
import { FormEvent, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { usePreferences } from './Preferences';

const Shell = styled.div`
  min-height: 100vh; display: flex; flex-direction: column;
  .header { position: sticky; top: 0; z-index: 20; border-bottom: 1px solid ${({ theme }) => theme.border}; background: ${({ theme }) => theme.header}; backdrop-filter: blur(12px); }
  .header-inner { width: min(1240px, calc(100% - 48px)); min-height: 66px; margin: auto; display: flex; align-items: center; gap: 24px; }
  .brand { display: inline-flex; align-items: center; gap: 9px; min-width: 0; font-weight: 800; letter-spacing: -.04em; white-space: nowrap; }
  .brand-name { overflow: hidden; text-overflow: ellipsis; }
  .mark { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; background: ${({ theme }) => theme.text}; color: ${({ theme }) => theme.background}; font-size: 12px; }
  .nav { display: flex; align-items: center; gap: 18px; color: ${({ theme }) => theme.muted}; font-size: 13px; white-space: nowrap; }
  .nav a:hover, .nav a[aria-current="page"] { color: ${({ theme }) => theme.text}; }
  .menu-toggle { display: none; }
  .search { margin-left: auto; display: flex; align-items: center; gap: 7px; }
  .search input { width: 175px; border: 1px solid ${({ theme }) => theme.border}; border-radius: 8px; padding: 8px 10px; color: ${({ theme }) => theme.text}; background: ${({ theme }) => theme.surface}; font-size: 12px; outline: none; }
  .search button { border: 0; border-radius: 8px; padding: 8px 11px; color: ${({ theme }) => theme.background}; background: ${({ theme }) => theme.text}; font-size: 12px; font-weight: 700; cursor: pointer; }
  main { flex: 1; }
  footer { border-top: 1px solid ${({ theme }) => theme.border}; }
  .footer-inner { width: min(1160px, calc(100% - 48px)); padding: 22px 0; margin: auto; display: flex; justify-content: space-between; gap: 15px; color: ${({ theme }) => theme.muted}; font-size: 12px; }
  @media (max-width: 1440px) { .header-inner { width: min(1240px, calc(100% - 48px)); } }
  @media (max-width: 1024px) {
    .header-inner { width: calc(100% - 36px); display: grid; grid-template-columns: minmax(0, .9fr) auto minmax(0, 1.2fr); gap: 8px; padding: 10px 0; }
    .brand { font-size: 14px; }
    .menu-toggle { display: inline-grid; place-items: center; width: 38px; height: 38px; padding: 0; border: 1px solid ${({ theme }) => theme.border}; border-radius: 9px; color: ${({ theme }) => theme.text}; background: ${({ theme }) => theme.surface}; cursor: pointer; }
    .menu-toggle svg { width: 18px; height: 18px; }
    .nav { grid-column: 1 / -1; display: none; width: 100%; padding: 10px 0 2px; border-top: 1px solid ${({ theme }) => theme.border}; white-space: normal; }
    .nav.is-open { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
    .nav a { min-width: 0; padding: 9px 10px; border-radius: 8px; background: ${({ theme }) => theme.surface}; overflow-wrap: anywhere; }
    .search { min-width: 0; width: 100%; margin: 0; gap: 5px; }
    .search input { min-width: 0; width: 100%; flex: 1; padding: 8px; }
    .search button { flex: 0 0 auto; padding: 8px 9px; }
  }
  @media (max-width: 768px) { .header-inner, .footer-inner { width: calc(100% - 28px); } }
  @media (max-width: 480px) { .header-inner, .footer-inner { width: calc(100% - 24px); } .footer-inner { flex-direction: column; gap: 3px; } }
  @media (max-width: 360px) { .header-inner { grid-template-columns: minmax(0, .8fr) 36px minmax(0, 1.2fr); gap: 6px; } .mark { width: 25px; height: 25px; } .brand { gap: 6px; font-size: 13px; } .menu-toggle { width: 36px; height: 36px; } .search { gap: 4px; } .search input { padding: 7px 6px; font-size: 11px; } .search button { padding: 7px 8px; font-size: 11px; } }
`;

export default function Layout({ children }: { children: ReactNode }) {
  const { language } = usePreferences();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const pt = language === 'pt-BR';
  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    void router.push({ pathname: '/techniques/', query: query ? { q: query } : {} });
    setMenuOpen(false);
  };
  return <Shell>
    <header className="header">
      <div className="header-inner">
        <Link className="brand" href="/"><span className="mark">태</span><span className="brand-name">TKD Study</span></Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? (pt ? 'Fechar menu' : 'Close menu') : (pt ? 'Abrir menu' : 'Open menu')} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">{menuOpen ? <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}</svg>
        </button>
        <nav id="primary-navigation" className={`nav${menuOpen ? ' is-open' : ''}`} aria-label={pt ? 'Navegação principal' : 'Main navigation'}>
          <Link href="/techniques/" onClick={() => setMenuOpen(false)}>{pt ? 'Técnicas' : 'Techniques'}</Link>
          <Link href="/belts/" onClick={() => setMenuOpen(false)}>{pt ? 'Faixas' : 'Belts'}</Link>
          <Link href="/grading/" onClick={() => setMenuOpen(false)}>{pt ? 'Graduação' : 'Grading'}</Link>
          <Link href="/hierarchy/" onClick={() => setMenuOpen(false)}>{pt ? 'Hierarquia' : 'Hierarchy'}</Link>
          <Link href="/terminology/" onClick={() => setMenuOpen(false)}>{pt ? 'Termos' : 'Terms'}</Link>
          <Link href="/settings/" onClick={() => setMenuOpen(false)}>{pt ? 'Ajustes' : 'Settings'}</Link>
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
