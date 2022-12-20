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

const title = `Binary to Octal Converter - Cryptools`;
const description = `Binary number to octal converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/binary-to-oct` };

export default function BinaryToOct() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new BinaryConverter(input);
    const del = props.delimiter ?? ``;

    let ret = dc.to(`oct`).delimit(del);

    if (props.prefix) {
      ret = `0o` + del + ret;
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
      <h1>Binary to Octal Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="binary"
          initialTo="octal"
          prefixText="0o"
        />
      </Area>
      <h2>Converting Binary to Octal</h2>
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
        digits to represent a single character. This is where octal is useful,
        as it can represent an 3-digit binary number using a single octal value.
        This comes in handy when dealing with integers that are multiples of
        three bits wide. For example, Unix file permissions are represented by
        12 bits, making octal a good choice for writing them.
      </p>
      <p>
        The process of converting from binary to octal using grouping is fairly
        simple. Each group of three binary digits corresponds to a single octal
        digit.
      </p>
      <ol>
        <li>
          Start with a given binary number, and pad it on the left with zeroes
          until its length is a multiple of three.
        </li>
        <li>
          Split up the binary number, starting from the right, into equally
          sized three digit chunks.
        </li>
        <li>
          Working from the right, convert each group into a single octal
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
        to octal:
      </p>
      <ol>
        <li>
          First chunk:{` `}
          <code>
            010<sub>2</sub> = 2<sub>8</sub>
          </code>
        </li>
        <li>
          Second chunk:{` `}
          <code>
            111<sub>2</sub> = 7<sub>8</sub>
          </code>
        </li>
        <li>
          Third chunk:{` `}
          <code>
            101<sub>2</sub> = 5<sub>8</sub>
          </code>
        </li>
      </ol>
      <p>
        Thus,{` `}
        <code>
          101111010<sub>2</sub> = 572<sub>8</sub>
        </code>
      </p>
      <h3>Conversion table</h3>
      <Row>
        <table>
          <thead>
            <tr>
              <th>Binary</th>
              <th>Oct</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>000</td>
              <td>0</td>
            </tr>
            <tr>
              <td>001</td>
              <td>1</td>
            </tr>
            <tr>
              <td>010</td>
              <td>2</td>
            </tr>
            <tr>
              <td>011</td>
              <td>3</td>
            </tr>
            <tr>
              <td>100</td>
              <td>4</td>
            </tr>
            <tr>
              <td>101</td>
              <td>5</td>
            </tr>
            <tr>
              <td>110</td>
              <td>6</td>
            </tr>
            <tr>
              <td>111</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>
      </Row>
    </>
  );
}
