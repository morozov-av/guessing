import { IsNotEmpty, IsString } from 'class-validator';

export class RoundDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
