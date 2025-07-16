import { Request, Response } from "express";
import { AnalyticsServices } from "./analytics.service";

const getAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const userRole = req.user?.role;

    console.log("REQ on backend: ", req.user);
    // if (!userId) throw new Error("Unauthorized: User ID missing");

    const orders =
      userRole === "admin"
        ? await AnalyticsServices.getAdminAnalytics()
        : await AnalyticsServices.getUserAnalytics(userId);

    res.status(200).json({
      success: true,
      message: "Analytics retrieved successfully!",
      data: orders,
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

export const AnalyticsControllers = {
  getAnalytics,
};
