import { Router, type Router as RouterType } from "express";

import { authenticate, validate } from "@/middleware/index.js";

import { getById, getMe, updateMe } from "./users.controller.js";
import { updateProfileSchema, userIdParamSchema } from "./users.validators.js";

export const usersRouter: RouterType = Router();

usersRouter.use(authenticate);

usersRouter.get("/me", getMe);
usersRouter.patch("/me", validate(updateProfileSchema), updateMe);
usersRouter.get("/:id", validate(userIdParamSchema, "params"), getById);
