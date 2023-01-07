import Toggle, { Props as ToggleProps } from '../Toggle/toggle';
import classNames from 'classnames';
import styles from './toggle-switch.module.css';
import { ReactNode, useState } from 'react';

interface InternalProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export type Props = InternalProps & ToggleProps;

export default function ToggleSwitch({
  leftContent,
  rightContent,
  ...props
}: Props) {
  const [toggled, setToggled] = useState<boolean>(
    props.checked || props.defaultChecked || false,
  );

  return (
    <div className={styles.switch}>
      <span
        className={classNames(styles.content, !toggled && styles.highlight)}
      >
        {leftContent}
      </span>
      <Toggle onChange={(e) => setToggled(e.target.checked)} {...props} />
      <span className={classNames(styles.content, toggled && styles.highlight)}>
        {rightContent}
      </span>
    </div>
  );
}
