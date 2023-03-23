import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BidDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  playerName: string;

  @IsNotEmpty()
  @IsString()
  roundId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  multiplier: number;
}
