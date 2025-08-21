import { CreateUsersDTO } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { UpdateUserRoledto } from './dto/change-user-role.dto';
import { Types } from 'mongoose';
export declare class UsersController {
    private readonly userService;
    getUsers(): Promise<(import("mongoose").Document<unknown, {}, import("./users.schema").User, {}, {}> & import("./users.schema").User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    constructor(userService: UsersService);
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./users.schema").User, {}, {}> & import("./users.schema").User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    findPermissionsOfModule(id: string, name: string): Promise<string[]>;
    createUser(createUsersDTO: CreateUsersDTO): Promise<import("./users.schema").User | Error | undefined>;
    changeUserRole(updateUserRoledto: UpdateUserRoledto, userId: string): Promise<(import("mongoose").Document<unknown, {}, import("./users.schema").User, {}, {}> & import("./users.schema").User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteUser(id: string): Promise<boolean>;
}
