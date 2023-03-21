import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { white } from '../../constants';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

export const Multiplier: FC<{ to: number, duration: number }> = ({ to, duration }) => {
  const multiplierCounter = useAnimatedCounter(to , 1, duration);

  return <Flex
    position='absolute'
    margin='auto'
    top='0'
    left='0'
    right='0'
    bottom='0'
    dir='column'
    justifyContent='center'
    alignItems='center'
    color={white}
    fontSize={40}
    fontWeight='bold'
  >
    {`${multiplierCounter}x`}
  </Flex>;
};
