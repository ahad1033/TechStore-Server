import { Request, Response } from "express";
import { SubscriberServices } from "./subscriber.service";

const createSubscriber = async (req: Request, res: Response) => {
  try {
    const subscribeData = req.body;

    const order = await SubscriberServices.createSubscriber(subscribeData);

    res.status(201).json({
      success: true,
      message:
        "Thank you for subscribing! You'll now receive our latest offers, updates, and news directly to your email.",
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

const getAllSubscribers = async (req: Request, res: Response) => {
  try {
    const userRole = req.user?.role;

    if (userRole !== "admin")
      throw new Error(
        "Unauthorized: You are not authorized to access this resource!"
      );

    const { search, page, limit } = req.query;

    // page and limit are mandatory
    if (!page || !limit) {
      throw new Error("Page and limit are required.");
    }

    const filters = {
      search: search as string,
      page: Number(page),
      limit: Number(limit),
    };

    const orders = await SubscriberServices.getAllSubscribers(filters);

    res.status(200).json({
      success: true,
      message: "Subscribers retrieved successfully!",
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

export const SubscriberControllers = {
  createSubscriber,
  getAllSubscribers,
};
