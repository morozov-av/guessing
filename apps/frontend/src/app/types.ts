import { Dispatch, SetStateAction } from 'react';

export type ChatFooterProps = {
  inputMessage: string,
  setInputMessage:  Dispatch<SetStateAction<string>>,
  handleSendMessage: () => void
}

export type Message = {
  from: string,
  text: string
}

export type SliderMark = {
  value: number,
  label: string
}
