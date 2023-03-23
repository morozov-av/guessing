import { Flex, Input, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { buttonGradient, cyan, darkBlue, lightWheat, platinum } from '../../constants';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getAreInputsDisabled } from '../../store/playerSlice';
import { ChatFooterProps } from '../../types';
import SendIcon from '@mui/icons-material/Send';

export const Footer: FC<ChatFooterProps> = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const areInputsDisabled = useAppSelector(getAreInputsDisabled);

  return (
    <Flex w="100%" mt="3">
      <Input
        isDisabled={areInputsDisabled}
        placeholder="Type Something..."
        border={`1px solid ${cyan}`}
        borderRightRadius='none'
        borderLeftRadius='1em'
        marginRight='.5em'
        _hover={{
          border: `1px solid ${darkBlue}`
        }}
        _focus={{
          border: `1px solid ${darkBlue}`
        }}
        bg={platinum}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <Button
        isDisabled={areInputsDisabled}
        bg={buttonGradient}
        color={darkBlue}
        borderRadius='1em'
        _hover={{ backgroundColor: lightWheat }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        <SendIcon />
      </Button>
    </Flex>
  );
};
