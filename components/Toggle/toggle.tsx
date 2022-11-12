import {
  useState,
  useEffect,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import styles from '@/components/Toggle/toggle.module.css';

interface ToggleProps {
  initialValue?: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
  iconOff?: IconDefinition;
  iconOn?: IconDefinition;
  id?: string;
}

export type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'checked'
> &
  ToggleProps;

export default function Toggle({
  initialValue,
  value,
  onChange,
  iconOff,
  iconOn,
  id,
  ...props
}: Props) {
  const [toggled, setIsToggled] = useState<boolean>(
    initialValue ?? value ?? false,
  );
  const isToggled = value ?? toggled;

  useEffect(() => {
    onChange?.(toggled);
  }, [toggled, onChange]);

  return (
    <>
      <button
        className={styles.button}
        type="button"
        role="switch"
        id={id}
        onClick={() => setIsToggled((x) => !x)}
        aria-checked={isToggled}
      >
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isToggled}
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
    </>
  );
}
