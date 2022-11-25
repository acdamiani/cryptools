import { describe, it } from 'mocha';
import assert from 'assert';
import Base32Encoder, { Base32Variant } from '@/src/encoders/base32';

type Base32TestVector = {
  variant?: Base32Variant;
  content: string;
  expected: string;
};

const vectors: Base32TestVector[] = [
  {
    content: ``,
    expected: ``,
  },
  {
    content: `f`,
    expected: `MY======`,
  },
  {
    content: `fo`,
    expected: `MZXQ====`,
  },
  {
    content: `foo`,
    expected: `MZXW6===`,
  },
  {
    content: `foob`,
    expected: `MZXW6YQ=`,
  },
  {
    content: `fooba`,
    expected: `MZXW6YTB`,
  },
  {
    content: `foobar`,
    expected: `MZXW6YTBOI======`,
  },
  {
    variant: `base32hex`,
    content: ``,
    expected: ``,
  },
  {
    variant: `base32hex`,
    content: `f`,
    expected: `CO======`,
  },
  {
    variant: `base32hex`,
    content: `fo`,
    expected: `CPNG====`,
  },
  {
    variant: `base32hex`,
    content: `foo`,
    expected: `CPNMU===`,
  },
  {
    variant: `base32hex`,
    content: `foob`,
    expected: `CPNMUOG=`,
  },
  {
    variant: `base32hex`,
    content: `fooba`,
    expected: `CPNMUOJ1`,
  },
  {
    variant: `base32hex`,
    content: `foobar`,
    expected: `CPNMUOJ1E8======`,
  },
  {
    variant: `z-base-32`,
    content: ``,
    expected: ``,
  },
  {
    variant: `z-base-32`,
    content: `f`,
    expected: `ca`,
  },
  {
    variant: `z-base-32`,
    content: `fo`,
    expected: `c3zo`,
  },
  {
    variant: `z-base-32`,
    content: `foo`,
    expected: `c3zs6`,
  },
  {
    variant: `z-base-32`,
    content: `foob`,
    expected: `c3zs6ao`,
  },
  {
    variant: `z-base-32`,
    content: `fooba`,
    expected: `c3zs6aub`,
  },
  {
    variant: `z-base-32`,
    content: `foobar`,
    expected: `c3zs6aubqe`,
  },
  {
    variant: `crockford-base32`,
    content: ``,
    expected: ``,
  },
  {
    variant: `crockford-base32`,
    content: `f`,
    expected: `CR`,
  },
  {
    variant: `crockford-base32`,
    content: `fo`,
    expected: `CSQG`,
  },
  {
    variant: `crockford-base32`,
    content: `foo`,
    expected: `CSQPY`,
  },
  {
    variant: `crockford-base32`,
    content: `foob`,
    expected: `CSQPYRG`,
  },
  {
    variant: `crockford-base32`,
    content: `fooba`,
    expected: `CSQPYRK1`,
  },
  {
    variant: `crockford-base32`,
    content: `foobar`,
    expected: `CSQPYRK1E8`,
  },
];

describe(`Base32 Encoder`, () => {
  describe(`encode()`, () => {
    it(`should encode text into Base32`, () => {
      const base32 = new Base32Encoder();
      vectors
        .filter((v) => v.variant === undefined || v.variant === `base32`)
        .forEach((v) => {
          assert.strictEqual(base32.encode(v.content), v.expected);
        });
    });
    it(`should encode text into Base32hex`, () => {
      const base32 = new Base32Encoder(`base32hex`);
      vectors
        .filter((v) => v.variant === `base32hex`)
        .forEach((v) => {
          assert.strictEqual(base32.encode(v.content), v.expected);
        });
    });
    it(`should encode text into z-base-32`, () => {
      const base32 = new Base32Encoder(`z-base-32`);
      vectors
        .filter((v) => v.variant === `z-base-32`)
        .forEach((v) => {
          assert.strictEqual(base32.encode(v.content), v.expected);
        });
    });
    it(`should encode text into Crockford's Base32`, () => {
      const base32 = new Base32Encoder(`crockford-base32`);
      vectors
        .filter((v) => v.variant === `crockford-base32`)
        .forEach((v) => {
          assert.strictEqual(base32.encode(v.content), v.expected);
        });
    });
  });
  describe(`decode()`, () => {
    it(`should decode text from Base32`, () => {
      const base32 = new Base32Encoder();
      vectors
        .filter((v) => v.variant === undefined || v.variant === `base32`)
        .forEach((v) => {
          assert.strictEqual(base32.decode(v.expected), v.content);
        });
    });
    it(`should decode text from Base32hex`, () => {
      const base32 = new Base32Encoder(`base32hex`);
      vectors
        .filter((v) => v.variant === `base32hex`)
        .forEach((v) => {
          assert.strictEqual(base32.decode(v.expected), v.content);
        });
    });
    it(`should decode text from z-base-32`, () => {
      const base32 = new Base32Encoder(`z-base-32`);
      vectors
        .filter((v) => v.variant === `z-base-32`)
        .forEach((v) => {
          assert.strictEqual(base32.decode(v.expected), v.content);
        });
    });
    it(`should decode text from Crockford's Base32`, () => {
      const base32 = new Base32Encoder(`crockford-base32`);
      vectors
        .filter((v) => v.variant === `crockford-base32`)
        .forEach((v) => {
          assert.strictEqual(base32.decode(v.expected), v.content);
        });
    });
  });
});
