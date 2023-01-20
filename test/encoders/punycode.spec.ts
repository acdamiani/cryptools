import { describe } from 'mocha';
import PunycodeEncoder from '@/src/encoders/punycode';
import EncoderTestHelper, { EncoderTestVector } from './helper';

const vector: EncoderTestVector = [
  {
    content: `ahoj-světe`,
    encoded: `xn--ahoj-svte-rjb`,
  },
  {
    content: `ahoj-světe.com`,
    encoded: `xn--ahoj-svte-rjb.com`,
  },
  {
    content: `www.ahoj-světe.com`,
    encoded: `www.xn--ahoj-svte-rjb.com`,
  },
  {
    content: `světe.ahoj-světe.com`,
    encoded: `xn--svte-hwa.xn--ahoj-svte-rjb.com`,
  },
];

describe(`Punycode Encoder`, () => {
  EncoderTestHelper.test(new PunycodeEncoder(), vector);
});
