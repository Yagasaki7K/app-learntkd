import styled from 'styled-components';

const BeltsDetails = styled.div`
  width: min(1160px, calc(100% - 48px)); margin: 42px auto 80px;
  .page-head { margin-bottom: 25px; }
  .eyebrow { color: ${({ theme }) => theme.accent}; font-size: 12px; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; }
  h1 { font-size: clamp(36px, 4vw, 50px); letter-spacing: -.055em; line-height: 1.1; margin: 5px 0; }
  .intro { color: ${({ theme }) => theme.muted}; margin: 0; max-width: 700px; }
  .sequence { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
  .card { display: grid; grid-template-columns: 36px minmax(0, 1fr); gap: 12px; align-items: start; border: 1px solid ${({ theme }) => theme.border}; background: ${({ theme }) => theme.surface}; border-radius: 12px; padding: 16px; transition: border-color 150ms ease; }
  .card:hover { border-color: ${({ theme }) => theme.accent}; }
  .swatch { height: 30px; width: 30px; border: 1px solid ${({ theme }) => theme.border}; border-radius: 50%; background: var(--belt-color); box-shadow: inset -8px 0 0 var(--belt-tip); }
  .order { color: ${({ theme }) => theme.muted}; font-size: 11px; letter-spacing: .07em; text-transform: uppercase; font-weight: 750; }
  h2 { font-size: 15px; margin: 2px 0; }
  .rank { color: ${({ theme }) => theme.muted}; font-size: 13px; }
  .level { display: inline-block; margin-top: 9px; border-radius: 99px; padding: 2px 7px; font-size: 10px; text-transform: uppercase; background: ${({ theme }) => theme.background}; color: ${({ theme }) => theme.muted}; }
  .note { margin-top: 25px; padding: 17px 19px; background: ${({ theme }) => theme.surface}; border: 1px solid ${({ theme }) => theme.border}; border-radius: 12px; color: ${({ theme }) => theme.muted}; font-size: 14px; }
  @media (max-width: 1440px) { width: min(1160px, calc(100% - 48px)); }
  @media (max-width: 1024px) { .sequence { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (max-width: 768px) { width: min(100% - 36px, 680px); .sequence { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 480px) { width: calc(100% - 24px); margin-top: 28px; .sequence { grid-template-columns: 1fr; } }
  @media (max-width: 360px) { .card { gap: 9px; padding: 13px; } .swatch { width: 27px; height: 27px; } }
`;
export default BeltsDetails;
