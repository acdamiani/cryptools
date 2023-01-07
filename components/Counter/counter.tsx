import {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { PlusIcon, DashIcon } from '@primer/octicons-react';
import classNames from 'classnames';
import styles from '@/components/Counter/counter.module.css';

interface InternalProps {
  min?: number;
  max?: number;
  suffix?: string | ((key: number) => string);
  initialCount?: number;
  suffixStyle?: CSSProperties;
}

export type Props = InternalProps & React.InputHTMLAttributes<HTMLInputElement>;

export default function Counter({
  min = 0,
  max = 10000,
  suffix,
  suffixStyle,
  initialCount = min,
  className,
  onFocus,
  onBlur,
  onChange,
  ...props
}: Props) {
  const [inputValue, setInputValue] = useState(initialCount);
  const [inputFocused, setInputFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const setValue = (value: number | ((value: number) => number)) => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    const valueDesc = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      `value`,
    );

    const valueSetter = (input: HTMLInputElement, value: number): void =>
      valueDesc?.set?.call(input, value);

    const valueGetter = (input: HTMLInputElement): number =>
      parseInt(valueDesc?.get?.call(input));

    if (typeof value === `number`) {
      valueSetter(input, value);
    } else if (typeof value === `function`) {
      valueSetter(input, value(valueGetter(input)));
    }

    input.dispatchEvent(new Event(`input`, { bubbles: true }));
  };

  const useIsomorphicEffect =
    typeof document !== `undefined` ? useLayoutEffect : useEffect;

  useIsomorphicEffect(() => {
    setValue((v) => Math.max(min, Math.min(max, v)));
  }, [min, max]);

  const updateValue = (input: number) => {
    let update = isNaN(input) ? 0 : input;
    update = Math.max(min, Math.min(max, update));
    setValue(update);
  };

  return (
    <div
      className={classNames(styles.counter, inputFocused ? styles.focus : ``)}
    >
      <span
        className={styles.icon}
        onClick={() => setValue((v) => (v - 1 < min ? max : v - 1))}
      >
        <DashIcon size={16} fill="var(--ct-c-font)" />
      </span>
      <div className={styles.counterInput}>
        <input
          type="number"
          ref={inputRef}
          className={classNames(styles.input, className)}
          onFocus={(e) => {
            setInputFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setInputFocused(false);
            updateValue(e.target.valueAsNumber);
            onBlur?.(e);
          }}
          onChange={(e) => {
            setInputValue(e.target.valueAsNumber);
            console.log(`hey`);
            onChange?.(e);
          }}
          defaultValue={initialCount}
          {...props}
        />
        <div className={styles.number}>
          <span className={styles.value}>{inputValue}</span>
          <span className={styles.suffix} style={suffixStyle}>
            {suffix &&
              (typeof suffix === `string` ? suffix : suffix(inputValue))}
          </span>
        </div>
      </div>
      <span
        className={styles.icon}
        onClick={() => setValue((v) => (v + 1 > max ? min : v + 1))}
      >
        <PlusIcon size={16} fill="var(--ct-c-font)" />
      </span>
    </div>
  );
}
