import GithubIcon from '@/public/svg/brands/github.svg';
import TwitterIcon from '@/public/svg/brands/twitter.svg';
import { MailIcon } from '@primer/octicons-react';
import styles from '@/components/Footer/footer.module.css';
import Link from '../Link/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerRow}>
        <span className={styles.text}>Made with ❤️ by August Damiani</span>
        <div className={styles.icons}>
          <a
            className={styles.socialLink}
            href="https://github.com/acdamiani/cryptools"
            aria-label="github"
          >
            <GithubIcon className={styles.socialLinkIcon} />
          </a>
          <a
            className={styles.socialLink}
            href="https://twitter.com"
            aria-label="twitter"
          >
            <TwitterIcon className={styles.socialLinkIcon} />
          </a>
          <a
            className={styles.socialLink}
            href="mailto:damiani.august@gmail.com"
            aria-label="email"
          >
            <MailIcon className={styles.socialLinkIcon} />
          </a>
        </div>
      </div>
      <div className={styles.footerRow}>
        <div className={styles.links}>
          <Link href="/about" className={styles.footerLink}>
            About
          </Link>
          <Link href="/legal" className={styles.footerLink}>
            Legal
          </Link>
        </div>
      </div>
    </footer>
  );
}
