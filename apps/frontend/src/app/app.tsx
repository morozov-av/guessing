import { theme, ChakraProvider, Grid, Box } from '@chakra-ui/react';
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
import {
  buttonGradient,
  cyan,
  MAX_BID_AMOUNT,
  MAX_BID_MULTIPLIER,
  MIN_BID_AMOUNT,
  MIN_BID_MULTIPLIER,
  wheat
} from './constants';

const App: FC = () => (
  <ChakraProvider theme={ theme as Dict }>
    <Box overflowY='auto' h='100vh' w='100%' m={0}>
      <Grid
        w='100%'
        h={{ lg: '100vh', md: '200vh', sm: '200vh' }}
        templateRows={{ lg: 'repeat(12, 1fr)', md: 'repeat(24, 1fr)', sm: 'repeat(24, 1fr)' }}
        templateColumns='repeat(18, 1fr)'
        gap={3}
        padding={30}
        bgColor={cyan}
      >
        <GridItem rowSpan={8} colSpan={{ lg: 12, md: 18, sm: 18 }} borderRadius='1em'>
          <Chart />
        </GridItem>
        <GridItem rowSpan={1} colSpan={{ lg: 2, md: 6, sm: 6 }} borderRadius='1em'>
          <Time />
        </GridItem>
        <GridItem rowSpan={1} colSpan={{ lg: 2, md: 6, sm: 6 }} borderRadius='1em'>
          <Points />
        </GridItem>
        <GridItem rowSpan={1} colSpan={{ lg: 2, md: 6, sm: 6 }} bg={buttonGradient}>
          <LoginButton />
        </GridItem>
        <GridItem rowSpan={2} colSpan={{ lg: 3, md: 9, sm: 9 }}>
          <NumericInput
            label="Your bid"
            min={MIN_BID_AMOUNT}
            max={MAX_BID_AMOUNT}
            step={100}
            precision={0}
            inputFor='bid'
          />
        </GridItem>
        <GridItem rowSpan={2} colSpan={{ lg: 3, md: 9, sm: 9 }}>
          <NumericInput
            label="Multiplier"
            min={MIN_BID_MULTIPLIER}
            max={MAX_BID_MULTIPLIER}
            step={0.5}
            precision={1}
            inputFor='multiplier'
          />
        </GridItem>
        <GridItem rowSpan={1} colSpan={{ lg: 6, md: 18, sm: 18 }} bg={buttonGradient}>
          <BidButton />
        </GridItem>
        <GridItem rowSpan={2} colSpan={{ lg: 6, md: 18, sm: 18 }}>
          <SpeedSlider />
        </GridItem>
        <GridItem rowSpan={6} colSpan={{ lg: 6, md: 18, sm: 18 }} bg={wheat} borderRadius='1em'>
          <Chat />
        </GridItem>
        <GridItem overflow='scroll' rowSpan={4} colSpan={{ lg: 6, md: 9, sm: 9 }}>
          <CurrentRound />
        </GridItem>
        <GridItem overflow='scroll' rowSpan={4} colSpan={{ lg: 6, md: 9, sm: 9 }}>
          <Ranking />
        </GridItem>
      </Grid>
    </Box>
  </ChakraProvider>
);

export default App;
