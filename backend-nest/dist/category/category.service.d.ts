import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './category.schema';
import mongoose, { Model } from 'mongoose';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    getCategory(): Promise<(mongoose.Document<unknown, {}, Category, {}, {}> & Category & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: any): Promise<(mongoose.Document<unknown, {}, Category, {}, {}> & Category & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createCategory(createCategoryDTO: CreateCategoryDTO): Promise<mongoose.Document<unknown, {}, Category, {}, {}> & Category & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteCategory(id: mongoose.Schema.Types.ObjectId): Promise<boolean>;
}
