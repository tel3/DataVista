import { useEffect, useState } from 'react';
import styles from './NumberFlop.module.css';

interface Props {
  value: number;
  decimals?: number;
}

export default function NumberFlop({ value, decimals = 1 }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const steps = 30;
    const stepValue = value / steps;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      if (i >= steps) {
        setCurrent(value);
        clearInterval(timer);
      } else {
        setCurrent(i * stepValue);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className={styles.NumberFlop}>
      {Number.isInteger(value) ? Math.round(current).toLocaleString() : current.toFixed(decimals)}
    </span>
  );
}
