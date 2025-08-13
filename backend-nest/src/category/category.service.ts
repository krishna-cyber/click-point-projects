/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './category.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async getCategory() {
    return await this.categoryModel.find({});
  }

  async findOne(id) {
    return await this.categoryModel.findById(id);
  }

  async createCategory(createCategoryDTO: CreateCategoryDTO) {
    try {
      const category = new this.categoryModel(createCategoryDTO);
      return await category.save();
    } catch (error) {
      if (error?.name === 'ValidationError' && error?.errors) {
        throw new HttpException(error?.errors, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async deleteCategory(id: mongoose.Schema.Types.ObjectId) {
    return (await this.categoryModel.deleteOne({ _id: id })).acknowledged;
  }
}
