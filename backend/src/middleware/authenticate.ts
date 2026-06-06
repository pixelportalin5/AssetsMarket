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

async function resolveAuthUser(token: string): Promise<AuthUser | null> {
  try {
    const payload = verifyAccessToken(token);
    const user = await findActiveUserById(payload.sub);

    if (!user || user.status !== UserStatus.ACTIVE) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      roles: user.roles.map((entry) => entry.role.slug as RoleSlug),
    };
  } catch {
    return null;
  }
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

    const authUser = await resolveAuthUser(token);

    if (!authUser) {
      throw new AppError("Invalid or expired access token", {
        statusCode: 401,
        code: "UNAUTHORIZED",
      });
    }

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

/** Sets req.user when a valid token is present; continues anonymously otherwise. */
export async function optionalAuthenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const token = extractBearerToken(req);

  if (!token) {
    next();
    return;
  }

  const authUser = await resolveAuthUser(token);

  if (authUser) {
    req.user = authUser;
  }

  next();
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
