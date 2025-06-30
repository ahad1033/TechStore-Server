import express from "express";

import { USER_ROLE } from "../user/user.constant";

import { SubcategoryControllers } from "./subcategory.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { SubcategoryValidation } from "../../validation/subcategory.validation";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

// CREATE SUBCATEGORY
router.post(
  "/create-subcategory",
  authMiddleware(USER_ROLE.admin),
  validateRequest(SubcategoryValidation.createCollectionValidationSchema),
  SubcategoryControllers.createSubcategory
);

// GET ALL SUBCATEGORY
router.get(
  "/by-category",
  authMiddleware(USER_ROLE.admin, USER_ROLE.user),
  SubcategoryControllers.getSubcategoryByCategoryId
);

// GET SINGLE SUBCATEGORY
router.get(
  "/:id",
  authMiddleware(USER_ROLE.admin, USER_ROLE.user),
  SubcategoryControllers.getSingleSubcategory
);

// UPDATE SUBCATEGORY
router.patch(
  "/update-subcategory/:id",
  authMiddleware(USER_ROLE.admin),
  validateRequest(SubcategoryValidation.editSubcategoryValidationSchema),
  SubcategoryControllers.updateSubcategory
);

// DELETE SUBCATEGORY
router.delete(
  "/delete-subcategory/:id",
  authMiddleware(USER_ROLE.admin),
  SubcategoryControllers.deleteSubcategory
);

export const SubcategoryRoutes = router;
