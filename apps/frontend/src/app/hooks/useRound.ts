import { useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { roundSocket } from '../service/round/socket';
import { getAllPlayers } from '../store/playerSlice';
import { saveBid, setRoundId, setRoundProgress } from '../store/roundSlice';
import { Bid, Round } from '../types';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export const useRound = () => {
  const speed = useAppSelector(state => state.round.speed);
  const playerName = useAppSelector(state => state.player.currentPlayer.playerName);
  const [ isCompleted, setComplete ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ round, setRound ] = useState<Round>();
  const [ countdown, setCountdown ] = useState<number>(0);
  const chartAnimation = useAnimation();
  const circleAnimation = useAnimation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    roundSocket.on('countdown', (current: string) => {
      setCountdown(parseInt(current));
    });
    roundSocket.on('round', (round: Round) => {
      setRound(round);
    });
    roundSocket.on('bid:get', (bid: Bid) => {
      void dispatch(saveBid({ bid }));
    });

    return () => {
      roundSocket.off('round');
      roundSocket.off('countdown');
    };
  }, []);

  useEffect(() => {
    isCompleted && setTitle('Winner, winner, chicken dinner!');
    void dispatch(getAllPlayers());
  }, [ dispatch, isCompleted ]);

  useEffect(() => {
    setComplete(false);

    if (round?.id) {
      dispatch(setRoundId({ id: round.id, inProgress: false }));
      setTitle('Please, make your guess...');
    }

    void chartAnimation.start({ pathLength: 0, transition: { duration: 1 } });
    void circleAnimation.start({ offsetDistance: '0%', transition: { duration: 1 } });
  }, [ chartAnimation, circleAnimation, dispatch, round?.id ]);

  useEffect(() => {
    if (round?.multiplier) {
      setTitle('Good luck!');
      dispatch(setRoundProgress({ inProgress: true }));
      const transition = { duration: speed, ease: 'easeInOut' };
      void chartAnimation.start({ pathLength: round.multiplier / 10, transition });
      void circleAnimation.start({ offsetDistance: `${round.multiplier * 10}%`, transition });
    }
  }, [ chartAnimation, circleAnimation, dispatch, round?.multiplier, speed ]);

  const onAnimationComplete = (definition: { pathLength: number }) => {
    if (definition.pathLength !== 0) {
      setComplete(true);
    }
  };

  return { round, countdown, playerName, chartAnimation, circleAnimation, isCompleted, title, onAnimationComplete, speed };
};
