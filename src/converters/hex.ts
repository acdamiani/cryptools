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
  private static _reSplit = /.{1,2}/g;

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
    let ret = ``;

    switch (kind) {
      case `hex`:
        return this;
      case `oct`:
        ret = this._hex.toString(8);
        return new OctalConverter(
          ret.padStart(Math.ceil(ret.length / 3) * 3, `0`),
        );
      case `binary`:
        ret = this._hex.toString(2);
        return new BinaryConverter(
          ret.padStart(Math.ceil(ret.length / 8) * 8, `0`),
        );
      case `dec`:
        ret = this._hex.toString(10);
        return new DecimalConverter(ret);
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
    return (this.value.match(HexadecimalConverter._reSplit) ?? []).join(
      delimiter,
    );
  }
}
