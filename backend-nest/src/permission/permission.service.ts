/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './permission.schema';
import { Model } from 'mongoose';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const permission = new this.permissionModel(createPermissionDto);
      console.log(createPermissionDto);
      return await permission.save();
    } catch (error) {
      if (error?.name === 'ValidationError' && error?.errors) {
        throw new HttpException(error?.errors, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll() {
    return await this.permissionModel.find();
  }

  async findOne(id: string) {
    return await this.permissionModel.findById(id);
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  async remove(id: string) {
    return (await this.permissionModel.deleteOne({ id })).acknowledged;
  }
}
