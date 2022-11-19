import { useState, HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './hamburger.module.css';

export type Props = HTMLAttributes<HTMLDivElement>;

export default function Hamburger({ className, onClick, ...props }: Props) {
  const [toggled, setToggled] = useState(false);

  return (
    <div
      className={classNames(
        styles.hamburger,
        toggled && styles.toggled,
        className,
      )}
      onClick={(e) => {
        setToggled((x) => !x);
        onClick?.(e);
      }}
    >
      <span className={classNames(styles.line, styles.one)} />
      <span className={classNames(styles.line, styles.two)} />
      <span className={classNames(styles.line, styles.three)} />
    </div>
  );
}
