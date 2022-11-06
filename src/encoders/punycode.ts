import Encoder from '@/src/encoders/encoder';
import {
  codePointToDigit,
  digitToCodePoint,
  getCodePoints,
  stringFromCharCode,
} from '@/src/text';

const maxInt = 0x7fffffff;
const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 0x80;
const delimiter = `-`;
const btMin = base - tMin;

const regexPunycode = /^xn--/;
const regexNonASCII = /[^\0-\x7E]/;
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;

function adapt(d: number, n: number, t: boolean) {
  let k = 0;
  d = t ? Math.floor(d / damp) : d >> 1;
  d += Math.floor(d / n);
  for (; d > (btMin * tMax) >> 1; k += base) {
    d = Math.floor(d / btMin);
  }
  return Math.floor(k + ((btMin + 1) * d) / (d + skew));
}

function pencode(message: string): string {
  const output = [];
  const bytes = getCodePoints(message);
  const len = bytes.length;

  let n = initialN;
  let delta = 0;
  let bias = initialBias;

  for (const val of bytes) {
    if (val < 0x80) {
      output.push(stringFromCharCode(val));
    }
  }

  const basicLen = output.length;
  let handledCodePoints = basicLen;

  if (basicLen) {
    output.push(delimiter);
  }

  while (handledCodePoints < len) {
    let m = maxInt;
    for (const val of bytes) {
      if (val >= n && val < m) {
        m = val;
      }
    }

    const incHandledCodePoints = handledCodePoints + 1;

    if (m - n > Math.floor((maxInt - delta) / incHandledCodePoints)) {
      throw new Error(`Overflow: input needs wider integers to process`);
    }

    delta += (m - n) * incHandledCodePoints;
    n = m;

    for (const val of bytes) {
      if (val < n && ++delta > maxInt) {
        throw new Error(`Overflow: input needs wider integers to process`);
      }

      if (val == n) {
        let q = delta;
        for (let k = base; ; k += base) {
          const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

          if (q < t) {
            break;
          }

          const qt = q - t;
          const bt = base - t;
          output.push(stringFromCharCode(digitToCodePoint(t + (qt % bt), 0)));
          q = Math.floor(qt / bt);
        }

        output.push(stringFromCharCode(digitToCodePoint(q, 0)));
        bias = adapt(
          delta,
          incHandledCodePoints,
          handledCodePoints == basicLen,
        );
        delta = 0;
        handledCodePoints++;
      }
    }

    delta++;
    n++;
  }

  return output.join(``);
}

function map(array: Array<any>, fn: (arg0: any) => any) {
  const result = [];
  let length = array.length;
  while (length--) {
    result[length] = fn(array[length]);
  }
  return result;
}

function mapDomain(string: string, fn: (arg0: string) => string) {
  const parts = string.split(`@`);
  let result = ``;
  if (parts.length > 1) {
    result = parts[0] + `@`;
    string = parts[1];
  }
  string = string.replace(regexSeparators, `\x2E`);
  const labels = string.split(`.`);
  const encoded = map(labels, fn).join(`.`);
  return result + encoded;
}

export default class Punycode extends Encoder {
  encode(message: string): string {
    return mapDomain(message, (str) =>
      regexNonASCII.test(str) ? `xn--` + pencode(str) : str,
    );
  }
  decode(message: string): string {
    return message;
  }
}
