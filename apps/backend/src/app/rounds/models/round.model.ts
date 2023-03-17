import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IRound } from '../interfaces/rounds.interface';

@Schema({ collection: 'rounds', timestamps: true })
export class RoundModel extends Document implements IRound {
  @Prop({ required: false })
  multiplier?: number;
}

export const RoundSchema = SchemaFactory.createForClass(RoundModel);
