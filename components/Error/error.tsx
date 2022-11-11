import { CSSProperties } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import styles from '@/components/Error/error.module.css';

type BorderTypes = `top` | `bottom` | `left` | `right` | `none`;

interface InternalProps {
  header?: string;
  borders?: BorderTypes;
}

export type Props = InternalProps & React.HTMLAttributes<HTMLDivElement>;

const borderDefinition: Record<BorderTypes, CSSProperties> = {
  top: {
    borderTopLeftRadius: `0`,
    borderTopRightRadius: `0`,
  },
  bottom: {
    borderBottomLeftRadius: `0`,
    borderBottomRightRadius: `0`,
  },
  left: {
    borderTopLeftRadius: `0`,
    borderBottomLeftRadius: `0`,
  },
  right: {
    borderTopRightRadius: `0`,
    borderBottomRightRadius: `0`,
  },
  none: {},
};

export default function Error({
  header = `Error`,
  borders = `none`,
  children,
  style,
  className,
  ...props
}: Props) {
  return (
    <div
      className={classNames(styles.error, className)}
      style={{
        ...style,
        ...borderDefinition[borders],
      }}
      {...props}
    >
      <span className={styles.headerContainer}>
        <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
        <h3 className={styles.header}>{header}</h3>
      </span>
      {children}
    </div>
  );
}
