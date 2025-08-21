import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { ParamCheckDTO } from './dto/params.dto';
import { Types } from 'mongoose';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategory(): Promise<(import("mongoose").Document<unknown, {}, import("./category.schema").Category, {}, {}> & import("./category.schema").Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getCategoryById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./category.schema").Category, {}, {}> & import("./category.schema").Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    createCategory(createCategoryDTO: CreateCategoryDTO): Promise<import("mongoose").Document<unknown, {}, import("./category.schema").Category, {}, {}> & import("./category.schema").Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteCategory(params: ParamCheckDTO): Promise<boolean>;
}
