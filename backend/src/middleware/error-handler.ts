import type { NextFunction, Request, Response } from "express";

import { env } from "@/config/index.js";
import { AppError, isAppError } from "@/lib/errors.js";
import { logger } from "@/lib/logger.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const appError = normalizeError(err);

  if (!appError.isOperational || appError.statusCode >= 500) {
    logger.error("request failed", {
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: appError.statusCode,
      code: appError.code,
      error:
        env.NODE_ENV === "production"
          ? appError.message
          : { message: appError.message, stack: appError.stack },
    });
  }

  res.status(appError.statusCode).json({
    error: {
      code: appError.code,
      message: appError.message,
    },
    requestId: req.requestId,
  });
}

function normalizeError(err: unknown): AppError {
  if (isAppError(err)) {
    return err;
  }

  if (err instanceof Error) {
    return new AppError(err.message, {
      statusCode: 500,
      code: "INTERNAL_ERROR",
      isOperational: false,
      cause: err,
    });
  }

  return new AppError("An unexpected error occurred", {
    statusCode: 500,
    code: "INTERNAL_ERROR",
    isOperational: false,
  });
}
