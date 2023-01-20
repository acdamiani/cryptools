import { describe } from 'mocha';
import MD5Hash from '@/src/hashes/md5';
import HashTestHelper, { HashTestVector } from './helper';

const vector: HashTestVector = [
  {
    content: ``,
    hash: `d41d8cd98f00b204e9800998ecf8427e`,
  },
  {
    content: `a`,
    hash: `0cc175b9c0f1b6a831c399e269772661`,
  },
  {
    content: `abc`,
    hash: `900150983cd24fb0d6963f7d28e17f72`,
  },
  {
    content: `message digest`,
    hash: `f96b697d7cb7938d525a2f31aaf161d0`,
  },
  {
    content: `abcdefghijklmnopqrstuvwxyz`,
    hash: `c3fcd3d76192e4007dfb496cca67e13b`,
  },
  {
    content: `abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq`,
    hash: `8215ef0796a20bcaaae116d3876c664a`,
  },
  {
    content: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`,
    hash: `d174ab98d277d9f5a5611c2c9f419d9f`,
  },
];

describe(`MD5 Hash`, () => HashTestHelper.test(new MD5Hash(), vector));
