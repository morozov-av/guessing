import { Dispatch, SetStateAction } from 'react';

export type ChatFooterProps = {
  inputMessage: string,
  setInputMessage:  Dispatch<SetStateAction<string>>,
  handleSendMessage: () => void
}

export type Message = {
  playerName: string,
  message: string
}

export type SliderMark = {
  value: number,
  label: string
}

export interface ServerToClientEvents {
  log: (log: string) => void;
  messages: (messages: Message[]) => void;
}

export interface ClientToServerEvents {
  ['messages:get']: () => void;
  ['message:post']: (message: Message) => void;
}
