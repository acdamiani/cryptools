import Area from '@/components/Area/area';
import Converter, {
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import HexadecimalConverter from '@/src/converters/hex';
import { useRouter } from 'next/router';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `Hexadecimal to Decimal Converter - Cryptools`;
const description = `Hexadecimal number to decimal converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/hex-to-dec` };

export default function HexToDec() {
  const router = useRouter();

  const convert = (input: string): string => {
    if (!input) {
      return ``;
    }

    const dc = new HexadecimalConverter(input);

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
      <h1>Hex to Decimal Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="hexadecimal"
          initialTo="decimal"
        />
      </Area>
      <h2>Converting Hexadecimal to Decimal</h2>
      <p>
        Hexadecimal is a base 16 numbering system, in which each digit of a
        number are represented by 16 possible characters. These chracters are
        0-9 and A-F. Hexadecimal is widely used when representing binary
        numbers, as they can perfectly represent a byte using only two digits.
      </p>
      <p>
        Hexadecimal is an excellent way to represent large decimal numbers as
        you need less digits to represent the same number. For a classic 32 bit
        integer, you only need 8 hex digits to represent the maximum value, as
        opposed to the 11 required when using classical base 10 representations.
        Even numbers are nice!
      </p>
      <p>
        A traditional decimal number is the sum of digits multiplied by powers
        of ten. Hexadecimal is the same, but with powers of sixteen.
      </p>
      <h3>Example</h3>
      <p>
        Converting{` `}
        <code>
          f0a183b<sub>16</sub>
        </code>
        {` `}
        to decimal:
      </p>
      <p>
        <code>
          f0a183b<sub>16</sub> = 15×16<sup>6</sup>+0×16<sup>5</sup>+10×16
          <sup>4</sup>+1×16<sup>3</sup>+8×16<sup>2</sup>+3×16<sup>1</sup>+11×16
          <sup>0</sup>
        </code>
      </p>
      <p>
        Thus,{` `}
        <code>
          f0a183b<sub>16</sub> = 252319979<sub>10</sub>
        </code>
      </p>
    </>
  );
}
