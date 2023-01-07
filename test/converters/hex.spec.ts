import { describe } from 'mocha';
import ConverterHelper, { ConverterTestVector } from './helper';
import HexadecimalConverter from '@/src/converters/hex';

const vectors: ConverterTestVector<'hex'>[] = [
  {
    value: `3a30`,
    converted: {
      oct: `035060`,
      binary: `0011101000110000`,
      dec: `14896`,
      text: `:0`,
    },
  },
  {
    value: `-3a30`,
    converted: {
      oct: `-035060`,
      binary: `-0011101000110000`,
      dec: `-14896`,
      text: `:0`,
    },
  },
  {
    value: `0x3a30`,
    converted: {
      oct: `035060`,
      binary: `0011101000110000`,
      dec: `14896`,
      text: `:0`,
    },
  },
  {
    value: `-0X3a30`,
    converted: {
      oct: `-035060`,
      binary: `-0011101000110000`,
      dec: `-14896`,
      text: `:0`,
    },
  },
];

describe(`Hexadecimal Converter`, () =>
  ConverterHelper.test((v) => new HexadecimalConverter(v), vectors));
