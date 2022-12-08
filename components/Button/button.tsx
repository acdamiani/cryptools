import { ReactNode } from 'react';

import classNames from 'classnames';

import styles from './button.module.css';

type color = React.CSSProperties['color'];

export interface ButtonProps {
  textColor?: color;
  textColorHover?: color;
  backgroundColor?: color;
  backgroundColorHover?: color;
  borderColor?: color;
  borderColorHover?: color;
  borderWidth?: React.CSSProperties['borderWidth'];
  padding?: React.CSSProperties['padding'];
  icon?: ReactNode;
  secondary?: boolean;
}

export type Props = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  secondary = false,
  textColor = secondary ? `var(--ct-c-button-font)` : `var(--ct-c-white-soft)`,
  textColorHover = secondary
    ? `var(--ct-c-button-font)`
    : `var(--ct-c-white-soft)`,
  backgroundColor = secondary ? `var(--ct-c-button)` : `var(--ct-c-primary)`,
  backgroundColorHover = secondary
    ? `var(--ct-c-button-hover)`
    : `var(--ct-c-primary-hover)`,
  borderColor = `transparent`,
  borderColorHover = `transparent`,
  borderWidth = `1px`,
  padding = `0.5rem 1rem`,
  icon,
  className,
  type = `button`,
  children,
  ...inputProps
}: Props) => {
  return (
    <>
      <style jsx>{`
        button {
          padding: ${padding};
          color: ${textColor};
          background-color: ${backgroundColor};
          border: ${borderWidth} solid ${borderColor};
        }
        button:hover:not([disabled]) {
          color: ${textColorHover};
          background-color: ${backgroundColorHover};
          border-color: ${borderColorHover};
        }
        button:disabled {
          cursor: not-allowed;
          pointer-events: none;
          color: ${textColor};
          background-color: ${backgroundColor};
          border-color: ${borderColor};
          opacity: 0.75;
        }
      `}</style>
      <span className={classNames(styles.buttonSkeleton, className)}>
        <button className={styles.button} type={type} {...inputProps}>
          {icon ? (
            <span
              className={children ? styles.buttonPrefix : styles.buttonContent}
            >
              {icon}
            </span>
          ) : (
            ``
          )}
          {children ? (
            <span className={styles.buttonContent}>{children}</span>
          ) : (
            ``
          )}
        </button>
      </span>
    </>
  );
};

export default Button;
