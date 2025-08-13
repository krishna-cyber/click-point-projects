import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUsersDTO } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { ChangeUserRoledto } from './dto/change-user-role.dto';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUsersDTO: CreateUsersDTO) {
    return await this.userService.create(createUsersDTO);
  }

  @Patch(':id/role')
  changeUserRole(
    @Body() changeUserRoledto: ChangeUserRoledto,
    @Param('id') userId: string,
  ) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user id');
    }

    return this.userService.changeRole(userId, changeUserRoledto.role);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}
