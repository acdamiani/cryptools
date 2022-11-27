import { describe, it } from 'mocha';
import assert from 'assert';
import Converter, { ConverterKind } from '@/src/converters/converter';
import TestUtil from 'test/util';

export type ConverterTestVector<
  TKind extends ConverterKind,
  TExclude extends ConverterKind | void = void,
> = {
  value: string;
  converted: Record<Exclude<ConverterKind, TKind | TExclude>, string>;
};

export default class ConverterHelper {
  static test<
    TKind extends ConverterKind,
    TExclude extends ConverterKind | void = void,
  >(
    instance: ((value: string) => Converter) | Converter,
    vectors: ConverterTestVector<TKind, TExclude>[],
  ) {
    describe(`to()`, () => {
      vectors.forEach((v) => {
        const tvalue = TestUtil.preview(v.value.toString());
        const converter =
          typeof instance === `function` ? instance(v.value) : instance;
        for (const key of Object.keys(v.converted)) {
          const kind = key as Exclude<ConverterKind, TKind | TExclude>;
          const tconverted = TestUtil.preview(v.converted[kind]);
          it(`should convert ${converter.kind} value ${tvalue} -> ${key} value ${tconverted}`, () => {
            assert.strictEqual(converter.to(kind).value, v.converted[kind]);
          });
        }
      });
    });
  }
}
