import BigInteger from 'big-integer';
import { getString } from '../text';
import BinaryConverter from './binary';
import Converter, { ConverterKind, ConverterErrors } from './converter';
import DecimalConverter from './dec';
import HexadecimalConverter from './hex';
import TextConverter from './text';

export default class OctalConverter extends Converter {
  private static _reTestOctal = /^-?[0-7]+$/;
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

  to(kind: ConverterKind): Converter {
    switch (kind) {
      case `oct`:
        return this;
      case `dec`:
        return new DecimalConverter(Converter.stringFrom(this._oct, `dec`));
      case `hex`:
        return new HexadecimalConverter(Converter.stringFrom(this._oct, `hex`));
      case `binary`:
        return new BinaryConverter(Converter.stringFrom(this._oct, `binary`));
      case `text`:
        const abs = this._oct.abs().toString(8);
        const v = abs.padStart(Math.ceil(abs.length / 3) * 3, `0`);
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
