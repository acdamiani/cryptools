import classNames from 'classnames';
import styles from '@/components/Select/select.module.css';
import { ChevronDownIcon } from '@primer/octicons-react';
import { ReactNode } from 'react';

interface LocalProps {
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

export type Props = React.SelectHTMLAttributes<HTMLSelectElement> & LocalProps;

export default function Select({
  prefixIcon,
  suffixIcon,
  className,
  style,
  children,
  ...props
}: Props) {
  return (
    <div className={styles.selectContainer}>
      {prefixIcon ? <span className={styles.prefix}>{prefixIcon}</span> : ``}
      <select
        className={classNames(className, styles.select)}
        style={{
          padding: `0.5rem 2rem 0.5rem ${prefixIcon ? `2rem` : `0.5rem`}`,
          ...style,
        }}
        {...props}
      >
        {children}
      </select>
      {suffixIcon ? (
        <span className={styles.suffix}>{suffixIcon}</span>
      ) : (
        <span className={styles.suffix}>
          <ChevronDownIcon />
        </span>
      )}
    </div>
  );
}
