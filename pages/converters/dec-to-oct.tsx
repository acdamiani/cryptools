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

const title = `Decimal to Octal Converter - Cryptools`;
const description = `Decimal number to octal converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/dec-to-oct` };

export default function DecToHex() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new DecimalConverter(input);
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
      <h1>Decimal to Octal Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="decimal"
          initialTo="octal"
          prefixText="0o"
        />
      </Area>
      <h2>Converting Decimal to Octal</h2>
      <p>
        Decimal and Octal are two ways to write numbers. In general, we use
        decimal numbers&mdash;also refered to as base 10&mdash;in our everyday
        lives. That means that there are 10 possible values (0-9) for each digit
        represented by a base 10 number. Octal is written base 8, which gives 8
        possible values per digit (0-7). Octal, while still less popular than
        decimal and hexadecimal number representations, are still used in
        computer applications. For example, Unix uses octal numbers to denote
        file permissions, as they are 12 bits wide.
      </p>
      <p>
        The conversion between base 10 and base 8 is not terribly complex. The
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
        to octal using the above steps.
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
            <td>2348 / 8</td>
            <td>293</td>
            <td>4 (4)</td>
          </tr>
          <tr>
            <td>293 / 8</td>
            <td>36</td>
            <td>5 (5)</td>
          </tr>
          <tr>
            <td>36 / 8</td>
            <td>4</td>
            <td>4 (4)</td>
          </tr>
          <tr>
            <td>4 / 8</td>
            <td>0</td>
            <td>4 (4)</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Thus, the octal value of{` `}
        <code>
          2348<sub>10</sub>
        </code>
        {` `}
        is{` `}
        <code>
          4454<sub>8</sub>
        </code>
        .
      </p>
    </>
  );
}
