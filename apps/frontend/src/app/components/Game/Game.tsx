import Grid from '@mui/material/Unstable_Grid2';
import { Chart } from '../Chart/Chart';
import { ChartWrapper } from './Styled';

export const Game = () => {
  return (
    <Grid xs={8}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
        <Grid xs={12}>
          <ChartWrapper>
            <Chart />
          </ChartWrapper>
        </Grid>
      </Grid>
    </Grid>
  );
};
