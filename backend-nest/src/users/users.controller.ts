import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsersDTO } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUsersDTO: CreateUsersDTO) {
    return await this.userService.create(createUsersDTO);
  }
}
