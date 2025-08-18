/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUsersDTO } from './dto/create-users.dto';
import { Permission } from 'src/permission/permission.schema';

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
      return await createdUser.save();
    } catch (error) {
      if (error?.name === 'ValidationError' && error?.errors) {
        throw new HttpException(error?.errors, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findPermissions(id: string, name: string) {
    const user = await this.userModel.findById(id).populate({
      path: 'roles',
      populate: {
        path: 'permissions',
        model: Permission.name,
      },
    });

    console.log(name);
    const roles = user?.roles.map((role) => role.permissions);
    if (roles) {
      // You can process filtered permissions here if needed, e.g.:
      const filteredPermissions = roles[0]
        .filter((perm) => perm.name == name)
        .map((perm) => perm.action);
      console.log(`permissions after filter,`, filteredPermissions);
      return filteredPermissions;
    } else {
      return [];
    }
  }

  async findOne(email: string) {
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .populate({
        path: 'roles',
        populate: {
          path: 'permissions',
          model: Permission.name,
        },
      });
    return user;
  }

  async findById(id: string) {
    return await this.userModel.findById(id).populate({
      path: 'roles',
      populate: {
        path: 'permissions',
        model: Permission.name,
      },
    });
  }

  async getUsers() {
    return await this.userModel.find().populate({
      path: 'roles',
      populate: {
        path: 'permissions',
        model: Permission.name,
      },
    });
  }

  async deleteOne(_id: string) {
    return (await this.userModel.deleteOne({ _id })).acknowledged;
  }

  async changeRole(userId: string, roles: string[]) {
    try {
      return await this.userModel.findByIdAndUpdate(
        userId,
        {
          roles,
        },
        { new: true },
      );
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }
}
