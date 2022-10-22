import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';

import styles from './button.module.css';

type color = React.CSSProperties['color'];

export interface ButtonProps {
  textColor?: color;
  textColorHover?: color;
  textColorDisabled?: color;
  backgroundColor?: color;
  backgroundColorHover?: color;
  backgroundColorDisabled?: color;
  borderColor?: color;
  borderColorHover?: color;
  borderColorDisabled?: color;
  borderWidth?: React.CSSProperties['borderWidth'];
  padding?: React.CSSProperties['padding'];
  icon?: IconDefinition;
  iconColor?: color;
}

export type Props = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  textColor = `white`,
  textColorHover = `white`,
  textColorDisabled = `#ffffff80`,
  backgroundColor = `var(--color-main)`,
  backgroundColorHover = `#fa70a5`,
  backgroundColorDisabled = `#3454d180`,
  borderColor = `transparent`,
  borderColorHover = `transparent`,
  borderColorDisabled = `transparent`,
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
        button:hover {
          color: ${textColorHover};
          background-color: ${backgroundColorHover};
          border-color: ${borderColorHover};
        }
        button:disabled {
          cursor: not-allowed;
          pointer-events: none;
          color: ${textColorDisabled};
          background-color: ${backgroundColorDisabled};
          border-color: ${borderColorDisabled};
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
