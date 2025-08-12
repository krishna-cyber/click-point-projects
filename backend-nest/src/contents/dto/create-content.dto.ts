import { IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  title: string;

  content: string;
}
