import { HydratedDocument } from 'mongoose';
export type PermissionDocument = HydratedDocument<Permission>;
export declare class Permission {
    name: string;
    action: string;
}
declare const PermissionSchema: import("mongoose").Schema<Permission, import("mongoose").Model<Permission, any, any, any, import("mongoose").Document<unknown, any, Permission, any, {}> & Permission & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Permission, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Permission>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Permission> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export { PermissionSchema };
