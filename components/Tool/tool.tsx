import { CopyIcon, SyncIcon, FileIcon } from '@primer/octicons-react';
import {
  FormEvent,
  FormHTMLAttributes,
  useId,
  useRef,
  useState,
  ReactNode,
  forwardRef,
} from 'react';
import copy from 'copy-to-clipboard';
import Button from '../Button/button';
import LabeledElement from '../LabeledElement/labeled-element';
import TextArea, {
  TextAreaProps as TextAreaProps,
} from '../TextArea/text-area';
import Toggle from '../Toggle/toggle';
import styles from './tool.module.css';
import classNames from 'classnames';
import ErrorComponent from '../Error/error';
import { saveAs } from 'file-saver';

interface InternalProps {
  generateOutput?: (e: FormEvent<HTMLFormElement>) => Promise<string> | string;
  outputProps?: Omit<TextAreaProps, 'id' | 'name'>;
  buttonName?: string;
  buttonIcon?: ReactNode;
}

export type ToolProps = InternalProps & FormHTMLAttributes<HTMLFormElement>;

const Tool = forwardRef<HTMLFormElement, ToolProps>(
  (
    {
      generateOutput = () => ``,
      buttonName = `Generate`,
      buttonIcon = <SyncIcon size={16} />,
      outputProps,
      className,
      onChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [auto, setAuto] = useState(true);
    const [errorText, setErrorText] = useState(``);

    const outputId = useId();

    const formRef = useRef<HTMLFormElement | null>(null);

    const doSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const target = e.target as typeof e.target & {
        output: { value: string };
      };

      new Promise<string>((resolve, reject) => {
        try {
          resolve(generateOutput(e));
        } catch (e) {
          reject(e);
        }
      })
        .then((t) => {
          target.output.value = t;
        })
        .then(() => setErrorText(``))
        .catch((e) => {
          if (typeof e === `string`) {
            setErrorText(e);
          } else if (e instanceof Error) {
            setErrorText(e.message);
          }
        });
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

      const blob = new Blob([el.value], { type: `text/plain;charset=utf-8` });
      saveAs(blob, `output.txt`);
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
        ref={(e) => {
          formRef.current = e;
          if (typeof ref === `function`) {
            ref(e);
          } else if (ref) {
            ref.current = e;
          }
        }}
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
        {errorText && (
          <ErrorComponent title="Error">{errorText}</ErrorComponent>
        )}
        <LabeledElement content={<b>Output</b>}>
          <TextArea
            rows={3}
            spellCheck="false"
            id={outputId}
            name="output"
            readOnly
            {...outputProps}
          />
        </LabeledElement>
      </form>
    );
  },
);

Tool.displayName = `Tool`;

export default Tool;
