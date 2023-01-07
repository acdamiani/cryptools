import Hash from './hash';

const WA = 0x67452301;
const WB = 0xefcdab89;
const WC = 0x98badcfe;
const WD = 0x10325476;
const WE = 0xc3d2e1f0;

function rol(x: number, n: number) {
  return (x << n) | (x >>> (32 - n));
}

function f(x: number, y: number, z: number) {
  return x ^ y ^ z;
}

function g(x: number, y: number, z: number) {
  return (x & y) | (~x & z);
}

function h(x: number, y: number, z: number) {
  return (x | ~y) ^ z;
}

function i(x: number, y: number, z: number) {
  return (x & z) | (y & ~z);
}

function j(x: number, y: number, z: number) {
  return x ^ (y | ~z);
}

function op(
  opc: number[],
  n: (x: number, y: number, z: number) => number,
  x: number,
  s: number,
  c: number,
) {
  opc[0] += n(opc[1], opc[2], opc[3]) + x + c;
  opc[0] = (rol(opc[0], s) + opc[4]) >>> 0;
  opc[2] = rol(opc[2], 10) >>> 0;

  opc.unshift(opc.pop() as number);
}

function ff(opc: number[], x: number, s: number) {
  op(opc, f, x, s, 0);
}

function gg(opc: number[], x: number, s: number) {
  op(opc, g, x, s, 0x5a827999);
}

function hh(opc: number[], x: number, s: number) {
  op(opc, h, x, s, 0x6ed9eba1);
}

function ii(opc: number[], x: number, s: number) {
  op(opc, i, x, s, 0x8f1bbcdc);
}

function jj(opc: number[], x: number, s: number) {
  op(opc, j, x, s, 0xa953fd4e);
}

function fff(opc: number[], x: number, s: number) {
  op(opc, f, x, s, 0);
}

function ggg(opc: number[], x: number, s: number) {
  op(opc, g, x, s, 0x7a6d76e9);
}

function hhh(opc: number[], x: number, s: number) {
  op(opc, h, x, s, 0x6d703ef3);
}

function iii(opc: number[], x: number, s: number) {
  op(opc, i, x, s, 0x5c4dd124);
}

function jjj(opc: number[], x: number, s: number) {
  op(opc, j, x, s, 0x50a28be6);
}

