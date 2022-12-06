import Area from '@/components/Area/area';
import CodeBlock, { Snippets } from '@/components/CodeBlock/code-block';
import Encoder from '@/components/Encoder/encoder';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import Link from '@/components/Link/link';
import PunycodeEncoder from '@/src/encoders/punycode';

const CODE_SNIPPETS: Snippets = {
  javascript: `// Using [punycode](https://www.npmjs.com/package/punycode)
const punycode = require('punycode');

// Encoding domain names
punycode.encode('mañana'); // 'maana-pta'
punycode.encode('☃-⌘'); // '--dqo34k'

// Decoding domain names
punycode.decode('maana-pta'); // 'mañana'
punycode.decode('--dqo34k'); // '☃-⌘'`,
};

export default function Punycode() {
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
          <CodeBlock snippets={CODE_SNIPPETS} />
        </LabeledElement>
      </Area>
    </>
  );
}
