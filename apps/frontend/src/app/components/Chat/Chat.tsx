import { Flex, Divider, useToast } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { Footer } from './Footer';
import { Messages } from './Messages';

export const Chat: FC = () => {
  const [ inputMessage, setInputMessage ] = useState('');
  const { messages, log, chatActions, playerName } = useChat();
  const toast = useToast();

  useEffect(() => {
    if (!log) return;

    toast({
      title: log,
      status: 'info',
      isClosable: true,
      duration: 2000,
      position: 'top'
    });
  }, [ log ]);

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }

    chatActions.send(inputMessage);
    setInputMessage('');
  };

  return (
      <Flex w='90%' flexDir="column" height='100%' overflow='scroll'>
        <Divider />
        <Messages messages={messages} playerName={playerName} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
  );
};
