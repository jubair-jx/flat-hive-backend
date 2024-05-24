import { Router } from "express";
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
userRoutes.get("/", userControllers.getAllUsers);

export default userRoutes;
