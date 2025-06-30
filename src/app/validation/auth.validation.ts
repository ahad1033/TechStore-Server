import { z } from "zod";

export const userSignupSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    phone: z.string({
      required_error: "Phone is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const userLoginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required",
    }),
  }),
});

export const AuthValidation = {
  userLoginSchema,
  userSignupSchema,
  refreshTokenValidationSchema,
};
