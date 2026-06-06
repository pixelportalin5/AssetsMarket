import { Router, type Router as RouterType } from "express";

import { authenticate } from "@/middleware/authenticate.js";
import { validate } from "@/middleware/validate.js";

import {
  login,
  logout,
  me,
  refresh,
  register,
} from "./auth.controller.js";
import {
  loginSchema,
  logoutSchema,
  refreshSchema,
  registerSchema,
} from "./auth.validators.js";

export const authRouter: RouterType = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/refresh", validate(refreshSchema), refresh);
authRouter.post("/logout", validate(logoutSchema), logout);
authRouter.get("/me", authenticate, me);
