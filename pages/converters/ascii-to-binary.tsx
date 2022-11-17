import Area from '@/components/Area/area';
import Converter, {
  ConverterProperties,
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import TextConverter from '@/src/converters/text';
import { useRouter } from 'next/router';

export default function AsciiToBinary() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const dc = new TextConverter(input);
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
      <h1>ASCII to Decimal Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="text"
          initialTo="binary"
          prefixText="0b"
        />
      </Area>
    </>
  );
}
