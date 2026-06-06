import type { AssetListRecord, AssetManageRecord } from "./asset.types.js";
import { hasTrustBadge } from "./asset.types.js";

import type {
  AssetCategoryDto,
  AssetListItemDto,
  AssetManageDto,
  AssetPublicDetailDto,
} from "@/modules/assets/assets.dto.js";

function mapCategory(category: AssetListRecord["category"]): AssetCategoryDto {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
  };
}

function mapOwner(owner: AssetListRecord["owner"]) {
  return {
    id: owner.id,
    displayName: owner.profile?.displayName ?? "Seller",
    avatar: owner.profile?.avatarUrl ?? null,
  };
}

function truncateDescription(description: string, maxLength = 240): string {
  if (description.length <= maxLength) {
    return description;
  }

  return `${description.slice(0, maxLength).trimEnd()}…`;
}

export function mapAssetToListItem(asset: AssetListRecord): AssetListItemDto {
  return {
    id: asset.id,
    title: asset.title,
    slug: asset.slug,
    description: truncateDescription(asset.description),
    location: asset.location,
    previewUrl: asset.previewUrl,
    category: mapCategory(asset.category),
    owner: mapOwner(asset.owner),
    isVerified: hasTrustBadge(asset.verifications),
    publishedAt: asset.publishedAt?.toISOString() ?? null,
  };
}

export function mapAssetToPublicDetail(asset: AssetListRecord): AssetPublicDetailDto {
  return {
    ...mapAssetToListItem(asset),
    description: asset.description,
    media: asset.media,
  };
}

export function mapAssetToManage(asset: AssetManageRecord): AssetManageDto {
  return {
    id: asset.id,
    title: asset.title,
    slug: asset.slug,
    description: asset.description,
    status: asset.status,
    location: asset.location,
    previewUrl: asset.previewUrl,
    media: asset.media,
    category: mapCategory(asset.category),
    isVerified: hasTrustBadge(asset.verifications),
    publishedAt: asset.publishedAt?.toISOString() ?? null,
    createdAt: asset.createdAt.toISOString(),
    updatedAt: asset.updatedAt.toISOString(),
  };
}
