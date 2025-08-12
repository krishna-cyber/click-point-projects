import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ timestamps: true })
export class SubCategory {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  })
  categoryId: mongoose.Types.ObjectId;

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

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
