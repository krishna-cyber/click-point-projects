import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/category/category.schema';
export type ContentDocument = HydratedDocument<Content>;
export declare class Content {
    title: string;
    slug: string;
    content: string;
    excert: string;
    featuredImage: {
        url: string;
        altText: string;
        width: number;
        height: number;
    };
    images: [
        {
            url: string;
            altText: string;
            caption: string;
        }
    ];
    meta_title: string;
    meta_description: string;
    meta_keyword: string[];
    canonicalUrl: string;
    author: mongoose.Schema.Types.ObjectId;
    publishedAt: Date;
    status: string;
    categories: Category[];
    tags: string[];
}
declare const ContentSchema: mongoose.Schema<Content, mongoose.Model<Content, any, any, any, mongoose.Document<unknown, any, Content, any, {}> & Content & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Content, mongoose.Document<unknown, {}, mongoose.FlatRecord<Content>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Content> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export { ContentSchema };
