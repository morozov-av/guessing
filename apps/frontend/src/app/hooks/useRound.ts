import { useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { roundSocket } from '../service/round/socket';
import { Round } from '../types';
import { useAppSelector } from './reduxHooks';

const transition = { duration: 5, ease: 'easeInOut' };

export const useRound = () => {
  const playerName = useAppSelector(state => state.player.currentPlayer.playerName);
  const [ isCompleted, setComplete ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ round, setRound ] = useState<Round>();
  const [ countdown, setCountdown ] = useState<number>(0);
  const chartAnimation = useAnimation();
  const circleAnimation = useAnimation();

  useEffect(() => {
    roundSocket.on('countdown', (current: string) => {
      setCountdown(parseInt(current));
    });
    roundSocket.on('round', (round: Round) => {
      setRound(round);
    });

    return () => {
      roundSocket.off('round');
      roundSocket.off('countdown');
    };
  }, []);

  useEffect(() => {
    isCompleted && setTitle('Winner, winner, chicken dinner!');
  }, [ isCompleted ]);

  useEffect(() => {
    setTitle('Please, make your bid...');
    setComplete(false);
    void chartAnimation.start({ pathLength: 0, transition: { duration: 1 } });
    void circleAnimation.start({ offsetDistance: '0%', transition: { duration: 1 } });
  }, [ chartAnimation, circleAnimation, round?.id ]);

  useEffect(() => {
    if (round?.multiplier) {
      setTitle('Good luck!');
      void chartAnimation.start({ pathLength: round.multiplier / 10, transition });
      void circleAnimation.start({ offsetDistance: `${round.multiplier * 10}%`, transition });
    }
  }, [ chartAnimation, circleAnimation, round?.multiplier ]);

  const onAnimationComplete = (definition: { pathLength: number }) => {
    if (definition.pathLength !== 0) {
      setComplete(true);
    }
  };

  return { round, countdown, playerName, chartAnimation, circleAnimation, isCompleted, title, onAnimationComplete };
};
