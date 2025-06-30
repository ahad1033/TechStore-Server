import { z } from "zod";

export const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Category name is required" }),
    description: z.string().optional(),
    image: z.string({ required_error: "Image URL is required" }),
  }),
});

export const editCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const CategoryValidation = {
  editCategoryValidationSchema,
  createCategoryValidationSchema,
};
