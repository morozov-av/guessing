import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

export const useAnimatedCounter = (
  maxValue: number,
  initialValue = 1,
  duration = 1,
) => {
  const [ counter, setCounter ] = useState<number>(initialValue);

  useEffect(() => {
    const controls = animate(initialValue, maxValue, {
      duration,
      onUpdate(value) {
        setCounter(parseFloat(value.toFixed(2)));
      }
    });
    return () => controls.stop();
  }, [ initialValue, maxValue, duration ]);

  return counter;
};
