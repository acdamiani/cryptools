import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import styles from '@/components/Counter/counter.module.css';

interface InternalProps {
  min?: number;
  max?: number;
  suffix?: string;
  initialValue?: number;
  onCountChange?: (arg0: number) => any;
}

export type Props = InternalProps & React.InputHTMLAttributes<HTMLInputElement>;

export default function Counter({
  min = 0,
  max = 10000,
  suffix,
  initialValue = min,
  className,
  onFocus,
  onBlur,
  onChange,
  onCountChange,
  ...props
}: Props) {
  const [inputValue, setInputValue] = useState<string>(initialValue.toString());
  const [value, setValue] = useState<number>(initialValue);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    onCountChange?.(value);
  }, [value, onCountChange]);

  const updateValue = (input: string) => {
    setValue((value) => {
      const int = parseInt(input);
      let update = isNaN(int) ? value : int;
      update = Math.max(min, Math.min(max, update));
      return update;
    });
  };

  return (
    <div
      className={classNames(styles.counter, inputFocused ? styles.focus : ``)}
    >
      <FontAwesomeIcon
        icon={faMinus}
        className={styles.icon}
        onClick={() => {
          setValue((v) => {
            const val = v - 1 < min ? max : v - 1;
            setInputValue(val.toString());
            return val;
          });
        }}
      />
      <div className={styles.counterInput}>
        <input
          type="number"
          className={classNames(styles.input, className)}
          onFocus={(e) => {
            setInputFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setInputFocused(false);
            setInputValue(value.toString());
            onBlur?.(e);
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
            updateValue(e.target.value);
            onChange?.(e);
          }}
          value={inputValue}
          {...props}
        />
        <div className={styles.number}>
          <span className={styles.value}>{value}</span>
          <span className={styles.suffix}>{suffix}</span>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faPlus}
        className={styles.icon}
        onClick={() => {
          setValue((v) => {
            const val = v + 1 > max ? min : v + 1;
            setInputValue(val.toString());
            return val;
          });
        }}
      />
    </div>
  );
}
