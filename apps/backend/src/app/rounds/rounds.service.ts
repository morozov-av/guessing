import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { BidsService } from '../bids/bids.service';
import { BidDto } from '../bids/dto/bid.dto';
import { getMultiplier } from '../helpers/multiplier';
import { PlayersService } from '../players/players.service';
import { toFinishedRoundDto, toRoundDto } from '../shared/mapper';
import { FinishedRoundDto } from './dto/round.finished.dto';
import { RoundDto } from './dto/round.dto';
import { RoundModel } from './models/round.model';

@Injectable()
export class RoundsService {
  constructor(
    @InjectModel(RoundModel.name)
    private readonly roundModel: Model<RoundModel>,
    private readonly playersService: PlayersService,
    private readonly bidsService: BidsService
  ) {}

  async create(): Promise<RoundDto> {
    const round: RoundModel = await new this.roundModel({
      id: uuid()
    });

    await round.save();

    return toRoundDto(round);
  }

  private async updatePlayerAmount(bid: BidDto, multiplier: number): Promise<void> {
    const { playerId, amount, multiplier: playerMultiplier } = bid;

    const diff = playerMultiplier <= multiplier ? amount * multiplier : -amount;
    const filter = { _id: playerId };

    await this.playersService.updateAmount(filter, diff);
  }

  private async updatePlayersAmount(round: RoundModel): Promise<void> {
    const { id, multiplier } = round;

    const bids: BidDto[] = await this.bidsService.findById(id);

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

  async findOne(id: string): Promise<RoundModel | never> {
    const round = await this.roundModel.findOne({ id }).exec();

    if (!round) {
      throw new HttpException('Round does not exist', HttpStatus.NOT_FOUND);
    }

    return round;
  }
}
