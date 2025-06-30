import { model, Schema } from "mongoose";

const subcategorySchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
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
subcategorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const Subcategory = model("Subcategory", subcategorySchema);
