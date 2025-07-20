import express from "express";

import { USER_ROLE } from "../user/user.constant";
import { SubscriberControllers } from "./subscriber.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { SubscriberValidation } from "../../validation/subscriber.validation";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// CREATE SUBSCRIBER
router.post(
  "/create",
  validateRequest(SubscriberValidation.createSubscriberZodSchema),
  SubscriberControllers.createSubscriber
);

// GET SUBSCRIBER
router.get(
  "/get-subscriber",
  authMiddleware(USER_ROLE.admin),
  SubscriberControllers.getAllSubscribers
);

// UPDATE SUBSCRIBERS STATUS
router.patch(
  "/update-status/:id",
  authMiddleware(USER_ROLE.admin),
  validateRequest(SubscriberValidation.updateSubscriberStatusZodSchema),
  SubscriberControllers.updateSubscriberStatus
);

// DELETE SUBSCRIBER
router.delete(
  "/delete-subscriber/:id",
  authMiddleware(USER_ROLE.admin),
  SubscriberControllers.deleteSubscriber
);

export const SubscriberRoutes = router;
