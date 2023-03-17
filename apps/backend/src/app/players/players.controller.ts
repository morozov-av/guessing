import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dto/player.create.dto';
import { PlayerDto } from './dto/player.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  public async create(@Body() createPlayerDto: CreatePlayerDto): Promise<PlayerDto> {
    return await this.playersService.create(createPlayerDto);
  }

  @Get()
  public async getPlayers(): Promise<PlayerDto[]> {
    return await this.playersService.getTop50();
  }

  @Get(':playerName')
  public async getPlayerByName(@Param() params): Promise<PlayerDto> {
    return await this.playersService.findOne(params.playerName);
  }
}
