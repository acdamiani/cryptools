import { describe, it } from 'mocha';
import assert from 'assert';
import Hash from '@/src/hashes/hash';

export type TestVector = {
  content: string;
  hash: string;
};

export default class HashHelper {
  static test(instance: Hash, vectors: TestVector[]) {
    describe(`hash()`, () => {
      vectors.forEach((v) => {
        it(`should hash ${v.content === `` ? `<empty string>` : v.content} => ${
          v.hash
        }`, async () => {
          return instance
            .hash(v.content)
            .then((hash) => assert.strictEqual(hash, v.hash));
        });
      });
    });
  }
}
