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
import { FormEvent, useId, useRef } from 'react';
import TabulaRecta from '@/public/svg/tabula-recta.svg';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import Scrollable from '@/components/Scrollable/scrollable';
import useFormFill from 'hooks/useFormFill';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import Meta, { OpenGraph } from '@/components/Meta/meta';
import highlight from '@/src/code';

const title = `Vigenere Cipher Encode and Decode - Cryptools`;
const description = `Vigenere cipher encoder and decoder.`;
const og: OpenGraph = { url: `https://cryptools.dev/ciphers/vigenere` };

const CODE_SNIPPETS: CodeBlockHTML = {
  javascript: `const key = "cryptools";
const text = "hello world";
const alphabet = "abcdefghijklmnopqrstuvwxyz";

let i = 0;
const result = [...text]
  .map((v) => {
    const keyIndex = alphabet.indexOf(key[i % key.length]);
    const textIndex = alphabet.indexOf(v);
    if (keyIndex === -1 || textIndex === -1) {
      return v;
    }
    i++;
    return alphabet[(keyIndex + textIndex) % alphabet.length];
  })
  .join("");

console.log(\`Ciphering "\${text}" using key "\${key}": "\${result}"\`);`,
  csharp: `using System;
using System.Linq;

string key = "cryptools";
string text = "hello world";
string alphabet = "abcdefghijklmnopqrstuvwxyz";

int i = 0;
string result = String.Concat(text.Select(v =>{
  int keyIndex = alphabet.IndexOf(key[i % key.Length]);
  int textIndex = alphabet.IndexOf(v);
  if (keyIndex == -1 || textIndex == -1) {
    return v;
  }
  i++;
  return alphabet[(keyIndex + textIndex) % alphabet.Length];
}));

Console.WriteLine($"Ciphering \\"{text}\\" using key \\"{key}\\": \\"{result}\\"");`,
  go: `package main

import (
	"fmt"
	"strings"
)

func main() {
	key := "cryptools"
	text := "hello world"
	alphabet := "abcdefghijklmnopqrstuvwxyz"

	i := 0
	result := strings.Map(func(r rune) rune {
		keyIndex := strings.IndexRune(alphabet, rune(key[i%len(key)]))
		textIndex := strings.IndexRune(alphabet, r)
		if keyIndex == -1 || textIndex == -1 {
			return r
		}
		i++
		return rune(alphabet[(keyIndex+textIndex)%len(alphabet)])
	}, text)

	fmt.Println(fmt.Sprintf("Ciphering %s using key %s: %s", text, key, result))
}`,
  python: `import string

key = 'cryptools'
text = 'hello world'
alphabet = string.ascii_lowercase

def encode_char(v: str):
    try:
        key_index = alphabet.index(key[encode_char.i % len(key)])
        text_index = alphabet.index(v)
    except ValueError:
        return v
    encode_char.i += 1
    return alphabet[(key_index + text_index) % len(alphabet)]

encode_char.i = 0;
result = ''.join(map(encode_char, text))

print(f'Ciphering "{text}" using key "{key}": "{result}"')`,
  ruby: `key = 'cryptools'
text = 'hello world'
alphabet = 'abcdefghijklmnopqrstuvwxyz'

i = 0
result = text.chars.map do |v|
  key_index = alphabet.index(key[i % key.length])
  text_index = alphabet.index(v)
  next v if key_index.nil? || text_index.nil?

  i += 1
  alphabet[(key_index + text_index) % alphabet.length]
end

puts "Ciphering \\"#{text}\\" using key \\"#{key}\\": \\"#{result.join('')}\\""`,
};

export default function Caesar({ code }: { code: CodeBlockHTML }) {
  const inputId = useId();
  const keyId = useId();
  const alphabetId = useId();
  const casingId = useId();
  const variantId = useId();

  const ref = useRef<HTMLFormElement>(null);

  useFormFill(ref, [`input`, `alphabet`, `key`]);

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
      <Meta title={title} description={description} og={og} />
      <h1>Vigenere Cipher Encoder and Decoder</h1>
      <Area>
        <Tool generateOutput={doConvert} ref={ref}>
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
        <CodeBlock snippets={code} />
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

export async function getStaticProps() {
  return {
    props: { code: await highlight(CODE_SNIPPETS) },
  };
}
