import type { NextFunction, Request, Response } from "express";

import { assetsService } from "./assets.service.js";
import type {
  AssetIdParams,
  CreateAssetBody,
  ListMarketplaceAssetsQuery,
  ListMyAssetsQuery,
  UpdateAssetBody,
} from "./assets.validators.js";
import type { CreateAssetInput, UpdateAssetInput } from "./assets.dto.js";

export async function createAsset(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const body = req.body as CreateAssetBody;
    const asset = await assetsService.create(req.user!.id, body as CreateAssetInput);
    res.status(201).json({ data: { asset } });
  } catch (error) {
    next(error);
  }
}

export async function updateAsset(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as AssetIdParams;
    const body = req.body as UpdateAssetBody;
    const asset = await assetsService.update(req.user!.id, id, body as UpdateAssetInput);
    res.status(200).json({ data: { asset } });
  } catch (error) {
    next(error);
  }
}

export async function deleteAsset(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as AssetIdParams;
    const asset = await assetsService.softDelete(req.user!.id, id);
    res.status(200).json({ data: { asset } });
  } catch (error) {
    next(error);
  }
}

export async function publishAsset(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as AssetIdParams;
    const asset = await assetsService.publish(req.user!.id, id);
    res.status(200).json({ data: { asset } });
  } catch (error) {
    next(error);
  }
}

export async function archiveAsset(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as AssetIdParams;
    const asset = await assetsService.archive(req.user!.id, id);
    res.status(200).json({ data: { asset } });
  } catch (error) {
    next(error);
  }
}

export async function listMyAssets(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = req.query as unknown as ListMyAssetsQuery;
    const result = await assetsService.listMine(req.user!.id, query);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function listMarketplaceAssets(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const query = req.query as unknown as ListMarketplaceAssetsQuery;
    const result = await assetsService.listMarketplace({
      page: query.page,
      limit: query.limit,
      categoryId: query.categoryId,
      categorySlug: query.category,
      keyword: query.q,
      sort: query.sort,
    });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function getAssetById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as AssetIdParams;
    const result = await assetsService.getById(id, req.user?.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}
