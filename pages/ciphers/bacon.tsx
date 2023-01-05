import Area from '@/components/Area/area';
import Tool from '@/components/Tool/tool';
import { FormEvent, useId, useRef } from 'react';
import BaconCipher, { BaconVariant } from '@/src/ciphers/bacon';
import Row from '@/components/Row/row';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import TextArea from '@/components/TextArea/text-area';
import Select from '@/components/Select/select';
import ToggleSwitch from '@/components/ToggleSwitch/toggle-switch';
import CodeBlock, { CodeBlockHTML } from '@/components/CodeBlock/code-block';
import highlight from '@/src/code';
import Meta, { OpenGraph } from '@/components/Meta/meta';
import useFormFill from '@/hooks/useFormFill';
import Table from '@/components/Table/table';

const title = `Bacon Cipher Encode and Decode - Cryptools`;
const description = `Bacon cipher encoder and decoder, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/ciphers/bacon` };

const CODE_SNIPPETS: CodeBlockHTML = {
  javascript: `const message = "hello world";
const aChar = "a";
const bChar = "b";

const alphabetIndex = "A".charCodeAt(0);
const table = [...Array(26).keys()].reduce((map, v) => {
  map[String.fromCharCode(alphabetIndex + v)] = v
    .toString(2)
    .padStart(5, "0")
    .replaceAll("0", aChar)
    .replaceAll("1", bChar);
  return map;
}, {});

const ciphered = [...message.toUpperCase()]
  .map((v) => table[v] ?? "")
  .filter(Boolean)
  .join(" ");

console.log(\`Bacon cipher of "\${message}": "\${ciphered}"\`);`,
  csharp: `using System;
using System.Linq;
using System.Collections.Generic;

string message = "hello world";
char aChar = 'a';
char bChar = 'b';

int alphabetIndex = (int)'A';
Dictionary<char, string> table = Enumerable
  .Range(0, 26)
  .ToDictionary(
    x => (char)(alphabetIndex + x),
    x => Convert.ToString(x, 2).PadLeft(5, '0').Replace('0', aChar).Replace('1', bChar)
  );

string ciphered = String.Join(
  ' ',
  message
    .ToUpper()
    .Select(x => table.TryGetValue(x, out string v) ? v : "")
    .Where(x => !String.IsNullOrEmpty(x))
);

Console.WriteLine($"Bacon cipher of \\"{message}\\": \\"{ciphered}\\"");`,
  go: `package main

import (
	"fmt"
	"strings"
)

func main() {
	message := "hello world"
	aChar := "a"
	bChar := "b"

	table := make(map[rune]string)
	replacer := strings.NewReplacer("0", aChar, "1", bChar)
	for v := int64(0); v < 26; v++ {
		table[rune('A'+v)] = replacer.Replace(fmt.Sprintf("%05b", v))
	}

	message = strings.ToUpper(message)
	var arr []string
	for _, char := range message {
		if code, b := table[char]; b {
			arr = append(arr, code)
		}
	}

	ciphered := strings.Join(arr, " ")
	fmt.Printf("Bacon cipher of \\"%s\": \\"%s\\"\\n", message, ciphered)
}`,
  python: `message = "hello world"
aChar = "a"
bChar = "b"

alphabet_index = ord("A")
table = {
    chr(alphabet_index + x): "{0:05b}".format(x).replace("0", aChar).replace("1", bChar)
    for x in range(0, 26)
}

ciphered = " ".join(filter(None, [table.get(x) for x in message.upper()]))

print(f'Bacon cipher of "{message}": "{ciphered}"')`,
  ruby: `message = 'hello world'
a_char = 'a'
b_char = 'b'

alphabet_index = 'A'.ord
table = Hash[(0..26).map do |v|
  [(alphabet_index + v).chr, format('%05b', v).gsub(/[01]/, '0' => a_char, '1' => b_char)]
end]

ciphered = message.upcase.chars.map { |x| table.fetch(x, nil) }.compact.join(' ')

puts "Bacon cipher of \\"#{message}\\": \\"#{ciphered}\\""`,
};

