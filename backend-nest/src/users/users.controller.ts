import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUsersDTO } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { ChangeUserRoledto } from './dto/change-user-role.dto';
import { Types } from 'mongoose';
import express from 'express';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
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

  @Delete(':id')
  deleteUser(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id');
    }
    response.status(200).json({ message: 'User deleted success' });
  }
}
