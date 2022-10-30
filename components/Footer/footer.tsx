import Link from '../Link/link';

import styles from '@/components/Footer/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>Made with ❤️ by August Damiani</span>
      <Link className={styles.link} href="privacy-policy">
        Privacy Policy
      </Link>
      <Link className={styles.link} href="terms-of-use">
        Terms of Use
      </Link>
      <a href="https://ko-fi.com/W7W8FW50R" target="_blank" rel="noreferrer">
        <img
          height="36"
          className={styles.coffee}
          style={{ border: `0`, height: `36px` }}
          src="https://storage.ko-fi.com/cdn/kofi3.png?v=3"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
    </footer>
  );
}
