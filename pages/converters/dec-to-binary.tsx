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

const title = `Decimal to Binary Converter - Cryptools`;
const description = `Decimal number to binary converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/dec-to-binary` };

export default function DecToHex() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new DecimalConverter(input);
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
      <h1>Decimal to Binary Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="decimal"
          initialTo="binary"
          prefixText="0b"
        />
      </Area>
      <h2>Converting Decimal to Binary</h2>
      <p>
        Decimal and Binary are two ways to write numbers. In general, we use
        decimal numbers&mdash;also refered to as base 10&mdash;in our everyday
        lives. That means that there are 10 possible values (0-9) for each digit
        represented by a base 10 number. Binary is written base 2, which gives
        only 2 possible values per digit (0 or 1). Binary numbers are the
        language of computers, since they only understand two values
        fundamentally: a 1 or a 0. You can represent anything to a computer with
        just these two values, including numbers.
      </p>
      <p>
        The conversion between base 10 and base 2 is not terribly complex. The
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
        to binary using the above steps.
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
            <td>2348 / 2</td>
            <td>1174</td>
            <td>0 (0)</td>
          </tr>
          <tr>
            <td>1174 / 2</td>
            <td>587</td>
            <td>0 (0)</td>
          </tr>
          <tr>
            <td>587 / 2</td>
            <td>293</td>
            <td>1 (1)</td>
          </tr>
          <tr>
            <td>293 / 2</td>
            <td>146</td>
            <td>1 (1)</td>
          </tr>
          <tr>
            <td>146 / 2</td>
            <td>73</td>
            <td>0 (0)</td>
          </tr>
          <tr>
            <td>73 / 2</td>
            <td>36</td>
            <td>1 (1)</td>
          </tr>
          <tr>
            <td>36 / 2</td>
            <td>18</td>
            <td>0 (0)</td>
          </tr>
          <tr>
            <td>18 / 2</td>
            <td>9</td>
            <td>0 (0)</td>
          </tr>
          <tr>
            <td>9 / 2</td>
            <td>4</td>
            <td>1 (1)</td>
          </tr>
          <tr>
            <td>4 / 2</td>
            <td>2</td>
            <td>0 (0)</td>
          </tr>
          <tr>
            <td>2 / 2</td>
            <td>1</td>
            <td>0 (0)</td>
          </tr>
          <tr>
            <td>1 / 2</td>
            <td>0</td>
            <td>1 (1)</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Thus, the binary value of{` `}
        <code>
          2348<sub>10</sub>
        </code>
        {` `}
        is{` `}
        <code>
          100100101100<sub>2</sub>
        </code>
        .
      </p>
    </>
  );
}
