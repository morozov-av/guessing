import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBid } from '../interfaces/bid.interface';

@Schema({ collection: 'bids', timestamps: true })
export class BidModel extends Document implements IBid {
  @Prop({ required: true })
  playerId: string;

  @Prop({ required: true })
  roundId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  multiplier: number;
}

export const BidSchema = SchemaFactory.createForClass(BidModel);
