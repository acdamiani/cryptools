import Area from '@/components/Area/area';
import Encoder from '@/components/Encoder/encoder';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import Select from '@/components/Select/select';
import Base32Encoder, {
  Base32Variant,
  VARIANT_LABELS,
} from '@/src/encoders/base32';
import { useId } from 'react';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import highlight from '@/src/code';

const CODE_SNIPPETS: CodeBlockHTML = {
  javascript: `// Using the javascript [base32](https://www.npmjs.com/package/base32) library
const base32 = require('base32');

// Encoding Base32

// Decoding Base32`,
};

export default function Base32({ code }: { code: CodeBlockHTML }) {
  const variantId = useId();

  return (
    <>
      <h1>Base32 Encoder and Decoder</h1>
      <Area>
        <Encoder
          construct={(e) => {
            const target = e.target as typeof e.target & {
              variant: { value: Base32Variant };
            };
            return new Base32Encoder(target.variant.value);
          }}
          encode={(input: string, e: Base32Encoder) => e.encode(input)}
          decode={(input: string, e: Base32Encoder) => e.decode(input)}
          outputRows={3}
          encoderName="base32"
        >
          <LabeledElement htmlFor={variantId} content="Variant">
            <Select name="variant" id={variantId}>
              {Base32Encoder.getVariantsAsArray().map((x) => (
                <option key={x} value={x}>
                  {VARIANT_LABELS[x as Base32Variant]}
                </option>
              ))}
            </Select>
          </LabeledElement>
        </Encoder>
        <LabeledElement content={<strong>Code Snippets</strong>}>
          <CodeBlock snippets={code} />
        </LabeledElement>
      </Area>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { code: await highlight(CODE_SNIPPETS) },
  };
}
