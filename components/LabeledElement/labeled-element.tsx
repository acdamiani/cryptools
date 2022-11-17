import { LabelHTMLAttributes, ReactNode } from 'react';
import styles from './labeled-element.module.css';

interface InternalProps {
  content?: ReactNode;
  flexBasis?: boolean;
}

export type Props = InternalProps & LabelHTMLAttributes<HTMLLabelElement>;

export default function LabeledElement({
  content = `Label`,
  flexBasis = true,
  children,
  ...props
}: Props) {
  return (
    <div className={flexBasis ? styles.element : styles.elementNoFlex}>
      <label {...props}>{content}</label>
      {children}
    </div>
  );
}
