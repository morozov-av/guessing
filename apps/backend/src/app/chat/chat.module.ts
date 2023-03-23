import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MessageModel, MessageSchema } from './models/message.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MessageModel.name,
        schema: MessageSchema,
      },
    ]),
  ],
  providers: [ChatService, ChatGateway],
  exports: [ChatService, ChatGateway]
})
export class ChatModule {}
