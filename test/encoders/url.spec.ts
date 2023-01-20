import { describe } from 'mocha';
import UrlEncoder from '@/src/encoders/url';
import EncoderTestHelper, { EncoderTestVector } from './helper';

const vector: EncoderTestVector = [
  {
    content: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~`,
    encoded: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~`,
  },
  {
    content: `!*\'();:@&=+$,/?#[]`,
    encoded: `%21%2A%27%28%29%3B%3A%40%26%3D%2B%24%2C%2F%3F%23%5B%5D`,
  },
  {
    content: `https://www.google.com/search?client=firefox-b-1-d&q=hello+world`,
    encoded: `https%3A%2F%2Fwww.google.com%2Fsearch%3Fclient%3Dfirefox-b-1-d%26q%3Dhello%2Bworld`,
  },
  {
    content: `https://cryptools.dev/encoders/url`,
    encoded: `https%3A%2F%2Fcryptools.dev%2Fencoders%2Furl`,
  },
  {
    content: `i like emojis 😱`,
    encoded: `i%20like%20emojis%20%F0%9F%98%B1`,
  },
];

describe(`URL Encoder`, () => {
  EncoderTestHelper.test(new UrlEncoder(), vector);
});
