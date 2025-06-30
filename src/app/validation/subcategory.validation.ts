import { z } from "zod";
import mongoose from "mongoose";

// Helper to check if a value is a valid ObjectId
const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

export const createCollectionValidationSchema = z.object({
  body: z.object({
    categoryId: objectId,

    name: z.string({ required_error: "Category name is required" }),
    description: z.string().nonempty("Description is required").optional(),
  }),
});

export const editSubcategoryValidationSchema = z.object({
  body: z.object({
    categoryId: objectId,
    name: z.string().nonempty("Category name is required").optional(),
    description: z.string().nonempty("Description is required").optional(),
  }),
});

export const SubcategoryValidation = {
  editSubcategoryValidationSchema,
  createCollectionValidationSchema,
};
