import BigInteger from 'big-integer';
import BinaryConverter from './binary';
import Converter, { Kind, ConverterErrors } from './converter';
import HexadecimalConverter from './hex';
import OctalConverter from './oct';

export default class DecimalConverter extends Converter {
  private static _reTestDec = /^\d+$/;

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
    switch (kind) {
      case `dec`:
        return this;
      case `oct`:
        return new OctalConverter(this._dec.toString(8));
      case `binary`:
        return new BinaryConverter(this._dec.toString(2));
      case `hex`:
        return new HexadecimalConverter(this._dec.toString(16));
      case `text`:
        throw new Error(ConverterErrors[`not-implemented`]);
    }
  }
}
