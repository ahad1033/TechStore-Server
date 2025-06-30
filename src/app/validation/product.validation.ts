import { z } from "zod";
import mongoose from "mongoose";

const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

const createProductZodSchema = z.object({
  body: z
    .object({
      categoryId: objectId,
      subcategoryId: objectId.optional(),
      title: z.string({ required_error: "Title is required" }).trim(),
      description: z.string().optional(),
      features: z.string().optional(),
      specification: z.string().optional(),
      images: z.array(z.string().url()).optional(),
      regularPrice: z
        .number({ required_error: "Regular price is required" })
        .positive("Regular price must be positive"),
      discountPrice: z
        .number()
        .positive("Discount price must be positive")
        .optional(),
    })

    .refine(
      (data) => {
        if (data.discountPrice !== undefined) {
          return data.discountPrice <= data.regularPrice;
        }
        return true;
      },
      {
        message: "Discount price can't be greater than regular price",
        path: ["discountPrice"],
      }
    ),
});

const editProductZodSchema = z.object({
  body: z
    .object({
      categoryId: objectId.optional(),
      subcategoryId: objectId.optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      features: z.string().optional(),
      specification: z.string().optional(),
      images: z.array(z.string().url()).optional(),
      regularPrice: z.number().positive().optional(),
      discountPrice: z.number().positive().optional(),
    })
    .refine(
      (data) => {
        if (
          data.discountPrice !== undefined &&
          data.regularPrice !== undefined
        ) {
          return data.discountPrice <= data.regularPrice;
        }
        return true;
      },
      {
        message: "Discount price can't be greater than regular price",
        path: ["discountPrice"],
      }
    ),
});

export const ProductValidation = {
  createProductZodSchema,
  editProductZodSchema,
};
