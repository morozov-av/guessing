import { theme, ChakraProvider, Grid } from '@chakra-ui/react';
import { Dict } from '@chakra-ui/utils';
import { FC } from 'react';
import { BidButton } from './components/Bid/BidButton';
import { Chart } from './components/Chart/Chart';
import { Chat } from './components/Chat/Chat';
import { CurrentRound } from './components/CurrentRound/CurrentRound';
import { GridItem } from './components/GridItem';
import { LoginButton } from './components/Login/Login';
import { NumericInput } from './components/NumericInputForm/NumericInput';
import { Points } from './components/Points/Points';
import { Ranking } from './components/Ranking/Ranking';
import { SpeedSlider } from './components/Slider/Slider';
import { Time } from './components/Time/Time';

const App: FC = () => (
  <ChakraProvider theme={ theme as Dict }>
    <Grid
      w='100%'
      h='100vh'
      templateRows='repeat(12, 1fr)'
      templateColumns='repeat(18, 1fr)'
      gap={4}
      padding={50}
    >
      <GridItem rowSpan={8} colSpan={12}>
        <Chart />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Time />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Points />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <LoginButton />
      </GridItem>
      <GridItem rowSpan={2} colSpan={3}>
        <NumericInput
          label="Your bid"
          min={100}
          max={1000}
          step={100}
          precision={0}
          inputFor='bid'
        />
      </GridItem>
      <GridItem rowSpan={2} colSpan={3}>
        <NumericInput
          label="Multiplier"
          min={1}
          max={10}
          step={0.5}
          precision={1}
          inputFor='multiplier'
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={6}>
        <BidButton />
      </GridItem>
      <GridItem rowSpan={2} colSpan={6}>
        <SpeedSlider />
      </GridItem>
      <GridItem rowSpan={6} colSpan={6} bg='wheat'>
        <Chat />
      </GridItem>
      <GridItem overflow='scroll' rowSpan={4} colSpan={6}>
        <CurrentRound />
      </GridItem>
      <GridItem overflow='scroll' rowSpan={4} colSpan={6}>
        <Ranking />
      </GridItem>
    </Grid>
  </ChakraProvider>
);

export default App;
