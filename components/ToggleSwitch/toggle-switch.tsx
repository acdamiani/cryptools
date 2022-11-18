import Toggle, { Props as ToggleProps } from '../Toggle/toggle';
import classNames from 'classnames';
import styles from './toggle-switch.module.css';
import { ReactNode, useState } from 'react';

interface InternalProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export type Props = InternalProps & Omit<ToggleProps, 'label'>;

export default function ToggleSwitch({
  leftContent,
  rightContent,
  initialValue,
  onValueChange,
  ...props
}: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className={styles.switch}>
      <span className={classNames(styles.content, !value && styles.highlight)}>
        {leftContent}
      </span>
      <Toggle
        initialValue={initialValue}
        onValueChange={(e) => {
          setValue(e);
          onValueChange?.(e);
        }}
        {...props}
        label=""
      />
      <span className={classNames(styles.content, value && styles.highlight)}>
        {rightContent}
      </span>
    </div>
  );
}
