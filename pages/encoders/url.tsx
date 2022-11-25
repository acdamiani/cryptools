import Area from '@/components/Area/area';
import Encoder from '@/components/Encoder/encoder';
import UrlEncoder from '@/src/encoders/url';

export default function Url() {
  const url = new UrlEncoder();

  return (
    <>
      <h1>URL Encoder and Decoder</h1>
      <Area>
        <Encoder
          encode={url.encode.bind(url)}
          decode={url.decode.bind(url)}
          encoderName="url"
        />
      </Area>
    </>
  );
}
