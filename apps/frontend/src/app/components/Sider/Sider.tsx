import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';
import { Mock } from '../Mock';
import { NumericInput } from '../NumericInputForm/NumericInput';
import { SpeedSlider } from '../Slider/Slider';
import { Time } from '../Time/Time';

export const Sider: FC = () => {
  return (
    <Grid xs={5}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
        <Grid xs={6}>
          <Time />
        </Grid>
        <Grid xs={6}>
          <Mock>Log</Mock>
        </Grid>
        <Grid xs={6}>
         <NumericInput
          label="Your bid"
          min={100}
          max={1000}
          step={100}
          initialValue={100}
          precision={0}
         />
        </Grid>
        <Grid xs={6}>
          <NumericInput
            label="Multiplier"
            min={1}
            max={10}
            step={0.5}
            initialValue={1}
            precision={1}
          />
        </Grid>
        <Grid xs={12}>
          <SpeedSlider />
        </Grid>
        <Grid xs={12}>
          <Mock>Chat</Mock>
        </Grid>
      </Grid>
    </Grid>
  );
};
