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
  onCountChange?: (arg0: number) => any;
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
  onCountChange,
  ...props
}: Props) {
  const [value, setValue] = useState<number>(initialCount);
  const [inputFocused, setInputFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const setInputNative = (value: string) => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    const vs = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      `value`,
    )?.set;
    vs?.call(input, value);

    input.dispatchEvent(new Event(`input`, { bubbles: true }));
  };

  const useIsomorphicEffect =
    typeof document !== `undefined` ? useLayoutEffect : useEffect;

  useIsomorphicEffect(() => {
    setValue((v) => Math.max(min, Math.min(max, v)));
  }, [min, max]);

  useEffect(() => {
    onCountChange?.(value);
    setInputNative(value.toString());
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
            onBlur?.(e);
          }}
          onChange={(e) => {
            updateValue(e.target.value);
            onChange?.(e);
          }}
          {...props}
        />
        <div className={styles.number}>
          <span className={styles.value}>{value}</span>
          <span className={styles.suffix} style={suffixStyle}>
            {suffix && (typeof suffix === `string` ? suffix : suffix(value))}
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
