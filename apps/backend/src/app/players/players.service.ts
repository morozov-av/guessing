import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getOrCreate(playerDto: CreatePlayerDto, onlyRealPlayers = true): Promise<PlayerDto> {
    const { playerName } = playerDto;
    const player = await this.playerModel.findOne({ playerName }).exec();

    if (onlyRealPlayers && player?.isBot) {
      throw new HttpException('You cannot log in as bot', HttpStatus.BAD_REQUEST);
    }

    if (!player) {
      return await this.create(playerDto);
    }

    return toPlayerDto(player);
  }

  async updateAmount(filter: { playerName: string }, diff: number): Promise<void> {
    const player = await this.playerModel.findOneAndUpdate(filter, { $inc : { points: diff } }, {
      new: true
    }).exec();

    await player.save();
  }

  async getTop50(): Promise<PlayerDto[]> {
    const players = await this.playerModel
      .find()
      .sort({ points: -1 })
      .limit(50)
      .exec();

    return players.map(toPlayerDto);
  }

  async clearAll(): Promise<void> {
     await this.playerModel
      .deleteMany({})
      .exec();
  }

  async create(playerDto: CreatePlayerDto): Promise<PlayerDto> {
    const { playerName, isBot } = playerDto;

    const player: PlayerModel = new this.playerModel({
      playerName,
      points: 10000,
      isBot: !!isBot
    });

    await player.save();

    return toPlayerDto(player);
  }
}
