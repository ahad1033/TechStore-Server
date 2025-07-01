import { Order } from "./order.model";
import { IOrder } from "./order.interface";

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

const getAllOrders = async () => {
  try {
    return await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "id title price images")
      .sort({ createdAt: -1 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to retrieve orders: Unknown error");
  }
};

const getOrdersByUserId = async (userId: string) => {
  try {
    return await Order.find({ userId })
      .populate("products.productId", "title price")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
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
