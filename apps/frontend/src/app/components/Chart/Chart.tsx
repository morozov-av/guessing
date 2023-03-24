import { Container } from '@chakra-ui/react';
import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { darkBlue } from '../../constants';
import { isChrome } from '../../helpers/isChrome';
import { useRound } from '../../hooks/useRound';
import { Axis } from './Axis';
import { Countdown } from './Countdown';
import { Multiplier } from './Multiplier';

export const Chart: FC = () => {
  const {
    round,
    countdown,
    chartAnimation,
    circleAnimation,
    onAnimationComplete,
    isCompleted,
    title,
    speed
  } = useRound();

  return (
    <div style={{ width: '600px', height: '400px', overflow: 'hidden' }} className='container'>
      <Container minW='100%' display='flex' position='absolute' top={0} alignItems='flex-start' justifyContent='center' color={darkBlue}>{title}</Container>
      <svg xmlns="http://www.w3.org/2000/svg" width={'600px'} height={'400px'}>
        <motion.path
          d="M25,350 C 400,350 500,300 570,10"
          fill="transparent"
          strokeWidth="10"
          stroke="rgb(94, 96, 115, 0.69)"
          animate={chartAnimation}
          onAnimationComplete={onAnimationComplete}
          initial={{ pathLength: 0 }}
        />
        <Axis />
      </svg>
      { isChrome && <motion.div
        className="circle"
        initial={{ offsetDistance: '0%' }}
        animate={circleAnimation}
      /> }
      { round?.multiplier && <Multiplier to={round.multiplier} duration={speed} /> }
      <Countdown isCompleted={isCompleted} countdown={countdown} />
    </div>
  );
};
