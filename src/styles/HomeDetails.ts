import styled from 'styled-components';

const HomeDetails = styled.div`
  width: min(1160px, calc(100% - 48px)); margin: 0 auto 72px;
  .eyebrow { color: ${({ theme }) => theme.accent}; font-size: 12px; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; }
  .hero { display: grid; grid-template-columns: 1.25fr .75fr; gap: 32px; align-items: center; padding: 72px 0 56px; }
  .hero-copy { min-width: 0; max-width: 680px; }
  h1 { font-size: clamp(42px, 6vw, 76px); line-height: 1.03; letter-spacing: -.06em; margin: 12px 0 20px; }
  .lead { max-width: 560px; color: ${({ theme }) => theme.muted}; font-size: 18px; }
  .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
  .button { display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${({ theme }) => theme.border}; border-radius: 9px; padding: 11px 16px; font-weight: 650; background: ${({ theme }) => theme.surface}; }
  .button.primary { background: ${({ theme }) => theme.text}; color: ${({ theme }) => theme.background}; border-color: ${({ theme }) => theme.text}; }
  .hero-card, .card { min-width: 0; background: ${({ theme }) => theme.surface}; border: 1px solid ${({ theme }) => theme.border}; border-radius: 14px; box-shadow: ${({ theme }) => theme.shadow}; }
  .hero-card { padding: 24px; }
  .hero-card h2 { font-size: 16px; margin: 4px 0 16px; }
  .belt-line { display: flex; align-items: center; gap: 12px; color: ${({ theme }) => theme.muted}; font-size: 13px; }
  .belt-line + .belt-line { margin-top: 11px; }
  .belt-dot { width: 16px; height: 16px; border-radius: 50%; border: 1px solid ${({ theme }) => theme.border}; background: var(--belt-color, #fff); box-shadow: inset -4px 0 0 var(--belt-tip, transparent); }
  .section-head { display: flex; align-items: end; justify-content: space-between; gap: 16px; margin: 34px 0 16px; }
  h2 { letter-spacing: -.035em; line-height: 1.2; }
  .section-head h2 { margin: 0; font-size: 26px; }
  .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
  .card { padding: 20px; transition: transform 160ms ease, border-color 160ms ease; }
  .card:hover { transform: translateY(-2px); border-color: ${({ theme }) => theme.accent}; }
  .card h3 { margin: 8px 0 5px; font-size: 17px; }
  .card p { margin: 0; color: ${({ theme }) => theme.muted}; font-size: 14px; }
  .meta { color: ${({ theme }) => theme.muted}; font-size: 12px; text-transform: uppercase; letter-spacing: .07em; font-weight: 700; }
  .progress { display: flex; gap: 5px; margin-top: 18px; }
  .progress span { height: 8px; flex: 1; border-radius: 8px; background: ${({ theme }) => theme.border}; }
  .progress span:first-child { background: ${({ theme }) => theme.accent}; }
  @media (max-width: 1440px) { width: min(1160px, calc(100% - 48px)); }
  @media (max-width: 1024px) { .hero { gap: 22px; padding-top: 56px; } .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 768px) { width: min(100% - 36px, 680px); .hero { grid-template-columns: 1fr; padding: 42px 0; } .hero-card { max-width: none; } }
  @media (max-width: 480px) { width: calc(100% - 24px); .hero { padding: 30px 0; } .lead { font-size: 16px; } .grid { grid-template-columns: 1fr; } .section-head { align-items: start; flex-direction: column; } }
  @media (max-width: 360px) { h1 { font-size: clamp(34px, 11vw, 38px); } .hero-card, .card { border-radius: 11px; } .actions { gap: 8px; } .button { padding: 10px 12px; } }
`;
export default HomeDetails;
