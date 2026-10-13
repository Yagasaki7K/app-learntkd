import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;
    --tkd-background: #f7f7f5;
    --tkd-surface: #ffffff;
    --tkd-text: #171717;
    --tkd-muted: #686868;
    --tkd-border: #e4e4e0;
    --tkd-accent: #c8372e;
    --tkd-accent-soft: #fff0ed;
    --tkd-header: rgba(255,255,255,0.92);
    --tkd-shadow: 0 12px 36px rgba(22,22,20,0.05);
  }
  :root[data-theme-mode='dark'] {
    color-scheme: dark;
    --tkd-background: #101111;
    --tkd-surface: #191a1a;
    --tkd-text: #f4f4f1;
    --tkd-muted: #a5a6a3;
    --tkd-border: #303231;
    --tkd-accent: #ff766c;
    --tkd-accent-soft: #321d1b;
    --tkd-header: rgba(16,17,17,0.92);
    --tkd-shadow: 0 12px 36px rgba(0,0,0,0.18);
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme-choice='light']):not([data-theme-choice='dark']) {
      color-scheme: dark;
      --tkd-background: #101111;
      --tkd-surface: #191a1a;
      --tkd-text: #f4f4f1;
      --tkd-muted: #a5a6a3;
      --tkd-border: #303231;
      --tkd-accent: #ff766c;
      --tkd-accent-soft: #321d1b;
      --tkd-header: rgba(16,17,17,0.92);
      --tkd-shadow: 0 12px 36px rgba(0,0,0,0.18);
    }
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; min-width: 316px; overflow-x: clip; background: ${({ theme }) => theme.background}; color: ${({ theme }) => theme.text}; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-size: 15px; line-height: 1.6; }
  main, header, footer, section, article { min-width: 0; }
  h1, h2, h3, p, li, a, button, select { overflow-wrap: anywhere; }
  svg, img { max-width: 100%; }
  a { color: inherit; text-decoration: none; }
  button, input, select { font: inherit; }
  button { color: inherit; }
  ::selection { background: ${({ theme }) => theme.accentSoft}; }
`;
export default GlobalStyle;
