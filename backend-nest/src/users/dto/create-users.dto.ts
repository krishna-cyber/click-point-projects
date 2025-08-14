import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/role/role.schema';

export class CreateUsersDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  readonly password: string;

  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty({ message: 'User must be assigned with some role' })
  @IsMongoId({ each: true })
  readonly roles: Role[];

  readonly status: string;
}
