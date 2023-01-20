import { CipherBase } from '@/src/ciphers/cipher';
import TestUtil from '../util';
import assert from 'assert';

type CipherTestVectorProps = {
  content: string;
  encrypted: string;
  decrypted?: string;
};

export type CipherTestVector<T extends Record<any, any> = Record<any, never>> =
  (CipherTestVectorProps & T)[];

export default class CipherTestHelper {
  static test<T extends Record<any, any> = Record<any, never>>(
    cipher:
      | CipherBase
      | ((
          props: Omit<CipherTestVector<T>[number], keyof CipherTestVectorProps>,
        ) => CipherBase),
    vector: CipherTestVector<T>,
    consoleProps?: (keyof T)[],
  ) {
    describe(`encrypt()`, () => {
      vector.forEach((v) => {
        const { content, encrypted, decrypted, ...props } = v;
        const c = typeof cipher === `function` ? cipher(props) : cipher;
        const propsPrintable = [...Object.getOwnPropertyNames(props)]
          .filter((p) => consoleProps?.includes(p))
          .map((p) => `${p}=${props[p]}`)
          .join(`, `);

        it(
          `should encrypt ${TestUtil.preview(content)} -> ${TestUtil.preview(
            encrypted,
          )}` + (propsPrintable ? ` with ${propsPrintable}` : ``),
          () => assert.strictEqual(c.encrypt(content), encrypted),
        );
      });
    });
    describe(`decrypt()`, () => {
      vector.forEach((v) => {
        const { content, encrypted, decrypted, ...props } = v;
        const c = typeof cipher === `function` ? cipher(props) : cipher;
        const propsPrintable = [...Object.getOwnPropertyNames(props)]
          .filter((p) => consoleProps?.includes(p))
          .map((p) => `${p}=${props[p]}`)
          .join(`, `);

        it(
          `should decrypt ${TestUtil.preview(encrypted)} -> ${TestUtil.preview(
            decrypted ?? content,
          )}` + (propsPrintable ? ` with ${propsPrintable}` : ``),
          () => assert.strictEqual(c.decrypt(encrypted), decrypted ?? content),
        );
      });
    });
  }
}
