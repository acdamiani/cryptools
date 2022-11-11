import BigInteger from 'big-integer';
import { getString } from '../text';
import BinaryConverter from './binary';
import Converter, { Kind, ConverterErrors } from './converter';
import DecimalConverter from './dec';
import HexadecimalConverter from './hex';
import TextConverter from './text';

export default class OctalConverter extends Converter {
  private static _reTestOctal = /^[0-7]+$/;

  private _oct: BigInteger.BigInteger;

  constructor(value: string) {
    super();

    this.kind = `oct`;
    this.value = this._validate(value);

    this._oct = BigInteger(this.value, 8);
  }

  private _validate(value: string): string {
    value = value.replace(Converter._reStripWhitespace, ``);

    if (!OctalConverter._reTestOctal.test(value)) {
      throw new Error(ConverterErrors[`invalid-value`]);
    }

    return value;
  }

  to(kind: Kind): Converter {
    switch (kind) {
      case `oct`:
        return this;
      case `dec`:
        return new DecimalConverter(this._oct.toString(10));
      case `hex`:
        return new HexadecimalConverter(this._oct.toString(16));
      case `binary`:
        return new BinaryConverter(this._oct.toString(2));
      case `text`:
        const v = this.value.padStart(
          Math.ceil(this.value.length / 3) * 3,
          `0`,
        );
        const bytes: number[] = [];
        for (let i = 0; i < v.length; i += 3) {
          const o = v.substring(i, i + 3);
          bytes.push(parseInt(o, 8));
        }

        let str: string;
        try {
          str = getString(new Uint8Array(bytes));
        } catch {
          throw new Error(ConverterErrors[`invalid-target`]);
        }

        return new TextConverter(str);
    }
  }
}
