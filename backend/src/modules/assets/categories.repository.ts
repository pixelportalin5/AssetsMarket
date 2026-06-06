import { prisma } from "@/lib/prisma.js";
import { AppError } from "@/lib/errors.js";

import { SEED_ASSET_CATEGORIES } from "./assets.constants.js";

export class CategoriesRepository {
  async ensureSeeded(): Promise<void> {
    const count = await prisma.assetCategory.count();

    if (count > 0) {
      return;
    }

    await prisma.assetCategory.createMany({
      data: SEED_ASSET_CATEGORIES.map((category) => ({
        name: category.name,
        slug: category.slug,
        sortOrder: category.sortOrder,
        isActive: true,
      })),
    });
  }

  async findActiveById(id: string) {
    return prisma.assetCategory.findFirst({
      where: { id, isActive: true },
    });
  }

  async findActiveBySlug(slug: string) {
    return prisma.assetCategory.findFirst({
      where: { slug, isActive: true },
    });
  }

  async assertActiveCategory(categoryId: string): Promise<void> {
    const category = await this.findActiveById(categoryId);

    if (!category) {
      throw new AppError("Category not found or inactive", {
        statusCode: 400,
        code: "INVALID_CATEGORY",
      });
    }
  }
}

export const categoriesRepository = new CategoriesRepository();
