import { describe } from 'mocha';
import EncoderHelper, { TestVector } from './helper';
import Base64Encoder, { Base64Variant } from '@/src/encoders/base64';

const vectors: Record<Base64Variant, TestVector[]> = {
  base64: [
    {
      content: ``,
      encoded: ``,
    },
    {
      content: `f`,
      encoded: `Zg==`,
    },
    {
      content: `fo`,
      encoded: `Zm8=`,
    },
    {
      content: `foo`,
      encoded: `Zm9v`,
    },
    {
      content: `foob`,
      encoded: `Zm9vYg==`,
    },
    {
      content: `fooba`,
      encoded: `Zm9vYmE=`,
    },
    {
      content: `foobar`,
      encoded: `Zm9vYmFy`,
    },
    {
      content: `i like emojis 😱`,
      encoded: `aSBsaWtlIGVtb2ppcyDwn5ix`,
    },
  ],
  base64url: [],
  rfc1421: [
    {
      content:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta venenatis massa quis sollicitudin. ` +
        `Mauris non massa non leo feugiat laoreet in vitae justo. In in tincidunt est, non dapibus tortor. ` +
        `Proin lacinia lacus sed consequat egestas. Nulla nisi justo, aliquam non imperdiet nec, tincidunt ac turpis.`,
      encoded:
        `TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2Np\r\n` +
        `bmcgZWxpdC4gVXQgcG9ydGEgdmVuZW5hdGlzIG1hc3NhIHF1aXMgc29sbGljaXR1\r\n` +
        `ZGluLiBNYXVyaXMgbm9uIG1hc3NhIG5vbiBsZW8gZmV1Z2lhdCBsYW9yZWV0IGlu\r\n` +
        `IHZpdGFlIGp1c3RvLiBJbiBpbiB0aW5jaWR1bnQgZXN0LCBub24gZGFwaWJ1cyB0\r\n` +
        `b3J0b3IuIFByb2luIGxhY2luaWEgbGFjdXMgc2VkIGNvbnNlcXVhdCBlZ2VzdGFz\r\n` +
        `LiBOdWxsYSBuaXNpIGp1c3RvLCBhbGlxdWFtIG5vbiBpbXBlcmRpZXQgbmVjLCB0\r\n` +
        `aW5jaWR1bnQgYWMgdHVycGlzLg==`,
    },
  ],
  rfc2045: [
    {
      content:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta venenatis massa quis sollicitudin. ` +
        `Mauris non massa non leo feugiat laoreet in vitae justo. In in tincidunt est, non dapibus tortor. ` +
        `Proin lacinia lacus sed consequat egestas. Nulla nisi justo, aliquam non imperdiet nec, tincidunt ac turpis.`,
      encoded:
        `TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4g\r\n` +
        `VXQgcG9ydGEgdmVuZW5hdGlzIG1hc3NhIHF1aXMgc29sbGljaXR1ZGluLiBNYXVyaXMgbm9uIG1h\r\n` +
        `c3NhIG5vbiBsZW8gZmV1Z2lhdCBsYW9yZWV0IGluIHZpdGFlIGp1c3RvLiBJbiBpbiB0aW5jaWR1\r\n` +
        `bnQgZXN0LCBub24gZGFwaWJ1cyB0b3J0b3IuIFByb2luIGxhY2luaWEgbGFjdXMgc2VkIGNvbnNl\r\n` +
        `cXVhdCBlZ2VzdGFzLiBOdWxsYSBuaXNpIGp1c3RvLCBhbGlxdWFtIG5vbiBpbXBlcmRpZXQgbmVj\r\n` +
        `LCB0aW5jaWR1bnQgYWMgdHVycGlzLg==`,
    },
  ],
};

describe(`Base64 Encoder`, () => {
  describe(`Base64`, () =>
    EncoderHelper.test(new Base64Encoder(`base64`), vectors[`base64`]));
  describe(`Base64url`, () =>
    EncoderHelper.test(new Base64Encoder(`base64url`), vectors[`base64url`]));
  describe(`RFC1421`, () =>
    EncoderHelper.test(new Base64Encoder(`rfc1421`), vectors[`rfc1421`]));
  describe(`RFC2045`, () =>
    EncoderHelper.test(new Base64Encoder(`rfc2045`), vectors[`rfc2045`]));
});
