import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  providers: [RoundsService, RoundsGateway],
})
export class RoundsModule {}
