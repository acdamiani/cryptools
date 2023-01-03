import { ChangeEvent, FormEvent, useId, useRef } from 'react';
import LabeledElement from '../LabeledElement/labeled-element';
import TextArea from '../TextArea/text-area';
import Tool from '../Tool/tool';
import { WorkflowIcon } from '@primer/octicons-react';
import Select from '../Select/select';
import { useRouter } from 'next/router';
import ToggleSwitch from '../ToggleSwitch/toggle-switch';
import useFormFill from 'hooks/useFormFill';

const selectOptions = [
  `sha1`,
  `sha256`,
  `sha384`,
  `sha512`,
  `ripemd160`,
  `md5`,
] as const;
export type SelectOptions = typeof selectOptions[number];

const selectLabels: Record<SelectOptions, string> = {
  sha1: `SHA-1`,
  sha256: `SHA-256`,
  sha384: `SHA-384`,
  sha512: `SHA-512`,
  ripemd160: `RIPEMD-160`,
  md5: `MD5`,
};

interface InternalProps {
  hash: (input: string) => string | Promise<string>;
  hashBytes: (input: Uint8Array) => string | Promise<string>;
  hashName: SelectOptions;
  outputRows?: number;
}

const reTestHex = /^[a-fA-F0-9]+$/;

export default function Hash({
  hash,
  hashBytes,
  hashName,
  outputRows = 1,
}: InternalProps) {
  const inputId = useId();
  const hashId = useId();

  const router = useRouter();

  const ref = useRef<HTMLFormElement>(null);
  useFormFill(ref);

  const navigate = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/hashes/${e.target.value}`);
  };

  const doConvert = (
    e: FormEvent<HTMLFormElement>,
  ): string | Promise<string> => {
    const target = e.target as typeof e.target & {
      input: { value: string };
      bytes: { checked: boolean };
    };

    if (!target.bytes.checked) {
      return hash(target.input.value);
    } else {
      if (target.input.value === ``) {
        return ``;
      }

      if (!reTestHex.test(target.input.value)) {
        throw new Error(`Not a valid hex string`);
      }

      const byteCount = Math.ceil(target.input.value.length / 2);
      const val = target.input.value.padStart(byteCount * 2, `0`);

      return hashBytes(
        Uint8Array.from(val.match(/.{2}/g)!.map((byte) => parseInt(byte, 16))),
      );
    }
  };

  return (
    <Tool
      generateOutput={doConvert}
      outputProps={{ rows: outputRows }}
      buttonName="Hash"
      buttonIcon={<WorkflowIcon size={16} />}
      ref={ref}
    >
      <LabeledElement htmlFor={hashId} content="Hash">
        <Select id={hashId} defaultValue={hashName} onChange={navigate}>
          {selectOptions.map((x) => (
            <option key={x} value={x}>
              {selectLabels[x]}
            </option>
          ))}
        </Select>
      </LabeledElement>
      <ToggleSwitch leftContent="Text" rightContent="Bytes" name="bytes" />
      <LabeledElement htmlFor={inputId} content={<strong>Input</strong>}>
        <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
      </LabeledElement>
    </Tool>
  );
}
