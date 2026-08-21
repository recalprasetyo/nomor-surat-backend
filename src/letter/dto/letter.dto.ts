import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateLetterDto {
  // type
  @IsString({ message: 'Letter Type must be a string' })
  @IsNotEmpty({ message: 'Letter Type is required' })
  @IsIn(['Fasilitatif', 'Substantif'], {
    message: 'Type must be either Fasilitatif or Substantif',
  })
  type!: string;

  // code clasification
  @IsString()
  @IsNotEmpty({ message: 'Code Classification is required' })
  code!: string;

  // regarding
  @IsString({ message: 'Regarding must be a string' })
  @IsNotEmpty({ message: 'Regarding is required' })
  regarding!: string;

  // note
  @IsString({ message: 'Note must be a string' })
  @IsNotEmpty({ message: 'Note is required' })
  note?: string;
}
