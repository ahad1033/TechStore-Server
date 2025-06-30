import { Subcategory } from "./subcategory.model";
import { Category } from "../category/category.model";
import { ISubcategory } from "./subcategory.interface";

const createSubcategory = async (data: ISubcategory) => {
  try {
    const newSubcategory = new Subcategory(data);

    const savedSubcategory = await newSubcategory.save();

    return savedSubcategory;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to create subcategory: Unknown error");
    }
  }
};

const getSubcategoryByCategoryId = async (categoryId: string) => {
  try {
    // Fetch category info
    const category = await Category.findById(categoryId).select(
      "id name description image"
    );
    if (!category) throw new Error("Category not found");

    // Fetch subcategories without populating categoryId
    const subcategories = await Subcategory.find({ categoryId }).sort({
      createdAt: -1,
    });

    return { category, subcategories };
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to retrieve subcategories: Unknown error");
  }
};

// GET SINGLE SUBCATEGORY BY ID
const getSingleSubcategory = async (id: string) => {
  try {
    return await Subcategory.findById(id).populate(
      "categoryId",
      "name description"
    );
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to get subcategory: Unknown error");
  }
};

// UPDATE SUBCATEGORY BY ID
const updateSubcategory = async (id: string, data: Partial<ISubcategory>) => {
  try {
    return await Subcategory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to update subcategory: Unknown error");
  }
};

// DELETE SUBCATEGORY BY ID
const deleteSubcategory = async (id: string) => {
  try {
    return await Subcategory.findByIdAndDelete(id);
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to delete subcategory: Unknown error");
  }
};

export const SubcategoryServices = {
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSingleSubcategory,
  getSubcategoryByCategoryId,
};
