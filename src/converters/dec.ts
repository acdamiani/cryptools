import BigInteger from 'big-integer';
import BinaryConverter from './binary';
import Converter, { Kind, ConverterErrors } from './converter';
import HexadecimalConverter from './hex';
import OctalConverter from './oct';

export default class DecimalConverter extends Converter {
  private static _reTestDec = /^\d+$/;
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

  to(kind: Kind): Converter {
    let ret = ``;

    switch (kind) {
      case `dec`:
        return this;
      case `oct`:
        ret = this._dec.toString(8);
        return new OctalConverter(
          ret.padStart(Math.ceil(ret.length / 3) * 3, `0`),
        );
      case `binary`:
        ret = this._dec.toString(2);
        return new BinaryConverter(
          ret.padStart(Math.ceil(ret.length / 8) * 8, `0`),
        );
      case `hex`:
        ret = this._dec.toString(16);
        return new HexadecimalConverter(
          ret.padStart(Math.ceil(ret.length / 2) * 2, `0`),
        );
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
