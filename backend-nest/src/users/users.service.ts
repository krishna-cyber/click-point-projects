/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsersDTO } from './dto/create-users.dto';

interface Permissions {
  name: string;
  status: string;
  slug: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(
    createUserDto: CreateUsersDTO,
  ): Promise<User | Error | undefined> {
    try {
      const createdUser = new this.userModel(createUserDto);
      console.log(createUserDto);
      return await createdUser.save();
    } catch (error) {
      if (error?.name === 'ValidationError' && error?.errors) {
        throw new HttpException(error?.errors, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOne(email: string) {
    const user = await this.userModel.findOne({ email }).select('+password');
    return user;
  }

  async getUsers() {
    return await this.userModel.find();
  }

  async changeRole(userId: string, role: string) {
    try {
      let permission: Permissions[] = [];

      if (role === 'admin') {
        permission = [
          { name: 'edit', status: 'active', slug: '/edit' },
          { name: 'view', status: 'active', slug: '/view' },
          { name: 'delete', status: 'active', slug: '/delete' },
          { name: 'share', status: 'active', slug: '/share' },
        ];
      } else if (role === 'manager') {
        permission = [
          { name: 'view', status: 'active', slug: '/view' },
          { name: 'edit', status: 'active', slug: '/edit' },
          { name: 'share', status: 'active', slug: '/share' },
        ];
      } else if (role === 'user') {
        permission = [{ name: 'view', status: 'active', slug: '/view' }];
      }
      return await this.userModel.findByIdAndUpdate(
        userId,
        {
          roles: role,
          permission,
        },
        { new: true },
      );
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
