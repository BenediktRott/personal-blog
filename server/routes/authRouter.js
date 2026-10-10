import { Router } from "express";
import * as authController from "../controllers/authController.js";

export const authRouter = new Router();

authRouter.post("/login", authController.postLogin);
authRouter.post("/register", authController.postRegister);
