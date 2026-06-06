import { UserStatus } from "@assetsmarket/database";

import { AppError } from "@/lib/errors.js";

export function assertActiveAccount(status: UserStatus): void {
  if (status === UserStatus.SUSPENDED) {
    throw new AppError("Account is suspended", {
      statusCode: 403,
      code: "ACCOUNT_SUSPENDED",
    });
  }

  if (status === UserStatus.DEACTIVATED) {
    throw new AppError("Account is deactivated", {
      statusCode: 403,
      code: "ACCOUNT_DEACTIVATED",
    });
  }
}

export function assertPublicActiveUser(status: UserStatus): void {
  if (status !== UserStatus.ACTIVE) {
    throw new AppError("User not found", {
      statusCode: 404,
      code: "USER_NOT_FOUND",
    });
  }
}
