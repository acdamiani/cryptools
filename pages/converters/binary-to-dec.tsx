import Area from '@/components/Area/area';
import Converter, {
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import BinaryConverter from '@/src/converters/binary';
import { useRouter } from 'next/router';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `Binary to Decimal Converter - Cryptools`;
const description = `Binary number to decimal converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/binary-to-dec` };

export default function BinaryToDec() {
  const router = useRouter();

  const convert = (input: string): string => {
    if (!input) {
      return ``;
    }

    const dc = new BinaryConverter(input);

    return dc.to(`dec`).value;
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
      <h1>Binary to Decimal Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="binary"
          initialTo="decimal"
          showDelimiter={false}
          showPrefix={false}
        />
      </Area>
      <h2>Converting Binary to Decimal</h2>
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
        Unless you are a computer, chances are good that you don&apos;t think in
        binary. We need a way to convert from binary to decimal and back again.
        Fortunately, the process for converting binary to decimal (base 10) is
        pretty simple!
      </p>
      <p>
        Each binary digit corresponds to a power of two, in ascending order. The
        first digit is 2<sup>0</sup>, the second 2<sup>1</sup>, and so on. If
        the corresponding binary digit has a value of one, add the power of two
        to your final result. Continue to the left until you have no more digits
        left.
      </p>
      <h3>Example</h3>
      <p>
        Converting{` `}
        <code>
          101111010<sub>2</sub>
        </code>
        {` `}
        to decimal:
      </p>
      <p>
        Thus,{` `}
        <code>
          101111010<sub>2</sub> = 572<sub>8</sub>
        </code>
      </p>
    </>
  );
}
