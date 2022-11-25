import Hash from './hash';
import {
  BotInfo,
  BrowserInfo,
  detect,
  NodeInfo,
  ReactNativeInfo,
  SearchBotDeviceInfo,
} from 'detect-browser';
import crypto from 'crypto';

export type BrowserHashFunction = `sha1` | `sha256` | `sha384` | `sha512`;

const browserAlgorithms: Record<BrowserHashFunction, string> = {
  sha1: `SHA-1`,
  sha256: `SHA-256`,
  sha384: `SHA-384`,
  sha512: `SHA-512`,
};

const nodeAlgorithms: Record<BrowserHashFunction, string> = {
  sha1: `sha1`,
  sha256: `sha256`,
  sha384: `sha384`,
  sha512: `sha512`,
};

const hashExceptions: Record<BrowserHashFunction, string[]> = {
  sha1: [`ie`, `edge`],
  sha256: [],
  sha384: [],
  sha512: [`ie`],
};

export default class BrowserHash extends Hash {
  private _algorithm: BrowserHashFunction;
  private _env:
    | BrowserInfo
    | SearchBotDeviceInfo
    | BotInfo
    | NodeInfo
    | ReactNativeInfo
    | null;

  constructor(algorithm: BrowserHashFunction) {
    super();

    this._algorithm = algorithm;
    this._env = detect() ?? null;
  }

  protected async _hashBytes(bytes: Uint8Array): Promise<Uint8Array> {
    if (
      !this._env ||
      hashExceptions[this._algorithm].includes(this._env.name)
    ) {
      throw new Error(`Unsupported environment`);
    }

    if (this._env.name === `node`) {
      return new Promise((resolve) => {
        const result = crypto
          .createHash(nodeAlgorithms[this._algorithm])
          .update(bytes)
          .digest();

        resolve(new Uint8Array(result));
      });
    } else {
      const crypto = window.crypto || window.msCrypto;
      const subtle = crypto.subtle || crypto.webkitSubtle;

      let result = subtle.digest(browserAlgorithms[this._algorithm], bytes);

      // @ts-ignore
      if (result.oncomplete !== undefined) {
        result = new Promise((resolve, reject) => {
          // @ts-ignore
          result.oncomplete = resolve.bind(this, result.result);
          // @ts-ignore
          result.onerror = reject;
        });
      }

      return result.then((buf) => new Uint8Array(buf));
    }
  }
}
