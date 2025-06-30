import { Types } from "mongoose";

export interface ISubcategory {
  categoryId: Types.ObjectId;
  name: string;
  description?: string;
}
