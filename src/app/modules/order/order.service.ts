import { Order } from "./order.model";
import { IOrder } from "./order.interface";

type TOrderQuery = {
  search?: string;
  page: number;
  limit: number;
};

const createOrder = async (data: IOrder) => {
  try {
    // STEP 1: Declare the default order number
    const defaultStartId = 20250700;

    // STEP 2: Find the highest existing order number
    const lastOrder = await Order.findOne({})
      .sort({ orderId: -1 })
      .select("orderNumber")
      .lean();

    // STEP 3: Determine the neworder number
    const orderNumber = lastOrder?.orderNumber
      ? lastOrder.orderNumber + 1
      : defaultStartId;

    // STEP 4: Create order data with order number
    const newOrder = new Order({
      orderNumber,
      ...data,
    });

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

  if (search && !isNaN(Number(search))) {
    const searchNumber = Number(search);
    filter.$or = [{ orderNumber: searchNumber }, { total: searchNumber }];
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

  const filter: any = {
    userId,
  };

  // Only apply $or if search is a valid number
  if (search && !isNaN(Number(search))) {
    const searchNumber = Number(search);
    filter.$or = [{ orderNumber: searchNumber }, { total: searchNumber }];
  }

  const skip = (page - 1) * limit;

  try {
    const [data, total] = await Promise.all([
      Order.find(filter)
        .populate("userId", "name email phone")
        .populate(
          "products.productId",
          "id title regularPrice discountPrice images"
        )
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

const updateOrderStatus = async (id: string, data: Partial<IOrder>) => {
  try {
    return await Order.findByIdAndUpdate(
      id,
      { status: data.status },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to update status: Unknown error");
  }
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getOrdersByUserId,
};
