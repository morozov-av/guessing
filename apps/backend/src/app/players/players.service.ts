import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toPlayerDto } from '../shared/mapper';
import { CreatePlayerDto } from './dto/player.create.dto';
import { PlayerDto } from './dto/player.dto';
import { PlayerModel } from './models/player.model';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(PlayerModel.name)
    private readonly playerModel: Model<PlayerModel>
  ) {}

  async getOrCreate(playerName: string): Promise<PlayerDto> {
    const player = await this.playerModel.findOne({ playerName }).exec();

    if (!player) {
      const createdPlayer = await this.create({ playerName });
      return createdPlayer;
    }

    return toPlayerDto(player);
  }

  async updateAmount(filter: { id: string }, diff: number): Promise<void> {
    await this.playerModel.findOneAndUpdate(filter, { $inc : { diff } }).exec();
  }

  async getTop50(): Promise<PlayerDto[]> {
    const players = await this.playerModel
      .find()
      .sort({ points: -1 })
      .limit(50)
      .exec();

    return players.map(toPlayerDto);
  }

  async create(playerDto: CreatePlayerDto): Promise<PlayerDto> {
    const { playerName } = playerDto;

    const player: PlayerModel = new this.playerModel({
      playerName,
      points: 1000,
      isBot: false
    });

    await player.save();

    return toPlayerDto(player);
  }
}
