import {
  useState,
  useEffect,
  InputHTMLAttributes,
  useRef,
  forwardRef,
} from 'react';

import styles from '@/components/Toggle/toggle.module.css';

export type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'readonly' | 'type'
>;

const Toggle = forwardRef<HTMLInputElement, Props>(
  ({ id, onChange, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [toggled, setToggled] = useState<boolean>(
      props.checked || props.defaultChecked || false,
    );

    useEffect(() => {
      if (!inputRef.current) {
        return;
      }

      setToggled(inputRef.current.checked);
    }, [inputRef]);

    return (
      <div className={styles.toggle}>
        <button
          className={styles.button}
          type="button"
          role="switch"
          id={id}
          onClick={() => inputRef.current?.click()}
          aria-checked={toggled}
        >
          <input
            type="checkbox"
            className={styles.checkbox}
            ref={(e) => {
              inputRef.current = e;
              if (typeof ref === `function`) {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
            }}
            onChange={(e) => {
              setToggled(e.target.checked);
              onChange?.(e);
            }}
            readOnly
            {...props}
          />
          <span
            className={styles.check}
            style={{
              transform: toggled ? `translateX(18px)` : `none`,
            }}
          />
        </button>
      </div>
    );
  },
);

Toggle.displayName = `Toggle`;
export default Toggle;
