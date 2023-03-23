import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BidsModule } from '../bids/bids.module';
import { BotsModule } from '../bots/bots.module';
import { PlayersModule } from '../players/players.module';
import { RoundModel, RoundSchema } from './models/round.model';
import { RoundsService } from './rounds.service';
import { RoundsGateway } from './rounds.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RoundModel.name,
        schema: RoundSchema,
      },
    ]),
    PlayersModule,
    BidsModule,
    BotsModule
  ],
  providers: [RoundsService, RoundsGateway],
  exports: [RoundsService]
})
export class RoundsModule {}
