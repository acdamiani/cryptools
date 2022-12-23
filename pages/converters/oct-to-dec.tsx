import Area from '@/components/Area/area';
import Converter, {
  ConverterProperties,
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import OctalConverter from '@/src/converters/oct';
import { useRouter } from 'next/router';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `Octal to Decimal Converter - Cryptools`;
const description = `Octal number to decimal converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/oct-to-dec` };

export default function DecToHex() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new OctalConverter(input);
    const del = props.delimiter ?? ``;

    return dc.to(`dec`).delimit(del);
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
      <h1>Octal to Decimal Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="octal"
          initialTo="decimal"
          showPrefix={false}
        />
      </Area>
      <h3>Converting Octal to Hexadecimal</h3>
      <p>
        Octal is a base 8 numbering system, in which each digit of an octal
        number has 8 possible values, 0-7. Octal is useful in computers when
        representing values that fill three bit multiples. For example, Unix
        file permissions use octal numbering, because the actual binary data
        that represents file permissions are twelve bits long.
      </p>
      <p>
        A traditional decimal number is the sum of digits multiplied by powers
        of ten. Octal is the same, but with powers of eight.
      </p>
      <h3>Example</h3>
      <p>
        Converting{` `}
        <code>
          72351<sub>8</sub>
        </code>
        {` `}
        to hexadecimal:
      </p>
      <p>
        <code>
          72351<sub>8</sub> = 7×8<sup>4</sup>+2×8<sup>3</sup>+3×8
          <sup>2</sup>+5×8<sup>1</sup>+1×8<sup>0</sup> = 29929<sub>10</sub>
        </code>
      </p>
    </>
  );
}
