export default abstract class Encoder {
  abstract encode(message: string): string;
  abstract decode(message: string): string;
}
