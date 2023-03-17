import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoundModel } from '../rounds/models/round.model';
import { toBidDto } from '../shared/mapper';
import { CreateBidDto } from './dto/bid.create.dto';
import { BidDto } from './dto/bid.dto';
import { BidModel } from './models/bid.model';

@Injectable()
export class BidsService {
  constructor(
    @InjectModel(BidModel.name)
    private readonly bidModel: Model<BidModel>,
    @InjectModel(RoundModel.name)
    private readonly roundModel: Model<RoundModel>
  ) {}

  async create(bidDto: CreateBidDto): Promise<BidDto> {
    const { playerId, roundId, amount, multiplier } = bidDto;

    const bid: BidModel = await new this.bidModel({
      playerId,
      roundId,
      amount,
      multiplier
    });

    const filter = { id: roundId }
    const round: RoundModel = await this.roundModel.findOne(filter).exec();
    if (!round) {
      throw new HttpException('Round does not exist', HttpStatus.BAD_REQUEST);
    }

    await bid.save();

    return toBidDto(bid);
  }
}
