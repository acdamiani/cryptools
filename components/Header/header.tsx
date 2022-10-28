import dynamic from 'next/dynamic';

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

import ThemeToggle from '../ThemeToggle/theme-toggle';
import Logo from '@/public/logo.svg';
import Link from '../Link/link';

import styles from '@/components/Header/header.module.css';

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
                    Caesar Cipher
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Vigenère Cipher
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Pig Latin
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Polyalphabetic Cipher
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Substitution Cipher
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Beaufort Cipher
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Arnold Cipher
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
                    Secure Password
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Contact Information
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Lorem Ipsum
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Fake Credit Card
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Fake Phone Number
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <ThemeToggle iconOn={faMoon} iconOff={faSun} />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
