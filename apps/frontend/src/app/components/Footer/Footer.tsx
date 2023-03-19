import Grid from '@mui/material/Unstable_Grid2';
import { FC } from 'react';
import { Mock } from '../Mock';

export const Footer: FC = () => {
  return (
    <>
      <Grid xs={6}>
        <Mock>Current Rount</Mock>
      </Grid>
      <Grid xs={6}>
        <Mock>Ranking</Mock>
      </Grid>
    </>
  );
};
