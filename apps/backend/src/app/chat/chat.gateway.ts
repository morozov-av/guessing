import { Body, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/message.create.dto';

const players: Record<string, string> = {};

@WebSocketGateway({
  cors: {
    origin: '*'
  },
  serveClient: false,
  namespace: "chat"
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @UsePipes(new ValidationPipe())
  @SubscribeMessage("messages:get")
  async handleMessagesGet(): Promise<void> {
    const messages = await this.chatService.getMessages();
    this.server.emit("messages", messages);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage("message:post")
  async handleMessagePost(@Body() createMessageDto: CreateMessageDto): Promise<void> {
    const createdMessage = await this.chatService.createMessage(createMessageDto);
    this.server.emit("message:post", createdMessage);
    this.handleMessagesGet();
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    const playerName = client.handshake.query.playerName as string;
    const socketId = client.id;
    players[socketId] = playerName;

    client.broadcast.emit("log", `${playerName} connected`);
  }

  handleDisconnect(client: Socket) {
    const socketId = client.id;
    const playerName = players[socketId];
    delete players[socketId];

    client.broadcast.emit("log", `${playerName} disconnected`);
  }
}
