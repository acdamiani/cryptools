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

const title = `ASCII to Decimal Converter - Cryptools`;
const description = `ASCII/Unicode text to decimal converter.`;
const og: OpenGraph = {
  url: `https://cryptools.dev/converters/ascii-to-dec`,
};

export default function AsciiToDec() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new TextConverter(input);
    const del = props.delimiter ?? ``;

    let ret = dc.to(`dec`).delimit(del);

    if (props.prefix) {
      ret = `0x` + del + ret;
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
      <h1>ASCII to Decimal Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="text"
          initialTo="decimal"
          showPrefix={false}
          showDelimiter={false}
        />
      </Area>
      <h2>Converting ASCII to Decimal</h2>
      <p>
        ASCII is one of the oldest character encodings, allowing for computerse
        to represent binary numbers as text. Due to hardware limitations at the
        time of its inception, ASCII has only 128 code points, and only 95 of
        them are printable characters. For this reason, most modern computers
        use UTF-8, which represents the millions of code points covered by
        Unicode. However, UTF-8 has the same first 128 code points as ASCII,
        making UTF-8 an ASCII superset.
      </p>
      <p>The steps to convert an ASCII character to decimal are as follows:</p>
      <ol>
        <li>Obtain the character that you want to convert</li>
        <li>Find its corresponding decimal character using an ASCII table</li>
        <li>Repeat for any other characters</li>
      </ol>
      <p>An ASCII table is provided below for your convenience.</p>
      <h3>Example: Encoding the letter &quot;A&quot; into decimal</h3>
      <p>Using the ASCII table, the conversion is as follows:</p>
      <p>
        <code>
          &quot;A&quot; = 65<sub>10</sub>
        </code>
      </p>
      <h3>Alternate Encodings</h3>
      <p>
        ASCII is not the only encoding type used today. In its non-extended
        form, it only has the capability to represent 128 basic characters. To
        combat this, the UTF-8 encoding was created, capable of representing all
        1,112,064 valid Unicode characters. Other, less popular encodings have
        been created, primarily for the purpose of better representing other
        script types, or as proprietary encodings for specific machines. This
        converter uses the UTF-8 encoding.
      </p>
      <h3>ASCII Table</h3>
      <ASCIITable />
    </>
  );
}
