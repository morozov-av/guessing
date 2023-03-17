import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BidModel } from '../bids/models/bid.model';
import { getMultiplier } from '../helpers/multiplier';
import { PlayerModel } from '../players/models/player.model';
import { toFinishedRoundDto, toRoundDto } from '../shared/mapper';
import { FinishedRoundDto } from './dto/round.finished.dto';
import { RoundDto } from './dto/round.dto';
import { RoundModel } from './models/round.model';

@Injectable()
export class RoundsService {
  constructor(
    @InjectModel(RoundModel.name)
    private readonly roundModel: Model<RoundModel>,
    @InjectModel(PlayerModel.name)
    private readonly playerModel: Model<PlayerModel>,
    @InjectModel(BidModel.name)
    private readonly bidModel: Model<BidModel>
  ) {}

  async create(): Promise<RoundDto> {
    const round: RoundModel = await new this.roundModel();

    await round.save();

    return toRoundDto(round);
  }

  private async updatePlayerAmount(bid: BidModel, multiplier: number): Promise<void> {
    const { playerId, amount, multiplier: playerMultiplier } = bid;

    const diff = playerMultiplier <= multiplier ? amount * multiplier : -amount;
    const filter = { id: playerId };
    await this.playerModel.findOneAndUpdate(filter, { $inc : { amount : diff } }).exec();
  }

  private async updatePlayersAmount(round: RoundModel): Promise<void> {
    const { id, multiplier } = round;
    const filter = { roundId: id };

    const bids: BidModel[] = await this.bidModel.find(filter).exec()

    for (const bid of bids) {
      await this.updatePlayerAmount(bid, multiplier)
    }
  }

  async finish(roundDto: RoundDto): Promise<FinishedRoundDto> {
    const { id } = roundDto;
    const filter = { id };
    const multiplier = getMultiplier()
    const update = { multiplier };

    const round = await this.roundModel.findOneAndUpdate(filter, update, {
      new: true
    });

    await round.save();
    await this.updatePlayersAmount(round);

    return toFinishedRoundDto(round);
  }
}
