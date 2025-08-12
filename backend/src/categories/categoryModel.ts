import mongoose from "mongoose";

const schema = mongoose.Schema;

const categorySchema = new schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
