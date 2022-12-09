import Area from '@/components/Area/area';
import Encoder from '@/components/Encoder/encoder';
import UrlEncoder from '@/src/encoders/url';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import highlight from '@/src/code';

const CODE_SNIPPETS: CodeBlockHTML = {
  csharp: `using System;

// Encoding URLs
Console.WriteLine(Uri.EscapeDataString("Hello World")); // 'Hello%20World'
Console.WriteLine(Uri.EscapeDataString("шеллы")); // '%D1%88%D0%B5%D0%BB%D0%BB%D1%8B'

// Decoding URLs
Console.WriteLine(Uri.UnescapeDataString("Hello%20World")); // 'Hello World'
Console.WriteLine(Uri.UnescapeDataString("%D1%88%D0%B5%D0%BB%D0%BB%D1%8B")); // 'шеллы'`,
  ruby: `require "uri"

# Encoding URLs
puts URI.escape "Hello World" # 'Hello%20World'
puts URI.escape "шеллы" # '%D1%88%D0%B5%D0%BB%D0%BB%D1%8B'

# Decoding URLs
puts URI.unescape "Hello%20World" # 'Hello World'
puts URI.unescape "шеллы" # '%D1%88%D0%B5%D0%BB%D0%BB%D1%8B'`,
  javascript: `// Encoding URLs
console.log(encodeURIComponent('Hello World')); // 'Hello%20World'
console.log(encodeURIComponent('шеллы')); // '%D1%88%D0%B5%D0%BB%D0%BB%D1%8B'

// Decoding URLs
console.log(decodeURIComponent('Hello%20World')); // 'Hello World'
console.log(decodeURIComponent('%D1%88%D0%B5%D0%BB%D0%BB%D1%8B')); // 'шеллы'`,
};

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
