import { useId, useState } from 'react';
import classNames from 'classnames';
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

export default function Converter() {
  const fromId = useId();
  const toId = useId();
  const inputId = useId();
  const outputId = useId();
  const delimiterId = useId();

  const [fromValue, setFromValue] = useState<SelectOptions>(`text`);
  const [toValue, setToValue] = useState<SelectOptions>(`binary`);
  const [delimiter, setDelimiter] = useState<DelimiterOptions>(`space`);

  return (
    <>
      <div className={styles.optionsRow}>
        <div className={styles.labeledElement}>
          <label htmlFor={fromId}>From</label>
          <Select
            id={fromId}
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
        <TextArea rows={3} id={inputId} spellCheck="false" />
      </div>
      <div className={styles.optionsRow}>
        <div className={styles.labeledElement}>
          <label htmlFor={delimiterId}>Delimiter</label>
          <div className={styles.optionsRow}>
            <Select
              id={delimiterId}
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
              disabled={delimiter !== `user defined`}
              thin
            />
          </div>
        </div>
      </div>
      <div className={styles.toggles}>
        <div className={styles.toggle}>
          <label>Auto Mode</label>
          <Toggle />
        </div>
        <div className={styles.toggle}>
          <label>Add &apos;0x&apos; Prefix</label>
          <Toggle />
        </div>
      </div>
      <div className={styles.optionsRow}>
        <Button icon={faRotate}>Convert</Button>
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
        <TextArea rows={3} id={outputId} spellCheck="false" readOnly />
      </div>
    </>
  );
}
