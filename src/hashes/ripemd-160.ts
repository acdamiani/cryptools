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

export default class RIPEMD160 {
  private _opc: number[] = new Array(5);

  op(
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

  ff(opc: number[], x: number, s: number) {
    this.op(opc, f, x, s, 0);
  }

  gg(opc: number[], x: number, s: number) {
    this.op(opc, g, x, s, 0x5a827999);
  }

  hh(opc: number[], x: number, s: number) {
    this.op(opc, h, x, s, 0x6ed9eba1);
  }

  ii(opc: number[], x: number, s: number) {
    this.op(opc, i, x, s, 0x8f1bbcdc);
  }

  jj(opc: number[], x: number, s: number) {
    this.op(opc, j, x, s, 0xa953fd4e);
  }

  fff(opc: number[], x: number, s: number) {
    this.op(opc, f, x, s, 0);
  }

  ggg(opc: number[], x: number, s: number) {
    this.op(opc, g, x, s, 0x7a6d76e9);
  }

  hhh(opc: number[], x: number, s: number) {
    this.op(opc, h, x, s, 0x6d703ef3);
  }

  iii(opc: number[], x: number, s: number) {
    this.op(opc, i, x, s, 0x5c4dd124);
  }

  jjj(opc: number[], x: number, s: number) {
    this.op(opc, j, x, s, 0x50a28be6);
  }

  transform(ctx: number[], blk: number[]) {
    let [a, b, c, d, e] = ctx,
      [aa, bb, cc, dd, ee] = ctx;

    this._opc = [a, b, c, d, e];

    this.ff(this._opc, blk[0], 11);
    this.ff(this._opc, blk[1], 14);
    this.ff(this._opc, blk[2], 15);
    this.ff(this._opc, blk[3], 12);
    this.ff(this._opc, blk[4], 5);
    this.ff(this._opc, blk[5], 8);
    this.ff(this._opc, blk[6], 7);
    this.ff(this._opc, blk[7], 9);
    this.ff(this._opc, blk[8], 11);
    this.ff(this._opc, blk[9], 13);
    this.ff(this._opc, blk[10], 14);
    this.ff(this._opc, blk[11], 15);
    this.ff(this._opc, blk[12], 6);
    this.ff(this._opc, blk[13], 7);
    this.ff(this._opc, blk[14], 9);
    this.ff(this._opc, blk[15], 8);

    this.gg(this._opc, blk[7], 7);
    this.gg(this._opc, blk[4], 6);
    this.gg(this._opc, blk[13], 8);
    this.gg(this._opc, blk[1], 13);
    this.gg(this._opc, blk[10], 11);
    this.gg(this._opc, blk[6], 9);
    this.gg(this._opc, blk[15], 7);
    this.gg(this._opc, blk[3], 15);
    this.gg(this._opc, blk[12], 7);
    this.gg(this._opc, blk[0], 12);
    this.gg(this._opc, blk[9], 15);
    this.gg(this._opc, blk[5], 9);
    this.gg(this._opc, blk[2], 11);
    this.gg(this._opc, blk[14], 7);
    this.gg(this._opc, blk[11], 13);
    this.gg(this._opc, blk[8], 12);

    this.hh(this._opc, blk[3], 11);
    this.hh(this._opc, blk[10], 13);
    this.hh(this._opc, blk[14], 6);
    this.hh(this._opc, blk[4], 7);
    this.hh(this._opc, blk[9], 14);
    this.hh(this._opc, blk[15], 9);
    this.hh(this._opc, blk[8], 13);
    this.hh(this._opc, blk[1], 15);
    this.hh(this._opc, blk[2], 14);
    this.hh(this._opc, blk[7], 8);
    this.hh(this._opc, blk[0], 13);
    this.hh(this._opc, blk[6], 6);
    this.hh(this._opc, blk[13], 5);
    this.hh(this._opc, blk[11], 12);
    this.hh(this._opc, blk[5], 7);
    this.hh(this._opc, blk[12], 5);

    this.ii(this._opc, blk[1], 11);
    this.ii(this._opc, blk[9], 12);
    this.ii(this._opc, blk[11], 14);
    this.ii(this._opc, blk[10], 15);
    this.ii(this._opc, blk[0], 14);
    this.ii(this._opc, blk[8], 15);
    this.ii(this._opc, blk[12], 9);
    this.ii(this._opc, blk[4], 8);
    this.ii(this._opc, blk[13], 9);
    this.ii(this._opc, blk[3], 14);
    this.ii(this._opc, blk[7], 5);
    this.ii(this._opc, blk[15], 6);
    this.ii(this._opc, blk[14], 8);
    this.ii(this._opc, blk[5], 6);
    this.ii(this._opc, blk[6], 5);
    this.ii(this._opc, blk[2], 12);

    this.jj(this._opc, blk[4], 9);
    this.jj(this._opc, blk[0], 15);
    this.jj(this._opc, blk[5], 5);
    this.jj(this._opc, blk[9], 11);
    this.jj(this._opc, blk[7], 6);
    this.jj(this._opc, blk[12], 8);
    this.jj(this._opc, blk[2], 13);
    this.jj(this._opc, blk[10], 12);
    this.jj(this._opc, blk[14], 5);
    this.jj(this._opc, blk[1], 12);
    this.jj(this._opc, blk[3], 13);
    this.jj(this._opc, blk[8], 14);
    this.jj(this._opc, blk[11], 11);
    this.jj(this._opc, blk[6], 8);
    this.jj(this._opc, blk[15], 5);
    this.jj(this._opc, blk[13], 6);

    [a, b, c, d, e] = this._opc;
    this._opc = [aa, bb, cc, dd, ee];

    this.jjj(this._opc, blk[5], 8);
    this.jjj(this._opc, blk[14], 9);
    this.jjj(this._opc, blk[7], 9);
    this.jjj(this._opc, blk[0], 11);
    this.jjj(this._opc, blk[9], 13);
    this.jjj(this._opc, blk[2], 15);
    this.jjj(this._opc, blk[11], 15);
    this.jjj(this._opc, blk[4], 5);
    this.jjj(this._opc, blk[13], 7);
    this.jjj(this._opc, blk[6], 7);
    this.jjj(this._opc, blk[15], 8);
    this.jjj(this._opc, blk[8], 11);
    this.jjj(this._opc, blk[1], 14);
    this.jjj(this._opc, blk[10], 14);
    this.jjj(this._opc, blk[3], 12);
    this.jjj(this._opc, blk[12], 6);

    this.iii(this._opc, blk[6], 9);
    this.iii(this._opc, blk[11], 13);
    this.iii(this._opc, blk[3], 15);
    this.iii(this._opc, blk[7], 7);
    this.iii(this._opc, blk[0], 12);
    this.iii(this._opc, blk[13], 8);
    this.iii(this._opc, blk[5], 9);
    this.iii(this._opc, blk[10], 11);
    this.iii(this._opc, blk[14], 7);
    this.iii(this._opc, blk[15], 7);
    this.iii(this._opc, blk[8], 12);
    this.iii(this._opc, blk[12], 7);
    this.iii(this._opc, blk[4], 6);
    this.iii(this._opc, blk[9], 15);
    this.iii(this._opc, blk[1], 13);
    this.iii(this._opc, blk[2], 11);

    this.hhh(this._opc, blk[15], 9);
    this.hhh(this._opc, blk[5], 7);
    this.hhh(this._opc, blk[1], 15);
    this.hhh(this._opc, blk[3], 11);
    this.hhh(this._opc, blk[7], 8);
    this.hhh(this._opc, blk[14], 6);
    this.hhh(this._opc, blk[6], 6);
    this.hhh(this._opc, blk[9], 14);
    this.hhh(this._opc, blk[11], 12);
    this.hhh(this._opc, blk[8], 13);
    this.hhh(this._opc, blk[12], 5);
    this.hhh(this._opc, blk[2], 14);
    this.hhh(this._opc, blk[10], 13);
    this.hhh(this._opc, blk[0], 13);
    this.hhh(this._opc, blk[4], 7);
    this.hhh(this._opc, blk[13], 5);

    this.ggg(this._opc, blk[8], 15);
    this.ggg(this._opc, blk[6], 5);
    this.ggg(this._opc, blk[4], 8);
    this.ggg(this._opc, blk[1], 11);
    this.ggg(this._opc, blk[3], 14);
    this.ggg(this._opc, blk[11], 14);
    this.ggg(this._opc, blk[15], 6);
    this.ggg(this._opc, blk[0], 14);
    this.ggg(this._opc, blk[5], 6);
    this.ggg(this._opc, blk[12], 9);
    this.ggg(this._opc, blk[2], 12);
    this.ggg(this._opc, blk[13], 9);
    this.ggg(this._opc, blk[9], 12);
    this.ggg(this._opc, blk[7], 5);
    this.ggg(this._opc, blk[10], 15);
    this.ggg(this._opc, blk[14], 8);

    this.fff(this._opc, blk[12], 8);
    this.fff(this._opc, blk[15], 5);
    this.fff(this._opc, blk[10], 12);
    this.fff(this._opc, blk[4], 9);
    this.fff(this._opc, blk[1], 12);
    this.fff(this._opc, blk[5], 5);
    this.fff(this._opc, blk[8], 14);
    this.fff(this._opc, blk[7], 6);
    this.fff(this._opc, blk[6], 8);
    this.fff(this._opc, blk[2], 13);
    this.fff(this._opc, blk[13], 6);
    this.fff(this._opc, blk[14], 5);
    this.fff(this._opc, blk[0], 15);
    this.fff(this._opc, blk[3], 13);
    this.fff(this._opc, blk[9], 11);
    this.fff(this._opc, blk[11], 11);

    [aa, bb, cc, dd, ee] = this._opc;

    dd += c + ctx[1];
    ctx[1] = ctx[2] + d + ee;
    ctx[2] = ctx[3] + e + aa;
    ctx[3] = ctx[4] + a + bb;
    ctx[4] = ctx[0] + b + cc;
    ctx[0] = dd;
  }

  hash(bytes: Uint8Array): Uint8Array {
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
      // MIGHT BE WRONG
      this.transform(ibuf, m.slice(j, j + 16));
    }

    const l = mutBytes.length % 64;

    const msg = mutBytes.slice(b - l, b);
    const x = new Uint32Array(16);

    for (let i = 0; i < (b & 63); i++) {
      x[i >> 2] ^= msg[i] << (8 * (i & 3));
    }

    // console.log(x);

    x[(b >> 2) & 15] ^= 1 << (8 * (b & 3) + 7);

    if ((b & 63) > 55) {
      this.transform(ibuf, Array.from(x));
      x.fill(0);
    }

    x[14] = b << 3;
    x[15] = (b >> 29) | 0;

    this.transform(ibuf, Array.from(x));

    // console.log(ibuf);

    const res = new Array(20);
    for (let i = 0; i < 20; i += 4) {
      res[i] = ibuf[i >> 2];
      res[i + 1] = ibuf[i >> 2] >> 8;
      res[i + 2] = ibuf[i >> 2] >> 16;
      res[i + 3] = ibuf[i >> 2] >> 24;
    }

    return new Uint8Array(res);
  }
}
