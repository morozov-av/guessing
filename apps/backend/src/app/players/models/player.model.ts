import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPlayer } from '../interfaces/player.interface';

@Schema({ collection: 'players', timestamps: true })
export class PlayerModel extends Document implements IPlayer {
  @Prop({ required: true })
  playerName: string;

  @Prop({ required: true })
  points: number;

  @Prop({ required: true })
  isBot: boolean;
}

export const PlayerSchema = SchemaFactory.createForClass(PlayerModel);
