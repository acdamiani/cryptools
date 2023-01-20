import Cipher from './cipher';

export type CaseStrategy = `ignore` | `maintain` | `skip`;
export type VigenereVariant = `standard` | `beaufort` | `beaufort-variant`;

export default class VigenereCipher extends Cipher<string> {
  private _alphabet: string;
  private _casing: CaseStrategy;
  private _insertInvalid: boolean;
  private _variant: VigenereVariant;

  constructor(
    key: string,
    variant: VigenereVariant = `standard`,
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
    this._variant = variant;
  }

  encrypt(message: string) {
    const alphabet = this._alphabet;
    let str = ``;

    if (
      this._key.split(``).filter((k) => alphabet.includes(k)).length !==
      this._key.length
    ) {
      throw new Error(`Key contains forbidden characters`);
    }

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

      let idx;

      switch (this._variant) {
        case `standard`:
          idx = index + keyIndex;
          break;
        case `beaufort`:
          idx = keyIndex - index;
          break;
        case `beaufort-variant`:
          idx = index - keyIndex;
          break;
      }

      idx = ((idx % alphabet.length) + alphabet.length) % alphabet.length;

      const newChar = alphabet[idx];

      str +=
        this._casing === `maintain` && !isLower
          ? newChar.toUpperCase()
          : newChar;

      k++;
    }

    return str;
  }

  decrypt(message: string) {
    const alphabet = this._alphabet;
    let str = ``;

    if (
      this._key.split(``).filter((k) => alphabet.includes(k)).length !==
      this._key.length
    ) {
      throw new Error(`Key contains forbidden characters`);
    }

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

      let idx;

      switch (this._variant) {
        case `standard`:
          idx = index - keyIndex;
          break;
        case `beaufort`:
          idx = keyIndex - index;
          break;
        case `beaufort-variant`:
          idx = index + keyIndex;
          break;
      }

      idx = ((idx % alphabet.length) + alphabet.length) % alphabet.length;

      const newChar = alphabet[idx];

      str +=
        this._casing === `maintain` && !isLower
          ? newChar.toUpperCase()
          : newChar;

      k++;
    }

    return str;
  }
}
