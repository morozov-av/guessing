import { Button } from '@chakra-ui/react';
import { orange, white } from '../../constants';

export const LoginButton = () => {
  const label = 'Login';

  return(
    <Button _hover={{ backgroundColor: orange }} w='100%' variant='ghost' color={white}>
      {label}
    </Button>
  );
};
