/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = new this.roleModel(createRoleDto);

      return await role.save();
    } catch (error) {
      if (error?.name === 'ValidationError' && error?.errors) {
        throw new HttpException(error?.errors, HttpStatus.BAD_REQUEST, {
          cause: error,
        });
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: error,
        });
      }
    }
  }

  async findAll() {
    return await this.roleModel.find().populate('permissions');
  }

  findOne(id: string) {
    return `This action returns a #${id} role`;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.roleModel.findByIdAndUpdate(id, updateRoleDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update role',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateByName(name: string, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.roleModel.findOneAndUpdate({ name }, updateRoleDto, {
        new: true,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update role by name',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findPermissions(name: string) {
    const role = await this.roleModel.findOne({ name });
    return role?.permissions || [];
  }
  async remove(_id: string) {
    return (await this.roleModel.deleteOne({ _id })).acknowledged;
  }
}
