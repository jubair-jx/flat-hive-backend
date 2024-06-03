import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { userControllers } from "./user.controller";
import { userValidationSchemas } from "./user.validation";

const userRoutes = Router();
userRoutes.post(
  "/create-user",
  validateRequest(userValidationSchemas.createUser),
  userControllers.createUser
);
userRoutes.post(
  "/create-admin",
  validateRequest(userValidationSchemas.createAdmin),
  userControllers.createAdmin
);
userRoutes.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userControllers.getAllUsers
);
userRoutes.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  userControllers.getUserById
);
userRoutes.get(
  "/normal-user",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userControllers.getAllNormalUsers
);

userRoutes.put(
  "/normal-user-info/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userControllers.updateNormalUserData
);

export default userRoutes;
