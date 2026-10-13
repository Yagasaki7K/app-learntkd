import styled from 'styled-components';

const BeltDetails = styled.div`
  width: min(920px, calc(100% - 48px)); margin: 46px auto 80px;
  .back { color: ${({ theme }) => theme.muted}; font-size: 13px; font-weight: 650; }
  .panel { margin-top: 19px; border: 1px solid ${({ theme }) => theme.border}; border-radius: 14px; background: ${({ theme }) => theme.surface}; overflow: hidden; }
  .banner { display: flex; align-items: center; gap: 23px; padding: 30px; border-bottom: 1px solid ${({ theme }) => theme.border}; }
  .swatch { flex: 0 0 62px; width: 62px; height: 62px; border: 1px solid ${({ theme }) => theme.border}; border-radius: 50%; background: var(--belt-color); box-shadow: inset -16px 0 0 var(--belt-tip); }
  .eyebrow { color: ${({ theme }) => theme.accent}; font-size: 12px; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; }
  h1 { font-size: clamp(34px, 5vw, 50px); letter-spacing: -.055em; line-height: 1.08; margin: 3px 0; }
  .rank { color: ${({ theme }) => theme.muted}; margin: 0; }
  .section { padding: 22px 30px; border-bottom: 1px solid ${({ theme }) => theme.border}; }
  .section:last-child { border-bottom: 0; }
  h2 { font-size: 15px; margin: 0 0 5px; }
  .section p { margin: 0; color: ${({ theme }) => theme.muted}; }
  .techniques { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
  .technique { min-width: 0; border: 1px solid ${({ theme }) => theme.border}; border-radius: 8px; padding: 10px 12px; overflow-wrap: anywhere; }
  .technique strong { display: block; font-size: 14px; }
  .technique span { color: ${({ theme }) => theme.muted}; font-size: 12px; }
  .next { display: inline-flex; color: ${({ theme }) => theme.accent}; font-weight: 700; margin-top: 12px; }
  @media (max-width: 1440px) { width: min(920px, calc(100% - 48px)); }
  @media (max-width: 1024px) { margin-top: 35px; }
  @media (max-width: 768px) { width: min(100% - 36px, 680px); .banner { padding: 24px; } .section { padding: 20px 24px; } }
  @media (max-width: 480px) { width: calc(100% - 24px); margin-top: 24px; .banner { gap: 14px; padding: 18px; } .swatch { width: 48px; height: 48px; flex-basis: 48px; } .section { padding: 17px 18px; } .techniques { grid-template-columns: 1fr; } }
  @media (max-width: 360px) { .banner { gap: 11px; padding: 14px; } .section { padding: 13px; } }
`;
export default BeltDetails;
