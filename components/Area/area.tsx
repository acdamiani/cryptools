import classNames from 'classnames';

import styles from '@/components/Area/area.module.css';

export interface AreaProps {
  backgroundColor?: React.CSSProperties['color'];
  borderColor?: React.CSSProperties['color'];
}

export type Props = AreaProps & React.HTMLAttributes<HTMLDivElement>;

export default function Area({
  backgroundColor = `var(--ct-c-bg)`,
  borderColor = `var(--ct-c-border)`,
  children,
  className,
  ...props
}: Props) {
  return (
    <>
      <style jsx>
        {`
          .${styles.area} {
            border: 1px solid ${borderColor};
            background-color: ${backgroundColor};
          }
        `}
      </style>
      <div className={styles.wrapper}>
        <div className={classNames(styles.area, className)} {...props}>
          {children}
        </div>
      </div>
    </>
  );
}
