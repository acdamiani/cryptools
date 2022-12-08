import Area from '@/components/Area/area';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import Encoder from '@/components/Encoder/encoder';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import highlight from '@/src/code';
import PunycodeEncoder from '@/src/encoders/punycode';

const CODE_SNIPPETS: CodeBlockHTML = {
  javascript: `// Using [punycode](https://www.npmjs.com/package/punycode) 
const punycode = require('punycode');

// Encoding domain names
punycode.encode('mañana'); // 'maana-pta'
punycode.encode('☃-⌘'); // '--dqo34k'

// Decoding domain names
punycode.decode('maana-pta'); // 'mañana'
punycode.decode('--dqo34k'); // '☃-⌘'`,
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
