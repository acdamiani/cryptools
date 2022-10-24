import Logo from '@/public/logo.svg';

import styles from '@/components/Header/header.module.css';
import Link from '../Link/link';
import Toggle from '../Toggle/toggle';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Logo width={36} height={36} fill="white" />
          <h3>cryptools</h3>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.link}>
            <li>
              <div className={styles.flyout}>
                <button className={styles.flyoutButton} type="button">
                  <span className={styles.flyoutText}>Converters</span>
                </button>
                <div className={styles.flyoutBox}>
                  <Link className={styles.headerLink} href="/">
                    ASCII to Hex
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    ASCII to Binary
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Hex to Decimal
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Hex to Binary
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Hex to Oct
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Decimal to Binary
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Decimal to Hex
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Decimal to Oct
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.flyout}>
                <button className={styles.flyoutButton} type="button">
                  <span className={styles.flyoutText}>Ciphers</span>
                </button>
                <div className={styles.flyoutBox}>
                  <Link className={styles.headerLink} href="/">
                    ASCII to Hex
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    ASCII to Binary
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Hex to Decimal
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Hex to Binary
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Hex to Oct
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Decimal to Binary
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Decimal to Hex
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Decimal to Oct
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.flyout}>
                <button className={styles.flyoutButton} type="button">
                  <span className={styles.flyoutText}>Generators</span>
                </button>
                <div className={styles.flyoutBox}>
                  <Link className={styles.headerLink} href="/">
                    ASCII to Hex
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    ASCII to Binary
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Hex to Decimal
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Hex to Binary
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Hex to Oct
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Decimal to Binary
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Decimal to Hex
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Decimal to Oct
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <Toggle iconOn={faMoon} iconOff={faSun} />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
