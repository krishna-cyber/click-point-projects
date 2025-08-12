import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/category/category.schema';

export type ContentDocument = HydratedDocument<Content>;

@Schema({ timestamps: true })
export class Content {
  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: [60, 'Title should be under 60 characters'],
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^[a-z0-9-]+$/,
      'Slug should only contain letters, numbers, and hyphens',
    ],
    lowercase: true,
  })
  slug: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: String,
    // required: true,
    maxlength: [
      160,
      'Excerpt should be 150-160 characters for meta description',
    ],
  })
  excert: string;

  //   Media
  @Prop({
    url: {
      type: String,
    },
    altText: String,
    width: Number,
    height: Number,
  })
  featuredImage: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };

  @Prop([
    {
      url: String,
      altText: String,
      caption: String,
    },
  ])
  images: [
    {
      url: string;
      altText: string;
      caption: string;
    },
  ];

  //   SEO fields
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

  @Prop({
    type: String,
  })
  canonicalUrl: string;

  //   Author and Publishing info
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Date, default: null })
  publishedAt: Date;

  @Prop({
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  })
  status: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ])
  categories: Category[];

  @Prop([
    {
      type: String,
      lowercase: true,
    },
  ])
  tags: string[];
}

const ContentSchema = SchemaFactory.createForClass(Content);

// Indexes for SEO optimization
ContentSchema.index({ slug: 1 }, { unique: true });
ContentSchema.index({ title: 'text', content: 'text', tags: 'text' });
ContentSchema.index({ publishedAt: -1 });
ContentSchema.index({ status: 1, publishedAt: -1 });

export { ContentSchema };
