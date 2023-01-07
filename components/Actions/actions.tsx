import classNames from 'classnames';

import styles from '@/components/Actions/actions.module.css';

export type Props = React.HTMLProps<HTMLDivElement>;

export default function Actions({ className, children, ...props }: Props) {
  return (
    <div className={classNames(styles.actions, className)} {...props}>
      {children}
    </div>
  );
}
