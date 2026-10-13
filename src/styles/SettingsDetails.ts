import styled from 'styled-components';

const SettingsDetails = styled.div`
  width: min(760px, calc(100% - 48px)); margin: 42px auto 80px;
  .page-head { margin-bottom: 24px; }
  .eyebrow { color: ${({ theme }) => theme.accent}; font-size: 12px; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; }
  h1 { font-size: 42px; letter-spacing: -.055em; line-height: 1.1; margin: 4px 0; }
  .intro { color: ${({ theme }) => theme.muted}; margin: 0; }
  .group { padding: 21px; background: ${({ theme }) => theme.surface}; border: 1px solid ${({ theme }) => theme.border}; border-radius: 12px; margin-bottom: 12px; }
  .group h2 { margin: 0 0 4px; font-size: 16px; }
  .group p { color: ${({ theme }) => theme.muted}; margin: 0 0 13px; font-size: 14px; }
  select, button { border: 1px solid ${({ theme }) => theme.border}; border-radius: 8px; padding: 9px 11px; color: ${({ theme }) => theme.text}; background: ${({ theme }) => theme.background}; }
  button { cursor: pointer; font-weight: 650; }
  .danger { border-color: #bd3a34; color: #bd3a34; }
  .row { display: flex; justify-content: space-between; align-items: center; gap: 15px; }
  @media (max-width: 1440px) { width: min(760px, calc(100% - 48px)); }
  @media (max-width: 1024px) { margin-top: 34px; }
  @media (max-width: 768px) { width: min(100% - 36px, 680px); }
  @media (max-width: 480px) { width: calc(100% - 28px); margin-top: 26px; .group { padding: 17px; } .row { align-items: start; flex-direction: column; } }
  @media (max-width: 390px) { width: calc(100% - 24px); h1 { font-size: 36px; } }
`;
export default SettingsDetails;
