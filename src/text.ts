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

export function getHexFromBytes(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)]
    .map((x) => x.toString(16).padStart(2, `0`))
    .join(``);
}

export function stringFromCharCode(value: number) {
  return String.fromCharCode(value);
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
