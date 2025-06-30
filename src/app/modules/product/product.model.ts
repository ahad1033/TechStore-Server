import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
      // required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: String, default: "" },
    specification: { type: String, default: "" },
    images: [{ type: String }],
    regularPrice: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual id field
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const Product = model("Product", productSchema);
