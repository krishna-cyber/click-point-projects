import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeUserRoledto {
  @IsNotEmpty()
  @IsString()
  readonly role: string;
}
