import { Module } from '@nestjs/common';
import { BidsModule } from '../bids/bids.module';
import { ChatModule } from '../chat/chat.module';
import { PlayersModule } from '../players/players.module';
import { BotsService } from './bots.service';

@Module({
  imports: [
    PlayersModule,
    BidsModule,
    ChatModule
  ],
  providers: [BotsService],
  exports: [BotsService]
})
export class BotsModule {}
