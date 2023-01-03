import { LabelHTMLAttributes, ReactNode } from 'react';
import styles from './labeled-element.module.css';

interface InternalProps {
  content?: ReactNode;
  flexBasis?: boolean;
  horizontal?: boolean;
}

export type Props = InternalProps & LabelHTMLAttributes<HTMLLabelElement>;

export default function LabeledElement({
  content = `Label`,
  flexBasis = true,
  horizontal = false,
  children,
  ...props
}: Props) {
  return (
    <>
      <style jsx>
        {`
          .${styles.element} {
            flex-direction: ${horizontal ? `row` : `column`};
            flex: ${flexBasis ? `1` : `none`};
          }
        `}
      </style>
      <div className={styles.element}>
        <label {...props}>{content}</label>
        {children}
      </div>
    </>
  );
}
