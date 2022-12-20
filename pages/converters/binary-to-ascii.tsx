import Area from '@/components/Area/area';
import Converter, {
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import BinaryConverter from '@/src/converters/binary';
import { useRouter } from 'next/router';
import Meta, { OpenGraph } from '@/components/Meta/meta';
import Link from '@/components/Link/link';
import ASCIITable from '@/components/ASCIITable/ascii-table';

const title = `Binary to ASCII Converter - Cryptools`;
const description = `Binary number to ASCII/Unicode text converter.`;
const og: OpenGraph = {
  url: `https://cryptools.dev/converters/binary-to-ascii`,
};

export default function BinaryToAscii() {
  const router = useRouter();

  const convert = (input: string): string => {
    if (!input) {
      return ``;
    }

    const dc = new BinaryConverter(input);

    return dc.to(`text`).value;
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
      <h1>Binary to ASCII Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="binary"
          initialTo="text"
          showDelimiter={false}
          showPrefix={false}
        />
      </Area>
      <h2>Converting Binary to ASCII</h2>
      <p>
        Binary is the most basic language of computers. Everything, from simple
        text to full-length movies can be exepressed using binary. Computers use
        binary because it is a base 2 numbering system, in which each digit
        value has a value of one or zero. Thanks to the invention of the
        transistor, computers can represent binary numbers at an electronics
        level. Simple operations are implemented on the CPU and use binary
        values to compute.
      </p>
      <p>
        Computers need a way to represent text. A computer&apos;s representation
        of text is called an <em>encoding</em>. The simplest encoding is ASCII,
        in which it represents each character as a byte (8 digit binary number),
        and thus can encode up to 127 (255 in its extended form) different
        characters.
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
      <p>Converting binary to ASCII:</p>
      <ol>
        <li>
          Each ASCII character is represented by one byte, so pad the binary
          string with zeroes so its length is a multiple of eight.
        </li>
        <li>
          Split the binary string into chunks, with each chunk being eight
          digits long and thus one byte.
        </li>
        <li>
          Working left to right, get the value of each binary byte using an
          ASCII table.
        </li>
        <li>Get the completed message.</li>
      </ol>
      <p>
        Converting{` `}
        <code>
          1100011011011110110010001100101<sub>2</sub>
        </code>
        {` `}
        to ASCII:
      </p>
      <ol>
        <li>
          The binary string is one bit too short of being a multiple of eight.
          Insert a single zero at the beginning of the value.
          <ul>
            <li>
              <code>
                01100011011011110110010001100101<sub>2</sub>
              </code>
            </li>
          </ul>
        </li>
        <li>
          Split the string into byte chunks.
          <ul>
            <li>
              <code>
                01100011<sub>2</sub> 01101111<sub>2</sub> 01100100<sub>2</sub>
                {` `}
                01100101<sub>2</sub>
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
      <p>Pretty simple, huh?</p>
      <h3>ASCII Table</h3>
      <ASCIITable />
    </>
  );
}
