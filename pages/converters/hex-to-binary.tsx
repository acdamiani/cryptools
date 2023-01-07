import Area from '@/components/Area/area';
import Converter, {
  ConverterProperties,
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import HexadecimalConverter from '@/src/converters/hex';
import { useRouter } from 'next/router';
import Meta, { OpenGraph } from '@/components/Meta/meta';
import Table from '@/components/Table/table';

const title = `Hexadecimal to Binary Converter - Cryptools`;
const description = `Hexadecimal number to binary converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/hex-to-binary` };

export default function BinaryToOct() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new HexadecimalConverter(input);
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
      <h1>Hex to Binary Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="hexadecimal"
          initialTo="binary"
          prefixText="0b"
        />
      </Area>
      <h2>Converting Hexadecimal to Binary</h2>
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
        Binary is very easily translated from hexadecimal, since four binary
        digits correspond to a single hexadecimal digit. Use the provided table
        to convert each hexadecimal digit into its binary equivalent.
      </p>
      <h3>Example</h3>
      <p>
        Converting{` `}
        <code>
          f0a183b<sub>16</sub>
        </code>
        {` `}
        to binary:
      </p>
      <p>
        <code>
          f0a183b<sub>16</sub> = 1111000010100001100000111011<sub>2</sub>
        </code>
      </p>
      <h3>Conversion Table</h3>
      <Table>
        <thead>
          <tr>
            <th>Binary</th>
            <th>Hex</th>
            <th />
            <th>Binary</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0000</td>
            <td>0</td>
            <td rowSpan={8} />
            <td>1000</td>
            <td>8</td>
          </tr>
          <tr>
            <td>0001</td>
            <td>1</td>
            <td>1001</td>
            <td>9</td>
          </tr>
          <tr>
            <td>0010</td>
            <td>2</td>
            <td>1010</td>
            <td>A</td>
          </tr>
          <tr>
            <td>0011</td>
            <td>3</td>
            <td>1011</td>
            <td>B</td>
          </tr>
          <tr>
            <td>0100</td>
            <td>4</td>
            <td>1100</td>
            <td>C</td>
          </tr>
          <tr>
            <td>0101</td>
            <td>5</td>
            <td>1101</td>
            <td>D</td>
          </tr>
          <tr>
            <td>0110</td>
            <td>6</td>
            <td>1110</td>
            <td>E</td>
          </tr>
          <tr>
            <td>0111</td>
            <td>7</td>
            <td>1111</td>
            <td>F</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
