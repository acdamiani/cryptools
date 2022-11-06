import NextLink from 'next/link';

import classNames from 'classnames';

import styles from '@/components/Link/link.module.css';

export type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({
  href = `/`,
  className,
  children,
  ...props
}: Props) {
  return (
    <NextLink href={href}>
      <a className={classNames(styles.link, className)} {...props}>
        {children}
      </a>
    </NextLink>
  );
}