import Area from '@/components/Area/area';
import Counter from '@/components/Counter/counter';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import Row from '@/components/Row/row';
import Select from '@/components/Select/select';
import TextArea from '@/components/TextArea/text-area';
import Toggle from '@/components/Toggle/toggle';
import ToggleSwitch from '@/components/ToggleSwitch/toggle-switch';
import Tool from '@/components/Tool/tool';
import VigenereCipher, {
  CaseStrategy,
  VigenereVariant,
} from '@/src/ciphers/vigenere';
import { FormEvent, useId, useState } from 'react';

export default function Caesar() {
  const inputId = useId();
  const keyId = useId();
  const alphabetId = useId();
  const casingId = useId();
  const variantId = useId();

  const [alphabet, setAlpahbet] = useState(`abcdefghijklmnopqrstuvwxyz`);

  const doConvert = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      input: { value: string };
      alphabet: { value: string };
      'insert-invalid': { checked: boolean };
      key: { value: string };
      mode: { checked: boolean };
      casing: { value: CaseStrategy };
      variant: { value: VigenereVariant };
    };

    const c = new VigenereCipher(
      target.key.value,
      target.variant.value,
      target.alphabet.value,
      target.casing.value,
      target[`insert-invalid`].checked,
    );

    return target.mode.checked
      ? c.encode(target.input.value)
      : c.decode(target.input.value);
  };

  return (
    <>
      <h1>Vigenere Cipher Encode and Decode Online</h1>
      <Area>
        <Tool generateOutput={doConvert}>
          <Row>
            <LabeledElement content="Key" flexBasis={false} htmlFor={keyId}>
              <TextArea
                id={keyId}
                name="key"
                defaultValue="cryptools"
                spellCheck={false}
              />
            </LabeledElement>
            <LabeledElement content="Alphabet" htmlFor={alphabetId}>
              <TextArea
                id={alphabetId}
                defaultValue="abcdefghijklmnopqrstuvwxyz"
                onChange={(e) => setAlpahbet(e.target.value)}
                name="alphabet"
                spellCheck={false}
              />
            </LabeledElement>
          </Row>
          <LabeledElement content="Variant" htmlFor={variantId}>
            <Select name="variant" id={variantId}>
              <option value="standard">Standard</option>
              <option value="beaufort">Beaufort</option>
              <option value="beaufort-variant">Beaufort Variant</option>
            </Select>
          </LabeledElement>
          <ToggleSwitch
            leftContent="Decode"
            rightContent="Encode"
            initialValue={true}
            name="mode"
          />
          <LabeledElement content={<strong>Input</strong>}>
            <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
          </LabeledElement>
          <LabeledElement content="Casing Strategy" htmlFor={casingId}>
            <Select name="casing" id={casingId}>
              <option value="maintain">Maintain</option>
              <option value="ignore">Ignore</option>
              <option value="skip">Skip</option>
            </Select>
          </LabeledElement>
          <Toggle
            name="insert-invalid"
            label="Insert Invalid"
            initialValue={true}
          />
        </Tool>
      </Area>
    </>
  );
}