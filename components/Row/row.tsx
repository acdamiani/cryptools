import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './row.module.css';

export type Props = HTMLAttributes<HTMLDivElement>;

export default function Row({ children, className, ...props }: Props) {
  return (
    <div className={classNames(styles.row, className)} {...props}>
      {children}
    </div>
  );
}
