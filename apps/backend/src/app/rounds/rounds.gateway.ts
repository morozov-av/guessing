import { Body, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import * as schedule from 'node-schedule';
import { Server, Socket } from 'socket.io';
import { CreateBidDto } from '../bids/dto/bid.create.dto';
import { BidDto } from '../bids/dto/bid.dto';
import { BotsService } from '../bots/bots.service';
import { RoundDto } from './dto/round.dto';
import { COUNTDOWN, ROUND_DURATION } from './models/constants';
import { RoundsService } from './rounds.service';

const players: Record<string, string> = {};

@WebSocketGateway({
  cors: {
    origin: '*'
  },
  serveClient: false,
  namespace: 'round'
})
export class RoundsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly roundsService: RoundsService,
    private readonly botsService: BotsService
  ) {}

  @WebSocketServer() server: Server;

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('round:post')
  async handleRoundPost(): Promise<void> {
    const createdRound = await this.roundsService.create();
    this.server.emit('round', createdRound);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('round:get')
  async handleRoundFinish(@Body() roundDto: RoundDto): Promise<void> {
    const finishedRound = await this.roundsService.finish(roundDto);
    this.server.emit('round', finishedRound);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('bid:post')
  async handlePostBid(@Body() createBidDto: CreateBidDto): Promise<void> {
    const bid = await this.roundsService.postBid(createBidDto);
    this.server.emit('bid:get', bid);
  }

  afterInit() {
    schedule.scheduleJob(`*/${ROUND_DURATION} * * * * *`, async () => {
      const createdRound = await this.roundsService.create();
      this.server.emit('round', createdRound);

      let time = COUNTDOWN;
      // eslint-disable-next-line prefer-const
      let countdown: NodeJS.Timer;
      await this.botsService.makeBids(createdRound.id, (bid: BidDto) => this.server.emit('bid:get', bid));
      const update = async (): Promise<void> => {
        this.server.emit('countdown', time);
        time--;
        if (time < 0) {
          clearInterval(countdown);
          const finishedRound = await this.roundsService.finish(createdRound);
          this.server.emit('round', finishedRound);
        }
      };

      countdown = setInterval(() => void update(), 1000);
    });
  }

  handleConnection(client: Socket) {
    const playerName = client.handshake.query.playerName as string;
    const socketId = client.id;
    players[socketId] = playerName;
  }

  handleDisconnect(client: Socket) {
    const socketId = client.id;
    delete players[socketId];
  }
}
