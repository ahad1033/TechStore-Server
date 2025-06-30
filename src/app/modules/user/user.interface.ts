import { USER_ROLE } from "./user.constant";

export interface IUser {
  name: string;
  email: string;
  password: string;

  role: "admin" | "user";
  gender?: "male" | "female";
  phone: string;
  address: string;
  isDeleted?: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
