import { describe, it } from 'mocha';
import assert from 'assert';
import Base64Encoder, { Base64Variant } from '@/src/encoders/base64';

type Base64TestVector = {
  variant?: Base64Variant;
  content: string;
  expected: string;
};

const vectors: Base64TestVector[] = [
  {
    content: ``,
    expected: ``,
  },
  {
    content: `f`,
    expected: `Zg==`,
  },
  {
    content: `fo`,
    expected: `Zm8=`,
  },
  {
    content: `foo`,
    expected: `Zm9v`,
  },
  {
    content: `foob`,
    expected: `Zm9vYg==`,
  },
  {
    content: `fooba`,
    expected: `Zm9vYmE=`,
  },
  {
    content: `foobar`,
    expected: `Zm9vYmFy`,
  },
  {
    content: `i like emojis 😱`,
    expected: `aSBsaWtlIGVtb2ppcyDwn5ix`,
  },
  {
    variant: `rfc2045`,
    content:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta venenatis massa quis sollicitudin. ` +
      `Mauris non massa non leo feugiat laoreet in vitae justo. In in tincidunt est, non dapibus tortor. ` +
      `Proin lacinia lacus sed consequat egestas. Nulla nisi justo, aliquam non imperdiet nec, tincidunt ac turpis.`,
    expected:
      `TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4g\r\n` +
      `VXQgcG9ydGEgdmVuZW5hdGlzIG1hc3NhIHF1aXMgc29sbGljaXR1ZGluLiBNYXVyaXMgbm9uIG1h\r\n` +
      `c3NhIG5vbiBsZW8gZmV1Z2lhdCBsYW9yZWV0IGluIHZpdGFlIGp1c3RvLiBJbiBpbiB0aW5jaWR1\r\n` +
      `bnQgZXN0LCBub24gZGFwaWJ1cyB0b3J0b3IuIFByb2luIGxhY2luaWEgbGFjdXMgc2VkIGNvbnNl\r\n` +
      `cXVhdCBlZ2VzdGFzLiBOdWxsYSBuaXNpIGp1c3RvLCBhbGlxdWFtIG5vbiBpbXBlcmRpZXQgbmVj\r\n` +
      `LCB0aW5jaWR1bnQgYWMgdHVycGlzLg==`,
  },
  {
    variant: `rfc1421`,
    content:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta venenatis massa quis sollicitudin. ` +
      `Mauris non massa non leo feugiat laoreet in vitae justo. In in tincidunt est, non dapibus tortor. ` +
      `Proin lacinia lacus sed consequat egestas. Nulla nisi justo, aliquam non imperdiet nec, tincidunt ac turpis.`,
    expected:
      `TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2Np\r\n` +
      `bmcgZWxpdC4gVXQgcG9ydGEgdmVuZW5hdGlzIG1hc3NhIHF1aXMgc29sbGljaXR1\r\n` +
      `ZGluLiBNYXVyaXMgbm9uIG1hc3NhIG5vbiBsZW8gZmV1Z2lhdCBsYW9yZWV0IGlu\r\n` +
      `IHZpdGFlIGp1c3RvLiBJbiBpbiB0aW5jaWR1bnQgZXN0LCBub24gZGFwaWJ1cyB0\r\n` +
      `b3J0b3IuIFByb2luIGxhY2luaWEgbGFjdXMgc2VkIGNvbnNlcXVhdCBlZ2VzdGFz\r\n` +
      `LiBOdWxsYSBuaXNpIGp1c3RvLCBhbGlxdWFtIG5vbiBpbXBlcmRpZXQgbmVjLCB0\r\n` +
      `aW5jaWR1bnQgYWMgdHVycGlzLg==`,
  },
];

describe(`Base64 Encoder`, () => {
  describe(`encode()`, () => {
    it(`should encode text into Base64`, () => {
      const base64 = new Base64Encoder();
      vectors
        .filter((v) => v.variant === undefined || v.variant === `base64`)
        .forEach((v) => {
          assert.strictEqual(base64.encode(v.content), v.expected);
        });
    });
    it(`should encode text into Base64url`, () => {
      const base64 = new Base64Encoder(`base64url`);
      vectors
        .filter((v) => v.variant === `base64url`)
        .forEach((v) => {
          assert.strictEqual(base64.encode(v.content), v.expected);
        });
    });
    it(`should encode text into rfc1421`, () => {
      const base64 = new Base64Encoder(`rfc1421`);
      vectors
        .filter((v) => v.variant === `rfc1421`)
        .forEach((v) => {
          assert.strictEqual(base64.encode(v.content), v.expected);
        });
    });
    it(`should encode text into rfc2045`, () => {
      const base64 = new Base64Encoder(`rfc2045`);
      vectors
        .filter((v) => v.variant === `rfc2045`)
        .forEach((v) => {
          assert.strictEqual(base64.encode(v.content), v.expected);
        });
    });
  });
  describe(`decode()`, () => {
    it(`should decode text from Base64`, () => {
      const base64 = new Base64Encoder();
      vectors
        .filter((v) => v.variant === undefined || v.variant === `base64`)
        .forEach((v) => {
          assert.strictEqual(base64.decode(v.expected), v.content);
        });
    });
    it(`should decode text from Base64url`, () => {
      const base64 = new Base64Encoder(`base64url`);
      vectors
        .filter((v) => v.variant === `base64url`)
        .forEach((v) => {
          assert.strictEqual(base64.decode(v.expected), v.content);
        });
    });
    it(`should decode text from rfc1421`, () => {
      const base64 = new Base64Encoder(`rfc1421`);
      vectors
        .filter((v) => v.variant === `rfc1421`)
        .forEach((v) => {
          assert.strictEqual(base64.decode(v.expected), v.content);
        });
    });
    it(`should decode text from rfc2045`, () => {
      const base64 = new Base64Encoder(`rfc2045`);
      vectors
        .filter((v) => v.variant === `rfc2045`)
        .forEach((v) => {
          assert.strictEqual(base64.decode(v.expected), v.content);
        });
    });
  });
});
