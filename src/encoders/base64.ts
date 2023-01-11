import Encoder from '@/src/encoders/encoder';
import { getBytes, getString } from '../text';

const base64Variants = [`base64`, `base64url`, `rfc2045`, `rfc1421`] as const;

export type Base64Variant = (typeof base64Variants)[number];

type Base64VariantOptions = {
  alphabet: string;
  padding: string | null;
  foreign?: boolean;
  maxLength?: number;
};

export const VARIANT_OPTIONS: Record<Base64Variant, Base64VariantOptions> = {
  base64: {
    alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,
    padding: `=`,
  },
  base64url: {
    alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`,
    padding: null,
  },
  rfc1421: {
    alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,
    padding: `=`,
    maxLength: 64,
  },
  rfc2045: {
    alphabet: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,
    padding: `=`,
    maxLength: 76,
    foreign: true,
  },
};

export const VARIANT_LABELS: Record<Base64Variant, string> = {
  base64: `Base64 (RFC 3548, RFC 4648)`,
  base64url: `Base64url (RFC 4648 §5)`,
  rfc1421: `Original Base64 (RFC 1421)`,
  rfc2045: `Transfer encoding for MIME (RFC 2045)`,
};

export default class Base64Encoder extends Encoder {
  private static _lineSeparator = `\r\n`;
  private _variant: Base64Variant;

  constructor(variant: Base64Variant = `base64`) {
    super();

    this._variant = variant;

    const { alphabet } = VARIANT_OPTIONS[variant];

    if (alphabet.length !== 64) {
      throw new Error(`Alphabet should be exactly 64 characters long`);
    } else if (String.prototype.concat(...new Set(alphabet)) !== alphabet) {
      throw new Error(`All alphabet characters should be unique`);
    }
  }

  encode(message: string): string {
    const { alphabet, padding, maxLength } = VARIANT_OPTIONS[this._variant];

    const bytes = getBytes(message);
    const pad = padding ?? ``;

    let ret = ``;
    let b1, b2, b3, o1, o2, o3, o4;

    for (let i = 0; i < bytes.length; i += 3) {
      b1 = bytes[i];
      b2 = i + 1 < bytes.length ? bytes[i + 1] : NaN;
      b3 = i + 2 < bytes.length ? bytes[i + 2] : NaN;
      o1 = b1 >> 2;
      o2 = ((b1 & 0b11) << 4) | (b2 >> 4);
      o3 = ((b2 & 0b1111) << 2) | (b3 >> 6);
      o4 = b3 & 0b111111;

      ret +=
        alphabet[o1] +
        alphabet[o2] +
        (isNaN(b2) ? pad : alphabet[o3]) +
        (isNaN(b3) ? pad : alphabet[o4]);
    }

    if (maxLength) {
      let lim = ``;

      for (let i = 0; i < ret.length; i += maxLength) {
        lim +=
          (lim === `` ? `` : Base64Encoder._lineSeparator) +
          ret.substring(i, i + maxLength);
      }

      ret = lim;
    }

    return ret;
  }

  decode(message: string): string {
    const { alphabet, padding, maxLength, foreign } =
      VARIANT_OPTIONS[this._variant];

    const pad = padding ?? ``;
    const length = message.length;
    const octets = [];
    let char, o;

    for (let i = 0; i < length; i++) {
      char = message[i];

      if (
        maxLength &&
        char === Base64Encoder._lineSeparator[0] &&
        message.substring(i, i + Base64Encoder._lineSeparator.length) ===
          Base64Encoder._lineSeparator
      ) {
        i = i + Base64Encoder._lineSeparator.length - 1;
      } else if (char !== pad) {
        o = alphabet.indexOf(char);

        if (o !== -1) {
          octets.push(o);
        } else if (!foreign) {
          throw new Error(`Character ${char} not found in alphabet`);
        }
      }
    }

    const padSize = (4 - (octets.length % 4)) % 4;

    if (padSize === 3) {
      throw new Error(
        `A single remaining encoded character in the last quadruple or a padding of 3 characters is not allowed`,
      );
    }

    for (let i = 0; i < padSize; i++) {
      octets.push(0);
    }

    const size = (octets.length / 4) * 3;
    let bytes = new Uint8Array(size);
    let j;
    for (let i = 0; i < octets.length; i += 4) {
      j = (i / 4) * 3;
      bytes[j] = (octets[i] << 2) | (octets[i + 1] >> 4);
      bytes[j + 1] = ((octets[i + 1] & 0b001111) << 4) | (octets[i + 2] >> 2);
      bytes[j + 2] = ((octets[i + 2] & 0b000011) << 6) | octets[i + 3];
    }

    bytes = bytes.slice(0, size - padSize);

    return getString(bytes);
  }

  static getVariantsAsArray(): string[] {
    return Array.from(base64Variants);
  }
}
