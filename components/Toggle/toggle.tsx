import {
  useState,
  useEffect,
  InputHTMLAttributes,
  useRef,
  ReactNode,
} from 'react';
import { CircleIcon } from '@primer/octicons-react';

import styles from '@/components/Toggle/toggle.module.css';

interface ToggleProps {
  label?: string;
  initialValue?: boolean;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  id?: string;
}

export type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'checked'
> &
  ToggleProps;

export default function Toggle({
  initialValue,
  value,
  onValueChange,
  id,
  label,
  ...props
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [toggled, setToggled] = useState<boolean>(
    initialValue ?? value ?? false,
  );
  const isToggled = value ?? toggled;

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    if (inputRef.current.checked !== isToggled) {
      inputRef.current.click();
    }
  }, [isToggled]);

  return (
    <div className={styles.toggle}>
      {label && <label>{label}</label>}
      <button
        className={styles.button}
        type="button"
        role="switch"
        id={id}
        onClick={() => {
          setToggled((x) => !x);
          onValueChange?.(!toggled);
        }}
        aria-checked={isToggled}
      >
        <input
          type="checkbox"
          className={styles.checkbox}
          ref={inputRef}
          onClick={(e) => {
            e.stopPropagation();
            props.onClick?.(e);
          }}
          readOnly
          {...props}
        />
        <span
          className={styles.check}
          style={{
            transform: isToggled ? `translateX(18px)` : ``,
          }}
        />
      </button>
    </div>
  );
}
