import { useCallback, useEffect, useMemo, useState } from 'react';
import { chatSocket } from '../service/chat/socket';
import { Message } from '../types';
import { useAppSelector } from './reduxHooks';

export const useChat = () => {
  const playerName = useAppSelector(state => state.player.currentPlayer.playerName);

  const [ messages, setMessages ] = useState<Message[]>([]);
  const [ log, setLog ] = useState<string>();

  useEffect(() => {
    chatSocket.on('log', (log: string) => {
      setLog(log);
    });

    chatSocket.on('messages', (messages: Message[]) => {
      setMessages(messages);
    });

    chatSocket.emit('messages:get');

    return () => {
      chatSocket.off('messages');
      chatSocket.off('log');
    };
  }, []);

  const send = useCallback((message: string) => {
    !!playerName && chatSocket.emit('message:post', { playerName, message });
  }, [ playerName ]);

  const chatActions = useMemo(
    () => ({
      send
    }),
    [ send ]
  );

  return { messages, log, chatActions, playerName };
};
