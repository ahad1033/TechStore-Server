import { Product } from "./product.model";
import { IProduct } from "./product.interface";

type TProductQuery = {
  categoryId?: string;
  subcategoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page: number;
  limit: number;
};

const createProduct = async (data: IProduct) => {
  try {
    const newProduct = new Product(data);
    return await newProduct.save();
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to create product: Unknown error");
  }
};

const editProduct = async (id: string, data: Partial<IProduct>) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return updatedProduct;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to update product: Unknown error");
  }
};

const deleteProduct = async (id: string) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to delete product: Unknown error");
  }
};

const getProducts = async (query: TProductQuery) => {
  const { categoryId, subcategoryId, minPrice, maxPrice, search, page, limit } =
    query;

  const filter: any = {};

  if (categoryId) filter.categoryId = categoryId;
  if (subcategoryId) filter.subcategoryId = subcategoryId;
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.regularPrice = {};
    if (minPrice !== undefined) filter.regularPrice.$gte = minPrice;
    if (maxPrice !== undefined) filter.regularPrice.$lte = maxPrice;
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Product.find(filter)
      .populate("categoryId", "name description")
      .populate("subcategoryId", "name description")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  return {
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};

const getProductById = async (id: string) => {
  try {
    const product = await Product.findById(id)
      .populate("categoryId", "id name description image")
      .populate("subcategoryId", "id name description");

    return product;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to retrieve product: Unknown error");
  }
};

export const ProductServices = {
  createProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProductById,
};
