import { Request, Response } from "express";

import { ICategory } from "./category.interface";
import { CategoryServices } from "./category.service";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body as ICategory;

    console.log("categorydata", data);

    const result = await CategoryServices.createCategory(data);

    res.status(201).json({
      success: true,
      message: "Category added successfully!",
      data: result,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: errorMessage,
    });
  }
};

export const getCategory = async (_req: Request, res: Response) => {
  try {
    const result = await CategoryServices.getCategory();

    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// GET SINGLE
export const getSingleCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await CategoryServices.getSingleCategory(id);

    if (!result) {
      throw new Error("Category not found");
    }

    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// UPDATE
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await CategoryServices.updateCategory(id, data);

    if (!result) {
      throw new Error("Category not found");
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// DELETE
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await CategoryServices.deleteCategory(id);

    if (!result.deletedCategory) {
      throw new Error("Category not found");
    }

    res.status(200).json({
      success: true,
      message: "Category and related subcategories deleted successfully!",
      deletedSubcategoryCount: result.deletedSubcategoryCount,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const CategoryControllers = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
};
