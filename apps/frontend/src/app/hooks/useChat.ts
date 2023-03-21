import { useCallback, useEffect, useMemo, useState } from 'react';
import { socket } from '../service/chat/socket';
import { Message } from '../types';
import { useAppSelector } from './reduxHooks';

export const useChat = () => {
  const playerName = useAppSelector(state => state.player.currentPlayer.playerName);

  const [ messages, setMessages ] = useState<Message[]>([]);
  const [ log, setLog ] = useState<string>();

  useEffect(() => {
    socket.on('log', (log: string) => {
      console.log(log);
      setLog(log);
    });

    socket.on('messages', (messages: Message[]) => {
      setMessages(messages);
    });

    socket.emit('messages:get');

    return () => {
      socket.off('messages');
      socket.off('log');
    };
  }, []);

  const send = useCallback((message: string) => {
    !!playerName && socket.emit('message:post', { playerName, message });
  }, [ playerName ]);

  const chatActions = useMemo(
    () => ({
      send
    }),
    [ send ]
  );

  return { messages, log, chatActions, playerName };
};
