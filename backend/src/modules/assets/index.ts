import type { Router } from "express";

import { assetsRouter } from "./routes.js";

export function registerAssetsModule(router: Router): void {
  router.use("/assets", assetsRouter);
}
