-- =============================================================================
-- AssetsMarket — Raw SQL to apply AFTER the initial Prisma migration
-- Not a Prisma migration file. Append manually or via a follow-up migration.
-- PostgreSQL 17
-- =============================================================================

-- -----------------------------------------------------------------------------
-- CHECK constraints (not expressible in Prisma schema)
-- -----------------------------------------------------------------------------

ALTER TABLE reviews
  ADD CONSTRAINT reviews_rating_range_check
  CHECK (rating >= 1 AND rating <= 5);

ALTER TABLE bookings
  ADD CONSTRAINT bookings_date_range_check
  CHECK (end_date >= start_date);

-- -----------------------------------------------------------------------------
-- Partial indexes — active rows only (smaller, faster hot-path queries)
-- -----------------------------------------------------------------------------

-- Marketplace browse: published assets that are not soft-deleted
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assets_active_published
  ON assets (category_id, published_at DESC)
  WHERE deleted_at IS NULL AND status = 'PUBLISHED';

-- Auth / admin user lookups excluding soft-deleted accounts
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_active
  ON users (status, created_at DESC)
  WHERE deleted_at IS NULL;

-- Notification bell: unread feed per user
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_notifications_unread
  ON notifications (user_id, created_at DESC)
  WHERE read_at IS NULL;

-- Seller listings dashboard
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assets_owner_active
  ON assets (owner_id, status)
  WHERE deleted_at IS NULL;

-- Ad products visible on marketplace
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_ad_products_active
  ON ad_products (asset_id, status)
  WHERE deleted_at IS NULL;

-- -----------------------------------------------------------------------------
-- GiST index — booking slot overlap detection per ad product
-- Query pattern:
--   WHERE ad_product_id = $1
--     AND daterange(start_date, end_date, '[]') && daterange($2, $3, '[]')
--     AND status NOT IN ('CANCELLED')
-- Requires btree_gist extension (ships with PostgreSQL contrib).
-- -----------------------------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bookings_ad_product_daterange
  ON bookings
  USING GIST (
    ad_product_id,
    daterange(start_date, end_date, '[]')
  )
  WHERE status NOT IN ('CANCELLED');

-- -----------------------------------------------------------------------------
-- Rollback reference (manual only — do not run in production without review)
-- -----------------------------------------------------------------------------
-- DROP INDEX CONCURRENTLY IF EXISTS idx_bookings_ad_product_daterange;
-- DROP INDEX CONCURRENTLY IF EXISTS idx_ad_products_active;
-- DROP INDEX CONCURRENTLY IF EXISTS idx_assets_owner_active;
-- DROP INDEX CONCURRENTLY IF EXISTS idx_notifications_unread;
-- DROP INDEX CONCURRENTLY IF EXISTS idx_users_active;
-- DROP INDEX CONCURRENTLY IF EXISTS idx_assets_active_published;
-- ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_date_range_check;
-- ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_rating_range_check;
