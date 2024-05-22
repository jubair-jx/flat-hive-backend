import { Router } from "express";
import auth from "../../middlewares/auth";
import { profileControllers } from "./profile.controller";

const profileRoutes = Router();

profileRoutes.get("/", auth(), profileControllers.getAllProfiles);
profileRoutes.put("/", auth(), profileControllers.updateProfile);

export default profileRoutes;
