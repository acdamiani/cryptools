export abstract class CipherBase {
  abstract encrypt(message: string): string;
  abstract decrypt(message: string): string;
}

export default abstract class Cipher<TKey = void> extends CipherBase {
  protected _key: TKey;

  constructor(key: TKey) {
    super();
    this._key = key;
  }
}
