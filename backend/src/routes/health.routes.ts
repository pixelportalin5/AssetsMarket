import { Router, type Router as RouterType } from "express";

import { env } from "@/config/index.js";

export const healthRouter: RouterType = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "AssetsMarket API",
    version: env.API_VERSION,
  });
});
