import Area from '@/components/Area/area';
import Converter, {
  ConverterProperties,
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import OctalConverter from '@/src/converters/oct';
import { useRouter } from 'next/router';
import Meta, { OpenGraph } from '@/components/Meta/meta';

const title = `Octal to Binary Converter - Cryptools`;
const description = `Octal number to binary converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/oct-to-binary` };

export default function OctToBinary() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new OctalConverter(input);
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
      <h1>Octal to Binary Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="octal"
          initialTo="binary"
          prefixText="0b"
        />
      </Area>
      <h3>Converting Octal to Binary</h3>
      <p>
        Octal is a base 8 numbering system, in which each digit of an octal
        number has 8 possible values, 0-7. Octal is useful in computers when
        representing values that fill three bit multiples. For example, Unix
        file permissions use octal numbering, because the actual binary data
        that represents file permissions are twelve bits long.
      </p>
      <p>
        You can use the provided table to convert each octal digit to its three
        digit binary equivalent.
      </p>
      <h3>Example</h3>
      <p>
        Converting{` `}
        <code>
          72351<sub>8</sub>
        </code>
        {` `}
        to binary:
      </p>
      <p>
        <code>
          72351<sub>8</sub> = 111010011101001<sub>2</sub>
        </code>
      </p>
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
    </>
  );
}
