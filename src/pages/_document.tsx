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
    return <Html lang="pt-BR"><Head><meta name="theme-color" content="#f7f7f5" /><meta name="description" content="Taekwondo study companion for WT techniques, belts and terminology." /><link rel="manifest" href="/manifest.json" /><link rel="icon" href="/icon.svg" /></Head><body><Main /><NextScript /></body></Html>;
  }
}
