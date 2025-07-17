import { Router } from "express";

import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { OrderRoutes } from "../modules/order/order.route";
import { ProductRoutes } from "../modules/product/product.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { AnalyticsRoutes } from "../modules/analytics/analytics.route";
import { SubcategoryRoutes } from "../modules/subcategory/subcategory.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/analytics",
    route: AnalyticsRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/subcategory",
    route: SubcategoryRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
