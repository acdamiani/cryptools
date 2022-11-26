import { describe } from 'mocha';
import Base32Encoder, { Base32Variant } from '@/src/encoders/base32';
import EncoderHelper, { TestVector } from './helper';

const vectors: Record<Base32Variant, TestVector[]> = {
  base32: [
    {
      content: ``,
      encoded: ``,
    },
    {
      content: `f`,
      encoded: `MY======`,
    },
    {
      content: `fo`,
      encoded: `MZXQ====`,
    },
    {
      content: `foo`,
      encoded: `MZXW6===`,
    },
    {
      content: `foob`,
      encoded: `MZXW6YQ=`,
    },
    {
      content: `fooba`,
      encoded: `MZXW6YTB`,
    },
    {
      content: `foobar`,
      encoded: `MZXW6YTBOI======`,
    },
  ],
  base32hex: [
    {
      content: ``,
      encoded: ``,
    },
    {
      content: `f`,
      encoded: `CO======`,
    },
    {
      content: `fo`,
      encoded: `CPNG====`,
    },
    {
      content: `foo`,
      encoded: `CPNMU===`,
    },
    {
      content: `foob`,
      encoded: `CPNMUOG=`,
    },
    {
      content: `fooba`,
      encoded: `CPNMUOJ1`,
    },
    {
      content: `foobar`,
      encoded: `CPNMUOJ1E8======`,
    },
  ],
  'z-base-32': [
    {
      content: ``,
      encoded: ``,
    },
    {
      content: `f`,
      encoded: `ca`,
    },
    {
      content: `fo`,
      encoded: `c3zo`,
    },
    {
      content: `foo`,
      encoded: `c3zs6`,
    },
    {
      content: `foob`,
      encoded: `c3zs6ao`,
    },
    {
      content: `fooba`,
      encoded: `c3zs6aub`,
    },
    {
      content: `foobar`,
      encoded: `c3zs6aubqe`,
    },
  ],
  'crockford-base32': [
    {
      content: ``,
      encoded: ``,
    },
    {
      content: `f`,
      encoded: `CR`,
    },
    {
      content: `fo`,
      encoded: `CSQG`,
    },
    {
      content: `foo`,
      encoded: `CSQPY`,
    },
    {
      content: `foob`,
      encoded: `CSQPYRG`,
    },
    {
      content: `fooba`,
      encoded: `CSQPYRK1`,
    },
    {
      content: `foobar`,
      encoded: `CSQPYRK1E8`,
    },
  ],
};

describe(`Base32 Encoder`, () => {
  describe(`Base32`, () =>
    EncoderHelper.test(new Base32Encoder(`base32`), vectors[`base32`]));
  describe(`Base32hex`, () =>
    EncoderHelper.test(new Base32Encoder(`base32hex`), vectors[`base32hex`]));
  describe(`z-base-32`, () =>
    EncoderHelper.test(new Base32Encoder(`z-base-32`), vectors[`z-base-32`]));
  describe(`Crockford's Base32`, () =>
    EncoderHelper.test(
      new Base32Encoder(`crockford-base32`),
      vectors[`crockford-base32`],
    ));
});
