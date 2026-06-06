export const AD_PRODUCT_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SOLD_OUT: "SOLD_OUT",
} as const;

export type AdProductStatus = (typeof AD_PRODUCT_STATUS)[keyof typeof AD_PRODUCT_STATUS];

export const AD_PRODUCT_STATUS_TRANSITIONS: Record<
  AdProductStatus,
  readonly AdProductStatus[]
> = {
  [AD_PRODUCT_STATUS.ACTIVE]: [AD_PRODUCT_STATUS.INACTIVE, AD_PRODUCT_STATUS.SOLD_OUT],
  [AD_PRODUCT_STATUS.INACTIVE]: [AD_PRODUCT_STATUS.ACTIVE],
  [AD_PRODUCT_STATUS.SOLD_OUT]: [AD_PRODUCT_STATUS.ACTIVE, AD_PRODUCT_STATUS.INACTIVE],
} as const;

export function canTransitionAdProductStatus(from: AdProductStatus, to: AdProductStatus): boolean {
  return AD_PRODUCT_STATUS_TRANSITIONS[from].includes(to);
}

/** Statuses eligible for marketplace booking when parent asset is PUBLISHED. */
export const BOOKABLE_AD_PRODUCT_STATUSES: readonly AdProductStatus[] = [
  AD_PRODUCT_STATUS.ACTIVE,
];
