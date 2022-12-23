import Area from '@/components/Area/area';
import Converter, {
  ConverterProperties,
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import OctalConverter from '@/src/converters/oct';
import { useRouter } from 'next/router';
import Row from '@/components/Row/row';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `Octal to Hexadecimal Converter - Cryptools`;
const description = `Octal number to hexadecimal converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/oct-to-hex` };

export default function DecToHex() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new OctalConverter(input);
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
      <h1>Octal to Hex Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="octal"
          initialTo="hexadecimal"
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
        Should you find yourself needing to convert from the less common octal
        form to its hexadecimal equivalent, convert the octal number to binary,
        and then simply convert from the binary number to get a hexadecimal one.
        Use the table below to help you do this.
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
          72351<sub>8</sub> = 111010011101001<sub>2</sub>
        </code>
      </p>
      <p>
        <code>
          111010011101001<sub>2</sub> = 74e9
          <sub>16</sub>
        </code>
      </p>
      <p>
        Thus,{` `}
        <code>
          72351<sub>8</sub> = 74e9<sub>16</sub>
        </code>
      </p>
      <Row>
        <table>
          <thead>
            <tr>
              <th>Oct</th>
              <th>Binary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>001</td>
            </tr>
            <tr>
              <td>2</td>
              <td>010</td>
            </tr>
            <tr>
              <td>3</td>
              <td>011</td>
            </tr>
            <tr>
              <td>4</td>
              <td>100</td>
            </tr>
            <tr>
              <td>5</td>
              <td>101</td>
            </tr>
            <tr>
              <td>6</td>
              <td>110</td>
            </tr>
            <tr>
              <td>7</td>
              <td>111</td>
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
