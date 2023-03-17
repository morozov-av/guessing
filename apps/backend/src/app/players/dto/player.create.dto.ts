import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  playerName: string;

  @IsOptional()
  @IsBoolean()
  isBot: boolean;
}
