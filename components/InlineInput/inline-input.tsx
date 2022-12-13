import { MouseEventHandler, ReactNode, useState } from 'react';
import Button from '../Button/button';
import TextArea, { TextAreaProps } from '../TextArea/text-area';
import styles from './inline-input.module.css';

interface InternalProps {
  input?: string;
  buttonText?: string;
  buttonIcon?: ReactNode;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    text: string,
  ) => void;
}

export type InlineInputProps = InternalProps & Omit<TextAreaProps, 'onClick'>;

export default function InlineInput({
  input = ``,
  buttonText = `Go`,
  buttonIcon,
  onClick,
}: InlineInputProps) {
  const [value, setValue] = useState(input);

  return (
    <div className={styles.inputContainer}>
      <TextArea
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
        thin
      />
      <Button
        className={styles.button}
        icon={buttonIcon}
        onClick={(e) => onClick?.(e, value)}
      >
        {buttonText}
      </Button>
    </div>
  );
}
