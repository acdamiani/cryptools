import { AppProps } from 'next/app';
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
      <Page>{getLayout(<Component {...pageProps} />)}</Page>
    </>
  );
}
