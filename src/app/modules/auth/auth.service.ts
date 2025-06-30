import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../../config";

import { User } from "../user/user.model";
import { TLoginUser, TSignupUser } from "./auth.interface";

const signUp = async (userData: TSignupUser) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new Error("This email already exists! Please use another email.");
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(
      userData.password,
      parseInt(config.bcrypt_salt_rounds, 10)
    );

    // Replace the plain password with the hashed password
    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };

    // Create the user
    const user = new User(userWithHashedPassword);

    return await user.save();
  } catch (error) {
    throw error;
  }
};

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await User.findOne({ email: payload.email }).select(
    "+password"
  );

  if (!isUserExist) {
    throw new Error("User not found");
  }

  // CHECK IF THE USER IS DELETED
  const isDeleted = isUserExist?.isDeleted;

  if (isDeleted) {
    throw new Error("User has been deleted");
  }

  // CHECK IF THE PASSWORD IS CORRECT
  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    isUserExist?.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Password is incorrect");
  }

  // CREATE TOKEN
  const accessToken = jwt.sign(
    {
      name: isUserExist?.name,
      email: isUserExist?.email,
      role: isUserExist?.role,
      userId: isUserExist?.id,
    },
    config.jwt_access_secret as string,
    {
      expiresIn: "10d",
    }
  );

  // CREATE REFRESH TOKEN
  const refreshToken = jwt.sign(
    {
      email: isUserExist?.email,
      role: isUserExist?.role,
      userId: isUserExist?.id,
    },
    config.jwt_refresh_secret as string,
    {
      expiresIn: "365d",
    }
  );

  return {
    accessToken,
    refreshToken,
    userRole: isUserExist?.role,
  };
};

const refreshToken = async (refreshToken: string) => {
  // CHECK IF THE TOKEN IS PRESENT
  if (!refreshToken) {
    throw new Error("You are not authorized to access this resource!");
  }

  // CHECK IF THE TOKEN IS VALID
  try {
    const decoded = jwt.verify(
      refreshToken,
      config.jwt_refresh_secret as string
    ) as JwtPayload;

    const role = decoded.role;

    const isUserExist = await User.findOne({
      email: decoded.email,
    });

    if (!isUserExist) {
      throw new Error("User not found");
    }

    // CHECK IF THE USER IS DELETED
    const isDeleted = isUserExist?.isDeleted;

    if (isDeleted) {
      throw new Error("User has been deleted!");
    }

    const accessToken = jwt.sign(
      {
        email: isUserExist?.email,
        role: isUserExist?.role,
        userId: isUserExist?.id,
      },
      config.jwt_refresh_secret as string,
      { expiresIn: "365d" }
    );

    return {
      accessToken,
    };
  } catch (error) {
    throw new Error("You are not authorized to access this resource!");
  }
};

export const AuthService = {
  signUp,
  loginUser,
  refreshToken,
};
