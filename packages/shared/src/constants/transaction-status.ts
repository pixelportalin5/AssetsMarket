/**
 * Financial ledger entry lifecycle.
 * Refunds are new REFUND-type rows — original PAYMENT rows stay COMPLETED.
 */
export const TRANSACTION_STATUS = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;

export type TransactionStatus = (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

export const TRANSACTION_TYPE = {
  PAYMENT: "PAYMENT",
  REFUND: "REFUND",
  PAYOUT: "PAYOUT",
  PLATFORM_FEE: "PLATFORM_FEE",
} as const;

export type TransactionType = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export const TRANSACTION_STATUS_VALUES = Object.values(
  TRANSACTION_STATUS,
) as TransactionStatus[];

export const TRANSACTION_STATUS_TRANSITIONS: Record<
  TransactionStatus,
  readonly TransactionStatus[]
> = {
  [TRANSACTION_STATUS.PENDING]: [TRANSACTION_STATUS.PROCESSING, TRANSACTION_STATUS.FAILED],
  [TRANSACTION_STATUS.PROCESSING]: [TRANSACTION_STATUS.COMPLETED, TRANSACTION_STATUS.FAILED],
  [TRANSACTION_STATUS.COMPLETED]: [TRANSACTION_STATUS.REFUNDED],
  [TRANSACTION_STATUS.FAILED]: [],
  [TRANSACTION_STATUS.REFUNDED]: [],
} as const;

export function canTransitionTransactionStatus(
  from: TransactionStatus,
  to: TransactionStatus,
): boolean {
  return TRANSACTION_STATUS_TRANSITIONS[from].includes(to);
}

/** Funding payment type used to fund escrow (partial unique index in DB). */
export const ESCROW_FUNDING_TRANSACTION_TYPE = TRANSACTION_TYPE.PAYMENT;

/** Completed funding status for escrow linkage. */
export const ESCROW_FUNDING_TRANSACTION_STATUS = TRANSACTION_STATUS.COMPLETED;
