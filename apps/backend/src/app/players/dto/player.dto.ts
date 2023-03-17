import { IsNotEmpty, IsNumber, IsBoolean, IsString } from 'class-validator';

export class PlayerDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  playerName: string;

  @IsNotEmpty()
  @IsNumber()
  points: number;

  @IsNotEmpty()
  @IsBoolean()
  isBot: boolean;
}
