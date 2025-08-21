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
exports.SubCategorySchema = exports.SubCategory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let SubCategory = class SubCategory {
    name;
    categoryId;
    slug;
    status;
    meta_title;
    meta_description;
    meta_keyword;
};
exports.SubCategory = SubCategory;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.ObjectId,
        ref: 'Category',
        required: true,
    }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], SubCategory.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        lowercase: true,
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: 'Invalid status of category',
        },
        lowercase: true,
        default: 'active',
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "meta_title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: null,
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "meta_description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        default: [],
        lowercase: true,
    }),
    __metadata("design:type", Array)
], SubCategory.prototype, "meta_keyword", void 0);
exports.SubCategory = SubCategory = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], SubCategory);
exports.SubCategorySchema = mongoose_1.SchemaFactory.createForClass(SubCategory);
//# sourceMappingURL=subCategory.schema.js.map