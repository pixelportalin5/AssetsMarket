import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { env } from "@/config/env.js";
import { errorHandler, notFound, requestId, requestLogger } from "@/middleware/index.js";
import { registerRoutes } from "@/routes/index.js";

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");

  app.use(requestId);
  app.use(requestLogger);
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  registerRoutes(app);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
