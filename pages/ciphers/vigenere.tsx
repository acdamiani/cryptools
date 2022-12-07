import Area from '@/components/Area/area';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import Link from '@/components/Link/link';
import Row from '@/components/Row/row';
import Select from '@/components/Select/select';
import TextArea from '@/components/TextArea/text-area';
import Toggle from '@/components/Toggle/toggle';
import ToggleSwitch from '@/components/ToggleSwitch/toggle-switch';
import Tool from '@/components/Tool/tool';
import VigenereCipher, {
  CaseStrategy,
  VigenereVariant,
} from '@/src/ciphers/vigenere';
import { FormEvent, useId } from 'react';
import TabulaRecta from '@/public/svg/tabula-recta.svg';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import Scrollable from '@/components/Scrollable/scrollable';

export default function Caesar() {
  const inputId = useId();
  const keyId = useId();
  const alphabetId = useId();
  const casingId = useId();
  const variantId = useId();

  const doConvert = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      input: { value: string };
      alphabet: { value: string };
      'insert-invalid': { checked: boolean };
      key: { value: string };
      mode: { checked: boolean };
      casing: { value: CaseStrategy };
      variant: { value: VigenereVariant };
    };

    const c = new VigenereCipher(
      target.key.value,
      target.variant.value,
      target.alphabet.value,
      target.casing.value,
      target[`insert-invalid`].checked,
    );

    return target.mode.checked
      ? c.encode(target.input.value)
      : c.decode(target.input.value);
  };

  return (
    <>
      <h1>Vigenere Cipher Encode and Decode Online</h1>
      <Area>
        <Tool generateOutput={doConvert}>
          <Row>
            <LabeledElement content="Key" flexBasis={false} htmlFor={keyId}>
              <TextArea
                id={keyId}
                name="key"
                defaultValue="cryptools"
                spellCheck={false}
              />
            </LabeledElement>
            <LabeledElement content="Alphabet" htmlFor={alphabetId}>
              <TextArea
                id={alphabetId}
                defaultValue="abcdefghijklmnopqrstuvwxyz"
                name="alphabet"
                spellCheck={false}
              />
            </LabeledElement>
          </Row>
          <LabeledElement content="Variant" htmlFor={variantId}>
            <Select name="variant" id={variantId}>
              <option value="standard">Standard</option>
              <option value="beaufort">Beaufort</option>
              <option value="beaufort-variant">Beaufort Variant</option>
            </Select>
          </LabeledElement>
          <ToggleSwitch
            leftContent="Decode"
            rightContent="Encode"
            initialValue={true}
            name="mode"
          />
          <LabeledElement content={<strong>Input</strong>}>
            <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
          </LabeledElement>
          <LabeledElement content="Casing Strategy" htmlFor={casingId}>
            <Select name="casing" id={casingId}>
              <option value="maintain">Maintain</option>
              <option value="ignore">Ignore</option>
              <option value="skip">Skip</option>
            </Select>
          </LabeledElement>
          <Toggle
            name="insert-invalid"
            label="Insert Invalid"
            initialValue={true}
          />
        </Tool>
      </Area>
      <h2>The Vigenère cipher</h2>
      <main>
        <p>
          The Vigenère cipher is a more complex application of the{` `}
          <Link href="/ciphers/caesar">Caesar cipher</Link>, where it encodes
          text using a given key in the form of text. It uses a table of shifted
          Caesar ciphers, and using the key, uses the table to encode a letter.
          This table, called a <em>tabula recta</em>, is shown below.
        </p>
        <Scrollable>
          <TabulaRecta width={500} height={500} />
        </Scrollable>
        <h3>The encoding process</h3>
        <p>
          Say you want to encode the message <code>HELLOWORLD</code> with key
          {` `}
          <code>CRYPTOOLS</code>. When encoding using a key shorter than the
          message, the key is repeated so its length is the length of the input
          text. In this case, this results in key text of{` `}
          <code>CRYPTOOLSC</code>. The encoding process moves through the
          message sequentially, starting with the first letter and matching it
          to the first letter of the key. To find the ciphered letter, find the
          intersection of the current message letter and the current key letter.
        </p>
        <p>The encoding process for the first letter:</p>
        <ol>
          <li>Find the message letter at index [0] -&gt; &quot;H&quot;</li>
          <li>Find the key letter at index [0] -&gt; &quot;C&quot;</li>
          <li>Using the table, find their intersection -&gt; &quot;J&quot;</li>
          <li>Repeat for next letter in message</li>
        </ol>
        <p>The encoding process for the last letter:</p>
        <ol>
          <li>Find the message letter at index [9] -&gt; &quot;D&quot;</li>
          <li>Find the key letter at index [9] -&gt; &quot;C&quot;</li>
          <li>Using the table, find their intersection -&gt; &quot;F&quot;</li>
          <li>Last letter, exit</li>
        </ol>
        <p>
          The resulting encoded text is <code>JVJAHKCCDF</code>.
        </p>
        <MathJaxContext>
          <p>
            This process can also be expressed algebraically, where{` `}
            <MathJax inline>{`\\(C_i\\)`}</MathJax> is the current character at
            index <MathJax inline>{`\\(i\\)`}</MathJax> being encoded, and{` `}
            <MathJax inline>{`\\(K_i\\)`}</MathJax> is the key character being
            encoded at the same index. These values represent the
            character&apos;s index in the Caesar alphabet.
          </p>
          <p>
            <MathJax>{`\\(E_K(C_i)=(C_i+K_i)\\mod 26\\)`}</MathJax>
          </p>
          <p>
            Decryption is performed by subtracting the key&apos;s shift value
            instead of adding it.
          </p>
          <p>
            <MathJax>{`\\(D_K(C_i)=(C_i-K_i)\\mod 26\\)`}</MathJax>
          </p>
          <p>
            More generally, when <MathJax inline>{`\\(l\\)`}</MathJax> is the
            length of the key, and <MathJax inline>{`\\(m\\)`}</MathJax> as the
            length of the alphabet, encryption and decryption can be written as
            such:
          </p>
          <p>
            <MathJax>{`\\(E_K(C_i)=(C_i+K_{i\\bmod l})\\mod m\\)`}</MathJax>
          </p>
          <p>
            <MathJax>{`\\(D_K(C_i)=(C_i-K_{i\\bmod l})\\mod m\\)`}</MathJax>
          </p>
          <h3>Vigenère variants</h3>
          <p>
            The <strong>Beaufort variant</strong> is a modification of the
            Vigenere cipher where the encryption and decryption steps are
            switched (encryption performs subtraction and decryption performs
            addition).
          </p>
          <p>
            Using the same message <code>HELLOWORLD</code> and key{` `}
            <code>CRYPTOOLS</code>, it would result in an encrypted message{` `}
            <code>FNNWVIAGTB</code>.
          </p>
          <p>
            The <strong>Beaufort cipher</strong> is a different modification of
            the Vigenere cipher in which the message index is subtracted from
            the key index in both encryption and decryption.
          </p>
          <p>So, encryption and decryption can be written as</p>
          <p>
            <MathJax>
              {`\\(E_K(C_i)=D_K(C_i)=(K_{i\\bmod l}-C_i)\\mod m\\)`}
            </MathJax>
          </p>
        </MathJaxContext>
      </main>
    </>
  );
}
