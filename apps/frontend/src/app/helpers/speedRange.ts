import { Mark } from '@mui/base/useSlider';

export const getSliderMarks = (length = 5): Mark[] => {
  return Array.from({ length }, (_, i) => ({
    value: i+1,
    label: `${i+1}x`
  }));
};
