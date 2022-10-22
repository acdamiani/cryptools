import classNames from 'classnames';

import styles from '@/components/Area/area.module.css';

export interface AreaProps {
  backgroundColor?: React.CSSProperties['color'];
  borderColor?: React.CSSProperties['color'];
}

export type Props = AreaProps & React.HTMLAttributes<HTMLDivElement>;

export default function Area({
  backgroundColor = `var(--color-background)`,
  borderColor = `gray`,
  children,
  className,
  ...props
}: Props) {
  return (
    <>
      <style jsx>
        {`
          span {
            border: 1px solid ${borderColor};
          }
        `}
      </style>
      <div className={styles.wrapper}>
        <span className={styles.border} />
        <div className={classNames(styles.area, className)} {...props}>
          {children}
        </div>
      </div>
    </>
  );
}
