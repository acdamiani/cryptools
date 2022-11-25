import Area from '@/components/Area/area';
import Encoder from '@/components/Encoder/encoder';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import Select from '@/components/Select/select';
import Base32Encoder, {
  Base32Variant,
  VARIANT_LABELS,
} from '@/src/encoders/base32';
import { useEffect, useId, useState } from 'react';

export default function Url() {
  const variantId = useId();

  return (
    <>
      <h1>Base32 Encoder and Decoder</h1>
      <Area>
        <Encoder
          construct={(e) => {
            const target = e.target as typeof e.target & {
              variant: { value: Base32Variant };
            };
            return new Base32Encoder(target.variant.value);
          }}
          encode={(input: string, e: Base32Encoder) => e.encode(input)}
          decode={(input: string, e: Base32Encoder) => e.decode(input)}
          encoderName="base32"
        >
          <LabeledElement htmlFor={variantId} content="Variant">
            <Select name="variant" id={variantId}>
              {Base32Encoder.getVariantsAsArray().map((x) => (
                <option key={x} value={x}>
                  {VARIANT_LABELS[x as Base32Variant]}
                </option>
              ))}
            </Select>
          </LabeledElement>
        </Encoder>
      </Area>
    </>
  );
}
