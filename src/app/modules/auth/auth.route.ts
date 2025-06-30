import express from "express";

import { USER_ROLE } from "../user/user.constant";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "../../validation/auth.validation";
import { authMiddleware } from "../../middlewares/authMiddleware";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post("/signup", AuthController.signUp);

router.post(
  "/login",
  validateRequest(AuthValidation.userLoginSchema),
  AuthController.loginUser
);


router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
