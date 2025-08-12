import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
  })
  slug: string;

  @Prop({
    type: String,
    enum: {
      values: ['active', 'inactive'],
      message: 'Invalid status of category',
    },
    lowercase: true,
    default: 'active',
  })
  status: string;

  @Prop({
    type: String,
    default: null,
  })
  meta_title: string;

  @Prop({
    type: String,
    default: null,
  })
  meta_description: string;

  @Prop({
    type: [String],
    default: [],
    lowercase: true,
  })
  meta_keyword: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
