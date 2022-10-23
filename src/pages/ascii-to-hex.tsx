import { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';

import TextToText from '@/layouts/textToText';
import Page from '@/layouts/page';

const convert = (arg0: string) => {
  const result = [];

  for (let i = 0; i < arg0.length; i++) {
    result.push(arg0.charCodeAt(i).toString(16).toUpperCase());
  }

  return result.join(` `);
};

const AsciiToText: NextPageWithLayout = () => {
  return (
    <>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
    </>
  );
};

AsciiToText.getLayout = function getLayout(page: ReactElement) {
  return (
    <Page>
      <TextToText title="ASCII Text to Hex Code Converter" transform={convert}>
        {page}
      </TextToText>
    </Page>
  );
};

export default AsciiToText;
