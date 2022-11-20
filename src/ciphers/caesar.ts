import Cipher from './cipher';

export default class CaesarCipher extends Cipher<number> {
  private _alphabet: string;
  private _insertInvalid: boolean;

  constructor(
    key: number,
    alphabet = `abcdefghijklmnopqrstuvwxyz`,
    insertInvalid = true,
  ) {
    super(Math.floor(key));
    alphabet = alphabet.toLowerCase();

    if (String.prototype.concat(...new Set(alphabet)) !== alphabet) {
      throw new Error(`All alphabet characters should be unique`);
    }

    this._alphabet = alphabet;
    this._insertInvalid = insertInvalid;
  }

  encode(message: string) {
    const alphabet = this._alphabet;
    let str = ``;

    if (!alphabet) {
      throw new Error(`Alphabet must exist`);
    }

    for (let i = 0; i < message.length; i++) {
      let char = message[i];
      const isLower = char.toLowerCase() === char;
      char = char.toLowerCase();
      const index = alphabet.indexOf(char);

      if (index === -1) {
        if (this._insertInvalid) {
          str += isLower ? char : char.toUpperCase();
        }
        continue;
      }

      char = alphabet[(index + this._key) % alphabet.length];
      char = isLower ? char : char.toUpperCase();
      str += char;
    }

    return str;
  }

  decode(message: string) {
    const alphabet = this._alphabet;
    let str = ``;

    if (!alphabet) {
      throw new Error(`Alphabet must exist`);
    }

    for (let i = 0; i < message.length; i++) {
      let char = message[i];
      const isLower = char.toLowerCase() === char;
      char = char.toLowerCase();
      const index = alphabet.indexOf(char);

      if (index === -1) {
        if (this._insertInvalid) {
          str += isLower ? char : char.toUpperCase();
        }
        continue;
      }

      char =
        alphabet[
          (((index - this._key) % alphabet.length) + alphabet.length) %
            alphabet.length
        ];
      char = isLower ? char : char.toUpperCase();
      str += char;
    }

    return str;
  }
}
