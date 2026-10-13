import styled from 'styled-components';
const HierarchyDetails = styled.div`
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
    padding: 28px;
    background: ${({ theme }) => theme.surface};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 13px;
    overflow-x: auto;
  }
  .prose h2 { font-size: 21px; margin: 28px 0 8px; }
  .prose h2:first-child { margin-top: 0; }
  .prose p, .prose li { color: ${({ theme }) => theme.muted}; }
  .prose table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .prose th, .prose td {
    text-align: left;
    vertical-align: top;
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
  .prose td { color: ${({ theme }) => theme.muted}; }
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
    width: calc(100% - 28px);
    margin-top: 26px;
    .prose { padding: 17px; }
    .prose table { min-width: 600px; }
  }
  @media (max-width: 390px) {
    width: calc(100% - 24px);
    .prose { padding: 14px; }
  }
`;
export default HierarchyDetails;
