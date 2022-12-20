import Area from '@/components/Area/area';
import Converter, {
  ConverterProperties,
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import BinaryConverter from '@/src/converters/binary';
import { useRouter } from 'next/router';
import Row from '@/components/Row/row';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `Binary to Hexadecimal Converter - Cryptools`;
const description = `Binary number to hexadecimal converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/binary-to-hex` };

export default function DecToHex() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new BinaryConverter(input);
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
      <h1>Binary to Hex Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="binary"
          initialTo="hexadecimal"
        />
      </Area>
      <h2>Converting Binary to Hexadecimal</h2>
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
        Binary numbers are <em>long</em>, though. You need at least eight binary
        digits to represent a single character. This is where hexadecimal is
        useful, as it can represent an eight-digit binary number (more commonly
        referred to as a byte) using a two-digit hexadecimal number.
      </p>
      <p>
        The process of converting from binary to hexadecimal using grouping is
        fairly simple. Each group of four binary digits corresponds to a single
        hexadecimal digit.
      </p>
      <ol>
        <li>
          Start with a given binary number, and pad it on the left with zeroes
          until its length is a multiple of four.
        </li>
        <li>
          Split up the binary number, starting from the right, into equally
          sized four digit chunks.
        </li>
        <li>
          Working from the right, convert each group into a single hexadecimal
          character using the table.
        </li>
      </ol>
      <h3>Example</h3>
      <p>
        Converting{` `}
        <code>
          101111010<sub>2</sub>
        </code>
        {` `}
        to hexadecimal:
      </p>
      <p>
        <code>
          101111010<sub>2</sub> = 000101111010<sub>2</sub>
        </code>
      </p>
      <ol>
        <li>
          First chunk:{` `}
          <code>
            1010<sub>2</sub> = A<sub>16</sub>
          </code>
        </li>
        <li>
          Second chunk:{` `}
          <code>
            0111<sub>2</sub> = 7<sub>16</sub>
          </code>
        </li>
        <li>
          Third chunk:{` `}
          <code>
            0001<sub>2</sub> = 1<sub>16</sub>
          </code>
        </li>
      </ol>
      <p>
        Thus,{` `}
        <code>
          101111010<sub>2</sub> = 17A<sub>16</sub>
        </code>
      </p>
      <h3>Conversion table</h3>
      <Row>
        <table>
          <thead>
            <tr>
              <th>Binary</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0000</td>
              <td>0</td>
            </tr>
            <tr>
              <td>0001</td>
              <td>1</td>
            </tr>
            <tr>
              <td>0010</td>
              <td>2</td>
            </tr>
            <tr>
              <td>0011</td>
              <td>3</td>
            </tr>
            <tr>
              <td>0100</td>
              <td>4</td>
            </tr>
            <tr>
              <td>0101</td>
              <td>5</td>
            </tr>
            <tr>
              <td>0110</td>
              <td>6</td>
            </tr>
            <tr>
              <td>0111</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Binary</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1000</td>
              <td>8</td>
            </tr>
            <tr>
              <td>1001</td>
              <td>9</td>
            </tr>
            <tr>
              <td>1010</td>
              <td>A</td>
            </tr>
            <tr>
              <td>1011</td>
              <td>B</td>
            </tr>
            <tr>
              <td>1100</td>
              <td>C</td>
            </tr>
            <tr>
              <td>1101</td>
              <td>D</td>
            </tr>
            <tr>
              <td>1110</td>
              <td>E</td>
            </tr>
            <tr>
              <td>1111</td>
              <td>F</td>
            </tr>
          </tbody>
        </table>
      </Row>
    </>
  );
}
