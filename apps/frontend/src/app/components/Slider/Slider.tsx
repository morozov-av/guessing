import { Slider, Typography } from '@mui/material';
import { FC } from 'react';
import { MAX_SPEED_MULTIPLIER } from '../../constants';
import { getSliderMarks } from '../../helpers/speedRange';
import { LabelContainer, SliderWrapper, StyledSpeedIcon } from '../Sider/Styled';

export const SpeedSlider: FC = () => {
  const max = MAX_SPEED_MULTIPLIER;
  const marks = getSliderMarks(max);

  return(
    <SliderWrapper>
      <LabelContainer>
        <StyledSpeedIcon />
        <Typography>Speed</Typography>
      </LabelContainer>

      <Slider
        aria-label="Speed"
        defaultValue={1}
        valueLabelDisplay="off"
        step={1}
        marks={marks}
        min={1}
        max={max}
      />
    </SliderWrapper>
  );
};
