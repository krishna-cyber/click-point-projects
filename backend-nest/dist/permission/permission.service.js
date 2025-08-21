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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const permission_schema_1 = require("./permission.schema");
const mongoose_2 = require("mongoose");
let PermissionService = class PermissionService {
    permissionModel;
    constructor(permissionModel) {
        this.permissionModel = permissionModel;
    }
    async create(createPermissionDto) {
        try {
            const permission = new this.permissionModel(createPermissionDto);
            console.log(createPermissionDto);
            return await permission.save();
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
    async findPermissionsByName(name) {
        const permissions = await this.permissionModel.find({ name });
        return permissions.map((permissions) => permissions.action);
    }
    async findAll() {
        return await this.permissionModel.find();
    }
    async findOne(id) {
        return await this.permissionModel.findById(id);
    }
    async remove(id) {
        return (await this.permissionModel.deleteOne({ id })).acknowledged;
    }
};
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(permission_schema_1.Permission.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PermissionService);
//# sourceMappingURL=permission.service.js.map