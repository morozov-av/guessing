import { Button, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { orange, white } from '../../constants';
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

  const handleClick = () => {
    if (!isDisabled() && !!playerName && !!round.id) {
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
        _hover={{ backgroundColor: orange }}
        w='100%'
        variant='ghost'
        color={white}
      >
        {label}
      </Button>
  );
};
