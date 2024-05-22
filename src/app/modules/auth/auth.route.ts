import { Router } from "express";
import { authControllers } from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/", authControllers.loginUser);

export default authRoutes;
