import Cipher from './cipher';

export default class CaesarCipher extends Cipher<number> {
  private _alphabet: string;
  private _insertInvalid: boolean;
  private _preserveCase: boolean;

  constructor(
    key: number,
    alphabet = `abcdefghijklmnopqrstuvwxyz`,
    insertInvalid = true,
    preserveCase = true,
  ) {
    super(Math.floor(key));

    if (preserveCase) {
      alphabet = alphabet.toLowerCase();
    }

    if (String.prototype.concat(...new Set(alphabet)) !== alphabet) {
      throw new Error(`All alphabet characters should be unique`);
    }

    this._alphabet = alphabet;
    this._insertInvalid = insertInvalid;
    this._preserveCase = preserveCase;
  }

  private _encodeInternal(message: string, decode: boolean): string {
    const alphabet = this._alphabet;
    let str = ``;

    if (!alphabet) {
      throw new Error(`Alphabet must exist`);
    }

    for (let i = 0; i < message.length; i++) {
      let char = message[i];
      const isLower = char.toLowerCase() === char;
      const index = alphabet.indexOf(char.toLowerCase());

      if (index === -1) {
        if (this._insertInvalid) {
          str += char;
        }
        continue;
      }

      const newIndex = decode ? index - this._key : index + this._key;

      const newChar =
        alphabet[
          ((newIndex % alphabet.length) + alphabet.length) % alphabet.length
        ];

      if (this._preserveCase) {
        char = isLower ? newChar.toLowerCase() : newChar.toUpperCase();
      } else {
        char = newChar;
      }

      str += char;
    }

    return str;
  }

  encrypt(message: string) {
    return this._encodeInternal(message, false);
  }

  decrypt(message: string) {
    return this._encodeInternal(message, true);
  }
}
