import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  slug: string;

  status: string;

  @IsString()
  @IsNotEmpty()
  meta_title: string;

  @IsString()
  @IsNotEmpty()
  meta_description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  meta_keyword: string[];
}
