import ThemeToggle from '../ThemeToggle/theme-toggle';
import Logo from '@/public/logo.svg';
import Link from '../Link/link';

import styles from '@/components/Header/header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
                  <span className={styles.flyoutText}>Conversion</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={styles.icon}
                  />
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
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={styles.icon}
                  />
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
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={styles.icon}
                  />
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
              <div className={styles.flyout}>
                <button className={styles.flyoutButton} type="button">
                  <span className={styles.flyoutText}>Encoders</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={styles.icon}
                  />
                </button>
                <div className={styles.flyoutBox}>
                  <Link className={styles.headerLink} href="/encoders/url">
                    URL
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Base32
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Base64
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Punycode
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.flyout}>
                <button className={styles.flyoutButton} type="button">
                  <span className={styles.flyoutText}>Networking</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={styles.icon}
                  />
                </button>
                <div className={styles.flyoutBox}>
                  <Link className={styles.headerLink} href="/">
                    What is my IP?
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    DNS Lookup
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    DNS Record Lookup
                  </Link>
                  <Link className={styles.headerLink} href="/">
                    Port Scanner
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
