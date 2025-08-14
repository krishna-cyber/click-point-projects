import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    default: 'create',
  })
  action: string;
}

const PermissionSchema = SchemaFactory.createForClass(Permission);

PermissionSchema.index({ name: 1, action: 1 }, { unique: true });

export { PermissionSchema };
