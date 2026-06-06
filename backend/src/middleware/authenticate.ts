import type { NextFunction, Request, Response } from "express";

import { AppError } from "@/lib/errors.js";
import { findActiveUserById } from "@/lib/users/user.repository.js";
import { verifyAccessToken } from "@/modules/auth/auth.tokens.js";
import type { AuthUser } from "@/modules/auth/auth.dto.js";
import type { RoleSlug } from "@/modules/auth/auth.constants.js";
import { UserStatus } from "@assetsmarket/database";

function extractBearerToken(req: Request): string | null {
  const header = req.header("authorization");

  if (!header?.startsWith("Bearer ")) {
    return null;
  }

  const token = header.slice("Bearer ".length).trim();
  return token.length > 0 ? token : null;
}

export async function authenticate(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const token = extractBearerToken(req);

    if (!token) {
      throw new AppError("Authentication required", {
        statusCode: 401,
        code: "UNAUTHORIZED",
      });
    }

    const payload = verifyAccessToken(token);
    const user = await findActiveUserById(payload.sub);

    if (!user) {
      throw new AppError("User account not found", {
        statusCode: 401,
        code: "UNAUTHORIZED",
      });
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new AppError("Account is not active", {
        statusCode: 403,
        code: "ACCOUNT_INACTIVE",
      });
    }

    const roles = user.roles.map((entry) => entry.role.slug as RoleSlug);

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      roles,
    };

    req.user = authUser;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    next(
      new AppError("Invalid or expired access token", {
        statusCode: 401,
        code: "UNAUTHORIZED",
        cause: error,
      }),
    );
  }
}

export function authorize(...allowedRoles: RoleSlug[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(
        new AppError("Authentication required", {
          statusCode: 401,
          code: "UNAUTHORIZED",
        }),
      );
      return;
    }

    const hasRole = allowedRoles.some((role) => req.user!.roles.includes(role));

    if (!hasRole) {
      next(
        new AppError("Insufficient permissions", {
          statusCode: 403,
          code: "FORBIDDEN",
        }),
      );
      return;
    }

    next();
  };
}
