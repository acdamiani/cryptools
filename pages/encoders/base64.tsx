import Area from '@/components/Area/area';
import Encoder from '@/components/Encoder/encoder';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import Select from '@/components/Select/select';
import Base64Encoder, {
  Base64Variant,
  VARIANT_LABELS,
} from '@/src/encoders/base64';
import { useId } from 'react';

export default function Base64() {
  const variantId = useId();

  return (
    <>
      <h1>Base64 Encoder and Decoder</h1>
      <Area>
        <Encoder
          construct={(e) => {
            const target = e.target as typeof e.target & {
              variant: { value: Base64Variant };
            };
            return new Base64Encoder(target.variant.value);
          }}
          encode={(input: string, e: Base64Encoder) => e.encode(input)}
          decode={(input: string, e: Base64Encoder) => e.decode(input)}
          outputRows={3}
          encoderName="base64"
        >
          <LabeledElement htmlFor={variantId} content="Variant">
            <Select name="variant" id={variantId}>
              {Base64Encoder.getVariantsAsArray().map((x) => (
                <option key={x} value={x}>
                  {VARIANT_LABELS[x as Base64Variant]}
                </option>
              ))}
            </Select>
          </LabeledElement>
        </Encoder>
      </Area>
    </>
  );
}
