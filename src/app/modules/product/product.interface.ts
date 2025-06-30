import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  categoryId: Types.ObjectId;
  subcategoryId?: Types.ObjectId;
  title: string;
  description: string;
  features?: string;
  specification?: string;
  images: string[];
  regularPrice: number;
  discountPrice?: number | null;
  createdAt: Date;
  updatedAt: Date;
}
