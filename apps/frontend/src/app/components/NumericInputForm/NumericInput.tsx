import { Button, Flex, HStack, Input, Text, useNumberInput } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { useDebounce } from 'usehooks-ts';
import { paper, tomato, white } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getAreInputsDisabled } from '../../store/playerSlice';
import { setBidOrMultiplier } from '../../store/roundSlice';
import { BidOrMultiplier } from '../../types';

Input.defaultProps = { ...Input.defaultProps, focusBorderColor: tomato };

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
    <Flex color={white} w='90%' alignItems='center' justifyItems='center' direction='column'>
      <Text>{label}</Text>
      <HStack>
        <Button isDisabled={areInputsDisabled} {...dec} bgColor={paper} color={tomato}>-</Button>
        <Input isDisabled={areInputsDisabled} color={tomato} bgColor={paper} {...input} />
        <Button isDisabled={areInputsDisabled} color={tomato} {...inc}>+</Button>
      </HStack>
    </Flex>
  );
};
