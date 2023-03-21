import { Button, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { orange, white } from '../../constants';
import { useAppSelector } from '../../hooks/reduxHooks';
import { RoundState } from '../../models/reduxModels';
import { roundSocket } from '../../service/round/socket';

export const BidButton = () => {
  const label = 'Make your guess!';
  const round: RoundState = useAppSelector(state => state.round);
  const playerId = useAppSelector(state => state.player.currentPlayer.id);
  const toast = useToast();
  const isDisabled = useCallback((): boolean => {
    return !playerId || !round.bid || !round.multiplier || !round.id || round.inProgress;
  }, [ playerId, round.bid, round.id, round.inProgress, round.multiplier ]);

  const handleClick = () => {
    if (!isDisabled() && !!playerId && !!round.id) {
      roundSocket.emit('bid:post', {
        playerId,
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
