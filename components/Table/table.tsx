import { TableHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './table.module.css';

interface InternalProps {
  nohead?: boolean;
}

export type tableProps = InternalProps & TableHTMLAttributes<HTMLTableElement>;

export default function Table({
  nohead = false,
  className,
  children,
  ...props
}: tableProps) {
  return (
    <div className={styles.wrapper}>
      <table
        className={classNames(
          styles.table,
          nohead ? styles.nohead : ``,
          className,
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}
