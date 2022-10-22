import styles from '@/layouts/page.module.css';

export interface PageProps {
  children?: React.ReactNode;
}

export type Props = PageProps;

export default function Page({ children }: Props) {
  return <div className={styles.page}>{children}</div>;
}
