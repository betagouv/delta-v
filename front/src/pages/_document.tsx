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
            href="/fonts/Roboto/Roboto-Regular.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Roboto/Roboto-Italic.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Roboto/Roboto-Medium.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Roboto/Roboto-MediumItalic.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Roboto/Roboto-Bold.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Roboto/Roboto-BoldItalic.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Roboto/Roboto-Black.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Roboto/Roboto-BlackItalic.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Roboto/Roboto-Light.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Roboto/Roboto-LightItalic.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Roboto/Roboto-Thin.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            href="/fonts/Roboto/Roboto-ThinItalic.ttf"
            rel="preload"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
        </Head>
        <body className="h-full">
          <section className="font-roboto h-full text-secondary-800">
            <Main />
            <NextScript />
          </section>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
