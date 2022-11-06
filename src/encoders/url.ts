import Encoder from '@/src/encoders/encoder';

export default class UrlEncoder extends Encoder {
  encode(message: string): string {
    return encodeURIComponent(message);
  }
  decode(message: string): string {
    return decodeURIComponent(message);
  }
}
