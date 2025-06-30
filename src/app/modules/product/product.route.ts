import express from "express";

import { USER_ROLE } from "../user/user.constant";
import { ProductControllers } from "./product.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { ProductValidation } from "../../validation/product.validation";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// CREATE A PRODUCT
router.post(
  "/create-product",
  authMiddleware(USER_ROLE.admin),
  validateRequest(ProductValidation.createProductZodSchema),
  ProductControllers.createProduct
);

// EDIT A PRODUCTS
router.patch(
  "/edit-product/:id",
  authMiddleware(USER_ROLE.admin),
  validateRequest(ProductValidation.editProductZodSchema),
  ProductControllers.editProduct
);

// DELETE A PRODUCTS
router.delete(
  "/delete-product/:id",
  authMiddleware(USER_ROLE.admin),
  ProductControllers.deleteProduct
);

// GET ALL PRODUCTS
router.get(
  "/get-all-product",
  authMiddleware(USER_ROLE.admin, USER_ROLE.user),
  ProductControllers.getProducts
);

// GET A PRODUCTS BY ID
router.get(
  "/:id",
  authMiddleware(USER_ROLE.admin, USER_ROLE.user),
  ProductControllers.getProductById
);

export const ProductRoutes = router;
