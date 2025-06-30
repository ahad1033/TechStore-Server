import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    image: { type: String },
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
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const Category = model("Category", categorySchema);
