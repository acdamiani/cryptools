import BigInteger from 'big-integer';
import { getString } from '../text';
import BinaryConverter from './binary';
import Converter, { Kind, ConverterErrors } from './converter';
import DecimalConverter from './dec';
import HexadecimalConverter from './hex';
import TextConverter from './text';

export default class OctalConverter extends Converter {
  private static _reTestOctal = /^[0-7]+$/;
  private static _reSplit = /.{1,3}/g;

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
    let ret = ``;

    switch (kind) {
      case `oct`:
        return this;
      case `dec`:
        ret = this._oct.toString(10);
        return new DecimalConverter(ret);
      case `hex`:
        ret = this._oct.toString(16);
        return new HexadecimalConverter(
          ret.padStart(Math.ceil(ret.length / 2) * 2, `0`),
        );
      case `binary`:
        ret = this._oct.toString(2);
        return new BinaryConverter(
          ret.padStart(Math.ceil(ret.length / 8) * 8, `0`),
        );
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

  delimit(delimiter = ` `): string {
    return (this.value.match(OctalConverter._reSplit) ?? []).join(delimiter);
  }
}
