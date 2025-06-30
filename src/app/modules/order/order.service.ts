import { Order } from "./order.model";
import { IOrder } from "./order.interface";

const createOrder = async (data: IOrder) => {
  try {
    // You might want to add more logic here like:
    // - validating stock availability
    // - adjusting stock quantities
    // For now, just create the order document.

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
    // Get all orders, populate user and product info for clarity
    return await Order.find()
      .populate("userId", "name email") // Adjust fields as per User model
      .populate("products.productId", "title price") // Adjust fields as per Product model
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
