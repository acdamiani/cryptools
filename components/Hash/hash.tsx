import { FormEvent, useId } from 'react';
import LabeledElement from '../LabeledElement/labeled-element';
import TextArea from '../TextArea/text-area';
import Tool from '../Tool/tool';
import { WorkflowIcon } from '@primer/octicons-react';

interface InternalProps {
  hash: (input: string) => string | Promise<string>;
}

export default function Hash({ hash }: InternalProps) {
  const inputId = useId();

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
      outputProps={{ rows: 1 }}
      buttonName="Hash"
      buttonIcon={<WorkflowIcon size={16} />}
    >
      <LabeledElement htmlFor={inputId} content={<strong>Input</strong>}>
        <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
      </LabeledElement>
    </Tool>
  );
}
