import type { Router } from "express";

import { authRouter } from "./routes.js";

export function registerAuthModule(router: Router): void {
  router.use("/auth", authRouter);
}
