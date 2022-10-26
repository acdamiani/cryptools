import classNames from 'classnames';

import styles from '@/components/Slider/slider.module.css';
import { useState } from 'react';

interface LocalProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  id?: string;
  className?: string;
}

export type Props = LocalProps;

export default function Slider({
  min = 0,
  max = 10,
  value = 5,
  className,
  onChange,
  id,
}: Props) {
  const [localValue, setLocalValue] = useState(value);

  return (
    <input
      className={classNames(className, styles.slider)}
      type="range"
      min={min}
      max={max}
      value={localValue}
      onChange={(e) => {
        onChange?.(e);
        setLocalValue(parseInt(e.target.value));
      }}
      id={id}
    />
  );
}
