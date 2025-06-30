import { Category } from "./category.model";
import { ICategory } from "./category.interface";
import { Subcategory } from "../subcategory/subcategory.model";

const createCategory = async (data: ICategory) => {
  try {
    const newCategory = new Category(data);

    const savedCategory = await newCategory.save();

    return savedCategory;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to create category: Unknown error");
    }
  }
};

const getCategory = async () => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return categories;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to retrieve categories: Unknown error");
    }
  }
};

// GET SINGLE
const getSingleCategory = async (id: string) => {
  try {
    return await Category.findById(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to get category: Unknown error");
  }
};

// UPDATE
const updateCategory = async (id: string, data: Partial<ICategory>) => {
  try {
    return await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to update category: Unknown error");
  }
};

// DELETE
const deleteCategory = async (id: string) => {
  try {
    // Step 1: Delete all subcategories linked to this category
    const deletedSubcategories = await Subcategory.deleteMany({
      categoryId: id,
    });

    // Step 2: Delete the category itself
    const deletedCategory = await Category.findByIdAndDelete(id);

    return {
      deletedCategory,
      deletedSubcategoryCount: deletedSubcategories.deletedCount || 0,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "Failed to delete category and subcategories: Unknown error"
    );
  }
};

export const CategoryServices = {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getSingleCategory,
};
