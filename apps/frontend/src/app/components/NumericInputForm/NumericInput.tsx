import { Button, Flex, HStack, Input, Text, useNumberInput } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { useDebounce } from 'usehooks-ts';
import { paper, mint, darkBlue, buttonGradient, lightWheat } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getAreInputsDisabled } from '../../store/playerSlice';
import { setBidOrMultiplier } from '../../store/roundSlice';
import { BidOrMultiplier } from '../../types';

Input.defaultProps = { ...Input.defaultProps, focusBorderColor: mint };

type NumericInputProps = {
  step: number,
  precision: number,
  min: number,
  max: number,
  label: string,
  inputFor: BidOrMultiplier
}

export const NumericInput: FC<NumericInputProps> = ({
    step,
    precision,
    max,
    min,
    label,
    inputFor
  }) => {
  const initialValue = useAppSelector(state => state.round[inputFor]);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, valueAsNumber } =
    useNumberInput({
      defaultValue: initialValue,
      step,
      min: min,
      max: max,
      precision: precision
    });
  const areInputsDisabled = useAppSelector(getAreInputsDisabled);
  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce<number>(valueAsNumber, 500);

  useEffect(() => {
    dispatch(setBidOrMultiplier({ type: inputFor, value: debouncedValue }));
  }, [ debouncedValue, dispatch, inputFor ]);

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Flex color={darkBlue} w='90%' alignItems='center' justifyItems='center' direction='column'>
      <Text>{label}</Text>
      <HStack>
        <Button borderWidth='1px' borderColor={darkBlue} isDisabled={areInputsDisabled} {...dec} bg={buttonGradient} _hover={{ backgroundColor: lightWheat }} >-</Button>
        <Input borderWidth='1px' borderColor={darkBlue} isDisabled={areInputsDisabled} bgColor={paper} {...input} />
        <Button borderWidth='1px' borderColor={darkBlue} isDisabled={areInputsDisabled} bg={buttonGradient} _hover={{ backgroundColor: lightWheat }} {...inc}>+</Button>
      </HStack>
    </Flex>
  );
};
