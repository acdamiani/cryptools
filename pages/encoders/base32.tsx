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
import Link from '@/components/Link/link';
import Table from '@/components/Table/table';
import Row from '@/components/Row/row';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `Base32 Encode and Decode Online - Cryptools`;
const description = `Online Base32 encoder and decoder, with C#, Python, Javascript, Ruby, and Go code samples.`;
const og: OpenGraph = { url: `https://cryptools.dev/encoders/base32` };

const CODE_SNIPPETS: CodeBlockHTML = {
  javascript: `// Using the [base32](https://www.npmjs.com/package/base32) library
const base32 = require("base32");

const encoded = base32.encode(message);
const decoded = base32.decode(encoded);

console.log(\`Base32 encoding of \${message}: \${encoded}\`);
console.log(\`Base32 decoding of \${encoded}: \${decoded}\`);`,
  csharp: `using System;
using System.Text;
// Using [SimpleBase](https://www.nuget.org/packages/SimpleBase/) NuGet package
using SimpleBase;

string message = "Hello World";

string encoded = Base32.Rfc4648.Encode(Encoding.UTF8.GetBytes(message), padding: true);
string decoded = Encoding.UTF8.GetString(Base32.Rfc4648.Decode(encoded));

Console.WriteLine($"Base32 encoding of {message}: {encoded}");
Console.WriteLine($"Base32 decoding of {encoded}: {decoded}");`,
  go: `package main

import (
	"encoding/base32"
	"fmt"
)

func main() {
	message := "Hello World"

	encoded := base32.StdEncoding.EncodeToString([]byte(message))
	decoded, _ := base32.StdEncoding.DecodeString(encoded)

	fmt.Printf("Base32 encoding of %s: %s\n", message, encoded)
	fmt.Printf("Base32 decoding of %s: %s\n", encoded, string(decoded))
}`,
  ruby: `# Using [base32](https://github.com/stesla/base32) (RFC 3548)
require 'base32'

message = 'Hello World'

encoded = Base32.encode(message)
decoded = Base32.decode(encoded)

puts "Base32 encoding of #{message}: #{encoded}"
puts "Base32 decoding of #{encoded}: #{decoded}"`,
  python: `import base64

message = "Hello World"

encoded = base64.b32encode(message.encode("utf-8")).decode("utf-8")
decoded = base64.b32decode(encoded).decode("utf-8")

print(f"Base32 encoding of {message}: {encoded}")
print(f"Base32 deocding of {encoded}: {decoded}")`,
};

export default function Base32({ code }: { code: CodeBlockHTML }) {
  const variantId = useId();

  return (
    <>
      <Meta title={title} description={description} og={og} />
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
      <main>
        <h2>The Base32 encoding</h2>
        <p>
          Base32 is an encoding comprised of 32 separate characters. Generally,
          Base32 represents byte strings, in the same way that hexadecimal
          might. Base32 has a number of advantages as an encoding. For one, it
          is much more space efficient than hexadecimal, taking up about 20% of
          the space that hexadecimal might.
        </p>
        <p>It also:</p>
        <ul>
          <li>
            is entirely one case, making dictation over the phone or human
            memory easier
          </li>
          <li>
            can be written into a URL without{` `}
            <Link href="/encoders/url">percent-encoding</Link>
          </li>
          <li>can be a filename</li>
          <li>
            often omits easily confusable character pairs (1 & I, 0 & O, 8 & B)
            {` `}
          </li>
        </ul>
        <p>
          This makes Base32 a great choice when raw data needs to be passed
          between people. However, its cousin,{` `}
          <Link href="/encoders/base64">Base64</Link>, is more effective when
          arbitrary data needs to be represented using a limited character set
          because of its efficient use of space.
        </p>
        <h3>Padding & the alphabet</h3>
        <p>
          In some Base32 implementations, a padding character is provisioned to
          ensure that the Base32 string is the correct length. However, padding
          is omitted in other implementations since it can often be inferred
          from the source string.
        </p>
        <p>
          A Base32 alphabet uses a set of 32 digits to represent 5 bit values (2
          <sup>5</sup>). An alphabet can be designed to maximize performance and
          readability, ensure cohesion with other systems, or be otherwise
          tailored for a specific use case. Pictured below is the original RFC
          4648 Base32 alphabet, though other popular alphabets include{` `}
          <Link href="?variant=z-base-32&input=z-base-32">z-base-32</Link>,{` `}
          <Link href="?variant=crockford-base32&input=Crockford%27s%20Base32">
            Crockford&apos;s Base32
          </Link>
          , and <Link href="?variant=base32hex&input=Base32hex">base32hex</Link>
          .
        </p>
        <Row>
          <Table>
            <caption>Base32 alphabet defined by RFC 4648</caption>
            <thead>
              <tr>
                <th>Value</th>
                <th>Mark</th>
                <th />
                <th>Value</th>
                <th>Mark</th>
                <th />
                <th>Value</th>
                <th>Mark</th>
                <th />
                <th>Value</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>A</td>
                <td rowSpan={8} />
                <td>8</td>
                <td>I</td>
                <td rowSpan={8} />
                <td>16</td>
                <td>Q</td>
                <td rowSpan={8} />
                <td>24</td>
                <td>Y</td>
              </tr>
              <tr>
                <td>1</td>
                <td>B</td>
                <td>9</td>
                <td>J</td>
                <td>17</td>
                <td>R</td>
                <td>25</td>
                <td>Z</td>
              </tr>
              <tr>
                <td>2</td>
                <td>C</td>
                <td>10</td>
                <td>K</td>
                <td>18</td>
                <td>S</td>
                <td>26</td>
                <td>2</td>
              </tr>
              <tr>
                <td>3</td>
                <td>D</td>
                <td>11</td>
                <td>L</td>
                <td>19</td>
                <td>T</td>
                <td>27</td>
                <td>3</td>
              </tr>
              <tr>
                <td>4</td>
                <td>E</td>
                <td>12</td>
                <td>M</td>
                <td>20</td>
                <td>U</td>
                <td>28</td>
                <td>4</td>
              </tr>
              <tr>
                <td>5</td>
                <td>F</td>
                <td>13</td>
                <td>N</td>
                <td>21</td>
                <td>V</td>
                <td>29</td>
                <td>5</td>
              </tr>
              <tr>
                <td>6</td>
                <td>G</td>
                <td>14</td>
                <td>O</td>
                <td>22</td>
                <td>W</td>
                <td>30</td>
                <td>6</td>
              </tr>
              <tr>
                <td>7</td>
                <td>H</td>
                <td>15</td>
                <td>P</td>
                <td>23</td>
                <td>X</td>
                <td>31</td>
                <td>7</td>
              </tr>
              <tr>
                <td>padding</td>
                <td>=</td>
                <td colSpan={10} />
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
