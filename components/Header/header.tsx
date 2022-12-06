import ThemeToggle from '../ThemeToggle/theme-toggle';
import Logo from '@/public/logo.svg';
import Link from '../Link/link';
import styles from '@/components/Header/header.module.css';
import { ChevronDownIcon, ChevronRightIcon } from '@primer/octicons-react';
import Hamburger from '../Hamburger/hamburger';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import HeaderFoldout from '../HeaderFoldout/header-foldout';
import { useRouter } from 'next/router';
import Area from '../Area/area';

type HeaderItem = {
  text: string;
  url?: string | HeaderItem[];
};

const headerContents: HeaderItem[] = [
  {
    text: `Conversion`,
    url: [
      {
        text: `ASCII`,
        url: [
          { text: `ASCII to Hex`, url: `/converters/ascii-to-hex` },
          { text: `ASCII to Decimal`, url: `/converters/ascii-to-dec` },
          { text: `ASCII to Octal`, url: `/converters/ascii-to-oct` },
          { text: `ASCII to Binary`, url: `/converters/ascii-to-binary` },
        ],
      },
      {
        text: `Decimal`,
        url: [
          { text: `Decimal to Hex`, url: `/converters/dec-to-hex` },
          { text: `Decimal to Octal`, url: `/converters/dec-to-oct` },
          { text: `Decimal to Binary`, url: `/converters/dec-to-binary` },
        ],
      },
      {
        text: `Binary`,
        url: [
          { text: `Binary to Hex`, url: `/converters/binary-to-hex` },
          { text: `Binary to Octal`, url: `/converters/binary-to-octal` },
          { text: `Binary to ASCII`, url: `/converters/binary-to-ascii` },
          { text: `Binary to Decimal`, url: `/converters/binary-to-dec` },
        ],
      },
      {
        text: `Octal`,
        url: [
          { text: `Octal to Hex`, url: `/converters/oct-to-hex` },
          { text: `Octal to Binary`, url: `/converters/oct-to-binary` },
          { text: `Octal to ASCII`, url: `/converters/oct-to-ascii` },
          { text: `Octal to Decimal`, url: `/converters/oct-to-dec` },
        ],
      },
      {
        text: `Hexadecimal`,
        url: [
          { text: `Hex to Octal`, url: `/converters/hex-to-oct` },
          { text: `Hex to Binary`, url: `/converters/hex-to-binary` },
          { text: `Hex to ASCII`, url: `/converters/hex-to-ascii` },
          { text: `Hex to Decimal`, url: `/converters/hex-to-dec` },
        ],
      },
    ],
  },
  {
    text: `Ciphers`,
    url: [
      { text: `Caesar`, url: `/ciphers/caesar` },
      { text: `Vigenere`, url: `/ciphers/vigenere` },
      { text: `Bacon`, url: `/ciphers/bacon` },
      { text: `ROT13`, url: `/ciphers/rot13` },
      { text: `a1z26`, url: `/ciphers/a1z26` },
    ],
  },
  {
    text: `Hashes`,
    url: [
      { text: `MD5`, url: `/hashes/md5` },
      { text: `SHA-1`, url: `/hashes/sha1` },
      { text: `SHA-256`, url: `/hashes/sha256` },
      { text: `SHA-384`, url: `/hashes/sha384` },
      { text: `SHA-512`, url: `/hashes/sha512` },
      { text: `RIPEMD-160`, url: `/hashes/ripemd160` },
    ],
  },
  {
    text: `Encoders`,
    url: [
      { text: `URL`, url: `/encoders/url` },
      { text: `Punycode`, url: `/encoders/punycode` },
      { text: `Base32`, url: `/encoders/base32` },
      { text: `Base64`, url: `/encoders/base64` },
    ],
  },
];

const doHeaderItem = (item: HeaderItem, topLevel: boolean) => {
  const isLink = typeof item.url === `string`;

  return isLink ? (
    <div className={styles.headerLinkWrapper}>
      <Link className={styles.headerLink} href={item.url as string}>
        {item.text}
      </Link>
    </div>
  ) : (
    <div className={classNames(styles.flyout, !topLevel && styles.right)}>
      <button
        className={classNames(styles.flyoutButton, !topLevel && styles.right)}
        type="button"
      >
        <span className={styles.flyoutText}>{item.text}</span>
        {topLevel ? (
          <ChevronDownIcon
            size={14}
            className={styles.icon}
            fill="var(--ct-c-font)"
          />
        ) : (
          <ChevronRightIcon
            size={14}
            className={styles.icon}
            fill="var(--ct-c-font)"
          />
        )}
      </button>
      <div className={classNames(styles.flyoutBox, !topLevel && styles.right)}>
        <ul className={styles.list}>
          {(item.url as HeaderItem[]).map((x, i) => (
            <li key={i}>{doHeaderItem(x, false)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const doMobileHeaderItem = (item: HeaderItem, topLevel: boolean) => {
  const isLink = typeof item.url === `string`;

  return isLink ? (
    <div
      className={classNames(
        topLevel && styles.foldoutItem,
        topLevel && styles.foldoutBorder,
      )}
      key={item.text}
    >
      <Link
        className={classNames(styles.headerLink, topLevel && styles.big)}
        href={item.url as string}
      >
        {item.text}
      </Link>
    </div>
  ) : (
    <div
      className={classNames(
        topLevel && styles.foldoutItem,
        topLevel && styles.foldoutBorder,
      )}
      key={item.text}
    >
      <HeaderFoldout
        title={item.text}
        className={classNames(topLevel && styles.big)}
      >
        {(item.url as HeaderItem[]).map((x) => doMobileHeaderItem(x, false))}
      </HeaderFoldout>
    </div>
  );
};

export default function Header() {
  const [hamburger, setHamburger] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleChange = () => setHamburger(false);

    router.events.on(`routeChangeComplete`, handleChange);

    return () => {
      router.events.off(`routeChangeComplete`, handleChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (hamburger) {
      document.body.style.overflow = `hidden`;
    } else {
      document.body.style.overflow = ``;
    }
  }, [hamburger]);

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Logo width={219.84} height={48} />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {headerContents.map((x, i) => (
              <li key={i}>{doHeaderItem(x, true)}</li>
            ))}
            <li className={styles.theme}>
              <ThemeToggle />
            </li>
            <li className={styles.hamburger}>
              <Hamburger
                value={hamburger}
                onValueChange={(e) => setHamburger(e)}
              />
            </li>
          </ul>
        </nav>
        {hamburger && (
          <div className={styles.screen}>
            <nav className={styles.screenNav}>
              {headerContents.map((x) => doMobileHeaderItem(x, true))}
              <Area
                className={styles.themeArea}
                borderColor="var(--ct-c-divider)"
              >
                <div className={styles.theme}>
                  <label>Theme</label>
                  <ThemeToggle />
                </div>
              </Area>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
