import { Types } from "mongoose";

export interface IOrderProduct {
  productId: Types.ObjectId | string;
  quantity: number;
  price: number;
}

export interface IOrder {
  orderNumber?: number;
  userId: Types.ObjectId | string;
  name: string;
  phone: string;
  products: IOrderProduct[];
  total: number;
  subTotal: number;
  deliveryFee: number;
  shippingAddress: string;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod?: string;
  deliveryNotes?: string;
}
