import { SliderMark } from '../types';

export const getSliderMarks = (length = 5): SliderMark[] => {
  return Array.from({ length }, (_, i) => ({
    value: i+1,
    label: `${i+1}x`
  }));
};
