import { getCodePoints } from '../text';
import BinaryConverter from './binary';
import Converter, { Kind } from './converter';
import DecimalConverter from './dec';
import HexadecimalConverter from './hex';
import OctalConverter from './oct';

export default class TextConverter extends Converter {
  constructor(value: string) {
    super();

    this.kind = `text`;
    this.value = value;
  }

  to(kind: Kind): Converter {
    const codePoints = getCodePoints(this.value);

    switch (kind) {
      case `text`:
        return this;
      case `oct`:
        return new OctalConverter(
          codePoints.map((x) => x.toString(8).padStart(3, `0`)).join(``),
        );
      case `binary`:
        return new BinaryConverter(
          codePoints.map((x) => x.toString(2).padStart(8, `0`)).join(``),
        );
      case `hex`:
        return new HexadecimalConverter(
          codePoints.map((x) => x.toString(16).padStart(2, `0`)).join(``),
        );
      case `dec`:
        return new DecimalConverter(
          codePoints.map((x) => x.toString(10)).join(``),
        );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delimit(_delimiter: string): string {
    return this.value;
  }
}
