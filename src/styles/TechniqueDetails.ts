import styled from 'styled-components';

const TechniqueDetails = styled.div`
  width: min(920px, calc(100% - 48px)); margin: 46px auto 80px;
  .back { color: ${({ theme }) => theme.muted}; font-size: 13px; font-weight: 650; }
  .panel { margin-top: 20px; border: 1px solid ${({ theme }) => theme.border}; border-radius: 14px; background: ${({ theme }) => theme.surface}; padding: 32px; }
  .eyebrow { color: ${({ theme }) => theme.accent}; font-size: 12px; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; }
  h1 { font-size: clamp(38px, 5vw, 60px); line-height: 1.05; letter-spacing: -.06em; margin: 8px 0 4px; }
  .hangul { font-size: 28px; margin: 0; }
  .translations { color: ${({ theme }) => theme.muted}; margin: 3px 0 21px; }
  .actions { display: flex; align-items: center; flex-wrap: wrap; gap: 9px; padding-bottom: 23px; border-bottom: 1px solid ${({ theme }) => theme.border}; }
  button, .tag { display: inline-flex; align-items: center; border: 1px solid ${({ theme }) => theme.border}; border-radius: 8px; background: ${({ theme }) => theme.background}; padding: 8px 11px; cursor: pointer; }
  .tag { cursor: default; font-size: 12px; }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; padding-top: 20px; }
  h2 { font-size: 16px; margin: 0 0 5px; }
  .detail-grid p { margin: 0; color: ${({ theme }) => theme.muted}; }
  .pronunciation { margin-top: 23px; padding: 15px; background: ${({ theme }) => theme.accentSoft}; border-radius: 9px; }
  .pronunciation p { margin: 3px 0 0; }
  @media (max-width: 1440px) { width: min(920px, calc(100% - 48px)); }
  @media (max-width: 1024px) { margin-top: 35px; }
  @media (max-width: 768px) { width: min(100% - 36px, 680px); .panel { padding: 25px; } }
  @media (max-width: 480px) { width: calc(100% - 28px); margin-top: 25px; .panel { padding: 19px; } .detail-grid { grid-template-columns: 1fr; gap: 18px; } }
  @media (max-width: 390px) { width: calc(100% - 24px); .panel { padding: 16px; } }
`;
export default TechniqueDetails;
