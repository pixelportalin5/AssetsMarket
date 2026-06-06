import type { Router } from "express";

import { authRouter } from "./routes.js";

export function registerAuthModule(router: Router): void {
  router.use("/auth", authRouter);
}

export { ROLE_SLUGS, REGISTERABLE_ROLE_SLUGS, type RoleSlug } from "./auth.constants.js";
