/**
 * Asset listing visibility lifecycle.
 * Inventory lock states belong on AdProduct/Booking — not Asset.
 */
export const ASSET_STATUS = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
  SUSPENDED: "SUSPENDED",
} as const;

export type AssetStatus = (typeof ASSET_STATUS)[keyof typeof ASSET_STATUS];

export const ASSET_STATUS_VALUES = Object.values(ASSET_STATUS) as AssetStatus[];

/** Allowed transitions for seller/admin asset lifecycle. */
export const ASSET_STATUS_TRANSITIONS: Record<AssetStatus, readonly AssetStatus[]> = {
  [ASSET_STATUS.DRAFT]: [ASSET_STATUS.PUBLISHED, ASSET_STATUS.ARCHIVED],
  [ASSET_STATUS.PUBLISHED]: [ASSET_STATUS.DRAFT, ASSET_STATUS.ARCHIVED, ASSET_STATUS.SUSPENDED],
  [ASSET_STATUS.ARCHIVED]: [ASSET_STATUS.DRAFT],
  [ASSET_STATUS.SUSPENDED]: [ASSET_STATUS.DRAFT, ASSET_STATUS.ARCHIVED],
} as const;

export function canTransitionAssetStatus(from: AssetStatus, to: AssetStatus): boolean {
  return ASSET_STATUS_TRANSITIONS[from].includes(to);
}

/** Statuses visible on public marketplace browse (verification badge is separate). */
export const MARKETPLACE_VISIBLE_ASSET_STATUSES: readonly AssetStatus[] = [ASSET_STATUS.PUBLISHED];
