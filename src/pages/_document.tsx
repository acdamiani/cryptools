import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          href="/fonts/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <Script
          id="get-color-scheme"
          strategy="beforeInteractive"
        >{`(()=>{const e=localStorage.getItem("color-theme"),a=window.matchMedia("(prefers-color-scheme: dark)").matches;(!e||e==="auto"?a:e==="dark")&&document.documentElement.classList.add("dark")})();`}</Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
