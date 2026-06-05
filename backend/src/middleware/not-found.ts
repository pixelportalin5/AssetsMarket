import type { NextFunction, Request, Response } from "express";

import { AppError } from "@/lib/errors.js";

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  next(
    new AppError(`Route ${req.method} ${req.originalUrl} not found`, {
      statusCode: 404,
      code: "NOT_FOUND",
    }),
  );
}
