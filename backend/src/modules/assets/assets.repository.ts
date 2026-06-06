import { AssetStatus, Prisma } from "@assetsmarket/database";

import { prisma } from "@/lib/prisma.js";
import { AppError } from "@/lib/errors.js";
import { buildAssetSlugCandidate } from "@/lib/assets/asset.slug.js";
import {
  assetDetailInclude,
  assetListInclude,
  assetManageInclude,
  assetNotDeletedWhere,
  buildKeywordSearchFilter,
  marketplaceVisibleWhere,
} from "@/lib/assets/asset.types.js";
import type { PaginationParams } from "@/lib/pagination.js";

import type { CreateAssetInput, ListMarketplaceAssetsInput, UpdateAssetInput } from "./assets.dto.js";

export class AssetsRepository {
  async slugExists(slug: string, excludeAssetId?: string): Promise<boolean> {
    const existing = await prisma.asset.findFirst({
      where: {
        slug,
        deletedAt: null,
        ...(excludeAssetId ? { id: { not: excludeAssetId } } : {}),
      },
      select: { id: true },
    });

    return existing !== null;
  }

  async generateUniqueSlug(title: string): Promise<string> {
    const base = buildAssetSlugCandidate(title);

    if (!(await this.slugExists(base))) {
      return base;
    }

    for (let attempt = 1; attempt <= 20; attempt += 1) {
      const candidate = buildAssetSlugCandidate(title, String(attempt));

      if (!(await this.slugExists(candidate))) {
        return candidate;
      }
    }

    const fallback = buildAssetSlugCandidate(title, crypto.randomUUID().slice(0, 8));
    return fallback;
  }

  async create(ownerId: string, input: CreateAssetInput, slug: string) {
    return prisma.asset.create({
      data: {
        ownerId,
        categoryId: input.categoryId,
        title: input.title,
        slug,
        description: input.description,
        location: input.location,
        previewUrl: input.previewUrl ?? null,
        media: input.media ?? Prisma.JsonNull,
        status: AssetStatus.DRAFT,
      },
      include: assetManageInclude,
    });
  }

  async findManageById(id: string) {
    return prisma.asset.findFirst({
      where: { id, ...assetNotDeletedWhere },
      include: assetManageInclude,
    });
  }

  async findMarketplaceById(id: string) {
    return prisma.asset.findFirst({
      where: { id, ...marketplaceVisibleWhere },
      include: assetDetailInclude,
    });
  }

  async update(id: string, input: UpdateAssetInput) {
    return prisma.asset.update({
      where: { id },
      data: {
        ...(input.title !== undefined ? { title: input.title } : {}),
        ...(input.description !== undefined ? { description: input.description } : {}),
        ...(input.categoryId !== undefined ? { categoryId: input.categoryId } : {}),
        ...(input.location !== undefined ? { location: input.location } : {}),
        ...(input.previewUrl !== undefined ? { previewUrl: input.previewUrl } : {}),
        ...(input.media !== undefined
          ? { media: input.media === null ? Prisma.JsonNull : input.media }
          : {}),
      },
      include: assetManageInclude,
    });
  }

  async softDelete(id: string) {
    return prisma.asset.update({
      where: { id },
      data: { deletedAt: new Date() },
      include: assetManageInclude,
    });
  }

  async transitionStatus(id: string, status: AssetStatus, publishedAt?: Date | null) {
    return prisma.asset.update({
      where: { id },
      data: {
        status,
        ...(publishedAt !== undefined ? { publishedAt } : {}),
      },
      include: assetManageInclude,
    });
  }

  async listMarketplace(input: ListMarketplaceAssetsInput, pagination: PaginationParams) {
    const where: Prisma.AssetWhereInput = {
      ...marketplaceVisibleWhere,
      ...buildKeywordSearchFilter(input.keyword ?? ""),
    };

    if (input.categoryId) {
      where.categoryId = input.categoryId;
    } else if (input.categorySlug) {
      where.category = { slug: input.categorySlug, isActive: true };
    }

    const orderBy = { publishedAt: "desc" as const };

    const [items, total] = await prisma.$transaction([
      prisma.asset.findMany({
        where,
        include: assetListInclude,
        orderBy,
        skip: pagination.skip,
        take: pagination.limit,
      }),
      prisma.asset.count({ where }),
    ]);

    return { items, total };
  }

  async listByOwner(
    ownerId: string,
    pagination: PaginationParams,
    status?: AssetStatus,
  ) {
    const where: Prisma.AssetWhereInput = {
      ownerId,
      ...assetNotDeletedWhere,
      ...(status ? { status } : {}),
    };

    const [items, total] = await prisma.$transaction([
      prisma.asset.findMany({
        where,
        include: assetManageInclude,
        orderBy: [{ updatedAt: "desc" }],
        skip: pagination.skip,
        take: pagination.limit,
      }),
      prisma.asset.count({ where }),
    ]);

    return { items, total };
  }
}

export const assetsRepository = new AssetsRepository();
