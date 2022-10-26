import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import styles from '@/components/Toggle/toggle.module.css';

interface ToggleProps {
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
  iconOff?: IconDefinition;
  iconOn?: IconDefinition;
  id?: string;
}

export type Props = ToggleProps;

export default function Toggle({
  initialValue = false,
  onChange,
  iconOff,
  iconOn,
  id,
}: ToggleProps) {
  const [toggled, setIsToggled] = useState(initialValue);

  return (
    <button
      className={styles.button}
      type="button"
      role="switch"
      id={id}
      onClick={() =>
        setIsToggled((x) => {
          onChange?.(!x);
          return !x;
        })
      }
      aria-checked={toggled}
    >
      <span
        className={styles.check}
        style={{ transform: toggled ? `translateX(18px)` : `` }}
      >
        <span className={styles.iconContainer}>
          {iconOff ? (
            <FontAwesomeIcon
              className={styles.icon}
              icon={iconOff}
              style={{ opacity: toggled ? 0 : 1 }}
            />
          ) : (
            ``
          )}
          {iconOn ? (
            <FontAwesomeIcon
              className={styles.icon}
              icon={iconOn}
              style={{ opacity: toggled ? 1 : 0 }}
            />
          ) : (
            ``
          )}
        </span>
      </span>
    </button>
  );
}
