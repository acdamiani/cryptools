import { useState, useEffect } from 'react';

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
  toggleByClass: string;
}

export type Props = ToggleProps;

export default function Toggle({
  initialValue = false,
  value,
  onChange,
  iconOff,
  iconOn,
  id,
}: ToggleProps) {
  const [toggled, setIsToggled] = useState(initialValue);

  const isToggled = value ?? toggled;

  return (
    <>
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
        aria-checked={isToggled}
      >
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
