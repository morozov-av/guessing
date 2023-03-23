import { TimeIcon } from '@chakra-ui/icons';
import { Box, Flex, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { darkBlue, gray, MAX_SPEED_MULTIPLIER } from '../../constants';
import { getSliderMarks, sliderValueToSpeed, speedToSliderValue } from '../../helpers/speedRange';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getAreInputsDisabled } from '../../store/playerSlice';
import { setMultiplierSpeed } from '../../store/roundSlice';

export const SpeedSlider: FC = () => {
  const max = MAX_SPEED_MULTIPLIER;
  const marks = getSliderMarks(max);
  const speed = useAppSelector(state => state.round.speed);
  const inProgress = useAppSelector(state => state.round.inProgress);

  const [ sliderValue, setSliderValue ] = useState(speedToSliderValue(speed));
  const areInputsDisabled = useAppSelector(getAreInputsDisabled);
  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce<number>(sliderValue, 500);

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm'
  };

  useEffect(() => {
    dispatch(setMultiplierSpeed({ speed: sliderValueToSpeed(debouncedValue) }));
  }, [ debouncedValue, dispatch ]);

  return(
    <Flex h='100%' w='90%' alignItems='center' justifyItems='center' direction='column'>
      <Flex alignItems='center' justifyItems='center' color={darkBlue} padding={1}>
        <TimeIcon paddingRight={1} boxSize={5} />
        <Text>Speed</Text>
      </Flex>
      <Slider isDisabled={areInputsDisabled || inProgress} defaultValue={sliderValue} min={1} max={max} step={1} onChange={setSliderValue}>
        {marks.map((mark) => {
          return <SliderMark top='5px' key={mark.value} value={mark.value} {...labelStyles}>
            {mark.label}
          </SliderMark>;
        })}
        <SliderTrack h={2} borderRadius='1em' borderWidth='1px' borderColor={darkBlue}>
          <Box position='relative' right={10} />
          <SliderFilledTrack bg={gray} />
        </SliderTrack>
        <SliderThumb boxSize={4} bg={darkBlue} />
      </Slider>
    </Flex>
  );
};
