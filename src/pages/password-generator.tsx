import { useId, useRef, useState } from 'react';

import Area from '@/components/Area/area';
import Slider from '@/components/Slider/slider';
import Button from '@/components/Button/button';

import styles from '@/styles/password-generator.module.css';
import Toggle from '@/components/Toggle/toggle';
import Select from '@/components/Select/select';

const passTypes = [
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

  const [num, setNum] = useState(false);
  const [symbol, setSymbol] = useState(false);

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
      } else {
        setPassword(makePassword(sliderValue));
      }
    };

    intervalId.current = setInterval(funcUpdate, TIMEOUT_LEN);
  };

  return (
    <>
      <h1>Secure Password Generator</h1>
      <Area>
        <Select options={passTypes} defaultValue={passTypes[0]} />
        <div className={styles.controls}>
          <div className={styles.length}>
            <label htmlFor={id}>Length</label>
            <Slider
              min={3}
              max={26}
              value={sliderValue}
              id={id}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
            />
            <p className={styles.sliderValue}>{sliderValue}</p>
          </div>
          <div className={styles.toggle}>
            <label htmlFor={toggleOneId}>Numbers</label>
            <Toggle id={toggleOneId} onChange={(e) => setNum(e)} />
          </div>
          <div className={styles.toggle}>
            <label htmlFor={toggleTwoId}>Symbols</label>
            <Toggle id={toggleTwoId} onChange={(e) => setSymbol(e)} />
          </div>
        </div>
        <Button onClick={() => updatePassword(makePassword(sliderValue))}>
          Generate
        </Button>
        <h2 className={styles.passHeader}>Your Password:</h2>
        <span className={styles.password}>{password}</span>
      </Area>
    </>
  );
}
