import Area from '@/components/Area/area';
import Converter, {
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import HexadecimalConverter from '@/src/converters/hex';
import { useRouter } from 'next/router';
import Meta, { OpenGraph } from '@/components/Meta/meta';
import ASCIITable from '@/components/ASCIITable/ascii-table';
import Link from '@/components/Link/link';

const title = `Hexadecimal to ASCII Converter - Cryptools`;
const description = `Hexadecimal to ASCII/Unicode text converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/hex-to-ascii` };

export default function BinaryToAscii() {
  const router = useRouter();

  const convert = (input: string): string => {
    if (!input) {
      return ``;
    }

    const hx = new HexadecimalConverter(input);

    return hx.to(`text`).value;
  };

  const navigate = (from: SelectOptions, to: SelectOptions): void => {
    const url = `/converters/${SelectAbbr[from]}-to-${SelectAbbr[to]}`;

    if (router.pathname === url) {
      return;
    }

    router.push(url);
  };

  return (
    <>
      <Meta title={title} description={description} og={og} />
      <h1>Hex to ASCII Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="hexadecimal"
          initialTo="text"
          showDelimiter={false}
          showPrefix={false}
        />
      </Area>
      <h2>Converting Hexadecimal to ASCII</h2>
      <p>
        Hexadecimal is a base 16 numbering system, in which each digit of a
        number are represented by 16 possible characters. These chracters are
        0-9 and A-F. Hexadecimal is widely used when representing binary
        numbers, as they can perfectly represent a byte using only two digits.
      </p>
      <p>
        Computers need a way to represent text. A computer&apos;s representation
        of text is called an <em>encoding</em>. The simplest encoding is ASCII,
        in which it represents each character as a byte (8 digit binary number),
        and thus can encode up to 127 (255 in its extended form) different
        characters.
      </p>
      <p>
        This makes hexadecimal a perfect representation of ASCII text, as the
        encoding calls for a single byte to be delegated for each character. By
        using a simple table, you can use hexadecimal to represent any ASCII
        character.
      </p>
      <p>
        However, ASCII does not cover{` `}
        <Link href="https://en.wikipedia.org/wiki/Unicode">Unicode</Link>
        {` `}
        characters, which include emojis and other non-latin characters. UTF-8
        was created for this reason, and is the most common encoding type used
        today, supporting over one million Unicode code points. UTF-8 is used by
        the converter here to convert binary to Unicode. Unfortunately, its
        encoding and decoding process is complex enough that it cannot be
        covered here, so we&apos;ll stick to the basic 127 ASCII characters.
      </p>
      <p>Converting hexadecimal to ASCII:</p>
      <ol>
        <li>
          Each ASCII character is represented by one byte, so pad the
          hexadecimal string with zeroes so its length is a multiple of two.
        </li>
        <li>
          Split the hexadecimal string into chunks, with each chunk being two
          digits long and thus one byte.
        </li>
        <li>
          Working left to right, get the value of each hexadecimal byte using an
          ASCII table.
        </li>
        <li>Get the completed message.</li>
      </ol>
      <h3>Example</h3>
      <p>
        Converting{` `}
        <code>
          636f6465<sub>16</sub>
        </code>
        {` `}
        to ASCII:
      </p>
      <ol>
        <li>The hexadecimal string is already the correct length.</li>
        <li>
          Split the string into byte chunks.
          <ul>
            <li>
              <code>
                63<sub>16</sub> 6f<sub>16</sub> 64<sub>16</sub>
                {` `}
                65<sub>16</sub>
              </code>
            </li>
          </ul>
        </li>
        <li>
          Working left to right, decode using the table.{` `}
          <ul>
            <li>
              <code>code</code>
            </li>
          </ul>
        </li>
      </ol>
      <h3>ASCII Table</h3>
      <ASCIITable />
    </>
  );
}
