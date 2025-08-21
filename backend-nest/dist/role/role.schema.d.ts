import mongoose, { HydratedDocument } from 'mongoose';
import { Permission } from 'src/permission/permission.schema';
export type RoleDocument = HydratedDocument<Role>;
export declare class Role {
    name: string;
    permissions: Permission[];
}
declare const RoleSchema: mongoose.Schema<Role, mongoose.Model<Role, any, any, any, mongoose.Document<unknown, any, Role, any, {}> & Role & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Role, mongoose.Document<unknown, {}, mongoose.FlatRecord<Role>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Role> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export { RoleSchema };
