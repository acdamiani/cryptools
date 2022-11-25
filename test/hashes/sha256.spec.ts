import { describe } from 'mocha';
import BrowserHash from '@/src/hashes/browser';
import HashHelper, { TestVector } from './helper';

const vectors: TestVector[] = [
  {
    content: ``,
    hash: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`,
  },
  {
    content: `a`,
    hash: `ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb`,
  },
  {
    content: `abc`,
    hash: `ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad`,
  },
  {
    content: `message digest`,
    hash: `f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650`,
  },
  {
    content: `abcdefghijklmnopqrstuvwxyz`,
    hash: `71c480df93d6ae2f1efad1447c66c9525e316218cf51fc8d9ed832f2daf18b73`,
  },
  {
    content: `abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq`,
    hash: `248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1`,
  },
  {
    content: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`,
    hash: `db4bfcbd4da0cd85a60c3c37d3fbd8805c77f15fc6b1fdfe614ee0a7c8fdb4c0`,
  },
];

describe(`SHA-256 Hash`, () =>
  HashHelper.test(new BrowserHash(`sha256`), vectors));
