import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: Parameters<typeof Document.getInitialProps>[0]) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () => originalRenderPage({ enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />) });
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps, styles: <>{initialProps.styles}{sheet.getStyleElement()}</> };
    } finally { sheet.seal(); }
  }
  render() {
    return <Html lang="en"><Head><script dangerouslySetInnerHTML={{ __html: `try { var t = localStorage.getItem('tkd-theme'); if (t !== 'light' && t !== 'dark' && t !== 'system') t = 'system'; var d = t === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches); document.documentElement.dataset.themeChoice = t; document.documentElement.dataset.themeMode = d ? 'dark' : 'light'; matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) { if (document.documentElement.dataset.themeChoice === 'system') document.documentElement.dataset.themeMode = e.matches ? 'dark' : 'light'; }); } catch (_) {}` }} /></Head><body><Main /><NextScript /></body></Html>;
  }
}
