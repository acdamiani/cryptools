import { FormEvent, useEffect, useId, useState } from 'react';
import TextArea from '../TextArea/text-area';
import Select from '../Select/select';
import styles from './converter.module.css';
import Button from '../Button/button';
import { ArrowSwitchIcon } from '@primer/octicons-react';
import Toggle from '../Toggle/toggle';
import LabeledElement from '../LabeledElement/labeled-element';
import Tool from '../Tool/tool';
import Row from '../Row/row';

const selectOptions = [
  `text`,
  `hexadecimal`,
  `decimal`,
  `octal`,
  `binary`,
] as const;
export type SelectOptions = typeof selectOptions[number];

export const SelectAbbr: Record<SelectOptions, string> = {
  text: `ascii`,
  hexadecimal: `hex`,
  decimal: `dec`,
  octal: `oct`,
  binary: `binary`,
};

const delimiterOptions = [`space`, `comma`, `user defined`, `none`] as const;
export type DelimiterOptions = typeof delimiterOptions[number];

const conversionExceptions: Partial<Record<SelectOptions, SelectOptions[]>> = {
  decimal: [`text`],
};

function capitalize(string: string) {
  return string
    .toLowerCase()
    .split(` `)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(` `);
}

interface InternalProps {
  convert: (input: string, settings: ConverterProperties) => string;
  onTargetsChange?: (from: SelectOptions, to: SelectOptions) => void;
  initialFrom?: SelectOptions;
  initialTo?: SelectOptions;
  showDelimiter?: boolean;
  showPrefix?: boolean;
  prefixText?: string;
}

export interface ConverterProperties {
  delimiter?: string;
  prefix?: boolean;
}

export type Props = InternalProps;

export default function Converter({
  convert = () => ``,
  onTargetsChange,
  initialFrom = `text`,
  initialTo = `hexadecimal`,
  showDelimiter = true,
  showPrefix = true,
  prefixText = `0x`,
}: Props) {
  const fromId = useId();
  const toId = useId();
  const inputId = useId();
  const delimiterId = useId();

  const [fromValue, setFromValue] = useState<SelectOptions>(initialFrom);
  const [toValue, setToValue] = useState<SelectOptions>(initialTo);
  const [delimiter, setDelimiter] = useState<DelimiterOptions>(`space`);

  useEffect(() => {
    onTargetsChange?.(fromValue, toValue);
  }, [fromValue, toValue, onTargetsChange]);

  const doConvert = (e: FormEvent<HTMLFormElement>): string => {
    const target = e.target as typeof e.target & {
      input: { value: string };
      from: { value: SelectOptions };
      to: { value: SelectOptions };
      prefix: { checked: boolean };
      delimiter: { value: DelimiterOptions };
      'user-delimiter': { value: string };
    };

    const props: ConverterProperties = {};

    if (showDelimiter) {
      switch (target.delimiter.value) {
        case `space`:
          props.delimiter = ` `;
          break;
        case `comma`:
          props.delimiter = `,`;
          break;
        case `user defined`:
          props.delimiter = target[`user-delimiter`].value;
          break;
        case `none`:
          props.delimiter = ``;
          break;
      }
    }

    if (showPrefix) {
      props.prefix = target.prefix.checked;
    }

    return convert(target.input.value, props);
  };

  const doSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
  };

  return (
    <Tool generateOutput={doConvert}>
      <Row>
        <LabeledElement htmlFor={fromId} content="From">
          <Select
            id={fromId}
            name="from"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value as SelectOptions)}
          >
            {selectOptions.map((x) => (
              <option
                key={x}
                value={x}
                disabled={
                  toValue === x || conversionExceptions[x]?.includes(toValue)
                }
              >
                {capitalize(x)}
              </option>
            ))}
          </Select>
        </LabeledElement>
        <LabeledElement
          flexBasis={false}
          content="Swap"
          className={styles.swapLabel}
        >
          <Button
            className={styles.convertButton}
            icon={<ArrowSwitchIcon size={16} />}
            disabled={conversionExceptions[toValue]?.includes(fromValue)}
            onClick={doSwap}
          />
        </LabeledElement>
        <LabeledElement htmlFor={toId} content="To">
          <Select
            id={toId}
            name="to"
            value={toValue}
            onChange={(e) => setToValue(e.target.value as SelectOptions)}
          >
            {selectOptions.map((x) => (
              <option
                key={x}
                value={x}
                disabled={
                  fromValue === x ||
                  conversionExceptions[fromValue]?.includes(x)
                }
              >
                {capitalize(x)}
              </option>
            ))}
          </Select>
        </LabeledElement>
      </Row>
      <LabeledElement htmlFor={inputId} content={<strong>Input</strong>}>
        <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
      </LabeledElement>
      {showDelimiter && (
        <LabeledElement htmlFor={delimiterId} content="Delimiter">
          <Row>
            <Select
              id={delimiterId}
              name="delimiter"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value as DelimiterOptions)}
            >
              {delimiterOptions.map((x) => (
                <option key={x} value={x}>
                  {capitalize(x)}
                </option>
              ))}
            </Select>
            <TextArea
              className={styles.delimiter}
              name="user-delimiter"
              disabled={delimiter !== `user defined`}
              spellCheck="false"
              thin
            />
          </Row>
        </LabeledElement>
      )}
      {showPrefix && (
        <Toggle label={`Add '${prefixText}' Prefix`} name="prefix" />
      )}
    </Tool>
  );
}
