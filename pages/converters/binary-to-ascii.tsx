import Area from '@/components/Area/area';
import Converter, {
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import BinaryConverter from '@/src/converters/binary';
import { useRouter } from 'next/router';

export default function BinaryToAscii() {
  const router = useRouter();

  const convert = (input: string): string => {
    if (!input) {
      return ``;
    }

    const dc = new BinaryConverter(input);

    return dc.to(`text`).value;
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
      <h1>Binary to ASCII Converter</h1>
      <Area>
        <Converter
          convert={convert}
          onTargetsChange={navigate}
          initialFrom="binary"
          initialTo="text"
          showDelimiter={false}
          showPrefix={false}
        />
      </Area>
    </>
  );
}
