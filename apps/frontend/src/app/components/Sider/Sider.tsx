import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';
import { Mock } from '../Mock';
import { SpeedSlider } from '../Slider/Slider';

export const Sider: FC = () => {
  return (
    <Grid xs={4}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
        <Grid xs={6}>
          <Mock>Time</Mock>
        </Grid>
        <Grid xs={6}>
          <Mock>Log</Mock>
        </Grid>
        <Grid xs={6}>
          <Mock>Amount</Mock>
        </Grid>
        <Grid xs={6}>
          <Mock>Multiplier</Mock>
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
