import styles from '@/styles/Error.module.css';

function FiveHundred() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>500</h1>
      <span className={styles.text}>Server Error</span>
    </div>
  );
}

FiveHundred.displayName = `500`;
FiveHundred.useAds = false;

export default FiveHundred;
