import { theme, ChakraProvider, Grid } from '@chakra-ui/react';
import { Dict } from '@chakra-ui/utils';
import { FC } from 'react';
import { Chart } from './components/Chart/Chart';
import { Chat } from './components/Chat/Chat';
import { GridItem } from './components/GridItem';
import { LoginButton } from './components/Login/Login';
import { NumericInput } from './components/NumericInputForm/NumericInput';
import { SpeedSlider } from './components/Slider/Slider';
import { Time } from './components/Time/Time';

const App: FC = () => (
  <ChakraProvider theme={ theme as Dict }>
    <Grid
      w='100%'
      h='100vh'
      templateRows='repeat(12, 1fr)'
      templateColumns='repeat(12, 1fr)'
      gap={4}
      padding={50}
    >
      <GridItem rowSpan={8} colSpan={8}>
        <Chart />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Time />
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <LoginButton />
      </GridItem>
      <GridItem rowSpan={2} colSpan={2}>
        <NumericInput
          label="Your bid"
          min={100}
          max={1000}
          step={100}
          initialValue={100}
          precision={0}
        />
      </GridItem>
      <GridItem rowSpan={2} colSpan={2}>
        <NumericInput
          label="Multiplier"
          min={1}
          max={10}
          step={0.5}
          initialValue={1}
          precision={1}
        />
      </GridItem>
      <GridItem rowSpan={2} colSpan={4}>
        <SpeedSlider />
      </GridItem>
      <GridItem rowSpan={7} colSpan={4} bg='wheat'>
        <Chat />
      </GridItem>
      <GridItem rowSpan={4} colSpan={4} bg='tomato' />
      <GridItem rowSpan={4} colSpan={4} bg='tomato' />
    </Grid>
  </ChakraProvider>
);

export default App;
