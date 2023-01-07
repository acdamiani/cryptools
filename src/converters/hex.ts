import BigInteger from 'big-integer';
import BinaryConverter from './binary';
import Converter, { ConverterKind, ConverterErrors } from './converter';
import { getString } from '../text';
import OctalConverter from './oct';
import TextConverter from './text';
import DecimalConverter from './dec';

export default class HexadecimalConverter extends Converter {
  private static _reTextHex = /^-?[a-fA-F0-9]+$/;
  private static _reNormalize = /^(-?)(?:(0x|0X)?\s*)(.+)$/;
  private static _reSplit = /.{1,2}/g;

  private _hex: BigInteger.BigInteger;

  constructor(value: string) {
    super();

    this.kind = `hex`;
    this.value = this._validate(value);

    this._hex = BigInteger(this.value, 16);
  }

  private _validate(value: string): string {
    value = value.replace(HexadecimalConverter._reNormalize, `$1$3`);

    if (!HexadecimalConverter._reTextHex.test(value)) {
      throw new Error(ConverterErrors[`invalid-value`]);
    }

    return value;
  }

  to(kind: ConverterKind): Converter {
    switch (kind) {
      case `hex`:
        return this;
      case `oct`:
        return new OctalConverter(Converter.stringFrom(this._hex, `oct`));
      case `binary`:
        return new BinaryConverter(Converter.stringFrom(this._hex, `binary`));
      case `dec`:
        return new DecimalConverter(Converter.stringFrom(this._hex, `dec`));
      case `text`:
        const abs = this._hex.abs().toString(16);
        const v = abs.padStart(Math.ceil(abs.length / 2) * 2, `0`);
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
