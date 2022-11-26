import { describe, it } from 'mocha';
import assert from 'assert';
import Encoder from '@/src/encoders/encoder';
import TestUtil from 'test/util';

export type TestVector = {
  content: string;
  encoded: string;
};

export default class EncoderHelper {
  static test(instance: Encoder, vectors: TestVector[]) {
    describe(`encode()`, () => {
      vectors.forEach((v) => {
        const tcontent = TestUtil.preview(v.content);
        const tencoded = TestUtil.preview(v.encoded);
        it(`should encode ${tcontent} -> ${tencoded}`, () => {
          assert.strictEqual(instance.encode(v.content), v.encoded);
        });
      });
    });
    describe(`decode()`, () => {
      vectors.forEach((v) => {
        const tcontent = TestUtil.preview(v.content);
        const tencoded = TestUtil.preview(v.encoded);
        it(`should decode ${tencoded} -> ${tcontent}`, () => {
          assert.strictEqual(instance.decode(v.encoded), v.content);
        });
      });
    });
  }
}
