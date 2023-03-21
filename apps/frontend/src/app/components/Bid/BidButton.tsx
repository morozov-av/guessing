import { Button, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { orange, white } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { RoundState } from '../../models/reduxModels';
import { createBid } from '../../store/roundSlice';

export const BidButton = () => {
  const label = 'Make your guess!';
  const dispatch = useAppDispatch();
  const round: RoundState = useAppSelector(state => state.round);
  const playerId = useAppSelector(state => state.player.currentPlayer.id);
  const toast = useToast();
  const isDisabled = useCallback((): boolean => {
    return !playerId || !round.bid || !round.multiplier || !round.id || round.inProgress;
  }, [ playerId, round.bid, round.id, round.inProgress, round.multiplier ]);

  const handleClick = () => {
    console.log(!isDisabled() && !!playerId && !!round.id);
    if (!isDisabled() && !!playerId && !!round.id) {
      void dispatch(createBid({
        playerId,
        roundId: round.id,
        amount: round.bid,
        multiplier: round.multiplier
      }))
        .unwrap()
        .then(() => {
          toast({
            title: 'Your bet has been accepted, please wait for the round to finish.',
            status: 'success',
            isClosable: true,
            duration: 3000,
            position: 'top'
          });
        })
        .catch((e: Error) => {
          toast({
            title: e.message,
            status: 'error',
            isClosable: true,
            duration: 2000,
            position: 'top'
          });
        });
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
