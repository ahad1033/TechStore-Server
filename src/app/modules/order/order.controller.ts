import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new Error("Unauthorized: User ID missing");

    const orderData = req.body;
    orderData.userId = userId;

    const order = await OrderServices.createOrder(orderData);

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) errorMessage = error.message;

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: errorMessage,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const userRole = req.user?.role;

    const { search, page, limit } = req.query;

    if (!userId) throw new Error("Unauthorized: User ID missing");

    // page and limit are mandatory
    if (!page || !limit) {
      throw new Error("Page and limit are required.");
    }

    const filters = {
      search: search as string,
      page: Number(page),
      limit: Number(limit),
    };

    // If admin, get all orders, else only user's orders
    const orders =
      userRole === "admin"
        ? await OrderServices.getAllOrders(filters)
        : await OrderServices.getOrdersByUserId({ userId, filters });

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully!",
      data: orders.data,
      meta: orders.meta,
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) errorMessage = error.message;

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: errorMessage,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
};
