import Area from '@/components/Area/area';
import Button from '@/components/Button/button';
import TextArea from '@/components/TextArea/text-area';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export interface TextToTextProps {
  title?: string;
  label?: React.ReactNode;
  children?: React.ReactNode;
  areaOneLabelText?: string;
  areaTwoLabelText?: string;
  transform?: (arg0: string) => string;
}

export type Props = TextToTextProps;

export default function TextToText({
  title = `Blank Page`,
  label = `Enter text and convert:`,
  areaOneLabelText = `Field one:`,
  areaTwoLabelText = `Field two:`,
  transform = (arg0) => arg0,
  children,
}: TextToTextProps) {
  const [text, setText] = useState(``);
  const [result, setResult] = useState(``);

  const doTransform = () => {
    setResult(transform(text));
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>{label}</p>
      <Area>
        <TextArea
          labelText={areaOneLabelText}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          resize
        />
        <div>
          <Button icon={faRotate} onClick={doTransform}>
            Convert
          </Button>
        </div>
        <TextArea
          labelText={areaTwoLabelText}
          value={result}
          spellCheck={false}
          resize
          readOnly
        />
      </Area>
      {children}
    </div>
  );
}
