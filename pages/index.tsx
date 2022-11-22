import styles from '@/styles/Home.module.css';
import Link from '@/components/Link/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Conversion, ciphers, and encoders online - Cryptools</title>
      </Head>
      <h1>Online Tools for Developers</h1>
      <div className={styles.cards}>
        <div className={styles.cardContainer}>
          <h3>Conversion</h3>
          <div className={styles.card}>
            <ul className={styles.links}>
              <li>
                <Link className={styles.link} href="/">
                  ASCII to Hex
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  ASCII to Binary
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Hex to ASCII
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Hex to Decimal
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Hex to Octal
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Hex to Binary
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.cardContainer}>
          <h3>Ciphers</h3>
          <div className={styles.card}>
            <ul className={styles.links}>
              <li>
                <Link className={styles.link} href="/">
                  Caesar Cipher
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Vigenère Cipher
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Pig Latin
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Polyalphabetic Cipher
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Substitution Cipher
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Beaufort Cipher
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Arnold Cipher
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.cardContainer}>
          <h3>Hashes</h3>
          <div className={styles.card}>
            <ul className={styles.links}>
              <li>
                <Link className={styles.link} href="/">
                  MD5
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  SHA-1
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  SHA-256
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  SHA-384
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  SHA-512
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  RIPEMD-160
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.cardContainer}>
          <h3>Encoders</h3>
          <div className={styles.card}>
            <ul className={styles.links}>
              <li>
                <Link className={styles.link} href="/">
                  Base32
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Base64
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  URL
                </Link>
              </li>
              <li>
                <Link className={styles.link} href="/">
                  Punycode
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
