/**
 * Advertiser campaign container lifecycle.
 * Budget commitment is tracked on Campaign.committed_amount at booking time.
 */
export const CAMPAIGN_STATUS = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  PAUSED: "PAUSED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type CampaignStatus = (typeof CAMPAIGN_STATUS)[keyof typeof CAMPAIGN_STATUS];

export const CAMPAIGN_STATUS_VALUES = Object.values(CAMPAIGN_STATUS) as CampaignStatus[];

/** Campaign statuses that allow new booking reservations. */
export const BOOKING_ELIGIBLE_CAMPAIGN_STATUSES: readonly CampaignStatus[] = [
  CAMPAIGN_STATUS.ACTIVE,
];

export const CAMPAIGN_STATUS_TRANSITIONS: Record<CampaignStatus, readonly CampaignStatus[]> = {
  [CAMPAIGN_STATUS.DRAFT]: [CAMPAIGN_STATUS.ACTIVE, CAMPAIGN_STATUS.CANCELLED],
  [CAMPAIGN_STATUS.ACTIVE]: [
    CAMPAIGN_STATUS.PAUSED,
    CAMPAIGN_STATUS.COMPLETED,
    CAMPAIGN_STATUS.CANCELLED,
  ],
  [CAMPAIGN_STATUS.PAUSED]: [CAMPAIGN_STATUS.ACTIVE, CAMPAIGN_STATUS.CANCELLED],
  [CAMPAIGN_STATUS.COMPLETED]: [],
  [CAMPAIGN_STATUS.CANCELLED]: [],
} as const;

export function canTransitionCampaignStatus(from: CampaignStatus, to: CampaignStatus): boolean {
  return CAMPAIGN_STATUS_TRANSITIONS[from].includes(to);
}
