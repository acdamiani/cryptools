import { describe, it } from 'mocha';
import assert from 'assert';
import UrlEncoder from '@/src/encoders/url';

type UrlTestVector = {
  from: string;
  to: string;
};

const vectors: UrlTestVector[] = [
  {
    from: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~`,
    to: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~`,
  },
  {
    from: `!*\'();:@&=+$,/?#[]`,
    to: `%21%2a%27%28%29%3b%3a%40%26%3d%2b%24%2c%2f%3f%23%5b%5d`,
  },
  {
    from: `https://www.google.com/search?client=firefox-b-1-d&q=hello+world`,
    to: `https%3A%2F%2Fwww.google.com%2Fsearch%3Fclient%3Dfirefox-b-1-d%26q%3Dhello%2Bworld`,
  },
  {
    from: `https://cryptools.dev/encoders/url`,
    to: `https%3A%2F%2Fcryptools.dev%2Fencoders%2Furl`,
  },
];

describe(`URL Encoder`, () => {
  describe(`encode()`, () => {
    it(`should encode URLs`, () => {
      const url = new UrlEncoder();
      vectors.forEach((v) => {
        assert.strictEqual(url.encode(v.from), v.to);
      });
    });
  });
  describe(`decode()`, () => {
    it(`should decode URLs`, () => {
      const url = new UrlEncoder();
      vectors.forEach((v) => {
        assert.strictEqual(url.decode(v.to), v.from);
      });
    });
  });
});
