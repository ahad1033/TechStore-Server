import { z } from "zod";
import mongoose from "mongoose";

// Helper to validate MongoDB ObjectId string
const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

const orderProductSchema = z.object({
  productId: objectId,
  quantity: z
    .number({ required_error: "Quantity is required" })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
  price: z
    .number({ required_error: "Price is required" })
    .nonnegative("Price must be non-negative"),
});

export const createOrderValidationSchema = z.object({
  body: z.object({
    products: z
      .array(orderProductSchema)
      .nonempty("At least one product is required"),
    shippingAddress: z
      .string({ required_error: "Shipping address is required" })
      .min(5, "Shipping address is too short"),
    total: z
      .number({ required_error: "Total price is required" })
      .nonnegative("Total must be non-negative"),
  }),
});
