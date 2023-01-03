import { useRef } from 'react';

import classNames from 'classnames';

import styles from '@/components/TextArea/text-area.module.css';

interface InternalProps {
  textColor?: React.CSSProperties['color'];
  backgroundColor?: React.CSSProperties['backgroundColor'];
  borderColor?: React.CSSProperties['borderColor'];
  borderColorFocused?: React.CSSProperties['borderColor'];
  borderWidth?: React.CSSProperties['borderWidth'];
  padding?: React.CSSProperties['padding'];
  thin?: boolean;
}

export type TextAreaProps = InternalProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({
  textColor = `var(--ct-c-font)`,
  padding = `1rem`,
  backgroundColor = `var(--ct-c-bg)`,
  borderWidth = `1px`,
  borderColor = `var(--ct-c-border)`,
  borderColorFocused = `var(--ct-c-primary)`,
  thin = false,
  className,
  children,
  ...props
}: TextAreaProps) {
  const textArea = useRef<HTMLTextAreaElement>(null);
  return (
    <>
      <style jsx>
        {`
          textarea {
            padding: ${thin ? `0.5rem 0.75rem 0.5rem 0.75rem` : padding};
            color: ${textColor};
            background-color: ${backgroundColor};
            border: ${borderWidth} solid ${borderColor};
            white-space: ${thin ? `nowrap` : `pre`};
          }
          textarea:focus {
            border-color: ${borderColorFocused};
          }
        `}
      </style>
      <span className={classNames(className, styles.textSkeleton)}>
        <textarea className={styles.text} ref={textArea} rows={1} {...props}>
          {children}
        </textarea>
      </span>
    </>
  );
}
