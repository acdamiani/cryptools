import BigInteger from 'big-integer';
import { getString } from '../text';
import Converter, { Kind, ConverterErrors } from './converter';
import DecimalConverter from './dec';
import HexadecimalConverter from './hex';
import OctalConverter from './oct';
import TextConverter from './text';

export default class BinaryConverter extends Converter {
  private static _reTestBinary = /^(0b|0B)?[01]+$/;
  private static _reNormalize = /^(0b|0B)|\s/g;
  private static _reSplit = /.{1,8}/g;

  private _binary: BigInteger.BigInteger;

  constructor(value: string) {
    super();

    this.kind = `binary`;
    this.value = this._validate(value);

    this._binary = BigInteger(this.value, 2);
  }

  private _validate(value: string): string {
    value = value.replace(BinaryConverter._reNormalize, ``);

    if (!BinaryConverter._reTestBinary.test(value)) {
      throw new Error(ConverterErrors[`invalid-value`]);
    }

    return value;
  }

  to(kind: Kind): Converter {
    let ret = ``;

    switch (kind) {
      case `binary`:
        return this;
      case `dec`:
        ret = this._binary.toString(10);
        return new DecimalConverter(ret);
      case `oct`:
        ret = this._binary.toString(8);
        return new OctalConverter(
          ret.padStart(Math.ceil(ret.length / 3) * 3, `0`),
        );
      case `hex`:
        ret = this._binary.toString(16);
        return new HexadecimalConverter(
          ret.padStart(Math.ceil(ret.length / 2) * 2, `0`),
        );
      case `text`:
        const v = this.value.padStart(
          Math.ceil(this.value.length / 8) * 8,
          `0`,
        );
        const bytes: number[] = [];
        for (let i = 0; i < v.length; i += 8) {
          const o = v.substring(i, i + 8);
          bytes.push(parseInt(o, 2));
          console.log(parseInt(o, 2));
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
    return (this.value.match(BinaryConverter._reSplit) ?? []).join(delimiter);
  }
}
