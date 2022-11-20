import Encoder from '@/src/encoders/encoder';
import { getBytes, getCodePoints, getString } from '../text';

export default class Base32Encoder extends Encoder {
  _alphabet: string;

  constructor(
    alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,
  ) {
    super();

    if (alphabet.length !== 64) {
      throw new Error(`Alphabet should be exactly 64 characters long`);
    } else if (String.prototype.concat(...new Set(alphabet)) !== alphabet) {
      throw new Error(`All alphabet characters should be unique`);
    }

    this._alphabet = alphabet;
  }

  encode(message: string): string {
    return message;
  }

  decode(message: string): string {
    const pad = `=`;
    const length = message.length;
    const octets = [];
    let char, o;

    for (let i = 0; i < length; i++) {
      char = message[i];

      if (char !== pad) {
        o = this._alphabet.indexOf(char);

        if (o !== -1) {
          octets.push(o);
        } else {
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
}