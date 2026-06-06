import type { Request } from "express";

import type { AuthUser } from "@/modules/auth/auth.dto.js";

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      user?: AuthUser;
    }
  }
}

export type { Request };
