import Cipher from './cipher';
import CaesarCipher from './caesar';

type Variant = `rot5` | `rot13` | `rot18` | `rot47`;

export default class Rot13Cipher extends Cipher {
  _c1: CaesarCipher;
  _c2: CaesarCipher | null;
  _variant: Variant;

  constructor(variant: Variant = `rot13`) {
    super();

    this._variant = variant;
    this._c2 = null;

    switch (variant) {
      case `rot5`:
        this._c1 = new CaesarCipher(5, `0123456789`);
        break;
      case `rot13`:
        this._c1 = new CaesarCipher(13, `abcdefghijklmnopqrstuvwyxz`);
        break;
      case `rot18`:
        this._c1 = new CaesarCipher(13, `abcdefghijklmnopqrstuvwyxz`);
        this._c2 = new CaesarCipher(5, `0123456789`);
        break;
      case `rot47`:
        this._c1 = new CaesarCipher(
          47,
          `!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`,
        );
        break;
    }
  }

  _encodeInternal(message: string) {
    if (this._variant === `rot18`) {
      const messages = message.match(/\D+|[0-9]+/g);

      // console.log(messages);

      if (!messages || !this._c2) return message;

      let ret = ``;

      for (const m of messages) {
        if (/^\d+$/.test(m[0])) {
          ret += this._c2.encode(m);
        } else {
          ret += this._c1.encode(m);
        }
      }
      return ret;
    }

    return this._c1.encode(message);
  }

  encode(message: string) {
    return this._encodeInternal(message);
  }

  decode(message: string) {
    return this._encodeInternal(message);
  }
}
