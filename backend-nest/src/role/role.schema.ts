import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Permission } from 'src/permission/permission.schema';

export type PermissionDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: Permission.name,
  })
  permissions: Permission[];
}

const RoleSchema = SchemaFactory.createForClass(Role);

export { RoleSchema };
