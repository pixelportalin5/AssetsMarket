/**
 * Asset trust verification workflow.
 * Approval is a marketplace badge only — it does not gate publishing.
 */
export const VERIFICATION_STATUS = {
  PENDING: "PENDING",
  IN_REVIEW: "IN_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type VerificationStatus = (typeof VERIFICATION_STATUS)[keyof typeof VERIFICATION_STATUS];

export const VERIFICATION_STATUS_VALUES = Object.values(
  VERIFICATION_STATUS,
) as VerificationStatus[];

/** Statuses that block a new concurrent submission (enforced by partial unique index). */
export const OPEN_VERIFICATION_STATUSES: readonly VerificationStatus[] = [
  VERIFICATION_STATUS.PENDING,
  VERIFICATION_STATUS.IN_REVIEW,
];

export const VERIFICATION_STATUS_TRANSITIONS: Record<
  VerificationStatus,
  readonly VerificationStatus[]
> = {
  [VERIFICATION_STATUS.PENDING]: [VERIFICATION_STATUS.IN_REVIEW],
  [VERIFICATION_STATUS.IN_REVIEW]: [VERIFICATION_STATUS.APPROVED, VERIFICATION_STATUS.REJECTED],
  [VERIFICATION_STATUS.APPROVED]: [],
  [VERIFICATION_STATUS.REJECTED]: [],
} as const;

/** New submissions after rejection create a new row (PENDING), not a transition on the rejected row. */
export function canTransitionVerificationStatus(
  from: VerificationStatus,
  to: VerificationStatus,
): boolean {
  return VERIFICATION_STATUS_TRANSITIONS[from].includes(to);
}

/** Latest APPROVED verification grants the trust badge on marketplace cards. */
export const TRUST_BADGE_VERIFICATION_STATUS = VERIFICATION_STATUS.APPROVED;