export default function Bacon({ code }: { code: CodeBlockHTML }) {
  const aId = useId();
  const bId = useId();
  const inputId = useId();
  const variantId = useId();

  const ref = useRef<HTMLFormElement>(null);
  useFormFill(ref);

  const doConvert = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      input: { value: string };
      'a-mark': { value: string };
      'b-mark': { value: string };
      mode: { checked: boolean };
      variant: { value: BaconVariant };
    };

    const c = new BaconCipher(
      target.variant.value,
      target[`a-mark`].value,
      target[`b-mark`].value,
    );

    return target.mode.checked
      ? c.encode(target.input.value)
      : c.decode(target.input.value);
  };

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>Bacon Cipher Encoder and Decoder</h1>
      <Area>
        <Tool generateOutput={doConvert} ref={ref}>
          <Row>
            <LabeledElement content="A Mark" htmlFor={aId}>
              <TextArea
                id={aId}
                name="a-mark"
                defaultValue="a"
                spellCheck={false}
                thin
              />
            </LabeledElement>
            <LabeledElement content="B Mark" htmlFor={bId}>
              <TextArea
                id={bId}
                name="b-mark"
                defaultValue="b"
                spellCheck={false}
                thin
              />
            </LabeledElement>
          </Row>
          <LabeledElement content="Variant" htmlFor={variantId}>
            <Select name="variant" id={variantId}>
              <option value="original">Original</option>
              <option value="unique">Unique</option>
            </Select>
          </LabeledElement>
          <ToggleSwitch
            leftContent="Decode"
            rightContent="Encode"
            defaultChecked={true}
            name="mode"
          />
          <LabeledElement content={<strong>Input</strong>}>
            <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
          </LabeledElement>
        </Tool>
        <CodeBlock snippets={code} />
      </Area>
      <h2>The Bacon cipher</h2>
      <main>
        <p>
          The Bacon cipher was devised in 1605 by Francis Bacon. It is a method
          of steganographic message encoding, where the true message is hidden
          inside a seemingly innocuous other message.
        </p>
        <p>
          Each letter in the Latin alphabet is assigned a five digit binary
          string, in which each digit corresponds to either an &apos;a&apos; or
          &apos;b&apos;. There are two versions of the Bacon cipher: the
          original&mdash;in which the letters I, J, U, and V do not have unique
          binary assignments&mdash;and the unique variant, in which every letter
          is assigned a unique binary string.
        </p>
        <p>The code examples above use the unique bacon table.</p>
        <h3>Original Bacon Table</h3>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Letter</th>
                <th>Binary</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>00000</td>
                <td>aaaaa</td>
              </tr>
              <tr>
                <td>B</td>
                <td>00001</td>
                <td>aaaab</td>
              </tr>
              <tr>
                <td>C</td>
                <td>00010</td>
                <td>aaaba</td>
              </tr>
              <tr>
                <td>D</td>
                <td>00011</td>
                <td>aaabb</td>
              </tr>
              <tr>
                <td>E</td>
                <td>00100</td>
                <td>aabaa</td>
              </tr>
              <tr>
                <td>F</td>
                <td>00101</td>
                <td>aabab</td>
              </tr>
              <tr>
                <td>G</td>
                <td>00110</td>
                <td>aabba</td>
              </tr>
              <tr>
                <td>H</td>
                <td>00111</td>
                <td>aabbb</td>
              </tr>
              <tr>
                <td>I</td>
                <td>01000</td>
                <td>abaaa</td>
              </tr>
              <tr>
                <td>J</td>
                <td>01000</td>
                <td>abaaa</td>
              </tr>
              <tr>
                <td>K</td>
                <td>01001</td>
                <td>abaab</td>
              </tr>
              <tr>
                <td>L</td>
                <td>01010</td>
                <td>ababa</td>
              </tr>
              <tr>
                <td>M</td>
                <td>01011</td>
                <td>ababb</td>
              </tr>
            </tbody>
          </Table>
          <Table>
            <thead>
              <tr>
                <th>Letter</th>
                <th>Binary</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>N</td>
                <td>01100</td>
                <td>abbaa</td>
              </tr>
              <tr>
                <td>O</td>
                <td>01101</td>
                <td>abbab</td>
              </tr>
              <tr>
                <td>P</td>
                <td>01110</td>
                <td>abbba</td>
              </tr>
              <tr>
                <td>Q</td>
                <td>01111</td>
                <td>abbbb</td>
              </tr>
              <tr>
                <td>R</td>
                <td>10000</td>
                <td>baaaa</td>
              </tr>
              <tr>
                <td>S</td>
                <td>10001</td>
                <td>baaab</td>
              </tr>
              <tr>
                <td>T</td>
                <td>10010</td>
                <td>baaba</td>
              </tr>
              <tr>
                <td>U</td>
                <td>10011</td>
                <td>baabb</td>
              </tr>
              <tr>
                <td>V</td>
                <td>10011</td>
                <td>baabb</td>
              </tr>
              <tr>
                <td>W</td>
                <td>10100</td>
                <td>babaa</td>
              </tr>
              <tr>
                <td>X</td>
                <td>10101</td>
                <td>babab</td>
              </tr>
              <tr>
                <td>Y</td>
                <td>10110</td>
                <td>babba</td>
              </tr>
              <tr>
                <td>Z</td>
                <td>10111</td>
                <td>babbb</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <h3>Unique Bacon Table</h3>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Letter</th>
                <th>Binary</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>00000</td>
                <td>aaaaa</td>
              </tr>
              <tr>
                <td>B</td>
                <td>00001</td>
                <td>aaaab</td>
              </tr>
              <tr>
                <td>C</td>
                <td>00010</td>
                <td>aaaba</td>
              </tr>
              <tr>
                <td>D</td>
                <td>00011</td>
                <td>aaabb</td>
              </tr>
              <tr>
                <td>E</td>
                <td>00100</td>
                <td>aabaa</td>
              </tr>
              <tr>
                <td>F</td>
                <td>00101</td>
                <td>aabab</td>
              </tr>
              <tr>
                <td>G</td>
                <td>00110</td>
                <td>aabba</td>
              </tr>
              <tr>
                <td>H</td>
                <td>00111</td>
                <td>aabbb</td>
              </tr>
              <tr>
                <td>I</td>
                <td>01000</td>
                <td>abaaa</td>
              </tr>
              <tr>
                <td>J</td>
                <td>01001</td>
                <td>abaab</td>
              </tr>
              <tr>
                <td>K</td>
                <td>01010</td>
                <td>ababa</td>
              </tr>
              <tr>
                <td>L</td>
                <td>01011</td>
                <td>ababb</td>
              </tr>
              <tr>
                <td>M</td>
                <td>01100</td>
                <td>abbaa</td>
              </tr>
            </tbody>
          </Table>
          <Table>
            <thead>
              <tr>
                <th>Letter</th>
                <th>Binary</th>
                <th>Code</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>N</td>
                <td>01101</td>
                <td>abbab</td>
              </tr>
              <tr>
                <td>O</td>
                <td>01110</td>
                <td>abbba</td>
              </tr>
              <tr>
                <td>P</td>
                <td>01111</td>
                <td>abbbb</td>
              </tr>
              <tr>
                <td>Q</td>
                <td>10000</td>
                <td>baaaa</td>
              </tr>
              <tr>
                <td>R</td>
                <td>10001</td>
                <td>baaab</td>
              </tr>
              <tr>
                <td>S</td>
                <td>10010</td>
                <td>baaba</td>
              </tr>
              <tr>
                <td>T</td>
                <td>10011</td>
                <td>baabb</td>
              </tr>
              <tr>
                <td>U</td>
                <td>10100</td>
                <td>baabb</td>
              </tr>
              <tr>
                <td>V</td>
                <td>10101</td>
                <td>babab</td>
              </tr>
              <tr>
                <td>W</td>
                <td>10110</td>
                <td>babba</td>
              </tr>
              <tr>
                <td>X</td>
                <td>10111</td>
                <td>babbb</td>
              </tr>
              <tr>
                <td>Y</td>
                <td>11000</td>
                <td>bbaaa</td>
              </tr>
              <tr>
                <td>Z</td>
                <td>11001</td>
                <td>bbaab</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { code: await highlight(CODE_SNIPPETS) },
  };
}
