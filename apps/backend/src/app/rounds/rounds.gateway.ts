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
import { RoundDto } from './dto/round.dto';
import { RoundsService } from './rounds.service';

const players: Record<string, string> = {};

@WebSocketGateway({
  cors: {
    origin: '*'
  },
  serveClient: false,
  namespace: "round"
})
export class RoundsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly roundsService: RoundsService) {}

  @WebSocketServer() server: Server;

  @UsePipes(new ValidationPipe())
  @SubscribeMessage("round:post")
  async handleRoundPost(): Promise<void> {
    const createdRound = await this.roundsService.create();
    this.server.emit("round", createdRound);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage("round:get")
  async handleRoundFinish(@Body() roundDto: RoundDto): Promise<void> {
    const finishedRound = await this.roundsService.finish(roundDto);
    this.server.emit("round", finishedRound);
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
