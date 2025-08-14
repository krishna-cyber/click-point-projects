import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Permission } from 'src/permission/permission.schema';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsMongoId({ each: true })
  permissions: Permission[];
}
