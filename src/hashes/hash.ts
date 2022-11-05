import {
  BotInfo,
  BrowserInfo,
  detect,
  NodeInfo,
  ReactNativeInfo,
  SearchBotDeviceInfo,
} from 'detect-browser';

import md5 from './md5';
export type Algorithm = {
  name: string;
  browserAlgorithm?: string;
  browserExceptions?: string[];
  nodeAlgorithm?: string;
};

const algorithms: Algorithm[] = [
  {
    name: `md5`,
  },
  {
    name: `sha1`,
    browserAlgorithm: `SHA-1`,
    nodeAlgorithm: `sha1`,
  },
  {
    name: `sha256`,
    browserAlgorithm: `SHA-256`,
    nodeAlgorithm: `sha256`,
  },
  {
    name: `sha384`,
    nodeAlgorithm: `sha384`,
  },
  {
    name: `sha512`,
    browserAlgorithm: `SHA-512`,
    nodeAlgorithm: `sha512`,
  },
];

export default class Hash {
  _algorithm: Algorithm | null;
  _env:
    | BrowserInfo
    | SearchBotDeviceInfo
    | BotInfo
    | NodeInfo
    | ReactNativeInfo
    | null;
  _encoder: TextEncoder | null;

  constructor(algorithm: string) {
    this._algorithm = algorithms.find((x) => x.name === algorithm) ?? null;
    this._env = detect() ?? null;
    this._encoder =
      typeof TextEncoder !== `undefined` ? new TextEncoder() : null;
  }

  public hash(message: string) {
    if (!this._env) throw new Error(`Unsupported environment`);
    if (!this._encoder) throw new Error(`TextEncoder not avilable`);

    const bytes = this._encoder.encode(message);
    return this.createDigest(bytes);
  }

  private async createDigest(bytes: Uint8Array): Promise<Uint8Array> {
    if (!this._algorithm) throw new Error(`Algorithm is invalid`);

    const algorithm = this._algorithm;

    switch (algorithm.name) {
      case `md5`:
        return new Promise((resolve) => resolve(md5(bytes)));
    }

    if (!this._env) throw new Error(`Unsupported environment`);

    const crypto = window.crypto || window.msCrypto;
    const subtle = crypto.subtle || crypto.webkitSubtle;

    let result = subtle.digest(algorithm.browserAlgorithm || ``, bytes);

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
