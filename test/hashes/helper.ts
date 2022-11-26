import { describe, it } from 'mocha';
import assert from 'assert';
import Hash from '@/src/hashes/hash';
import TestUtil from 'test/util';

export type TestVector = {
  content: string;
  hash: string;
};

export default class HashHelper {
  static test(instance: Hash, vectors: TestVector[]) {
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
