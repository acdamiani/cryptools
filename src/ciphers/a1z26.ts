import Cipher from './cipher';

export default class A1Z26Cipher extends Cipher<string> {
  _alphabet: string;
  _caseSensitive: boolean;

  constructor(
    key: string,
    alphabet = `abcdefghijklmnopqrstuvwxyz`,
    caseSensitive = false,
  ) {
    if (key.length === 0) {
      throw new Error(`The separator should be at least one character long`);
    }

    super(key);

    if (!caseSensitive) {
      alphabet = alphabet.toLowerCase();
    }

    if (String.prototype.concat(...new Set(alphabet)) !== alphabet) {
      throw new Error(`All alphabet characters should be unique`);
    }

    this._alphabet = alphabet;
    this._caseSensitive = caseSensitive;
  }

  encrypt(message: string) {
    const ret: number[] = [];

    if (!this._caseSensitive) {
      message = message.toLowerCase();
    }

    for (let i = 0; i < message.length; i++) {
      const index = this._alphabet.indexOf(message[i]);

      if (index === -1) {
        continue;
      }

      ret.push(index + 1);
    }

    return ret.join(this._key);
  }

  decrypt(message: string) {
    let ret = ``;
    const nums = message.split(this._key);

    for (const num of nums) {
      const i = parseInt(num) - 1;

      if (isNaN(i) || i > this._alphabet.length - 1 || i < 0) {
        continue;
      }

      ret += this._alphabet[i];
    }

    return ret;
  }
}
