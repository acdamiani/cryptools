import Encoder from '@/src/encoders/encoder';
import { getBytes, getCodePoints, getString } from '../text';

const base32Variants = [
  `base32`,
  `base32hex`,
  `z-base-32`,
  `crockford-base32`,
] as const;

export type Base32Variant = typeof base32Variants[number];

type Base32VariantOptions = {
  alphabet: string;
  padding: string | null;
  decodeFilter?: `uppercase`;
  map?: Record<number, number>;
};

export const VARIANT_OPTIONS: Record<Base32Variant, Base32VariantOptions> = {
  base32: {
    alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZ234567`,
    padding: `=`,
    map: {
      0x30: 14,
      0x31: 8,
    },
  },
  base32hex: {
    alphabet: `0123456789ABCDEFGHIJKLMNOPQRSTUV`,
    padding: `=`,
  },
  'z-base-32': {
    alphabet: `ybndrfg8ejkmcpqxot1uwisza345h769`,
    padding: null,
  },
  'crockford-base32': {
    alphabet: `0123456789ABCDEFGHJKMNPQRSTVWXYZ`,
    padding: null,
    decodeFilter: `uppercase`,
    map: {
      0x4f: 0,
      0x49: 1,
      0x4c: 1,
    },
  },
};

export const VARIANT_LABELS: Record<Base32Variant, string> = {
  base32: `Base32 (RFC 3548, RFC 4648)`,
  base32hex: `Base32hex (RFC 4648)`,
  'z-base-32': `z-base-32`,
  'crockford-base32': `Crockford's Base32`,
};

export default class Base32Encoder extends Encoder {
  private _variant: Base32Variant;

  constructor(variant: Base32Variant = `base32`) {
    super();

    this._variant = variant;

    const { alphabet } = VARIANT_OPTIONS[variant];

    if (alphabet.length !== 32) {
      throw new Error(`Alphabet should be exactly 32 characters long`);
    } else if (String.prototype.concat(...new Set(alphabet)) !== alphabet) {
      throw new Error(`All alphabet characters should be unique`);
    }
  }

  encode(message: string): string {
    const { alphabet, padding } = VARIANT_OPTIONS[this._variant];

    const input = getBytes(message);
    const len = input.length;
    const resLen = Math.ceil(len / 5) * 8;
    const res = new Array(resLen);

    let shift = 3,
      carry = 0,
      j = 0;

    for (let i = 0; i < len; i++) {
      const byte = input[i];
      let idx = carry | (byte >> shift);

      res[j++] = alphabet[idx & 0x1f];

      if (shift > 5) {
        shift -= 5;
        idx = byte >> shift;
        res[j++] = alphabet[idx & 0x1f];
      }

      shift = 5 - shift;
      carry = byte << shift;
      shift = 8 - shift;
    }

    if (shift !== 3) {
      res[j++] = alphabet[carry & 0x1f];
    }

    if (padding) {
      while (j < resLen) {
        res[j++] = padding;
      }

      return res.join(``);
    } else {
      return res.slice(0, j).join(``);
    }
  }

  decode(message: string): string {
    const { alphabet, padding, decodeFilter } = VARIANT_OPTIONS[this._variant];
    const map = VARIANT_OPTIONS[this._variant].map || {};

    if (decodeFilter === `uppercase`) {
      message = message.toUpperCase();
    }

    for (let i = 0; i < alphabet.length; i++) {
      map[getCodePoints(alphabet[i])[0]] = i;
    }

    const input = getCodePoints(message);
    const len = input.length;
    const resLen = Math.ceil(len / 5) * 8;
    const res = new Uint8Array(resLen);

    let shift = 8,
      carry = 0,
      j = 0;

    for (let i = 0; i < len; i++) {
      const char = message[i];
      const codePoint = input[i];

      if (codePoint == 65) {
        console.log(map[codePoint]);
      }

      if (char === padding) {
        continue;
      } else if (map[codePoint] === undefined) {
        throw new Error(`Unexpected character at index ${i}`);
      } else {
        const idx = map[codePoint] & 0xff;
        shift -= 5;
        if (shift > 0) {
          carry |= idx << shift;
        } else if (shift < 0) {
          res[j++] = carry | (idx >> -shift);
          shift += 8;
          carry = (idx << shift) & 0xff;
        } else {
          res[j++] = carry | idx;
          shift = 8;
          carry = 0;
        }
      }
    }

    return getString(res.slice(0, j));
  }

  static getVariantsAsArray(): string[] {
    return Array.from(base32Variants);
  }
}
