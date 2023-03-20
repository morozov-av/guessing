import { BidDto } from '../bids/dto/bid.dto';
import { BidModel } from '../bids/models/bid.model';
import { MessageDto } from '../chat/dto/message.dto';
import { MessageModel } from '../chat/models/message.model';
import { PlayerDto } from '../players/dto/player.dto';
import { PlayerModel } from '../players/models/player.model';
import { RoundDto } from '../rounds/dto/round.dto';
import { FinishedRoundDto } from '../rounds/dto/round.finished.dto';
import { RoundModel } from '../rounds/models/round.model';

export const toPlayerDto = (data: PlayerModel): PlayerDto => {
  const { id, playerName, points, isBot } = data;

  const userDto: PlayerDto = {
    id,
    playerName,
    points,
    isBot
  };

  return userDto;
};

export const toBidDto = (data: BidModel): BidDto => {
  const { id, playerId, roundId, amount, multiplier } = data;

  const bidDto: BidDto = {
    id,
    playerId,
    roundId,
    amount,
    multiplier
  };

  return bidDto;
};

export const toMessageDto = (data: MessageModel): MessageDto => {
  const { id, playerName, message } = data;

  const messageDto: MessageDto = {
    id,
    playerName,
    message
  };

  return messageDto;
};

export const toRoundDto = (data: RoundModel): RoundDto => {
  const { id } = data;

  const roundDto: RoundDto = {
    id
  };

  return roundDto;
};

export const toFinishedRoundDto = (data: RoundModel): FinishedRoundDto => {
  const { id, multiplier } = data;

  const finishedRoundDto: FinishedRoundDto = {
    id,
    multiplier: multiplier || 1
  };

  return finishedRoundDto;
};
