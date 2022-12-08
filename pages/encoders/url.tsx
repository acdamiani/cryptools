import Area from '@/components/Area/area';
import Encoder from '@/components/Encoder/encoder';
import UrlEncoder from '@/src/encoders/url';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import highlight from '@/src/code';

const CODE_SNIPPETS: CodeBlockHTML = {};

export default function Url({ code }: { code: CodeBlockHTML }) {
  const url = new UrlEncoder();

  return (
    <>
      <h1>URL Encoder and Decoder</h1>
      <Area>
        <Encoder
          encode={url.encode.bind(url)}
          decode={url.decode.bind(url)}
          encoderName="url"
        />
        <CodeBlock snippets={code} />
      </Area>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { code: await highlight(CODE_SNIPPETS) },
  };
}
