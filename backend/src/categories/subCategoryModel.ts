import mongoose from "mongoose";
import categoryModel from "./categoryModel";

const schema = mongoose.Schema;

const subCategorySchema = new schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },

    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "Invalid status of category",
      },
      lowercase: true,
      default: "active",
    },
    meta_title: {
      type: String,
      default: null,
    },
    meta_description: {
      type: String,
      default: null,
    },
    meta_keyword: {
      type: [String],
      lowercase: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subCategorySchema);
