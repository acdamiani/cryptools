import BigInteger from 'big-integer';
import BinaryConverter from './binary';
import Converter, { ConverterKind, ConverterErrors } from './converter';
import HexadecimalConverter from './hex';
import OctalConverter from './oct';

export default class DecimalConverter extends Converter {
  private static _reTestDec = /^-?\d+$/;
  private static _reSplit = /.{1,3}/g;

  private _dec: BigInteger.BigInteger;

  constructor(value: string) {
    super();

    this.kind = `dec`;
    this.value = this._validate(value);

    this._dec = BigInteger(this.value);
  }

  private _validate(value: string): string {
    value = value.replace(Converter._reStripWhitespace, ``);

    if (!DecimalConverter._reTestDec.test(value)) {
      throw new Error(ConverterErrors[`invalid-value`]);
    }

    return value;
  }

  to(kind: ConverterKind): Converter {
    switch (kind) {
      case `dec`:
        return this;
      case `oct`:
        return new OctalConverter(Converter.stringFrom(this._dec, `oct`));
      case `binary`:
        return new BinaryConverter(Converter.stringFrom(this._dec, `binary`));
      case `hex`:
        return new HexadecimalConverter(Converter.stringFrom(this._dec, `hex`));
      case `text`:
        throw new Error(ConverterErrors[`not-implemented`]);
    }
  }

  delimit(delimiter: string): string {
    return (
      this.value
        .split(``)
        .reverse()
        .join(``)
        .match(DecimalConverter._reSplit) ?? []
    )
      .map((x) => x.split(``).reverse().join(``))
      .reverse()
      .join(delimiter);
  }
}
