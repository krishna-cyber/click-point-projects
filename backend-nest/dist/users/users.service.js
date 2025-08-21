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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_schema_1 = require("./users.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const permission_schema_1 = require("../permission/permission.schema");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        try {
            const createdUser = new this.userModel(createUserDto);
            return await createdUser.save();
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
    async findPermissions(id, name) {
        const user = await this.userModel.findById(id).populate({
            path: 'roles',
            populate: {
                path: 'permissions',
                model: permission_schema_1.Permission.name,
            },
        });
        console.log(name);
        const roles = user?.roles.map((role) => role.permissions);
        if (roles) {
            const filteredPermissions = roles[0]
                ?.filter((perm) => perm.name == name)
                .map((perm) => perm.action);
            return filteredPermissions || [];
        }
        else {
            return [];
        }
    }
    async findOne(email) {
        const user = await this.userModel
            .findOne({ email })
            .select('+password')
            .populate({
            path: 'roles',
            populate: {
                path: 'permissions',
                model: permission_schema_1.Permission.name,
            },
        });
        return user;
    }
    async findById(id) {
        return await this.userModel.findById(id).populate({
            path: 'roles',
            populate: {
                path: 'permissions',
                model: permission_schema_1.Permission.name,
            },
        });
    }
    async getUsers() {
        return await this.userModel.find().populate({
            path: 'roles',
            populate: {
                path: 'permissions',
                model: permission_schema_1.Permission.name,
            },
        });
    }
    async deleteOne(_id) {
        return (await this.userModel.deleteOne({ _id })).acknowledged;
    }
    async changeRole(userId, roles) {
        try {
            return await this.userModel.findByIdAndUpdate(userId, {
                roles,
            }, { new: true });
        }
        catch (error) {
            throw new common_1.HttpException(error?.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map