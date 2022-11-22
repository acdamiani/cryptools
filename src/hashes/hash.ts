import {
  BotInfo,
  BrowserInfo,
  detect,
  NodeInfo,
  ReactNativeInfo,
  SearchBotDeviceInfo,
} from 'detect-browser';
import { getCodePoints } from '../text';

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
    browserExceptions: [`ie`, `edge`],
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
    browserExceptions: [`ie`],
  },
];

// export default class Hash {
//   _algorithm: Algorithm | null;
//   _env:
//     | BrowserInfo
//     | SearchBotDeviceInfo
//     | BotInfo
//     | NodeInfo
//     | ReactNativeInfo
//     | null;

//   constructor(algorithm: string) {
//     this._algorithm = algorithms.find((x) => x.name === algorithm) ?? null;
//     this._env = detect() ?? null;
//   }

//   public hash(message: string) {
//     if (!this._env) throw new Error(`Unsupported environment`);

//     const bytes = new Uint8Array(getCodePoints(message));
//     return this.createDigest(bytes);
//   }

//   private async createDigest(bytes: Uint8Array): Promise<Uint8Array> {
//     if (!this._algorithm) throw new Error(`Algorithm is invalid`);

//     const algorithm = this._algorithm;

//     switch (algorithm.name) {
//       case `md5`:
//         return new Promise((resolve) => resolve(md5(bytes)));
//     }

//     if (!this._env || algorithm.browserExceptions?.includes(this._env.name))
//       throw new Error(`Unsupported environment`);

//     const crypto = window.crypto || window.msCrypto;
//     const subtle = crypto.subtle || crypto.webkitSubtle;

//     let result = subtle.digest(algorithm.browserAlgorithm || ``, bytes);

//     // @ts-ignore
//     if (result.oncomplete !== undefined) {
//       result = new Promise((resolve, reject) => {
//         // @ts-ignore
//         result.oncomplete = resolve.bind(this, result.result);
//         // @ts-ignore
//         result.onerror = reject;
//       });
//     }

//     return result.then((buf) => new Uint8Array(buf));
//   }
// }

export default abstract class Hash {
  async hash(message: string): Promise<string> {
    const codePoints = new Uint8Array(getCodePoints(message));

    return this._hashBytes(codePoints).then((hashed) => {
      return [...hashed].map((x) => x.toString(16).padStart(2, `0`)).join(``);
    });
  }
  protected abstract _hashBytes(bytes: Uint8Array): Promise<Uint8Array>;
}
