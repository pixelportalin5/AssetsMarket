/**
 * Escrow hold lifecycle — one escrow record per booking.
 * Coupled to booking status in the commerce service layer.
 */
export const ESCROW_STATUS = {
  PENDING_FUNDING: "PENDING_FUNDING",
  FUNDED: "FUNDED",
  RELEASED: "RELEASED",
  REFUNDED: "REFUNDED",
  DISPUTED: "DISPUTED",
} as const;

export type EscrowStatus = (typeof ESCROW_STATUS)[keyof typeof ESCROW_STATUS];

export const ESCROW_STATUS_VALUES = Object.values(ESCROW_STATUS) as EscrowStatus[];

/** Terminal escrow states — no further transitions. */
export const TERMINAL_ESCROW_STATUSES: readonly EscrowStatus[] = [
  ESCROW_STATUS.RELEASED,
  ESCROW_STATUS.REFUNDED,
];

export const ESCROW_STATUS_TRANSITIONS: Record<EscrowStatus, readonly EscrowStatus[]> = {
  [ESCROW_STATUS.PENDING_FUNDING]: [ESCROW_STATUS.FUNDED, ESCROW_STATUS.REFUNDED],
  [ESCROW_STATUS.FUNDED]: [ESCROW_STATUS.RELEASED, ESCROW_STATUS.DISPUTED, ESCROW_STATUS.REFUNDED],
  [ESCROW_STATUS.DISPUTED]: [ESCROW_STATUS.FUNDED, ESCROW_STATUS.REFUNDED],
  [ESCROW_STATUS.RELEASED]: [],
  [ESCROW_STATUS.REFUNDED]: [],
} as const;

export function canTransitionEscrowStatus(from: EscrowStatus, to: EscrowStatus): boolean {
  return ESCROW_STATUS_TRANSITIONS[from].includes(to);
}

/** Booking status alignment reference (enforced in services, not DB). */
export const ESCROW_BOOKING_STATUS_MAP = {
  [ESCROW_STATUS.PENDING_FUNDING]: "PENDING_PAYMENT",
  [ESCROW_STATUS.FUNDED]: "CONFIRMED",
  [ESCROW_STATUS.DISPUTED]: "CONFIRMED",
  [ESCROW_STATUS.RELEASED]: "COMPLETED",
  [ESCROW_STATUS.REFUNDED]: "CANCELLED",
} as const;
