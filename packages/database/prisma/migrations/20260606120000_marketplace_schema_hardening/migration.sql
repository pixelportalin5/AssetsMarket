-- =============================================================================
-- Marketplace schema hardening (P0/P1)
-- - AssetStatus lifecycle: DRAFT, PUBLISHED, ARCHIVED, SUSPENDED
-- - AssetCategory.isActive
-- - Booking.assetId denormalization
-- - Partial slug unique, verification concurrency, CHECK constraints
-- - Partial indexes + booking overlap GiST (from MIGRATION_NOTES)
-- =============================================================================

-- AlterTable: AssetCategory.isActive
ALTER TABLE "asset_categories" ADD COLUMN "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable: Booking.assetId (backfill from ad_products, then NOT NULL)
ALTER TABLE "bookings" ADD COLUMN "asset_id" UUID;

UPDATE "bookings" AS b
SET "asset_id" = ap."asset_id"
FROM "ad_products" AS ap
WHERE b."ad_product_id" = ap."id";

ALTER TABLE "bookings" ALTER COLUMN "asset_id" SET NOT NULL;

-- Migrate legacy AssetStatus values before enum swap
UPDATE "assets" SET "status" = 'DRAFT' WHERE "status" = 'PENDING_REVIEW';
UPDATE "assets" SET "status" = 'PUBLISHED' WHERE "status" = 'UNDER_CONTRACT';
UPDATE "assets" SET "status" = 'ARCHIVED' WHERE "status" = 'SOLD';

-- Replace AssetStatus enum
CREATE TYPE "AssetStatus_new" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'SUSPENDED');

ALTER TABLE "assets" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "assets"
  ALTER COLUMN "status" TYPE "AssetStatus_new"
  USING ("status"::text::"AssetStatus_new");

DROP TYPE "AssetStatus";
ALTER TYPE "AssetStatus_new" RENAME TO "AssetStatus";
ALTER TABLE "assets" ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- Drop global slug unique; enforce among active rows only
DROP INDEX IF EXISTS "assets_slug_key";

-- Drop superseded btree indexes replaced by partial variants
DROP INDEX IF EXISTS "asset_categories_parent_id_sort_order_idx";

-- CreateIndex (Prisma-managed)
CREATE INDEX "asset_categories_is_active_parent_id_sort_order_idx" ON "asset_categories"("is_active", "parent_id", "sort_order");
CREATE INDEX "assets_slug_idx" ON "assets"("slug");
CREATE INDEX "asset_verifications_reviewer_id_status_submitted_at_idx" ON "asset_verifications"("reviewer_id", "status", "submitted_at" DESC);
CREATE INDEX "bookings_asset_id_status_created_at_idx" ON "bookings"("asset_id", "status", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- -----------------------------------------------------------------------------
-- CHECK constraints
-- -----------------------------------------------------------------------------

ALTER TABLE "reviews"
  ADD CONSTRAINT "reviews_rating_range_check"
  CHECK ("rating" >= 1 AND "rating" <= 5);

ALTER TABLE "bookings"
  ADD CONSTRAINT "bookings_date_range_check"
  CHECK ("end_date" >= "start_date");

ALTER TABLE "assets"
  ADD CONSTRAINT "assets_published_at_check"
  CHECK ("status" <> 'PUBLISHED' OR "published_at" IS NOT NULL);

-- -----------------------------------------------------------------------------
-- Partial indexes — active rows / hot-path queries
-- -----------------------------------------------------------------------------

CREATE UNIQUE INDEX "assets_slug_active_key"
  ON "assets" ("slug")
  WHERE "deleted_at" IS NULL;

CREATE UNIQUE INDEX "asset_verifications_one_open_per_asset"
  ON "asset_verifications" ("asset_id")
  WHERE "status" IN ('PENDING', 'IN_REVIEW');

CREATE INDEX "idx_assets_active_published"
  ON "assets" ("category_id", "published_at" DESC)
  WHERE "deleted_at" IS NULL AND "status" = 'PUBLISHED';

CREATE INDEX "idx_users_active"
  ON "users" ("status", "created_at" DESC)
  WHERE "deleted_at" IS NULL;

CREATE INDEX "idx_notifications_unread"
  ON "notifications" ("user_id", "created_at" DESC)
  WHERE "read_at" IS NULL;

CREATE INDEX "idx_assets_owner_active"
  ON "assets" ("owner_id", "status")
  WHERE "deleted_at" IS NULL;

CREATE INDEX "idx_ad_products_active"
  ON "ad_products" ("asset_id", "status")
  WHERE "deleted_at" IS NULL;

-- -----------------------------------------------------------------------------
-- GiST index — booking slot overlap detection per ad product
-- -----------------------------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE INDEX "idx_bookings_ad_product_daterange"
  ON "bookings"
  USING GIST (
    "ad_product_id",
    daterange("start_date", "end_date", '[]')
  )
  WHERE "status" NOT IN ('CANCELLED');
