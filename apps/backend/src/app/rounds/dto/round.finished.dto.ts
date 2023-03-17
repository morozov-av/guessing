import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FinishedRoundDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  multiplier: number;
}
