import { describe } from 'mocha';
import HashHelper, { TestVector } from './helper';
import BrowserHash from '@/src/hashes/browser';

const vectors: TestVector[] = [
  {
    content: ``,
    hash: `cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e`,
  },
  {
    content: `a`,
    hash: `1f40fc92da241694750979ee6cf582f2d5d7d28e18335de05abc54d0560e0f5302860c652bf08d560252aa5e74210546f369fbbbce8c12cfc7957b2652fe9a75`,
  },
  {
    content: `abc`,
    hash: `ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f`,
  },
  {
    content: `message digest`,
    hash: `107dbf389d9e9f71a3a95f6c055b9251bc5268c2be16d6c13492ea45b0199f3309e16455ab1e96118e8a905d5597b72038ddb372a89826046de66687bb420e7c`,
  },
  {
    content: `abcdefghijklmnopqrstuvwxyz`,
    hash: `4dbff86cc2ca1bae1e16468a05cb9881c97f1753bce3619034898faa1aabe429955a1bf8ec483d7421fe3c1646613a59ed5441fb0f321389f77f48a879c7b1f1`,
  },
  {
    content: `abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq`,
    hash: `204a8fc6dda82f0a0ced7beb8e08a41657c16ef468b228a8279be331a703c33596fd15c13b1b07f9aa1d3bea57789ca031ad85c7a71dd70354ec631238ca3445`,
  },
  {
    content: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`,
    hash: `1e07be23c26a86ea37ea810c8ec7809352515a970e9253c26f536cfc7a9996c45c8370583e0a78fa4a90041d71a4ceab7423f19c71b9d5a3e01249f0bebd5894`,
  },
];

describe(`SHA-512 Hash`, () =>
  HashHelper.test(new BrowserHash(`sha512`), vectors));
