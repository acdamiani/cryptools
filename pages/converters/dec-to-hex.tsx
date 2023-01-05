import Area from '@/components/Area/area';
import Converter, {
  ConverterProperties,
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import DecimalConverter from '@/src/converters/dec';
import { useRouter } from 'next/router';
import Meta, { OpenGraph } from '@/components/Meta/meta';
import Table from '@/components/Table/table';

const title = `Decimal to Hexadecimal Converter - Cryptools`;
const description = `Decimal number to hexadecimal converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/dec-to-hex` };

export default function DecToHex() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new DecimalConverter(input);
    const del = props.delimiter ?? ``;

    let ret = dc.to(`hex`).delimit(del);

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
      <h1>Decimal to Hex Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="decimal"
          initialTo="hexadecimal"
        />
      </Area>
      <h2>Converting Decimal to Hexadecimal</h2>
      <p>
        Decimal and Hexadecimal are two ways to write numbers. In general, we
        use decimal numbers&mdash;also refered to as base 10&mdash;in our
        everyday lives. That means that there are 10 possible values (0-9) for
        each digit represented by a base 10 number. Hexadecimal is written base
        16, which gives 16 possible values per digit (0-9, A-F). Hexadecimal is
        widely used in computer applications because it can perfectly represent
        a single byte using two digits. Large decimal numbers are also shorter
        when writing them using hexadecimal, which makes it useful for computer
        code where succinctness is emphasized.
      </p>
      <p>
        The conversion between base 10 and base 16 is not terribly complex. The
        process is the same for converting to any other base.
      </p>
      <ol>
        <li>Divide the original decimal number by the new base value.</li>
        <li>
          The remainder of the division operation is the value of the first
          digit of the converted number.
        </li>
        <li>
          Divide the quotient of the division operation by the base value.
        </li>
        <li>
          The remainder from Step 3 will be the next digit (to the left) of the
          base number.
        </li>
      </ol>
      <h3>Example</h3>
      <p>
        The below is the representation of the conversion operation of{` `}
        <code>
          2348<sub>10</sub>
        </code>
        {` `}
        to hexadecimal using the above steps.
      </p>
      <Table>
        <thead>
          <tr>
            <th>Division</th>
            <th>Quotient</th>
            <th>Remainder</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2348 / 16</td>
            <td>146</td>
            <td>12 (C)</td>
          </tr>
          <tr>
            <td>146 / 16</td>
            <td>9</td>
            <td>2 (2)</td>
          </tr>
          <tr>
            <td>9 / 16</td>
            <td>0</td>
            <td>9 (9)</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Thus, the hexadecimal value of{` `}
        <code>
          2348<sub>10</sub>
        </code>
        {` `}
        is{` `}
        <code>
          92C<sub>16</sub>
        </code>
        .
      </p>
    </>
  );
}
