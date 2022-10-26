import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import styles from '@/components/Area/area.module.css';

export interface AreaProps {
  backgroundColor?: React.CSSProperties['color'];
  borderColor?: React.CSSProperties['color'];
  topPad?: React.CSSProperties['paddingTop'];
}

export type Props = AreaProps & React.HTMLAttributes<HTMLDivElement>;

export default function Area({
  backgroundColor = `var(--ct-c-bg)`,
  borderColor = `var(--ct-c-border)`,
  topPad = `1rem`,
  children,
  className,
  ...props
}: Props) {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current == null) return;

    const cachedRef = ref.current,
      observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        { threshold: [1], rootMargin: `-1px 0px 0px 0px` },
      );

    observer.observe(cachedRef);

    return () => {
      observer.unobserve(cachedRef);
    };
  }, []);

  return (
    <>
      <style jsx>
        {`
          span {
            display: block;
            visibility: ${isSticky ? `visible` : `hidden`};
            background-color: ${backgroundColor};
            position: sticky;
            top: 0;
            padding-top: ${topPad};
            border-bottom: 1px solid ${borderColor};
            z-index: 100;
          }

          .${styles.area} {
            border: 1px solid ${borderColor};
            background-color: ${backgroundColor};
          }

          .${styles.wrapper} {
            margin-top: -${topPad};
          }
        `}
      </style>
      <div className={styles.wrapper}>
        <span ref={ref} />
        <div className={classNames(styles.area, className)} {...props}>
          {children}
        </div>
      </div>
    </>
  );
}
