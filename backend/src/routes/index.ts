import type { Express } from "express";
import { Router } from "express";

import { env } from "@/config/index.js";
import { registerAuthModule } from "@/modules/auth/index.js";
import { registerUsersModule } from "@/modules/users/index.js";

import { healthRouter } from "./health.routes.js";

export function registerRoutes(app: Express): void {
  app.use("/health", healthRouter);

  const apiRouter = Router();
  registerAuthModule(apiRouter);
  registerUsersModule(apiRouter);

  app.use(env.API_PREFIX, apiRouter);
}
