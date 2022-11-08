import Cipher from './cipher';

type CaseStrategy = `ignore` | `maintain` | `skip`;

export default class VigenereCipher extends Cipher<string> {
  _alphabet: string;
  _casing: CaseStrategy;
  _insertInvalid: boolean;

  constructor(
    key: string,
    alphabet = `abcdefghijklmnopqrstuvwxyz`,
    casing: CaseStrategy = `maintain`,
    insertInvalid = true,
  ) {
    super(key);
    alphabet = alphabet.toLowerCase();

    if (String.prototype.concat(...new Set(alphabet)) !== alphabet) {
      throw new Error(`All alphabet characters should be unique`);
    }

    this._alphabet = alphabet;
    this._casing = casing;
    this._insertInvalid = insertInvalid;
  }

  encode(message: string) {
    const alphabet = this._alphabet;
    let str = ``;

    for (let i = 0, k = 0; i < message.length; i++) {
      let char = message[i];
      const isLower = char.toLowerCase() === char;

      if (!isLower && this._casing === `skip`) {
        str += char;
        continue;
      }

      char = char.toLowerCase();
      const index = alphabet.indexOf(char);

      if (index === -1) {
        if (this._insertInvalid) {
          str += isLower ? char : char.toUpperCase();
        }
        continue;
      }

      const keyChar = this._key[k % this._key.length].toLowerCase();
      const keyIndex = alphabet.indexOf(keyChar);

      if (keyIndex === -1) {
        throw new Error(`Key contains forbidden characters`);
      }

      const newChar = alphabet[(index + keyIndex) % alphabet.length];

      str +=
        this._casing === `maintain` && !isLower
          ? newChar.toUpperCase()
          : newChar;

      k++;
    }

    return str;
  }

  decode(message: string) {
    const alphabet = this._alphabet;
    let str = ``;

    for (let i = 0, k = 0; i < message.length; i++) {
      let char = message[i];
      const isLower = char.toLowerCase() === char;

      if (!isLower && this._casing === `skip`) {
        str += char;
        continue;
      }

      char = char.toLowerCase();
      const index = alphabet.indexOf(char);

      if (index === -1) {
        if (this._insertInvalid) {
          str += isLower ? char : char.toUpperCase();
        }
        continue;
      }

      const keyChar = this._key[k % this._key.length].toLowerCase();
      const keyIndex = alphabet.indexOf(keyChar);

      if (keyIndex === -1) {
        throw new Error(`Key contains forbidden characters`);
      }

      const newChar =
        alphabet[
          (((index - keyIndex) % alphabet.length) + alphabet.length) %
            alphabet.length
        ];

      str +=
        this._casing === `maintain` && !isLower
          ? newChar.toUpperCase()
          : newChar;

      k++;
    }

    return str;
  }
}
