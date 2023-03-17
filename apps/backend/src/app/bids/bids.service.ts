import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toBidDto } from '../shared/mapper';
import { CreateBidDto } from './dto/bid.create.dto';
import { BidDto } from './dto/bid.dto';
import { BidModel } from './models/bid.model';

@Injectable()
export class BidsService {
  constructor(
    @InjectModel(BidModel.name)
    private readonly bidModel: Model<BidModel>
  ) {}

  async create(bidDto: CreateBidDto): Promise<BidDto> {
    const { playerId, roundId, amount, multiplier } = bidDto;

    const bid: BidModel = await new this.bidModel({
      playerId,
      roundId,
      amount,
      multiplier
    });

    await bid.save();

    return toBidDto(bid);
  }

  async findById(id: string): Promise<BidDto[]> {

    const filter = { roundId: id };

    const bids: BidModel[] = await this.bidModel.find(filter).exec()

    return bids.map(toBidDto);
  }
}
