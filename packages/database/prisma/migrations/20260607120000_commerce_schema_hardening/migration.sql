-- =============================================================================
-- Commerce schema hardening (P0 + critical P1)
-- =============================================================================

-- AlterTable: Campaign.committed_amount
ALTER TABLE "campaigns" ADD COLUMN "committed_amount" DECIMAL(14,2) NOT NULL DEFAULT 0;

-- AlterTable: Booking.payment_expires_at
ALTER TABLE "bookings" ADD COLUMN "payment_expires_at" TIMESTAMPTZ(6);

-- AlterTable: EscrowTransaction.refund_transaction_id
ALTER TABLE "escrow_transactions" ADD COLUMN "refund_transaction_id" UUID;

-- CreateIndex (Prisma-managed)
CREATE INDEX "bookings_campaign_id_status_created_at_idx" ON "bookings"("campaign_id", "status", "created_at" DESC);

CREATE UNIQUE INDEX "escrow_transactions_refund_transaction_id_key" ON "escrow_transactions"("refund_transaction_id");

-- AddForeignKey
ALTER TABLE "escrow_transactions" ADD CONSTRAINT "escrow_transactions_refund_transaction_id_fkey" FOREIGN KEY ("refund_transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- -----------------------------------------------------------------------------
-- CHECK constraints — non-negative money and valid ranges
-- -----------------------------------------------------------------------------

ALTER TABLE "ad_products"
  ADD CONSTRAINT "ad_products_base_price_nonneg_check"
  CHECK ("base_price" >= 0);

ALTER TABLE "ad_products"
  ADD CONSTRAINT "ad_products_capacity_positive_check"
  CHECK ("capacity" IS NULL OR "capacity" >= 1);

ALTER TABLE "bookings"
  ADD CONSTRAINT "bookings_total_amount_nonneg_check"
  CHECK ("total_amount" >= 0);

ALTER TABLE "campaigns"
  ADD CONSTRAINT "campaigns_budget_nonneg_check"
  CHECK ("budget" >= 0);

ALTER TABLE "campaigns"
  ADD CONSTRAINT "campaigns_committed_amount_nonneg_check"
  CHECK ("committed_amount" >= 0);

ALTER TABLE "campaigns"
  ADD CONSTRAINT "campaigns_committed_within_budget_check"
  CHECK ("committed_amount" <= "budget");

ALTER TABLE "campaigns"
  ADD CONSTRAINT "campaigns_date_range_check"
  CHECK ("start_date" IS NULL OR "end_date" IS NULL OR "end_date" >= "start_date");

ALTER TABLE "escrow_transactions"
  ADD CONSTRAINT "escrow_transactions_amount_nonneg_check"
  CHECK ("amount" >= 0);

ALTER TABLE "transactions"
  ADD CONSTRAINT "transactions_amount_nonneg_check"
  CHECK ("amount" >= 0);

ALTER TABLE "transactions"
  ADD CONSTRAINT "transactions_platform_fee_valid_check"
  CHECK ("platform_fee" >= 0 AND "platform_fee" <= "amount");

-- -----------------------------------------------------------------------------
-- Booking overlap protection (replaces query-only GiST index)
-- -----------------------------------------------------------------------------

CREATE EXTENSION IF NOT EXISTS btree_gist;

DROP INDEX IF EXISTS "idx_bookings_ad_product_daterange";

ALTER TABLE "bookings"
  ADD CONSTRAINT "bookings_no_overlap_per_product_check"
  EXCLUDE USING GIST (
    "ad_product_id" WITH =,
    daterange("start_date", "end_date", '[]') WITH &&
  )
  WHERE ("status" <> 'CANCELLED');

-- -----------------------------------------------------------------------------
-- Partial indexes
-- -----------------------------------------------------------------------------

CREATE INDEX "idx_bookings_pending_payment_expiry"
  ON "bookings" ("payment_expires_at")
  WHERE "status" = 'PENDING_PAYMENT' AND "payment_expires_at" IS NOT NULL;

CREATE UNIQUE INDEX "disputes_one_open_per_escrow"
  ON "disputes" ("escrow_transaction_id")
  WHERE "status" IN ('OPEN', 'UNDER_REVIEW');

CREATE UNIQUE INDEX "transactions_one_completed_payment_per_booking"
  ON "transactions" ("booking_id")
  WHERE "type" = 'PAYMENT' AND "status" = 'COMPLETED' AND "booking_id" IS NOT NULL;

-- -----------------------------------------------------------------------------
-- Triggers — denormalization integrity and escrow amount coupling
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION bookings_validate_denormalization()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  product_asset_id UUID;
  asset_owner_id UUID;
  campaign_advertiser_id UUID;
BEGIN
  SELECT "asset_id" INTO product_asset_id
  FROM "ad_products"
  WHERE "id" = NEW."ad_product_id";

  IF product_asset_id IS NULL THEN
    RAISE EXCEPTION 'Ad product not found for booking'
      USING ERRCODE = 'foreign_key_violation';
  END IF;

  IF NEW."asset_id" IS DISTINCT FROM product_asset_id THEN
    RAISE EXCEPTION 'Booking asset_id must match ad product asset_id'
      USING ERRCODE = 'check_violation';
  END IF;

  SELECT "owner_id" INTO asset_owner_id
  FROM "assets"
  WHERE "id" = NEW."asset_id";

  IF asset_owner_id IS NULL THEN
    RAISE EXCEPTION 'Asset not found for booking'
      USING ERRCODE = 'foreign_key_violation';
  END IF;

  IF NEW."seller_id" IS DISTINCT FROM asset_owner_id THEN
    RAISE EXCEPTION 'Booking seller_id must match asset owner_id'
      USING ERRCODE = 'check_violation';
  END IF;

  IF NEW."campaign_id" IS NOT NULL THEN
    SELECT "advertiser_id" INTO campaign_advertiser_id
    FROM "campaigns"
    WHERE "id" = NEW."campaign_id";

    IF campaign_advertiser_id IS NULL THEN
      RAISE EXCEPTION 'Campaign not found for booking'
        USING ERRCODE = 'foreign_key_violation';
    END IF;

    IF NEW."advertiser_id" IS DISTINCT FROM campaign_advertiser_id THEN
      RAISE EXCEPTION 'Booking advertiser_id must match campaign advertiser_id'
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER bookings_validate_denormalization_trigger
  BEFORE INSERT OR UPDATE OF "ad_product_id", "asset_id", "seller_id", "campaign_id", "advertiser_id"
  ON "bookings"
  FOR EACH ROW
  EXECUTE FUNCTION bookings_validate_denormalization();

CREATE OR REPLACE FUNCTION escrow_validate_booking_amount()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  booking_total NUMERIC(14, 2);
BEGIN
  SELECT "total_amount" INTO booking_total
  FROM "bookings"
  WHERE "id" = NEW."booking_id";

  IF booking_total IS NULL THEN
    RAISE EXCEPTION 'Booking not found for escrow'
      USING ERRCODE = 'foreign_key_violation';
  END IF;

  IF NEW."amount" IS DISTINCT FROM booking_total THEN
    RAISE EXCEPTION 'Escrow amount must match booking total_amount'
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER escrow_validate_booking_amount_trigger
  BEFORE INSERT OR UPDATE OF "amount", "booking_id"
  ON "escrow_transactions"
  FOR EACH ROW
  EXECUTE FUNCTION escrow_validate_booking_amount();
