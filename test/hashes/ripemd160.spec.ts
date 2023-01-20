import { describe } from 'mocha';
import RIPEMD160Hash from '@/src/hashes/ripemd160';
import HashTestHelper, { HashTestVector } from './helper';

const vector: HashTestVector = [
  {
    content: ``,
    hash: `9c1185a5c5e9fc54612808977ee8f548b2258d31`,
  },
  {
    content: `a`,
    hash: `0bdc9d2d256b3ee9daae347be6f4dc835a467ffe`,
  },
  {
    content: `abc`,
    hash: `8eb208f7e05d987a9b044a8e98c6b087f15a0bfc`,
  },
  {
    content: `message digest`,
    hash: `5d0689ef49d2fae572b881b123a85ffa21595f36`,
  },
  {
    content: `abcdefghijklmnopqrstuvwxyz`,
    hash: `f71c27109c692c1b56bbdceb5b9d2865b3708dbc`,
  },
  {
    content: `abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq`,
    hash: `12a053384a9c0c88e405a06c27dcf49ada62eb2b`,
  },
  {
    content: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`,
    hash: `b0e20b6e3116640286ed3a87a5713079b21f5189`,
  },
];

describe(`RIPEMD-160 Hash`, () =>
  HashTestHelper.test(new RIPEMD160Hash(), vector));
