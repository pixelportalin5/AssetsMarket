import type { Router } from "express";

import { usersRouter } from "./routes.js";

export function registerUsersModule(router: Router): void {
  router.use("/users", usersRouter);
}
