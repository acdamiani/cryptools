import Area from '@/components/Area/area';
import Encoder from '@/components/Encoder/encoder';
import PunycodeEncoder from '@/src/encoders/punycode';

export default function Punycode() {
  const punycode = new PunycodeEncoder();

  return (
    <>
      <h1>Punycode Encode and Decode Online</h1>
      <Area>
        <Encoder
          encode={punycode.encode.bind(punycode)}
          decode={punycode.decode.bind(punycode)}
          encoderName="punycode"
        />
      </Area>
    </>
  );
}
