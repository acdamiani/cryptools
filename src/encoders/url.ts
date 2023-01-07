import Encoder from '@/src/encoders/encoder';
import { getBytesFromCodePoints, getCodePoints, getString } from '../text';

const unreserved = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~`;

export default class UrlEncoder extends Encoder {
  private static _reTextHex = /^[a-fA-F0-9]+$/;

  encode(message: string): string {
    let ret = ``;

    const codePoints = getCodePoints(message);

    for (let i = 0; i < codePoints.length; i++) {
      const codePoint = codePoints[i];
      const bytes = getBytesFromCodePoints([codePoint]);
      const char = getString(bytes);

      if (unreserved.indexOf(char) === -1) {
        let encoded = ``;
        for (let j = 0; j < bytes.length; j++) {
          encoded += `%${bytes[j].toString(16).padStart(2, `0`).toUpperCase()}`;
        }
        ret += encoded;
      } else {
        ret += char;
      }
    }

    return ret;
  }
  decode(message: string): string {
    const bytes: number[] = [];

    for (let i = 0; i < message.length; ) {
      const char = message[i];

      if (char === `%`) {
        const byteString = message.substring(i + 1, i + 3);
        if (!UrlEncoder._reTextHex.test(byteString)) {
          throw new Error(
            `Percent encoded byte '%${byteString}' at message index ${i} is not in hexadecimal form`,
          );
        }
        bytes.push(parseInt(byteString, 16));
        i += 3;
      } else if (char === `+`) {
        bytes.push(32);
        i++;
      } else if (unreserved.indexOf(char) !== -1) {
        bytes.push(char.charCodeAt(0));
        i++;
      } else {
        throw new Error(
          `Invalid URL character '${char}' at message index ${i}`,
        );
      }
    }

    return decodeURIComponent(message);
  }
}
