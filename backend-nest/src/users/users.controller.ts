import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // Res,
} from '@nestjs/common';
import { CreateUsersDTO } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { UpdateUserRoledto } from './dto/change-user-role.dto';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id');
    }
    return this.userService.findById(id);
  }

  @Get(':id/permission/:name')
  findPermissionsOfModule(
    @Param('id') id: string,
    @Param('name') name: string,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id');
    }
    return this.userService.findPermissions(id, name);
  }

  @Post()
  async createUser(@Body() createUsersDTO: CreateUsersDTO) {
    return await this.userService.create(createUsersDTO);
  }

  @Patch(':id/role')
  changeUserRole(
    @Body() updateUserRoledto: UpdateUserRoledto,
    @Param('id') userId: string,
  ) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user id');
    }

    return this.userService.changeRole(userId, updateUserRoledto.role);
  }

  @Delete(':id')
  deleteUser(
    @Param('id') id: string,
    // @Res({ passthrough: true }) response: express.Response,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id');
    }
    return this.userService.deleteOne(id);
  }
}
