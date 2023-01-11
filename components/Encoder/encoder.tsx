import { ChangeEvent, FormEvent, ReactNode, useId, useRef } from 'react';
import ToggleSwitch from '../ToggleSwitch/toggle-switch';
import LabeledElement from '../LabeledElement/labeled-element';
import TextArea from '../TextArea/text-area';
import Tool from '../Tool/tool';
import { TypographyIcon } from '@primer/octicons-react';
import Select from '../Select/select';
import { useRouter } from 'next/router';
import useFormFill from '@/hooks/useFormFill';

const selectOptions = [`base32`, `base64`, `url`, `punycode`] as const;
export type SelectOptions = (typeof selectOptions)[number];

const selectLabels: Record<SelectOptions, string> = {
  base32: `Base32`,
  base64: `Base64`,
  url: `URL`,
  punycode: `Punycode`,
};

interface InternalProps {
  encoderName: SelectOptions;
  encode: (input: string, obj: any) => Promise<string> | string;
  decode: (input: string, obj: any) => Promise<string> | string;
  construct?: (e: FormEvent<HTMLFormElement>) => any | Promise<any>;
  outputRows?: number;
  children?: ReactNode;
}

export type EncoderProps = InternalProps;

export default function Encoder({
  encode,
  decode,
  construct,
  encoderName,
  outputRows = 1,
  children,
}: EncoderProps) {
  const inputId = useId();
  const hashId = useId();

  const router = useRouter();

  const ref = useRef<HTMLFormElement>(null);
  useFormFill(ref);

  const navigate = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/encoders/${e.target.value}`);
  };

  const doConvert = (
    e: FormEvent<HTMLFormElement>,
  ): Promise<string> | string => {
    const target = e.target as typeof e.target & {
      input: { value: string };
      mode: { checked: boolean };
    };

    if (construct) {
      return Promise.resolve(construct(e)).then((constructed) => {
        return target.mode.checked
          ? encode(target.input.value, constructed)
          : decode(target.input.value, constructed);
      });
    } else {
      return target.mode.checked
        ? encode(target.input.value, null)
        : decode(target.input.value, null);
    }
  };

  return (
    <Tool
      generateOutput={doConvert}
      outputProps={{ rows: outputRows }}
      buttonName="Encode/Decode"
      buttonIcon={<TypographyIcon size={16} />}
      ref={ref}
    >
      <LabeledElement htmlFor={hashId} content="Encoder">
        <Select id={hashId} defaultValue={encoderName} onChange={navigate}>
          {selectOptions.map((x) => (
            <option key={x} value={x}>
              {selectLabels[x]}
            </option>
          ))}
        </Select>
      </LabeledElement>
      <ToggleSwitch
        leftContent="Decode"
        rightContent="Encode"
        defaultChecked={true}
        name="mode"
      />
      <LabeledElement htmlFor={inputId} content={<strong>Input</strong>}>
        <TextArea
          rows={3}
          id={inputId}
          name="input"
          spellCheck="false"
          defaultValue={router.query[`input`] || ``}
        />
      </LabeledElement>
      {children}
    </Tool>
  );
}
