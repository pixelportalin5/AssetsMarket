import { ASSET_STATUS } from "@assetsmarket/shared";

import { AppError } from "@/lib/errors.js";

export function assertAssetOwner(ownerId: string, userId: string): void {
  if (ownerId !== userId) {
    throw new AppError("You do not own this asset", {
      statusCode: 403,
      code: "FORBIDDEN",
    });
  }
}

export function assertAssetMutable(status: string): void {
  if (status === ASSET_STATUS.SUSPENDED) {
    throw new AppError("Suspended assets cannot be modified", {
      statusCode: 403,
      code: "ASSET_SUSPENDED",
    });
  }
}
