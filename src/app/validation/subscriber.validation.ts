import { z } from "zod";

// ZOD SCHEMA FOR CREATING A SUBSCRIBER
const createSubscriberZodSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    status: z.enum(["pending", "approved", "cancelled"]).optional(),
  }),
});

export const SubscriberValidation = {
  createSubscriberZodSchema,
};
