import { SliderMark } from '../types';

export const getSliderMarks = (length = 5): SliderMark[] => {
  return Array.from({ length }, (_, i) => ({
    value: i+1,
    label: `${i+1}x`
  }));
};

export const sliderValueToSpeed = (value: number): number => 12 - value * 2;
export const speedToSliderValue = (speed: number): number => (12 - speed) / 2;
