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

    const subscribers = await SubscriberServices.getAllSubscribers(filters);

    res.status(200).json({
      success: true,
      message: "Subscribers retrieved successfully!",
      data: subscribers.data,
      meta: subscribers.meta,
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

const deleteSubscriber = async (req: Request, res: Response) => {
  try {
    const subscriberId = req.params.id;

    await SubscriberServices.deleteSubscriber(subscriberId);

    res.status(200).json({
      success: true,
      message: "Subscriber deleted successfully!",
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete subscriber",
      error: errorMessage,
    });
  }
};

const updateSubscriberStatus = async (req: Request, res: Response) => {
  try {
    // SUBSCRIBER ID
    const { id } = req.params;

    const data = req.body;

    await SubscriberServices.updateSubscriberStatus(id, data);

    res.status(200).json({
      success: true,
      message: "Status updated successfully!",
    });
  } catch (error) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      success: false,
      message: "Failed to update subscribers status!",
      error: errorMessage,
    });
  }
};

export const SubscriberControllers = {
  createSubscriber,
  deleteSubscriber,
  getAllSubscribers,
  updateSubscriberStatus,
};
