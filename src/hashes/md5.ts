import Hash from './hash';

const WA = 0x67452301;
const WB = 0xefcdab89;
const WC = 0x98badcfe;
const WD = 0x10325476;

const S11 = 7;
const S12 = 12;
const S13 = 17;
const S14 = 22;
const S21 = 5;
const S22 = 9;
const S23 = 14;
const S24 = 20;
const S31 = 4;
const S32 = 11;
const S33 = 16;
const S34 = 23;
const S41 = 6;
const S42 = 10;
const S43 = 15;
const S44 = 21;

function add32(a: number, b: number) {
  return (a + b) & 0xffffffff;
}

function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
  a = add32(add32(a, q), add32(x, t));
  return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
) {
  return cmn((b & c) | (~b & d), a, b, x, s, t);
}

function gg(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
) {
  return cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function hh(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number,
) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

function transform(ctx: number[], blk: number[]) {
  let [a, b, c, d] = ctx;

  a = ff(a, b, c, d, blk[0], S11, 0xd76aa478);
  d = ff(d, a, b, c, blk[1], S12, 0xe8c7b756);
  c = ff(c, d, a, b, blk[2], S13, 0x242070db);
  b = ff(b, c, d, a, blk[3], S14, 0xc1bdceee);
  a = ff(a, b, c, d, blk[4], S11, 0xf57c0faf);
  d = ff(d, a, b, c, blk[5], S12, 0x4787c62a);
  c = ff(c, d, a, b, blk[6], S13, 0xa8304613);
  b = ff(b, c, d, a, blk[7], S14, 0xfd469501);
  a = ff(a, b, c, d, blk[8], S11, 0x698098d8);
  d = ff(d, a, b, c, blk[9], S12, 0x8b44f7af);
  c = ff(c, d, a, b, blk[10], S13, 0xffff5bb1);
  b = ff(b, c, d, a, blk[11], S14, 0x895cd7be);
  a = ff(a, b, c, d, blk[12], S11, 0x6b901122);
  d = ff(d, a, b, c, blk[13], S12, 0xfd987193);
  c = ff(c, d, a, b, blk[14], S13, 0xa679438e);
  b = ff(b, c, d, a, blk[15], S14, 0x49b40821);

  a = gg(a, b, c, d, blk[1], S21, 0xf61e2562);
  d = gg(d, a, b, c, blk[6], S22, 0xc040b340);
  c = gg(c, d, a, b, blk[11], S23, 0x265e5a51);
  b = gg(b, c, d, a, blk[0], S24, 0xe9b6c7aa);
  a = gg(a, b, c, d, blk[5], S21, 0xd62f105d);
  d = gg(d, a, b, c, blk[10], S22, 0x02441453);
  c = gg(c, d, a, b, blk[15], S23, 0xd8a1e681);
  b = gg(b, c, d, a, blk[4], S24, 0xe7d3fbc8);
  a = gg(a, b, c, d, blk[9], S21, 0x21e1cde6);
  d = gg(d, a, b, c, blk[14], S22, 0xc33707d6);
  c = gg(c, d, a, b, blk[3], S23, 0xf4d50d87);
  b = gg(b, c, d, a, blk[8], S24, 0x455a14ed);
  a = gg(a, b, c, d, blk[13], S21, 0xa9e3e905);
  d = gg(d, a, b, c, blk[2], S22, 0xfcefa3f8);
  c = gg(c, d, a, b, blk[7], S23, 0x676f02d9);
  b = gg(b, c, d, a, blk[12], S24, 0x8d2a4c8a);

  a = hh(a, b, c, d, blk[5], S31, 0xfffa3942);
  d = hh(d, a, b, c, blk[8], S32, 0x8771f681);
  c = hh(c, d, a, b, blk[11], S33, 0x6d9d6122);
  b = hh(b, c, d, a, blk[14], S34, 0xfde5380c);
  a = hh(a, b, c, d, blk[1], S31, 0xa4beea44);
  d = hh(d, a, b, c, blk[4], S32, 0x4bdecfa9);
  c = hh(c, d, a, b, blk[7], S33, 0xf6bb4b60);
  b = hh(b, c, d, a, blk[10], S34, 0xbebfbc70);
  a = hh(a, b, c, d, blk[13], S31, 0x289b7ec6);
  d = hh(d, a, b, c, blk[0], S32, 0xeaa127fa);
  c = hh(c, d, a, b, blk[3], S33, 0xd4ef3085);
  b = hh(b, c, d, a, blk[6], S34, 0x04881d05);
  a = hh(a, b, c, d, blk[9], S31, 0xd9d4d039);
  d = hh(d, a, b, c, blk[12], S32, 0xe6db99e5);
  c = hh(c, d, a, b, blk[15], S33, 0x1fa27cf8);
  b = hh(b, c, d, a, blk[2], S34, 0xc4ac5665);

  a = ii(a, b, c, d, blk[0], S41, 0xf4292244);
  d = ii(d, a, b, c, blk[7], S42, 0x432aff97);
  c = ii(c, d, a, b, blk[14], S43, 0xab9423a7);
  b = ii(b, c, d, a, blk[5], S44, 0xfc93a039);
  a = ii(a, b, c, d, blk[12], S41, 0x655b59c3);
  d = ii(d, a, b, c, blk[3], S42, 0x8f0ccc92);
  c = ii(c, d, a, b, blk[10], S43, 0xffeff47d);
  b = ii(b, c, d, a, blk[1], S44, 0x85845dd1);
  a = ii(a, b, c, d, blk[8], S41, 0x6fa87e4f);
  d = ii(d, a, b, c, blk[15], S42, 0xfe2ce6e0);
  c = ii(c, d, a, b, blk[6], S43, 0xa3014314);
  b = ii(b, c, d, a, blk[13], S44, 0x4e0811a1);
  a = ii(a, b, c, d, blk[4], S41, 0xf7537e82);
  d = ii(d, a, b, c, blk[11], S42, 0xbd3af235);
  c = ii(c, d, a, b, blk[2], S43, 0x2ad7d2bb);
  b = ii(b, c, d, a, blk[9], S44, 0xeb86d391);

  ctx[0] = add32(a, ctx[0]);
  ctx[1] = add32(b, ctx[1]);
  ctx[2] = add32(c, ctx[2]);
  ctx[3] = add32(d, ctx[3]);
}

export default class MD5 extends Hash {
  protected _hashBytes(bytes: Uint8Array): Promise<Uint8Array> {
    const mutBytes = Array.from(bytes);
    const b = mutBytes.length;

    mutBytes.push(0b10000000);
    while (mutBytes.length % 64 !== 56) mutBytes.push(0x00);

    let shift: number;
    for (let i = 0; i < 8; i++) {
      if (i === 0) {
        // mul result by 8
        mutBytes.push((b & 0b11111) << 3);
      } else {
        shift = i * 8 - 3;
        mutBytes.push(shift < 32 ? (b >> shift) & 0xff : 0);
      }
    }

    const n = mutBytes.length / 4;
    const m = new Array(n);

    for (let i = 0; i < n; i++) {
      m[i] =
        (mutBytes[i * 4 + 3] << 24) +
        (mutBytes[i * 4 + 2] << 16) +
        (mutBytes[i * 4 + 1] << 8) +
        mutBytes[i * 4];
    }

    const ibuf = [WA, WB, WC, WD];

    for (let i = 0; i < n; i += 16) {
      transform(ibuf, m.slice(i, i + 16));
    }

    const res = new Array(16);
    for (let i = 0, j = 0; j < 16; i++, j += 4) {
      res[j] = ibuf[i] & 0xff;
      res[j + 1] = (ibuf[i] >> 8) & 0xff;
      res[j + 2] = (ibuf[i] >> 16) & 0xff;
      res[j + 3] = (ibuf[i] >> 24) & 0xff;
    }

    return new Promise((resolve) => resolve(new Uint8Array(res)));
  }
}
