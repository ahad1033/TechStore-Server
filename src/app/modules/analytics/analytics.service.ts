import { User } from "../user/user.model";
import { Order } from "../order/order.model";
import { Product } from "../product/product.model";

const getAdminAnalytics = async () => {
  // Total Sell: Sum of all orders' total
  const totalSellAgg = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$total" } } },
  ]);

  // Total Sell
  const totalSell = totalSellAgg[0]?.total || 0;

  // Total Products
  const totalProduct = await Product.countDocuments();

  // Total Orders
  const totalOrder = await Order.countDocuments();

  // Total Users (excluding admins)
  const totalUser = await User.countDocuments({ role: { $ne: "admin" } });

  return {
    totalSell,
    totalUser,
    totalOrder,
    totalProduct,
  };
};

const getUserAnalytics = async (userId: string) => {
  // Fetch user-specific orders
  const orders = await Order.find({ userId });

  // Total order of the user
  const totalOrders = orders.length;

  // Total spent of the user
  const totalSpent = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);

  // Total cancelled order
  const cancelledOrder = orders.filter(
    (order) => order.status === "cancelled"
  ).length;

  return {
    totalOrders,
    totalSpent,
    cancelledOrder,
  };
};

export const AnalyticsServices = {
  getUserAnalytics,
  getAdminAnalytics,
};
