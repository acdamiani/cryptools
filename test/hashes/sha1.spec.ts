import { describe } from 'mocha';
import BrowserHash from '@/src/hashes/browser';
import HashHelper, { TestVector } from './helper';

const vectors: TestVector[] = [
  {
    content: ``,
    hash: `da39a3ee5e6b4b0d3255bfef95601890afd80709`,
  },
  {
    content: `a`,
    hash: `86f7e437faa5a7fce15d1ddcb9eaeaea377667b8`,
  },
  {
    content: `abc`,
    hash: `a9993e364706816aba3e25717850c26c9cd0d89d`,
  },
  {
    content: `message digest`,
    hash: `c12252ceda8be8994d5fa0290a47231c1d16aae3`,
  },
  {
    content: `abcdefghijklmnopqrstuvwxyz`,
    hash: `32d10c7b8cf96570ca04ce37f2a19d84240d3a89`,
  },
  {
    content: `abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq`,
    hash: `84983e441c3bd26ebaae4aa1f95129e5e54670f1`,
  },
  {
    content: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`,
    hash: `761c457bf73b14d27e9e9265c46f4b4dda11f940`,
  },
];

describe(`SHA-1 Hash`, () => HashHelper.test(new BrowserHash(`sha1`), vectors));
