import express from "express";

import { USER_ROLE } from "../user/user.constant";
import { AnalyticsControllers } from "./analytics.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const router = express.Router();

// ANALYTICS SUMMARY
router.get(
  "/get-analytics",
  authMiddleware(USER_ROLE.user, USER_ROLE.admin),
  AnalyticsControllers.getAnalytics
);

export const AnalyticsRoutes = router;
