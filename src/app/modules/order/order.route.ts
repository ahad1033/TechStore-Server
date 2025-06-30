import express from "express";

import { USER_ROLE } from "../user/user.constant";
import { OrderControllers } from "./order.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { createOrderValidationSchema } from "../../validation/order.validation";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// CREATE AN ORDER (cash on delivery)
router.post(
  "/create-order",
  authMiddleware(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(createOrderValidationSchema),
  OrderControllers.createOrder
);

// GET ORDERS
// For user: returns only their orders
// For admin: returns all orders
router.get(
  "/get-orders",
  authMiddleware(USER_ROLE.user, USER_ROLE.admin),
  OrderControllers.getOrders
);

export const OrderRoutes = router;
