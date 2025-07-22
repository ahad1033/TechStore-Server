import express from "express";

import { USER_ROLE } from "../user/user.constant";
import { OrderControllers } from "./order.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { OrderValidation } from "../../validation/order.validation";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// CREATE AN ORDER (cash on delivery)
router.post(
  "/create-order",
  authMiddleware(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(OrderValidation.createOrderValidationSchema),
  OrderControllers.createOrder
);

// GET ORDERS
router.get(
  "/get-orders",
  authMiddleware(USER_ROLE.user, USER_ROLE.admin),
  OrderControllers.getOrders
);

// UPDATE ORDER STATUS
router.patch(
  "/update-status/:id",
  authMiddleware(USER_ROLE.admin),
  validateRequest(OrderValidation.updateOrderStatusZodSchema),
  OrderControllers.updateOrderStatus
);

export const OrderRoutes = router;
