import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    passChangedAt: { type: Date },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: { type: String, enum: ["male", "female"] },
    phone: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Add a virtual `id` field
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const User = model("User", userSchema);
