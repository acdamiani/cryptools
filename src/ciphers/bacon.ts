import Cipher from './cipher';

export type CipherVariant = `original` | `unique`;

type BaconAlphabet = {
  alphabet: string;
  charmap: string[];
};

const originalAlphabet: BaconAlphabet = {
  alphabet: `abcdefghijklmnopqrstuvwxyz`,
  charmap: [
    `aaaaa`,
    `aaaab`,
    `aaaba`,
    `aaabb`,
    `aabaa`,
    `aabab`,
    `aabba`,
    `aabbb`,
    `abaaa`,
    `abaaa`,
    `abaab`,
    `ababa`,
    `ababb`,
    `abbaa`,
    `abbab`,
    `abbba`,
    `abbbb`,
    `baaaa`,
    `baaab`,
    `baaba`,
    `baabb`,
    `baabb`,
    `babaa`,
    `babab`,
    `babba`,
    `babbb`,
  ],
};

const uniqueAlphabet: BaconAlphabet = {
  alphabet: `abcdefghijklmnopqrstuvwxyz`,
  charmap: [
    `aaaaa`,
    `aaaab`,
    `aaaba`,
    `aaabb`,
    `aabaa`,
    `aabab`,
    `aabba`,
    `aabbb`,
    `abaaa`,
    `abaab`,
    `ababa`,
    `ababb`,
    `abbaa`,
    `abbab`,
    `abbba`,
    `abbbb`,
    `baaaa`,
    `baaab`,
    `baaba`,
    `baabb`,
    `babaa`,
    `babab`,
    `babba`,
    `babbb`,
    `bbaaa`,
    `bbaab`,
  ],
};

export default class BaconCipher extends Cipher {
  private _variant: CipherVariant;
  private _aMark: string;
  private _bMark: string;
  private _reWhitespace = /\s+/g;
  private _reChunk = /(.{1,5})/g;

  constructor(variant: CipherVariant = `original`, aMark = `a`, bMark = `b`) {
    super();

    this._variant = variant;

    if (aMark.length !== 1) {
      throw new Error(`The length of mark one should be equal to one`);
    } else if (aMark === bMark) {
      throw new Error(`Marks one and two cannot be equal`);
    }
    this._aMark = aMark;

    if (bMark.length !== 1) {
      throw new Error(`The length of mark two should be equal to two`);
    }
    this._bMark = bMark;
  }

  encode(message: string): string {
    const baconAlphabet =
      this._variant === `original` ? originalAlphabet : uniqueAlphabet;
    let ret = ``;

    for (const char of message.toLowerCase()) {
      const i = baconAlphabet.alphabet.indexOf(char);
      if (i !== -1) {
        ret += baconAlphabet.charmap[i];
      }
    }

    ret = ret
      .split(``)
      .map((x) => (x === `a` ? this._aMark : this._bMark))
      .join(``);

    ret = ret.replace(this._reChunk, `$1 `);

    return ret;
  }

  decode(message: string): string {
    const baconAlphabet =
      this._variant === `original` ? originalAlphabet : uniqueAlphabet;
    message = message.replace(this._reWhitespace, ``);

    const chunked = message.match(this._reChunk);

    if (!chunked) {
      return ``;
    }

    let ret = ``;

    for (const chunk of chunked) {
      const char = chunk
        .split(``)
        .map((x) => {
          switch (x) {
            case this._aMark:
              return `a`;
            case this._bMark:
              return `b`;
            default:
              return ``;
          }
        })
        .join(``);

      const i = baconAlphabet.charmap.indexOf(char);

      if (i !== -1 && i < baconAlphabet.alphabet.length) {
        ret += baconAlphabet.alphabet[i];
      }
    }

    return ret;
  }
}
