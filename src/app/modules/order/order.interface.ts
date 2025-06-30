import { Types } from "mongoose";

export interface IOrderProduct {
  productId: Types.ObjectId | string;
  quantity: number;
  price: number;
}

export interface IOrder {
  userId: Types.ObjectId | string;
  products: IOrderProduct[];
  total: number;
  shippingAddress: string;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod?: string;
}
