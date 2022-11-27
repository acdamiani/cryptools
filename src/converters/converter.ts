import BigInteger from 'big-integer';

export type ConverterKind = `oct` | `binary` | `text` | `dec` | `hex`;
export type Error = `invalid-value` | `invalid-target` | `not-implemented`;

export const ConverterErrors: Record<Error, string> = {
  'invalid-value': `Given value is not representable by this converter`,
  'invalid-target': `Could not convert to target type`,
  'not-implemented': `Conversion not supported`,
};

export default abstract class Converter {
  protected static _reStripWhitespace = /\s+/g;

  kind: ConverterKind | null = null;
  value = ``;

  abstract to(kind: ConverterKind): Converter;
  abstract delimit(delimiter: string): string;

  static stringFrom(
    value: BigInteger.BigInteger,
    kind: Exclude<ConverterKind, 'text'>,
  ): string {
    const negative = value.lt(0) ? `-` : ``;
    const abs = value.abs();

    let ret = ``;

    switch (kind) {
      case `dec`:
        return value.toString(10);
      case `oct`:
        ret = abs.toString(8);
        ret = negative + ret.padStart(Math.ceil(ret.length / 3) * 3, `0`);
        break;
      case `binary`:
        ret = abs.toString(2);
        ret = negative + ret.padStart(Math.ceil(ret.length / 8) * 8, `0`);
        break;
      case `hex`:
        ret = abs.toString(16);
        ret = negative + ret.padStart(Math.ceil(ret.length / 2) * 2, `0`);
        break;
    }

    return ret;
  }
}
