import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toMessageDto } from '../shared/mapper';
import { CreateMessageDto } from './dto/message.create.dto';
import { MessageDto } from './dto/message.dto';
import { MessageModel } from './models/message.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(MessageModel.name)
    private readonly messageModel: Model<MessageModel>
  ) {}

  async getMessages(): Promise<MessageDto[]> {
    const messages = await this.messageModel.find().exec();
    return messages.map(toMessageDto);
  }

  async createMessage(messageDto: CreateMessageDto): Promise<void> {
    const { playerName, message } = messageDto;

    const newMessage: MessageModel = await new this.messageModel({
      playerName,
      message
    });

    await newMessage.save();
  }
}
