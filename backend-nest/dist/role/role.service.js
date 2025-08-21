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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const role_schema_1 = require("./role.schema");
const mongoose_2 = require("mongoose");
let RoleService = class RoleService {
    roleModel;
    constructor(roleModel) {
        this.roleModel = roleModel;
    }
    async create(createRoleDto) {
        try {
            const role = new this.roleModel(createRoleDto);
            return await role.save();
        }
        catch (error) {
            if (error?.name === 'ValidationError' && error?.errors) {
                throw new common_1.HttpException(error?.errors, common_1.HttpStatus.BAD_REQUEST, {
                    cause: error,
                });
            }
            else {
                throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                    cause: error,
                });
            }
        }
    }
    async findAll() {
        return await this.roleModel.find().populate('permissions');
    }
    findOne(id) {
        return `This action returns a #${id} role`;
    }
    async update(id, updateRoleDto) {
        try {
            return await this.roleModel.findByIdAndUpdate(id, updateRoleDto);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Failed to update role', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateByName(name, updateRoleDto) {
        try {
            return await this.roleModel.findOneAndUpdate({ name }, updateRoleDto, {
                new: true,
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Failed to update role by name', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findPermissions(name) {
        const role = await this.roleModel.findOne({ name });
        return role?.permissions || [];
    }
    async remove(_id) {
        return (await this.roleModel.deleteOne({ _id })).acknowledged;
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoleService);
//# sourceMappingURL=role.service.js.map