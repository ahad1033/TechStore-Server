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
    userId: objectId,
    name: z
      .string({ required_error: "Name is required" })
      .min(3, "Name is too short"),
    products: z
      .array(orderProductSchema)
      .nonempty("At least one product is required"),
    total: z
      .number({ required_error: "Total is required" })
      .nonnegative("Total must be non-negative"),
    subTotal: z
      .number({ required_error: "Subtotal is required" })
      .nonnegative("Subtotal must be non-negative"),
    deliveryFee: z
      .number({ required_error: "Delivery fee is required" })
      .nonnegative("Delivery fee must be non-negative"),
    shippingAddress: z
      .string({ required_error: "Shipping address is required" })
      .min(5, "Shipping address is too short"),
    status: z
      .enum(["pending", "processing", "shipped", "delivered", "cancelled"])
      .optional(),
    paymentMethod: z.string().optional(),
    deliveryNotes: z.string().optional(),
  }),
});
