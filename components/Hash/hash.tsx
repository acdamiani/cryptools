import { ChangeEvent, FormEvent, useEffect, useId } from 'react';
import LabeledElement from '../LabeledElement/labeled-element';
import TextArea from '../TextArea/text-area';
import Tool from '../Tool/tool';
import { WorkflowIcon } from '@primer/octicons-react';
import Select from '../Select/select';
import { useRouter } from 'next/router';

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
  hashName: SelectOptions;
  outputRows?: number;
}

export default function Hash({
  hash,
  hashName,
  outputRows = 1,
}: InternalProps) {
  const inputId = useId();
  const hashId = useId();

  const router = useRouter();

  const navigate = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/hashes/${e.target.value}`);
  };

  const doConvert = (
    e: FormEvent<HTMLFormElement>,
  ): string | Promise<string> => {
    const target = e.target as typeof e.target & {
      input: { value: string };
    };

    return hash(target.input.value);
  };

  return (
    <Tool
      generateOutput={doConvert}
      outputProps={{ rows: outputRows }}
      buttonName="Hash"
      buttonIcon={<WorkflowIcon size={16} />}
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
      <LabeledElement htmlFor={inputId} content={<strong>Input</strong>}>
        <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
      </LabeledElement>
    </Tool>
  );
}
