import { useEffect, useId, useState } from 'react';

import classNames from 'classnames';
import { MoonIcon, SunIcon } from '@primer/octicons-react';

import styles from '@/components/ThemeToggle/theme-toggle.module.css';

export default function ThemeToggle() {
  const id = useId();

  const [currentTheme, setCurrentTheme] = useState(false);

  useEffect(() => {
    setCurrentTheme(document.documentElement.classList.contains(`dark`));
  }, []);

  const toggleTheme = () => {
    const currentTheme = !document.documentElement.classList.contains(`dark`);
    const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`);

    localStorage.setItem(
      `color-theme`,
      prefersDark.matches === currentTheme
        ? `auto`
        : currentTheme
        ? `dark`
        : `light`,
    );

    if (currentTheme) document.documentElement.classList.add(`dark`);
    else document.documentElement.classList.remove(`dark`);

    setCurrentTheme(currentTheme);
  };

  return (
    <>
      <style global jsx>
        {`
          .dark .${styles.check} {
            transform: translateX(18px);
          }
          .dark .${styles.sun} {
            opacity: 0;
          }
          .dark .${styles.moon} {
            opacity: 1;
          }
        `}
      </style>
      <button
        className={styles.button}
        type="button"
        role="switch"
        id={id}
        onClick={toggleTheme}
        aria-checked={currentTheme}
      >
        <span className={styles.check}>
          <span className={styles.iconContainer}>
            <SunIcon
              className={classNames(styles.icon, styles.sun)}
              size={16}
            />
            <MoonIcon
              className={classNames(styles.icon, styles.moon)}
              size={16}
            />
          </span>
        </span>
      </button>
    </>
  );
}
