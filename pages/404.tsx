import styles from '@/styles/Error.module.css';

function FourOhFour() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>404</h1>
      <span className={styles.text}>Not Found</span>
    </div>
  );
}

FourOhFour.displayName = `404`;
FourOhFour.useAds = false;

export default FourOhFour;
