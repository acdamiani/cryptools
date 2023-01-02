import Area from '@/components/Area/area';
import RotCipher, { ROTVariant } from '@/src/ciphers/rot';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import Tool from '@/components/Tool/tool';
import { FormEvent, useId, useRef } from 'react';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import Select from '@/components/Select/select';
import TextArea from '@/components/TextArea/text-area';
import useFormFill from '@/hooks/useFormFill';
import Link from '@/components/Link/link';
import highlight from '@/src/code';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `ROT13 Cipher Encode and Decode - Cryptools`;
const description = `ROT13 cipher encoder and decoder, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/ciphers/rot13` };

const CODE_SNIPPETS: CodeBlockHTML = {
  csharp: `using System;
using System.Text;
using System.Text.RegularExpressions;

string text = "Hello World";
string ciphered = Regex.Replace(text, @ "[a-zA-Z]", new MatchEvaluator(match =>
{
    char c = match.Value[0];
    int last = c <= 'Z' ? 90 : 122;
    c += (char) 13;
    return ((char)(last >= c ? c : c - 26)).ToString();
}));

Console.WriteLine($ "ROT13 cipher of {text}: {ciphered}");`,
  javascript: `const text = "Hello World";
const ciphered = text.replace(/[a-zA-Z]/g, (c) => {
  const last = c <= "Z" ? 90 : 122;
  c = c.charCodeAt(0) + 13;
  return String.fromCharCode(last >= c ? c : c - 26);
});

console.log(\`ROT13 cipher of \${text}: \${ciphered}\`);`,
  python: `import string

text = "Hello World"
lc = string.ascii_lowercase
uc = string.ascii_uppercase

table = str.maketrans(lc + uc, lc[13:] + lc[:13] + uc[13:] + uc[:13])
ciphered = str.translate(text, table)

print(f"ROT13 cipher of {text}: {ciphered}")`,
  go: `package main

import (
	"fmt"
	"regexp"
	"unicode/utf8"
)

func main() {
	text := "Hello World"
	a := regexp.MustCompile(\`[a-zA-Z]\`)

	ciphered := a.ReplaceAllStringFunc(text, func(m string) string {
		c, _ := utf8.DecodeRuneInString(m)

		switch {
		case c <= 'Z' && 90 >= c+13:
			fallthrough
		case c > 'Z' && 122 >= c+13:
			return string(c + 13)
		case c <= 'Z' && 90 < c+13:
			fallthrough
		case c > 'Z' && 122 < c+13:
			return string(c - 13)
		}
		return ""
	})

	fmt.Printf("ROT13 cipher of %s: %s\\n", text, ciphered)
}`,
  ruby: `text = 'Hello World'

ciphered = text.gsub(/[a-zA-Z]/) do |c|
  last = c <= 'Z' ? 90 : 122
  c = c.ord + 13
  (last >= c ? c : c - 26).chr
end

puts "ROT13 cipher of #{text}: #{ciphered}"`,
};

export default function ROT13({ code }: { code: CodeBlockHTML }) {
  const inputId = useId();
  const variantId = useId();

  const ref = useRef<HTMLFormElement>(null);

  useFormFill(ref, [`input`, `variant`]);

  const doConvert = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      input: { value: string };
      variant: { value: ROTVariant };
    };

    const c = new RotCipher(target.variant.value);

    return c.encode(target.input.value);
  };

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>ROT13 Cipher Encoder and Decoder</h1>
      <Area>
        <Tool generateOutput={doConvert} ref={ref}>
          <LabeledElement content="Variant" htmlFor={variantId}>
            <Select name="variant" id={variantId} defaultValue="rot13">
              <option value="rot5">ROT5</option>
              <option value="rot13">ROT13</option>
              <option value="rot18">ROT18</option>
              <option value="rot47">ROT47</option>
            </Select>
          </LabeledElement>
          <LabeledElement content={<strong>Input</strong>}>
            <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
          </LabeledElement>
        </Tool>
        <CodeBlock snippets={code} />
      </Area>
      <h2>The ROT13 cipher</h2>
      <main>
        <p>
          The ROT13 cipher is a <Link href="/ciphers/caesar">Caesar</Link>
          -based cipher that works using the Latin alphabet. Because the Latin
          alphabet has 26 characters, using a Caesar cipher with a shift of 13
          results in a cipher that is its own inverse; that is, its encoding and
          decoding processes are exactly the same.
        </p>
        <p>
          While the ROT13 cipher has effectively no cryptographic security, it
          remains a useful way to obscure information from a casual glance.
        </p>
        <h3>Example</h3>
        <p>Take the following sentence:</p>
        <pre>
          <code>The quick brown fox jumps over the lazy dog.</code>
        </pre>
        <p>Applying the ROT13 cipher results in the following ciphertext:</p>
        <pre>
          <code>Gur dhvpy oebja sbl whzcf bire gur xnmk qbt.</code>
        </pre>
        <p>
          Now, by applying the ROT13 cipher again, the original text should
          appear, illustrating the invertability of the ROT13 cipher.
        </p>
        <pre>
          <code>The quick brown fox jumps over the lazy dog.</code>
        </pre>
        <h3>Variants</h3>
        <p>
          The ROT13 cipher also has a few variants which may be more useful
          depending on the situation.
        </p>
        <ul>
          <li>
            The <Link href="?variant=rot5">ROT5</Link> variant operates only on
            the 10 decimal numbers, 0-9. It is a useful way to obscure numbers,
            because it is not immediately noticable that the number is invalid,
            unlike Latin text.
          </li>
          <li>
            The <Link href="?variant=rot18">ROT18</Link> variant is a
            combination of ROT5 and ROT13. It will use ROT13 on Latin characters
            and ROT5 on decimal values.
          </li>
          <li>
            The <Link href="?variant=rot47">ROT47</Link> variant operates on all
            printable ASCII characters, excluding spaces. That is, from the{` `}
            <code>!</code>
            {` `}
            character to the <code>~</code> character, resulting in an alphabet
            94 characters long. This longer alphabet results in a more thorough
            obfuscation of the source text, while making it more noticable that
            the text has been tampered with.
          </li>
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { code: await highlight(CODE_SNIPPETS) },
  };
}
