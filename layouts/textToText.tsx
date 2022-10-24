import { useRef, useState } from 'react';

import { faRotate, faSave, faUpload } from '@fortawesome/free-solid-svg-icons';

import Area from '@/components/Area/area';
import Button from '@/components/Button/button';
import Select from '@/components/Select/select';
import TextArea from '@/components/TextArea/text-area';

import styles from '@/layouts/textToText.module.css';

const fileSaver = () => import(`file-saver`);

const options = [
  { value: `IBM037`, label: `IBM037` },
  { value: `IBM437`, label: `IBM437` },
  { value: `IBM500`, label: `IBM500` },
  { value: `ASMO-708`, label: `ASMO-708` },
  { value: `ibm737`, label: `ibm737` },
  { value: `ibm775`, label: `ibm775` },
  { value: `ibm850`, label: `ibm850` },
  { value: `ibm852`, label: `ibm852` },
  { value: `IBM855`, label: `IBM855` },
  { value: `ibm857`, label: `ibm857` },
  { value: `IBM00858`, label: `IBM00858` },
  { value: `IBM860`, label: `IBM860` },
  { value: `ibm861`, label: `ibm861` },
  { value: `DOS-862`, label: `DOS-862` },
  { value: `IBM863`, label: `IBM863` },
  { value: `IBM864`, label: `IBM864` },
  { value: `IBM865`, label: `IBM865` },
  { value: `cp866`, label: `cp866` },
  { value: `ibm869`, label: `ibm869` },
  { value: `IBM870`, label: `IBM870` },
  { value: `windows-874`, label: `windows-874` },
  { value: `cp875`, label: `cp875` },
  { value: `shift_jis`, label: `shift_jis` },
  { value: `gb2312`, label: `gb2312` },
  { value: `ks_c_5601-1987`, label: `ks_c_5601-1987` },
  { value: `big5`, label: `big5` },
  { value: `IBM1026`, label: `IBM1026` },
  { value: `IBM01047`, label: `IBM01047` },
  { value: `IBM01140`, label: `IBM01140` },
  { value: `IBM01141`, label: `IBM01141` },
  { value: `IBM01142`, label: `IBM01142` },
  { value: `IBM01143`, label: `IBM01143` },
  { value: `IBM01144`, label: `IBM01144` },
  { value: `IBM01145`, label: `IBM01145` },
  { value: `IBM01146`, label: `IBM01146` },
  { value: `IBM01147`, label: `IBM01147` },
  { value: `IBM01148`, label: `IBM01148` },
  { value: `IBM01149`, label: `IBM01149` },
  { value: `utf-16`, label: `utf-16` },
  { value: `utf-16BE`, label: `utf-16BE` },
  { value: `windows-1250`, label: `windows-1250` },
  { value: `windows-1251`, label: `windows-1251` },
  { value: `Windows-1252`, label: `Windows-1252` },
  { value: `windows-1253`, label: `windows-1253` },
  { value: `windows-1254`, label: `windows-1254` },
  { value: `windows-1255`, label: `windows-1255` },
  { value: `windows-1256`, label: `windows-1256` },
  { value: `windows-1257`, label: `windows-1257` },
  { value: `windows-1258`, label: `windows-1258` },
  { value: `macintosh`, label: `macintosh` },
  { value: `x-mac-icelandic`, label: `x-mac-icelandic` },
  { value: `utf-32`, label: `utf-32` },
  { value: `utf-32BE`, label: `utf-32BE` },
  { value: `us-ascii`, label: `us-ascii` },
  { value: `IBM273`, label: `IBM273` },
  { value: `IBM277`, label: `IBM277` },
  { value: `IBM278`, label: `IBM278` },
  { value: `IBM280`, label: `IBM280` },
  { value: `IBM284`, label: `IBM284` },
  { value: `IBM285`, label: `IBM285` },
  { value: `IBM290`, label: `IBM290` },
  { value: `IBM297`, label: `IBM297` },
  { value: `IBM420`, label: `IBM420` },
  { value: `IBM424`, label: `IBM424` },
  { value: `koi8-r`, label: `koi8-r` },
  { value: `IBM871`, label: `IBM871` },
  { value: `cp1025`, label: `cp1025` },
  { value: `koi8-u`, label: `koi8-u` },
  { value: `iso-8859-1`, label: `iso-8859-1` },
  { value: `iso-8859-2`, label: `iso-8859-2` },
  { value: `iso-8859-3`, label: `iso-8859-3` },
  { value: `iso-8859-4`, label: `iso-8859-4` },
  { value: `iso-8859-5`, label: `iso-8859-5` },
  { value: `iso-8859-6`, label: `iso-8859-6` },
  { value: `iso-8859-7`, label: `iso-8859-7` },
  { value: `iso-8859-8`, label: `iso-8859-8` },
  { value: `iso-8859-9`, label: `iso-8859-9` },
  { value: `iso-8859-15`, label: `iso-8859-15` },
  { value: `iso-8859-8-i`, label: `iso-8859-8-i` },
  { value: `iso-2022-jp`, label: `iso-2022-jp` },
  { value: `csISO2022JP`, label: `csISO2022JP` },
  { value: `iso-2022-jp`, label: `iso-2022-jp` },
  { value: `euc-jp`, label: `euc-jp` },
  { value: `euc-kr`, label: `euc-kr` },
  { value: `GB18030`, label: `GB18030` },
  { value: `x-iscii-de`, label: `x-iscii-de` },
  { value: `x-iscii-be`, label: `x-iscii-be` },
  { value: `x-iscii-ta`, label: `x-iscii-ta` },
  { value: `x-iscii-te`, label: `x-iscii-te` },
  { value: `x-iscii-as`, label: `x-iscii-as` },
  { value: `x-iscii-or`, label: `x-iscii-or` },
  { value: `x-iscii-ka`, label: `x-iscii-ka` },
  { value: `x-iscii-ma`, label: `x-iscii-ma` },
  { value: `x-iscii-gu`, label: `x-iscii-gu` },
  { value: `x-iscii-pa`, label: `x-iscii-pa` },
  { value: `utf-7`, label: `utf-7` },
  { value: `utf-8`, label: `utf-8` },
];

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
          options={options}
          id="encoding"
          onChange={(e) => {
            if (!e) return;

            setEncoding(e.value);
          }}
          defaultValue={{ label: `utf-8`, value: `utf-8` }}
        />
        <div className={styles.buttons}>
          <Button icon={faRotate} onClick={doTransform}>
            Convert
          </Button>
          <Button
            icon={faUpload}
            onClick={doUpload}
            backgroundColor="rgb(47, 47, 47)"
            backgroundColorHover="rgb(57, 57, 57)"
            textColor="white"
            textColorHover="white"
          >
            Upload File
          </Button>
          <Button
            icon={faSave}
            onClick={doSave}
            backgroundColor="rgb(47, 47, 47)"
            backgroundColorHover="rgb(57, 57, 57)"
            textColor="white"
            textColorHover="white"
          >
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
        <h3>API Endpoint</h3>
        <TextArea
          className="code"
          labelText=""
          backgroundColor="#282C34"
          value={`GET https://api.crypto.tools/text?from=ascii&to=hex&encoding=${encoding}`}
          readOnly
        />
      </Area>
      {children}
    </div>
  );
}
