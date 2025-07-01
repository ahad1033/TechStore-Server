import express from "express";

import { USER_ROLE } from "../user/user.constant";

import { CategoryControllers } from "./category.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { CategoryValidation } from "../../validation/category.validation";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// CREATE A CATEGORY
router.post(
  "/create-category",
  authMiddleware(USER_ROLE.admin),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryControllers.createCategory
);

// GET ALL CATEGORY
router.get("/get-all-category", CategoryControllers.getCategory);

// GET SINGLE CATEGORY BY ID
router.get("/:id", CategoryControllers.getSingleCategory);

// UPDATE CATEGORY BY ID
router.patch(
  "/update-category/:id",
  authMiddleware(USER_ROLE.admin),
  validateRequest(CategoryValidation.editCategoryValidationSchema),
  CategoryControllers.updateCategory
);

// DELETE CATEGORY BY ID
router.delete(
  "/delete-category/:id",
  authMiddleware(USER_ROLE.admin),
  CategoryControllers.deleteCategory
);

export const CategoryRoutes = router;
