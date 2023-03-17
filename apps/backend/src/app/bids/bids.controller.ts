import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/bid.create.dto';
import { BidDto } from './dto/bid.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  public async create(@Body() createBidDto: CreateBidDto): Promise<BidDto> {
    return await this.bidsService.create(createBidDto);
  }
}
