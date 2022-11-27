import BigInteger from 'big-integer';
import { getString } from '../text';
import Converter, { ConverterKind, ConverterErrors } from './converter';
import DecimalConverter from './dec';
import HexadecimalConverter from './hex';
import OctalConverter from './oct';
import TextConverter from './text';

export default class BinaryConverter extends Converter {
  private static _reTestBinary = /^-?(0b|0B)?[01]+$/;
  private static _reNormalize = /^(-?)(?:(0b|0B)?\s*)(.+)$/;
  private static _reSplit = /.{1,8}/g;

  private _binary: BigInteger.BigInteger;

  constructor(value: string) {
    super();

    this.kind = `binary`;
    this.value = this._validate(value);

    this._binary = BigInteger(this.value, 2);
  }

  private _validate(value: string): string {
    value = value.replace(BinaryConverter._reNormalize, `$1$3`);

    if (!BinaryConverter._reTestBinary.test(value)) {
      throw new Error(ConverterErrors[`invalid-value`]);
    }

    return value;
  }

  to(kind: ConverterKind): Converter {
    switch (kind) {
      case `binary`:
        return this;
      case `dec`:
        return new DecimalConverter(Converter.stringFrom(this._binary, `dec`));
      case `oct`:
        return new OctalConverter(Converter.stringFrom(this._binary, `oct`));
      case `hex`:
        return new HexadecimalConverter(
          Converter.stringFrom(this._binary, `hex`),
        );
      case `text`:
        const abs = this._binary.abs().toString(2);
        const v = abs.padStart(Math.ceil(abs.length / 8) * 8, `0`);
        const bytes: number[] = [];
        for (let i = 0; i < v.length; i += 8) {
          const o = v.substring(i, i + 8);
          bytes.push(parseInt(o, 2));
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
