import { Flex, Input, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getAreInputsDisabled } from '../../store/playerSlice';
import { ChatFooterProps } from '../../types';

export const Footer: FC<ChatFooterProps> = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const areInputsDisabled = useAppSelector(getAreInputsDisabled);

  return (
    <Flex w="100%" mt="5">
      <Input
        isDisabled={areInputsDisabled}
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: '1px solid black'
        }}
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
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: 'white',
          color: 'black',
          border: '1px solid black'
        }}
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};
