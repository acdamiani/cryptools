import { describe } from 'mocha';
import BinaryConverter from '@/src/converters/binary';
import ConverterHelper, { ConverterTestVector } from './helper';

const vectors: ConverterTestVector<'binary'>[] = [
  {
    value: `0100100001100101011011000110110001101111001000000101011101101111011100100110110001100100`,
    converted: {
      oct: `044145330661571005355734466144`,
      dec: `87521618088882533792115812`,
      hex: `48656c6c6f20576f726c64`,
      text: `Hello World`,
    },
  },
  {
    value: `-0100100001100101011011000110110001101111001000000101011101101111011100100110110001100100`,
    converted: {
      oct: `-044145330661571005355734466144`,
      dec: `-87521618088882533792115812`,
      hex: `-48656c6c6f20576f726c64`,
      text: `Hello World`,
    },
  },
  {
    value: `0b0111011101101111011101110010000011110000100111111010010010101111`,
    converted: {
      oct: `735573562036047722257`,
      dec: `8606228396287960239`,
      hex: `776f7720f09fa4af`,
      text: `wow 🤯`,
    },
  },
  {
    value: `-0B0111011101101111011101110010000011110000100111111010010010101111`,
    converted: {
      oct: `-735573562036047722257`,
      dec: `-8606228396287960239`,
      hex: `-776f7720f09fa4af`,
      text: `wow 🤯`,
    },
  },
];

describe(`Binary Converter`, () =>
  ConverterHelper.test((v) => new BinaryConverter(v), vectors));
