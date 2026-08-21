import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateLetterDto {
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'selesai', 'batal']) // Validasi status yang diizinkan
  status?: string;

  @IsOptional()
  @IsString()
  note?: string;
}
