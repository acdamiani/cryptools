import { useRef, useState } from 'react';

import { faRotate, faSave, faUpload } from '@fortawesome/free-solid-svg-icons';

import Area from '@/components/Area/area';
import Button from '@/components/Button/button';
import Select from '@/components/Select/select';
import TextArea from '@/components/TextArea/text-area';

import styles from '@/layouts/textToText.module.css';
import CodeBlock, { Snippets } from '@/components/CodeBlock/code-block';

const fileSaver = () => import(`file-saver`);

const options = [{ value: `utf-8`, label: `utf-8` }];

const languages: Snippets = {
  csharp: `using Systems.Collections.Generic;
Console.WriteLine("Hello World!");
int i = 0;
i++;
Console.WriteLine(String.Format("Integer: {0}", i));`,
  javascript: `function main() { return null; }`,
  c: `#include <stdio.h>
int main(void) {
  printf("Hello World!\\n");
  return 0;
}`,
  php: `<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
 <?php echo '<p>Hello World</p>'; ?> 
 </body>
</html>`,
};

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
  const fileInput = useRef<HTMLInputElement>(null);

  const [text, setText] = useState(``);
  const [result, setResult] = useState(``);
  const [encoding, setEncoding] = useState(`utf-8`);

  const doTransform = () => {
    setResult(transform(text));
  };

  const doSave = () => {
    fileSaver().then((fileSaver) => {
      const blob = new Blob([result], { type: `text/plain;charset=utf-8` });
      fileSaver.default.saveAs(blob, `result.txt`);
    });
  };

  const doUpload = () => {
    if (fileInput.current == null) return;

    fileInput.current.click();
  };

  const onFile = () => {
    if (!fileInput.current || !fileInput.current.files) return;

    const file = fileInput.current.files[0];

    if (file) {
      if (
        file.type &&
        !file.type.startsWith(`text`) &&
        !file.type.startsWith(`application`)
      ) {
        setText(`ERROR! Unsupported filetype.`);
        return;
      }

      const reader = new FileReader();
      reader.readAsText(file, `UTF-8`);

      reader.onload = (e) => {
        if (
          !e.target ||
          !e.target.result ||
          typeof e.target.result !== `string`
        )
          return;

        setText(e.target.result);
      };

      reader.onerror = () => setText(`ERROR! Could not read file.`);
    }
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
          rows={4}
        />
        <label htmlFor="encoding">Pick encoding:</label>
        <Select
          id="encoding"
          onChange={(e) => setEncoding(e.target.value)}
          defaultValue="utf-8"
        >
          {options.map((x, i) => (
            <option key={i} value={x.value}>
              {x.label}
            </option>
          ))}
        </Select>
        <div className={styles.buttons}>
          <Button icon={faRotate} onClick={doTransform}>
            Convert
          </Button>
          <Button icon={faUpload} onClick={doUpload} secondary>
            Upload File
          </Button>
          <Button icon={faSave} onClick={doSave} secondary>
            Save Output
          </Button>
          <input type="file" onChange={onFile} ref={fileInput} hidden />
        </div>
        <TextArea
          labelText={areaTwoLabelText}
          value={result}
          spellCheck={false}
          rows={4}
          readOnly
        />
        <div>
          <h3>API Endpoint</h3>
          <TextArea
            className="code"
            labelText=""
            backgroundColor="var(--ct-c-bg-soft)"
            value={`GET https://api.crypto.tools/text?from=ascii&to=hex&encoding=${encoding}`}
            readOnly
          />
        </div>
        <div>
          <h3>Code Examples</h3>
          <CodeBlock snippets={languages} />
        </div>
      </Area>
      {children}
    </div>
  );
}
