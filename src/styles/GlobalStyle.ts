import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; min-width: 316px; overflow-x: clip; background: ${({ theme }) => theme.background}; color: ${({ theme }) => theme.text}; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-size: 15px; line-height: 1.6; transition: background 180ms ease, color 180ms ease; }
  main, header, footer, section, article { min-width: 0; }
  h1, h2, h3, p, li, a, button, select { overflow-wrap: anywhere; }
  svg, img { max-width: 100%; }
  a { color: inherit; text-decoration: none; }
  button, input, select { font: inherit; }
  button { color: inherit; }
  ::selection { background: ${({ theme }) => theme.accentSoft}; }
`;
export default GlobalStyle;
