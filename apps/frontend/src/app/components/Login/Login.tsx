import { Button, Spinner, useDisclosure } from '@chakra-ui/react';
import { orange, white } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout } from '../../store/playerSlice';
import { LoginModal } from './LoginModal';

export const LoginButton = () => {
  const label = 'Login';
  const { onClose, isOpen, onOpen } = useDisclosure();
  const dispatch = useAppDispatch();
  const playerName = useAppSelector(state => state.player.currentPlayer.playerName);
  const status = useAppSelector(state => state.player.currentPlayer.status);

  const handleClick = () => {
      playerName ? dispatch(logout()) : onOpen();
  };

  return(
    <>
      <Button
        onClick={handleClick}
        _hover={{ backgroundColor: orange }}
        w='100%'
        variant='ghost'
        color={white}
      >
        {status === 'loading' ? <Spinner /> : playerName || label}
      </Button>
      <LoginModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};
