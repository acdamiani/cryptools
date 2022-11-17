import Area from '@/components/Area/area';
import Converter, {
  ConverterProperties,
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import DecimalConverter from '@/src/converters/dec';
import { useRouter } from 'next/router';

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
    </>
  );
}
