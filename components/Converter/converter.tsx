import { FormEvent, useId, useRef, useState } from 'react';
import TextArea from '../TextArea/text-area';
import Select from '../Select/select';
import styles from './converter.module.css';
import Button from '../Button/button';
import {
  faCopy,
  faRightLeft,
  faRotate,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import Toggle from '../Toggle/toggle';

const selectOptions = [
  `text`,
  `hexadecimal`,
  `decimal`,
  `octal`,
  `binary`,
] as const;
export type SelectOptions = typeof selectOptions[number];

const delimiterOptions = [`space`, `comma`, `user defined`, `none`] as const;
export type DelimiterOptions = typeof delimiterOptions[number];

function capitalize(string: string) {
  return string
    .toLowerCase()
    .split(` `)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(` `);
}

interface InternalProps {
  convert: (input: string, settings: ConverterProperties) => string;
}

export interface ConverterProperties {
  delimiter?: string;
  prefix?: boolean;
}

export type Props = InternalProps;

export default function Converter({ convert = () => `` }: Props) {
  const fromId = useId();
  const toId = useId();
  const inputId = useId();
  const outputId = useId();
  const delimiterId = useId();

  const formRef = useRef<HTMLFormElement>(null);

  const [fromValue, setFromValue] = useState<SelectOptions>(`text`);
  const [toValue, setToValue] = useState<SelectOptions>(`binary`);
  const [delimiter, setDelimiter] = useState<DelimiterOptions>(`space`);
  const [auto, setAuto] = useState(true);

  const doConvert = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      input: { value: string };
      output: { value: string };
      from: { value: SelectOptions };
      to: { value: SelectOptions };
      prefix: { checked: boolean };
      delimiter: { value: DelimiterOptions };
      'user-delimiter': { value: string };
    };

    const props: ConverterProperties = {};

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

    props.prefix = target.prefix.checked;

    target.output.value = convert(target.input.value, props);
  };

  const doChange = (): void => {
    if (!auto || !formRef.current) {
      return;
    }

    formRef.current.dispatchEvent(
      new Event(`submit`, { cancelable: true, bubbles: true }),
    );
  };

  return (
    <form
      className={styles.converter}
      onSubmit={doConvert}
      ref={formRef}
      onChange={doChange}
    >
      <div className={styles.optionsRow}>
        <div className={styles.labeledElement}>
          <label htmlFor={fromId}>From</label>
          <Select
            id={fromId}
            name="from"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value as SelectOptions)}
          >
            {selectOptions.map((x) => (
              <option key={x} value={x} disabled={toValue === x}>
                {capitalize(x)}
              </option>
            ))}
          </Select>
        </div>
        <div className={styles.labeledElementNoflex}>
          <label>&nbsp;</label>
          <Button className={styles.convertButton} icon={faRightLeft} />
        </div>
        <div className={styles.labeledElement}>
          <label htmlFor={toId}>To</label>
          <Select
            id={toId}
            name="to"
            value={toValue}
            onChange={(e) => setToValue(e.target.value as SelectOptions)}
          >
            {selectOptions.map((x) => (
              <option key={x} value={x} disabled={fromValue === x}>
                {capitalize(x)}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className={styles.labeledElement}>
        <label htmlFor={inputId}>
          <strong>Input</strong>
        </label>
        <TextArea rows={3} id={inputId} name="input" spellCheck="false" />
      </div>
      <div className={styles.optionsRow}>
        <div className={styles.labeledElement}>
          <label htmlFor={delimiterId}>Delimiter</label>
          <div className={styles.optionsRow}>
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
          </div>
        </div>
      </div>
      <div className={styles.toggles}>
        <div className={styles.toggle}>
          <label>Auto Mode</label>
          <Toggle value={auto} onChange={(e) => setAuto(e)} />
        </div>
        <div className={styles.toggle}>
          <label>Add &apos;0x&apos; Prefix</label>
          <Toggle name="prefix" onChange={() => doChange()} />
        </div>
      </div>
      <div className={styles.optionsRow}>
        <Button icon={faRotate} type="submit">
          Convert
        </Button>
        <Button icon={faSave} secondary>
          Save Output
        </Button>
        <Button icon={faCopy} secondary>
          Copy Output
        </Button>
      </div>
      <div className={styles.labeledElement}>
        <label htmlFor={outputId}>
          <strong>Output</strong>
        </label>
        <TextArea
          rows={3}
          id={outputId}
          name="output"
          spellCheck="false"
          readOnly
        />
      </div>
    </form>
  );
}
