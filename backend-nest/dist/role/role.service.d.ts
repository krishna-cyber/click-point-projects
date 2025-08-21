import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.schema';
import { Model } from 'mongoose';
export declare class RoleService {
    private readonly roleModel;
    constructor(roleModel: Model<Role>);
    create(createRoleDto: CreateRoleDto): Promise<import("mongoose").Document<unknown, {}, Role, {}, {}> & Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Role, {}, {}> & Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): string;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<(import("mongoose").Document<unknown, {}, Role, {}, {}> & Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateByName(name: string, updateRoleDto: UpdateRoleDto): Promise<(import("mongoose").Document<unknown, {}, Role, {}, {}> & Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    findPermissions(name: string): Promise<import("../permission/permission.schema").Permission[]>;
    remove(_id: string): Promise<boolean>;
}
