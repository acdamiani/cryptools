import Area from '@/components/Area/area';
import Converter, {
  ConverterProperties,
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import TextConverter from '@/src/converters/text';
import { useRouter } from 'next/router';
import ASCIITable from '@/components/ASCIITable/ascii-table';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `ASCII to Binary Converter - Cryptools`;
const description = `ASCII/Unicode text to binary converter.`;
const og: OpenGraph = {
  url: `https://cryptools.dev/converters/ascii-to-binary`,
};

export default function AsciiToBinary() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new TextConverter(input);
    const del = props.delimiter ?? ``;

    let ret = dc.to(`binary`).delimit(del);

    if (props.prefix) {
      ret = `0b` + del + ret;
    }

    return ret;
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
      <h1>ASCII to Binary Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="text"
          initialTo="binary"
          prefixText="0b"
        />
      </Area>
      <main>
        <h2>Converting ASCII to Binary</h2>
        <p>
          ASCII is one of the oldest character encodings, allowing for computers
          to represent binary numbers as text. Due to hardware limitations at
          the time of its inception, ASCII has only 128 code points, and only 95
          of them are printable characters. For this reason, most modern
          computers use UTF-8, which represents the millions of code points
          covered by Unicode. However, UTF-8 has the same first 128 code points
          as ASCII, making UTF-8 an ASCII superset.
        </p>
        <p>
          The steps to convert an ASCII character to a binary string are as
          follows:
        </p>
        <ol>
          <li>Obtain the character that you want to convert</li>
          <li>Find its corresponding decimal character using an ASCII table</li>
          <li>Convert the decimal number to a 8 digit binary number</li>
          <li>Repeat for any other characters</li>
        </ol>
        <p>An ASCII table is provided below for your convenience.</p>
        <h3>Example: Encoding the letter &quot;A&quot; into binary</h3>
        <p>Using the ASCII table, the conversion is as follows:</p>
        <p>
          <code>
            &quot;A&quot; = 65<sub>10</sub> = 1×64+1 = 0×2<sup>7</sup>+1×2
            <sup>6</sup>+0×2
            <sup>5</sup>+0×2
            <sup>4</sup>+0×2
            <sup>3</sup>+0×2
            <sup>2</sup>+0×2
            <sup>1</sup>+1×2
            <sup>0</sup> = 01000001<sub>2</sub>
          </code>
        </p>
        <h3>Alternate Encodings</h3>
        <p>
          ASCII is not the only encoding type used today. In its non-extended
          form, it only has the capability to represent 128 basic characters. To
          combat this, the UTF-8 encoding was created, capable of representing
          all 1,112,064 valid Unicode characters. Other, less popular encodings
          have been created, primarily for the purpose of better representing
          other script types, or as proprietary encodings for specific machines.
          This converter uses the UTF-8 encoding.
        </p>
        <h3>ASCII Table</h3>
        <ASCIITable />
      </main>
    </>
  );
}
