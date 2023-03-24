import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { BidsService } from '../bids/bids.service';
import { BidDto } from '../bids/dto/bid.dto';
import { ChatGateway } from '../chat/chat.gateway';
import { getBotMultiplier, getRandomNumberInRange, randomInteger } from '../helpers/multiplier';
import { PlayerDto } from '../players/dto/player.dto';
import { PlayersService } from '../players/players.service';
import { BOT_NAMES } from './constants';

@Injectable()
export class BotsService implements OnApplicationBootstrap{
  constructor(
    @Inject(PlayersService)
    private readonly playersService: PlayersService,
    @Inject(BidsService)
    private readonly bidsService: BidsService,
    @Inject(ChatGateway)
    private readonly chatGateway: ChatGateway
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.initBots();
  }

  async getOrCreate(botName: string): Promise<PlayerDto> {
    return await this.playersService.getOrCreate(
      { playerName: botName, isBot: true },
      false
    );
  }

  async makeBids(roundId: string, onComplete: (bid: BidDto) => boolean): Promise<void> {
    for (const botName of BOT_NAMES) {
      const amount = 100 * randomInteger(1, 10);
      const multiplier = getBotMultiplier();

      const bid = await this.bidsService.create({
        roundId,
        playerName: botName,
        amount,
        multiplier
      });

      setTimeout(() => {
        void this.chatGateway.handleMessagePost({
          playerName: botName,
          message: `I think the best deal is ${amount} points to ${multiplier} multiplier`
        });
        onComplete(bid);
      }, getRandomNumberInRange(1000, 10000));
    }
  }

  async initBots(): Promise<void> {
    await Promise.all(BOT_NAMES.map(
      (botName) => this.getOrCreate(botName)
    ));
  }
}
