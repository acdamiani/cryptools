import Area from '@/components/Area/area';
import Converter, {
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import OctalConverter from '@/src/converters/oct';
import { useRouter } from 'next/router';
import Meta, { OpenGraph } from '@/components/Meta/meta';
import ASCIITable from '@/components/ASCIITable/ascii-table';

const title = `Octal to ASCII Converter - Cryptools`;
const description = `Octal number to ASCII/Unicode text converter.`;
const og: OpenGraph = { url: `https://cryptools.dev/converters/oct-to-ascii` };

export default function BinaryToAscii() {
  const router = useRouter();

  const convert = (input: string): string => {
    if (!input) {
      return ``;
    }

    const hx = new OctalConverter(input);

    return hx.to(`text`).value;
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
      <h1>Octal to ASCII Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="octal"
          initialTo="text"
          showDelimiter={false}
          showPrefix={false}
        />
      </Area>
      <h3>Converting Octal to ASCII</h3>
      <p>
        Octal is a base 8 numbering system, in which each digit of an octal
        number has 8 possible values, 0-7. Octal is useful in computers when
        representing values that fill three bit multiples. For example, Unix
        file permissions use octal numbering, because the actual binary data
        that represents file permissions are twelve bits long.
      </p>
      <p>
        Three digts of octal are sufficient to represent one ASCII character.
        Use the table below to convert groups of three digits to their
        corresponding ASCII values, by finding their decimal number and
        converting that to octal.
      </p>
      <ASCIITable />
    </>
  );
}
