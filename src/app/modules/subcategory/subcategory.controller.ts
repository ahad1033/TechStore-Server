import { Request, Response } from "express";

import { ISubcategory } from "./subcategory.interface";
import { SubcategoryServices } from "./subcategory.service";

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    const data = req.body as ISubcategory;

    const result = await SubcategoryServices.createSubcategory(data);

    res.status(201).json({
      success: true,
      message: "Subcategory added successfully!",
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

export const getSubcategoryByCategoryId = async (
  req: Request,
  res: Response
) => {
  try {
    const categoryId = req.query.categoryId as string;

    if (!categoryId) {
      throw new Error("Category ID is required in query params.");
    }

    const result = await SubcategoryServices.getSubcategoryByCategoryId(
      categoryId
    );
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// GET SINGLE SUBCATEGORY BY ID
export const getSingleSubcategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SubcategoryServices.getSingleSubcategory(id);

  if (!result) throw new Error("Subcategory not found");

  res.status(200).json({
    success: true,
    data: result,
  });
};

// UPDATE SUBCATEGORY BY ID
export const updateSubcategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const result = await SubcategoryServices.updateSubcategory(id, data);

  if (!result) throw new Error("Subcategory not found");

  res.status(200).json({
    success: true,
    message: "Subcategory updated successfully!",
    data: result,
  });
};

// DELETE SUBCATEGORY BY ID
export const deleteSubcategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await SubcategoryServices.deleteSubcategory(id);

  if (!result) throw new Error("Subcategory not found");

  res.status(200).json({
    success: true,
    message: "Subcategory deleted successfully!",
  });
};

export const SubcategoryControllers = {
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSingleSubcategory,
  getSubcategoryByCategoryId,
};
