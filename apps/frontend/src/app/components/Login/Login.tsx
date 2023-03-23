import { Button, Spinner, useDisclosure } from '@chakra-ui/react';
import { darkBlue, lightWheat } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout } from '../../store/playerSlice';
import { LoginModal } from './LoginModal';

export const LoginButton = () => {
  const label = 'Login';
  const { onClose, isOpen, onOpen } = useDisclosure();
  const dispatch = useAppDispatch();
  const { playerName, status } = useAppSelector(state => state.player.currentPlayer);

  const logoutPlayer = () => {
    dispatch(logout());
  };

  const handleClick = () => {
      playerName ? logoutPlayer() : onOpen();
  };

  return(
    <>
      <Button
        onClick={handleClick}
        _hover={{ backgroundColor: lightWheat }}
        w='100%'
        variant='ghost'
        color={darkBlue}
      >
        {status === 'loading' ? <Spinner /> : playerName || label}
      </Button>
      <LoginModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};
