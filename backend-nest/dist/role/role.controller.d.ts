import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Types } from 'mongoose';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<import("mongoose").Document<unknown, {}, import("./role.schema").Role, {}, {}> & import("./role.schema").Role & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./role.schema").Role, {}, {}> & import("./role.schema").Role & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPermissions(role: string): Promise<import("../permission/permission.schema").Permission[]>;
    findOne(id: string): string;
    updateByName(name: string, updateRoleDto: UpdateRoleDto): Promise<(import("mongoose").Document<unknown, {}, import("./role.schema").Role, {}, {}> & import("./role.schema").Role & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<(import("mongoose").Document<unknown, {}, import("./role.schema").Role, {}, {}> & import("./role.schema").Role & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<boolean>;
}
