import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { BidsService } from '../bids/bids.service';
import { CreateBidDto } from '../bids/dto/bid.create.dto';
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
    @Inject(PlayersService)
    private readonly playersService: PlayersService,
    @Inject(BidsService)
    private readonly bidsService: BidsService
  ) {}

  async create(): Promise<RoundDto> {
    const round: RoundModel = new this.roundModel({
      id: uuid()
    });

    await round.save();

    return toRoundDto(round);
  }

  private async updatePlayerAmount(bid: BidDto, multiplier: number): Promise<void> {
    const { playerName, amount, multiplier: playerMultiplier } = bid;

    const diff = playerMultiplier <= multiplier ? amount * multiplier : -amount;
    const filter = { playerName };

    await this.playersService.updateAmount(filter, Math.round(diff));
  }

  private async updatePlayersAmount(round: RoundModel): Promise<void> {
    const { id, multiplier } = round;

    const bids: BidDto[] = await this.bidsService.findById(id);

    for (const bid of bids) {
      await this.updatePlayerAmount(bid, multiplier);
    }
  }

  async finish(roundDto: RoundDto): Promise<FinishedRoundDto> {
    const { id } = roundDto;
    const filter = { id };
    const multiplier = getMultiplier();
    const update = { multiplier };

    const round = await this.roundModel.findOneAndUpdate(filter, update, {
      new: true
    });

    await round.save();
    await this.updatePlayersAmount(round);

    return toFinishedRoundDto(round);
  }

  async postBid(createBidDto: CreateBidDto): Promise<BidDto> {
    return await this.bidsService.create(createBidDto);
  }
}
