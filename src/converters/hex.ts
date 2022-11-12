import BigInteger from 'big-integer';
import BinaryConverter from './binary';
import Converter, { Kind, ConverterErrors } from './converter';
import { getString } from '../text';
import DecimalConverter from './dec';
import OctalConverter from './oct';
import TextConverter from './text';

export default class HexadecimalConverter extends Converter {
  private static _reTextHex = /^(0x|0X)?[a-fA-F0-9]+$/;
  private static _reNormalize = /^(0x|0X)|\s/g;

  private _hex: BigInteger.BigInteger;

  constructor(value: string) {
    super();

    this.kind = `hex`;
    this.value = this._validate(value);

    this._hex = BigInteger(this.value, 16);
  }

  private _validate(value: string): string {
    value = value.replace(HexadecimalConverter._reNormalize, ``);

    if (!HexadecimalConverter._reTextHex.test(value)) {
      throw new Error(ConverterErrors[`invalid-value`]);
    }

    return value;
  }

  to(kind: Kind): Converter {
    switch (kind) {
      case `hex`:
        return this;
      case `oct`:
        return new OctalConverter(this._hex.toString(8));
      case `binary`:
        return new BinaryConverter(this._hex.toString(2));
      case `dec`:
        return new DecimalConverter(this._hex.toString(10));
      case `text`:
        const v = this.value.padStart(
          Math.ceil(this.value.length / 2) * 2,
          `0`,
        );
        const bytes: number[] = [];
        for (let i = 0; i < v.length; i += 2) {
          const o = v.substring(i, i + 2);
          bytes.push(parseInt(o, 16));
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
    return this.value.replace(/(.{2})/g, `$1${delimiter}`);
  }
}
