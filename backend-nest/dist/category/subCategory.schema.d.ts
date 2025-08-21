import mongoose, { HydratedDocument } from 'mongoose';
export type SubCategoryDocument = HydratedDocument<SubCategory>;
export declare class SubCategory {
    name: string;
    categoryId: mongoose.Types.ObjectId;
    slug: string;
    status: string;
    meta_title: string;
    meta_description: string;
    meta_keyword: string[];
}
export declare const SubCategorySchema: mongoose.Schema<SubCategory, mongoose.Model<SubCategory, any, any, any, mongoose.Document<unknown, any, SubCategory, any, {}> & SubCategory & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, SubCategory, mongoose.Document<unknown, {}, mongoose.FlatRecord<SubCategory>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<SubCategory> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
