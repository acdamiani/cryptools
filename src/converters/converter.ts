export type Kind = `oct` | `binary` | `text` | `dec` | `hex`;
export type Error = `invalid-value` | `invalid-target` | `not-implemented`;

export const ConverterErrors: Record<Error, string> = {
  'invalid-value': `Given value is not representable by this converter`,
  'invalid-target': `Could not convert to target type`,
  'not-implemented': `Conversion not supported`,
};

export default abstract class Converter {
  protected static _reStripWhitespace = /\s+/g;

  kind: Kind | null = null;
  value = ``;

  abstract to(kind: Kind): Converter;
  abstract delimit(delimiter: string): string;
}
