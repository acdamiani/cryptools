import Cipher from './cipher';
import CaesarCipher from './caesar';

export type ROTVariant = `rot5` | `rot13` | `rot18` | `rot47`;

export default class ROTCipher extends Cipher {
  _c1: CaesarCipher;
  _c2: CaesarCipher | null;
  _variant: ROTVariant;

  constructor(variant: ROTVariant = `rot13`) {
    super();

    this._variant = variant;
    this._c2 = null;

    switch (variant) {
      case `rot5`:
        this._c1 = new CaesarCipher(5, `0123456789`);
        break;
      case `rot13`:
        this._c1 = new CaesarCipher(13, `abcdefghijklmnopqrstuvwxyz`);
        break;
      case `rot18`:
        this._c1 = new CaesarCipher(13, `abcdefghijklmnopqrstuvwxyz`);
        this._c2 = new CaesarCipher(5, `0123456789`);
        break;
      case `rot47`:
        this._c1 = new CaesarCipher(
          47,
          `!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~`,
          undefined,
          false,
        );
        break;
    }
  }

  _encodeInternal(message: string) {
    if (this._variant === `rot18`) {
      const messages = message.match(/\D+|[0-9]+/g);

      if (!messages || !this._c2) return message;

      let ret = ``;

      for (const m of messages) {
        if (/^\d+$/.test(m[0])) {
          ret += this._c2.encrypt(m);
        } else {
          ret += this._c1.encrypt(m);
        }
      }
      return ret;
    }

    return this._c1.encrypt(message);
  }

  encrypt(message: string) {
    return this._encodeInternal(message);
  }

  decrypt(message: string) {
    return this._encodeInternal(message);
  }
}
