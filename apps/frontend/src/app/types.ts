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

export type Round = {
  id: string,
  multiplier: number
}

export type SliderMark = {
  value: number,
  label: string
}

export type Bid = {
  playerName: string,
  roundId: string,
  amount: number,
  multiplier: number
}

export type BidOrMultiplier = 'bid' | 'multiplier'
