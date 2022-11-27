import { describe } from 'mocha';
import DecimalConverter from '@/src/converters/dec';
import ConverterHelper, { ConverterTestVector } from './helper';

const vectors: ConverterTestVector<'dec', 'text'>[] = [
  {
    value: `0`,
    converted: {
      oct: `000`,
      binary: `00000000`,
      hex: `00`,
    },
  },
  {
    value: `100`,
    converted: {
      oct: `144`,
      binary: `01100100`,
      hex: `64`,
    },
  },
  {
    value: `-100`,
    converted: {
      oct: `-144`,
      binary: `-01100100`,
      hex: `-64`,
    },
  },
  {
    value: `999999999999999999999999999999999`,
    converted: {
      oct: `003051561442215446343012660477777777777`,
      binary:
        `0011000101001101110001100100010010001101100100110011100011` +
        `000001010110110000100111111111111111111111111111111111`,
      hex: `314dc6448d9338c15b09ffffffff`,
    },
  },
  {
    value: `-999999999999999999999999999999999`,
    converted: {
      oct: `-003051561442215446343012660477777777777`,
      binary:
        `-0011000101001101110001100100010010001101100100110011100011` +
        `000001010110110000100111111111111111111111111111111111`,
      hex: `-314dc6448d9338c15b09ffffffff`,
    },
  },
];

describe(`Decimal Converter`, () =>
  ConverterHelper.test((v) => new DecimalConverter(v), vectors));
