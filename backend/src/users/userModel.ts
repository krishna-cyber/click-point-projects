import mongoose from "mongoose";

const schema = mongoose.Schema;
const permissionSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      enum: {
        values: ["edit", "view", "create", "delete", "share"],
        message: `{VALUE} is not valid permission`,
      },
    },
    status: {
      type: String,
      lowercase: true,
      default: "active",
      enum: {
        values: ["active", "inactive", "pending"],
        message: "{VALUE} is not valid status.",
      },
      required: true,
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { _id: false },
);

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: [true, "User already exists"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      required: true,
      enum: {
        values: ["user", "admin", "manager"],
        message: "{VALUE} is not valid roles.",
      },
      lowercase: true,
    },
    permission: [permissionSchema],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function (next) {
  if (this.roles === "admin") {
    this.permission.push(
      { name: "edit", status: "active", slug: "/edit" },
      { name: "view", status: "active", slug: "/view" },
      { name: "delete", status: "active", slug: "/delete" },
      { name: "share", status: "active", slug: "/share" },
    );
  } else if (this.roles === "manager") {
    this.permission.push(
      { name: "view", status: "active", slug: "/view" },
      { name: "edit", status: "active", slug: "/edit" },
      { name: "share", status: "active", slug: "/share" },
    );
  } else if (this.roles === "user") {
    this.permission.push({ name: "view", status: "active", slug: "/view" });
  }
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
