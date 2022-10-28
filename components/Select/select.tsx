import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import styles from '@/components/Select/select.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface LocalProps {
  prefixIcon?: IconDefinition;
  suffixIcon?: IconDefinition;
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
      {prefixIcon ? <FontAwesomeIcon icon={prefixIcon} /> : ``}
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
        <FontAwesomeIcon icon={suffixIcon} className={styles.prefix} />
      ) : (
        <FontAwesomeIcon icon={faChevronDown} className={styles.suffix} />
      )}
    </div>
  );
}