export default class RIPEMD160Hash extends Hash {
  private _transform(ctx: number[], blk: number[]) {
    let [a, b, c, d, e] = ctx,
      [aa, bb, cc, dd, ee] = ctx;

    let opc = [a, b, c, d, e];

    ff(opc, blk[0], 11);
    ff(opc, blk[1], 14);
    ff(opc, blk[2], 15);
    ff(opc, blk[3], 12);
    ff(opc, blk[4], 5);
    ff(opc, blk[5], 8);
    ff(opc, blk[6], 7);
    ff(opc, blk[7], 9);
    ff(opc, blk[8], 11);
    ff(opc, blk[9], 13);
    ff(opc, blk[10], 14);
    ff(opc, blk[11], 15);
    ff(opc, blk[12], 6);
    ff(opc, blk[13], 7);
    ff(opc, blk[14], 9);
    ff(opc, blk[15], 8);

    gg(opc, blk[7], 7);
    gg(opc, blk[4], 6);
    gg(opc, blk[13], 8);
    gg(opc, blk[1], 13);
    gg(opc, blk[10], 11);
    gg(opc, blk[6], 9);
    gg(opc, blk[15], 7);
    gg(opc, blk[3], 15);
    gg(opc, blk[12], 7);
    gg(opc, blk[0], 12);
    gg(opc, blk[9], 15);
    gg(opc, blk[5], 9);
    gg(opc, blk[2], 11);
    gg(opc, blk[14], 7);
    gg(opc, blk[11], 13);
    gg(opc, blk[8], 12);

    hh(opc, blk[3], 11);
    hh(opc, blk[10], 13);
    hh(opc, blk[14], 6);
    hh(opc, blk[4], 7);
    hh(opc, blk[9], 14);
    hh(opc, blk[15], 9);
    hh(opc, blk[8], 13);
    hh(opc, blk[1], 15);
    hh(opc, blk[2], 14);
    hh(opc, blk[7], 8);
    hh(opc, blk[0], 13);
    hh(opc, blk[6], 6);
    hh(opc, blk[13], 5);
    hh(opc, blk[11], 12);
    hh(opc, blk[5], 7);
    hh(opc, blk[12], 5);

    ii(opc, blk[1], 11);
    ii(opc, blk[9], 12);
    ii(opc, blk[11], 14);
    ii(opc, blk[10], 15);
    ii(opc, blk[0], 14);
    ii(opc, blk[8], 15);
    ii(opc, blk[12], 9);
    ii(opc, blk[4], 8);
    ii(opc, blk[13], 9);
    ii(opc, blk[3], 14);
    ii(opc, blk[7], 5);
    ii(opc, blk[15], 6);
    ii(opc, blk[14], 8);
    ii(opc, blk[5], 6);
    ii(opc, blk[6], 5);
    ii(opc, blk[2], 12);

    jj(opc, blk[4], 9);
    jj(opc, blk[0], 15);
    jj(opc, blk[5], 5);
    jj(opc, blk[9], 11);
    jj(opc, blk[7], 6);
    jj(opc, blk[12], 8);
    jj(opc, blk[2], 13);
    jj(opc, blk[10], 12);
    jj(opc, blk[14], 5);
    jj(opc, blk[1], 12);
    jj(opc, blk[3], 13);
    jj(opc, blk[8], 14);
    jj(opc, blk[11], 11);
    jj(opc, blk[6], 8);
    jj(opc, blk[15], 5);
    jj(opc, blk[13], 6);

    [a, b, c, d, e] = opc;
    opc = [aa, bb, cc, dd, ee];

    jjj(opc, blk[5], 8);
    jjj(opc, blk[14], 9);
    jjj(opc, blk[7], 9);
    jjj(opc, blk[0], 11);
    jjj(opc, blk[9], 13);
    jjj(opc, blk[2], 15);
    jjj(opc, blk[11], 15);
    jjj(opc, blk[4], 5);
    jjj(opc, blk[13], 7);
    jjj(opc, blk[6], 7);
    jjj(opc, blk[15], 8);
    jjj(opc, blk[8], 11);
    jjj(opc, blk[1], 14);
    jjj(opc, blk[10], 14);
    jjj(opc, blk[3], 12);
    jjj(opc, blk[12], 6);

    iii(opc, blk[6], 9);
    iii(opc, blk[11], 13);
    iii(opc, blk[3], 15);
    iii(opc, blk[7], 7);
    iii(opc, blk[0], 12);
    iii(opc, blk[13], 8);
    iii(opc, blk[5], 9);
    iii(opc, blk[10], 11);
    iii(opc, blk[14], 7);
    iii(opc, blk[15], 7);
    iii(opc, blk[8], 12);
    iii(opc, blk[12], 7);
    iii(opc, blk[4], 6);
    iii(opc, blk[9], 15);
    iii(opc, blk[1], 13);
    iii(opc, blk[2], 11);

    hhh(opc, blk[15], 9);
    hhh(opc, blk[5], 7);
    hhh(opc, blk[1], 15);
    hhh(opc, blk[3], 11);
    hhh(opc, blk[7], 8);
    hhh(opc, blk[14], 6);
    hhh(opc, blk[6], 6);
    hhh(opc, blk[9], 14);
    hhh(opc, blk[11], 12);
    hhh(opc, blk[8], 13);
    hhh(opc, blk[12], 5);
    hhh(opc, blk[2], 14);
    hhh(opc, blk[10], 13);
    hhh(opc, blk[0], 13);
    hhh(opc, blk[4], 7);
    hhh(opc, blk[13], 5);

    ggg(opc, blk[8], 15);
    ggg(opc, blk[6], 5);
    ggg(opc, blk[4], 8);
    ggg(opc, blk[1], 11);
    ggg(opc, blk[3], 14);
    ggg(opc, blk[11], 14);
    ggg(opc, blk[15], 6);
    ggg(opc, blk[0], 14);
    ggg(opc, blk[5], 6);
    ggg(opc, blk[12], 9);
    ggg(opc, blk[2], 12);
    ggg(opc, blk[13], 9);
    ggg(opc, blk[9], 12);
    ggg(opc, blk[7], 5);
    ggg(opc, blk[10], 15);
    ggg(opc, blk[14], 8);

    fff(opc, blk[12], 8);
    fff(opc, blk[15], 5);
    fff(opc, blk[10], 12);
    fff(opc, blk[4], 9);
    fff(opc, blk[1], 12);
    fff(opc, blk[5], 5);
    fff(opc, blk[8], 14);
    fff(opc, blk[7], 6);
    fff(opc, blk[6], 8);
    fff(opc, blk[2], 13);
    fff(opc, blk[13], 6);
    fff(opc, blk[14], 5);
    fff(opc, blk[0], 15);
    fff(opc, blk[3], 13);
    fff(opc, blk[9], 11);
    fff(opc, blk[11], 11);

    [aa, bb, cc, dd, ee] = opc;

    dd += c + ctx[1];
    ctx[1] = ctx[2] + d + ee;
    ctx[2] = ctx[3] + e + aa;
    ctx[3] = ctx[4] + a + bb;
    ctx[4] = ctx[0] + b + cc;
    ctx[0] = dd;
  }

  protected _hashBytes(bytes: Uint8Array): Promise<Uint8Array> {
    const mutBytes = Array.from(bytes);
    const b = mutBytes.length;

    const n = Math.floor(mutBytes.length / 4);
    const m = new Array(n);

    for (let i = 0; i < n; i++) {
      m[i] =
        (mutBytes[i * 4 + 3] << 24) +
        (mutBytes[i * 4 + 2] << 16) +
        (mutBytes[i * 4 + 1] << 8) +
        mutBytes[i * 4];
    }

    const ibuf = [WA, WB, WC, WD, WE];

    for (let i = b, j = 0; i > 63; i -= 64, j += 16) {
      this._transform(ibuf, m.slice(j, j + 16));
    }

    const l = mutBytes.length % 64;

    const msg = mutBytes.slice(b - l, b);
    const x = new Uint32Array(16);

    for (let i = 0; i < (b & 63); i++) {
      x[i >> 2] ^= msg[i] << (8 * (i & 3));
    }

    x[(b >> 2) & 15] ^= 1 << (8 * (b & 3) + 7);

    if ((b & 63) > 55) {
      this._transform(ibuf, Array.from(x));
      x.fill(0);
    }

    x[14] = b << 3;
    x[15] = (b >> 29) | 0;

    this._transform(ibuf, Array.from(x));

    const res = new Array(20);
    for (let i = 0; i < 20; i += 4) {
      res[i] = ibuf[i >> 2];
      res[i + 1] = ibuf[i >> 2] >> 8;
      res[i + 2] = ibuf[i >> 2] >> 16;
      res[i + 3] = ibuf[i >> 2] >> 24;
    }

    return new Promise((resolve) => resolve(new Uint8Array(res)));
  }
}
