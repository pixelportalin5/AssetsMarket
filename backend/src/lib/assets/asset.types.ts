import { Prisma, VerificationStatus, type Asset, type AssetCategory, type UserProfile } from "@assetsmarket/database";
import {
  MARKETPLACE_VISIBLE_ASSET_STATUSES,
  TRUST_BADGE_VERIFICATION_STATUS,
} from "@assetsmarket/shared";

/** Shared Prisma filter for public marketplace-visible assets. */
export const marketplaceVisibleWhere = {
  deletedAt: null,
  status: { in: [...MARKETPLACE_VISIBLE_ASSET_STATUSES] },
  category: { isActive: true },
} satisfies Prisma.AssetWhereInput;

export const assetNotDeletedWhere = {
  deletedAt: null,
} satisfies Prisma.AssetWhereInput;

export const assetCategorySelect = {
  id: true,
  name: true,
  slug: true,
} as const;

export const assetOwnerPublicSelect = {
  id: true,
  profile: {
    select: {
      displayName: true,
      avatarUrl: true,
    },
  },
} as const;

export const assetTrustBadgeInclude = {
  verifications: {
    where: { status: TRUST_BADGE_VERIFICATION_STATUS as VerificationStatus },
    orderBy: { submittedAt: "desc" as const },
    take: 1,
    select: {
      id: true,
      status: true,
      reviewedAt: true,
    },
  },
} as const;

export const assetListInclude = {
  category: { select: assetCategorySelect },
  owner: { select: assetOwnerPublicSelect },
  ...assetTrustBadgeInclude,
} as const;

export const assetDetailInclude = assetListInclude;

export const assetManageInclude = {
  category: { select: assetCategorySelect },
  ...assetTrustBadgeInclude,
} as const;

export type AssetListRecord = Asset & {
  category: Pick<AssetCategory, keyof typeof assetCategorySelect>;
  owner: {
    id: string;
    profile: Pick<UserProfile, "displayName" | "avatarUrl"> | null;
  };
  verifications: Array<{ id: string; status: VerificationStatus; reviewedAt: Date | null }>;
};

export type AssetManageRecord = Asset & {
  category: Pick<AssetCategory, keyof typeof assetCategorySelect>;
  verifications: Array<{ id: string; status: VerificationStatus; reviewedAt: Date | null }>;
};

export function buildKeywordSearchFilter(keyword: string): Prisma.AssetWhereInput {
  const term = keyword.trim();

  if (!term) {
    return {};
  }

  return {
    OR: [
      { title: { contains: term, mode: "insensitive" } },
      { description: { contains: term, mode: "insensitive" } },
      { location: { contains: term, mode: "insensitive" } },
    ],
  };
}

export function hasTrustBadge(
  verifications: Array<{ status: VerificationStatus }>,
): boolean {
  return verifications.some((entry) => entry.status === TRUST_BADGE_VERIFICATION_STATUS);
}
