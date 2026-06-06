import { AssetStatus, Prisma } from "@assetsmarket/database";
import { ASSET_STATUS, canTransitionAssetStatus } from "@assetsmarket/shared";

import { AppError } from "@/lib/errors.js";
import { assertAssetMutable, assertAssetOwner } from "@/lib/assets/asset.guards.js";
import {
  mapAssetToManage,
  mapAssetToPublicDetail,
  mapAssetToListItem,
} from "@/lib/assets/asset.mapper.js";
import { buildPaginationMeta, parsePagination } from "@/lib/pagination.js";

import type {
  AssetManageDto,
  AssetPublicDetailDto,
  CreateAssetInput,
  ListMarketplaceAssetsInput,
  ListMyAssetsInput,
  UpdateAssetInput,
} from "./assets.dto.js";
import { assetsRepository } from "./assets.repository.js";
import { categoriesRepository } from "./categories.repository.js";

type AssetViewKind = "public" | "manage";

export class AssetsService {
  async create(ownerId: string, input: CreateAssetInput): Promise<AssetManageDto> {
    await categoriesRepository.ensureSeeded();
    await categoriesRepository.assertActiveCategory(input.categoryId);

    const slug = await assetsRepository.generateUniqueSlug(input.title);

    try {
      const asset = await assetsRepository.create(ownerId, input, slug);
      return mapAssetToManage(asset);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new AppError("An asset with this slug already exists", {
          statusCode: 409,
          code: "SLUG_ALREADY_EXISTS",
        });
      }

      throw error;
    }
  }

  async update(
    ownerId: string,
    assetId: string,
    input: UpdateAssetInput,
  ): Promise<AssetManageDto> {
    const asset = await this.getOwnedAsset(assetId, ownerId);
    assertAssetMutable(asset.status);

    if (input.categoryId) {
      await categoriesRepository.assertActiveCategory(input.categoryId);
    }

    const updated = await assetsRepository.update(asset.id, input);
    return mapAssetToManage(updated);
  }

  async softDelete(ownerId: string, assetId: string): Promise<AssetManageDto> {
    const asset = await this.getOwnedAsset(assetId, ownerId);
    const deleted = await assetsRepository.softDelete(asset.id);
    return mapAssetToManage(deleted);
  }

  async publish(ownerId: string, assetId: string): Promise<AssetManageDto> {
    const asset = await this.getOwnedAsset(assetId, ownerId);
    assertAssetMutable(asset.status);

    this.assertStatusTransition(asset.status, ASSET_STATUS.PUBLISHED);

    await categoriesRepository.assertActiveCategory(asset.categoryId);

    const published = await assetsRepository.transitionStatus(
      asset.id,
      AssetStatus.PUBLISHED,
      new Date(),
    );

    return mapAssetToManage(published);
  }

  async archive(ownerId: string, assetId: string): Promise<AssetManageDto> {
    const asset = await this.getOwnedAsset(assetId, ownerId);

    this.assertStatusTransition(asset.status, ASSET_STATUS.ARCHIVED);

    const archived = await assetsRepository.transitionStatus(asset.id, AssetStatus.ARCHIVED);
    return mapAssetToManage(archived);
  }

  async listMine(ownerId: string, input: ListMyAssetsInput) {
    await categoriesRepository.ensureSeeded();

    const pagination = parsePagination(input);
    const status = input.status as AssetStatus | undefined;

    const { items, total } = await assetsRepository.listByOwner(ownerId, pagination, status);

    return {
      assets: items.map(mapAssetToManage),
      pagination: buildPaginationMeta(pagination, total),
    };
  }

  async listMarketplace(input: ListMarketplaceAssetsInput) {
    await categoriesRepository.ensureSeeded();

    if (input.categorySlug) {
      const category = await categoriesRepository.findActiveBySlug(input.categorySlug);

      if (!category) {
        throw new AppError("Category not found", {
          statusCode: 404,
          code: "CATEGORY_NOT_FOUND",
        });
      }
    }

    const pagination = parsePagination(input);
    const { items, total } = await assetsRepository.listMarketplace(input, pagination);

    return {
      assets: items.map(mapAssetToListItem),
      pagination: buildPaginationMeta(pagination, total),
    };
  }

  async getById(
    assetId: string,
    viewerId?: string,
  ): Promise<{ asset: AssetPublicDetailDto | AssetManageDto; view: AssetViewKind }> {
    const marketplaceAsset = await assetsRepository.findMarketplaceById(assetId);

    if (marketplaceAsset) {
      return {
        asset: mapAssetToPublicDetail(marketplaceAsset),
        view: "public",
      };
    }

    if (!viewerId) {
      throw new AppError("Asset not found", {
        statusCode: 404,
        code: "ASSET_NOT_FOUND",
      });
    }

    const ownedAsset = await assetsRepository.findManageById(assetId);

    if (!ownedAsset) {
      throw new AppError("Asset not found", {
        statusCode: 404,
        code: "ASSET_NOT_FOUND",
      });
    }

    assertAssetOwner(ownedAsset.ownerId, viewerId);

    return {
      asset: mapAssetToManage(ownedAsset),
      view: "manage",
    };
  }

  private async getOwnedAsset(assetId: string, ownerId: string) {
    const asset = await assetsRepository.findManageById(assetId);

    if (!asset) {
      throw new AppError("Asset not found", {
        statusCode: 404,
        code: "ASSET_NOT_FOUND",
      });
    }

    assertAssetOwner(asset.ownerId, ownerId);
    return asset;
  }

  private assertStatusTransition(from: AssetStatus, to: AssetStatus): void {
    if (!canTransitionAssetStatus(from, to)) {
      throw new AppError(`Cannot transition asset from ${from} to ${to}`, {
        statusCode: 409,
        code: "INVALID_STATUS_TRANSITION",
      });
    }
  }
}

export const assetsService = new AssetsService();
