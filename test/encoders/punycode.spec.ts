import { describe, it } from 'mocha';
import assert from 'assert';
import PunycodeEncoder from '@/src/encoders/punycode';

type PunycodeTestVector = {
  from: string;
  to: string;
};

const vectors: PunycodeTestVector[] = [
  {
    from: `ahoj-světe`,
    to: `xn--ahoj-svte-rjb`,
  },
  {
    from: `ahoj-světe.com`,
    to: `xn--ahoj-svte-rjb.com`,
  },
  {
    from: `www.ahoj-světe.com`,
    to: `www.xn--ahoj-svte-rjb.com`,
  },
  {
    from: `světe.ahoj-světe.com`,
    to: `xn--svte-hwa.xn--ahoj-svte-rjb.com`,
  },
];

describe(`Punycode Encoder`, () => {
  describe(`encode()`, () => {
    it(`should encode Unicode into Punycode`, () => {
      const punycode = new PunycodeEncoder();
      vectors.forEach((v) => {
        assert.strictEqual(punycode.encode(v.from), v.to);
      });
    });
  });
  describe(`decode()`, () => {
    it(`should decode Punycode into Unicode`, () => {
      const punycode = new PunycodeEncoder();
      vectors.forEach((v) => {
        assert.strictEqual(punycode.decode(v.to), v.from);
      });
    });
  });
});
