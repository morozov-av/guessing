import { TimeIcon } from '@chakra-ui/icons';
import { Box, Flex, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { gray, MAX_SPEED_MULTIPLIER, white } from '../../constants';
import { getSliderMarks } from '../../helpers/speedRange';

export const SpeedSlider: FC = () => {
  const max = MAX_SPEED_MULTIPLIER;
  const marks = getSliderMarks(max);
  const [ sliderValue, setSliderValue ] = useState(1);

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm'
  };

  return(
    <Flex w='90%' alignItems='center' justifyItems='center' direction='column'>
      <Flex h='100%' alignItems='center' justifyItems='center' color={white} padding={1}>
        <TimeIcon paddingRight={1} boxSize={5} />
        <Text>Speed</Text>
      </Flex>
      <Slider defaultValue={sliderValue} min={1} max={max} step={1} onChange={setSliderValue}>
        {marks.map((mark) => {
          return <SliderMark top='5px' color={white} key={mark.value} value={mark.value} {...labelStyles}>
            {mark.label}
          </SliderMark>;
        })}
        <SliderTrack bg='red.100'>
          <Box position='relative' right={10} />
          <SliderFilledTrack bg={gray} />
        </SliderTrack>
        <SliderThumb boxSize={4} />
      </Slider>
    </Flex>

  );
};
