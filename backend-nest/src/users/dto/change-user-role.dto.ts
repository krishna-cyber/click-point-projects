import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Role } from 'src/role/role.schema';

export class UpdateUserRoledto {
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  @ArrayUnique()
  readonly role: Role[];
}
