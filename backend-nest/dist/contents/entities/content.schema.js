"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentSchema = exports.Content = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Content = class Content {
    title;
    slug;
    content;
    excert;
    featuredImage;
    images;
    meta_title;
    meta_description;
    meta_keyword;
    canonicalUrl;
    author;
    publishedAt;
    status;
    categories;
    tags;
};
exports.Content = Content;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        trim: true,
        maxlength: [60, 'Title should be under 60 characters'],
    }),
    __metadata("design:type", String)
], Content.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [
            /^[a-z0-9-]+$/,
            'Slug should only contain letters, numbers, and hyphens',
        ],
        lowercase: true,
    }),
    __metadata("design:type", String)
], Content.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Content.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        maxlength: [
            160,
            'Excerpt should be 150-160 characters for meta description',
        ],
    }),
    __metadata("design:type", String)
], Content.prototype, "excert", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        url: {
            type: String,
        },
        altText: String,
        width: Number,
        height: Number,
    }),
    __metadata("design:type", Object)
], Content.prototype, "featuredImage", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            url: String,
            altText: String,
            caption: String,
        },
    ]),
    __metadata("design:type", Array)
], Content.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Content.prototype, "meta_title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], Content.prototype, "meta_description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        default: [],
        lowercase: true,
    }),
    __metadata("design:type", Array)
], Content.prototype, "meta_keyword", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Content.prototype, "canonicalUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Content.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], Content.prototype, "publishedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
    }),
    __metadata("design:type", String)
], Content.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            type: mongoose_2.default.Schema.Types.ObjectId,
            ref: 'Category',
        },
    ]),
    __metadata("design:type", Array)
], Content.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            type: String,
            lowercase: true,
        },
    ]),
    __metadata("design:type", Array)
], Content.prototype, "tags", void 0);
exports.Content = Content = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Content);
const ContentSchema = mongoose_1.SchemaFactory.createForClass(Content);
exports.ContentSchema = ContentSchema;
ContentSchema.index({ slug: 1 }, { unique: true });
ContentSchema.index({ title: 'text', content: 'text', tags: 'text' });
ContentSchema.index({ publishedAt: -1 });
ContentSchema.index({ status: 1, publishedAt: -1 });
//# sourceMappingURL=content.schema.js.map