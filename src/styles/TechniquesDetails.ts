import styled from 'styled-components';

const TechniquesDetails = styled.div`
  width: min(1160px, calc(100% - 48px)); margin: 42px auto 72px;
  .page-head { margin-bottom: 25px; }
  .eyebrow { color: ${({ theme }) => theme.accent}; font-size: 12px; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; }
  h1 { margin: 4px 0 5px; font-size: clamp(34px, 4vw, 48px); letter-spacing: -.055em; line-height: 1.1; }
  .intro { color: ${({ theme }) => theme.muted}; margin: 0; }
  .filters { display: grid; grid-template-columns: 2fr repeat(3, 1fr); gap: 10px; padding: 14px; border: 1px solid ${({ theme }) => theme.border}; border-radius: 12px; background: ${({ theme }) => theme.surface}; margin-bottom: 20px; }
  input, select { width: 100%; border: 1px solid ${({ theme }) => theme.border}; border-radius: 8px; color: ${({ theme }) => theme.text}; background: ${({ theme }) => theme.background}; padding: 10px 12px; outline: none; }
  input:focus, select:focus { border-color: ${({ theme }) => theme.accent}; }
  .results { color: ${({ theme }) => theme.muted}; font-size: 13px; margin: 14px 0; }
  .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
  .card { display: flex; flex-direction: column; border: 1px solid ${({ theme }) => theme.border}; border-radius: 12px; background: ${({ theme }) => theme.surface}; padding: 19px; transition: border-color 150ms ease, transform 150ms ease; }
  .card:hover { transform: translateY(-2px); border-color: ${({ theme }) => theme.accent}; }
  .topline { display: flex; justify-content: space-between; gap: 10px; align-items: center; color: ${({ theme }) => theme.muted}; font-size: 12px; }
  .pill { border: 1px solid ${({ theme }) => theme.border}; border-radius: 99px; padding: 3px 8px; text-transform: capitalize; }
  h2 { font-size: 19px; margin: 15px 0 3px; letter-spacing: -.025em; }
  .hangul { font-size: 20px; margin: 0 0 5px; }
  .translation { color: ${({ theme }) => theme.muted}; font-size: 13px; margin: 0 0 9px; }
  .purpose { margin: 0 0 16px; font-size: 14px; color: ${({ theme }) => theme.muted}; }
  .learn { margin-top: auto; color: ${({ theme }) => theme.accent}; font-weight: 700; font-size: 13px; }
  .empty { padding: 30px; text-align: center; border: 1px dashed ${({ theme }) => theme.border}; border-radius: 12px; color: ${({ theme }) => theme.muted}; }
  @media (max-width: 1440px) { width: min(1160px, calc(100% - 48px)); }
  @media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .filters { grid-template-columns: 1.5fr 1fr 1fr; } }
  @media (max-width: 768px) { width: min(100% - 36px, 680px); .filters { grid-template-columns: 1fr 1fr; } .filters input { grid-column: 1 / -1; } }
  @media (max-width: 480px) { width: calc(100% - 24px); margin-top: 28px; .grid { grid-template-columns: 1fr; } .filters { padding: 10px; gap: 8px; } }
  @media (max-width: 360px) { .filters { grid-template-columns: 1fr; } .filters input { grid-column: auto; } .card { padding: 14px; } }
`;
export default TechniquesDetails;
