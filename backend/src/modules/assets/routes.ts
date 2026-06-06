import { Router, type Router as RouterType } from "express";

import { authenticate, authorize, optionalAuthenticate, validate } from "@/middleware/index.js";
import { ROLE_SLUGS } from "@/modules/auth/auth.constants.js";

import {
  archiveAsset,
  createAsset,
  deleteAsset,
  getAssetById,
  listMarketplaceAssets,
  listMyAssets,
  publishAsset,
  updateAsset,
} from "./assets.controller.js";
import {
  assetIdParamSchema,
  createAssetSchema,
  listMarketplaceAssetsQuerySchema,
  listMyAssetsQuerySchema,
  updateAssetSchema,
} from "./assets.validators.js";

export const assetsRouter: RouterType = Router();

assetsRouter.get("/", validate(listMarketplaceAssetsQuerySchema, "query"), listMarketplaceAssets);

assetsRouter.get(
  "/my",
  authenticate,
  authorize(ROLE_SLUGS.SELLER),
  validate(listMyAssetsQuerySchema, "query"),
  listMyAssets,
);

assetsRouter.get(
  "/:id",
  optionalAuthenticate,
  validate(assetIdParamSchema, "params"),
  getAssetById,
);

assetsRouter.post(
  "/",
  authenticate,
  authorize(ROLE_SLUGS.SELLER),
  validate(createAssetSchema),
  createAsset,
);

assetsRouter.patch(
  "/:id",
  authenticate,
  authorize(ROLE_SLUGS.SELLER),
  validate(assetIdParamSchema, "params"),
  validate(updateAssetSchema),
  updateAsset,
);

assetsRouter.delete(
  "/:id",
  authenticate,
  authorize(ROLE_SLUGS.SELLER),
  validate(assetIdParamSchema, "params"),
  deleteAsset,
);

assetsRouter.post(
  "/:id/publish",
  authenticate,
  authorize(ROLE_SLUGS.SELLER),
  validate(assetIdParamSchema, "params"),
  publishAsset,
);

assetsRouter.post(
  "/:id/archive",
  authenticate,
  authorize(ROLE_SLUGS.SELLER),
  validate(assetIdParamSchema, "params"),
  archiveAsset,
);
