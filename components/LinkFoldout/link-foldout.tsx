import { HeaderItem } from '@/components/Header/header';
import styles from './link-foldout.module.css';

interface InternalProps {
  links: HeaderItem[];
}

export type LinkFoldoutProps = InternalProps;

function doItem(item: HeaderItem) {
  return (
    <div className={styles.foldoutItem}>
      <span className={styles.foldoutContent}>{item.text}</span>
    </div>
  );
}

export default function LinkFoldout({ links }: LinkFoldoutProps) {
  return <div className={styles.foldout}>{links.map((x) => doItem(x))}</div>;
}
