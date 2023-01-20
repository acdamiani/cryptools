import { describe, it } from 'mocha';
import assert from 'assert';
import Hash from '@/src/hashes/hash';
import TestUtil from 'test/util';

export type HashTestVector = {
  content: string;
  hash: string;
}[];

export default class HashTestHelper {
  static test(instance: Hash, vectors: HashTestVector) {
    describe(`hash()`, () => {
      vectors.forEach((v) => {
        it(`should hash ${TestUtil.preview(v.content)} -> ${TestUtil.preview(
          v.hash,
        )}`, async () => {
          return instance
            .hash(v.content)
            .then((hash) => assert.strictEqual(hash, v.hash));
        });
      });
    });
  }
}
