import { FormEvent, useEffect, useRef, useId } from 'react';

import classNames from 'classnames';

import styles from '@/components/TextArea/text-area.module.css';

export interface TextAreaProps {
  textColor?: React.CSSProperties['color'];
  backgroundColor?: React.CSSProperties['backgroundColor'];
  borderColor?: React.CSSProperties['borderColor'];
  borderColorFocused?: React.CSSProperties['borderColor'];
  borderWidth?: React.CSSProperties['borderWidth'];
  padding?: React.CSSProperties['padding'];
  resize?: boolean;
}

export type Props = TextAreaProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({
  textColor = `var(--ct-c-font)`,
  padding = `1rem`,
  backgroundColor = `var(--ct-c-bg)`,
  borderWidth = `1px`,
  borderColor = `var(--ct-c-border)`,
  borderColorFocused = `var(--ct-c-primary)`,
  resize = false,
  className,
  children,
  ...props
}: Props) {
  const newId = useId();
  const textArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!resize || !textArea.current) return;

    textArea.current.style.height = textArea.current.scrollHeight + `px`;
  }, [textArea, resize]);

  useEffect(() => {
    const onTextChange = () => {
      if (!resize || !textArea.current) return;

      textArea.current.style.height = `0`;
      textArea.current.style.height = textArea.current?.scrollHeight + `px`;
    };

    onTextChange();
  }, [children, props.value, resize, textArea]);

  return (
    <>
      <style jsx>
        {`
          textarea {
            padding: ${padding};
            color: ${textColor};
            background-color: ${backgroundColor};
            border: ${borderWidth} solid ${borderColor};
            overflow-y: ${resize ? `hidden` : `auto`};
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
