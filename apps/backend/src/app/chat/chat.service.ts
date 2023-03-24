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
    const messages = await this.messageModel
      .find()
      .sort({ createdAt: -1 })
      .limit(30)
      .exec();

    return messages.map(toMessageDto);
  }

  async createMessage(messageDto: CreateMessageDto): Promise<MessageDto> {
    const { playerName, message } = messageDto;

    const newMessage: MessageModel = new this.messageModel({
      playerName,
      message
    });

    await newMessage.save();

    return toMessageDto(newMessage);
  }
}
