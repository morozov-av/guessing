import { Button, useDisclosure } from '@chakra-ui/react';
import { darkBlue, lightWheat } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout } from '../../store/playerSlice';
import { LoginModal } from './LoginModal';
import FaceIcon from '@mui/icons-material/Face';
import { Text } from '@chakra-ui/react';

export const LoginButton = () => {
  const label = 'Login';
  const { onClose, isOpen, onOpen } = useDisclosure();
  const dispatch = useAppDispatch();
  const { playerName } = useAppSelector(state => state.player.currentPlayer);

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
        h='100%'
        borderRadius='none'
        variant='ghost'
        color={darkBlue}
      >
        {playerName
          ? <>
          <FaceIcon />
          <Text overflow='hidden' w='80%' textOverflow='ellipsis' >{playerName}</Text>
          </>
          : label
        }
      </Button>
      <LoginModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};
