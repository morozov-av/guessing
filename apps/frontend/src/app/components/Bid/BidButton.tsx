import { Button, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import {
  darkBlue,
  lightWheat,
  MAX_BID_AMOUNT,
  MAX_BID_MULTIPLIER,
  MIN_BID_AMOUNT,
  MIN_BID_MULTIPLIER
} from '../../constants';
import { getIsInRange } from '../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { RoundState } from '../../models/reduxModels';
import { roundSocket } from '../../service/round/socket';
import { setRoundProgress } from '../../store/roundSlice';

export const BidButton = () => {
  const label = 'Make your guess!';
  const round: RoundState = useAppSelector(state => state.round);
  const playerName = useAppSelector(state => state.player.currentPlayer.playerName);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const isDisabled = useCallback((): boolean => {
    const isPlayerLoggedIn = !!playerName;
    const isRoundInProgress = round.inProgress;
    const isRoundStarted = !!round.id;
    const isGuessComplete = !!round.bid && !!round.multiplier;

    return !isPlayerLoggedIn || isRoundInProgress || !isRoundStarted || !isGuessComplete;
  }, [ playerName, round.bid, round.id, round.inProgress, round.multiplier ]);

  const getIsValid = () => {
    if (!getIsInRange(round.bid, MIN_BID_AMOUNT, MAX_BID_AMOUNT)) {
      toast({
        title: `Acceptable bid is between ${MIN_BID_AMOUNT} and ${MAX_BID_AMOUNT}`,
        status: 'error',
        isClosable: true,
        duration: 2000,
        position: 'top'
      });

      return false;
    }

    if (!getIsInRange(round.multiplier, MIN_BID_MULTIPLIER, MAX_BID_MULTIPLIER)) {
      toast({
        title: `Acceptable multiplier is between ${MIN_BID_MULTIPLIER} and ${MAX_BID_MULTIPLIER}`,
        status: 'error',
        isClosable: true,
        duration: 2000,
        position: 'top'
      });

      return false;
    }

    return true;
  };

  const handleClick = () => {
    if (!isDisabled() && !!playerName && !!round.id && getIsValid()) {
      roundSocket.emit('bid:post', {
        playerName,
        roundId: round.id,
        amount: round.bid,
        multiplier: round.multiplier
      });
      toast({
        title: 'Your bet has been accepted, please wait for the round to finish.',
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top'
      });
      dispatch(setRoundProgress({ inProgress: true }));
    }
  };

  return(
    <Button
        isDisabled={isDisabled()}
        onClick={handleClick}
        _hover={{ backgroundColor: lightWheat }}
        w='100%'
        h='100%'
        borderRadius='none'
        variant='ghost'
        color={darkBlue}
      >
        {label}
      </Button>
  );
};
