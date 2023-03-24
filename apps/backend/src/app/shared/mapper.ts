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
  const { playerName, points, isBot } = data;

  return {
    playerName,
    points,
    isBot
  };
};

export const toBidDto = (data: BidModel): BidDto => {
  const { playerName, roundId, amount, multiplier } = data;

  return {
    playerName,
    roundId,
    amount,
    multiplier
  };
};

export const toMessageDto = (data: MessageModel): MessageDto => {
  const { playerName, message } = data;

  return {
    playerName,
    message
  };
};

export const toRoundDto = (data: RoundModel): RoundDto => {
  const { id } = data;

  return {
    id
  };
};

export const toFinishedRoundDto = (data: RoundModel): FinishedRoundDto => {
  const { id, multiplier } = data;

  return {
    id,
    multiplier
  };
};
