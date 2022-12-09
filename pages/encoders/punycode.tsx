import Area from '@/components/Area/area';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import Encoder from '@/components/Encoder/encoder';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import highlight from '@/src/code';
import PunycodeEncoder from '@/src/encoders/punycode';

const CODE_SNIPPETS: CodeBlockHTML = {
  csharp: `using System;
using System.Globalization;
  
IdnMapping mapping = new IdnMapping();

// Encoding domain names
Console.WriteLine(mapping.GetAscii(@"mañana.com")); // 'xn--maana-pta.com'
Console.WriteLine(mapping.GetAscii(@"☃-⌘.com")); // 'xn----dqo34k.com'

// Decoding domain names
Console.WriteLine(mapping.GetUnicode("xn--maana-pta.com")); // 'mañana.com'
Console.WriteLine(mapping.GetUnicode("xn----dqo34k.com")); // '☃-⌘.com'`,
  go: `// Using supplementary [idna](https://pkg.go.dev/golang.org/x/net/idna) package
import (
  "fmt"
  "idna"
)

// Encoding domain names
fmt.Println(idna.ToASCII("mañana.com")) // 'xn--maana-pta.com'
fmt.Println(idna.ToASCII("☃-⌘.com")) // 'xn----dqo34k.com'

// Decoding domain names
fmt.Println(idna.ToUnicode("xn--maana-pta.com")) // 'mañana.com'
fmt.Println(idna.ToUnicode("xn----dqo34k.com")) // '☃-⌘.com'`,
  javascript: `// Using [punycode](https://www.npmjs.com/package/punycode) 
const punycode = require('punycode');

// Encoding domain names
punycode.toASCII('mañana.com'); // 'xn--maana-pta.com'
punycode.toASCII('☃-⌘.com'); // 'xn----dqo34k.com'

// Decoding domain names
punycode.toUnicode('xn--maana-pta.com'); // 'mañana.com'
punycode.toUnicode('xn----dqo34k.com'); // '☃-⌘.com'`,
};

export default function Punycode({ code }: { code: CodeBlockHTML }) {
  const punycode = new PunycodeEncoder();

  return (
    <>
      <h1>Punycode Encode and Decode Online</h1>
      <Area>
        <Encoder
          encode={punycode.encode.bind(punycode)}
          decode={punycode.decode.bind(punycode)}
          encoderName="punycode"
        />
        <LabeledElement content={<strong>Code Snippets</strong>}>
          <CodeBlock snippets={code} />
        </LabeledElement>
      </Area>
      <h2>The Punycode encoding</h2>
      <p>
        Punycode is a specialized representation of Unicode with a limited
        character set, specifically designed for domain names. DNS (Domain Name
        Resolution), while it technically can handle all Unicode characters,
        favors a limited character set called letter-digit-hyphen (LDH).
        Punycode seeks to encode arbitray Unicode domain names into this
        character set.
      </p>
      <p>
        Punycode is a specific algorithm based off of the more general
        Bootstring algorithm, which composes strings of smaller sets of basic
        code points from any larger set.
      </p>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { code: await highlight(CODE_SNIPPETS) },
  };
}
