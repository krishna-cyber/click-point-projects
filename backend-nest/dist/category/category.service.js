"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_schema_1 = require("./category.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CategoryService = class CategoryService {
    categoryModel;
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async getCategory() {
        return await this.categoryModel.find({});
    }
    async findOne(id) {
        return await this.categoryModel.findById(id);
    }
    async createCategory(createCategoryDTO) {
        try {
            const category = new this.categoryModel(createCategoryDTO);
            return await category.save();
        }
        catch (error) {
            if (error?.name === 'ValidationError' && error?.errors) {
                throw new common_1.HttpException(error?.errors, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async deleteCategory(id) {
        return (await this.categoryModel.deleteOne({ _id: id })).acknowledged;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map