import bcrypt from "bcrypt";

import config from "../../config";
import { User } from "./user.model";

const superUser = {
  name: "Ahad Ahamed",
  email: "admin@techstore.com",
  password: config.super_admin_password,
  role: "admin",
  phone: "01636428995",
};

export const seedSuperAdmin = async () => {
  const isSuperAdminExits = await User.findOne({ role: "admin" });

  const hashedPassword = await bcrypt.hash(
    superUser.password,
    Number(config.bcrypt_salt_rounds)
  );

  const superAdminDataWithHashedPass = {
    ...superUser,
    password: hashedPassword,
  };

  if (!isSuperAdminExits) {
    await User.create(superAdminDataWithHashedPass);
    // console.log("Super admin created successfully!");
  }
};
