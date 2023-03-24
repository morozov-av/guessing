import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModel, PlayerSchema } from './models/player.model';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PlayerModel.name,
        schema: PlayerSchema
      }
    ])
  ],
  providers: [ PlayersService ],
  controllers: [ PlayersController ],
  exports: [ PlayersService ]
})

export class PlayersModule {}
