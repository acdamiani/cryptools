import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

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
  icon?: IconDefinition;
  iconColor?: color;
  secondary?: boolean;
}

export type Props = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  secondary = false,
  textColor = `var(--ct-c-font)`,
  textColorHover = `var(--ct-c-font)`,
  backgroundColor = secondary ? `var(--ct-c-bg-soft)` : `var(--ct-c-primary)`,
  backgroundColorHover = secondary
    ? `var(--ct-c-bg-mute)`
    : `var(--ct-c-primary-highlight)`,
  borderColor = `transparent`,
  borderColorHover = `transparent`,
  borderWidth = `1px`,
  padding = `0.5rem 1rem`,
  icon,
  iconColor = textColor,
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
            <span className={styles.buttonPrefix}>
              <FontAwesomeIcon
                icon={icon}
                className={styles.icon}
                color={iconColor}
                width={20}
                height={20}
              />
            </span>
          ) : (
            ``
          )}
          <span className={styles.buttonContent}>{children}</span>
        </button>
      </span>
    </>
  );
};

export default Button;
