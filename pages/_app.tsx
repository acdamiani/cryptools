import { AppProps } from 'next/app';
import Script from 'next/script';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { Inter } from '@next/font/google';

import 'normalize.css';
import '@/styles/globals.css';

import Page from '@/layouts/page';

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] });

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <style jsx global>{`
        :root {
          --ct-font-family: ${inter.style.fontFamily}, -apple-system,
            BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubutnu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          --ct-mono-font-family: monospace, monospace;
        }
      `}</style>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4052010510817676"
        crossOrigin="anonymous"
      />
      <Page>{getLayout(<Component {...pageProps} />)}</Page>
    </>
  );
}
