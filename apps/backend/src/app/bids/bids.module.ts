import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { BidModel, BidSchema } from './models/bid.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BidModel.name,
        schema: BidSchema
      }
    ])
  ],
  providers: [ BidsService ],
  controllers: [ BidsController ],
  exports: [ BidsService ]
})
export class BidsModule {}
