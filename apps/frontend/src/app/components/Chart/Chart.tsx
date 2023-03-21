import { Container } from '@chakra-ui/react';
import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { white } from '../../constants';
import { isChrome } from '../../helpers/isChrome';
import { useRound } from '../../hooks/useRound';
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
      <Container display='flex' position='absolute' top={0} alignItems='flex-start' justifyContent='center' color={white}>{title}</Container>
      <svg xmlns="http://www.w3.org/2000/svg" width={'600px'} height={'400px'}>
        <path
          d="M30,370 C 400,370 500,319 570,30"
          fill="transparent"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="rgba(255, 255, 255, 0.69)"
        />
        <motion.path
          d="M30,370 C 400,370 500,319 570,30"
          fill="transparent"
          strokeWidth="10"
          stroke="rgba(255, 255, 255, 0.69)"
          animate={chartAnimation}
          onAnimationComplete={onAnimationComplete}
          initial={{ pathLength: 0 }}
        />
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
