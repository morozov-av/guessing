import { Button, Flex, HStack, Input, Text, useNumberInput } from '@chakra-ui/react';
import React, { FC } from 'react';
import { paper, tomato, white } from '../../constants';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getAreInputsDisabled } from '../../store/playerSlice';

Input.defaultProps = { ...Input.defaultProps, focusBorderColor: tomato };

type NumericInputProps = {
  initialValue: number,
  step: number,
  precision: number,
  min: number,
  max: number,
  label: string
}

export const NumericInput: FC<NumericInputProps> = ({
    initialValue,
    step,
    precision,
    max,
    min,
    label
  }) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step,
      defaultValue: initialValue,
      min: min,
      max: max,
      precision: precision
    });
  const areInputsDisabled = useAppSelector(getAreInputsDisabled);

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
