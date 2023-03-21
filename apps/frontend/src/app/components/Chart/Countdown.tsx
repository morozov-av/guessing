import { Flex } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { white } from '../../constants';

type CountdownProps = {
  isCompleted: boolean,
  countdown: number
}

export const Countdown: FC<CountdownProps> = ({ isCompleted, countdown }) => {
  const [ showConfetti, setShowConfetti ] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [ isCompleted ]);

  return (
    <Flex
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
      fontSize={30}
    >
      {showConfetti && <Confetti />}
      <motion.h1
        key={countdown}
        exit={{ y: 75, opacity: 0, position: 'absolute' }}
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ease: 'easeOut',
          duration: 1
        }}
      >
        {countdown > 0 && countdown}
      </motion.h1>
    </Flex>
  );
};
