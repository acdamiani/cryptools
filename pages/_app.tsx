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

export type NextPageWithProps<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
  useAds?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithProps;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const useAds = Component.useAds ?? true;

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
      <Script src="https://sa.cryptools.dev/latest.js" />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://sa.cryptools.dev/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      {useAds && (
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4052010510817676"
          crossOrigin="anonymous"
        />
      )}
      <Page>{getLayout(<Component {...pageProps} />)}</Page>
    </>
  );
}
