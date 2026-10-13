import styled from 'styled-components';
const TerminologyDetails = styled.div`
  width: min(920px, calc(100% - 48px));
  margin: 42px auto 80px;

  .page-head { margin-bottom: 24px; }
  .eyebrow {
    color: ${({ theme }) => theme.accent};
    font-size: 12px;
    font-weight: 750;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
  h1 {
    font-size: clamp(36px, 4vw, 50px);
    letter-spacing: -.055em;
    line-height: 1.1;
    margin: 4px 0;
  }
  .intro { color: ${({ theme }) => theme.muted}; margin: 0; }
  .prose {
    min-width: 0;
    padding: 28px;
    background: ${({ theme }) => theme.surface};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 13px;
    overflow-wrap: anywhere;
  }
  .prose h2 { font-size: 21px; margin: 28px 0 8px; }
  .prose h2:first-child { margin-top: 0; }
  .prose p, .prose li { color: ${({ theme }) => theme.muted}; }
  .prose ul { padding-left: 21px; }
  .prose li { margin: 0 0 8px; }
  @media (max-width: 1440px) {
    width: min(920px, calc(100% - 48px));
  }
  @media (max-width: 1024px) {
    margin-top: 34px;
  }
  @media (max-width: 768px) {
    width: min(100% - 36px, 680px);
    .prose { padding: 23px; }
  }
  @media (max-width: 480px) {
    width: calc(100% - 24px);
    margin-top: 26px;
    .prose { padding: 16px; }
    .prose h2 { font-size: 19px; }
  }
  @media (max-width: 360px) {
    .prose { padding: 13px; }
  }
`;
export default TerminologyDetails;
