import { createServer } from "node:http";

import { createApp } from "@/app.js";
import { env } from "@/config/env.js";
import { logger } from "@/lib/logger.js";
import { disconnectPrisma } from "@/lib/prisma.js";
import { authRepository } from "@/modules/auth/auth.repository.js";

async function bootstrap(): Promise<void> {
  await authRepository.ensureRolesSeeded();

  const app = createApp();
  const server = createServer(app);

  server.listen(env.PORT, () => {
    logger.info("server started", {
      port: env.PORT,
      nodeEnv: env.NODE_ENV,
      apiPrefix: env.API_PREFIX,
    });
  });

  async function shutdown(signal: string): Promise<void> {
    logger.info("shutdown signal received", { signal });

    server.close(async (err) => {
      if (err) {
        logger.error("http server close failed", { error: err.message });
        process.exit(1);
      }

      try {
        await disconnectPrisma();
        logger.info("graceful shutdown complete");
        process.exit(0);
      } catch (error) {
        logger.error("graceful shutdown failed", {
          error: error instanceof Error ? error.message : "unknown error",
        });
        process.exit(1);
      }
    });
  }

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

bootstrap().catch((error) => {
  logger.error("failed to start server", {
    error: error instanceof Error ? error.message : "unknown error",
  });
  process.exit(1);
});
