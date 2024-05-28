import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { flatControllers } from "./flat.controller";
import { flatValidations } from "./flat.validation";

const flatRoutes = Router();

flatRoutes.post(
  "/create-flat",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  validateRequest(flatValidations.createFlatValidation),
  flatControllers.createFlat
);
flatRoutes.get("/", flatControllers.getAllFlats);
flatRoutes.put(
  "/:flatId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  validateRequest(flatValidations.updateFlatValidation),
  flatControllers.updateFlat
);

export default flatRoutes;
