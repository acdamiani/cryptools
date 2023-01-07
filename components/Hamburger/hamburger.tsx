import { useState, HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './hamburger.module.css';

interface InternalProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

export type Props = InternalProps & HTMLAttributes<HTMLDivElement>;

export default function Hamburger({
  value,
  onValueChange,
  className,
  onClick,
  ...props
}: Props) {
  const [toggled, setToggled] = useState(false);
  const isToggled = value ?? toggled;

  return (
    <div
      className={classNames(
        styles.hamburger,
        isToggled && styles.toggled,
        className,
      )}
      onClick={(e) => {
        setToggled((x) => !x);
        onValueChange?.(!toggled);
        onClick?.(e);
      }}
      {...props}
    >
      <span className={classNames(styles.line, styles.one)} />
      <span className={classNames(styles.line, styles.two)} />
      <span className={classNames(styles.line, styles.three)} />
    </div>
  );
}
