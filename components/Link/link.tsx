import NextLink from 'next/link';

import classNames from 'classnames';

import styles from '@/components/Link/link.module.css';
import { AnchorHTMLAttributes } from 'react';

export type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({
  href = `/`,
  className,
  children,
  ...props
}: Props) {
  return (
    <NextLink
      href={href}
      className={classNames(styles.link, className)}
      {...props}
    >
      {children}
    </NextLink>
  );
}
