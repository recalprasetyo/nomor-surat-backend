import { IsOptional, IsString } from 'class-validator';

export class GetLetterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  type?: string;
}
