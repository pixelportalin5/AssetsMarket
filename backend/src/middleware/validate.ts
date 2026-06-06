import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { ZodError } from "zod";

import { AppError } from "@/lib/errors.js";

type RequestSource = "body" | "query" | "params";

export function validate(schema: ZodSchema, source: RequestSource = "body") {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[source]);

      if (source === "body") {
        req.body = parsed;
      } else if (source === "query") {
        req.query = parsed as Request["query"];
      } else {
        req.params = parsed as Request["params"];
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new AppError("Validation failed", {
            statusCode: 400,
            code: "VALIDATION_ERROR",
            cause: error.flatten(),
          }),
        );
        return;
      }

      next(error);
    }
  };
}
