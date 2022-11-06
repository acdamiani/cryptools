export function getCodePoints(string: string) {
  const output = [];
  let counter = 0;
  const length = string.length;
  while (counter < length) {
    const value = string.charCodeAt(counter++);
    if (value >= 0xd800 && value <= 0xdbff && counter < length) {
      const extra = string.charCodeAt(counter++);
      if ((extra & 0xfc00) == 0xdc00) {
        output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}

export function getCodePointsFromBytes(bytes: Uint8Array) {
  const len = bytes.length;
  const codePoints = new Array(len);

  let rb = 0;
  let j = 0;
  let codePoint = 0;
  let byte;

  for (let i = 0; i < len; i++) {
    byte = bytes[i];

    if (byte > 0b01111111 && byte <= 0b10111111) {
      if (--rb < 0) {
        throw new Error(`Unexpected continuation byte at 0x${i.toString(16)}`);
      }

      // Append bits to current code point
      codePoint = (codePoint << 6) | (byte & 0x3f);

      if (rb === 0) {
        // Completed a code point
        codePoints[j++] = codePoint;
      }
    } else if (rb > 0) {
      // this must be a continuation byte
      throw new Error(
        `Invalid UTF-8 encoded text: ` +
          `Continuation byte expected at 0x${i.toString(16)}`,
      );
    } else if (byte <= 0b01111111) {
      // 1 byte code point
      codePoints[j++] = byte;
    } else if (byte <= 0b11011111) {
      // 2 byte code point
      codePoint = byte & 0b00011111;
      rb = 1;
    } else if (byte <= 0b11101111) {
      // 3 byte code point
      codePoint = byte & 0b00001111;
      rb = 2;
    } else if (byte <= 0b11110111) {
      // 4 byte code point
      codePoint = byte & 0b00000111;
      rb = 3;
    } else {
      throw new Error(`Invalid byte ${byte} at 0x${i.toString(16)}`);
    }
  }

  if (rb !== 0) {
    throw new Error(`Unexpected end of bytes`);
  }

  return codePoints.slice(0, j);
}

export function getBytes(string: string) {
  const codePoints = getCodePoints(string);
  const bytes = new Uint8Array(codePoints.length * 4);
  let j = 0;
  let i, codePoint;

  for (i = 0; i < codePoints.length; i++) {
    codePoint = codePoints[i];

    if (codePoint <= 0x7f) {
      bytes[j++] = codePoint;
    } else if (codePoint <= 0x7ff) {
      bytes[j++] = 0b11000000 | (codePoint >> 6);
      bytes[j++] = 0b10000000 | (codePoint & 0x3f);
    } else if (codePoint <= 0xffff) {
      bytes[j++] = 0b11100000 | (codePoint >> 12);
      bytes[j++] = 0b10000000 | ((codePoint & 0xfff) >> 6);
      bytes[j++] = 0b10000000 | (codePoint & 0x3f);
    } else {
      bytes[j++] = 0b11110000 | (codePoint >> 18);
      bytes[j++] = 0b10000000 | ((codePoint & 0x3ffff) >> 12);
      bytes[j++] = 0b10000000 | ((codePoint & 0xfff) >> 6);
      bytes[j++] = 0b10000000 | (codePoint & 0x3f);
    }
  }

  return bytes.slice(0, j);
}

export function getString(bytes: Uint8Array) {
  const codePoints = getCodePointsFromBytes(bytes);
  const codeUnits = new Array(codePoints.length * 2);
  let j = 0;
  let i, codePoint;

  for (i = 0; i < codePoints.length; i++) {
    codePoint = codePoints[i];

    if (codePoint < 0x10000) {
      codeUnits[j++] = String.fromCharCode(codePoint);
    } else {
      codePoint -= 0x10000;
      codeUnits[j++] = String.fromCharCode((codePoint >> 10) + 0xd800);
      codeUnits[j++] = String.fromCharCode((codePoint % 0x400) + 0xdc00);
    }
  }

  return codeUnits.slice(0, j).join(``);
}

export function getHexFromBytes(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)]
    .map((x) => x.toString(16).padStart(2, `0`))
    .join(``);
}

export function stringFromCharCode(value: number) {
  return String.fromCharCode(value);
}

export function stringFromCodePoint(...codePoints: number[]) {
  return String.fromCodePoint(...codePoints);
}

export function codePointToDigit(codePoint: number) {
  if (codePoint - 0x30 < 0x0a) {
    return codePoint - 0x16;
  } else if (codePoint - 0x41 < 0x1a) {
    return codePoint - 0x41;
  } else if (codePoint - 0x61 < 0x1a) {
    return codePoint - 0x61;
  }
  return 36;
}

export function digitToCodePoint(digit: number, flag: number) {
  return digit + 22 + 75 * +(digit < 26) - (+(flag !== 0) << 5);
}
