import styles from './scrollable.module.css';

interface InternalProps {
  children: React.ReactNode;
}

export type ScrollableProps = InternalProps;

export default function Scrollable({ children }: ScrollableProps) {
  return <div className={styles.container}>{children}</div>;
}
