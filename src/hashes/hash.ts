import { getCodePoints } from '../text';

export type Algorithm = {
  name: string;
  browserAlgorithm?: string;
  browserExceptions?: string[];
  nodeAlgorithm?: string;
};

export default abstract class Hash {
  async hash(message: string): Promise<string> {
    const codePoints = new Uint8Array(getCodePoints(message));

    return this._hashBytes(codePoints).then((hashed) => {
      return [...hashed].map((x) => x.toString(16).padStart(2, `0`)).join(``);
    });
  }

  async hashBytes(bytes: Uint8Array): Promise<string> {
    return this._hashBytes(bytes).then((hashed) => {
      return [...hashed].map((x) => x.toString(16).padStart(2, `0`)).join(``);
    });
  }

  protected abstract _hashBytes(bytes: Uint8Array): Promise<Uint8Array>;
}
