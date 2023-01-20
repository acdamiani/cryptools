import { describe, it } from 'mocha';
import assert from 'assert';
import Encoder from '@/src/encoders/encoder';
import TestUtil from 'test/util';

export type EncoderTestVector = {
  content: string;
  encoded: string;
}[];

export default class EncoderTestHelper {
  static test(instance: Encoder, vector: EncoderTestVector) {
    describe(`encode()`, () => {
      vector.forEach((v) => {
        const tcontent = TestUtil.preview(v.content);
        const tencoded = TestUtil.preview(v.encoded);
        it(`should encode ${tcontent} -> ${tencoded}`, () => {
          assert.strictEqual(instance.encode(v.content), v.encoded);
        });
      });
    });
    describe(`decode()`, () => {
      vector.forEach((v) => {
        const tcontent = TestUtil.preview(v.content);
        const tencoded = TestUtil.preview(v.encoded);
        it(`should decode ${tencoded} -> ${tcontent}`, () => {
          assert.strictEqual(instance.decode(v.encoded), v.content);
        });
      });
    });
  }
}
