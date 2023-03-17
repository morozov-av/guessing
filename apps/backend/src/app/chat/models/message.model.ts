import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IMessage } from '../interfaces/message.interface';

@Schema({ collection: 'messages', timestamps: true })
export class MessageModel extends Document implements IMessage {
  @Prop({ required: true })
  playerName: string;

  @Prop({ required: true })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(MessageModel);
