-- =============================================================================
-- AssetsMarket — Supplemental raw SQL (post Prisma migrations)
-- Apply only what is NOT already in prisma/migrations/.
-- PostgreSQL 17
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Promoted in 20260606120000_marketplace_schema_hardening
-- -----------------------------------------------------------------------------
-- reviews_rating_range_check, bookings_date_range_check, assets_published_at_check
-- assets_slug_active_key, asset_verifications_one_open_per_asset
-- idx_assets_active_published, idx_users_active, idx_notifications_unread
-- idx_assets_owner_active, idx_ad_products_active
-- AssetStatus enum, AssetCategory.is_active, Booking.asset_id

-- -----------------------------------------------------------------------------
-- Promoted in 20260607120000_commerce_schema_hardening
-- -----------------------------------------------------------------------------
-- campaigns.committed_amount + budget CHECK constraints
-- bookings.payment_expires_at + idx_bookings_pending_payment_expiry
-- escrow_transactions.refund_transaction_id
-- bookings_no_overlap_per_product_check (EXCLUDE USING GIST)
-- disputes_one_open_per_escrow
-- transactions_one_completed_payment_per_booking
-- Monetary CHECK constraints (ad_products, bookings, campaigns, escrow, transactions)
-- bookings_validate_denormalization trigger
-- escrow_validate_booking_amount trigger

-- -----------------------------------------------------------------------------
-- Future candidates (not yet migrated)
-- -----------------------------------------------------------------------------

-- Full-text search on asset listings
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assets_search
--   ON assets USING GIN (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')))
--   WHERE deleted_at IS NULL AND status = 'PUBLISHED';

-- Capacity > 1 inventory counting trigger (when ad_products.capacity > 1)
-- Booking.quantity column for CPM/CPC/PER_EVENT pricing models
-- Currency consistency trigger across booking / ad_product / campaign
