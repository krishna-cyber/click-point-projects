import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Types } from 'mongoose';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(createPermissionDto: CreatePermissionDto): Promise<import("mongoose").Document<unknown, {}, import("./permission.schema").Permission, {}, {}> & import("./permission.schema").Permission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./permission.schema").Permission, {}, {}> & import("./permission.schema").Permission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findPermissions(name: string): Promise<string[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./permission.schema").Permission, {}, {}> & import("./permission.schema").Permission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<boolean>;
}
