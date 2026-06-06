import type { Prisma } from "@assetsmarket/database";

export interface AssetCategoryDto {
  id: string;
  name: string;
  slug: string;
}

export interface AssetOwnerPublicDto {
  id: string;
  displayName: string;
  avatar: string | null;
}

export interface AssetListItemDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string | null;
  previewUrl: string | null;
  category: AssetCategoryDto;
  owner: AssetOwnerPublicDto;
  isVerified: boolean;
  publishedAt: string | null;
}

export interface AssetPublicDetailDto extends AssetListItemDto {
  media: Prisma.JsonValue | null;
}

export interface AssetManageDto {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  location: string | null;
  previewUrl: string | null;
  media: Prisma.JsonValue | null;
  category: AssetCategoryDto;
  isVerified: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssetInput {
  title: string;
  description: string;
  categoryId: string;
  location?: string;
  previewUrl?: string | null;
  media?: Prisma.InputJsonValue | null;
}

export interface UpdateAssetInput {
  title?: string;
  description?: string;
  categoryId?: string;
  location?: string | null;
  previewUrl?: string | null;
  media?: Prisma.InputJsonValue | null;
}

export interface ListMarketplaceAssetsInput {
  page?: number;
  limit?: number;
  categoryId?: string;
  categorySlug?: string;
  keyword?: string;
  sort?: "publishedAt";
}

export interface ListMyAssetsInput {
  page?: number;
  limit?: number;
  status?: string;
}
