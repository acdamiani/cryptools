import { useId, useRef, useState } from 'react';

import Area from '@/components/Area/area';
import Slider from '@/components/Slider/slider';
import Button from '@/components/Button/button';

import styles from '@/styles/password-generator.module.css';
import Toggle from '@/components/Toggle/toggle';
import Select from '@/components/Select/select';
import { faCopy, faGears } from '@fortawesome/free-solid-svg-icons';

type PassTypes = `random` | `memorable` | `pin`;

const passLenFromType: Record<PassTypes, [number, number]> = {
  random: [3, 50],
  memorable: [3, 10],
  pin: [3, 12],
};

const passTypes: { value: PassTypes; label: string }[] = [
  { value: `random`, label: `Random Password` },
  { value: `memorable`, label: `Memorable Password` },
  { value: `pin`, label: `PIN` },
];

const TIMEOUT_LEN = 25;
const PASS_ITER = 10;

const ALPHA = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
const NUMER = `0123456789`;
const SYMBOL = `\`~!@#$%^&*()_-+={[}}|\\:;"'<,>.?/`;

export default function PasswordGenerator() {
  const [sliderValue, setSliderValue] = useState(12);
  const [password, setPassword] = useState(``);
  const [disabled, setDisabled] = useState(false);

  const [num, setNum] = useState(false);
  const [symbol, setSymbol] = useState(false);

  const [passType, setPassType] = useState<PassTypes>(`random`);

  const intervalId = useRef<NodeJS.Timer>();

  const id = useId();

  const toggleOneId = useId();
  const toggleTwoId = useId();

  const makePassword = (len: number) => {
    let result = ``;

    const characters = ALPHA + (num ? NUMER : ``) + (symbol ? SYMBOL : ``);
    const charLen = characters.length;

    for (let i = 0; i < len; i++)
      result += characters.charAt(Math.floor(Math.random() * charLen));

    return result;
  };

  const updatePassword = (newPass: string) => {
    let i = 0;

    const funcUpdate = () => {
      if (i++ === PASS_ITER) {
        setPassword(newPass);
        clearInterval(intervalId.current);
        setDisabled(false);
      } else {
        setPassword(makePassword(sliderValue));
      }
    };

    setDisabled(true);
    intervalId.current = setInterval(funcUpdate, TIMEOUT_LEN);
  };

  const numFmt = (num: number, digits = 2): string => {
    const str = num.toString();
    return str.padStart(digits, `0`);
  };

  return (
    <>
      <h1>Secure Password Generator</h1>
      <Area className={styles.area}>
        <div className={styles.controls}>
          <div className={styles.length}>
            <label htmlFor={id}>Length</label>
            <Slider
              min={passLenFromType[passType][0]}
              max={passLenFromType[passType][1]}
              value={sliderValue}
              id={id}
              onChange={(e) =>
                setSliderValue(parseInt((e.target as HTMLInputElement).value))
              }
            />
            <p className={styles.sliderValue}>{numFmt(sliderValue)}</p>
          </div>
          {passType !== `pin` ? (
            <div className={styles.toggle}>
              <label htmlFor={toggleOneId}>
                {passType === `random` ? `Numbers` : `Capitalize`}
              </label>
              <Toggle id={toggleOneId} onChange={(e) => setNum(e)} />
            </div>
          ) : (
            ``
          )}
          {passType !== `pin` ? (
            <div className={styles.toggle}>
              <label htmlFor={toggleTwoId}>
                {passType === `random` ? `Symbols` : `Full Words`}
              </label>
              <Toggle id={toggleTwoId} onChange={(e) => setSymbol(e)} />
            </div>
          ) : (
            ``
          )}
        </div>
        <Select onChange={(e) => setPassType(e.target.value as PassTypes)}>
          {passTypes.map((x) => {
            return (
              <option key={x.value} value={x.value}>
                {x.label}
              </option>
            );
          })}
        </Select>
        <div className={styles.generatorButtons}>
          <Button
            onClick={() => updatePassword(makePassword(sliderValue))}
            icon={faGears}
            className={styles.button}
            disabled={disabled}
          >
            Generate
          </Button>
          <Button icon={faCopy} disabled={disabled} secondary>
            Copy
          </Button>
        </div>
        <span className={styles.password}>{password}</span>
      </Area>
    </>
  );
}
