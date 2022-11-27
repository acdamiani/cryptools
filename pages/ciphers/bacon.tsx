import Area from '@/components/Area/area';
import Tool from '@/components/Tool/tool';
import { FormEvent, useId } from 'react';
import BaconCipher, { BaconVariant } from '@/src/ciphers/bacon';
import Row from '@/components/Row/row';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import TextArea from '@/components/TextArea/text-area';
import Select from '@/components/Select/select';
import ToggleSwitch from '@/components/ToggleSwitch/toggle-switch';

export default function Bacon() {
  const aId = useId();
  const bId = useId();
  const inputId = useId();
  const variantId = useId();

  const doConvert = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      input: { value: string };
      'a-mark': { value: string };
      'b-mark': { value: string };
      mode: { checked: boolean };
      variant: { value: BaconVariant };
    };

    const c = new BaconCipher(
      target.variant.value,
      target[`a-mark`].value,
      target[`b-mark`].value,
    );

    return target.mode.checked
      ? c.encode(target.input.value)
      : c.decode(target.input.value);
  };

  return (
    <>
      <h1>Bacon Cipher Encode and Decode Online</h1>
      <Area>
        <Tool generateOutput={doConvert}>
          <Row>
            <LabeledElement content="A Mark" htmlFor={aId}>
              <TextArea
                id={aId}
                name="a-mark"
                defaultValue="a"
                spellCheck={false}
                thin
              />
            </LabeledElement>
            <LabeledElement content="B Mark" htmlFor={bId}>
              <TextArea
                id={bId}
                name="b-mark"
                defaultValue="b"
                spellCheck={false}
                thin
              />
            </LabeledElement>
          </Row>
          <LabeledElement content="Variant" htmlFor={variantId}>
            <Select name="variant" id={variantId}>
              <option value="original">Original</option>
              <option value="unique">Unique</option>
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
        </Tool>
      </Area>
    </>
  );
}
