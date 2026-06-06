import { z } from "zod";

import { ASSET_STATUS } from "@assetsmarket/shared";
import { PAGINATION_MAX_LIMIT } from "@/lib/pagination.js";

const assetStatusValues = [
  ASSET_STATUS.DRAFT,
  ASSET_STATUS.PUBLISHED,
  ASSET_STATUS.ARCHIVED,
  ASSET_STATUS.SUSPENDED,
] as const;

const optionalUrl = z.union([z.string().trim().url().max(2048), z.null()]).optional();

const mediaSchema = z
  .union([z.array(z.unknown()), z.record(z.unknown()), z.null()])
  .optional();

export const createAssetSchema = z.object({
  title: z.string().trim().min(3).max(200),
  description: z.string().trim().min(10).max(10000),
  categoryId: z.string().uuid(),
  location: z.string().trim().max(255).optional(),
  previewUrl: optionalUrl,
  media: mediaSchema,
});

export const updateAssetSchema = z
  .object({
    title: z.string().trim().min(3).max(200).optional(),
    description: z.string().trim().min(10).max(10000).optional(),
    categoryId: z.string().uuid().optional(),
    location: z.union([z.string().trim().max(255), z.null()]).optional(),
    previewUrl: optionalUrl,
    media: mediaSchema,
  })
  .refine((value) => Object.values(value).some((field) => field !== undefined), {
    message: "At least one field must be provided",
  });

export const assetIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const listMarketplaceAssetsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(PAGINATION_MAX_LIMIT).optional(),
  categoryId: z.string().uuid().optional(),
  category: z.string().trim().min(1).max(80).optional(),
  q: z.string().trim().min(1).max(120).optional(),
  sort: z.enum(["publishedAt"]).optional(),
});

export const listMyAssetsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(PAGINATION_MAX_LIMIT).optional(),
  status: z.enum(assetStatusValues).optional(),
});

export type CreateAssetBody = z.infer<typeof createAssetSchema>;
export type UpdateAssetBody = z.infer<typeof updateAssetSchema>;
export type AssetIdParams = z.infer<typeof assetIdParamSchema>;
export type ListMarketplaceAssetsQuery = z.infer<typeof listMarketplaceAssetsQuerySchema>;
export type ListMyAssetsQuery = z.infer<typeof listMyAssetsQuerySchema>;
