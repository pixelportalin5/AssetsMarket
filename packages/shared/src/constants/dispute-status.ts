/**
 * Post-booking dispute on held escrow funds.
 * At most one OPEN or UNDER_REVIEW dispute per escrow (partial unique index in DB).
 */
export const DISPUTE_STATUS = {
  OPEN: "OPEN",
  UNDER_REVIEW: "UNDER_REVIEW",
  RESOLVED: "RESOLVED",
  CLOSED: "CLOSED",
} as const;

export type DisputeStatus = (typeof DISPUTE_STATUS)[keyof typeof DISPUTE_STATUS];

export const DISPUTE_RESOLUTION = {
  BUYER_FAVOR: "BUYER_FAVOR",
  SELLER_FAVOR: "SELLER_FAVOR",
  SPLIT: "SPLIT",
  CANCELLED: "CANCELLED",
} as const;

export type DisputeResolution = (typeof DISPUTE_RESOLUTION)[keyof typeof DISPUTE_RESOLUTION];

export const DISPUTE_STATUS_VALUES = Object.values(DISPUTE_STATUS) as DisputeStatus[];

/** Statuses that block a concurrent dispute submission (DB partial unique index). */
export const OPEN_DISPUTE_STATUSES: readonly DisputeStatus[] = [
  DISPUTE_STATUS.OPEN,
  DISPUTE_STATUS.UNDER_REVIEW,
];

export const DISPUTE_STATUS_TRANSITIONS: Record<DisputeStatus, readonly DisputeStatus[]> = {
  [DISPUTE_STATUS.OPEN]: [DISPUTE_STATUS.UNDER_REVIEW, DISPUTE_STATUS.CLOSED],
  [DISPUTE_STATUS.UNDER_REVIEW]: [DISPUTE_STATUS.RESOLVED, DISPUTE_STATUS.CLOSED],
  [DISPUTE_STATUS.RESOLVED]: [DISPUTE_STATUS.CLOSED],
  [DISPUTE_STATUS.CLOSED]: [],
} as const;

export function canTransitionDisputeStatus(from: DisputeStatus, to: DisputeStatus): boolean {
  return DISPUTE_STATUS_TRANSITIONS[from].includes(to);
}

/** Opening a dispute should transition escrow to DISPUTED (service layer). */
export const DISPUTE_ESCROW_STATUS_ON_OPEN = "DISPUTED" as const;
