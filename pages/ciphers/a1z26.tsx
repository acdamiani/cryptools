import Area from '@/components/Area/area';
import Tool from '@/components/Tool/tool';
import A1Z26Cipher from '@/src/ciphers/a1z26';
import { FormEvent, useId, useRef } from 'react';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import TextArea from '@/components/TextArea/text-area';
import Row from '@/components/Row/row';
import ToggleSwitch from '@/components/ToggleSwitch/toggle-switch';
import Toggle from '@/components/Toggle/toggle';
import useFormFill from '@/hooks/useFormFill';
import Link from '@/components/Link/link';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import highlight from '@/src/code';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `A1Z26 Cipher Encode and Decode - Cryptools`;
const description = `A1Z26 cipher encoder and decoder, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/ciphers/a1z26` };

const CODE_SNIPPETS: CodeBlockHTML = {
  javascript: `const text = "Hello World";

const ciphered = [...text.toLowerCase()]
  .map((c) => {
    if (c >= "a" && c <= "z") {
      return c.charCodeAt(0) - "a".charCodeAt(0) + 1;
    } else {
      return "";
    }
  })
  .filter(Boolean)
  .join(" ");

console.log(\`A1Z26 cipher of \${text}: \${ciphered}\`);`,
  python: `text = "Hello World"

ciphered = " ".join(
    filter(
        None,
        [
            (
                str((ord(c) - ord("a") + 1))
                if (ord(c) >= ord("a") and ord(c) <= ord("z"))
                else None
            )
            for c in text.lower()
        ],
    )
)

print(f"A1Z26 cipher of {text}: {ciphered}")`,
  ruby: `text = 'Hello World'

ciphered = text.downcase.chars.map do |c|
  next c.ord - 'a'.ord + 1 if c >= 'a' && c <= 'z'

  nil
end.compact.join ' '

puts "A1Z26 cipher of #{text}: #{ciphered}"`,
  csharp: `using System;
using System.Linq;

string text = "Hello World";

string ciphered = String.Join(' ', text.ToLower().Select(c => {
    if (c >= 'a' && c <= 'z') {
      return ((int)(c - 'a' + 1)).ToString();
    } else {
      return null;
    }
  })
  .Where(x => !String.IsNullOrEmpty(x))
);

Console.WriteLine($"A1Z26 cipher of {text}: {ciphered}");`,
  go: `package main

import (
	"fmt"
	"strings"
)

func main() {
	text := "Hello World"

	var arr []string
	for _, c := range strings.ToLower(text) {
		if c >= 'a' && c <= 'z' {
			arr = append(arr, fmt.Sprintf("%d", c-'a'+1))
		}
	}

	ciphered := strings.Join(arr, " ")
	fmt.Printf("A1Z26 cipher of %s: %s\\n", text, ciphered)
}`,
};

export default function A1Z26({ code }: { code: CodeBlockHTML }) {
  const inputId = useId();
  const keyId = useId();
  const alphabetId = useId();
  const casingId = useId();

  const ref = useRef<HTMLFormElement>(null);
  useFormFill(ref);

  const doConvert = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      input: { value: string };
      alphabet: { value: string };
      key: { value: string };
      casing: { checked: boolean };
      encode: { checked: boolean };
    };

    const c = new A1Z26Cipher(
      target.key.value,
      target.alphabet.value,
      target.casing.checked,
    );

    return target.encode.checked
      ? c.encrypt(target.input.value)
      : c.decrypt(target.input.value);
  };

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>A1Z26 Cipher Encoder and Decoder</h1>
      <Area>
        <Tool generateOutput={doConvert} ref={ref}>
          <Row>
            <LabeledElement content="Key" flexBasis={false} htmlFor={keyId}>
              <TextArea
                id={keyId}
                name="key"
                defaultValue=" "
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
          <ToggleSwitch
            leftContent="Decode"
            rightContent="Encode"
            defaultChecked={true}
            name="encode"
          />
          <LabeledElement
            content="Case Sensitive"
            htmlFor={casingId}
            horizontal
          >
            <Toggle name="casing" defaultChecked={false} id={casingId} />
          </LabeledElement>
          <LabeledElement content={<strong>Input</strong>}>
            <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
          </LabeledElement>
        </Tool>
        <CodeBlock snippets={code} />
      </Area>
      <h2>The A1Z26 cipher</h2>
      <p>
        The A1Z26 cipher is a very simple substitution cipher in which each
        character in the original text is replaced by its one-based index in a
        given alphabet. The &quot;key&quot; for this cipher is the
        delimiter&mdash;it separates the numbers for decoding. A becomes 1 and Z
        becomes 26, giving this cipher its name.
      </p>
      <h3>Example</h3>
      <p>Take the following sentence:</p>
      <pre>
        <code>The quick brown fox jumps over the lazy dog.</code>
      </pre>
      <p>
        Using the A1Z26 cipher results in the following{` `}
        <Link href="?input=The+quick+brown+fox+jumps+over+the+lazy+dog.&encode=true">
          ciphertext
        </Link>
        :
      </p>
      <pre>
        <code>
          20 8 5 17 21 9 3 11 2 18 15 23 14 6 15 24 10 21 13 16 19 15 22 5 18 20
          8 5 12 1 26 25 4 15 7
        </code>
      </pre>
      <p>
        Note that the neither the spaces or period is included in the
        ciphertext. This is because it is they are not present in the alphabet.
        This means that its{` `}
        <Link href="?input=20+8+5+17+21+9+3+11+2+18+15+23+14+6+15+24+10+21+13+16+19+15+22+5+18+20+8+5+12+1+26+25+4+15+7&encode=false">
          decoding
        </Link>
        {` `}
        will not include these characters.
      </p>
      <pre>
        <code>thequickbrownfoxjumpsoverthelazydog</code>
      </pre>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { code: await highlight(CODE_SNIPPETS) },
  };
}
