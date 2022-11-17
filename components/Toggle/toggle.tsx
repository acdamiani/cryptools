import {
  useState,
  useEffect,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  useRef,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import styles from '@/components/Toggle/toggle.module.css';

interface ToggleProps {
  label?: string;
  initialValue?: boolean;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  iconOff?: IconDefinition;
  iconOn?: IconDefinition;
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
  iconOff,
  iconOn,
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
    onValueChange?.(toggled);
  }, [toggled, onValueChange]);

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
        onClick={() => setToggled((x) => !x)}
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
        >
          <span className={styles.iconContainer}>
            {iconOff ? (
              <FontAwesomeIcon
                className={styles.icon}
                icon={iconOff}
                style={{
                  opacity: isToggled ? 0 : 1,
                }}
              />
            ) : (
              ``
            )}
            {iconOn ? (
              <FontAwesomeIcon
                className={styles.icon}
                icon={iconOn}
                style={{
                  opacity: isToggled ? 1 : 0,
                }}
              />
            ) : (
              ``
            )}
          </span>
        </span>
      </button>
    </div>
  );
}
