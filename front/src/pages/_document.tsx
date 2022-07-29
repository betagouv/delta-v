import Document, { Html, Main, NextScript, Head } from 'next/document';

import { AppConfig } from '@/utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html lang={AppConfig.locale} className="h-full">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `var _paq = window._paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="https://declare-douane.matomo.cloud/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='//cdn.matomo.cloud/declare-douane.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
          })();`,
            }}
          />
          <link
            href="/fonts/Marianne/Marianne-Regular.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-Regular_Italic.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-Medium.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-Medium_Italic.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-Bold.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-Bold_Italic.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-ExtraBold.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-ExtraBold_Italic.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-Light.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-Light_Italic.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-Thin.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-Thin_Italic.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/Marianne-Thin_Italic.woff2"
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Marianne/icomoon.woff"
            rel="preload"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
        </Head>
        <body className="h-full">
          <section className="h-full font-marianne text-secondary-800">
            <Main />
            <NextScript />
          </section>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
