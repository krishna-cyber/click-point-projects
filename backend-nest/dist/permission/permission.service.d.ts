import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './permission.schema';
import { Model } from 'mongoose';
export declare class PermissionService {
    private readonly permissionModel;
    constructor(permissionModel: Model<Permission>);
    create(createPermissionDto: CreatePermissionDto): Promise<import("mongoose").Document<unknown, {}, Permission, {}, {}> & Permission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findPermissionsByName(name: string): Promise<string[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Permission, {}, {}> & Permission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Permission, {}, {}> & Permission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<boolean>;
}
