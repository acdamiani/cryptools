import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faRotate, faSave } from '@fortawesome/free-solid-svg-icons';
import { CopyIcon, SyncIcon, FileIcon } from '@primer/octicons-react';
import {
  FormEvent,
  FormHTMLAttributes,
  useId,
  useRef,
  useState,
  ReactNode,
} from 'react';
import copy from 'copy-to-clipboard';
import Button from '../Button/button';
import LabeledElement from '../LabeledElement/labeled-element';
import TextArea from '../TextArea/text-area';
import Toggle from '../Toggle/toggle';
import styles from './tool.module.css';
import classNames from 'classnames';
import ErrorComponent from '../Error/error';

interface InternalProps {
  generateOutput?: (e: FormEvent<HTMLFormElement>) => string;
  buttonName?: string;
  buttonIcon?: ReactNode;
}

export type Props = InternalProps & FormHTMLAttributes<HTMLFormElement>;

export default function Tool({
  generateOutput = () => ``,
  buttonName = `Generate`,
  buttonIcon = <SyncIcon size={16} />,
  className,
  onChange,
  children,
  ...props
}: Props) {
  const [auto, setAuto] = useState(true);
  const [errorText, setErrorText] = useState(``);

  const outputId = useId();

  const formRef = useRef<HTMLFormElement>(null);

  const doSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      output: { value: string };
    };

    try {
      target.output.value = generateOutput(e);
      setErrorText(``);
    } catch (e) {
      if (typeof e === `string`) {
        setErrorText(e);
      } else if (e instanceof Error) {
        setErrorText(e.message);
      }
    }
  };

  const doCopy = () => {
    const el = document.getElementById(outputId) as HTMLInputElement;

    if (!el || !el.value) {
      return;
    }

    copy(el.value);
  };

  const doSave = () => {
    const el = document.getElementById(outputId) as HTMLInputElement;

    if (!el || !el.value) {
      return;
    }

    copy(el.value);
  };

  const doChange = (e: FormEvent<HTMLFormElement>) => {
    if (!auto || !formRef.current) {
      return;
    }

    formRef.current.dispatchEvent(
      new Event(`submit`, { cancelable: true, bubbles: true }),
    );

    onChange?.(e);
  };

  return (
    <form
      className={classNames(styles.form, className)}
      ref={formRef}
      onSubmit={doSubmit}
      onChange={doChange}
      {...props}
    >
      {children}
      <Toggle
        name="auto"
        label="Auto Mode"
        value={auto}
        onValueChange={(e) => setAuto(e)}
      />
      <div className={styles.buttons}>
        <Button icon={buttonIcon} type="submit" disabled={auto}>
          {buttonName}
        </Button>
        <Button icon={<FileIcon size={16} />} onClick={doSave} secondary>
          Save Output
        </Button>
        <Button icon={<CopyIcon size={16} />} onClick={doCopy} secondary>
          Copy Output
        </Button>
      </div>
      {errorText && <ErrorComponent title="Error">{errorText}</ErrorComponent>}
      <LabeledElement content={<b>Output</b>}>
        <TextArea
          rows={3}
          id={outputId}
          name="output"
          spellCheck="false"
          readOnly
        />
      </LabeledElement>
    </form>
  );
}
