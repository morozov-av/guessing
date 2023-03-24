import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  playerName: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
