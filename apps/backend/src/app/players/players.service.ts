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

  async findOne(playerName: string): Promise<PlayerDto> {
    const player = await this.playerModel.findOne({ playerName }).exec();

    if (!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }

    return toPlayerDto(player);
  }

  async getTop50(): Promise<PlayerDto[]> {
    const players = await this.playerModel
      .find()
      .sort({ points: -1})
      .limit(50)
      .exec();

    return players.map(toPlayerDto);
  }

  async create(playerDto: CreatePlayerDto): Promise<PlayerDto> {
    const { playerName, isBot } = playerDto;

    const playerInDb = await this.playerModel.findOne({ playerName }).exec();
    if (playerInDb) {
      throw new HttpException('Player already exists', HttpStatus.BAD_REQUEST);
    }

    const player: PlayerModel = await new this.playerModel({
      playerName,
      points: 0,
      isBot: !!isBot
    });

    await player.save();

    return toPlayerDto(player);
  }
}
