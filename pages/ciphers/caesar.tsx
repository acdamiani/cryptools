import Area from '@/components/Area/area';
import Counter from '@/components/Counter/counter';
import LabeledElement from '@/components/LabeledElement/labeled-element';
import Row from '@/components/Row/row';
import TextArea from '@/components/TextArea/text-area';
import Toggle from '@/components/Toggle/toggle';
import ToggleSwitch from '@/components/ToggleSwitch/toggle-switch';
import Tool from '@/components/Tool/tool';
import CaesarCipher from '@/src/ciphers/caesar';
import { FormEvent, useEffect, useId, useState } from 'react';

export default function Caesar() {
  const inputId = useId();
  const keyId = useId();
  const alphabetId = useId();

  const [alphabet, setAlpahbet] = useState(`abcdefghijklmnopqrstuvwxyz`);

  const doConvert = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      input: { value: string };
      alphabet: { value: string };
      'insert-invalid': { checked: boolean };
      key: { value: number };
      mode: { checked: boolean };
    };

    const c = new CaesarCipher(
      target.key.value,
      target.alphabet.value,
      target[`insert-invalid`].checked,
    );

    return target.mode.checked
      ? c.encode(target.input.value)
      : c.decode(target.input.value);
  };

  return (
    <>
      <h1>Caesar Cipher Encode and Decode Online</h1>
      <Area>
        <Tool generateOutput={doConvert}>
          <Row>
            <LabeledElement content="Key" flexBasis={false} htmlFor={keyId}>
              <Counter
                min={0}
                max={alphabet.length - 1}
                id={keyId}
                suffix={(k) => (alphabet ? `a->${alphabet[k]}` : ``)}
                suffixStyle={{ fontVariantLigatures: `normal` }}
                name="key"
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
          <ToggleSwitch
            leftContent="Decode"
            rightContent="Encode"
            initialValue={true}
            name="mode"
          />
          <LabeledElement content={<strong>Input</strong>}>
            <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
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
