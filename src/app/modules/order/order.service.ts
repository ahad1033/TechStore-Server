import { Order } from "./order.model";
import { IOrder } from "./order.interface";

type TOrderQuery = {
  search?: string;
  page: number;
  limit: number;
};

const createOrder = async (data: IOrder) => {
  try {
    const newOrder = new Order(data);

    const savedOrder = await newOrder.save();

    return savedOrder;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to create order: Unknown error");
  }
};

const getAllOrders = async (filters: TOrderQuery) => {
  const { search, page, limit } = filters;

  const filter: any = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  try {
    const [data, total] = await Promise.all([
      Order.find(filter)
        .populate("userId", "name email")
        .populate("products.productId", "id title price images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to retrieve orders: Unknown error");
  }
};

const getOrdersByUserId = async ({
  userId,
  filters,
}: {
  userId: string;
  filters: TOrderQuery;
}) => {
  const { search, page, limit } = filters;

  const filter: any = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }
  if (userId) filter.userId = userId;

  const skip = (page - 1) * limit;

  try {
    const [data, total] = await Promise.all([
      Order.find(filter)
        .populate("userId", "name email")
        .populate("products.productId", "id title price images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to retrieve user orders: Unknown error");
  }
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
};
