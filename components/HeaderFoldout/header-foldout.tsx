import { HTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import styles from './header-foldout.module.css';
import { PlusIcon } from '@primer/octicons-react';

interface InternalProps {
  title?: string;
}

export type Props = InternalProps & HTMLAttributes<HTMLDivElement>;

export default function HeaderFoldout({
  title = `Title`,
  className,
  children,
  ...props
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={classNames(
        className,
        styles.foldout,
        expanded && styles.expanded,
      )}
      {...props}
    >
      <button
        className={styles.foldoutHeader}
        onClick={() => setExpanded((e) => !e)}
      >
        <span className={styles.foldoutTitle}>{title}</span>
        <PlusIcon
          size={16}
          fill="var(--ct-c-border)"
          className={classNames(styles.icon, expanded && styles.expanded)}
        />
      </button>
      <div
        className={classNames(
          styles.foldoutContent,
          expanded && styles.expanded,
        )}
      >
        {children}
      </div>
    </div>
  );
}
