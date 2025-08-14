import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class UpdateUserRoledto {
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  @ArrayUnique()
  readonly role: string[];
}
