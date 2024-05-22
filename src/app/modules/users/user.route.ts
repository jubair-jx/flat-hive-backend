import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userControllers } from "./user.controller";
import { userValidationSchemas } from "./user.validation";

const userRoutes = Router();
userRoutes.post(
  "/",
  validateRequest(userValidationSchemas.createUser),
  userControllers.createUser
);
export default userRoutes;
